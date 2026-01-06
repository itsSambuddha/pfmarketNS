"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ShieldCheck,
  Zap,
  BrainCircuit,
  Wallet,
  FileText,
  MessageCircle,
} from "lucide-react"

type FaqItem = {
  id: string
  question: string
  answer: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "ai",
    question: "Do you use AI to generate the work?",
    answer:
      "AI is used as a structural helper for outlines and research, not as a ghostwriter. The narrative flow, argumentation, and final wording are written manually so the work feels original and comfortably clears AI-detector checks.",
    icon: BrainCircuit,
  },
  {
    id: "refund",
    question: "How does the 100% refund shield work?",
    answer:
      "If the delivered deck or report clearly misses the agreed brief and cannot be fixed within 24 hours of your revision request, you receive a full refund over UPI. This covers material issues in structure, depth, or accuracy that affect your ability to actually use the asset.",
    icon: ShieldCheck,
  },
  {
    id: "upi",
    question: "Why is there only UPI and no cards?",
    answer:
      "UPI is instant, low-friction, and nearly fee-less, so there is no need for extra gateways or FX markup. That lets pricing stay lean compared to card-based setups that add processing and platform fees on top.",
    icon: Wallet,
  },
  {
    id: "turnaround",
    question: "What is the usual turnaround time?",
    answer:
      "The standard delivery is about 10-14 once the brief is locked. Complexity, Content and Length increases this to roughly 2x the no.of days.",
    icon: Zap,
  },
  {
    id: "brief",
    question: "What do you need from me to get started?",
    answer:
      "A short brief (over WhatsApp once payment is confirmed) with your topic, context, target audience, and any college or committee guidelines is enough to begin. If you have sample decks, grading rubrics, or past submissions, those can be attached as reference—not as templates to copy.",
    icon: FileText,
  },
  {
    id: "support",
    question: "How do revisions and support work?",
    answer:
      "Minor clarifications and text tweaks are always included. If you need a heavier structural change after delivery, a quick WhatsApp message is usually enough to scope whether it fits into the original slot or needs a separate add-on.",
    icon: MessageCircle,
  },
]

export function FAQSection() {
  const [activeId, setActiveId] = React.useState<string | null>(null)

  const toggleCard = (id: string) => {
    setActiveId((current) => (current === id ? null : id))
  }

  return (
    <section id="faq" className="relative w-full overflow-hidden py-20 md:py-24">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
  {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#020617,_#000_55%)] opacity-85" />       */}
        {/* <div className="absolute inset-0 bg-[linear-gradient(to_right,#94a3b81a_1px,transparent_1px),linear-gradient(to_bottom,#94a3b81a_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-35 mix-blend-soft-light" /> */}
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        {/* Header */}
        <motion.div
          className="mx-auto mb-10 max-w-3xl text-center md:mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-4 inline-flex items-center rounded-full border border-blue-500/25 bg-blue-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-blue-100 backdrop-blur">
            <ShieldCheck className="mr-2 h-3.5 w-3.5" />
            FAQ · Clarity & Safety
          </div>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Everything answered,{" "}
            <span className="text-gradient-main">before you book.</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-[15px]">
            Tap any card to expand. Each question covers how work is produced,
            how payments and refunds are handled, and what to expect on timelines
            and support.
          </p>
        </motion.div>

        {/* Expandable cards */}
        <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
          {FAQ_ITEMS.map((item, index) => {
            const Icon = item.icon
            const isActive = activeId === item.id

            return (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => toggleCard(item.id)}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/5 p-4 text-left outline-none backdrop-blur-xl transition-colors duration-200 hover:border-primary/40 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-primary/60 dark:border-white/10 dark:bg-slate-900/40"
              >
                {/* Top row: icon + question centered */}
                <div className="flex items-center justify-center gap-3 pb-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/30 bg-white/10 text-primary shadow-sm backdrop-blur">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-[13px] font-medium text-foreground sm:text-[14px]">
                    {item.question}
                  </span>
                </div>

                {/* Divider bar that reacts on open */}
                <div
                  className={`mx-auto mb-1 h-px w-[70%] transition-colors duration-200 ${
                    isActive ? "bg-primary/60" : "bg-white/10"
                  }`}
                />

                {/* Expandable content */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, height: 0, y: -4 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -4 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="pt-2"
                    >
                      <p className="text-[13px] leading-relaxed text-muted-foreground">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* subtle indicator */}
                <span className="pointer-events-none absolute right-4 top-4 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground/70">
                  {isActive ? "Close" : "Open"}
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
