"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background pt-20 md:pt-0">
      <div className="z-10 container flex flex-col items-center px-4 md:px-6 text-center">
        
        {/* Badge */}
        <div className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
          Accepting New Projects for Q1
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">
          ELEVATING
          <br className="hidden md:block" />
          ACADEMIC STANDARDS
        </h1>

        {/* Generated Subheadline */}
        <div className="mt-6 max-w-[600px] text-lg text-muted-foreground md:text-xl">
          <TextGenerateEffect 
            words="Through Technical Precision & Strategic Design. We build high-performance assets for high-ambition students."
            className="font-normal text-muted-foreground"
          />
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row z-20">
          <Button size="lg" className="h-12 px-8 text-base group" asChild>
            <Link href="#services">
              View Services 
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="h-12 px-8 text-base" asChild>
            <Link href="#process">
              How it Works
            </Link>
          </Button>
        </div>

      </div>

      {/* Visual Background */}
      <BackgroundBeams />
      
      {/* Grid Overlay for texture */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
    </section>
  )
}