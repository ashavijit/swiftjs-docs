import fs from "fs";
import path from "path";
import Link from "next/link";
import { Box, Shield, Zap, Lock, Globe, ChevronRight, Terminal, Cpu, ArrowRight } from "lucide-react";

const ICON_MAP: Record<string, any> = {
    Box: Box,
    Shield: Shield,
    Zap: Zap,
    Lock: Lock,
    Globe: Globe,
    Terminal: Terminal,
    Cpu: Cpu
};

export default async function PluginsPage() {
    const pluginsDir = path.join(process.cwd(), "plugins");
    const files = fs.readdirSync(pluginsDir).filter(file => file.endsWith(".md"));

    const plugins = files.map(file => {
        const content = fs.readFileSync(path.join(pluginsDir, file), "utf8");
        const titleMatch = content.match(/title:\s*"(.+)"/);
        const descriptionMatch = content.match(/description:\s*"(.+)"/);
        const iconMatch = content.match(/icon:\s*"(.+)"/);

        return {
            slug: file.replace(".md", ""),
            title: titleMatch ? titleMatch[1] : file.replace(".md", ""),
            description: descriptionMatch ? descriptionMatch[1] : "",
            icon: iconMatch ? iconMatch[1] : "Box"
        };
    });

    return (
        <main className="min-h-screen bg-white dark:bg-black pt-20 pb-20 px-6">
            <div className="mx-auto max-w-6xl">
                {/* Header Section */}
                <div className="text-center mb-24 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[100px] -z-10" />

                    <h1 className="font-zalando text-4xl sm:text-6xl font-black tracking-tighter text-neutral-900 dark:text-white mb-8 leading-none">
                        Essential Plugins
                    </h1>
                    <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                        Powerful extensions to supercharge your SwiftJS application.
                        Security, storage, and authentication—ready in seconds.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {plugins.map((plugin) => {
                        const Icon = ICON_MAP[plugin.icon] || Box;
                        return (
                            <Link
                                key={plugin.slug}
                                href={`/plugins/${plugin.slug}`}
                                className="group relative p-8 rounded-xl border border-neutral-100 dark:border-white/5 bg-neutral-50/50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 overflow-hidden"
                            >
                                {/* Glow Effect */}
                                <div className="absolute -inset-24 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative">
                                    <div className="w-12 h-12 rounded-xl bg-neutral-900 dark:bg-white flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform">
                                        <Icon className="w-6 h-6 text-white dark:text-black" />
                                    </div>

                                    <h3 className="font-zalando text-xl font-bold text-neutral-900 dark:text-white mb-3 tracking-tight">
                                        {plugin.title}
                                    </h3>

                                    <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-8 line-clamp-2">
                                        {plugin.description}
                                    </p>

                                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                                        Explore Plugin
                                        <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Documentation Banner */}
                <div className="mt-20 p-12 rounded-[2rem] bg-neutral-900 dark:bg-white relative overflow-hidden group text-center md:text-left">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent opacity-50" />

                    <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h2 className="font-zalando text-3xl sm:text-4xl text-white dark:text-black font-black mb-4 tracking-tighter">
                                Want to build your own?
                            </h2>
                            <p className="text-neutral-400 dark:text-neutral-500 text-base max-w-xl">
                                Our plugin system is designed to be extremely extensible.
                                Learn how to create and share your own SwiftJS plugins.
                            </p>
                        </div>
                        <Link
                            href="/docs/core/plugins"
                            className="inline-flex h-14 items-center gap-3 px-8 rounded-2xl bg-white dark:bg-black text-black dark:text-white font-bold transition-all hover:scale-[1.05] active:scale-95 whitespace-nowrap"
                        >
                            Read Plugin Guide
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
