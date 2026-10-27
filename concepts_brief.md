# klaautos.ug — Reverse-Bidding & Verified Auto Marketplace for Uganda

* **Project:** klaautos.ug
* **Date:** 2026-10-27
* **Status:** Initial EGM Concept & Architecture Brief

---

## 1. Executive Summary & Problem Statement

Carwow UK transformed vehicle purchasing in Europe by allowing buyers to configure factory-new vehicles and receive competitive discounted quotes from franchised dealers. 

In Uganda, a direct replica fails because 90%+ of vehicle transactions are:
1. Unregistered used Japanese/Dubai imports sitting in bonded warehouses (bonds) in Nakawa, Kyambogo, Banda, and Pine.
2. Direct-order Japanese imports (via SBT, BeForward, TradeCarView) with complex CIF and URA tax liabilities.
3. Numbered local used cars (e.g., UBH, UBJ, UBL, UBN, UBP series) traded privately or through unregistered street brokers (*"bakayungirizi"*).

The primary friction points in Kampala's automotive market are:
* **Middleman Rent-Seeking:** Unverified street brokers photograph cars sitting in bonds they do not own, inflating prices by UGX 3,000,000 to UGX 7,000,000.
* **Tax Opacity:** Buyers do not understand the Uganda Revenue Authority (URA) motor vehicle valuation database, depreciation tables, and punitive environmental levies on vehicles older than 8–15 years.
* **Condition Fraud:** Odometer rollback, concealed accident repairs, and counterfeit or encumbered logbooks.
* **Trade-In Friction:** Ugandans frequently upgrade vehicles via "swap + cash top-up," but bonds lack a structured liquidity mechanism for trade-ins.

`klaautos.ug` adapts the Carwow reverse-bidding model to Uganda by creating a verified marketplace where verified car bonds and licensed importers compete directly for buyer requests with transparent landed pricing, integrated URA tax computations, and anti-broker validation.

---

## 2. REA System Breakdown: Carwow Patterns vs. klaautos.ug Adaptation

Reverse engineering Carwow's core application controllers reveals several key subsystems. Below is their direct adaptation for the Ugandan market:

| Carwow Controller Subsystem | Carwow UK Function | `klaautos.ug` Adaptation |
| :--- | :--- | :--- |
| `controllers/buying/qualification_concierge` | Multi-step buyer requirement capture & finance readiness. | **Vehicle Request Wizard:** Captures Make, Model, Year range, Transmission, Fuel, Preferred Color, Budget (UGX), and Acquisition Mode (Bond Stock vs. Direct Import vs. Numbered Used). |
| `controllers/buying/offers_loading_controller` | Aggregates dealer discounts off UK List RRP. | **Reverse-Bid Lead Engine:** Pushes qualified buyer requests to verified bond managers via WhatsApp API and dashboard; bonds submit best landed cash or top-up quotes. |
| `controllers/buying/part_exchange_component` | Used car trade-in valuation against new purchase. | **"Top-Up" Swap Matcher:** Buyer enters current car (e.g., 2008 Toyota Premio UBA...) + desired upgrade (e.g., 2017 Harrier Elegance). Bonds bid cash difference. |
| `controllers/selling/appraisal/accident_history` | Damage logging and condition assessment. | **Chassis & Logbook Verification:** Japan Auction Sheet verification (checking original grade, mileage, accident history) + URA e-Tax logbook validation. |
| `controllers/deals/range_calculator_controller` | PCP/HP lease monthly installments. | **Ugandan Asset Finance & Import Duty Loan Calculator:** Integrated monthly payment calculator with local commercial banks (Stanbic, DFCU, Equity, NCBA) and import clearance financiers. |
| `lib/phone_formats` & notification triggers | Email-first alerts to franchise dealers. | **WhatsApp-First Dealer Dispatch:** Direct Uganda-formatted (+256) WhatsApp action alerts with deep links for bond sales managers. |

---

## 3. High-Impact Differentiators ("Moats")

### 3.1. Embedded URA Car Tax & Landed Cost Engine
* **Input Parameters:** Make, Model, Year of Manufacture, Engine Capacity (CC), Fuel Type, CIF Mombasa (USD or UGX).
* **Automated Computation:**
  * Import Duty (25% of Customs Value / CIF)
  * VAT (18% of [Customs Value + Import Duty])
  * Withholding Tax (6% of Customs Value)
  * Infrastructure Levy (1.5% of Customs Value)
  * Environmental Levy (tiered by vehicle age: exempt under 5 years, 35%–50% on older units)
  * Port Handling & Carrier Transit (Mombasa to Kampala bonded warehouse)
  * Registration & Number Plate Fees (UGX ~1,400,000 for standard plates)
* **Output:** Transparent line-item breakdown showing exact Landed Cost in UGX.

### 3.2. Anti-Broker Verified Bond Network
* Only verified bonds with physical yards (Nakawa, Banda, Kyambogo, Jinja Road, Pine) and licensed TIN/VAT registration receive dealer bidding privileges.
* No unauthorized reposts. Every vehicle bid must include the physical bond yard location and current chassis number.

### 3.3. Swap + Top-Up Matching Engine
* Dedicated workflow allowing buyers to post their current vehicle with photos, registration series, and mechanical state.
* Bonds bid the cash difference required to drive out with the target car.

---

## 4. Goals vs. Non-Goals

### In-Scope Goals
* **P0 — Consumer Web Portal:** High-converting, responsive web interface with dark/light auto-styling, mobile-first optimization for Ugandan smartphone users.
* **P0 — Interactive URA Tax & Landed Cost Calculator:** Standalone and inline tool with preloaded common Ugandan vehicle profiles (Harrier, Premio, Fielder, Forester, Land Cruiser TX/V8, Passo, Hilux, RAV4, CX-5, Sienta).
* **P0 — Reverse-Bidding Vehicle Request Flow:** Step-by-step buyer wizard generating formal quote requests with WhatsApp notification simulation.
* **P0 — Bond Directory & Inventory Showcase:** Curated directory of verified Kampala car bonds with filterable stock.
* **P0 — Swap & Top-Up Estimator:** Trade-in difference calculator.
* **P1 — Mechanical Inspection & Logbook Escrow Request Flow:** On-demand booking for pre-purchase inspection in Kampala.

### Out-of-Scope Non-Goals
* Direct in-app banking card payment processing for multi-million shilling vehicle balances (payments are completed via bank draft, escrow, or direct bond transfer).
* European/American-only left-hand drive configurations (Uganda is strictly Right-Hand Drive RHD).
* Brand-new zero-mileage franchise ordering as primary inventory.

---

## 5. Technology Stack & Architecture

* **Frontend & Application Framework:** Next.js (App Router), React, TypeScript.
* **Styling & Design System:** Modern CSS tokens with rich automotive dark-mode aesthetics, responsive grids, micro-interactions, and high-DPI vehicle cards.
* **Tax Calculation Engine:** Pure TypeScript deterministic tax algorithm modeled after URA Customs Tariff & Valuation Guidelines.
* **State Management:** Reactive client state with local persistence for saved searches, quotes, and trade-in configurations.
* **Communication Layer:** WhatsApp direct links (`https://wa.me/256...`) and webhook-ready payload dispatch for dealer notifications.

---

## 6. Implementation Milestones

1. **Phase 1: Foundation & Tax Calculation Core**
   * Next.js project initialization in `d:/kla autos`.
   * Complete URA Tax and Landed Cost calculation module with real Ugandan customs rates and popular model database.
2. **Phase 2: Reverse-Bidding & Buyer Request Wizard**
   * 4-step car request generator ("Find Me a Car / Request Bond Offers").
   * Trade-in / Top-Up specification builder.
3. **Phase 3: Bond Marketplace & Verified Inventory**
   * Responsive vehicle catalogue with filters (Bond Stock vs. Direct Import vs. Numbered).
   * Bond profile pages (Nakawa, Pine, Kyambogo, Banda).
4. **Phase 4: WhatsApp Integration & Interactive Dealer Quote Simulation**
   * Real-time quotation simulator demonstrating how bond managers submit competitive bids back to the buyer.
