"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, Lock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SERVICE_TIERS, type ServiceTier } from "@/lib/constants"
import { BookingDialog } from "@/components/booking-dialog"
import { ReferralCalculator } from "@/components/referral-calculator"

export function ServiceProjector() {
  const [selectedId, setSelectedId] = React.useState<string>(SERVICE_TIERS[0].id)
  const [isBookingOpen, setIsBookingOpen] = React.useState(false)
  
  // State for dynamic pricing
  const [finalPrice, setFinalPrice] = React.useState(0)
  const [isDiscounted, setIsDiscounted] = React.useState(false)
  
  const activeService = SERVICE_TIERS.find(s => s.id === selectedId) || SERVICE_TIERS[0]

  // Extract numeric price from string (e.g., "₹250" -> 250)
  // If price is "Free" or non-numeric, treat as 0
  const basePrice = parseInt(activeService.price.replace(/[^0-9]/g, "")) || 0
  const isFree = activeService.price.toLowerCase().includes("free")

  // Reset price when switching services
  React.useEffect(() => {
    setFinalPrice(basePrice)
    setIsDiscounted(false)
  }, [basePrice, selectedId])

  return (
    <section id="services" className="w-full py-24 relative overflow-hidden">
      {/* Background Gradient for the Section */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background pointer-events-none" />

      <div className="container px-4 md:px-6 relative z-10">
        
        <div className="flex flex-col items-center mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 dark:from-sky-400 dark:to-blue-600">
            Service Protocols
          </h2>
          <p className="mt-4 text-muted-foreground max-w-[600px]">
            Select a module to inspect its architecture and pricing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 min-h-[600px]">
          
          {/* LEFT: Control Panel */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {SERVICE_TIERS.map((tier) => (
              <button
                key={tier.id}
                onClick={() => setSelectedId(tier.id)}
                className={cn(
                  "group relative flex flex-col items-start p-6 rounded-xl border text-left transition-all duration-300",
                  selectedId === tier.id 
                    ? "bg-background border-primary shadow-lg scale-[1.02] ring-1 ring-primary/20" 
                    : "bg-white/50 dark:bg-slate-900/50 border-transparent hover:bg-background/80 hover:border-primary/30"
                )}
              >
                {selectedId === tier.id && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-xl"
                  />
                )}
                
                <div className="flex justify-between w-full items-center">
                  <span className={cn(
                    "text-lg font-bold transition-colors",
                    selectedId === tier.id ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                  )}>
                    {tier.title}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground mt-1 line-clamp-1">
                  {tier.subtitle}
                </span>
              </button>
            ))}
          </div>

          {/* RIGHT: Projector Screen */}
          <div className="lg:col-span-8 relative group">
            {/* Ambient Glow */}
            <div className={cn(
              "absolute -inset-1 rounded-2xl opacity-30 blur-2xl transition-all duration-500",
              selectedId === "deck" ? "bg-blue-500" : 
              selectedId === "report" ? "bg-violet-500" : "bg-emerald-500"
            )} />

            <div className="relative h-full rounded-2xl border border-white/20 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl p-8 md:p-12 shadow-2xl flex flex-col">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col h-full"
                >
                  
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 border-b border-border/50 pb-8">
                    <div>
                      <h3 className="text-3xl font-bold text-foreground">{activeService.title}</h3>
                      <p className="text-muted-foreground mt-2 text-lg">
                        {activeService.subtitle}
                      </p>
                    </div>
                    <div className="text-right">
                        {/* If not free, show price */}
                        {!isFree && (
                            <div className="flex flex-col items-end">
                                <div className="text-4xl font-bold tracking-tight text-primary">
                                    {activeService.price}
                                </div>
                                <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
                                    {activeService.unit}
                                </div>
                            </div>
                        )}
                        {isFree && (
                            <div className="text-4xl font-bold text-emerald-500">Free</div>
                        )}
                    </div>
                  </div>

                  {/* Calculator - Only show for paid tiers */}
                  {!isFree && (
                    <ReferralCalculator 
                        basePrice={basePrice} 
                        onPriceUpdate={(price, discounted) => {
                            setFinalPrice(price)
                            setIsDiscounted(discounted)
                        }} 
                    />
                  )}

                  {/* Features List */}
                  <div className="grid md:grid-cols-2 gap-4 mt-8 mb-8 flex-grow">
                    {activeService.features.map((feature, i) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={feature} 
                        className="flex items-center gap-3 p-2 rounded hover:bg-secondary/30 transition-colors"
                      >
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-sm font-medium">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Action Area */}
                  <div className="mt-auto pt-6 flex flex-col sm:flex-row gap-4">
                    <Button 
                      size="lg" 
                      onClick={() => setIsBookingOpen(true)}
                      className="w-full sm:w-auto h-12 px-8 text-base shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all bg-primary text-primary-foreground"
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      {isFree ? "Contact for Shield" : `Book for ₹${finalPrice}`}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full sm:w-auto h-12 border-primary/20 hover:bg-primary/5 text-foreground"
                    >
                      View Samples <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>
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