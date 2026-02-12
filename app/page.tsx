"use client";

import { motion } from "framer-motion";
import { ArrowRight, Twitter, Github, Linkedin, Slack } from "lucide-react";
import Link from "next/link";
import { Hero } from "@/components/landing/hero";
import { FeatureBlock } from "@/components/landing/feature-block";
import { StatsSection } from "@/components/landing/stats";
import { CodePreview } from "@/components/landing/code-preview";
import {
  Zap,
  Shield,
  Layers,
  Cpu,
  Globe,
  Lock,
} from "lucide-react";

const features = [
  {
    title: "Lightning Performance",
    description: "Built on a hyper-optimized core that handles 50k+ requests per second with sub-millisecond latency.",
    icon: Zap,
    gradient: "from-amber-400 to-orange-500",
  },
  {
    title: "Type-Safe by Default",
    description: "End-to-end type safety powered by TypeScript and Zod. Catch errors before they hit production.",
    icon: Shield,
    gradient: "from-blue-400 to-indigo-600",
  },
  {
    title: "Modular Middleware",
    description: "Composable middleware system that lets you build complex logic with simple, reusable blocks.",
    icon: Layers,
    gradient: "from-emerald-400 to-teal-600",
  },
  {
    title: "Edge Runtime Ready",
    description: "Deploy anywhere. Fully compatible with Vercel Edge, Cloudflare Workers, and standard Node.js.",
    icon: Globe,
    gradient: "from-purple-400 to-pink-600",
  },
  {
    title: "Built-in Security",
    description: "Automated CSRF protection, secure headers, and rapid rate limiting built into the core.",
    icon: Lock,
    gradient: "from-red-400 to-rose-600",
  },
  {
    title: "Hardware Optimized",
    description: "Low-level optimizations that squeeze every bit of performance out of your CPU cycles.",
    icon: Cpu,
    gradient: "from-gray-400 to-gray-700",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black selection:bg-indigo-100 dark:selection:bg-indigo-900 selection:text-indigo-900 dark:selection:text-indigo-100">
      <Hero />

      <StatsSection />

      <section className="py-32 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-24">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-5xl sm:text-6xl font-medium text-neutral-900 dark:text-white mb-6 tracking-tight"
            >
              Engineered for Excellence
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed"
            >
              SwiftJS brings the simplicity of Express with the power of modern
              engineering primitives and hyper-performance.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, i) => (
              <FeatureBlock key={feature.title} {...feature} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CodePreview />

      {/* Footer CTA */}
      <section className="py-32 px-6 border-t border-neutral-100 dark:border-neutral-900 overflow-hidden relative">
        <div className="absolute inset-0 bg-neutral-900 dark:bg-white -z-20 transform skew-y-6 translate-y-3/4 opacity-[0.03]" />

        <div className="mx-auto max-w-4xl text-center">
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="font-serif text-6xl sm:text-8xl font-medium text-neutral-900 dark:text-white mb-10 tracking-tight leading-none"
          >
            Ready to Build <br />
            the Future?
          </motion.h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/docs/guide/introduction"
              className="group inline-flex h-16 items-center justify-center gap-3 px-10 rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold text-lg transition-all hover:scale-105 active:scale-[0.98]"
            >
              Get Started for Free
              <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-20 px-6 border-t border-neutral-100 dark:border-neutral-900">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">
            <div className="col-span-2 lg:col-span-2">
              <Link href="/" className="inline-flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-neutral-900 dark:bg-white flex items-center justify-center">
                  <span className="text-white dark:text-black font-bold text-lg tracking-tighter italic">S</span>
                </div>
                <span className="text-xl font-bold tracking-tighter text-neutral-900 dark:text-white">SwiftJS</span>
              </Link>
              <p className="text-neutral-500 dark:text-neutral-400 max-w-xs leading-relaxed">
                Building the next generation of high-performance API infrastructure for the modern web.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest text-neutral-900 dark:text-white mb-6">Product</h4>
              <ul className="space-y-4 text-sm text-neutral-500 dark:text-neutral-400">
                <li><Link href="/docs" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="/showcase" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Showcase</Link></li>
                <li><Link href="/pricing" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Pricing</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest text-neutral-900 dark:text-white mb-6">Community</h4>
              <ul className="space-y-4 text-sm text-neutral-500 dark:text-neutral-400">
                <li><Link href="https://github.com" className="hover:text-neutral-900 dark:hover:text-white transition-colors">GitHub</Link></li>
                <li><Link href="https://discord.com" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Discord</Link></li>
                <li><Link href="https://twitter.com" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Twitter</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest text-neutral-900 dark:text-white mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-neutral-500 dark:text-neutral-400">
                <li><Link href="/about" className="hover:text-neutral-900 dark:hover:text-white transition-colors">About</Link></li>
                <li><Link href="/blog" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/privacy" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Privacy</Link></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-10 border-t border-neutral-100 dark:border-neutral-900 text-sm text-neutral-400">
            <p>© {new Date().getFullYear()} SwiftJS Inc. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <button className="hover:text-neutral-900 dark:hover:text-white transition-colors"><Twitter className="w-5 h-5" /></button>
              <button className="hover:text-neutral-900 dark:hover:text-white transition-colors"><Github className="w-5 h-5" /></button>
              <button className="hover:text-neutral-900 dark:hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></button>
              <button className="hover:text-neutral-900 dark:hover:text-white transition-colors"><Slack className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
