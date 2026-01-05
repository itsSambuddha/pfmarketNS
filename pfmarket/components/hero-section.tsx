"use client"

import Link from "next/link"
import { ArrowRight, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-20">
      
      {/* 1. BACKGROUND SPOTLIGHTS (Vivid & Deep) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/20 dark:bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-sky-500/10 dark:bg-sky-400/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container relative z-10 px-4 flex flex-col items-center text-center">
        
        {/* 2. THE BADGE (Glass Pill) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 border border-blue-200/50 dark:border-white/10 backdrop-blur-md shadow-sm transition-transform hover:scale-105 cursor-default">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-xs font-bold tracking-widest uppercase text-blue-700 dark:text-blue-300">
              Q1 Slots Open
            </span>
          </div>
        </motion.div>

        {/* 3. THE HEADLINE (Massive, Tight, Gradient) */}
        <h1 className="max-w-4xl text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] text-foreground mb-8">
          Strategic Visuals <br />
          <span className="text-gradient-main">For The Elite.</span>
        </h1>

        {/* 4. SUBHEADLINE (Controlled width) */}
        <div className="max-w-xl text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
          <TextGenerateEffect 
            words="We engineer academic assets that don't just pass—they dominate. Cinematic Decks. Architect-Grade Reports. Guaranteed."
            className="text-muted-foreground font-medium"
          />
        </div>

        {/* 5. CTA GROUP (Premium Buttons) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Button size="lg" className="h-14 px-8 rounded-full text-base bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25 border-0 ring-offset-2 ring-offset-background transition-all hover:-translate-y-1" asChild>
            <Link href="#services">
              Explore Protocols <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
          <Button size="lg" variant="ghost" className="h-14 px-8 rounded-full text-base hover:bg-blue-50 dark:hover:bg-white/5" asChild>
            <Link href="#process">
              How it Works
            </Link>
          </Button>
        </motion.div>
        
        {/* 6. SOCIAL PROOF (Floating at bottom) */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.5 }}
          className="mt-16 flex items-center gap-4 opacity-80"
        >
          <div className="flex -space-x-3">
             {[1,2,3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 border-2 border-background flex items-center justify-center text-[10px] font-bold text-gray-600">
                  U{i}
                </div>
             ))}
          </div>
          <div className="text-sm font-medium">
             <div className="flex text-yellow-500 mb-0.5">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
             </div>
             <span className="text-muted-foreground">Trusted by 50+ Students</span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}