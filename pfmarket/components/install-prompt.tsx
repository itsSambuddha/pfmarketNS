"use client";

import * as React from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function InstallPrompt({
  className = "",
  size = "sm"
}: {
  className?: string;
  size?: "sm" | "default" | "icon";
}) {
  const [isIOS, setIsIOS] = React.useState(false);
  const [isStandalone, setIsStandalone] = React.useState(false);
  const [deferredPrompt, setDeferredPrompt] = React.useState<any>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
        !(window as any).MSStream
    );

    setIsStandalone(
      window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as any).standalone === true
    );

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
    }
  };

  // Hide when not installable or already installed or on iOS (no prompt API)
  if (isStandalone || isIOS || !deferredPrompt) {
    return null;
  }

  return (
    <Button
      variant="outline"
      size={size}
      onClick={handleInstallClick}
      className={`gap-2 border-primary/20 hover:bg-primary/10 ${className}`}
    >
      <Download className="h-4 w-4" />
      <span className="text-xs font-medium">Install App</span>
    </Button>
  );
}
