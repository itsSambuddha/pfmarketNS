import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Navbar />
      <HeroSection />
      
      {/* Placeholder for Next Phase */}
      <div id="services" className="h-screen w-full flex items-center justify-center bg-muted/20">
        <p className="text-muted-foreground">Service Projector Loading...</p>
      </div>
    </main>
  )
}