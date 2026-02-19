import { getDocBySlug, getAllDocsSlugs } from "@/lib/docs";
import { MDXRemote } from "next-mdx-remote/rsc";
import { CustomComponents } from "@/components/mdx";
import { notFound } from "next/navigation";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";
import { ChevronRight, Github, ExternalLink } from "lucide-react";
import Link from "next/link";
import { docsConfig } from "@/lib/docs-config";

type Props = {
    params: Promise<{
        slug: string[];
    }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const slug = params.slug || ["index"];
    const doc = await getDocBySlug(slug);

    if (!doc) return {};

    return {
        title: `${doc.meta.title} | SwiftJS Docs`,
        description: doc.meta.description,
        openGraph: {
            title: doc.meta.title,
            description: doc.meta.description,
            type: "article",
        },
    };
}

export async function generateStaticParams() {
    const slugs = await getAllDocsSlugs();
    return slugs;
}

export default async function DocPage(props: Props) {
    const params = await props.params;
    const slug = params.slug || ["index"];
    const doc = await getDocBySlug(slug);

    if (!doc) {
        notFound();
    }

    const githubUrl = `${docsConfig.links.github}/edit/main/docs/${slug.join("/")}.mdx`;

    return (
        <article className="max-w-3xl pb-20">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 mb-8 text-sm font-medium text-neutral-500 dark:text-neutral-400 overflow-hidden text-nowrap">
                <Link href="/docs/guide/introduction" className="hover:text-black dark:hover:text-white transition-colors">
                    Docs
                </Link>
                {slug.map((part, i) => (
                    <React.Fragment key={part}>
                        <ChevronRight className="w-4 h-4 shrink-0 transition-colors" />
                        <span className={i === slug.length - 1 ? "text-neutral-900 dark:text-white truncate" : "capitalize truncate"}>
                            {part.replace(/-/g, " ")}
                        </span>
                    </React.Fragment>
                ))}
            </nav>

            {/* Header */}
            <header className="mb-12 border-b border-neutral-200 dark:border-neutral-800 pb-10">
                <h1 className="font-domaine text-5xl font-medium tracking-tight text-black dark:text-white leading-[1.1]">
                    {doc.meta.title}
                </h1>
                {doc.meta.description && (
                    <p className="mt-6 text-xl text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed max-w-2xl">
                        {doc.meta.description}
                    </p>
                )}
            </header>

            {/* Content */}
            <div className="prose prose-neutral dark:prose-invert max-w-none 
                prose-headings:font-domaine prose-headings:font-medium prose-headings:tracking-tight
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-none
                prose-p:text-[17px] prose-p:leading-8 prose-p:text-neutral-700 dark:prose-p:text-neutral-300
                prose-strong:text-black dark:prose-strong:text-white prose-strong:font-semibold
                prose-code:text-[14px] prose-code:font-mono
                prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline
            ">
                <MDXRemote
                    source={doc.content}
                    components={CustomComponents}
                    options={{
                        mdxOptions: {
                            remarkPlugins: [remarkGfm],
                        },
                    }}
                />
            </div>

            {/* Footer Actions */}
            <footer className="mt-20 pt-8 border-t border-neutral-100 dark:border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-6">
                <a 
                    href={githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-black dark:hover:text-white transition-colors group"
                >
                    <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>Edit this page on GitHub</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                
                <div className="text-xs text-neutral-400 dark:text-neutral-600 font-medium">
                    SwiftJS Documentation &copy; {new Date().getFullYear()}
                </div>
            </footer>
        </article>
    );
}

// Ensure React is imported for React.Fragment in breadcrumbs
import React from "react";

