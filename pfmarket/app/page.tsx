import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ServiceProjector } from "@/components/service-projector"
import { FAQSection } from "@/components/faq-section"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Navbar />
      <HeroSection />
      <ServiceProjector />
      <FAQSection />
      
      {/* Footer Placeholder */}
      <div className="h-20 w-full bg-background border-t border-border flex items-center justify-center text-muted-foreground text-sm">
        © 2026 pfmarket / N Sam's N
      </div>
    </main>
  )
}