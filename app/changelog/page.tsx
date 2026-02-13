import fs from "fs";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import { CustomComponents } from "@/components/mdx";
import remarkGfm from "remark-gfm";

// We'll use MDRemote but with a slightly modified set of components for the timeline effect
export const metadata = {
    title: "Changelog - SwiftJS",
    description: "All notable changes to SwiftJS framework.",
};

export default async function ChangelogPage() {
    const filePath = path.join(process.cwd(), "changelog", "index.md");
    const fileContent = fs.readFileSync(filePath, "utf8");

    const contentWithoutTitle = fileContent.replace(/^#\s+.*/, "").trim();

    const headings = contentWithoutTitle.match(/^##\s+.+$/gm)?.map((heading) => {
        const title = heading.replace(/^##\s+/, "").replace(/[\[\]]/g, "");
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        return { title, slug };
    }) || [];

    const ChangelogComponents = {
        ...CustomComponents,
        h2: (props: any) => {
            const text = props.children?.toString() || "";
            const cleanText = text.replace(/[\[\]]/g, "");
            const id = cleanText.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

            return (
                <div className="relative group/version py-8 first:pt-2">
                    {/* Timeline Marker Refined */}
                    <div className="absolute left-[-33px] top-[42px] w-5 h-5 rounded-full border-[5px] border-white dark:border-black bg-indigo-500 z-10 shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all duration-300 group-hover/version:scale-125 group-hover/version:bg-indigo-400" />

                    <div className="flex flex-col gap-2">
                        <h2 id={id} className="font-zalando text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white scroll-mt-32 transition-colors group-hover/version:text-indigo-500" {...props} />
                        <div className="h-0.5 w-16 bg-gradient-to-r from-indigo-500 to-transparent mb-6" />
                    </div>
                </div>
            );
        },
        h3: (props: any) => {
            const text = props.children?.toString() || "";
            let className = "inline-flex items-center rounded-xl px-3 py-1 text-[10px] font-black uppercase tracking-[0.15em] mt-6 mb-3 shadow-sm ";

            const category = text.split('-')[0].trim().toLowerCase();

            switch (category) {
                case "added":
                    className += "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-500/20";
                    break;
                case "fixed":
                    className += "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-500/20";
                    break;
                case "changed":
                    className += "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border border-amber-200/50 dark:border-amber-500/20";
                    break;
                case "performance":
                    className += "bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400 border border-purple-200/50 dark:border-purple-500/20";
                    break;
                case "security":
                    className += "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400 border border-rose-200/50 dark:border-rose-500/20";
                    break;
                default:
                    return <h3 className="font-zalando text-xl font-bold mt-10 mb-4 tracking-tight text-neutral-900 dark:text-white" {...props} />;
            }

            return (
                <div className="flex items-center gap-4 mt-6 mb-3 group/cat">
                    <span className={className}>{category}</span>
                    {text.includes('-') && (
                        <span className="text-lg font-bold text-neutral-400 dark:text-neutral-600 transition-colors group-hover/cat:text-neutral-900 dark:group-hover/cat:text-white">
                            {text.split('-').slice(1).join('-').trim()}
                        </span>
                    )}
                </div>
            );
        },
    };

    return (
        <div className="relative min-h-screen bg-white dark:bg-black selection:bg-indigo-100 dark:selection:bg-indigo-900/40">
            {/* Aurora Background Effects */}
            <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.12)_0%,transparent_70%)] blur-[100px] translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.05)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.08)_0%,transparent_70%)] blur-[120px] -translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-12 py-12 lg:py-20 overflow-hidden">
                <div className="flex flex-col lg:flex-row gap-20">
                    {/* Main Content */}
                    <div className="flex-1 min-w-0 max-w-3xl">
                        <header className="mb-16">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200/60 dark:border-white/10 bg-neutral-50/50 dark:bg-white/5 backdrop-blur-md mb-8 shadow-sm">
                                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">Release Stream</span>
                            </div>
                            <h1 className="font-zalando text-6xl sm:text-7xl font-black tracking-tighter text-neutral-900 dark:text-white mb-6 leading-[0.95]">
                                Changelog
                            </h1>
                            <p className="text-lg sm:text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed">
                                Curating the evolution of SwiftJS. Every feature, <br className="hidden sm:block" />
                                every fix, every major milestone.
                            </p>
                        </header>

                        <div className="relative ml-8">
                            {/* Premium Timeline Bar */}
                            <div className="absolute left-[-26px] top-6 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500/50 via-neutral-200 dark:via-neutral-800 to-transparent" />

                            <div className="prose prose-neutral dark:prose-invert max-w-none 
                                prose-h2:mt-0 prose-h2:mb-0
                                prose-p:text-neutral-600 dark:prose-p:text-neutral-400 prose-p:leading-relaxed prose-p:text-base
                                prose-li:text-neutral-600 dark:prose-li:text-neutral-400 prose-li:text-base
                                prose-code:text-indigo-600 dark:prose-code:text-indigo-400 prose-code:bg-indigo-500/5 dark:prose-code:bg-indigo-500/10 prose-code:px-2 prose-code:py-0.5 prose-code:rounded-lg prose-code:font-mono prose-code:before:content-[''] prose-code:after:content-[''] border-none">
                                <MDXRemote
                                    source={contentWithoutTitle}
                                    // @ts-ignore
                                    components={ChangelogComponents}
                                    options={{
                                        mdxOptions: {
                                            remarkPlugins: [remarkGfm],
                                        },
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar TOC - Tabular Version History */}
                    <div className="hidden lg:block w-72 shrink-0">
                        <div className="sticky top-28">
                            <h4 className="font-zalando text-lg font-bold text-neutral-900 dark:text-white mb-6 tracking-tight flex items-center gap-2">
                                <div className="w-1.5 h-4 bg-indigo-500 rounded-full" />
                                Version History
                            </h4>

                            <div className="rounded-xl border border-neutral-100 dark:border-white/10 bg-neutral-50/50 dark:bg-white/5 overflow-hidden">
                                <div className="grid grid-cols-[1fr_auto] border-b border-neutral-100 dark:border-white/10 px-4 py-2.5 bg-neutral-100/50 dark:bg-white/5">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">Release</span>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">Date</span>
                                </div>
                                <nav className="custom-scrollbar">
                                    {headings.map((heading) => {
                                        const parts = heading.title.split(' - ');
                                        return (
                                            <a
                                                key={heading.slug}
                                                href={`#${heading.slug}`}
                                                className="grid grid-cols-[1fr_auto] items-center px-4 py-3 border-b border-neutral-100/50 dark:border-white/5 last:border-0 hover:bg-white dark:hover:bg-white/10 transition-colors group/row"
                                            >
                                                <span className="font-zalando text-[13px] font-bold text-neutral-600 dark:text-neutral-400 group-hover/row:text-indigo-500 dark:group-hover/row:text-indigo-400 transition-colors">
                                                    {parts[0]}
                                                </span>
                                                <span className="font-mono text-[11px] text-neutral-400 group-hover/row:text-neutral-900 dark:group-hover/row:text-neutral-200 transition-colors">
                                                    {parts[1] || '---'}
                                                </span>
                                            </a>
                                        );
                                    })}
                                </nav>
                            </div>

                            <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/10 backdrop-blur-sm relative group/subs overflow-hidden text-center">
                                <h5 className="text-[13px] font-black uppercase tracking-widest text-neutral-900 dark:text-white mb-2 relative">Stay Synced</h5>
                                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mb-4 relative leading-relaxed text-balance">Early access to release notes.</p>
                                <button className="relative w-full py-2.5 px-4 bg-neutral-900 dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-widest rounded-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg hover:shadow-indigo-500/20">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
