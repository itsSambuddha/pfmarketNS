"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { motion } from "framer-motion"
import { ShieldCheck, Zap, BrainCircuit, Wallet } from "lucide-react"

const FAQ_ITEMS = [
  {
    id: "item-1",
    question: "Do you use AI to generate the work?",
    answer: "We utilize AI as a structural architect, not a writer. While we use advanced LLMs for outlining and data synthesis, 100% of the narrative flow, critical analysis, and final polish is human-crafted to ensure it passes all detector thresholds and retains a unique voice.",
    icon: BrainCircuit
  },
  {
    id: "item-2",
    question: "How does the '100% Refund Shield' work?",
    answer: "Safety is paramount. If the delivered asset materially deviates from the agreed-upon brief—and we cannot fix it within 24 hours—you receive a full refund instantly via UPI. No questions asked.",
    icon: ShieldCheck
  },
  {
    id: "item-3",
    question: "Why is there no card payment option?",
    answer: "We operate on a zero-friction model. UPI allows for instant verification and zero platform fees, which means we don't have to pass those costs on to you. It keeps our pricing 5-10% lower than competitors.",
    icon: Wallet
  },
  {
    id: "item-4",
    question: "What is the typical turnaround time?",
    answer: "For the 'Cinematic Deck', standard delivery is 48 hours. Priority slots (booked via WhatsApp) can accelerate this to 12-24 hours depending on current secretariat load.",
    icon: Zap
  }
]

export function FAQSection() {
  return (
    <section id="faq" className="relative w-full py-24 overflow-hidden">
      
      {/* Background Tech Pattern */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="inline-flex items-center justify-center p-2 mb-4 bg-blue-500/10 rounded-full">
            <ShieldCheck className="w-5 h-5 text-blue-500" />
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-foreground">
            Operational <span className="text-gradient-main">Intelligence</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-[600px] text-lg">
            Common protocols regarding privacy, delivery, and financial security.
          </p>
        </div>

        {/* Accordion Grid */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="flex flex-col gap-4">
            {FAQ_ITEMS.map((item, i) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                key={item.id}
              >
                <AccordionItem 
                  value={item.id} 
                  className="group border-none rounded-xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/20 dark:border-white/5 shadow-sm hover:shadow-md transition-all duration-300 data-[state=open]:bg-white/60 dark:data-[state=open]:bg-slate-900/60 data-[state=open]:ring-1 data-[state=open]:ring-blue-500/30"
                >
                  <AccordionTrigger className="px-6 py-5 hover:no-underline text-left">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-blue-500/5 text-blue-600 dark:text-blue-400 group-hover:bg-blue-500/10 transition-colors">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className="text-lg font-medium text-foreground/90 group-hover:text-primary transition-colors">
                        {item.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 pt-0 text-muted-foreground leading-relaxed pl-[4.5rem]">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>

      </div>
    </section>
  )
}