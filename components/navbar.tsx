"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Search, Command } from "lucide-react";

import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { docsConfig } from "@/lib/docs-config";
import { CommandMenu } from "./command-menu";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500",
        scrolled ? "pt-2" : "pt-6"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <CommandMenu open={commandOpen} setOpen={setCommandOpen} />

        <nav
          className={cn(
            "relative flex h-14 items-center justify-between gap-4 px-5 transition-all duration-500",
            "rounded-2xl border",
            // Light Mode Glass
            "bg-white/70 border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)]",
            // Dark Mode Glass
            "dark:bg-black/60 dark:border-white/10 dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]",
            // The Blur
            "backdrop-blur-xl backdrop-saturate-150"
          )}
        >
          {/* Subtle Grain Overlay */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[url('/noise.png')] opacity-[0.02] dark:opacity-[0.04]" />

          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl overflow-hidden border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900 shadow-sm">
                <img src="/image.ico" alt="Logo" className="h-5.5 w-5.5 object-contain" />
              </div>
              <span className="text-base font-bold tracking-tight text-neutral-900 dark:text-white">
                SwiftJS
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-2">
              {docsConfig.mainNav.map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-semibold transition-colors rounded-xl hover:bg-black/5 dark:hover:bg-white/5",
                      active ? "text-neutral-950 dark:text-white" : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200"
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-xl bg-black/[0.04] dark:bg-white/10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    {item.title}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setCommandOpen(true)}
              className="hidden sm:flex items-center gap-3 pl-4 pr-2 py-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.05] dark:border-white/[0.05] hover:bg-black/[0.05] dark:hover:bg-white/[0.08] transition-all group"
            >
              <Search className="h-4 w-4 text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" />
              <span className="text-sm font-medium text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">Search</span>
              <kbd className="hidden lg:flex items-center gap-1 rounded-lg bg-white/50 dark:bg-neutral-800 px-2 h-6 font-mono text-[10px] text-neutral-400 border border-black/5 dark:border-white/10 shadow-sm">
                ⌘K
              </kbd>
            </button>

            <div className="flex items-center gap-1 pl-1 border-l border-neutral-200 dark:border-neutral-800">
              <IconLink href={docsConfig.links.github}>
                <Github className="h-5 w-5" />
              </IconLink>
              <ThemeToggle />
              <IconButton className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </IconButton>
            </div>
          </div>
        </nav>


        {/* Mobile Glass Dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="mt-2 p-2 rounded-2xl border border-white/40 dark:border-white/10 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-2xl shadow-xl md:hidden overflow-hidden"
            >
              <nav className="flex flex-col gap-1">
                {docsConfig.mainNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-4 py-3 rounded-xl text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

function IconButton({ children, onClick, className }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-xl text-neutral-500 hover:bg-black/5 dark:hover:bg-white/10 transition-all active:scale-90",
        className
      )}
    >
      {children}
    </button>
  );
}

function IconLink({ children, href }: any) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex h-9 w-9 items-center justify-center rounded-xl text-neutral-500 hover:bg-black/5 dark:hover:bg-white/10 transition-all active:scale-90"
    >
      {children}
    </a>
  );
}