"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Sparkles } from "lucide-react";
import Link from "next/link";

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            delay: i * 0.12,
            ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number]
        },
    }),
};

export function Hero() {
    return (
        <section className="relative pt-28 pb-20 sm:pt-40 sm:pb-28 px-6 overflow-hidden">
            {/* Radial gradient background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15)_0%,transparent_70%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
            </div>

            <div className="mx-auto max-w-4xl text-center">
                {/* Badge */}
                <motion.div
                    custom={0} variants={fadeUp} initial="hidden" animate="visible"
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-white/5 backdrop-blur-sm mb-8 text-xs font-medium tracking-wide text-neutral-500 dark:text-neutral-400 uppercase"
                >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    v0.7.0 — Hyper-Optimized Core
                </motion.div>

                {/* Heading */}
                <motion.h1
                    custom={1} variants={fadeUp} initial="hidden" animate="visible"
                    className="font-serif text-5xl sm:text-7xl lg:text-[5.5rem] font-medium tracking-tight text-neutral-900 dark:text-white leading-[1.05]"
                >
                    API Engine for the{" "}
                    <br className="hidden sm:block" />
                    <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                        Modern Web
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    custom={2} variants={fadeUp} initial="hidden" animate="visible"
                    className="mt-6 text-lg sm:text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed"
                >
                    A performance-first framework for building hyper-scalable APIs
                    with zero compromise on developer experience.
                </motion.p>

                {/* CTA */}
                <motion.div
                    custom={3} variants={fadeUp} initial="hidden" animate="visible"
                    className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link
                        href="/docs/guide/introduction"
                        className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98] shadow-lg shadow-neutral-900/10 dark:shadow-none"
                    >
                        Get Started
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                    <a
                        href="https://github.com/ashavijit/swiftjs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 font-semibold text-sm transition-all hover:bg-neutral-50 dark:hover:bg-white/5"
                    >
                        <Github className="w-4 h-4" />
                        GitHub
                    </a>
                </motion.div>

                {/* Install command */}
                <motion.div
                    custom={4} variants={fadeUp} initial="hidden" animate="visible"
                    className="mt-8 inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 text-sm"
                >
                    <span className="text-neutral-400 font-mono">$</span>
                    <code className="font-mono text-neutral-600 dark:text-neutral-300">
                        npx create-swiftjs@latest my-api
                    </code>
                </motion.div>
            </div>
        </section>
    );
}
