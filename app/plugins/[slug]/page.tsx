import fs from "fs";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import { CustomComponents } from "@/components/mdx";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Box, Shield, Zap, Lock, Globe, Terminal, Cpu } from "lucide-react";
import Link from "next/link";

const ICON_MAP: Record<string, any> = {
    Box: Box,
    Shield: Shield,
    Zap: Zap,
    Lock: Lock,
    Globe: Globe,
    Terminal: Terminal,
    Cpu: Cpu
};

export async function generateStaticParams() {
    const pluginsDir = path.join(process.cwd(), "plugins");
    if (!fs.existsSync(pluginsDir)) return [];

    const files = fs.readdirSync(pluginsDir);
    return files
        .filter(file => file.endsWith(".md"))
        .map(file => ({
            slug: file.replace(".md", ""),
        }));
}

export default async function PluginPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const filePath = path.join(process.cwd(), "plugins", `${slug}.md`);

    if (!fs.existsSync(filePath)) {
        notFound();
    }

    const fileContent = fs.readFileSync(filePath, "utf8");

    // Extract frontmatter manually for simplicity since we're using raw MDXRemote
    const titleMatch = fileContent.match(/title:\s*"(.+)"/);
    const descriptionMatch = fileContent.match(/description:\s*"(.+)"/);
    const iconMatch = fileContent.match(/icon:\s*"(.+)"/);

    const title = titleMatch ? titleMatch[1] : slug;
    const description = descriptionMatch ? descriptionMatch[1] : "";
    const iconName = iconMatch ? iconMatch[1] : "Box";
    const Icon = ICON_MAP[iconName] || Box;

    // Remove frontmatter for rendering
    const content = fileContent.replace(/---[\s\S]*?---/, "").trim();

    return (
        <div className="min-h-screen bg-white dark:bg-black pt-16 pb-20 px-6">
            <div className="mx-auto max-w-4xl">
                {/* Navigation Back */}
                <Link
                    href="/plugins"
                    className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white mb-10 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Back to Plugins
                </Link>

                {/* Hero Header */}
                <div className="mb-12 relative">
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10" />

                    <div className="flex items-start gap-8 flex-col sm:flex-row">
                        <div className="w-16 h-16 rounded-2xl bg-neutral-900 dark:bg-white flex items-center justify-center shrink-0 shadow-2xl">
                            <Icon className="w-8 h-8 text-white dark:text-black" />
                        </div>
                        <div>
                            <h1 className="font-zalando text-4xl sm:text-5xl font-black tracking-tight text-neutral-900 dark:text-white mb-4">
                                {title}
                            </h1>
                            <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed">
                                {description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* MDX Content */}
                <div className="prose prose-neutral dark:prose-invert max-w-none 
                    prose-h2:font-zalando prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-5 prose-h2:tracking-tighter prose-h2:font-black
                    prose-h3:text-base prose-h3:font-black prose-h3:uppercase prose-h3:tracking-widest prose-h3:text-indigo-500
                    prose-pre:rounded-2xl prose-pre:border prose-pre:border-white/10 prose-pre:bg-[#0a0a0a]
                    prose-table:border-collapse prose-th:bg-neutral-50 dark:prose-th:bg-white/5 prose-th:px-4 prose-th:py-3 prose-th:text-xs prose-th:font-black prose-th:uppercase prose-th:tracking-widest
                    prose-td:px-4 prose-td:py-3 prose-td:border-b prose-td:border-neutral-100 dark:prose-td:border-white/5 prose-td:text-sm
                ">
                    <MDXRemote
                        source={content}
                        components={{
                            ...CustomComponents,
                            h1: (props) => <h1 className="font-zalando text-3xl font-black tracking-tighter mb-5" {...props} />,
                            h2: (props) => <h2 className="font-zalando text-2xl font-black tracking-tighter mt-10 mb-5 border-b border-neutral-100 dark:border-white/5 pb-2" {...props} />,
                            h3: (props) => <h3 className="font-zalando text-lg font-bold tracking-tight mt-6 mb-3" {...props} />,
                        }}
                        options={{
                            mdxOptions: {
                                remarkPlugins: [remarkGfm],
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
