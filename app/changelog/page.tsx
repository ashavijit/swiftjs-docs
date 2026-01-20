import fs from "fs";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import { CustomComponents } from "@/components/mdx";
import remarkGfm from "remark-gfm";

export const metadata = {
    title: "Changelog - SwiftJS",
    description: "All notable changes to SwiftJS framework.",
};

export default async function ChangelogPage() {
    const filePath = path.join(process.cwd(), "changelog", "index.md");
    const fileContent = fs.readFileSync(filePath, "utf8");


    const contentWithoutTitle = fileContent.replace(/^#\s+.*/, "").trim();

    const headings = contentWithoutTitle.match(/^##\s+.+$/gm)?.map((heading) => {
        const title = heading.replace(/^##\s+/, "").replace(/[\[\]]/g, ""); // Remove ## and brackets
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); // Simple slugify
        return { title, slug };
    }) || [];

    const ChangelogComponents = {
        ...CustomComponents,
        h2: (props: any) => {
            const text = props.children?.toString() || "";
    
            const cleanText = text.replace(/[\[\]]/g, "");
            const id = cleanText.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

            return (
                <div className="flex items-center gap-4 mt-16 mb-6 border-b border-neutral-200 dark:border-neutral-800 pb-4">
                    <h2 id={id} className="font-serif text-3xl font-medium tracking-tight text-black dark:text-white scroll-mt-24" {...props} />
                </div>
            );
        },
        h3: (props: any) => {
            const text = props.children?.toString() || "";
            let className = "inline-flex items-center rounded-md px-2.5 py-0.5 text-sm font-medium mt-8 mb-4 ";

            switch (text.toLowerCase()) {
                case "added":
                    className += "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 ring-1 ring-inset ring-green-600/20";
                    break;
                case "changed":
                    className += "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 ring-1 ring-inset ring-blue-600/20";
                    break;
                case "deprecated":
                    className += "bg-yellow-50 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500 ring-1 ring-inset ring-yellow-600/20";
                    break;
                case "removed":
                    className += "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 ring-1 ring-inset ring-red-600/20";
                    break;
                case "fixed":
                    className += "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 ring-1 ring-inset ring-indigo-600/20";
                    break;
                case "performance":
                    className += "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 ring-1 ring-inset ring-purple-600/20";
                    break;
                default:
                    return <h3 className="font-serif text-xl font-medium mt-8 mb-3 tracking-tight text-black dark:text-white scroll-mt-24" {...props} />;
            }

            return <h3 className={className} {...props} />;
        },
    };

    return (
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 lg:py-24">
            <div className="flex flex-col lg:flex-row gap-12">
                {/* Main Content */}
                <div className="flex-1 min-w-0 max-w-3xl">
                    <div className="mb-12 border-b border-neutral-200 dark:border-neutral-800 pb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-8 w-1 rounded-full bg-black dark:bg-white" />
                            <h1 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight text-black dark:text-white">
                                Changelog
                            </h1>
                        </div>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400 pl-4 border-l border-neutral-200 dark:border-neutral-800">
                            All notable changes to SwiftJS will be documented in this file.
                        </p>
                    </div>

                    <div className="prose prose-neutral dark:prose-invert max-w-none prose-h2:mt-0 prose-h2:border-none prose-h3:mt-0">
                        <MDXRemote
                            source={contentWithoutTitle}
                            components={ChangelogComponents}
                            options={{
                                mdxOptions: {
                                    remarkPlugins: [remarkGfm],
                                },
                            }}
                        />
                    </div>
                </div>

                {/* Sidebar TOC */}
                <div className="hidden lg:block w-64 shrink-0">
                    <div className="sticky top-24">
                        <h4 className="font-medium text-sm text-black dark:text-white mb-4">
                            On this page
                        </h4>
                        <ul className="space-y-3 text-sm border-l border-neutral-200 dark:border-neutral-800 pl-4">
                            {headings.map((heading) => (
                                <li key={heading.slug}>
                                    <a
                                        href={`#${heading.slug}`}
                                        className="block text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors"
                                    >
                                        {heading.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
