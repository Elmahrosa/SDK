![CI](https://github.com/Elmahrosa/SDK/actions/workflows/ci.yml/badge.svg)
# 🇪🇬 Elmahrosa SDK
**Egypt’s Sovereign Developer Toolkit — Warp All Chains**

Elmahrosa SDK is the official developer toolkit for building on **TEOS infrastructure**.  
It provides **core primitives**, **multi-chain adapters**, **compliance-aware plugins**, and **UI helpers** so civic apps, institutions, and builders can integrate TEOS capabilities with consistent APIs.

> Companion repo: **Elmahrosa-API** (service layer).  
> This repo: **Elmahrosa-SDK** (client + integration toolkit).

---

## ✨ What you get

### Core modules
- **Auth** — wallet-based sessions + role primitives
- **Wallet** — balances, transfers, mint/stake request builders
- **Governance** — petitions, proposals, voting, thresholds
- **I18n** — translation/detection wrappers (pluggable provider)

### Chain wrappers (adapters)
- Solana, Ethereum, Bitcoin, Base, BNB, Pi, TEOS  
Each chain wrapper implements a shared interface so apps can switch chains with minimal changes.

### Plugins
- **BankChain** — compliance & risk policy helpers (audit-ready)
- **Dolphin** — liquidity + marketplace feed clients
- **Pump** — mint/stake flows and launch utilities

### UI (optional)
- Minimal components and helpers for dashboards:
  - Marketplace charts
  - Petition voting panels
  - Governance progress indicators

---

## 🚀 Quick Start

### Install
```bash
npm install elmahrosa-sdk
# or
pnpm add elmahrosa-sdk
```

### Import
```js
import { Auth, Wallet, Governance, I18n, Chains } from "elmahrosa-sdk";
```

### Example: multi-chain balance
```js
import { Chains } from "elmahrosa-sdk";

const sol = new Chains.Solana({ rpcUrl: process.env.SOLANA_RPC });
const bal = await sol.getBalance({ address: "YOUR_WALLET", token: "TEOS" });
console.log("TEOS balance:", bal);
```

---

## 🧩 Integration targets
- TEOS sovereign modules (auth, governance, civic services)
- TEOS Pump minting engine
- Dolphin liquidity marketplace
- Institutional compliance controls (policy-first patterns)

---

## 🧪 Testing
```bash
npm test
```

---

## 🗓 Roadmap (high-level)
- **Q1 2026:** core modules + chain wrappers foundation
- **April 2026:** UI polish + mobile scaffolds (Kotlin/Swift)
- **May 5–7, 2026:** Warp All Chains showcase (Consensus Miami)

See: [`ROADMAP.md`](./ROADMAP.md)

---

## 🔐 Security & compliance
This SDK is **non-custodial by default** and designed to integrate with:
- **policy engines**
- **audit logs**
- **institutional key management**

See: [`docs/SECURITY.md`](./docs/SECURITY.md)

---

## 📄 License
MIT — see [`LICENSE.md`](./LICENSE.md)

---

**Built by Elmahrosa International**  
From Egypt to the world.
