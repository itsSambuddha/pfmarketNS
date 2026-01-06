"use client";

import * as React from "react";
import { Slider } from "@/components/ui/slider";
import { Clock, Layers, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReferralCalculatorProps {
  basePrice: number;
  onPriceUpdate: (newPrice: number, isDiscounted: boolean) => void;
  serviceId?: string; // "deck" | "report"
}

type DeckTier = {
  id: number;
  label: string;
  slides: number;
  price: number;
  tatLabel: string;
  perks: string[];
};

type ReportTier = {
  id: number;
  label: string;
  pages: number;
  price: number;
  tatLabel: string;
  perks: string[];
};

// Hard constants for naive pricing
const DECK_NAIVE_PER_SLIDE = 30;
const REPORT_NAIVE_PER_PAGE = 120;

// Deck tiers (slides, with fixed discounts vs ₹30/slide)
const DECK_TIERS: DeckTier[] = [
  {
    id: 0,
    label: "5 slides (hook)",
    slides: 5,
    price: 120,
    tatLabel: "7–10 days (+0)",
    perks: ["Core narrative spine", "Clean visual system"],
  },
  {
    id: 1,
    label: "10 slides (standard)",
    slides: 10,
    price: 220,
    tatLabel: "10–14 days (+2)",
    perks: [
      "Core narrative spine",
      "Clean visual system",
      "Basic evidence slides",
    ],
  },
  {
    id: 2,
    label: "15 slides (seminar)",
    slides: 15,
    price: 310,
    tatLabel: "12–16 days (+4)",
    perks: [
      "Core narrative spine",
      "Clean visual system",
      "Extra evidence slides",
      "One deep‑dive section",
    ],
  },
  {
    id: 3,
    label: "20 slides (viva defence)",
    slides: 20,
    price: 390,
    tatLabel: "13–17 days (+5)",
    perks: [
      "Core narrative spine",
      "Clean visual system",
      "Extra evidence slides",
      "Two deep‑dive sections",
      "Partner‑ready export pass",
    ],
  },
  {
    id: 4,
    label: "25 slides (conference)",
    slides: 25,
    price: 460,
    tatLabel: "14–18 days (+6)",
    perks: [
      "Core narrative spine",
      "Clean visual system",
      "Multi‑section deep dive",
      "Partner‑ready export pass",
      "Optional appendix pack",
    ],
  },
  {
    id: 5,
    label: "30+ slides (flagship)",
    slides: 30,
    price: 520,
    tatLabel: "15–20 days (+7)",
    perks: [
      "Core narrative spine",
      "Clean visual system",
      "Multi‑section deep dive",
      "Partner‑ready export pass",
      "Optional appendix pack",
      "Stakeholder‑ready variations",
    ],
  },
];

// Report tiers (pages, with naive = 120/page)
const REPORT_TIERS: ReportTier[] = [
  {
    id: 0,
    label: "Core brief (~10 pages)",
    pages: 10,
    price: 900,
    tatLabel: "10–14 days (+0)",
    perks: [
      "Moderate primary + secondary research",
      "Structured argument spine",
      "Baseline visual tables & charts",
    ],
  },
  {
    id: 1,
    label: "Seminar dossier (~20 pages)",
    pages: 20,
    price: 1750,
    tatLabel: "13–18 days (+3)",
    perks: [
      "Moderate research with extra sources",
      "Structured argument spine",
      "Visual tables & basic charts",
      "Strengthened literature section",
    ],
  },
  {
    id: 2,
    label: "Extended study (~30 pages)",
    pages: 30,
    price: 2550,
    tatLabel: "16–22 days (+6)",
    perks: [
      "Deeper research, more databases",
      "Structured argument spine",
      "Visual tables & charts",
      "Strengthened literature + methodology",
      "Reviewer‑friendly executive summary",
    ],
  },
  {
    id: 3,
    label: "Thesis‑grade (~40 pages)",
    pages: 40,
    price: 3300,
    tatLabel: "20–28 days (+10)",
    perks: [
      "Deep research with multiple databases",
      "Structured argument + counter‑arguments",
      "Visual tables, charts & diagrams",
      "Strong literature + methodology + discussion",
      "Executive summary + abstract polish",
      "Citation + formatting compliance",
    ],
  },
  {
    id: 4,
    label: "Capstone (~50 pages)",
    pages: 50,
    price: 3950,
    tatLabel: "22–30 days (+12)",
    perks: [
      "Deep research + ongoing source updates",
      "Structured argument + counter‑arguments",
      "Visual tables, charts & diagrams",
      "Full thesis‑grade sections end‑to‑end",
      "Executive summary + abstract polish",
      "Citation + formatting compliance",
      "Annexures / appendices pack",
    ],
  },
  {
    id: 5,
    label: "Flagship dossier (60+ pages)",
    pages: 60,
    price: 4500,
    tatLabel: "24–32 days (+14)",
    perks: [
      "Deep research + ongoing source updates",
      "Structured argument + counter‑arguments",
      "Visual tables, charts & diagrams",
      "Full thesis‑grade sections end‑to‑end",
      "Executive summary + abstract polish",
      "Citation + formatting compliance",
      "Annexures / appendices pack",
    ],
  },
];

export function ReferralCalculator({
  basePrice,
  onPriceUpdate,
  serviceId,
}: ReferralCalculatorProps) {
  const [level, setLevel] = React.useState<[number]>([0]);

  const isReport = serviceId === "report";
  const tiers = isReport ? REPORT_TIERS : DECK_TIERS;

  const currentTier = React.useMemo(() => {
    const idx = Math.max(0, Math.min(tiers.length - 1, level[0]));
    return tiers[idx];
  }, [level, tiers]);

  const currentPrice = currentTier.price;

  // Naive price from fixed per-unit rates
  const naivePrice = React.useMemo(() => {
    if (isReport) {
      const t = currentTier as ReportTier;
      return Math.round(t.pages * REPORT_NAIVE_PER_PAGE);
    }
    const t = currentTier as DeckTier;
    return Math.round(t.slides * DECK_NAIVE_PER_SLIDE);
  }, [currentTier, isReport]);

  const savings = React.useMemo(
    () => Math.max(0, naivePrice - currentPrice),
    [naivePrice, currentPrice],
  );

  const discountPercent = React.useMemo(() => {
    if (naivePrice <= 0 || savings <= 0) return 0;
    const pct = Math.round((savings / naivePrice) * 100);
    return Math.max(0, Math.min(100, pct));
  }, [naivePrice, savings]);

  React.useEffect(() => {
    // Mark as "discounted" when user moves off the base tier
    onPriceUpdate(currentPrice, level[0] > 0);
  }, [currentPrice, level, onPriceUpdate]);

  const scopeUnit = isReport ? "pages" : "slides";

  const perUnit = React.useMemo(() => {
    if (isReport) {
      const t = currentTier as ReportTier;
      return currentPrice / t.pages;
    }
    const t = currentTier as DeckTier;
    return currentPrice / t.slides;
  }, [currentTier, currentPrice, isReport]);

  const perks = (currentTier as DeckTier | ReportTier).perks;

  return (
    <div className="mt-6 w-full space-y-4 rounded-2xl border border-white/15 bg-gradient-to-br from-background/60 via-slate-900/60 to-background/80 p-4 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-primary">
          <Layers className="h-4 w-4" />
          <span>Scope & pricing preview</span>
        </div>
        <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          Tier {level[0] + 1} / {tiers.length}
        </span>
      </div>

      <div className="py-2">
        <Slider
          defaultValue={[0]}
          max={tiers.length - 1}
          step={1}
          value={level}
          onValueChange={(val) => setLevel([val[0] ?? 0])}
          className="cursor-pointer"
        />
        <div className="mt-2 flex justify-between text-[10px] font-medium uppercase text-muted-foreground">
          <span>{tiers[0].label}</span>
          <span>{tiers[tiers.length - 1].label}</span>
        </div>
      </div>

      {/* Price comparison */}
      <div className="flex flex-col gap-3 rounded-2xl border border-white/15 bg-background/60 p-3 backdrop-blur">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            If priced strictly per {scopeUnit}
          </span>
          <span className="text-xs text-muted-foreground line-through decoration-red-400">
            ₹{naivePrice}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              You lock in
            </span>
            <span className="text-sm text-muted-foreground">
              {currentTier.label}
            </span>
          </div>

          <div className="text-right">
            <div
              className={cn(
                "flex items-center justify-end gap-1 text-lg font-bold",
                discountPercent > 0 ? "text-emerald-500" : "text-foreground",
              )}
            >
              ₹{currentPrice}
              {discountPercent >= 15 && (
                <Sparkles className="h-3 w-3 text-emerald-400 animate-pulse" />
              )}
            </div>
            <div className="text-[11px] text-muted-foreground">
              ~₹{perUnit.toFixed(0)} per {scopeUnit}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px]">
          <div className="text-emerald-500">
            {discountPercent > 0 ? (
              <>
                Effective discount:{" "}
                <span className="font-semibold">
                  {discountPercent}% (₹{savings})
                </span>
              </>
            ) : (
              <>Base cohort anchor</>
            )}
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>Turnaround: {currentTier.tatLabel}</span>
          </div>
        </div>
      </div>

      {/* Stacked perks */}
      <div className="rounded-2xl border border-white/10 bg-background/50 p-3 text-[11px] backdrop-blur">
        <p className="mb-2 font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          What gets added as you go up
        </p>
        <ul className="space-y-1 text-muted-foreground">
          {perks.map((perk) => (
            <li key={perk} className="flex items-start gap-1.5">
              <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>{perk}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
