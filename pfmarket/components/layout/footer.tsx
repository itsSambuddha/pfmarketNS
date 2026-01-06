"use client"

import Link from "next/link"
import { Github, Instagram, Mail, Phone } from "lucide-react"

const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border/40 bg-background/80 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 md:flex-row md:items-start md:justify-between md:py-14">
        {/* Brand + positioning */}
        <div className="space-y-4">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/15 text-sm font-semibold text-primary ring-1 ring-primary/30">
              ns
            </span>
            <span className="text-sm font-semibold tracking-tight text-foreground">
              N Sam&apos;s N · Strategic Visuals
            </span>
          </Link>
          <p className="max-w-sm text-sm text-muted-foreground">
            Presentation and research design studio helping students, teams, and
            founders communicate with clarity in rooms that matter.
          </p>
        </div>

        {/* Link columns */}
        <div className="grid flex-1 grid-cols-2 gap-8 text-sm text-muted-foreground md:grid-cols-3">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Services
            </p>
            <div className="flex flex-col gap-2">
              <Link href="#pricing" className="hover:text-foreground">
                Decks & briefs
              </Link>
              <Link href="#pricing" className="hover:text-foreground">
                Research reports
              </Link>
              <Link href="#process" className="hover:text-foreground">
                Process
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Company
            </p>
            <div className="flex flex-col gap-2">
              <Link href="#about" className="hover:text-foreground">
                About
              </Link>
              <Link href="#reviews" className="hover:text-foreground">
                Testimonials
              </Link>
              <Link href="#faqs" className="hover:text-foreground">
                FAQs
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Contact
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:hello@example.com"
                className="inline-flex items-center gap-2 hover:text-foreground"
              >
                <Mail className="h-4 w-4" />
                <span>hello@example.com</span>
              </a>
              <a
                href="tel:+910000000000"
                className="inline-flex items-center gap-2 hover:text-foreground"
              >
                <Phone className="h-4 w-4" />
                <span>+91 00000 00000</span>
              </a>
              <div className="flex items-center gap-3 pt-1">
                <a
                  href="https://github.com/your-handle"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-background/70 text-muted-foreground ring-1 ring-border/60 transition-colors hover:text-foreground hover:ring-primary/60"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href="https://instagram.com/your-handle"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-background/70 text-muted-foreground ring-1 ring-border/60 transition-colors hover:text-foreground hover:ring-primary/60"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-border/30 bg-background/90">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {currentYear} N Sam&apos;s N. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/terms" className="hover:text-foreground">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <span className="hidden h-1 w-1 rounded-full bg-muted-foreground/50 md:inline-block" />
            <span className="text-[11px]">
              Built with Next.js · Tailwind · shadcn/ui
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
