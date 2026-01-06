// components/hero-section.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Star,
  Clock,
  ShieldCheck,
  LineChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { WorkflowDiagram } from "@/components/workflow-diagram";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

const students = [
  {
    id: 1,
    name: "Aditya · IIM deck",
    designation: "Turnaround in 6 days",
    image: "/gallery/reviewers/aditya.jpg",
  },
  {
    id: 2,
    name: "Meera · Thesis kit",
    designation: "70+ page visual thesis",
    image: "/gallery/reviewers/meera.jpg",
  },
  {
    id: 3,
    name: "Karthik · MUN brief",
    designation: "High‑stakes committee",
    image: "/gallery/reviewers/karthik.jpg",
  },
];

export function HeroSection() {
  const [workflowOpen, setWorkflowOpen] = useState(false);

  return (
    <>
      <section className="relative flex min-h-[92vh] w-full items-center justify-center overflow-hidden pt-24">
        {/* Background stage */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute left-1/2 top-[-24%] h-[460px] w-[940px] -translate-x-1/2 rounded-[999px] bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.28),transparent_65%)] blur-3xl" />
          <div className="absolute right-[-140px] bottom-[-80px] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.22),transparent_70%)] blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.16),transparent_65%)] dark:bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.6),transparent_70%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff07_1px,transparent_1px),linear-gradient(to_bottom,#ffffff09_1px,transparent_1px)] bg-[size:80px_80px,72px_72px] opacity-[0.45] mix-blend-soft-light" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-4 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/45 bg-white/80 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700 shadow-[0_14px_45px_rgba(148,163,184,0.65)] backdrop-blur-xl dark:border-sky-400/45 dark:bg-slate-900/80 dark:text-sky-200">
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.35)]" />
              Strategic Deck Slots Open
              <span className="rounded-full bg-blue-600/5 px-2 py-0.5 text-[10px] font-medium text-blue-600 dark:text-sky-300">
                Limited
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="max-w-3xl text-4xl font-bold leading-[1.02] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Strategic Visuals
            <br />
            <span className="text-gradient-main">For the Elites</span>
          </motion.h1>

          {/* Subheading */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.12 }}
            className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg"
          >
            <TextGenerateEffect
              words="I engineer academic assets that don't just pass—they dominate. Cinematic decks. Architect‑grade reports. Precision‑timed delivery."
              className="font-medium text-muted-foreground"
            />
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2 }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:items-center"
          >
            <Button
              size="lg"
              className="group h-14 rounded-full border-0 bg-blue-600 px-7 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(37,99,235,0.75)] transition-all hover:-translate-y-0.5 hover:bg-blue-700 active:translate-y-0"
              asChild
            >
              <Link href="#services">
                Book a Strategic Deck
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>

            <Button
              type="button"
              size="lg"
              variant="ghost"
              className="group h-14 rounded-full px-6 text-sm text-muted-foreground hover:bg-blue-50/80 hover:text-foreground dark:hover:bg-slate-900/70"
              onClick={() => setWorkflowOpen(true)}
            >
              View workflow
              <ChevronRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </motion.div>

          {/* Engagement band: stats + timeline chips */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.28 }}
            className="mt-10 w-full max-w-3xl rounded-2xl border border-border/60 bg-background/80 p-4 shadow-[0_18px_60px_rgba(15,23,42,0.55)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/85"
          >
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-stretch sm:justify-between">
              <StatItem
                icon={<Clock className="h-4 w-4" />}
                label="Delivery window"
                value="10-14 days"
                hint="Priority timeline on CampusSlateNS decks."
              />
              <div className="hidden h-10 w-px bg-border/60 sm:block" />
              <StatItem
                icon={<ShieldCheck className="h-4 w-4" />}
                label="Refund shield"
                value="100% coverage"
                hint="Full refund on misaligned output."
              />
              <div className="hidden h-10 w-px bg-border/60 sm:block" />
              <StatItem
                icon={<LineChart className="h-4 w-4" />}
                label="Impact rating"
                value="4.9 / 5.0"
                hint="Average from past cohorts."
              />
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[11px]">
              {[
                "Intake brief",
                "Narrative spine",
                "Slide architecture",
                "Visual pass",
                "Final export",
              ].map((step, idx) => (
                <motion.div
                  key={step}
                  whileHover={{ y: -2 }}
                  className="group flex items-center gap-2 rounded-full border border-border/70 bg-muted/60 px-3 py-1.5 text-[11px] text-muted-foreground backdrop-blur-sm dark:border-white/10 dark:bg-slate-900/80"
                >
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-600/10 text-[10px] text-blue-600 dark:bg-sky-500/10 dark:text-sky-300">
                    {idx + 1}
                  </span>
                  <span className="font-medium group-hover:text-foreground">
                    {step}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Social proof with animated tooltip + gradient stars */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-8 flex flex-col items-center gap-3 text-xs text-muted-foreground"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                {/* Small avatar cluster */}
                <div className="flex items-center gap-1">
                  <AnimatedTooltip items={students} />
                </div>
              </div>
              <div>
                <div className="mb-0.5 flex bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-400 bg-clip-text text-amber-400">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.span
                      key={i}
                      className="inline-flex text-amber-400"
                      initial={{ scale: 0.9, opacity: 0.85 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        delay: 0.15 + i * 0.04,
                        duration: 0.3,
                        type: "spring",
                        stiffness: 260,
                        damping: 18,
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Star className="h-3 w-3 fill-current" />
                    </motion.span>
                  ))}
                </div>
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Trusted by 50+ students
                </p>
              </div>
            </div>
            <br/>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em]">
              Zero‑plagiarism ||
              <span className="ml-1 text-blue-600 dark:text-sky-400">
                Detector‑safe narrative
              </span>
            </p>
            <br />
          </motion.div>
        </div>
      </section>

      <WorkflowDiagram
        open={workflowOpen}
        onClose={() => setWorkflowOpen(false)}
      />
    </>
  );
}

function StatItem({
  icon,
  label,
  value,
  hint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="flex w-full flex-1 flex-col items-center gap-1 text-center sm:items-start sm:text-left"
    >
      <div className="inline-flex items-center gap-2 rounded-full bg-primary/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary dark:bg-sky-500/10 dark:text-sky-300">
        {icon}
        <span>{label}</span>
      </div>
      <div className="text-sm font-semibold text-foreground md:text-base">
        {value}
      </div>
      <p className="text-[11px] text-muted-foreground">{hint}</p>
    </motion.div>
  );
}
