"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
    { value: 53, suffix: "k+", label: "Requests/sec" },
    { value: 1, suffix: "ms", label: "Avg Latency", prefix: "<" },
    { value: 100, suffix: "%", label: "TypeScript" },
    { value: 0, suffix: "", label: "Dependencies" },
];

function Counter({ value, suffix, prefix }: { value: number; suffix: string; prefix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const end = value;
        if (end === 0) { setCount(0); return; }
        const step = Math.max(1, Math.floor(end / 40));
        const timer = setInterval(() => {
            start += step;
            if (start >= end) { setCount(end); clearInterval(timer); }
            else setCount(start);
        }, 30);
        return () => clearInterval(timer);
    }, [inView, value]);

    return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

export function StatsSection() {
    return (
        <section className="relative py-20 px-6 border-y border-neutral-200/60 dark:border-neutral-800/60">
            <div className="mx-auto max-w-5xl">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08, duration: 0.5 }}
                            className="text-center"
                        >
                            <div className="font-serif text-4xl sm:text-5xl font-medium text-neutral-900 dark:text-white tracking-tight mb-1.5">
                                <Counter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                            </div>
                            <div className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-400 dark:text-neutral-500">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
