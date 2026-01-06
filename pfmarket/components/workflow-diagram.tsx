// components/workflow-diagram-enhanced.tsx
"use client"

import React, { useEffect, useState } from "react"
import {
  X,
  FileText,
  MonitorPlay,
  PanelsTopLeft,
  Sparkles,
  Rocket,
  MessageSquare,
  GitFork,
  CheckCircle2,
} from "lucide-react"
import { motion, AnimatePresence, Variants } from "framer-motion"

/* -------------------------------------------------------------------------- */
/* Types & Data                                                               */
/* -------------------------------------------------------------------------- */

type Role = "you" | "studio" | "interaction"

interface StepData {
  id: string
  role: Role
  icon: React.ElementType
  title: string
  subtitle: string
  gridPos: string
  mobileOrder: number
  isBranchParent?: boolean
}

const WORKFLOW_STEPS: StepData[] = [
  {
    id: "upload",
    role: "you",
    icon: FileText,
    title: "Upload Brief",
    subtitle: "Prompt, rubric, constraints.",
    gridPos: "col-start-1 row-start-2",
    mobileOrder: 1,
  },
  {
    id: "assets",
    role: "you",
    icon: PanelsTopLeft,
    title: "Drop Assets",
    subtitle: "Decks, reports, notes.",
    gridPos: "col-start-2 row-start-2",
    mobileOrder: 2,
  },
  {
    id: "scope",
    role: "studio",
    icon: FileText,
    title: "Scope & Risk",
    subtitle: "Feasibility & timing check.",
    gridPos: "col-start-3 row-start-2",
    mobileOrder: 3,
  },
  {
    id: "narrative",
    role: "studio",
    icon: Sparkles,
    title: "Narrative Outline",
    subtitle: "Creating the spine.",
    gridPos: "col-start-4 row-start-2",
    mobileOrder: 4,
  },
  {
    id: "branch",
    role: "studio",
    icon: GitFork,
    title: "Path Selection",
    subtitle: "Deck or Report track?",
    gridPos: "col-start-5 row-start-2",
    mobileOrder: 5,
    isBranchParent: true,
  },
  {
    id: "deck-track",
    role: "studio",
    icon: MonitorPlay,
    title: "Deck Track",
    subtitle: "Visuals & pacing · ~12d",
    gridPos: "col-start-6 row-start-1",
    mobileOrder: 6,
  },
  {
    id: "report-track",
    role: "studio",
    icon: FileText,
    title: "Report Track",
    subtitle: "Deep structure · ~22d",
    gridPos: "col-start-6 row-start-3",
    mobileOrder: 7,
  },
  {
    id: "polish",
    role: "studio",
    icon: CheckCircle2,
    title: "Polish & QA",
    subtitle: "Language, visuals, safety.",
    gridPos: "col-start-7 row-start-2",
    mobileOrder: 8,
  },
  {
    id: "handoff",
    role: "studio",
    icon: Rocket,
    title: "Handoff",
    subtitle: "Final assets delivered.",
    gridPos: "col-start-8 row-start-2",
    mobileOrder: 9,
  },
  {
    id: "final",
    role: "you",
    icon: Sparkles,
    title: "Project Complete",
    subtitle: "Ready for launch.",
    gridPos: "col-start-9 row-start-2",
    mobileOrder: 10,
  },
]

/* -------------------------------------------------------------------------- */
/* Animation Variants                                                         */
/* -------------------------------------------------------------------------- */

const modalVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

const containerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: { opacity: 0, scale: 0.96, y: 20, transition: { duration: 0.3 } },
}

const nodeVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 16 },
  },
}

const svgPathVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.8, ease: "easeInOut", delay: 0.35 },
  },
}

/* -------------------------------------------------------------------------- */
/* Main Component                                                             */
/* -------------------------------------------------------------------------- */

interface WorkflowDiagramProps {
  open: boolean
  onClose: () => void
}

export function WorkflowDiagram({ open, onClose }: WorkflowDiagramProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-slate-950/80 p-4 backdrop-blur-xl lg:p-8"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/60 text-slate-300 transition-colors hover:bg-white/10 hover:text-white lg:right-8 lg:top-8"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <motion.div
            className="relative flex max-h-[90vh] w-full max-w-7xl flex-col overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/90 shadow-[0_0_80px_-20px_rgba(0,0,0,0.7)]"
            variants={containerVariants}
          >
            {/* Header */}
            <div className="flex flex-shrink-0 flex-col gap-4 border-b border-white/5 bg-white/[0.02] px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500/20 via-emerald-500/20 to-sky-500/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-100">
                  <Sparkles className="h-3.5 w-3.5 text-sky-400" />
                  <span>Production workflow</span>
                </div>
                <p className="mt-2 max-w-md text-[12px] leading-relaxed text-slate-300/85">
                  Your brief travels across a single rail, branching into deck or report
                  and converging back into a polished handoff.
                </p>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-slate-300">
                <LegendItem color="bg-sky-500" label="You" shadow="shadow-sky-500/40" />
                <LegendItem
                  color="bg-emerald-500"
                  label="Studio"
                  shadow="shadow-emerald-500/40"
                />
                <LegendItem
                  color="bg-purple-500"
                  label="Interaction"
                  icon={MessageSquare}
                  shadow="shadow-purple-500/40"
                />
              </div>
            </div>

            {/* Body */}
            <div className="relative flex-1 overflow-y-auto overflow-x-hidden p-6 lg:overflow-hidden lg:p-8">
              {!isMobile && <DesktopWorkflowLayout steps={WORKFLOW_STEPS} />}
              {isMobile && <MobileWorkflowLayout steps={WORKFLOW_STEPS} />}

              {/* Noise overlay */}
              <div
                className="pointer-events-none absolute inset-0 z-0 opacity-[0.035]"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* -------------------------------------------------------------------------- */
/* Layouts                                                                    */
/* -------------------------------------------------------------------------- */

function DesktopWorkflowLayout({ steps }: { steps: StepData[] }) {
  return (
    <div className="relative z-10 h-full min-h-[340px] w-full">
      {/* Flow rails + interaction branches */}
      <DesktopFlowSVG />

      {/* Interaction pills: positioned so they never overlap nodes */}
      <InteractionPill
        label="Scope align"
        // around 30% along the rail, above it
        desktopPos="left-[30%] top-[32%]"
      />
      <InteractionPill
        label="Preference check"
        // around 48% along the rail, above it
        desktopPos="left-[48%] top-[32%]"
      />

      {/* Node grid */}
      <div className="relative z-20 grid h-full w-full grid-cols-9 grid-rows-3 gap-4">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex items-center justify-center ${step.gridPos}`}
          >
            <WorkflowNode data={step} />
          </div>
        ))}
      </div>
    </div>
  )
}

function MobileWorkflowLayout({ steps }: { steps: StepData[] }) {
  const sortedSteps = [...steps].sort((a, b) => a.mobileOrder - b.mobileOrder)

  return (
    <div className="relative z-10 flex flex-col items-center gap-8 pb-8">
      {sortedSteps.map((step, index) => (
        <React.Fragment key={step.id}>
          <WorkflowNode data={step} isMobile />

          {index < sortedSteps.length - 1 && (
            <div className="relative flex h-10 w-full items-center justify-center">
              <MobileVerticalSVG
                flowColor={sortedSteps[index + 1]?.role === "you" ? "sky" : "emerald"}
              />
              {step.id === "assets" && (
                <InteractionPill mobile label="Scope align" />
              )}
              {step.id === "narrative" && (
                <InteractionPill mobile label="Pref check" />
              )}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Core UI                                                                    */
/* -------------------------------------------------------------------------- */

function WorkflowNode({
  data,
  isMobile = false,
}: {
  data: StepData
  isMobile?: boolean
}) {
  const isYou = data.role === "you"

  const baseColors = isYou
    ? "border-sky-500/35 bg-sky-950/40 text-sky-100 shadow-[0_10px_24px_-16px_rgba(56,189,248,0.7)]"
    : "border-emerald-500/35 bg-emerald-950/40 text-emerald-100 shadow-[0_10px_24px_-16px_rgba(16,185,129,0.7)]"

  const iconColors = isYou
    ? "bg-sky-500 text-white shadow-md shadow-sky-500/50"
    : "bg-emerald-500 text-white shadow-md shadow-emerald-500/50"

  const hoverEffects = isYou
    ? "group-hover:border-sky-400/70 group-hover:shadow-sky-400/60"
    : "group-hover:border-emerald-400/70 group-hover:shadow-emerald-400/60"

  return (
    <motion.div
      variants={nodeVariants}
      initial="hidden"
      animate="visible"
      className={`group relative flex items-center gap-3 rounded-xl border px-3.5 py-2.5 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] ${baseColors} ${hoverEffects} ${
        isMobile ? "w-full max-w-sm" : "h-18 w-40"
      }`}
    >
      <div
        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${iconColors} transition-transform duration-200 group-hover:scale-105 group-hover:rotate-1`}
      >
        <data.icon className="h-4 w-4" />
      </div>

      <div className="flex flex-col">
        <h4 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-50">
          {data.title}
        </h4>
        <span
          className={`mt-0.5 text-[10px] leading-snug ${
            isYou ? "text-sky-300/80" : "text-emerald-300/80"
          }`}
        >
          {data.subtitle}
        </span>
      </div>

      {isMobile && data.isBranchParent && (
        <div className="pointer-events-none absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] uppercase tracking-[0.18em] text-slate-500">
          Parallel tracks below
        </div>
      )}
    </motion.div>
  )
}

function LegendItem({
  color,
  label,
  icon: Icon,
  shadow,
}: {
  color: string
  label: string
  icon?: typeof MessageSquare
  shadow?: string
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex h-2.5 w-2.5 items-center justify-center rounded-full ${color} ${shadow}`}
      >
        {Icon && <Icon className="h-2.5 w-2.5 text-white" />}
      </div>
      <span>{label}</span>
    </div>
  )
}

function InteractionPill({
  label,
  desktopPos,
  mobile = false,
}: {
  label: string
  desktopPos?: string
  mobile?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.7, type: "spring", stiffness: 140, damping: 14 }}
      className={`z-30 flex items-center gap-1.5 rounded-full border border-purple-400/45 bg-slate-950/90 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-purple-200 backdrop-blur-md shadow-lg shadow-purple-500/25 ${
        mobile
          ? "absolute"
          : `absolute -translate-x-1/2 -translate-y-1/2 ${desktopPos}`
      }`}
    >
      <MessageSquare className="h-3 w-3" />
      <span>{label}</span>
    </motion.div>
  )
}

/* -------------------------------------------------------------------------- */
/* SVG Flow Connectors                                                        */
/* -------------------------------------------------------------------------- */

function DesktopFlowSVG() {
  // main rail y = 200; pills sit around y = 140, branch up from rail
  const mainPathStr = "M 60 200 H 460"
  const deckPathStr =
    "M 460 200 C 500 200, 520 80, 580 80 H 660 C 720 80, 740 200, 780 200"
  const reportPathStr =
    "M 460 200 C 500 200, 520 320, 580 320 H 660 C 720 320, 740 200, 780 200"
  const endPathStr = "M 780 200 H 980"

  // branch lines to interaction pills (x positions chosen to match desktopPos)
  const scopeBranchStr = "M 320 200 L 320 150"
  const preferenceBranchStr = "M 520 200 L 520 150"

  const common = {
    strokeLinecap: "round" as const,
    fill: "none",
  }

  const GlowPath = ({ d, colorCls }: { d: string; colorCls: string }) => (
    <>
      <motion.path
        d={d}
        className={`${colorCls} opacity-40 blur-md`}
        strokeWidth={12}
        {...common}
        variants={svgPathVariants}
        initial="hidden"
        animate="visible"
      />
      <motion.path
        d={d}
        className={colorCls}
        strokeWidth={3}
        {...common}
        variants={svgPathVariants}
        initial="hidden"
        animate="visible"
      />
      <path
        d={d}
        stroke="white"
        strokeWidth={2}
        strokeDasharray="10 20"
        className="flow-dash opacity-55 mix-blend-overlay"
        {...common}
      />
    </>
  )

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1050 400"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {/* main & tracks */}
      <GlowPath d={mainPathStr} colorCls="stroke-sky-500" />
      <GlowPath d={deckPathStr} colorCls="stroke-emerald-500" />
      <GlowPath d={reportPathStr} colorCls="stroke-emerald-500" />
      <GlowPath d={endPathStr} colorCls="stroke-emerald-500" />

      {/* interaction branches (simple lines, no glow to keep them subtle) */}
      <motion.path
        d={scopeBranchStr}
        className="stroke-purple-400/80"
        strokeWidth={2}
        {...common}
        variants={svgPathVariants}
        initial="hidden"
        animate="visible"
      />
      <motion.path
        d={preferenceBranchStr}
        className="stroke-purple-400/80"
        strokeWidth={2}
        {...common}
        variants={svgPathVariants}
        initial="hidden"
        animate="visible"
      />
    </svg>
  )
}

function MobileVerticalSVG({ flowColor }: { flowColor: "sky" | "emerald" }) {
  const colorClass = flowColor === "sky" ? "stroke-sky-500" : "stroke-emerald-500"

  return (
    <svg className="absolute h-full w-6" viewBox="0 0 24 48" aria-hidden="true">
      <line
        x1="12"
        y1="0"
        x2="12"
        y2="48"
        className={`${colorClass} opacity-45 blur-md`}
        strokeWidth={8}
        strokeLinecap="round"
      />
      <line
        x1="12"
        y1="0"
        x2="12"
        y2="48"
        className={colorClass}
        strokeWidth={3}
        strokeLinecap="round"
      />
      <line
        x1="12"
        y1="0"
        x2="12"
        y2="48"
        stroke="white"
        strokeWidth={2}
        strokeDasharray="8 12"
        className="flow-dash opacity-70 mix-blend-overlay"
        strokeLinecap="round"
      />
    </svg>
  )
}
