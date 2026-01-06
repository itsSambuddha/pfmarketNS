"use client"

import * as React from "react"
import { Slider } from "@/components/ui/slider"
import { Users, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface ReferralCalculatorProps {
  basePrice: number
  onPriceUpdate: (newPrice: number, isDiscounted: boolean) => void
  serviceId?: string // "deck" | "report"
}

// PPT (Cinematic Deck) – 0 → 250, 1 → 200, 2 → 160, 3 → 130, 4 → 100, 5 → 90
const REFERRAL_PRICE_MAP_DECK = [250, 200, 160, 130, 100, 90] as const

// Report – 0 → 1000, 1 → 900, 2 → 800, 3 → 700, 4 → 600, 5 → 500
const REFERRAL_PRICE_MAP_REPORT = [1000, 900, 800, 700, 600, 500] as const

export function ReferralCalculator({
  basePrice,
  onPriceUpdate,
  serviceId,
}: ReferralCalculatorProps) {
  const [referrals, setReferrals] = React.useState<[number]>([0])

  const priceMap =
    serviceId === "report" ? REFERRAL_PRICE_MAP_REPORT : REFERRAL_PRICE_MAP_DECK

  const currentPrice = React.useMemo(() => {
    const count = referrals[0]
    const clamped = Math.max(0, Math.min(5, count))
    return priceMap[clamped]
  }, [referrals, priceMap])

  // Force base for report = 1000, for deck use incoming or default 250
  const effectiveBase = React.useMemo(() => {
    if (serviceId === "report") {
      return REFERRAL_PRICE_MAP_REPORT[0] // 1000
    }
    return basePrice > 0 ? basePrice : REFERRAL_PRICE_MAP_DECK[0]
  }, [basePrice, serviceId])

  const discountPercent = React.useMemo(() => {
    const diff = effectiveBase - currentPrice
    if (effectiveBase <= 0 || diff <= 0) return 0
    const pct = Math.round((diff / effectiveBase) * 100)
    return Math.max(0, Math.min(100, pct))
  }, [effectiveBase, currentPrice])

  const savings = React.useMemo(
    () => Math.max(0, effectiveBase - currentPrice),
    [effectiveBase, currentPrice],
  )

  const maxDiscountPercent = React.useMemo(() => {
    const minPrice = priceMap[priceMap.length - 1]
    const diff = effectiveBase - minPrice
    if (effectiveBase <= 0 || diff <= 0) return 0
    const pct = Math.round((diff / effectiveBase) * 100)
    return Math.max(0, Math.min(100, pct))
  }, [effectiveBase, priceMap])

  React.useEffect(() => {
    onPriceUpdate(currentPrice, referrals[0] > 0)
  }, [currentPrice, referrals, onPriceUpdate])

  return (
    <div className="mt-6 w-full space-y-4 rounded-2xl border border-white/15 bg-gradient-to-br from-background/60 via-slate-900/60 to-background/80 p-4 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-primary">
          <Users className="h-4 w-4" />
          <span>Bring Friends, Save Cash</span>
        </div>
        <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          Up to {maxDiscountPercent}% Off
        </span>
      </div>

      <div className="py-2">
        <Slider
          defaultValue={[0]}
          max={5}
          step={1}
          value={referrals}
          onValueChange={(val) => setReferrals([val[0] ?? 0])}
          className="cursor-pointer"
        />
        <div className="mt-2 flex justify-between text-[10px] font-medium uppercase text-muted-foreground">
          <span>0 Friends</span>
          <span>5 Friends</span>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-white/15 bg-background/60 p-3 backdrop-blur">
        <span className="text-sm text-muted-foreground">
          Referrals:{" "}
          <strong className="text-foreground">{referrals[0]}</strong>
        </span>

        <div className="text-right">
          {discountPercent > 0 && (
            <div className="text-xs text-muted-foreground line-through decoration-red-400">
              ₹{effectiveBase}
            </div>
          )}
          <div
            className={cn(
              "flex items-center justify-end gap-1 text-lg font-bold",
              discountPercent > 0 ? "text-green-500" : "text-foreground",
            )}
          >
            ₹{currentPrice}
            {discountPercent > 0 && (
              <Sparkles className="h-3 w-3 animate-pulse" />
            )}
          </div>
          {discountPercent > 0 && (
            <div className="text-[11px] text-emerald-500">
              You save {discountPercent}% (₹{savings})
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
