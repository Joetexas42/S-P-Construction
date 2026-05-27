# Internal Pricing Math — Commercial Roofing Services

**Audience:** Internal only (owner + estimating staff). Not for customer distribution.
**Purpose:** A single sanity-check reference for ballpark pricing across the six commercial roofing services we sell. Backs the public estimator (Task #43) and the customer capabilities sheet (Task #42) so all surfaces use consistent assumptions.
**Status:** Draft skeleton. Every dollar figure shown as `[PLACEHOLDER: …]` is awaiting real numbers from the owner. Worked examples are intentionally symbolic until those are filled in.

---

## 1. Overview

This document captures, for each of our six commercial roofing services:

1. The symbolic pricing formula as a function of roof area.
2. The per-square-foot rate range (low / mid / high) and any fixed/mobilization cost.
3. The minimum project size we will quote.
4. What is included in the rate and what is billed separately.
5. Worked totals at three representative project sizes: **5,000 / 20,000 / 50,000 sq ft**, at low / mid / high.
6. A side-by-side comparison so we can see how the unit cost changes with scale.
7. Edge cases and surcharges that change the math.

The six services covered:

1. TPO / PVC Single-Ply Membrane
2. Metal Roofing System
3. Modified Bitumen / Built-Up Roofing (BUR)
4. Roof Coatings & Restoration
5. Full Roof Replacement (Tear-Off)
6. Commercial Roof Repair

---

## 2. Assumptions & Units

- **Area unit:** square feet (sq ft) of roof deck area, measured flat (not surface area of slopes).
- **Currency:** USD, pre-tax.
- **Rounding rule:** All line items computed at full precision, then **total rounded to the nearest $100**. Effective $/sq ft figures are reported to two decimals.
- **Tax:** Sales tax is *not* included in any quoted total. Tax handling is applied at invoice time per the customer's exemption status and project jurisdiction.
- **Permits & engineering:** Excluded from the base rate unless explicitly called out. Pass-through at cost + `[PLACEHOLDER: permit handling markup %]`.
- **Warranty:** Standard manufacturer + workmanship warranty is included in the base rate. Extended / NDL warranties are an add-on.
- **Access assumption:** Single-story, ground-level crane/lift access, no occupied-building constraints, normal working hours. Surcharges below apply when this is not true.
- **Tear-off assumption:** Unless the service is explicitly "Tear-Off" or "Replacement", the base rate assumes the existing roof stays in place (recover or coat). Tear-off is an additive surcharge — see §6.
- **Geography:** North Texas (DFW metro and surrounding counties). All rate ranges below are owner-supplied; this document does not hard-code market numbers.

### Symbolic notation

For every service we model total price as:

```
Total(A) = F + r · A
```

Where:

- `A` = roof area in sq ft
- `F` = fixed / mobilization cost (USD) — covers crew mobilization, dumpsters, site setup, project management overhead
- `r` = per-sq-ft rate (USD/sq ft)

For each service we define three rate points supplied by the owner:

- `r_low`  — best-case rate (large, simple, easy-access job)
- `r_high` — worst-case rate (small, complex, restricted-access job)
- `r_mid`  — the typical / central case, defined as `r_mid = (r_low + r_high) / 2` unless the owner supplies a different mid value (e.g. weighted by historical job mix)

Likewise for fixed cost, when the owner gives a range:

- `F_mid = (F_low + F_high) / 2` unless overridden

For services that tier with scale, we write the rate as `r(A)`:

```
r(A) =
  r_small   if A  < A_1
  r_mid     if A_1 ≤ A < A_2
  r_large   if A ≥ A_2
```

Tier breakpoints `A_1`, `A_2` are listed per service.

---

## 3. Per-Service Pricing Models

> Convention in this section: each service shows formula, rate, fixed cost, minimum, inclusions, exclusions, and notes. Every number is owner-supplied and appears as `[PLACEHOLDER: …]`. Market "typical" ranges are deliberately not encoded here — quote against owner-supplied numbers only.

### 3.1 TPO / PVC Single-Ply Membrane

- **Formula:** `Total(A) = F_tpo + r_tpo · A`
- **Per-sq-ft rate:**
  - `r_tpo,low`  = `[PLACEHOLDER: TPO/PVC low $/sq ft]`
  - `r_tpo,mid`  = `[PLACEHOLDER: TPO/PVC mid $/sq ft]` (default `= (low + high) / 2` if not supplied)
  - `r_tpo,high` = `[PLACEHOLDER: TPO/PVC high $/sq ft]`
- **Fixed / mobilization `F_tpo`:** `[PLACEHOLDER: TPO mobilization low–mid–high $]`
- **Minimum project size:** `[PLACEHOLDER: TPO min sq ft — below this, quote as repair, not system install]`
- **Included:** Membrane, insulation board to current code R-value, cover board, fasteners/adhesives, edge metal, standard flashings, manufacturer warranty (`[PLACEHOLDER: warranty years]`).
- **Excluded:** Tear-off of existing roof, structural deck repair, tapered insulation for drainage correction, skylight/curb replacement, lightning protection, permits.
- **Tier breakpoints (if any):** `[PLACEHOLDER: A_1, A_2 for TPO]`
- **PVC vs TPO:** PVC pricing uplift over TPO at the same thickness = `[PLACEHOLDER: PVC vs TPO uplift %]` (for chemical-resistant applications).

### 3.2 Metal Roofing System

- **Formula:** `Total(A) = F_metal + r_metal · A`
- **Per-sq-ft rate:**
  - `r_metal,low`  = `[PLACEHOLDER: metal low $/sq ft]`
  - `r_metal,mid`  = `[PLACEHOLDER: metal mid $/sq ft]`
  - `r_metal,high` = `[PLACEHOLDER: metal high $/sq ft]`
- **Fixed / mobilization `F_metal`:** `[PLACEHOLDER: metal mobilization low–mid–high $]` (higher than membrane — crane time, panel staging)
- **Minimum project size:** `[PLACEHOLDER: metal min sq ft]`
- **Included:** Standing-seam panels, clips, underlayment, trim/flashings, snow guards (if specified), manufacturer finish warranty.
- **Excluded:** Tear-off, deck or purlin repair, gutter/downspout replacement, insulation upgrade beyond existing R-value, custom color premium.
- **Notes:** Panel length, gauge, and finish (Galvalume vs Kynar) materially change `r_metal`. Long single-run panels (> `[PLACEHOLDER: panel length ft]`) trigger crane / specialty transport surcharge.

### 3.3 Modified Bitumen / Built-Up Roofing (BUR)

- **Formula:** `Total(A) = F_bur + r_bur · A`
- **Per-sq-ft rate:**
  - `r_bur,low`  = `[PLACEHOLDER: mod bit/BUR low $/sq ft]`
  - `r_bur,mid`  = `[PLACEHOLDER: mod bit/BUR mid $/sq ft]`
  - `r_bur,high` = `[PLACEHOLDER: mod bit/BUR high $/sq ft]`
- **Fixed / mobilization `F_bur`:** `[PLACEHOLDER: BUR mobilization low–mid–high $]`
- **Minimum project size:** `[PLACEHOLDER: BUR min sq ft]`
- **Included:** Base + cap sheet, insulation, cover board, granulated cap, flashings.
- **Excluded:** Hot-kettle setup surcharge for traditional BUR (asphalt), tear-off, deck repair.
- **Notes:** Torch-down installations require fire-watch coverage; base rate reflects standard SBS self-adhered unless otherwise noted.

### 3.4 Roof Coatings & Restoration

- **Formula:** `Total(A) = F_coat + r_coat · A`
- **Per-sq-ft rate:**
  - `r_coat,low`  = `[PLACEHOLDER: coating low $/sq ft]`
  - `r_coat,mid`  = `[PLACEHOLDER: coating mid $/sq ft]`
  - `r_coat,high` = `[PLACEHOLDER: coating high $/sq ft]`
- **Fixed / mobilization `F_coat`:** `[PLACEHOLDER: coating mobilization low–mid–high $]`
- **Minimum project size:** `[PLACEHOLDER: coating min sq ft]`
- **Included:** Power-wash, primer (if required by substrate), 1–2 coats of silicone/acrylic at spec mils, embedded fabric at seams and penetrations, manufacturer restoration warranty (`[PLACEHOLDER: warranty years]`).
- **Excluded:** Substrate repair beyond `[PLACEHOLDER: included repair sq ft]`, ponding-water correction, removal of failed prior coating.
- **Eligibility:** Coating is only sold when the existing roof passes a restorability check — substrate must be ≥ `[PLACEHOLDER: min remaining life years]` of remaining life, < `[PLACEHOLDER: max saturated insulation %]` saturated insulation, no widespread membrane failure. If it fails, we quote replacement or recover instead.

### 3.5 Full Roof Replacement (Tear-Off)

- **Formula:** `Total(A) = F_repl + (r_system + r_tearoff + r_disposal) · A`
- **Per-sq-ft rate components:**
  - `r_system` = whichever new system rate from §3.1 – §3.3 the customer selects (low / mid / high accordingly)
  - `r_tearoff,low / mid / high` = `[PLACEHOLDER: tear-off labor low / mid / high $/sq ft]`
  - `r_disposal,low / mid / high` = `[PLACEHOLDER: disposal low / mid / high $/sq ft]` (function of dump fees and ply count)
- **Fixed / mobilization `F_repl`:** `[PLACEHOLDER: replacement mobilization low–mid–high $]` (larger than non-tear-off — more dumpsters, more days)
- **Minimum project size:** `[PLACEHOLDER: replacement min sq ft]`
- **Included:** Removal of all existing roofing plies down to deck, deck inspection, up to `[PLACEHOLDER: included deck repair sq ft]` of deck repair at no charge, new system per chosen spec, all flashings.
- **Excluded:** Deck repair beyond the included allowance (billed at `[PLACEHOLDER: deck repair $/sq ft]`), asbestos abatement, structural reinforcement.
- **Notes:** When existing roof has > 2 plies or is wet, `r_tearoff` and `r_disposal` move to the upper end of the range.

### 3.6 Commercial Roof Repair

- **Formula:** `Total = max(MinRepair, F_repair + r_repair · A_affected)`
- **Per-sq-ft rate `r_repair`** (per sq ft of *affected* area, not roof area):
  - `r_repair,low`  = `[PLACEHOLDER: repair low $/sq ft of affected area]`
  - `r_repair,mid`  = `[PLACEHOLDER: repair mid $/sq ft of affected area]`
  - `r_repair,high` = `[PLACEHOLDER: repair high $/sq ft of affected area]`
- **Trip / mobilization `F_repair`:** `[PLACEHOLDER: repair trip charge $]`
- **Minimum invoice `MinRepair`:** `[PLACEHOLDER: minimum repair invoice $]`
- **Included:** Diagnosis, patch of identified leak(s), photo documentation, workmanship warranty on patched area (`[PLACEHOLDER: warranty days]`).
- **Excluded:** Investigation of unrelated leaks discovered on site (quoted separately), interior water-damage repair, anything outside the patched area.
- **Notes:** Repair is the only service where `A` in the formula is *affected area*, not total roof area. Do **not** quote repair against full-roof sq ft. See §4.6 for how the 5k/20k/50k framing applies to repair (it scales with affected area as a fraction of roof area, not roof area itself).

---

## 4. Worked Examples

> All examples use the symbolic forms above. Substitute owner-supplied `F` and `r` when they are provided; totals will resolve to numeric values. For each service we show **low / mid / high** at each representative size, with the explicit substitution step. Mid uses `r_mid` and `F_mid` as defined in §2 (`= (low + high)/2` unless overridden).

For each service:

```
Total_low(A)  = F_low  + r_low  · A
Total_mid(A)  = F_mid  + r_mid  · A
Total_high(A) = F_high + r_high · A
```

All totals rounded to the nearest $100 (see §2).

### 4.1 TPO / PVC Single-Ply Membrane

| Area `A` | Tier | Substitution | Total (→ $100) |
|---|---|---|---|
| 5,000  | low  | `F_tpo,low  + r_tpo,low  · 5,000`  | `[PLACEHOLDER]` |
| 5,000  | mid  | `F_tpo,mid  + r_tpo,mid  · 5,000`  | `[PLACEHOLDER]` |
| 5,000  | high | `F_tpo,high + r_tpo,high · 5,000`  | `[PLACEHOLDER]` |
| 20,000 | low  | `F_tpo,low  + r_tpo,low  · 20,000` | `[PLACEHOLDER]` |
| 20,000 | mid  | `F_tpo,mid  + r_tpo,mid  · 20,000` | `[PLACEHOLDER]` |
| 20,000 | high | `F_tpo,high + r_tpo,high · 20,000` | `[PLACEHOLDER]` |
| 50,000 | low  | `F_tpo,low  + r_tpo,low  · 50,000` | `[PLACEHOLDER]` |
| 50,000 | mid  | `F_tpo,mid  + r_tpo,mid  · 50,000` | `[PLACEHOLDER]` |
| 50,000 | high | `F_tpo,high + r_tpo,high · 50,000` | `[PLACEHOLDER]` |

### 4.2 Metal Roofing System

| Area `A` | Tier | Substitution | Total (→ $100) |
|---|---|---|---|
| 5,000  | low  | `F_metal,low  + r_metal,low  · 5,000`  | `[PLACEHOLDER]` |
| 5,000  | mid  | `F_metal,mid  + r_metal,mid  · 5,000`  | `[PLACEHOLDER]` |
| 5,000  | high | `F_metal,high + r_metal,high · 5,000`  | `[PLACEHOLDER]` |
| 20,000 | low  | `F_metal,low  + r_metal,low  · 20,000` | `[PLACEHOLDER]` |
| 20,000 | mid  | `F_metal,mid  + r_metal,mid  · 20,000` | `[PLACEHOLDER]` |
| 20,000 | high | `F_metal,high + r_metal,high · 20,000` | `[PLACEHOLDER]` |
| 50,000 | low  | `F_metal,low  + r_metal,low  · 50,000` | `[PLACEHOLDER]` |
| 50,000 | mid  | `F_metal,mid  + r_metal,mid  · 50,000` | `[PLACEHOLDER]` |
| 50,000 | high | `F_metal,high + r_metal,high · 50,000` | `[PLACEHOLDER]` |

### 4.3 Modified Bitumen / BUR

| Area `A` | Tier | Substitution | Total (→ $100) |
|---|---|---|---|
| 5,000  | low  | `F_bur,low  + r_bur,low  · 5,000`  | `[PLACEHOLDER]` |
| 5,000  | mid  | `F_bur,mid  + r_bur,mid  · 5,000`  | `[PLACEHOLDER]` |
| 5,000  | high | `F_bur,high + r_bur,high · 5,000`  | `[PLACEHOLDER]` |
| 20,000 | low  | `F_bur,low  + r_bur,low  · 20,000` | `[PLACEHOLDER]` |
| 20,000 | mid  | `F_bur,mid  + r_bur,mid  · 20,000` | `[PLACEHOLDER]` |
| 20,000 | high | `F_bur,high + r_bur,high · 20,000` | `[PLACEHOLDER]` |
| 50,000 | low  | `F_bur,low  + r_bur,low  · 50,000` | `[PLACEHOLDER]` |
| 50,000 | mid  | `F_bur,mid  + r_bur,mid  · 50,000` | `[PLACEHOLDER]` |
| 50,000 | high | `F_bur,high + r_bur,high · 50,000` | `[PLACEHOLDER]` |

### 4.4 Roof Coatings & Restoration

| Area `A` | Tier | Substitution | Total (→ $100) |
|---|---|---|---|
| 5,000  | low  | `F_coat,low  + r_coat,low  · 5,000`  | `[PLACEHOLDER]` |
| 5,000  | mid  | `F_coat,mid  + r_coat,mid  · 5,000`  | `[PLACEHOLDER]` |
| 5,000  | high | `F_coat,high + r_coat,high · 5,000`  | `[PLACEHOLDER]` |
| 20,000 | low  | `F_coat,low  + r_coat,low  · 20,000` | `[PLACEHOLDER]` |
| 20,000 | mid  | `F_coat,mid  + r_coat,mid  · 20,000` | `[PLACEHOLDER]` |
| 20,000 | high | `F_coat,high + r_coat,high · 20,000` | `[PLACEHOLDER]` |
| 50,000 | low  | `F_coat,low  + r_coat,low  · 50,000` | `[PLACEHOLDER]` |
| 50,000 | mid  | `F_coat,mid  + r_coat,mid  · 50,000` | `[PLACEHOLDER]` |
| 50,000 | high | `F_coat,high + r_coat,high · 50,000` | `[PLACEHOLDER]` |

### 4.5 Full Roof Replacement (Tear-Off + TPO assumed)

Assumes `r_system = r_tpo` for this worked example. Swap in metal or BUR rates as needed.

Let `r_repl,tier = r_tpo,tier + r_tearoff,tier + r_disposal,tier` for `tier ∈ {low, mid, high}`.

| Area `A` | Tier | Substitution | Total (→ $100) |
|---|---|---|---|
| 5,000  | low  | `F_repl,low  + r_repl,low  · 5,000`  | `[PLACEHOLDER]` |
| 5,000  | mid  | `F_repl,mid  + r_repl,mid  · 5,000`  | `[PLACEHOLDER]` |
| 5,000  | high | `F_repl,high + r_repl,high · 5,000`  | `[PLACEHOLDER]` |
| 20,000 | low  | `F_repl,low  + r_repl,low  · 20,000` | `[PLACEHOLDER]` |
| 20,000 | mid  | `F_repl,mid  + r_repl,mid  · 20,000` | `[PLACEHOLDER]` |
| 20,000 | high | `F_repl,high + r_repl,high · 20,000` | `[PLACEHOLDER]` |
| 50,000 | low  | `F_repl,low  + r_repl,low  · 50,000` | `[PLACEHOLDER]` |
| 50,000 | mid  | `F_repl,mid  + r_repl,mid  · 50,000` | `[PLACEHOLDER]` |
| 50,000 | high | `F_repl,high + r_repl,high · 50,000` | `[PLACEHOLDER]` |

### 4.6 Commercial Roof Repair — mapped onto the 5k / 20k / 50k framing

Repair does **not** scale with total roof area — it scales with the *affected area* on that roof. To keep this section comparable to §4.1 – §4.5, we map each representative roof size to an affected-area fraction `φ` (the share of the roof that needs patching), then compute `A_affected = φ · A`.

The owner sets one fraction per tier; the same fractions are used across all roof sizes:

- `φ_low`  = `[PLACEHOLDER: affected-area fraction, low — small leak / one penetration]`
- `φ_mid`  = `[PLACEHOLDER: affected-area fraction, mid — typical service call]`
- `φ_high` = `[PLACEHOLDER: affected-area fraction, high — widespread punctures, borderline replacement]`

Then for each roof size `A` and tier:

```
A_affected      = φ_tier · A
Total_tier(A)   = max(MinRepair, F_repair + r_repair,tier · A_affected)
```

| Roof size `A` | Tier | `A_affected = φ · A` | Substitution | Total (→ $100) |
|---|---|---|---|---|
| 5,000  | low  | `φ_low  · 5,000`  | `max(MinRepair, F_repair + r_repair,low  · φ_low  · 5,000)`  | `[PLACEHOLDER]` |
| 5,000  | mid  | `φ_mid  · 5,000`  | `max(MinRepair, F_repair + r_repair,mid  · φ_mid  · 5,000)`  | `[PLACEHOLDER]` |
| 5,000  | high | `φ_high · 5,000`  | `max(MinRepair, F_repair + r_repair,high · φ_high · 5,000)`  | `[PLACEHOLDER]` |
| 20,000 | low  | `φ_low  · 20,000` | `max(MinRepair, F_repair + r_repair,low  · φ_low  · 20,000)` | `[PLACEHOLDER]` |
| 20,000 | mid  | `φ_mid  · 20,000` | `max(MinRepair, F_repair + r_repair,mid  · φ_mid  · 20,000)` | `[PLACEHOLDER]` |
| 20,000 | high | `φ_high · 20,000` | `max(MinRepair, F_repair + r_repair,high · φ_high · 20,000)` | `[PLACEHOLDER]` |
| 50,000 | low  | `φ_low  · 50,000` | `max(MinRepair, F_repair + r_repair,low  · φ_low  · 50,000)` | `[PLACEHOLDER]` |
| 50,000 | mid  | `φ_mid  · 50,000` | `max(MinRepair, F_repair + r_repair,mid  · φ_mid  · 50,000)` | `[PLACEHOLDER]` |
| 50,000 | high | `φ_high · 50,000` | `max(MinRepair, F_repair + r_repair,high · φ_high · 50,000)` | `[PLACEHOLDER]` |

Watch for `MinRepair` binding on small roofs at low `φ` — for a small leak on a small building the floor often dominates. If the unbounded computation falls below `MinRepair`, the floor is the price.

---

## 5. Side-by-Side Comparison

Two views: **total cost** at each example size (low / mid / high), and **effective $/sq ft** (= mid total ÷ area) so we can see how unit cost compresses with scale because the fixed `F` is amortized over more area.

### 5.1 Total cost by service and size — low / mid / high

| Service | 5,000 sq ft (low / mid / high) | 20,000 sq ft (low / mid / high) | 50,000 sq ft (low / mid / high) |
|---|---|---|---|
| TPO / PVC                  | `[PLACEHOLDER]` / `[PLACEHOLDER]` / `[PLACEHOLDER]` | `[PLACEHOLDER]` / `[PLACEHOLDER]` / `[PLACEHOLDER]` | `[PLACEHOLDER]` / `[PLACEHOLDER]` / `[PLACEHOLDER]` |
| Metal                      | `[PLACEHOLDER]` / `[PLACEHOLDER]` / `[PLACEHOLDER]` | `[PLACEHOLDER]` / `[PLACEHOLDER]` / `[PLACEHOLDER]` | `[PLACEHOLDER]` / `[PLACEHOLDER]` / `[PLACEHOLDER]` |
| Mod Bit / BUR              | `[PLACEHOLDER]` / `[PLACEHOLDER]` / `[PLACEHOLDER]` | `[PLACEHOLDER]` / `[PLACEHOLDER]` / `[PLACEHOLDER]` | `[PLACEHOLDER]` / `[PLACEHOLDER]` / `[PLACEHOLDER]` |
| Coatings / Restoration     | `[PLACEHOLDER]` / `[PLACEHOLDER]` / `[PLACEHOLDER]` | `[PLACEHOLDER]` / `[PLACEHOLDER]` / `[PLACEHOLDER]` | `[PLACEHOLDER]` / `[PLACEHOLDER]` / `[PLACEHOLDER]` |
| Full Replacement (w/ TPO)  | `[PLACEHOLDER]` / `[PLACEHOLDER]` / `[PLACEHOLDER]` | `[PLACEHOLDER]` / `[PLACEHOLDER]` / `[PLACEHOLDER]` | `[PLACEHOLDER]` / `[PLACEHOLDER]` / `[PLACEHOLDER]` |
| Repair (mapped, see §4.6)  | `[PLACEHOLDER]` / `[PLACEHOLDER]` / `[PLACEHOLDER]` | `[PLACEHOLDER]` / `[PLACEHOLDER]` / `[PLACEHOLDER]` | `[PLACEHOLDER]` / `[PLACEHOLDER]` / `[PLACEHOLDER]` |

### 5.2 Effective $/sq ft by service and size (using mid)

Effective $/sq ft `= Total_mid(A) / A`. Watch how it falls as `A` grows — that's `F_mid/A` shrinking.

| Service | 5,000 sq ft | 20,000 sq ft | 50,000 sq ft |
|---|---|---|---|
| TPO / PVC                  | `[PLACEHOLDER]` | `[PLACEHOLDER]` | `[PLACEHOLDER]` |
| Metal                      | `[PLACEHOLDER]` | `[PLACEHOLDER]` | `[PLACEHOLDER]` |
| Mod Bit / BUR              | `[PLACEHOLDER]` | `[PLACEHOLDER]` | `[PLACEHOLDER]` |
| Coatings / Restoration     | `[PLACEHOLDER]` | `[PLACEHOLDER]` | `[PLACEHOLDER]` |
| Full Replacement (w/ TPO)  | `[PLACEHOLDER]` | `[PLACEHOLDER]` | `[PLACEHOLDER]` |
| Repair (mapped)            | `[PLACEHOLDER]` | `[PLACEHOLDER]` | `[PLACEHOLDER]` |

### 5.3 What the table should tell us once filled in

- Coating should be the lowest $/sq ft at every size — it's a restoration, not a new system.
- Metal should be the highest $/sq ft at every size.
- Full Replacement should always be strictly greater than TPO alone at the same size — by roughly `(r_tearoff + r_disposal) · A + (F_repl − F_tpo)`.
- The 5,000 sq ft column should show a noticeably higher $/sq ft than 50,000 for every service. If it doesn't, our `F` is probably set too low.
- Repair's effective $/sq ft (mapped against full roof area) should fall sharply as `A` grows when `φ` is held constant — because `MinRepair` and `F_repair` are amortized over a larger denominator.

---

## 6. Edge Cases, Surcharges & Minimums

These adjust the base formula. Apply them after the base `Total(A)` is computed.

### 6.1 Repair minimum invoice

- Repair total is bounded below by `MinRepair` (see §3.6). If `F_repair + r_repair · A_affected < MinRepair`, bill `MinRepair`.
- Do **not** waive `MinRepair` for an existing customer without owner approval — it represents real truck-roll cost.

### 6.2 Coating restorability gate

Before quoting coating, the substrate must pass all of:

- Remaining membrane life ≥ `[PLACEHOLDER: min remaining life years]`.
- Saturated insulation < `[PLACEHOLDER: max saturated insulation %]` of roof area (confirm with infrared or core cuts).
- No active structural deck deflection or rot.
- Prior coating, if any, is compatible or fully removed (removal billed separately).

If any check fails, quote replacement (§3.5) or recover instead.

### 6.3 Tear-off vs recover decision

- Recover (install new system over existing) is permitted when the existing roof has ≤ 1 ply and is dry — saves the customer roughly `(r_tearoff + r_disposal) · A`.
- Tear-off is required when there are already 2 plies (code), or any saturation, or substrate failure.
- Document the decision in the estimate notes; it is the single biggest swing factor on a replacement quote.

### 6.4 Access and height surcharges

Add to the base total when the access assumption in §2 does not hold:

- **Multi-story (≥ 2 stories above grade):** `+ [PLACEHOLDER: multi-story uplift % of base]`.
- **Crane required (no truck-mounted lift access):** `+ [PLACEHOLDER: crane day rate $] · [days]`.
- **After-hours / occupied-building (nights, weekends, hospitals, schools):** `+ [PLACEHOLDER: after-hours uplift % of labor]`.
- **Restricted lay-down area:** `+ [PLACEHOLDER: staging surcharge $]`.

### 6.5 Tax handling

- Quoted totals are pre-tax.
- For tax-exempt customers, obtain the exemption certificate **before** invoicing.
- For taxable customers, sales tax is computed on materials (and on labor where the jurisdiction taxes it) at invoice time.

### 6.6 Flagging missing inputs

Any line that still reads `[PLACEHOLDER: …]` when this document is used to back a customer-facing number is a blocker. Do not quote against placeholders — escalate to the owner to fill in the real range, then re-run the math.

---

## 7. Conclusions / How to Use

1. **Ballpark a job:** Pick the service, plug `A` into `Total(A) = F + r · A`, use low / mid / high to give a range and a central estimate, round each to the nearest $100.
2. **Sanity-check a vendor estimator number:** Drop the estimator's total into the §5 comparison table at the customer's roof size. If it falls outside the low–high band by more than `[PLACEHOLDER: tolerance %]`, dig into which surcharge or exclusion explains the gap.
3. **Train staff:** Walk new estimators through §3 and §6 first — the formula is easy, the exclusions and surcharges are where mistakes happen.
4. **Feed the public estimator (Task #43):** Public surface should show a range only (anchored on mid, bounded by low/high), never a single number, and never go below the minimums in §3 or §6.1.
5. **Keep this doc current:** When the owner updates a rate, edit the corresponding `[PLACEHOLDER]` in §3, then re-render the PDF (see `docs/pricing/README.md`).
