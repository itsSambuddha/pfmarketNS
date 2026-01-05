"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "absolute h-full w-full inset-0 overflow-hidden pointer-events-none",
        className
      )}
    >
      <div className="absolute h-full w-full inset-0 z-0 bg-transparent flex flex-row justify-center">
        {/* Beam 1: Sky Blue (Light/Airy) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, x: "-50%" }}
          animate={{ opacity: 1, scale: 1, x: "0%" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute left-0 top-0 h-full w-[500px] bg-gradient-to-br from-sky-400/30 via-blue-500/10 to-transparent blur-[100px] opacity-50 dark:opacity-30 transform -translate-x-1/2"
        />
        
        {/* Beam 2: Royal Blue (Deep/Professional) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, x: "50%" }}
          animate={{ opacity: 1, scale: 1, x: "0%" }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="absolute right-0 bottom-0 h-full w-[500px] bg-gradient-to-tl from-blue-700/40 via-sky-600/10 to-transparent blur-[100px] opacity-40 dark:opacity-30 transform translate-x-1/2"
        />
        
        {/* Central Core Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      </div>
    </div>
  );
};