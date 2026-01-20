import Link from "next/link";
import { ArrowRight, Zap, Shield, Box, Layers, Terminal, Globe, Github, ChevronRight, Sparkles } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Ultra Fast",
    description: "53k+ req/sec on Node.js, matching Hono and Fastify performance.",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    icon: Shield,
    title: "Type Safe",
    description: "TypeScript-first with full IDE support and compile-time validation.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Box,
    title: "File Routing",
    description: "Next.js-style automatic route discovery for clean project structure.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Layers,
    title: "Plugin System",
    description: "Fastify-style extensible architecture for modular applications.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Terminal,
    title: "CLI Tools",
    description: "Powerful scaffolding and development tools out of the box.",
    gradient: "from-red-500 to-rose-500",
  },
  {
    icon: Globe,
    title: "Multi-Runtime",
    description: "Run seamlessly on Node.js or Bun with automatic detection.",
    gradient: "from-indigo-500 to-violet-500",
  },
];

const stats = [
  { value: "53k+", label: "Requests/sec" },
  { value: "< 1ms", label: "Response Time" },
  { value: "100%", label: "TypeScript" },
  { value: "0", label: "Dependencies*" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 px-4 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-full blur-3xl" />
        </div>

        <div className="mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 mb-8">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">v0.7.0 — Now with Hybrid Async Router</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-medium tracking-tight text-black dark:text-white leading-[1.1]">
            Build Fast APIs
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              with TypeScript
            </span>
          </h1>
          <p className="mt-8 text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            SwiftJS is a modern, high-performance web framework designed for building scalable APIs with excellent developer experience and zero compromises.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/docs/getting-started"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-black dark:bg-white text-white dark:text-black font-medium hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg shadow-black/20 dark:shadow-white/20"
            >
              Get Started
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-medium hover:border-neutral-400 dark:hover:border-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-all"
            >
              Documentation
            </Link>
            <a
              href="https://github.com/AvirukBasak/swiftjs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-medium hover:border-neutral-400 dark:hover:border-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-all"
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 border-y border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-serif text-3xl sm:text-4xl font-medium text-black dark:text-white">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-neutral-400 dark:text-neutral-500">
            *Core router has minimal dependencies, full framework includes essential utilities
          </p>
        </div>
      </section>

      {/* Code Preview */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-black dark:text-white mb-4">
              Simple yet powerful
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
              Get up and running in seconds with an intuitive API that feels like home.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-[#0d1117] overflow-hidden shadow-2xl shadow-black/10 dark:shadow-black/50">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-800 bg-[#161b22]">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <span className="ml-3 text-xs text-neutral-500 font-mono">app.ts</span>
            </div>
            <pre className="p-6 text-sm font-mono overflow-x-auto">
              <code className="text-neutral-300 leading-relaxed">
                <span className="text-[#ff7b72]">import</span>{" "}
                <span className="text-[#c9d1d9]">{"{ createApp }"}</span>{" "}
                <span className="text-[#ff7b72]">from</span>{" "}
                <span className="text-[#a5d6ff]">&apos;swiftjs-core&apos;</span>;{"\n"}
                <span className="text-[#ff7b72]">import</span>{" "}
                <span className="text-[#c9d1d9]">{"{ z }"}</span>{" "}
                <span className="text-[#ff7b72]">from</span>{" "}
                <span className="text-[#a5d6ff]">&apos;zod&apos;</span>;{"\n\n"}
                <span className="text-[#ff7b72]">const</span>{" "}
                <span className="text-[#c9d1d9]">app</span>{" "}
                <span className="text-[#ff7b72]">=</span>{" "}
                <span className="text-[#d2a8ff]">createApp</span>
                <span className="text-[#c9d1d9]">{"({ "}</span>
                <span className="text-[#c9d1d9]">port</span>
                <span className="text-[#c9d1d9]">: </span>
                <span className="text-[#79c0ff]">3000</span>
                <span className="text-[#c9d1d9]">{" });"}</span>{"\n\n"}
                <span className="text-[#8b949e]">{"// Type-safe route with validation"}</span>{"\n"}
                <span className="text-[#c9d1d9]">app.</span>
                <span className="text-[#d2a8ff]">post</span>
                <span className="text-[#c9d1d9]">(</span>
                <span className="text-[#a5d6ff]">&apos;/users&apos;</span>
                <span className="text-[#c9d1d9]">, {"{"}</span>{"\n"}
                <span className="text-[#c9d1d9]">{"  body: z.object({"}</span>{"\n"}
                <span className="text-[#c9d1d9]">{"    name: z.string(),"}</span>{"\n"}
                <span className="text-[#c9d1d9]">{"    email: z.string().email()"}</span>{"\n"}
                <span className="text-[#c9d1d9]">{"  }),"}</span>{"\n"}
                <span className="text-[#c9d1d9]">{"  handler: (ctx) => {"}</span>{"\n"}
                <span className="text-[#c9d1d9]">{"    return { user: ctx.body };"}</span>{"\n"}
                <span className="text-[#c9d1d9]">{"  }"}</span>{"\n"}
                <span className="text-[#c9d1d9]">{"});"}</span>{"\n\n"}
                <span className="text-[#c9d1d9]">app.</span>
                <span className="text-[#d2a8ff]">listen</span>
                <span className="text-[#c9d1d9]">();</span>
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 border-t border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-black dark:text-white mb-4">
              Everything you need
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
              A complete toolkit for building production-ready APIs, with batteries included.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group relative p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:border-transparent transition-all duration-300 bg-white dark:bg-neutral-900 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-neutral-950"
              >
                {/* Gradient border on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm`} />
                <div className="absolute inset-[1px] rounded-2xl bg-white dark:bg-neutral-900 -z-10" />

                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-medium text-lg mb-2 text-black dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 border-t border-neutral-200 dark:border-neutral-800 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-4xl sm:text-5xl font-medium mb-6 text-black dark:text-white">
            Ready to build?
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-10 max-w-xl mx-auto">
            Start building your next API in under a minute. No complex setup, no boilerplate.
          </p>

          <div className="inline-flex flex-col sm:flex-row items-center gap-3 p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
            <code className="font-mono text-sm sm:text-base text-black dark:text-white flex items-center gap-2">
              <span className="text-neutral-400">$</span>
              npm create swiftjs-app@latest my-api
            </code>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/docs/getting-started"
              className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
            >
              Read the docs
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <span className="hidden sm:block text-neutral-300 dark:text-neutral-700">•</span>
            <Link
              href="/docs/examples"
              className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
            >
              View examples
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black dark:bg-white">
                <span className="text-sm font-bold text-white dark:text-black">S</span>
              </div>
              <div>
                <span className="font-serif text-lg font-medium text-black dark:text-white">SwiftJS</span>
                <p className="text-xs text-neutral-500">The fast TypeScript framework</p>
              </div>
            </div>

            <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <Link href="/docs" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
                Documentation
              </Link>
              <Link href="/docs/api" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
                API Reference
              </Link>
              <Link href="/docs/examples" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
                Examples
              </Link>
              <a
                href="https://github.com/AvirukBasak/swiftjs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors inline-flex items-center gap-1"
              >
                GitHub
              </a>
            </nav>
          </div>

          <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800 text-center text-xs text-neutral-500">
            <p>© {new Date().getFullYear()} SwiftJS. Released under the MIT License.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
