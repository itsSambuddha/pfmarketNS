import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ServiceProjector } from "@/components/service-projector"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Navbar />
      <HeroSection />
      <ServiceProjector />
      
      {/* Spacer for Future Sections */}
      <div className="h-40 w-full" />
    </main>
  )
}