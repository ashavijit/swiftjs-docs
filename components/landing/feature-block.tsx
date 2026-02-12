"use client";

import { motion } from "framer-motion";
import { LucideIcon, ArrowUpRight } from "lucide-react";

interface FeatureBlockProps {
    title: string;
    description: string;
    icon: LucideIcon;
    gradient: string;
    index: number;
}

export function FeatureBlock({ title, description, icon: Icon, gradient, index }: FeatureBlockProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: index * 0.06, ease: [0.25, 0.4, 0.25, 1] }}
            className="group relative rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-neutral-950 p-8 transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-lg hover:shadow-neutral-200/50 dark:hover:shadow-black/30"
        >
            {/* Hover gradient overlay */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-[0.03] dark:group-hover:opacity-[0.06] transition-opacity duration-500 pointer-events-none`} />

            {/* Animated background pattern — unique per card */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                {/* Grid dots pattern */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id={`dots-${index}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                <circle cx="1" cy="1" r="0.8" className="fill-neutral-300 dark:fill-neutral-700" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill={`url(#dots-${index})`} />
                    </svg>
                    <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white dark:from-neutral-950 dark:via-transparent dark:to-neutral-950" />
                </div>

                {/* Moving gradient line */}
                <motion.div
                    initial={{ x: "-100%", opacity: 0 }}
                    whileInView={{ x: "200%", opacity: [0, 1, 0] }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: 0.5 + index * 0.15, ease: "easeInOut" }}
                    className="absolute top-0 left-0 w-1/3 h-[1px]"
                >
                    <div className={`w-full h-full bg-gradient-to-r from-transparent ${gradient.replace('from-', 'via-').split(' ')[0]} to-transparent opacity-60`} />
                </motion.div>
            </div>

            {/* Content */}
            <div className="relative z-10">
                {/* Icon */}
                <div className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${gradient} mb-5 shadow-sm`}>
                    <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl font-medium text-neutral-900 dark:text-white mb-2 tracking-tight flex items-center gap-2">
                    {title}
                    <ArrowUpRight className="w-4 h-4 text-neutral-300 dark:text-neutral-700 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </h3>

                {/* Description */}
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {description}
                </p>
            </div>
        </motion.div>
    );
}
