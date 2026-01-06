// app/page.tsx
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ServiceProjector } from "@/components/service-projector"
import { FAQSection } from "@/components/faq-section"
import ReviewsInfiniteScroller from "@/components/reviews-infinite-scroller"
import { WhyUsRibbon } from "@/components/why-us-ribbon"

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col bg-background">
      {/* Top-level background grid + glow */}
      <div
        className="pointer-events-none fixed inset-0 z-[-1]"
        aria-hidden="true"
      >
        {/* Soft grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_60%),linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:auto,80px_80px,64px_64px] opacity-60 dark:opacity-80" />
        {/* Corner vignette */}
        <div className="absolute right-[-120px] top-[15%] h-80 w-80 rounded-full bg-gradient-to-br from-sky-400/25 via-blue-500/10 to-transparent blur-3xl" />
        <div className="absolute left-[-80px] bottom-[-80px] h-72 w-72 rounded-full bg-gradient-to-tr from-blue-600/18 via-sky-500/8 to-transparent blur-2xl" />
      </div>

      {/* Sticky navbar */}
      <Navbar />

      {/* Content stack */}
      <div className="flex flex-1 flex-col items-center">
        {/* Hero on a centered rail */}
        <section className="w-full">
          <HeroSection />
        </section>
<WhyUsRibbon />
        {/* Services block – no hard border line */}
        <section
          id="services"
          className="relative w-full bg-background/70 backdrop-blur-xl"
        >
          <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
            <ServiceProjector />
          </div>
        </section>

        {/* FAQ block – also without border line */}
        <section
          id="faq"
          className="relative w-full bg-background/80"
        >
          <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
            <FAQSection />
          </div>
        </section>
      </div>

      {/* Reviews strip */}
      <section id="reviews" className="relative w-full py-16 md:py-20">
        <ReviewsInfiniteScroller />
      </section>
    </main>
  )
}
