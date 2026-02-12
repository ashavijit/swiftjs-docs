"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
    { value: 53, suffix: "k+", label: "Requests/sec" },
    { value: 1, suffix: "ms", label: "Avg Latency", prefix: "<" },
    { value: 100, suffix: "%", label: "TypeScript" },
    { value: 99.9, suffix: "%", label: "Uptime" },
];

function Counter({ value, suffix, prefix }: { value: number; suffix: string; prefix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const end = value;
        const duration = 2000;
        const frameRate = 1000 / 60;
        const totalFrames = Math.round(duration / frameRate);
        let frame = 0;

        const timer = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const currentCount = progress * end;

            if (frame >= totalFrames) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Number(currentCount.toFixed(end % 1 !== 0 ? 1 : 0)));
            }
        }, frameRate);

        return () => clearInterval(timer);
    }, [inView, value]);

    return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

export function StatsSection() {
    return (
        <section className="relative py-24 px-6">
            <div className="mx-auto max-w-6xl">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            className="flex flex-col items-center text-center"
                        >
                            <div className="w-16 h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-800 to-transparent mb-8" />
                            <div className="font-serif text-5xl sm:text-7xl font-medium text-neutral-900 dark:text-white tracking-tighter mb-4">
                                <Counter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                            </div>
                            <div className="text-sm font-bold uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
