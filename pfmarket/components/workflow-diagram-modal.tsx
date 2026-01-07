"use client";

import React, { useState, useMemo } from "react";
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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* -------------------------------------------------------------------------- */
/* Data Structure                                                             */
/* -------------------------------------------------------------------------- */

type Role = "you" | "studio";

interface StepData {
  id: string;
  role: Role;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  progress: number; // 0 to 100 for rail placement
  isBranch?: boolean;
}

const STEPS: StepData[] = [
  {
    id: "1",
    role: "you",
    icon: FileText,
    title: "Upload Brief",
    subtitle: "Prompt & constraints",
    progress: 5,
  },
  {
    id: "2",
    role: "you",
    icon: PanelsTopLeft,
    title: "Drop Assets",
    subtitle: "Decks & reports",
    progress: 15,
  },
  {
    id: "3",
    role: "studio",
    icon: FileText,
    title: "Scope & Risk",
    subtitle: "Feasibility check",
    progress: 25,
  },
  {
    id: "4",
    role: "studio",
    icon: Sparkles,
    title: "Narrative",
    subtitle: "Creating the spine",
    progress: 35,
  },
  {
    id: "5",
    role: "studio",
    icon: GitFork,
    title: "Selection",
    subtitle: "Deck or Report track",
    progress: 45,
  },
  {
    id: "6a",
    role: "studio",
    icon: MonitorPlay,
    title: "Deck Track",
    subtitle: "Visual first · 12d",
    progress: 60,
    isBranch: true,
  },
  {
    id: "6b",
    role: "studio",
    icon: FileText,
    title: "Report Track",
    subtitle: "Structure · 22d",
    progress: 60,
    isBranch: true,
  },
  {
    id: "7",
    role: "studio",
    icon: CheckCircle2,
    title: "Polish & QA",
    subtitle: "Final safety check",
    progress: 75,
  },
  {
    id: "8",
    role: "studio",
    icon: Rocket,
    title: "Handoff",
    subtitle: "Assets delivered",
    progress: 85,
  },
  {
    id: "9",
    role: "you",
    icon: Sparkles,
    title: "Complete",
    subtitle: "Ready for launch",
    progress: 95,
  },
];

/* -------------------------------------------------------------------------- */
/* Main Component                                                             */
/* -------------------------------------------------------------------------- */

export function WorkflowDiagram({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  // Track which step is "current" for Path Pulse
  const [activeStepId, setActiveStepId] = useState<string>("3");

  const activeProgress = useMemo(() => {
    const step = STEPS.find((s) => s.id === activeStepId);
    return step ? step.progress : 0;
  }, [activeStepId]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-6 backdrop-blur-xl"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-8 top-8 z-50 rounded-full border border-white/10 bg-white/5 p-3 text-slate-400 transition-colors hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="relative flex h-[500px] w-full max-w-7xl flex-col overflow-hidden rounded-[40px] border border-white/10 bg-[#020617] shadow-2xl"
          >
            {/* Background Gradients */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(56,189,248,0.1),transparent_50%)]" />

            <header className="relative z-10 p-10 pb-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-sky-400">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Production Workflow</span>
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">
                Project Lifecycle
              </h2>
            </header>

            <div className="relative flex-1 px-10">
              <DesktopWorkflow
                railSteps={STEPS}
                activeProgress={activeProgress}
                onStepActivate={setActiveStepId}
              />
            </div>

            {/* Footer Legend */}
            <footer className="flex items-center justify-between border-t border-white/5 bg-white/[0.02] px-10 py-6">
              <div className="flex gap-8">
                <LegendItem color="bg-sky-500" label="You" />
                <LegendItem color="bg-emerald-500" label="Studio" />
              </div>
              <p className="text-[11px] font-medium uppercase tracking-widest text-slate-500">
                Hover steps to light up the path
              </p>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------- */
/* Desktop Layout & Glowing Rails                                             */
/* -------------------------------------------------------------------------- */

function DesktopWorkflow({
  railSteps,
  activeProgress,
  onStepActivate,
}: {
  railSteps: StepData[];
  activeProgress: number;
  onStepActivate: (id: string) => void;
}) {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {/* Base Rail (subtle) */}
      <div className="absolute left-0 right-0 top-1/2 h-[1px] -translate-y-1/2 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

      {/* Completed Rail Glow */}
      <div
        className="pointer-events-none absolute top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-gradient-to-r from-sky-400 via-sky-400 to-emerald-400"
        style={{
          left: 0,
          width: `${activeProgress}%`,
          boxShadow:
            "0 0 20px rgba(56,189,248,0.6), 0 0 40px rgba(16,185,129,0.5)",
          opacity: 0.95,
        }}
      />

      {/* Path Pulse band: glowing particles moving to the right, clipped to completed rail */}
      <div
        className="pointer-events-none absolute top-1/2 h-[14px] -translate-y-1/2 overflow-hidden"
        style={{
          left: 0,
          width: `${activeProgress}%`,
        }}
      >
        <motion.div
          className="flex w-[200%] flex-row gap-4"
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            duration: 7,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="h-[2px] w-6 rounded-full bg-gradient-to-r from-white/80 via-sky-300/90 to-transparent"
            />
          ))}
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={`b-${i}`}
              className="h-[2px] w-6 rounded-full bg-gradient-to-r from-white/80 via-sky-300/90 to-transparent"
            />
          ))}
        </motion.div>
      </div>

      {/* Steps Mapper */}
      <div className="relative h-full w-full">
        {railSteps.map((step) => (
          <WorkflowIconNode
            key={step.id}
            step={step}
            onActivate={onStepActivate}
          />
        ))}
      </div>
    </div>
  );
}

function WorkflowIconNode({
  step,
  onActivate,
}: {
  step: StepData;
  onActivate: (id: string) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const isYou = step.role === "you";

  // Vertical branching for 6a/6b
  let verticalPos = "top-1/2";
  if (step.id === "6a") verticalPos = "top-[30%]";
  if (step.id === "6b") verticalPos = "top-[70%]";

  return (
    <div
      className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out ${verticalPos}`}
      style={{ left: `${step.progress}%`, zIndex: isHovered ? 50 : 10 }}
      onMouseEnter={() => {
        setIsHovered(true);
        onActivate(step.id);
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        layout
        whileHover={{ y: -4, scale: 1.02 }}
        className={`flex items-center gap-0 overflow-hidden rounded-full border p-1.5 backdrop-blur-xl transition-colors duration-300 ${
          isHovered
            ? isYou
              ? "border-sky-500/60 bg-sky-950/80 pr-6"
              : "border-emerald-500/60 bg-emerald-950/80 pr-6"
            : "border-white/10 bg-slate-900/50 hover:border-white/20"
        }`}
      >
        {/* Icon Container */}
        <motion.div
          layout
          className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-white shadow-xl transition-all duration-300 ${
            isYou
              ? `bg-sky-500 ${isHovered ? "shadow-sky-500/40 scale-110" : ""}`
              : `bg-emerald-500 ${
                  isHovered ? "shadow-emerald-500/40 scale-110" : ""
                }`
          }`}
        >
          <step.icon className="h-5 w-5" />
        </motion.div>

        {/* Expandable Content */}
        <AnimatePresence mode="popLayout">
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="ml-4 flex flex-col whitespace-nowrap"
            >
              <span className="text-[11px] font-bold uppercase tracking-wider text-white">
                {step.title}
              </span>
              <span className="text-[10px] text-slate-400">
                {step.subtitle}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Branch stems */}
      {step.isBranch && (
        <div
          className={`absolute left-1/2 -z-10 h-20 w-[1px] -translate-x-1/2 bg-gradient-to-b from-slate-700/0 via-slate-700 to-slate-700/0 ${
            step.id === "6a" ? "top-1/2" : "bottom-1/2"
          }`}
        />
      )}
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`h-2.5 w-2.5 rounded-full ${color} shadow-[0_0_10px_rgba(0,0,0,0.5)]`}
      />
      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
        {label}
      </span>
    </div>
  );
}
