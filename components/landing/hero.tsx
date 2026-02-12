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
            duration: 0.8,
            delay: i * 0.15,
            ease: [0.21, 0.45, 0.32, 0.9] as [number, number, number, number]
        },
    }),
};

export function Hero() {
    return (
        <section className="relative pt-32 pb-12 sm:pt-48 sm:pb-20 px-6 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.1)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.2)_0%,transparent_70%)]" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-800 to-transparent" />
            </div>

            <div className="mx-auto max-w-5xl text-center">
                {/* Badge */}
                <motion.div
                    custom={0} variants={fadeUp} initial="hidden" animate="visible"
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 mb-10"
                >
                    <div className="flex -space-x-1">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-5 h-5 rounded-full border-2 border-white dark:border-black bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center overflow-hidden">
                                <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                    <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                        Join 2,000+ developers building with SwiftJS
                    </span>
                    <ChevronRightSmall />
                </motion.div>

                {/* Heading */}
                <motion.h1
                    custom={1} variants={fadeUp} initial="hidden" animate="visible"
                    className="font-serif text-6xl sm:text-8xl lg:text-[7rem] font-medium tracking-tight text-neutral-900 dark:text-white leading-[0.95] mb-8"
                >
                    Build API Engines <br className="hidden sm:block" />
                    <span className="bg-gradient-to-b from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-500 bg-clip-text text-transparent">
                        at the speed of light
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    custom={2} variants={fadeUp} initial="hidden" animate="visible"
                    className="mt-6 text-xl sm:text-2xl text-neutral-500 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed"
                >
                    A hyper-optimized framework for building high-performance,
                    type-safe APIs without the boilerplate.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    custom={3} variants={fadeUp} initial="hidden" animate="visible"
                    className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link
                        href="/docs/guide/introduction"
                        className="group relative inline-flex h-14 items-center justify-center gap-2 px-8 rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold text-base transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Start Building for Free
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        <div className="absolute inset-0 rounded-2xl bg-neutral-900 dark:bg-white blur-md -z-10 opacity-20" />
                    </Link>
                    <a
                        href="https://github.com/ashavijit/swiftjs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-14 items-center justify-center gap-3 px-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-transparent text-neutral-900 dark:text-white font-bold text-base transition-all hover:bg-neutral-50 dark:hover:bg-neutral-800"
                    >
                        <Github className="w-5 h-5" />
                        Explore on GitHub
                    </a>
                </motion.div>

                {/* Social Proof Bar */}
                <motion.div
                    custom={4} variants={fadeUp} initial="hidden" animate="visible"
                    className="mt-24 pt-10 border-t border-neutral-100 dark:border-neutral-900"
                >
                    <p className="text-sm font-medium text-neutral-400 dark:text-neutral-500 mb-8 uppercase tracking-[0.2em]">
                        Empowering Modern Engineering Teams
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-40 grayscale group hover:grayscale-0 transition-all duration-500">
                        {['Vercel', 'Linear', 'Discord', 'Supabase', 'GitHub'].map((brand) => (
                            <span key={brand} className="text-2xl font-serif font-bold text-neutral-800 dark:text-neutral-200 tracking-tighter">
                                {brand}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function ChevronRightSmall() {
    return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-neutral-400">
            <path d="M4.5 9L7.5 6L4.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
