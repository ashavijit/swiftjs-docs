"use client";

import { motion } from "framer-motion";
import {
  ChevronRight,
  Zap,
  Shield,
  Box,
  Layers,
  Terminal,
  Globe,
  Github,
} from "lucide-react";
import Link from "next/link";
import { Hero } from "@/components/landing/hero";
import { FeatureBlock } from "@/components/landing/feature-block";
import { StatsSection } from "@/components/landing/stats";
import { CodePreview } from "@/components/landing/code-preview";

const features = [
  {
    icon: Zap,
    title: "Ultra Fast",
    description:
      "Processes 53k+ req/sec on standard hardware with sub-millisecond latency. Built on raw performance.",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    icon: Shield,
    title: "Strictly Typed",
    description:
      "End-to-end type safety with Zod-powered schema validation. Infer types directly from your schemas.",
    gradient: "from-sky-400 to-indigo-500",
  },
  {
    icon: Box,
    title: "File Routing",
    description:
      "Automatic route discovery from your file system. Clean project structure, zero configuration.",
    gradient: "from-fuchsia-400 to-purple-600",
  },
  {
    icon: Layers,
    title: "Plugin System",
    description:
      "Extend your API with a lightweight, composable plugin architecture. Modular by design.",
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    icon: Terminal,
    title: "Developer CLI",
    description:
      "Scaffold entire APIs in seconds. Generate routes, models, and controllers with one command.",
    gradient: "from-rose-400 to-red-600",
  },
  {
    icon: Globe,
    title: "Any Runtime",
    description:
      "Deploy on Node.js or Bun without changing a line. Automatic runtime detection built in.",
    gradient: "from-violet-400 to-fuchsia-600",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col bg-white dark:bg-black">
      <Hero />

      <StatsSection />

      <CodePreview />

      {/* Features */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl sm:text-5xl font-medium text-neutral-900 dark:text-white tracking-tight mb-4">
              Everything you need
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto">
              Six pillars of a modern API framework, each built for
              performance, safety, and developer experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, i) => (
              <FeatureBlock
                key={feature.title}
                {...feature}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-neutral-950">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.12),transparent_70%)]" />
        </div>

        <div className="mx-auto max-w-3xl text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl sm:text-6xl font-medium text-white tracking-tight mb-5"
          >
            Ready to build{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              the future?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-neutral-400 text-lg mb-10 max-w-md mx-auto"
          >
            Ship your next API in minutes. Zero boilerplate, zero
            config, zero compromise.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/docs/guide/introduction"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-neutral-900 font-semibold text-sm hover:opacity-90 transition-all active:scale-[0.98] shadow-lg"
            >
              Get Started
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <div className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-mono text-indigo-300">
              <span className="text-neutral-500 mr-2">$</span>
              npx create-swiftjs@latest
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-neutral-200/60 dark:border-neutral-800/60 bg-white dark:bg-black">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden">
                  <img src="/image.ico" alt="SwiftJS" className="h-full w-full object-contain p-1" />
                </div>
                <span className="font-serif text-lg font-medium text-neutral-900 dark:text-white tracking-tight">SwiftJS</span>
              </Link>
              <p className="text-xs text-neutral-500 leading-relaxed mb-4">
                High-performance TypeScript API engine for the modern cloud.
              </p>
              <a href="https://github.com/AvirukBasak/swiftjs" className="inline-flex p-1.5 rounded-md border border-neutral-200 dark:border-neutral-800 text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition-colors">
                <Github className="w-4 h-4" />
              </a>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-900 dark:text-white mb-4">Product</h4>
              <ul className="space-y-2.5 text-sm text-neutral-500">
                <li><Link href="/docs/guide/introduction" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Docs</Link></li>
                <li><Link href="/docs/api/index" className="hover:text-neutral-900 dark:hover:text-white transition-colors">API</Link></li>
                <li><Link href="/docs/guide/examples" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Examples</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-900 dark:text-white mb-4">Compare</h4>
              <ul className="space-y-2.5 text-sm text-neutral-500">
                <li><a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">vs Express</a></li>
                <li><a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">vs Fastify</a></li>
                <li><a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">vs Hono</a></li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-900 dark:text-white mb-4">Newsletter</h4>
              <p className="text-xs text-neutral-500 mb-3">Get notified about new releases.</p>
              <div className="flex gap-1.5">
                <input type="email" placeholder="Email" className="flex-1 min-w-0 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 transition" />
                <button className="bg-neutral-900 dark:bg-white text-white dark:text-black px-3 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition shrink-0">Go</button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-neutral-200/60 dark:border-neutral-800/60 text-xs text-neutral-400">
            <span>© {new Date().getFullYear()} SwiftJS · MIT License</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-neutral-700 dark:hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-neutral-700 dark:hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
