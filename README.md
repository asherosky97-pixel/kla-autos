# klaautos.ug 🚗🇺🇬

> **Reverse-Bidding & Anti-Broker Verified Auto Marketplace for Uganda**  
> *Adapting the Carwow UK model for Kampala's automotive landscape.*

---

## 🌟 Executive Summary

In Uganda, 90%+ of car purchases involve:
1. **Unregistered Japanese/Dubai imports** sitting in bonded warehouses (*bonds*) across Nakawa, Kyambogo, Banda, and Pine.
2. **Direct CIF import orders** shipped via Mombasa port with heavy Uganda Revenue Authority (URA) taxes.
3. **Numbered local used cars** (UBH, UBJ, UBL, UBN, UBP...) traded through aggressive street brokers (*"bakayungirizi"*).

**klaautos.ug** adapts Carwow’s reverse-bidding model to the realities of Kampala by eliminating phantom middleman markups, providing transparent URA landed cost calculations, matching trade-in top-ups, and letting verified car bonds compete for buyer requests directly via WhatsApp.

---

## ⚡ Core Features

### 1. 🛡️ Anti-Broker Photo & Stock Protection Shield
- Dynamic image watermarking (`VERIFIED BOND STOCK • NO BROKER REPOST`)
- Context-menu & drag-and-drop interception preventing street brokers from stealing bond inventory photos
- Verified bond badge & yard presence validation

### 2. 🧮 URA Customs Tax & Landed Cost Engine
Deterministic calculation based on Ugandan Customs Tariff & Valuation guidelines:
- **25%** Import Duty
- **18%** VAT
- **6%** Withholding Tax (WHT)
- **1.5%** Infrastructure Levy
- **Tiered Environmental Levy** (exempt under 5 years, scaling up to 50% for older units)
- Mombasa-to-Kampala transit, port handling, and standard URA registration plates

### 3. 🎯 Reverse-Bidding Vehicle Request Wizard
- 4-step buyer requirement capture (Make, Model, Year, Fuel, Budget in UGX, and Acquisition mode)
- Automated generation of verified WhatsApp lead payloads
- Real-time quotation simulator demonstrating competing discounted quotes from Nakawa and Pine bond managers

### 4. 🔄 "Top-Up" Swap & Trade-In Matcher
- Direct calculation of the cash difference required to upgrade from an existing registered vehicle to a newer bond unit

### 5. 🏦 Ugandan Asset Finance Calculator
- Monthly installment breakdown based on commercial bank terms from Stanbic Bank, DFCU, Equity Bank, and NCBA

### 6. 🔍 Japanese Auction Sheet & Pre-Purchase Escrow Hub
- Japanese auction sheet translation & odometer rollback detection (Grades 3.0 to 5.0)
- 150-point mobile inspection booking across Kampala and Wakiso districts

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Vanilla CSS with custom design tokens, dark automotive glassmorphism, and responsive layouts
- **Icons:** [Lucide React](https://lucide.dev/)
- **Visuals:** Canvas Confetti for conversion milestones

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.17+ or v20+)
- npm or yarn

### Installation
```bash
git clone https://github.com/asherosky97-pixel/kla-autos.git
cd kla-autos
npm install
```

### Running Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to explore the platform.

---

## 📄 License
MIT License. Built for the Ugandan automotive community.
