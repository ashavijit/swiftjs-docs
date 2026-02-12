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
        <header className="sticky top-0 z-50 w-full border-b border-neutral-200/50 dark:border-neutral-800/50 bg-white/70 dark:bg-black/70 backdrop-blur-md supports-[backdrop-filter]:bg-white/40">
            <CommandMenu open={commandMenuOpen} setOpen={setCommandMenuOpen} />
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Left: Logo */}
                <div className="flex items-center gap-10">
                    <Link href="/" className="flex items-center gap-2.5 group transition-opacity hover:opacity-90">
                        <div className="relative h-9 w-9 overflow-hidden rounded-xl border border-neutral-200/50 dark:border-neutral-800/50 bg-white dark:bg-neutral-900 shadow-sm transition-transform group-hover:scale-105">
                            <img
                                src="/image.ico"
                                alt="SwiftJS Logo"
                                className="h-full w-full object-contain p-1.5"
                            />
                        </div>
                        <span className="hidden font-serif text-xl font-medium tracking-tight sm:block text-neutral-900 dark:text-neutral-100">
                            SwiftJS
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1.5">
                        {docsConfig.mainNav.map((item) => {
                            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "relative px-4 py-2 text-sm font-medium transition-all duration-200",
                                        isActive
                                            ? "text-neutral-900 dark:text-neutral-100"
                                            : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
                                    )}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-pill"
                                            className="absolute inset-x-0 bottom-0 h-0.5 bg-neutral-900 dark:bg-neutral-100"
                                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                        />
                                    )}
                                    {item.title}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-4">
                    {/* Search Trigger */}
                    <button
                        onClick={() => setCommandMenuOpen(true)}
                        className="hidden lg:flex items-center gap-3 px-4 py-2 text-sm text-neutral-500 border border-neutral-200/60 dark:border-neutral-800/60 rounded-xl bg-neutral-50/50 dark:bg-neutral-900/40 hover:bg-neutral-100/80 dark:hover:bg-neutral-900/60 transition-all group shadow-sm"
                    >
                        <Search className="h-4 w-4 transition-colors group-hover:text-neutral-900 dark:group-hover:text-neutral-100" />
                        <span className="group-hover:text-neutral-900 dark:group-hover:text-neutral-100">Search guides...</span>
                        <kbd className="flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-md shadow-sm opacity-60">
                            <Command className="h-2.5 w-2.5" /> K
                        </kbd>
                    </button>

                    <div className="flex items-center gap-1.5">
                        <a
                            href={docsConfig.links.github}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900"
                        >
                            <Github className="h-5 w-5" />
                        </a>
                        <ThemeToggle />

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900"
                        >
                            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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