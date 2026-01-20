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
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [commandMenuOpen, setCommandMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-neutral-200/60 dark:border-neutral-800/60 bg-white/70 dark:bg-black/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/50">
            <CommandMenu open={commandMenuOpen} setOpen={setCommandMenuOpen} />
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Left: Logo */}
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black dark:bg-white transition-transform group-hover:scale-105">
                            <span className="text-lg font-bold text-white dark:text-black">S</span>
                        </div>
                        <span className="hidden font-serif text-xl font-semibold tracking-tight sm:block">
                            SwiftJS
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        {docsConfig.mainNav.map((item) => {
                            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "relative px-4 py-2 text-sm font-medium transition-colors",
                                        isActive ? "text-black dark:text-white" : "text-neutral-500 hover:text-black dark:hover:text-white"
                                    )}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-pill"
                                            className="absolute inset-0 rounded-lg bg-neutral-100 dark:bg-neutral-800 -z-10"
                                            transition={{ type: "spring", duration: 0.5 }}
                                        />
                                    )}
                                    {item.title}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3">
                    {/* Search Trigger (UI Only) */}
                    <button
                        onClick={() => setCommandMenuOpen(true)}
                        className="hidden lg:flex items-center gap-2 px-3 py-1.5 text-sm text-neutral-500 border border-neutral-200 dark:border-neutral-800 rounded-md bg-neutral-50/50 dark:bg-neutral-900/50 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all"
                    >
                        <Search className="h-4 w-4" />
                        <span>Search...</span>
                        <kbd className="flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium bg-white dark:bg-black border border-neutral-200 dark:border-neutral-700 rounded shadow-sm">
                            <Command className="h-2.5 w-2.5" /> K
                        </kbd>
                    </button>

                    <div className="flex items-center gap-1 border-l border-neutral-200 dark:border-neutral-800 ml-2 pl-3">
                        <a
                            href={docsConfig.links.github}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
                        >
                            <Github className="h-5 w-5" />
                        </a>
                        <ThemeToggle />

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 text-neutral-500 hover:text-black dark:hover:text-white"
                        >
                            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu (Animated) */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden overflow-hidden border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black"
                    >
                        <nav className="flex flex-col p-4 gap-2">
                            {docsConfig.mainNav.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "px-4 py-3 rounded-xl text-base font-medium transition-colors",
                                        pathname.startsWith(item.href)
                                            ? "bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white"
                                            : "text-neutral-500"
                                    )}
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}