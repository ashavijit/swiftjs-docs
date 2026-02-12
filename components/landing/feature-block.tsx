"use client";

import { motion } from "framer-motion";
import { LucideIcon, ArrowRight } from "lucide-react";

interface FeatureBlockProps {
    title: string;
    description: string;
    icon: LucideIcon;
    gradient: string;
    index: number;
}

export function FeatureBlock({ title, description, icon: Icon, gradient, index }: FeatureBlockProps) {
    const isFirst = index === 0;
    const isLarge = index === 0 || index === 3;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.21, 0.45, 0.32, 0.9]
            }}
            className="group relative flex flex-col p-8 sm:p-10 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 transition-all duration-500 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 hover:scale-[1.01]"
        >
            {/* Top Indicator */}
            <div className={`w-12 h-1 rounded-full bg-gradient-to-r ${gradient} mb-10 opacity-60 group-hover:opacity-100 transition-opacity`} />

            <div className="flex-1">
                {/* Icon Circle */}
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-black border border-neutral-200 dark:border-neutral-700 flex items-center justify-center mb-8 shadow-sm group-hover:rotate-6 transition-transform">
                    <Icon className="w-6 h-6 text-neutral-900 dark:text-white" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <h3 className="font-serif text-3xl font-medium text-neutral-900 dark:text-white mb-4 tracking-tight leading-none">
                    {title}
                </h3>
                <p className="text-base text-neutral-500 dark:text-neutral-400 leading-relaxed mb-6 max-w-sm">
                    {description}
                </p>
            </div>

            {/* Bottom Graphic / Interactive Element */}
            <div className="relative mt-8 h-32 w-full rounded-2xl bg-neutral-200/50 dark:bg-neutral-800/50 overflow-hidden border border-neutral-100 dark:border-neutral-700/50">
                {/* Simulated abstract UI / pattern */}
                <div className="absolute inset-0 p-4 flex flex-col gap-2">
                    <div className="h-2 w-1/2 bg-white/40 dark:bg-neutral-700/40 rounded-full animate-pulse" />
                    <div className="h-2 w-3/4 bg-white/40 dark:bg-neutral-700/40 rounded-full" />
                    <div className="h-2 w-2/3 bg-white/40 dark:bg-neutral-700/40 rounded-full" />
                </div>

                {/* Decorative Gradient Orb */}
                <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${gradient} rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity`} />
            </div>

            {/* Hover Arrow */}
            <div className="absolute top-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="p-3 rounded-full bg-white dark:bg-black border border-neutral-200 dark:border-neutral-700 shadow-sm">
                    <ArrowRight className="w-5 h-5 text-neutral-900 dark:text-white" />
                </div>
            </div>
        </motion.div>
    );
}
