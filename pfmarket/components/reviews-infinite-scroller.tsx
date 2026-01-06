"use client"

import React from "react"
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards"

const reviews = [
  {
    quote:
      "Locked my deck less than 24 hours before committee and still got something that felt tailored, sharp, and easy to speak from.",
    name: "User 1",
    title: "Delegation Head",
  },
  {
    quote:
      "The structure and flow were miles better than my usual slides. The brief was followed exactly, with smart suggestions where I was vague.",
    name: "User 2",
    title: "College MUN Participant",
  },
  {
    quote:
      "Honestly did not expect this level of polish for the price. The refund policy made it feel safe to try, but I didn’t need it.",
    name: "User 3",
    title: "First-time Client",
  },
  {
    quote:
      "Loved how they mixed AI-assisted research with a very human voice. Nothing felt generic or copy-pasted from the internet.",
    name: "User 4",
    title: "Research Speaker",
  },
  {
    quote:
      "Turnaround was exactly as promised. Priority slot came in clutch when my original plan fell apart two days before the event.",
    name: "User 5",
    title: "Conference Delegate",
  },
  {
    quote:
      "Briefing was simple. I just dropped my context and references, and the final deck felt like something I would have written on my best day.",
    name: "User 6",
    title: "Student Delegate",
  },
  {
    quote:
      "Slides were clean, consistent, and easy for the chair to skim. Visual hierarchy made my key points stand out without overdesign.",
    name: "User 7",
    title: "Committee Speaker",
  },
  {
    quote:
      "Communication on WhatsApp was fast and clear. I always knew what stage the deck was in and when to expect the next update.",
    name: "User 8",
    title: "Returning Client",
  },
  {
    quote:
      "The research notes attached with the deck made prep way easier. I could adapt answers on the fly without memorizing everything.",
    name: "User 9",
    title: "Crisis Delegate",
  },
  {
    quote:
      "For the price, this easily beats trying to build slides from scratch the night before. The time I saved was worth it alone.",
    name: "User 10",
    title: "College Student",
  },
]

export default function ReviewsInfiniteScroller() {
  return (
    <div className="w-full">

<div className="mb-8 flex flex-col items-center gap-3 px-4 text-center md:mb-10 md:px-0">
  {/* pill label */}
  <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-800 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-100">
    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.45)]" />
    Social proof
  </div>

  {/* title */}
  <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-[32px]">
    What users are saying.
  </h2>

  {/* microcopy */}
  <p className="max-w-xl text-xs text-muted-foreground md:text-sm">
    Real students and freshers using these decks and reports for vivas, project
    defense, and first‑job interviews.
  </p>

  {/* tiny metrics strip */}
  <div className="mt-1 flex flex-wrap items-center justify-center gap-2 text-[11px] text-muted-foreground">
    <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/60 px-2.5 py-1 backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
      95% would recommend
    </span>
    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/40 px-2.5 py-1 backdrop-blur dark:border-white/5 dark:bg-slate-900/70">
      <span className="h-1 w-4 rounded-full bg-sky-400/80" />
      Used across 3+ semesters
    </span>
  </div>
</div>



      <div className="relative w-full overflow-hidden border-y border-white/10 bg-background/80 py-6 backdrop-blur-xl">
        <InfiniteMovingCards
          items={reviews}
          direction="left"
          speed="fast"
          className="mx-auto w-full px-4 md:px-8"
        />
      </div>
    </div>
  )
}
