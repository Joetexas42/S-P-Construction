import { logger } from "./logger";

// ---------------------------------------------------------------------------
// Deploy hook — auto-refresh the live (prerendered) project pages.
//
// In production the frontend is a static, prerendered SPA on Cloudflare Pages
// and the API runs separately on Railway. There is no in-process way for the
// API to re-prerender and republish the static site, so instead it POSTs to a
// Cloudflare Pages "deploy hook" URL. That kicks off a fresh Pages build (which
// runs the prerender) and republishes — picking up the latest project data on
// the portfolio routes (`/projects`, `/case-studies`).
//
// Configure `DEPLOY_HOOK_URL` with the Cloudflare Pages deploy-hook URL. When
// it is unset (e.g. local dev), the trigger is skipped with a visible warning
// instead of failing the mutation.
//
// Mutations often arrive in quick bursts (e.g. uploading then editing a new
// project), so triggers are debounced/coalesced into a single rebuild after a
// short quiet period. Tune with `DEPLOY_HOOK_DEBOUNCE_MS` (default 10s; set to
// 0 to fire immediately on every mutation).
// ---------------------------------------------------------------------------

const DEPLOY_HOOK_URL = process.env.DEPLOY_HOOK_URL;
const DEBOUNCE_MS = Number(process.env.DEPLOY_HOOK_DEBOUNCE_MS ?? 10_000);

let pendingTimer: NodeJS.Timeout | null = null;
const pendingReasons = new Set<string>();

/**
 * Synchronous outcome of attempting to schedule a live-site refresh. This is
 * the immediate signal returned in a mutation response: it tells the admin UI
 * whether auto-refresh is configured and whether a rebuild was scheduled. It
 * deliberately does NOT claim the rebuild succeeded — the actual deploy-hook
 * HTTP call happens asynchronously (and is debounced), so the admin UI must
 * poll {@link getSiteRefreshState} to learn the real delivery outcome.
 */
export interface SiteRefreshStatus {
  /** Whether the Cloudflare Pages deploy hook is configured (DEPLOY_HOOK_URL set). */
  configured: boolean;
  /** Whether a live-site rebuild was scheduled as a result of this change. */
  scheduled: boolean;
}

/**
 * Delivery state of the most recent deploy-hook attempt.
 * - `idle`: nothing has been triggered yet this process lifetime.
 * - `pending`: a rebuild is scheduled/in-flight (debounce window or HTTP call).
 * - `success`: the deploy hook returned OK — the rebuild started.
 * - `failed`: the deploy hook call errored or returned a non-OK status.
 */
export type SiteRefreshDeliveryState = "idle" | "pending" | "success" | "failed";

/**
 * The real, observed status of the auto-refresh pipeline. Exposed via a status
 * endpoint so the admin UI can confirm the rebuild actually started (or warn
 * the admin when it failed), instead of optimistically assuming success.
 */
export interface SiteRefreshState {
  /** Whether the Cloudflare Pages deploy hook is configured. */
  configured: boolean;
  /** Delivery state of the most recent attempt. */
  state: SiteRefreshDeliveryState;
  /** ISO timestamp of when the most recent rebuild was scheduled, if any. */
  lastTriggeredAt: string | null;
  /** ISO timestamp of when the most recent attempt finished (ok or failed). */
  lastCompletedAt: string | null;
  /** Human-readable failure reason when `state` is `failed`, else null. */
  error: string | null;
}

let deliveryState: SiteRefreshDeliveryState = "idle";
let lastTriggeredAt: string | null = null;
let lastCompletedAt: string | null = null;
let lastError: string | null = null;

async function fireDeployHook(reasons: string[]): Promise<void> {
  if (!DEPLOY_HOOK_URL) {
    logger.warn(
      { reasons },
      "DEPLOY_HOOK_URL not set — skipping site rebuild trigger (live project pages will not auto-refresh)",
    );
    return;
  }

  try {
    const res = await fetch(DEPLOY_HOOK_URL, { method: "POST" });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      deliveryState = "failed";
      lastCompletedAt = new Date().toISOString();
      lastError = `Deploy hook returned status ${res.status}`;
      logger.error(
        { status: res.status, body: body.slice(0, 500), reasons },
        "Deploy hook returned a non-OK status — site rebuild may not have started",
      );
      return;
    }
    deliveryState = "success";
    lastCompletedAt = new Date().toISOString();
    lastError = null;
    logger.info({ status: res.status, reasons }, "Triggered site rebuild via deploy hook");
  } catch (err) {
    deliveryState = "failed";
    lastCompletedAt = new Date().toISOString();
    lastError = err instanceof Error ? err.message : "Failed to reach the deploy hook";
    logger.error({ err, reasons }, "Failed to trigger site rebuild via deploy hook");
  }
}

/**
 * Returns the real, observed status of the most recent auto-refresh attempt.
 * The admin UI polls this after a mutation to surface a truthful confirmation
 * (or failure warning) rather than assuming the scheduled rebuild succeeded.
 */
export function getSiteRefreshState(): SiteRefreshState {
  return {
    configured: Boolean(DEPLOY_HOOK_URL),
    state: deliveryState,
    lastTriggeredAt,
    lastCompletedAt,
    error: lastError,
  };
}

/**
 * Schedule a rebuild of the static site to refresh the live project pages.
 * Fire-and-forget: never blocks or fails the originating request. Bursts of
 * calls are coalesced into a single deploy-hook request.
 *
 * Returns a synchronous {@link SiteRefreshStatus} describing only the
 * scheduling outcome (configured + scheduled) — never an optimistic "success".
 * The actual delivery result lands asynchronously and is exposed via
 * {@link getSiteRefreshState}, which the admin UI polls for a truthful
 * confirmation or failure warning.
 */
export function triggerSiteRebuild(reason: string): SiteRefreshStatus {
  if (!DEPLOY_HOOK_URL) {
    logger.warn(
      { reason },
      "DEPLOY_HOOK_URL not set — skipping site rebuild trigger (live project pages will not auto-refresh)",
    );
    return { configured: false, scheduled: false };
  }

  pendingReasons.add(reason);
  deliveryState = "pending";
  lastTriggeredAt = new Date().toISOString();
  lastError = null;

  if (DEBOUNCE_MS <= 0) {
    const reasons = [...pendingReasons];
    pendingReasons.clear();
    void fireDeployHook(reasons);
    return { configured: true, scheduled: true };
  }

  if (pendingTimer) clearTimeout(pendingTimer);
  pendingTimer = setTimeout(() => {
    pendingTimer = null;
    const reasons = [...pendingReasons];
    pendingReasons.clear();
    void fireDeployHook(reasons);
  }, DEBOUNCE_MS);

  // Don't keep the event loop alive solely for a pending rebuild trigger.
  pendingTimer.unref?.();

  return { configured: true, scheduled: true };
}
