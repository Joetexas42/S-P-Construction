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
      logger.error(
        { status: res.status, body: body.slice(0, 500), reasons },
        "Deploy hook returned a non-OK status — site rebuild may not have started",
      );
      return;
    }
    logger.info({ status: res.status, reasons }, "Triggered site rebuild via deploy hook");
  } catch (err) {
    logger.error({ err, reasons }, "Failed to trigger site rebuild via deploy hook");
  }
}

/**
 * Schedule a rebuild of the static site to refresh the live project pages.
 * Fire-and-forget: never blocks or fails the originating request. Bursts of
 * calls are coalesced into a single deploy-hook request.
 */
export function triggerSiteRebuild(reason: string): void {
  pendingReasons.add(reason);

  if (DEBOUNCE_MS <= 0) {
    const reasons = [...pendingReasons];
    pendingReasons.clear();
    void fireDeployHook(reasons);
    return;
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
}
