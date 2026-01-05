"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { motion, useScroll, AnimatePresence } from "framer-motion"
import { Menu, Sparkles, Lock, ArrowRight, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { InstallPrompt } from "@/components/install-prompt"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "#services", label: "Protocols" },
  { href: "#process", label: "Process" },
  { href: "#faq", label: "Intelligence" },
]

export function Navbar() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const unsub = scrollY.on("change", (y) => {
      setScrolled(y > 50)
    })
    return () => unsub()
  }, [scrollY])

  // Common Logo Component
  const BrandLogo = ({ condensed = false }: { condensed?: boolean }) => (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all">
        <Sparkles className="w-4 h-4 fill-white" />
      </div>
      {!condensed && (
        <div className="flex flex-col leading-none">
          <span className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
            pfmarket
          </span>
          <span className="text-[10px] font-medium text-muted-foreground tracking-widest uppercase">
            Strategic Visuals
          </span>
        </div>
      )}
    </Link>
  )

  return (
    <>
      {/* DESKTOP NAV (Animates between Full and Pill) */}
      <div className="hidden md:block fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <AnimatePresence mode="wait">
          
          {/* STATE 1: Top of Page */}
          {!scrolled && (
            <motion.header
              key="full-bar"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="w-full h-20 flex items-center px-8 pointer-events-auto bg-transparent"
            >
              <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
                <BrandLogo />
                <nav className="flex items-center gap-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors hover:underline underline-offset-4"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="h-4 w-px bg-border/50 mx-2" />
                  <div className="flex items-center gap-3">
                    <InstallPrompt />
                    <ModeToggle />
                    {/* <Button size="sm" className="rounded-full px-6 bg-primary/10 text-primary hover:bg-primary hover:text-white border border-primary/20 transition-all">
                      Log In
                    </Button> */}
                  </div>
                </nav>
              </div>
            </motion.header>
          )}

          {/* STATE 2: Scrolled (Floating Pill) */}
          {scrolled && (
            <motion.header
              key="pill-bar"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 20, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full flex justify-center pointer-events-auto"
            >
              <div className="flex items-center justify-between px-2 py-2 pl-4 rounded-full border border-white/20 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-2xl shadow-blue-900/5 dark:shadow-black/50 min-w-[500px]">
                <div className="flex items-center gap-6">
                  <BrandLogo condensed />
                  <nav className="flex items-center gap-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="px-4 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-full transition-all"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>
                <div className="flex items-center gap-2 pl-6">
                  <ModeToggle />
                  <Button size="sm" className="rounded-full h-9 px-5 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20">
                    <Lock className="w-3 h-3 mr-2" />
                    Book
                  </Button>
                </div>
              </div>
            </motion.header>
          )}
        </AnimatePresence>
      </div>

      {/* MOBILE NAV (Fixed Header + Right Sidebar) */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/60 backdrop-blur-lg">
        <div className="flex h-16 items-center justify-between px-4">
          <BrandLogo />
          
          <div className="flex items-center gap-2">
            <ModeToggle />
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-[300px] sm:w-[350px] border-l border-primary/20 bg-background/90 backdrop-blur-2xl"
              >
                <SheetHeader className="mb-8 text-left">
                  <SheetTitle className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white shadow-glow">
                      <Sparkles className="w-4 h-4 fill-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-lg leading-none">pfmarket</span>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Menu</span>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                
                <div className="flex flex-col h-full pb-6">
                    {/* Menu Links */}
                    <div className="flex flex-col gap-1">
                        {navLinks.map((link, idx) => (
                            <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMobileOpen(false)}
                            className="group flex items-center justify-between py-4 px-2 text-lg font-medium border-b border-border/40 hover:bg-secondary/30 hover:pl-4 transition-all duration-300"
                            >
                                <span className="group-hover:text-primary transition-colors">{link.label}</span>
                                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-primary" />
                            </Link>
                        ))}
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-auto flex flex-col gap-4">
                        <div className="rounded-xl bg-gradient-to-br from-blue-600/10 to-sky-500/10 p-4 border border-blue-500/20">
                            <h4 className="font-semibold text-sm mb-1 text-primary">Need the App?</h4>
                            <p className="text-xs text-muted-foreground mb-3">Install for instant access and offline viewing.</p>
                            <Button variant="outline" size="sm" className="w-full gap-2 border-primary/30 hover:bg-primary/10">
                                <Download className="w-3 h-3" /> Install App
                            </Button>
                        </div>
                        
                        <Button className="w-full bg-blue-600 h-12 text-base font-bold shadow-lg shadow-blue-600/20" onClick={() => setIsMobileOpen(false)}>
                            Book Priority Slot
                        </Button>
                    </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </>
  )
}