# **CAMPUS_SLATENS**: Strategic Visuals Platform 
*(@pfmarket – N Sam’s N )*

[![Version](https://img.shields.io/badge/version-1.0-blue?style=flat-square)](https://github.com/your-username/pfmarket)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-campusslatens.vercel.app-blue)](https://campusslatens.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16+-black?style=flat-square\&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square\&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square\&logo=tailwind-css)](https://tailwindcss.com/)

A single-page consulting platform for cinematic academic decks and architected reports, designed with the polish of a Series-A SaaS landing page.

![pfmarket Banner](https://socialify.git.ci/itsSambuddha/pfmarketNS/image?custom_language=Next.js&font=Jost&language=1&name=1&owner=1&pattern=Formal+Invitation&stargazers=1&theme=Dark)

---

## What is pfmarket?

**pfmarket** is a single-surface consulting site focused on two key services: **Cinematic Decks** and **Architected Reports**.

Unlike complex SaaS platforms, this project is intentionally **database-free** (no dashboard, no auth). It relies on a high-signal aesthetic to build trust, utilizing a seamless QR + WhatsApp flow for payment intent.

### Service Offerings

* **Cinematic Deck**: High-impact presentations for students. *(₹250 per 10 slides)*
* **Architect's Report**: Structuring chaos into academic precision. *(₹900 per project)*

---

## Key Features

* **🎬 Cinematic Hero Section**: Aceternity-style background beams and aurora effects for maximum visual impact.
* **🧊 Service Bento Grid**: Modern layout showcasing the Cinematic Deck, Architect’s Report, and Refund Shield.
* **🪟 Glassmorphic Shell**: Background grids and blurred blobs creating modern UI depth.
* **🌗 Light/Dark Mode**: Seamless theming powered by `next-themes`.
* **📱 QR + WhatsApp Payment**: Friction-free payment intent flow without internal backend overhead.
* **📈 Referral/ROI Calculator**: Interactive slider with capped logic.

### Referral Logic

The platform includes a smart calculator to show potential savings:

```ts
savingsRaw = referrals * 0.5 * basePrice
savings = Math.min(savingsRaw, 0.9 * basePrice) // Capped at 90%
```

---

## Tech Stack

* **Frontend**: Next.js 16+ (App Router)
* **Language**: TypeScript
* **Styling**: Tailwind CSS v4 (CSS-first via `@import`, tokens in `globals.css`)
* **UI Components**: shadcn/ui + Aceternity UI patterns
* **Animations**: Framer Motion (Hero + micro-interactions)
* **Icons**: Lucide React
* **Backend**: None (No DB, No Server Actions, No Auth)
* **Deployment**: Vercel

---

<!-- ## Why pfmarket?

**Before pfmarket:**

* Ad-hoc chats and unclear scope
* Verbal, inconsistent pricing
* Informal booking agreements
* Informal or ignored referrals

**With pfmarket:**

* Single high-signal link for communication
* Clear, upfront pricing
* Structured "Lock Slot" booking flow
* Automated calculator with capped savings

### Interaction Overview

| Aspect        | Before pfmarket ❌           | With pfmarket ✅                          |
| ------------- | --------------------------- | ---------------------------------------- |
| Communication | Ad-hoc chats, unclear scope | Single high-signal link                  |
| Pricing       | Verbal, inconsistent        | Clear, upfront pricing                   |
| Booking       | Informal agreement          | Structured "Lock Slot" flow              |
| Referrals     | Informal/ignored            | Automated calculator with capped savings |

--- -->

## User Classes

* **Primary Clients**: Students,Freshers, others seeking high-quality academic visuals using the site to calculate ROI and book via WhatsApp.
* **Referrers**: Peers looking for discounts using the calculator to visualize potential savings.
* **Platform Operator**: Uses the site as a maintenance-free marketing tool without backend overhead.

---

## Getting Started

This section is for developers looking to extend the project locally.

### Prerequisites

* Node.js 18+
* WhatsApp Number (for receiving intents)
* GPay QR Code image

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/pfmarket.git
   cd pfmarket
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   ```

### Environment Configuration

`.env` is optional as most values are hardcoded for this static-style site.
Optionally set `NEXT_PUBLIC_WHATSAPP_NUMBER` in `.env.local`.

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```txt
pfmarket/
├── app/
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Main landing page
│   └── globals.css        # Tailwind v4 imports & global styles
├── components/
│   ├── ui/                # Shadcn UI reusable components
│   ├── layout/            # Navbar, Footer
│   └── features/          # Bento Grid, Calculator, Hero
├── lib/
│   ├── constants.ts       # Service tiers and pricing logic
│   └── utils.ts           # Utility functions (cn, formatters)
├── public/
│   ├── gpay_qr.png        # Payment QR codes
│   └── assets/            # Logos and samples
└── tailwind.config.ts     # Tailwind configuration
```

---

## Core Flows

* **Theme Switching**: User toggles theme → `next-themes` updates `html` class → Tailwind adapts styles.
* **Service Selection & Payment**: User selects tier in Bento Grid → "Lock Slot" → BookingDialog → QR Scan / WhatsApp Link.
* **Referral Calculator**: User slides bar → savings calculated dynamically → price breakdown updates instantly.

---

## Roadmap

* [ ] Add case studies section with client testimonials.
* [ ] Implement an intake form for detailed project requirements.
* [ ] Integrate basic analytics (e.g., Vercel Analytics).
* [ ] Expand to multi-language support.

---

## License

This is a personal/portfolio product for **myself**.

* **Code Architecture**: Open for inspiration.
* **Branding/Copy**: Reuse requires explicit permission.
)
---
