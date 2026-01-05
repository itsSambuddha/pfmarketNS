"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, Lock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SERVICE_TIERS, type ServiceTier } from "@/lib/constants"

export function ServiceProjector() {
  const [selectedId, setSelectedId] = React.useState<string>(SERVICE_TIERS[0].id)
  
  // Find the currently active service object
  const activeService = SERVICE_TIERS.find(s => s.id === selectedId) || SERVICE_TIERS[0]

  return (
    <section id="services" className="w-full py-24 bg-muted/20 relative">
      <div className="container px-4 md:px-6">
        
        <div className="flex flex-col items-center mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Service Protocols
          </h2>
          <p className="mt-4 text-muted-foreground max-w-[600px]">
            Select a module to inspect its architecture and pricing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 min-h-[500px]">
          
          {/* LEFT: Control Panel (Menu) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {SERVICE_TIERS.map((tier) => (
              <button
                key={tier.id}
                onClick={() => setSelectedId(tier.id)}
                className={cn(
                  "group relative flex flex-col items-start p-6 rounded-xl border text-left transition-all duration-300",
                  selectedId === tier.id 
                    ? "bg-background border-primary/50 shadow-lg scale-[1.02]" 
                    : "bg-background/40 border-transparent hover:bg-background/60 hover:border-border/50"
                )}
              >
                {/* Active Indicator Line */}
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
                  {tier.recommended && (
                    <span className="text-[10px] uppercase tracking-wider font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      Popular
                    </span>
                  )}
                </div>
                <span className="text-sm text-muted-foreground mt-1 line-clamp-1">
                  {tier.subtitle}
                </span>
              </button>
            ))}
          </div>

          {/* RIGHT: Projector Screen (Display) */}
          <div className="lg:col-span-8 relative group">
            
            {/* Background Glow Effect */}
            <div className={cn(
              "absolute -inset-1 rounded-2xl opacity-20 blur-xl transition-colors duration-500 bg-gradient-to-r",
              activeService.gradient
            )} />

            <div className="relative h-full rounded-2xl border border-border/50 bg-background/80 backdrop-blur-xl p-8 md:p-12 shadow-2xl overflow-hidden">
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
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-border/50 pb-8">
                    <div>
                      <h3 className="text-3xl font-bold">{activeService.title}</h3>
                      <p className="text-muted-foreground mt-2 text-lg">
                        {activeService.subtitle}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold tracking-tight text-primary">
                        {activeService.price}
                      </div>
                      <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
                        {activeService.unit}
                      </div>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="grid md:grid-cols-2 gap-6 mb-8 flex-grow">
                    {activeService.features.map((feature, i) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={feature} 
                        className="flex items-center gap-3"
                      >
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Action Area */}
                  <div className="mt-auto pt-6 flex flex-col sm:flex-row gap-4">
                    <Button 
                      size="lg" 
                      className="w-full sm:w-auto h-12 px-8 text-base shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Book Slot Now
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full sm:w-auto h-12"
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
    </section>
  )
}