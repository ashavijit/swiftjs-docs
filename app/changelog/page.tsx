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
                <div className="relative group/version py-12 first:pt-0">
                    {/* Timeline Marker */}
                    <div className="absolute left-[-33px] top-[54px] w-4 h-4 rounded-full border-4 border-white dark:border-black bg-neutral-900 dark:bg-white z-10 transition-transform group-hover/version:scale-125" />

                    <div className="flex flex-col gap-2">
                        <h2 id={id} className="font-serif text-4xl font-medium tracking-tight text-black dark:text-white scroll-mt-24" {...props} />
                        <div className="h-px w-full bg-gradient-to-r from-neutral-200 dark:from-neutral-800 to-transparent mb-8" />
                    </div>
                </div>
            );
        },
        h3: (props: any) => {
            const text = props.children?.toString() || "";
            let className = "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mt-8 mb-4 ";

            const category = text.split('-')[0].trim().toLowerCase();

            switch (category) {
                case "added":
                    className += "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20";
                    break;
                case "fixed":
                    className += "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20";
                    break;
                case "changed":
                    className += "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20";
                    break;
                case "performance":
                    className += "bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20";
                    break;
                case "security":
                    className += "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20";
                    break;
                default:
                    return <h3 className="font-serif text-2xl font-medium mt-12 mb-4 tracking-tight text-black dark:text-white" {...props} />;
            }

            return (
                <div className="flex items-center gap-4 mt-8 mb-4">
                    <span className={className}>{category}</span>
                    {text.includes('-') && (
                        <span className="text-lg font-medium text-neutral-400 dark:text-neutral-500">
                            {text.split('-').slice(1).join('-').trim()}
                        </span>
                    )}
                </div>
            );
        },
    };

    return (
        <div className="relative min-h-screen bg-white dark:bg-black">
            {/* Background Decorative Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />

            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 lg:py-20">
                <div className="flex flex-col lg:flex-row gap-20">
                    {/* Main Content */}
                    <div className="flex-1 min-w-0 max-w-3xl">
                        <header className="mb-20">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 mb-8">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">Updates</span>
                            </div>
                            <h1 className="font-serif text-6xl sm:text-7xl font-medium tracking-tight text-black dark:text-white mb-6">
                                Changelog
                            </h1>
                            <p className="text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed">
                                Every ship, every fix, every breakthrough. Follow the evolution of SwiftJS.
                            </p>
                        </header>

                        <div className="relative ml-8">
                            {/* Vertical Timeline Line */}
                            <div className="absolute left-[-26px] top-6 bottom-0 w-px bg-neutral-200 dark:bg-neutral-800" />

                            <div className="prose prose-neutral dark:prose-invert max-w-none 
                                prose-h2:mt-0 prose-h2:mb-0
                                prose-p:text-neutral-600 dark:prose-p:text-neutral-400 prose-p:leading-relaxed
                                prose-li:text-neutral-600 dark:prose-li:text-neutral-400
                                prose-code:text-neutral-900 dark:prose-code:text-neutral-100 prose-code:bg-neutral-50 dark:prose-code:bg-neutral-900/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:before:content-[''] prose-code:after:content-['']">
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

                    {/* Sidebar TOC */}
                    <div className="hidden lg:block w-64 shrink-0">
                        <div className="sticky top-32">
                            <h4 className="font-serif text-lg font-medium text-black dark:text-white mb-6">
                                Revisions
                            </h4>
                            <nav>
                                <ul className="space-y-4 border-l border-neutral-100 dark:border-neutral-900">
                                    {headings.map((heading) => (
                                        <li key={heading.slug}>
                                            <a
                                                href={`#${heading.slug}`}
                                                className="group flex flex-col pl-6 -ml-px border-l border-transparent hover:border-black dark:hover:border-white transition-all"
                                            >
                                                <span className="text-sm font-medium text-neutral-400 group-hover:text-black dark:text-neutral-500 dark:group-hover:text-white transition-colors">
                                                    {heading.title.split(' - ')[0]}
                                                </span>
                                                <span className="text-xs text-neutral-300 dark:text-neutral-600 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors">
                                                    {heading.title.split(' - ')[1]}
                                                </span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>

                            <div className="mt-12 p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800">
                                <h5 className="text-sm font-bold text-neutral-900 dark:text-white mb-2">Subscribe</h5>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">Get notified about new releases and security advisories.</p>
                                <button className="w-full py-2 px-4 bg-black dark:bg-white text-white dark:text-black text-xs font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all">
                                    Join Newsletter
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
