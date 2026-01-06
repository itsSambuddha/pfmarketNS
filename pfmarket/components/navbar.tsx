"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { Menu, Lock, ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { InstallPrompt } from "@/components/install-prompt";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";

const navLinks = [
  { href: "#services", label: "Protocols" },
  { href: "#process", label: "Process" },
  { href: "#faq", label: "Intelligence" }
];

function BrandMark({ condensed = false }: { condensed?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3">
      <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-transparent">
        <Image
          src="/assets/logo/ilnsm2418.png"
          alt="Campus_SlateNS logo"
          width={48}
          height={48}
          className="h-12 w-12 object-contain"
          priority
        />
      </div>
      {!condensed && (
        <div className="flex flex-col leading-tight">
          <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Campus_SlateNS
          </span>
          <span className="text-[10px] font-light tracking-tight text-foreground transition-colors group-hover:text-primary">
            pfmarket
          </span>
        </div>
      )}
    </Link>
  );
}

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const unsub = scrollY.on("change", (y) => setScrolled(y > 40));
    return () => unsub();
  }, [scrollY]);

  return (
    <>
      {/* Desktop nav */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 hidden md:block">
        <AnimatePresence mode="wait" initial={false}>
          {!scrolled && (
            <motion.header
              key="nav-full"
              initial={{ opacity: 0, y: -18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.18 }}
              className="pointer-events-auto"
            >
              <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4">
                <BrandMark />
                <nav className="flex items-center gap-9">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="mx-1 h-4 w-px bg-border/70" />
                  <div className="flex items-center gap-3">
                    {/* Desktop install button */}
                    <InstallPrompt className="hidden md:flex" />
                    <ModeToggle />
                    <Link href="#services">
                      <Button
                        size="sm"
                        className="rounded-full border border-blue-500/30 bg-blue-600/10 px-5 text-xs font-semibold text-blue-600 hover:bg-blue-600 hover:text-white"
                      >
                        <Lock className="mr-2 h-3 w-3" />
                        Book Slot
                      </Button>
                    </Link>
                  </div>
                </nav>
              </div>
            </motion.header>
          )}

          {scrolled && (
            <motion.header
              key="nav-pill"
              initial={{ opacity: 0, y: -26, scale: 0.96 }}
              animate={{ opacity: 1, y: 16, scale: 1 }}
              exit={{ opacity: 0, y: -26, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="pointer-events-auto flex justify-center"
            >
              <div className="flex min-w-[520px] max-w-3xl items-center justify-between gap-4 rounded-full border border-white/20 bg-white/80 px-3 py-2 pl-4 text-xs shadow-[0_18px_60px_rgba(15,23,42,0.45)] backdrop-blur-2xl dark:border-white/12 dark:bg-slate-950/85">
                <div className="flex items-center gap-5">
                  <BrandMark condensed />
                  <nav className="flex items-center gap-1.5">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="rounded-full px-4 py-1.5 text-[11px] font-semibold text-muted-foreground/90 transition-all hover:bg-slate-900/4 hover:text-foreground dark:hover:bg-slate-800/60"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>
                <div className="flex items-center gap-2 pl-4">
                  <ModeToggle />
                  <Link href="#services">
                    <Button className="h-9 rounded-full bg-blue-600 px-5 text-[11px] font-semibold text-white shadow-[0_10px_35px_rgba(37,99,235,0.6)] hover:bg-blue-700">
                      <Lock className="mr-2 h-3 w-3" />
                      Book Slot
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.header>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile nav */}
      <div className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-background/80 backdrop-blur-xl md:hidden">
        <div className="flex h-14 items-center justify-between px-4">
          <BrandMark condensed />
          <div className="flex items-center gap-1.5">
            <ModeToggle />
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full border border-white/10 bg-white/5 backdrop-blur"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="flex w-[290px] flex-col border-l border-white/10 bg-background/95 px-0 py-0 backdrop-blur-2xl sm:w-[320px]"
              >
                <SheetHeader className="border-b border-white/10 px-4 pb-3 pt-3 text-left">
                  <SheetTitle className="flex items-center gap-3">
                    <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl">
                      <Image
                        src="/assets/logo/ilnsm2418.png"
                        alt="pfmarket logo"
                        width={40}
                        height={40}
                        className="h-10 w-10 object-contain"
                      />
                    </div>
                    <div className="flex flex-col leading-tight">
                      <span className="text-xs font-semibold text-foreground">
                        pfmarket
                      </span>
                      <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                        Navigation
                      </span>
                    </div>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex h-full flex-col px-4 pb-5 pt-3">
                  <nav className="mb-4 flex flex-col gap-1.5">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMobileOpen(false)}
                        className="group flex items-center justify-between rounded-xl px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                      >
                        <span>{link.label}</span>
                        <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 text-primary transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                      </Link>
                    ))}
                  </nav>

                  <div className="my-2 h-px bg-gradient-to-r from-transparent via-border/70 to-transparent" />

                  <div className="mt-auto flex flex-col gap-3 pt-3">
                    {/* <div className="rounded-2xl border border-primary/20 bg-primary/5 p-3"> */}
                      {/* <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                        Install app
                      </div>
                      <p className="mb-2 text-[11px] text-muted-foreground">
                        Keep your decks and timelines pinned to your home screen
                        with offline-friendly access.
                      </p> */}
                      {/* <div className="flex gap-2"> */}
                        {/* Mobile install button uses same logic */}
                        {/* <InstallPrompt size="sm" className="flex-1" />
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 gap-2 border-primary/40 text-[11px]"
                          asChild
                        >
                          <span className="flex items-center justify-center gap-2">
                            <Download className="h-3 w-3" />
                            Install pfmarket
                          </span>
                        </Button>
                      </div> */}
                    {/* </div> */}

                    <Link
                      href="#services"
                      onClick={() => setIsMobileOpen(false)}
                    >
                      <Button className="h-11 w-full rounded-2xl bg-blue-600 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(37,99,235,0.6)] hover:bg-blue-700">
                        <Lock className="mr-2 h-4 w-4" />
                        Book Slot
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </>
  );
}
