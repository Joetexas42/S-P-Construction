# Pricing Math — Internal Reference

Internal-only pricing reference for the six commercial roofing services we sell.
Used to sanity-check ballpark numbers, train estimating staff, and back the
public-facing estimator and capabilities sheet with consistent assumptions.

## Files

- [`pricing-math.md`](./pricing-math.md) — Source of truth. Edit this.
- [`pricing-math.pdf`](./pricing-math.pdf) — Rendered, printable copy. Regenerate after editing the markdown.

## Regenerate the PDF

The PDF is produced from `pricing-math.md` via headless Chromium.

```sh
pnpm --filter @workspace/scripts run render-pricing-pdf
```

Requires the `chromium` system dependency (already installed in this repo's Nix environment).

## Where the numbers come from

Every dollar figure currently appears as `[PLACEHOLDER: …]` because the owner
has not yet supplied real rates. Fill them in directly in `pricing-math.md`
(sections §3 per-service, §6 surcharges), then regenerate the PDF. The worked
examples in §4 and the comparison tables in §5 are intentionally symbolic until
the placeholders are resolved.

## Not for customers

This is an *internal* document. The customer-facing capabilities & pricing
sheet is a separate deliverable; this one feeds it.
