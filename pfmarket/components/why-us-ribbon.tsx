// components/why-us-ribbon.tsx
"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  Bot,
  UserCircle2,
  HandCoins,
  ShieldAlert,
  Sparkles,
  Pointer,
} from "lucide-react"

const REASONS = [
  {
    id: "marks",
    label: "Marks you can defend",
    body: "Decks and reports built around your outline and rubric so you can walk through every slide without fearing “AI did this” comments.",
    tag: "Exam & viva safe",
  },
  {
    id: "interview",
    label: "Interview leverage",
    body: "Freshers reuse these as portfolio decks and case studies that look intentional, not like a chat export or template everyone’s seen.",
    tag: "Portfolio‑ready",
  },
  {
    id: "pricing",
    label: "Affordable & negotiable",
    body: "Decks from ₹250 / 10 slides, reports from ₹1,000 / project. Tight ceiling? Scope and polish adjust instead of the door closing.",
    tag: "Student‑first pricing",
    icon: HandCoins,
  },
]

export function WhyUsRibbon() {
  const [activeId, setActiveId] = React.useState<string>("marks")
  const active = REASONS.find((r) => r.id === activeId) ?? REASONS[0]

  return (
    <section className="relative w-full py-20">
      {/* ambient bg */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.22),transparent_60%)] opacity-80 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:80px_80px,72px_72px] opacity-[0.1]" />

      <div className="relative z-10 container mx-auto max-w-5xl px-4 md:px-6">
        {/* header */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-slate-950/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-100 backdrop-blur">
            <Sparkles className="h-3 w-3 text-amber-400" />
            Why pay for this in an AI world
          </div>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
            Real work,{" "}
            <span className="text-gradient-main">not auto‑generated output</span>
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-[15px]">
            AI tools can spit out decks and reports. This studio makes sure your
            teacher or hiring manager sees **your** effort, not just a bot’s style.
          </p>
        </div>

        {/* main interactive rail */}
        <div className="grid gap-5 md:grid-cols-[1.3fr_1.3fr]">
          {/* left: hero compare card with infographic feel */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 p-5 shadow-[0_22px_80px_rgba(15,23,42,0.95)]"
          >
            {/* top compare row */}
            <div className="grid gap-4 md:grid-cols-2">
              {/* AI column */}
              <div className="space-y-3 rounded-2xl bg-slate-950/90 p-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-100">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                        AI platforms
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Presentation.ai, generic writers
                      </p>
                    </div>
                  </div>
                  {/* risk bar */}
                  <RiskPills filled={2} />
                </div>

                {/* infographic-style bullets */}
                <Bullet label="Template‑looking layouts" />
                <Bullet label="Visible AI traces / watermarks" />
                <Bullet label="Vibe: “you did nothing”" />

                <div className="mt-2 flex items-center gap-2 rounded-xl bg-slate-900/90 px-3 py-2 text-[10px] text-amber-200">
                  <ShieldAlert className="h-3.5 w-3.5" />
                  <span>
                    High chance of being called out as AI in viva or screening.
                  </span>
                </div>
              </div>

              {/* Studio column */}
              <div className="space-y-3 rounded-2xl bg-gradient-to-br from-sky-900/90 via-slate-950/95 to-emerald-900/85 p-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-emerald-400 text-slate-950 shadow-lg">
                      <UserCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-100">
                        This studio
                      </p>
                      <p className="text-[11px] text-sky-100/80">
                        Human‑led, exam‑safe
                      </p>
                    </div>
                  </div>
                  {/* effort bar */}
                  <EffortPills filled={3} />
                </div>

                <Bullet label="Your outline, data, and attempts" tone="primary" />
                <Bullet label="Hand‑built structure & pacing" tone="primary" />
                <Bullet label="Human voice, AI‑aware safety" tone="primary" />

                {/* tiny use-case chips */}
                <div className="mt-2 flex flex-wrap gap-2 text-[10px]">
                  <Tag label="Exam & viva safe" />
                  <Tag label="Portfolio‑ready for freshers" />
                </div>
              </div>
            </div>

            {/* bottom: “what you get here” strip */}
            <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-slate-800/80 bg-slate-950/95 px-4 py-3 text-[11px] text-slate-200 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-2">
                <Pointer className="mt-0.5 h-4 w-4 text-sky-400" />
                <p className="text-[11px] leading-snug text-slate-300">
                  You bring the work. The studio turns it into decks and reports you
                  can defend slide‑by‑slide, not downloads you hope don’t get flagged.
                </p>
              </div>
              <div className="hidden w-px self-stretch bg-gradient-to-b from-transparent via-slate-700/70 to-transparent md:block" />
              <div className="flex flex-col gap-1 text-right md:text-left">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Built for
                </span>
                <span className="text-[11px] text-slate-200">
                  Semester projects · Vivas · Fresher portfolios
                </span>
              </div>
            </div>
          </motion.div>

          {/* right: interactive reasons rail (focus cards style) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="font-semibold uppercase tracking-[0.2em]">
                Why people actually pay
              </span>
              <span className="hidden items-center gap-1 md:inline-flex">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Hover cards to explore
              </span>
            </div>

            <div className="grid gap-3 md:grid-rows-3">
              {REASONS.map((reason) => {
                const active = reason.id === activeId
                const Icon = reason.icon
                return (
                  <motion.button
                    key={reason.id}
                    type="button"
                    onMouseEnter={() => setActiveId(reason.id)}
                    onFocus={() => setActiveId(reason.id)}
                    className={`group flex w-full flex-col items-start rounded-2xl border px-3.5 py-3 text-left text-[11px] transition-all ${
                      active
                        ? "border-sky-500/60 bg-slate-950 shadow-[0_16px_50px_rgba(15,23,42,0.9)]"
                        : "border-slate-800/80 bg-slate-950/80 hover:border-slate-600/80"
                    }`}
                    whileHover={{ y: -2 }}
                  >
                    <div className="mb-1 flex w-full items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {Icon && (
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
                            <Icon className="h-3.5 w-3.5" />
                          </div>
                        )}
                        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-100">
                          {reason.label}
                        </span>
                      </div>
                      {reason.tag && (
                        <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                          {reason.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] leading-snug text-slate-300">
                      {reason.body}
                    </p>
                  </motion.button>
                )
              })}
            </div>

            {/* small “effective vs cheap” stat bar */}
            <div className="mt-2 rounded-2xl border border-slate-800/80 bg-slate-950/90 px-3.5 py-3 text-[10px] text-slate-300">
              <div className="mb-1 flex items-center justify-between">
                <span>“Looks cheap” AI output vs “actually works” studio work</span>
                <span className="hidden text-[9px] text-slate-500 md:inline">
                  Based on how reviewers react, not token counts
                </span>
              </div>
              <div className="mt-2 flex h-2 w-full overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-[35%] bg-slate-500/80" />
                <div className="h-full w-[65%] bg-sky-500" />
              </div>
              <div className="mt-1 flex justify-between text-[9px] text-slate-400">
                <span>AI exports</span>
                <span>This studio</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* small visual helpers */

function RiskPills({ filled }: { filled: number }) {
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`h-1.5 w-3 rounded-full ${
            i < filled ? "bg-amber-400/80" : "bg-slate-700"
          }`}
        />
      ))}
    </div>
  )
}

function EffortPills({ filled }: { filled: number }) {
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`h-1.5 w-3 rounded-full ${
            i < filled ? "bg-emerald-400/90" : "bg-slate-700"
          }`}
        />
      ))}
    </div>
  )
}

function Bullet({
  label,
  tone = "muted",
}: {
  label: string
  tone?: "muted" | "primary"
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          tone === "primary" ? "bg-sky-400" : "bg-slate-500"
        }`}
      />
      <span className="text-[11px]">{label}</span>
    </div>
  )
}

function Tag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-2 py-0.5 text-[10px] text-slate-100">
      <span className="h-1 w-4 rounded-full bg-sky-400/80" />
      {label}
    </span>
  )
}
