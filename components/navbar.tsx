"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Github,
  Search,
  Command,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { docsConfig } from "@/lib/docs-config";
import { CommandMenu } from "./command-menu";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full group/nav">
      {/* Floating Blur Shell */}
      <div
        className="
          relative
          mx-auto
          max-w-7xl
          px-4 sm:px-6 lg:px-8
          pt-4
        "
      >
        <CommandMenu open={commandOpen} setOpen={setCommandOpen} />

        {/* Navbar Container */}
        <div
          className="
            relative
            flex h-14 items-center justify-between
            rounded-2xl
            border border-white/10 dark:border-white/5
            bg-white/70 dark:bg-neutral-900/70
            backdrop-blur-2xl
            shadow-[0_8px_32px_-4px_rgba(0,0,0,0.1)]
            dark:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.5)]
          "
        >
          {/* Shimmer Top Line */}
          <div
            className="
              absolute inset-x-8 top-0 h-px
              bg-gradient-to-r
              from-transparent via-neutral-300 dark:via-white/30 to-transparent
              opacity-0 group-hover/nav:opacity-100 transition-opacity duration-1000
            "
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white dark:via-white/50 to-transparent animate-shimmer" />
          </div>

          {/* LEFT CONTENT */}
          <div className="flex items-center gap-10 pl-5">

            {/* Logo & Brand */}
            <Link
              href="/"
              className="
                flex items-center gap-3
                group/logo
              "
            >
              <div
                className="
                  relative
                  h-9 w-9
                  rounded-xl
                  border border-black/5 dark:border-white/10
                  bg-white dark:bg-black
                  shadow-sm
                  transition-all duration-300
                  group-hover/logo:scale-110
                  group-hover/logo:shadow-indigo-500/20
                "
              >
                <img
                  src="/image.ico"
                  alt="SwiftJS"
                  className="h-full w-full object-contain p-2"
                />

                {/* Brand Aura */}
                <div className="absolute -inset-1 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-xl blur-lg opacity-0 group-hover/logo:opacity-100 transition-opacity" />
              </div>

              <div className="flex flex-col leading-none">
                <span className="font-serif text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
                  SwiftJS
                </span>
                <span className="text-[9px] font-bold text-neutral-400 dark:text-neutral-600 tracking-widest uppercase mt-0.5">
                  v1.2.0
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-1">
              {docsConfig.mainNav.map((item) => {
                const active =
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/");

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-semibold transition-colors duration-200",
                      active
                        ? "text-neutral-950 dark:text-white"
                        : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200"
                    )}
                  >
                    {active && (
                      <motion.div
                        layoutId="nav-active"
                        className="
                          absolute inset-0
                          rounded-xl
                          bg-neutral-100 dark:bg-white/10
                          -z-10
                        "
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                    {item.title}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex items-center gap-3 pr-4">

            {/* Premium Search Trigger */}
            <button
              onClick={() => setCommandOpen(true)}
              className="
                hidden lg:flex
                items-center gap-4
                px-4 py-2
                rounded-xl
                border border-black/5 dark:border-white/5
                bg-neutral-50/50 dark:bg-white/5
                text-sm text-neutral-500
                hover:bg-white dark:hover:bg-white/10
                hover:text-neutral-900 dark:hover:text-white
                hover:shadow-sm
                transition-all duration-300
                group/search
              "
            >
              <Search className="h-4 w-4 transition-transform group-hover/search:scale-110" />
              <span className="font-medium">Search docs...</span>
              <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded-lg bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 text-[10px] font-bold text-neutral-400 dark:text-neutral-500 shadow-sm">
                <Command className="h-2.5 w-2.5" />
                <span>K</span>
              </div>
            </button>

            {/* Action Icons */}
            <div className="flex items-center gap-1">
              <IconButton
                onClick={() => setCommandOpen(true)}
                className="lg:hidden"
              >
                <Search className="h-5 w-5" />
              </IconButton>

              <IconLink href={docsConfig.links.github}>
                <Github className="h-5 w-5" />
              </IconLink>

              <ThemeToggle />

              <div className="h-4 w-px bg-neutral-200 dark:bg-neutral-800 mx-1 hidden sm:block" />

              <IconButton
                className="md:hidden ml-1"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </IconButton>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Refined */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: "circOut" }}
            className="
              md:hidden
              mt-3 mx-4
              rounded-[1.5rem]
              border border-black/5 dark:border-white/10
              bg-white/90 dark:bg-neutral-900/90
              backdrop-blur-2xl
              shadow-2xl
              overflow-hidden
              p-2
            "
          >
            <nav className="flex flex-col gap-1">
              {docsConfig.mainNav.map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between px-5 py-3.5 rounded-2xl text-[15px] font-semibold transition-all",
                      active
                        ? "bg-neutral-100 dark:bg-white/10 text-neutral-950 dark:text-white shadow-inner"
                        : "text-neutral-500 hover:bg-neutral-50 dark:hover:bg-white/5"
                    )}
                  >
                    {item.title}
                    {active && <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function IconButton({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "p-2 rounded-xl text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-white/10 transition-all duration-200 active:scale-90",
        className
      )}
    >
      {children}
    </button>
  );
}

function IconLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="p-2 rounded-xl text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-white/10 transition-all duration-200 active:scale-90"
    >
      {children}
    </a>
  );
}
