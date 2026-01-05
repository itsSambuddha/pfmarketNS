"use client"

import * as React from "react"
import { Slider } from "@/components/ui/slider"
import { Users, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface ReferralCalculatorProps {
  basePrice: number
  onPriceUpdate: (newPrice: number, isDiscounted: boolean) => void
}

export function ReferralCalculator({ basePrice, onPriceUpdate }: ReferralCalculatorProps) {
  const [referrals, setReferrals] = React.useState([0])

  // Logic: Each friend = 50% off base price? 
  // Wait, 1 friend = 50% off. 2 friends = Free? No, cap is 80%.
  // Let's use a smoother curve: 1 friend = 20%, 2 = 40%, 3 = 60%, 4+ = 80% (Max).
  // Or stick to your prompt: "Discount you'll get (max 80%)".
  
  const calculateDiscount = (count: number) => {
    if (count === 0) return 0
    // Linear logic: 20% per friend up to 80% (4 friends)
    const discountPercent = Math.min(count * 0.20, 0.80)
    return discountPercent
  }

  const discountPercent = calculateDiscount(referrals[0])
  const savings = Math.round(basePrice * discountPercent)
  const finalPrice = Math.round(basePrice - savings)

  // Notify parent component whenever price changes
  React.useEffect(() => {
    onPriceUpdate(finalPrice, referrals[0] > 0)
  }, [finalPrice, referrals])

  return (
    <div className="w-full p-4 rounded-lg bg-secondary/30 border border-primary/10 mt-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-primary">
          <Users className="w-4 h-4" />
          <span>Bring Friends, Save Cash</span>
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Max 80% Off
        </span>
      </div>

      <div className="py-2">
        <Slider
          defaultValue={[0]}
          max={5}
          step={1}
          value={referrals}
          onValueChange={setReferrals}
          className="cursor-pointer"
        />
        <div className="flex justify-between mt-2 text-[10px] text-muted-foreground font-medium uppercase">
          <span>0 Friends</span>
          <span>5 Friends</span>
        </div>
      </div>

      <div className="flex items-center justify-between p-3 rounded bg-background/50 border border-border/50 backdrop-blur-sm">
        <span className="text-sm text-muted-foreground">
          Referrals: <strong className="text-foreground">{referrals[0]}</strong>
        </span>
        
        <div className="text-right">
            {discountPercent > 0 && (
                <div className="text-xs text-muted-foreground line-through decoration-red-400">
                    ₹{basePrice}
                </div>
            )}
            <div className={cn("text-lg font-bold", discountPercent > 0 ? "text-green-500 flex items-center gap-1" : "text-foreground")}>
                ₹{finalPrice}
                {discountPercent > 0 && <Sparkles className="w-3 h-3 animate-pulse" />}
            </div>
        </div>
      </div>
    </div>
  )
}