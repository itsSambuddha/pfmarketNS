// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/layout/footer";
import { PwaServiceWorkerRegister } from "@/components/PwaServiceWorkerRegister";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  title: "CampusSlateNS",
  description: "Elite academic design & consulting.",
  manifest: "/manifest.json"
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#02040a"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={inter.variable}
    >
      <body className="min-h-screen bg-background text-foreground font-sans antialiased overflow-x-hidden selection:bg-blue-500/30">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <PwaServiceWorkerRegister />

          {/* Global ambient noise / grain */}
          <div
            className="pointer-events-none fixed inset-0 z-[-1] opacity-[0.04] dark:opacity-[0.06]"
            aria-hidden="true"
          />

          {/* Subtle radial stage (extra, on top of globals.css body::before) */}
          <div
            className="pointer-events-none fixed inset-0 z-[-1]"
            aria-hidden="true"
          >
            <div className="absolute inset-x-0 top-[-20%] h-[320px] bg-gradient-to-b from-blue-500/12 via-blue-400/4 to-transparent dark:from-sky-400/22 dark:via-sky-300/6 blur-3xl" />
            <div className="absolute inset-x-[-20%] bottom-[-30%] h-[360px] bg-gradient-to-t from-sky-500/10 via-blue-500/5 to-transparent dark:from-blue-500/24 dark:via-blue-400/10 blur-3xl" />
          </div>

          {/* Page content + footer */}
          <div className="relative flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
