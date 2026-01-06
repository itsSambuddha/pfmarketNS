"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, Lock, ArrowRight, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SERVICE_TIERS, type ServiceTier } from "@/lib/constants"
import { BookingDialog } from "@/components/booking-dialog"
import { ReferralCalculator } from "@/components/referral-calculator"

export function ServiceProjector() {
  const [selectedId, setSelectedId] = React.useState<string>(
    SERVICE_TIERS[0]?.id,
  )
  const [isBookingOpen, setIsBookingOpen] = React.useState(false)

  const [finalPrice, setFinalPrice] = React.useState(250)
  const [isDiscounted, setIsDiscounted] = React.useState(false)
  const [discountPercent, setDiscountPercent] = React.useState(0)

  const activeService: ServiceTier | undefined = React.useMemo(
    () => SERVICE_TIERS.find((s) => s.id === selectedId) ?? SERVICE_TIERS[0],
    [selectedId],
  )

  const basePrice = 250

  const isFree = React.useMemo(
    () => activeService?.price?.toLowerCase().includes("free") ?? false,
    [activeService],
  )

  const isShield = activeService?.id === "shield"

  React.useEffect(() => {
    setFinalPrice(basePrice)
    setIsDiscounted(false)
    setDiscountPercent(0)
  }, [basePrice, selectedId])

  if (!activeService) return null

  return (
    <section
      id="services"
      className="relative w-full overflow-hidden py-24"
      aria-labelledby="services-heading"
    >
      {/* Ambient background */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.16),transparent_80%)] dark:bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.24),transparent_85%)]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:80px_80px,72px_72px] opacity-[0.24]" />

      <div className="relative z-10 container px-4 md:px-6">
        {/* Section header */}
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-700 shadow-sm backdrop-blur-xl dark:border-sky-400/40 dark:bg-slate-900/70 dark:text-sky-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.4)]" />
            Service Protocols
          </div>
          <h2
            id="services-heading"
            className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            Architecture as a <span className="text-gradient-main">service</span>
          </h2>
          <p className="mt-3 max-w-[640px] text-sm text-muted-foreground md:text-base">
            Slide decks, reports, and protection flows as discrete modules. Pick a
            protocol and the screen adapts inclusions and live pricing along your
            referral curve.
          </p>
        </div>

        {/* Floating glass strip */}
        <div className="relative mx-auto max-w-5xl">
          <div className="pointer-events-none absolute -inset-x-16 -top-12 h-40 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.22),transparent_65%)] blur-3xl" />
          <div className="glass-panel relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/70 via-white/40 to-blue-50/40 p-4 shadow-[0_18px_60px_rgba(15,23,42,0.7)] backdrop-blur-2xl dark:border-white/5 dark:from-slate-900/70 dark:via-slate-950/60 dark:to-sky-950/40 md:p-6">
            {/* Tabs row */}
            <div
              className="relative flex flex-wrap items-center gap-2 border-b border-white/20 pb-3 dark:border-white/10"
              role="tablist"
              aria-label="Service modules"
            >
              <div className="relative rounded-full bg-white/40 p-1 backdrop-blur dark:bg-slate-900/60">
                <div className="flex flex-wrap gap-1">
                  {SERVICE_TIERS.map((tier) => {
                    const active = tier.id === activeService.id
                    return (
                      <button
                        key={tier.id}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        aria-controls={`service-panel-${tier.id}`}
                        data-id={tier.id}
                        tabIndex={active ? 0 : -1}
                        onClick={() => setSelectedId(tier.id)}
                        className={cn(
                          "relative rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wide outline-none transition-all",
                          "focus-visible:ring-2 focus-visible:ring-blue-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
                          active
                            ? "text-blue-700 dark:text-sky-200"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {active && (
                          <motion.span
                            layoutId="tier-pill-bg"
                            className="absolute inset-0 rounded-full bg-blue-500/10 ring-1 ring-blue-500/20 dark:bg-sky-500/10 dark:ring-sky-500/25"
                            transition={{
                              type: "spring",
                              stiffness: 320,
                              damping: 28,
                            }}
                          />
                        )}
                        <span className="relative z-10 flex items-center gap-1.5">
                          {tier.id === "shield" && (
                            <ShieldCheck className="h-3 w-3 text-emerald-500" />
                          )}
                          {tier.title}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {!isShield && (
                <div className="ml-auto hidden items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground md:flex">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Refund shield applies
                </div>
              )}
            </div>

            {/* Projector content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                role="tabpanel"
                id={`service-panel-${activeService.id}`}
                aria-labelledby={activeService.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className={cn(
                  "mt-5 grid gap-6",
                  isShield
                    ? "md:grid-cols-1"
                    : "md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]",
                )}
              >
                {/* Left: narrative & features */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      <span className="h-px w-6 bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
                      {activeService.unit}
                    </div>
                    <h3 className="text-xl font-semibold md:text-2xl">
                      {activeService.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {activeService.subtitle}
                    </p>
                  </div>

                  <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {activeService.features.map((feature, i) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="flex items-start gap-3 rounded-2xl border border-white/40 bg-white/60 px-3.5 py-3 text-sm shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-950/60"
                      >
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-blue-500 dark:text-sky-400" />
                        <span className="text-[13px] leading-relaxed">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {!isShield && (
                    <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                      Designed to survive{" "}
                      <span className="text-blue-600 dark:text-sky-400">
                        viva + detector + peer review
                      </span>
                    </p>
                  )}

                  {isShield && (
                    <p className="mt-3 text-xs text-muted-foreground md:text-sm">
                      Refund Shield wraps every paid protocol in a clear,
                      documented acceptance criteria. If the work misses that bar,
                      you get a full refund. No negotiation, no drama.
                    </p>
                  )}
                </div>

                {/* Right: pricing / referral / CTA — hidden for Refund Shield */}
                {!isShield && (
                  <div className="flex flex-col gap-4 rounded-2xl border border-white/30 bg-white/60 p-4 shadow-[0_10px_40px_rgba(15,23,42,0.55)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/60 md:p-5">
                    {/* Price block */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                          Investment
                        </span>
                        {isFree ? (
                          <span className="text-3xl font-bold text-emerald-500">
                            Free
                          </span>
                        ) : (
                          <>
                            <div className="flex items-end gap-2">
                              {isDiscounted && (
                                <span className="text-xs text-muted-foreground line-through">
                                  ₹{basePrice}
                                </span>
                              )}
                              <span className="text-3xl font-bold text-blue-600 dark:text-sky-400">
                                ₹{finalPrice}
                              </span>
                            </div>
                            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                              {activeService.unit}
                            </span>
                            {isDiscounted && (
                              <span className="text-[11px] text-emerald-500">
                                You save {discountPercent}% (₹{basePrice - finalPrice})
                              </span>
                            )}
                            {!isDiscounted && (
                              <span className="text-[11px] text-muted-foreground">
                                0–5 referrals map to fixed price points from ₹250
                                down to ₹90.
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    {/* Referral calculator for paid tiers */}
                    {!isFree && (
                      <ReferralCalculator
                        basePrice={basePrice}
                        serviceId={activeService.id}
                        onPriceUpdate={(newPrice, isDiscounted) => {
                          setFinalPrice(newPrice)
                          setIsDiscounted(isDiscounted)
                        }}
                      />
                    )}

                    {/* CTAs */}
                    <div className="mt-2 flex flex-col gap-3 border-t border-white/30 pt-4 dark:border-white/10">
                      <Button
                        size="lg"
                        type="button"
                        onClick={() => setIsBookingOpen(true)}
                        className="w-full rounded-full bg-gradient-to-r from-blue-600 to-sky-500 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(37,99,235,0.65)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_50px_rgba(37,99,235,0.75)]"
                      >
                        <Lock className="mr-2 h-4 w-4" />
                        {isFree
                          ? "Reserve free architecture slot"
                          : `Lock in at ₹${finalPrice}`}
                      </Button>

                      {/* Only for non-shield tiers */}
                      <Button
                        size="lg"
                        type="button"
                        variant="ghost"
                        className="w-full rounded-full border border-white/30 bg-white/10 text-sm text-muted-foreground hover:bg-white/30 hover:text-foreground dark:border-white/10 dark:bg-slate-950/40 dark:hover:bg-slate-900/70"
                        asChild
                      >
                        <Link href={`/samples/${activeService.id}`}>
                          View sample deliverables
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <BookingDialog
        open={isBookingOpen}
        onOpenChange={setIsBookingOpen}
        serviceTitle={activeService.title}
        finalPrice={finalPrice}
        isDiscounted={isDiscounted}
      />
    </section>
  )
}
