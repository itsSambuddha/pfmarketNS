// components/workflow-diagram.tsx
"use client"

import {
  X,
  FileText,
  MonitorPlay,
  PanelsTopLeft,
  Sparkles,
  Rocket,
  MessageSquare,
} from "lucide-react"
import { motion, AnimatePresence, Variants } from "framer-motion"

interface WorkflowDiagramProps {
  open: boolean
  onClose: () => void
}

/* ---------- Variants ---------- */

const shellVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: { opacity: 0, y: 24, transition: { duration: 0.25 } },
}

const stepVariants: Variants = {
  hidden: { opacity: 0, scale: 0.97, y: 4 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
      delay: 0.18 + i * 0.22,
    },
  }),
}

// snappier node motion
const nodeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.75, y: 10, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.32,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

// labels lag slightly behind node
const labelVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.28,
      ease: "easeOut",
      delay: 0.06,
    },
  },
}

/* ---------- Rail glow CSS (draw + shimmer) ---------- */

const glowCss = `
  .rail-draw {
    stroke-dasharray: 120 400;
    stroke-dashoffset: 120;
    animation: railDraw 0.45s ease-out forwards,
               railShimmer 4.5s linear infinite 0.45s;
  }

  @keyframes railDraw {
    to { stroke-dashoffset: 0; }
  }

  @keyframes railShimmer {
    0% { stroke-dashoffset: 0; }
    100% { stroke-dashoffset: -520; }
  }
`

/* ---------- Root ---------- */

export function WorkflowDiagram({ open, onClose }: WorkflowDiagramProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* dark veil + heavy blur so hero is basically gone */}
          <div
            className="absolute inset-0 bg-black/85"
            style={{ backdropFilter: "blur(40px)" }}
            onClick={onClose}
          />

          {/* glass panel */}
          <motion.div
            className="relative z-10 w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/12 bg-white/[0.03] px-6 pb-6 pt-5 shadow-[0_40px_160px_rgba(0,0,0,0.9)]"
            variants={shellVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* background glow & vignette */}
            <div className="pointer-events-none absolute inset-[-30%] -z-10 bg-[radial-gradient(circle_at_center,rgba(148,163,184,0.35),transparent_60%)]" />
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.7),transparent_55%)]" />

            {/* header */}
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-100">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>End‑to‑end workflow</span>
                </div>
                <p className="mt-1 text-[12px] text-slate-300/80">
                  How your brief moves from intake to handoff across You and Studio.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/60 text-slate-200 hover:bg-white/10"
                aria-label="Close workflow view"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* legend */}
            <div className="mb-4 flex flex-wrap gap-4 text-[11px] text-slate-300/80">
              <LegendDot color="bg-sky-400" label="You" />
              <LegendDot color="bg-emerald-400" label="Studio" />
              <LegendDot color="bg-cyan-300" label="Interaction" icon={MessageSquare} />
            </div>

            {/* diagram */}
            <div className="relative h-[320px] w-full">
              <StaticRails />
              <SequencedSteps />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ---------- Static rails (structure only) ---------- */

function StaticRails() {
  return (
    <svg
      className="pointer-events-none absolute inset-0"
      viewBox="0 0 1000 320"
      aria-hidden="true"
    >
      <g
        stroke="rgba(148,163,184,0.22)"
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
      >
        {/* You rail */}
        <path d="M 90 80 H 840" />

        {/* Studio rail (slightly lower for breathing room) */}
        <path d="M 170 225 H 520" />

        {/* branches */}
        <path d="M 520 225 C 570 205 620 175 700 160" />
        <path d="M 520 225 C 570 245 620 275 700 290" />

        {/* merge */}
        <path d="M 700 160 C 750 175 785 195 820 225" />
        <path d="M 700 290 C 750 275 785 255 820 225" />

        {/* polish to handoff to You */}
        <path d="M 820 225 C 870 205 900 190 930 170" />
        <path d="M 930 170 C 948 142 960 110 972 80" />

        {/* interactions */}
        <path d="M 220 110 V 205" />
        <path d="M 410 110 V 205" />
      </g>
    </svg>
  )
}

/* ---------- Sequenced steps (line + node together) ---------- */

function SequencedSteps() {
  return (
    <>
      {/* Step 0: You upload */}
      <GlowStep index={0}>
        <GlowSegment d="M 90 80 H 250" />
        <NodeWithLabel
          x={90}
          y={80}
          color="sky"
          icon={FileText}
          title="Upload brief"
          subtitle="Prompt, rubric, constraints"
        />
      </GlowStep>

      {/* Step 1: You drop assets */}
      <GlowStep index={1}>
        <GlowSegment d="M 250 80 H 400" />
        <NodeWithLabel
          x={250}
          y={80}
          color="sky"
          icon={PanelsTopLeft}
          title="Drop assets"
          subtitle="Decks, reports, notes"
        />
      </GlowStep>

      {/* Step 2: Interaction 1 */}
      <GlowStep index={2}>
        <GlowSegment d="M 220 110 V 205" thin />
        <InteractionPill
          x={220}
          y={145}
          text="Clarify scope & preferences"
        />
      </GlowStep>

      {/* Step 3: Studio Scope & risk */}
      <GlowStep index={3}>
        <GlowSegment d="M 170 225 H 320" />
        <NodeWithLabel
          x={170}
          y={225}
          color="emerald"
          icon={FileText}
          title="Scope & risk"
          subtitle="Feasibility, timing, edges"
        />
      </GlowStep>

      {/* Step 4: Studio Narrative + interaction */}
      <GlowStep index={4}>
        <GlowSegment d="M 320 225 H 520" />
        <NodeWithLabel
          x={320}
          y={225}
          color="emerald"
          icon={Sparkles}
          title="Narrative & outline"
          subtitle="Spine for deck/report"
        />
        <GlowSegment d="M 410 110 V 205" thin />
        <InteractionPill
          x={410}
          y={150}
          text="Preference check"
        />
      </GlowStep>

      {/* Step 5: Branch node only */}
      <GlowStep index={5}>
        <NodeWithLabel
          x={520}
          y={225}
          color="emerald"
          icon={PanelsTopLeft}
          title="Branch: deck or report"
          subtitle="Same intake, two paths"
        />
      </GlowStep>

      {/* Step 6: Deck branch */}
      <GlowStep index={6}>
        <GlowSegment d="M 520 225 C 570 205 620 175 700 160" />
        <NodeWithLabel
          x={700}
          y={160}
          color="emerald"
          icon={MonitorPlay}
          title="Deck track"
          subtitle="Architecture, pacing, visuals"
          align="bottom"
        />
        <TimeTag x={700} y={190} text="≈ 10–14 days" />
      </GlowStep>

      {/* Step 7: Report branch */}
      <GlowStep index={7}>
        <GlowSegment d="M 520 225 C 570 245 620 275 700 290" />
        <NodeWithLabel
          x={700}
          y={290}
          color="emerald"
          icon={FileText}
          title="Report track"
          subtitle="Structure, citations, summaries"
        />
        <TimeTag x={700} y={265} text="≈ 20–25 days" />
      </GlowStep>

      {/* Step 8: Merge and Polish */}
      <GlowStep index={8}>
        <GlowSegment d="M 700 160 C 750 175 785 195 820 225" />
        <GlowSegment d="M 700 290 C 750 275 785 255 820 225" />
        <NodeWithLabel
          x={820}
          y={225}
          color="emerald"
          icon={Sparkles}
          title="Polish & QA"
          subtitle="Language, visuals, fail‑safes"
        />
      </GlowStep>

      {/* Step 9: Handoff and final You */}
      <GlowStep index={9}>
        <GlowSegment d="M 820 225 C 870 205 900 190 930 170" />
        <GlowSegment d="M 930 170 C 948 142 960 110 972 80" />
        <NodeWithLabel
          x={930}
          y={170}
          color="emerald"
          icon={Rocket}
          title="Handoff"
          subtitle="PPT/PDF/Doc + backups"
          align="bottom"
        />
        <NodeWithLabel
          x={972}
          y={80}
          color="sky"
          icon={FileText}
          title="You"
          subtitle="Final assets in hand"
          align="bottom"
          compact
        />
      </GlowStep>
    </>
  )
}

/* ---------- Glow helpers ---------- */

function GlowStep({
  index,
  children,
}: {
  index: number
  children: React.ReactNode
}) {
  return (
    <motion.div
      custom={index}
      variants={stepVariants}
      initial="hidden"
      animate="visible"
      className="absolute inset-0"
    >
      {children}
    </motion.div>
  )
}

function GlowSegment({ d, thin }: { d: string; thin?: boolean }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0"
      viewBox="0 0 1000 320"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="railGlowSingle" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(56,189,248,0)" />
          <stop offset="50%" stopColor="rgba(56,189,248,0.9)" />
          <stop offset="100%" stopColor="rgba(56,189,248,0)" />
        </linearGradient>
        <style>{glowCss}</style>
      </defs>
      <path
        d={d}
        className="rail-draw"
        stroke="url(#railGlowSingle)"
        strokeWidth={thin ? 1.3 : 1.8}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

/* ---------- Building blocks ---------- */

function LegendDot({
  color,
  label,
  icon: Icon,
}: {
  color: string
  label: string
  icon?: typeof MessageSquare
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`flex h-3.5 w-3.5 items-center justify-center rounded-full ${color}`}
      >
        {Icon && <Icon className="h-2.5 w-2.5 text-slate-950" />}
      </span>
      <span>{label}</span>
    </div>
  )
}

interface NodeWithLabelProps {
  x: number
  y: number
  color: "sky" | "emerald"
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  title: string
  subtitle: string
  align?: "top" | "bottom"
  compact?: boolean
}

function NodeWithLabel({
  x,
  y,
  color,
  icon: Icon,
  title,
  subtitle,
  align = "top",
  compact = false,
}: NodeWithLabelProps) {
  const colorBg =
    color === "sky" ? "bg-sky-400/90" : "bg-emerald-400/90"
  const colorRing =
    color === "sky" ? "ring-sky-300/70" : "ring-emerald-300/70"

  const topPercent = (y / 320) * 100
  const leftPercent = (x / 1000) * 100

  return (
    <>
      <motion.div
        variants={nodeVariants}
        className={`pointer-events-auto absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-black/70 ring-1 ${colorRing} shadow-[0_0_0_1px_rgba(15,23,42,0.9)]`}
        style={{ top: `${topPercent}%`, left: `${leftPercent}%` }}
      >
        <div
          className={`flex h-6 w-6 items-center justify-center rounded-full ${colorBg} shadow-[0_0_12px_rgba(56,189,248,0.6)]`}
        >
          <Icon className="h-3.5 w-3.5 text-slate-950" />
        </div>
      </motion.div>

      <motion.div
        variants={labelVariants}
        className={`pointer-events-none absolute flex max-w-[200px] -translate-x-1/2 flex-col items-center text-center ${
          align === "bottom" ? "-translate-y-full mb-2" : "mt-2"
        }`}
        style={{
          top: `${topPercent}%`,
          left: `${leftPercent}%`,
        }}
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-100/80">
          {title}
        </span>
        {!compact && (
          <span className="mt-1 text-[10px] text-slate-300/75">
            {subtitle}
          </span>
        )}
      </motion.div>
    </>
  )
}

function InteractionPill({ x, y, text }: { x: number; y: number; text: string }) {
  const topPercent = (y / 320) * 100
  const leftPercent = (x / 1000) * 100
  return (
    <motion.div
      variants={labelVariants}
      className="pointer-events-none absolute flex -translate-x-1/2 items-center gap-1 rounded-full bg-cyan-400/10 px-2 py-1 text-[9px] text-cyan-100 ring-1 ring-cyan-300/40 backdrop-blur"
      style={{ top: `${topPercent}%`, left: `${leftPercent}%` }}
    >
      <MessageSquare className="h-3 w-3" />
      <span>{text}</span>
    </motion.div>
  )
}

function TimeTag({ x, y, text }: { x: number; y: number; text: string }) {
  const topPercent = (y / 320) * 100
  const leftPercent = (x / 1000) * 100
  return (
    <motion.div
      variants={labelVariants}
      className="pointer-events-none absolute -translate-x-1/2 rounded-full bg-slate-900/80 px-2 py-0.5 text-[9px] text-slate-200 ring-1 ring-slate-500/50"
      style={{ top: `${topPercent}%`, left: `${leftPercent}%` }}
    >
      {text}
    </motion.div>
  )
}
