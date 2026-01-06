"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, MonitorPlay, Sparkles, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

type TierPptVariant = {
  id: string
  label: string
  description?: string
  embedUrl: string
}

type SamplesPageClientProps = {
  tierId: string
  title: string
  description: string
  pptVariants: TierPptVariant[]
  writeupPdfPath?: string
  kind: "deck" | "report" | "other"
}

export default function SamplesPageClient({
  title,
  description,
  pptVariants,
  writeupPdfPath,
  kind,
}: SamplesPageClientProps) {
  const [activeVariantId, setActiveVariantId] = React.useState(
    pptVariants[0]?.id,
  )

  const activeVariant = pptVariants.find((v) => v.id === activeVariantId)

  const isDeck = kind === "deck"
  const isReport = kind === "report"

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-background via-background to-slate-950/40">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.35),transparent_65%)] opacity-80 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-[size:80px_80px,72px_72px] opacity-[0.18]" />

      <div className="relative z-10 container mx-auto max-w-5xl px-4 py-10 md:py-16">
        {/* Top bar */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <Button asChild variant="ghost" size="sm" className="gap-2">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to service protocols
            </Link>
          </Button>

          <div className="hidden items-center gap-1 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground backdrop-blur md:flex dark:border-white/10 dark:bg-slate-950/50">
            <Sparkles className="h-3 w-3 text-amber-400" />
            Live sample environment
          </div>
        </div>

        {/* Hero header */}
        <header className="mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.4)]" />
            Live sample suite
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                {title} <span className="text-gradient-main">samples</span>
              </h1>
              <p className="max-w-xl text-sm text-muted-foreground">
                {description} This space shows real{" "}
                {isDeck ? "decks with animations" : "reports as PDFs"} so you can
                judge structure, pacing, and polish before committing.
              </p>
            </div>

            <div className="mt-1 flex flex-wrap gap-2 text-[11px] text-muted-foreground md:justify-end">
              {isDeck && (
                <>
                  <Pill>Motion‑ready transitions</Pill>
                  <Pill>Narrative‑first structure</Pill>
                  <Pill>Exam‑safe formatting</Pill>
                </>
              )}
              {isReport && (
                <>
                  <Pill>Publication‑grade formatting</Pill>
                  <Pill>Citation‑safe structure</Pill>
                  <Pill>Scannable summaries</Pill>
                </>
              )}
            </div>
          </div>
        </header>

        <section className="space-y-10">
          {/* Deck experience (Cinematic Deck) */}
          {isDeck && (
            <>
              {/* PPT variant cards */}
              {pptVariants.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Slide deck variants
                    </h2>
                    <p className="hidden text-xs text-muted-foreground md:block">
                      Click a card to load that deck below with full transitions &
                      animations.
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    {pptVariants.map((variant) => {
                      const active = variant.id === activeVariantId
                      return (
                        <button
                          key={variant.id}
                          type="button"
                          onClick={() => setActiveVariantId(variant.id)}
                          className={cn(
                            "group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border p-3 text-left transition-all",
                            "bg-white/5 backdrop-blur hover:bg-white/15 dark:bg-slate-950/40 dark:hover:bg-slate-900/60",
                            active
                              ? "border-blue-500/60 shadow-[0_14px_45px_rgba(37,99,235,0.55)]"
                              : "border-white/10 hover:border-white/30",
                          )}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-lg">
                                <MonitorPlay className="h-4 w-4" />
                              </div>
                              <div>
                                <div className="text-sm font-semibold">
                                  {variant.label}
                                </div>
                                {variant.description && (
                                  <p className="text-[11px] text-muted-foreground">
                                    {variant.description}
                                  </p>
                                )}
                              </div>
                            </div>
                            {active && (
                              <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-500">
                                Active
                              </span>
                            )}
                          </div>

                          <div className="mt-3 h-20 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900/40 to-sky-900/30 text-[10px] text-muted-foreground">
                            <div className="flex h-full items-center justify-center gap-2 opacity-80">
                              <span className="h-1 w-8 rounded-full bg-white/30" />
                              <span className="h-1 w-6 rounded-full bg-white/20" />
                              <span className="h-1 w-10 rounded-full bg-white/10" />
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Active PPT viewer */}
              {activeVariant && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Live deck preview
                      </h2>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {activeVariant.label} — rendered via PowerPoint for the web
                        with full transitions and click‑through.
                      </p>
                    </div>
                  </div>
                  <div className="aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black/80 shadow-[0_18px_60px_rgba(15,23,42,0.7)]">
                    <iframe
                      src={activeVariant.embedUrl}
                      width="100%"
                      height="100%"
                      className="h-full w-full"
                      frameBorder="0"
                      allowFullScreen
                    >
                      This is an embedded Microsoft Office presentation.
                    </iframe>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Report experience (Architect's Report) */}
          {isReport && writeupPdfPath && (
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Report sample (PDF)
                  </h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Scroll and zoom to inspect argument flow, citations, and
                    exam‑safe formatting for written reports.
                  </p>
                </div>
                <div className="hidden items-center gap-1 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground backdrop-blur md:flex dark:border-white/10 dark:bg-slate-950/50">
                  <FileText className="h-3 w-3 text-emerald-400" />
                  Written deliverable
                </div>
              </div>

              <div className="h-[640px] w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 shadow-[0_18px_60px_rgba(15,23,42,0.7)]">
                <iframe
                  src={writeupPdfPath}
                  className="h-full w-full"
                />
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur dark:border-white/15 dark:bg-slate-950/50">
      {children}
    </span>
  )
}

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
