import Link from "next/link";
import React from "react";
import { codeToHtml } from "shiki";
import { cn } from "@/lib/utils";
import { Plus, Info, Lightbulb, AlertCircle, AlertTriangle, ShieldAlert } from "lucide-react";
import { CopyButton } from "./copy-button";
import { Mermaid } from "./mermaid";

async function CodeBlock({ code, lang }: { code: string; lang: string }) {
    const normalizedLang = lang.toLowerCase();
    const useLang = SUPPORTED_LANGS.has(normalizedLang) ? lang : "text";

    const lightHtml = await codeToHtml(code.trim(), {
        lang: useLang,
        theme: "github-light",
    });

    const darkHtml = await codeToHtml(code.trim(), {
        lang: useLang,
        theme: "github-dark",
    });

    return (
        <div className="group relative my-8 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xl shadow-neutral-200/50 dark:shadow-none transition-all hover:shadow-2xl hover:shadow-neutral-300/50 dark:hover:shadow-none">
            <div className="flex items-center justify-between px-5 py-2.5 bg-neutral-50/80 dark:bg-neutral-800/20 border-b border-neutral-200 dark:border-neutral-800 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300/50 dark:border-neutral-700/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300/50 dark:border-neutral-700/50" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-[0.2em] ml-2 select-none">
                        {lang}
                    </span>
                </div>
                <CopyButton code={code.trim()} />
            </div>
            <div className="relative">
                <div
                    dangerouslySetInnerHTML={{ __html: lightHtml }}
                    className="dark:hidden overflow-x-auto p-6 text-[13.5px] leading-relaxed font-mono [&_pre]:!bg-transparent [&_code]:!bg-transparent [&_code]:!font-mono"
                />
                <div
                    dangerouslySetInnerHTML={{ __html: darkHtml }}
                    className="hidden dark:block overflow-x-auto p-6 text-[13.5px] leading-relaxed font-mono [&_pre]:!bg-transparent [&_code]:!bg-transparent [&_code]:!font-mono"
                />
            </div>
        </div>
    );
}

const SUPPORTED_LANGS = new Set([
    "javascript", "js", "typescript", "ts", "tsx", "jsx",
    "json", "html", "css", "scss", "markdown", "md", "mdx",
    "yaml", "yml", "bash", "sh", "shell", "python", "py",
    "ruby", "rb", "go", "rust", "rs", "java", "c", "cpp",
    "csharp", "cs", "php", "sql", "graphql", "vue", "svelte",
    "xml", "diff", "text", "plaintext", "mermaid"
]);

// Callout/Note component
export const Callout = ({ type = "info", title, children }: any) => {
    const variants = {
        info: {
            container: "bg-blue-50/50 dark:bg-blue-900/10 border-blue-200/50 dark:border-blue-800/50 text-blue-900 dark:text-blue-100",
            icon: <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
            title: "text-blue-800 dark:text-blue-200"
        },
        success: {
            container: "bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-200/50 dark:border-emerald-800/50 text-emerald-900 dark:text-emerald-100",
            icon: <Lightbulb className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
            title: "text-emerald-800 dark:text-emerald-200"
        },
        important: {
            container: "bg-indigo-50/50 dark:bg-indigo-900/10 border-indigo-200/50 dark:border-indigo-800/50 text-indigo-900 dark:text-indigo-100",
            icon: <AlertCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
            title: "text-indigo-800 dark:text-indigo-200"
        },
        warning: {
            container: "bg-amber-50/50 dark:bg-amber-900/10 border-amber-200/50 dark:border-amber-800/50 text-amber-900 dark:text-amber-100",
            icon: <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
            title: "text-amber-800 dark:text-amber-200"
        },
        error: {
            container: "bg-rose-50/50 dark:bg-rose-900/10 border-rose-200/50 dark:border-rose-800/50 text-rose-900 dark:text-rose-100",
            icon: <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
            title: "text-rose-800 dark:text-rose-200"
        },
    };

    const variant = variants[type as keyof typeof variants] || variants.info;

    return (
        <div className={cn(
            "my-8 relative overflow-hidden rounded-xl border p-5 transition-all text-left",
            variant.container
        )}>
            {/* Subtle Gradient Glow */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-gradient-to-br from-current to-transparent" />
            
            <div className="flex items-start gap-4">
                <div className="mt-0.5 shrink-0">
                    {variant.icon}
                </div>
                <div className="space-y-1.5 flex-1">
                    {title && (
                        <p className={cn(
                            "text-xs font-bold uppercase tracking-wider",
                            variant.title
                        )}>
                            {title}
                        </p>
                    )}
                    <div className="text-[15px] leading-relaxed font-sans opacity-90 prose-p:my-0 prose-a:text-current prose-strong:text-current">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const CustomComponents: any = {
    h1: (props: any) => (
        <h1 className="font-serif text-4xl font-medium mt-10 mb-4 tracking-tight text-black dark:text-white" {...props} />
    ),
    h2: (props: any) => (
        <h2 className="font-serif text-2xl font-medium mt-10 mb-4 tracking-tight text-black dark:text-white border-b border-neutral-200 dark:border-neutral-800 pb-2" {...props} />
    ),
    h3: (props: any) => (
        <h3 className="font-serif text-xl font-medium mt-8 mb-3 tracking-tight text-black dark:text-white" {...props} />
    ),
    h4: (props: any) => (
        <h4 className="font-serif text-lg font-medium mt-6 mb-2 tracking-tight text-black dark:text-white" {...props} />
    ),
    p: (props: any) => (
        <p className="font-sans text-base leading-7 text-neutral-700 dark:text-neutral-300 mb-4" {...props} />
    ),
    a: (props: any) => (
        <Link
            className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline underline-offset-4 decoration-blue-300 dark:decoration-blue-700 hover:decoration-blue-500 transition-colors"
            {...props}
        />
    ),
    ul: (props: any) => (
        <ul className="list-disc list-outside mb-4 ml-6 space-y-2 text-neutral-700 dark:text-neutral-300" {...props} />
    ),
    ol: (props: any) => (
        <ol className="list-decimal list-outside mb-4 ml-6 space-y-2 text-neutral-700 dark:text-neutral-300" {...props} />
    ),
    li: (props: any) => (
        <li className="leading-7" {...props} />
    ),
    strong: (props: any) => (
        <strong className="font-semibold text-black dark:text-white" {...props} />
    ),
    em: (props: any) => (
        <em className="italic" {...props} />
    ),
    blockquote: (props: any) => {
        const children = props.children;
        const text = typeof children === 'string' ? children : 
                     (Array.isArray(children) && typeof children[0] === 'string') ? children[0] : 
                     (children?.props?.children && typeof children.props.children === 'string') ? children.props.children : "";

        const alertMatch = text.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i);
        
        if (alertMatch) {
            const type = alertMatch[1].toLowerCase();
            const cleanChildren = React.Children.map(children, (child: any) => {
                if (typeof child === 'string') {
                    return child.replace(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/i, "");
                }
                if (child?.props?.children && typeof child.props.children === 'string') {
                    return React.cloneElement(child, {
                        children: child.props.children.replace(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/i, "")
                    });
                }
                return child;
            });

            const typeMap: Record<string, string> = {
                note: "info",
                tip: "success",
                important: "important",
                warning: "warning",
                caution: "error"
            };

            return (
                <Callout type={typeMap[type] || "info"} title={type.toUpperCase()}>
                    {cleanChildren}
                </Callout>
            );
        }

        return <blockquote className="border-l-4 border-neutral-300 dark:border-neutral-700 pl-4 my-6 italic text-neutral-600 dark:text-neutral-400" {...props} />;
    },
    hr: () => (
        <hr className="my-8 border-neutral-200 dark:border-neutral-800" />
    ),
    // Table components
    table: (props: any) => (
        <div className="my-6 w-full overflow-x-auto border border-neutral-200 dark:border-neutral-800">
            <table className="w-full text-sm" {...props} />
        </div>
    ),
    thead: (props: any) => (
        <thead className="bg-neutral-100 dark:bg-neutral-800/50" {...props} />
    ),
    tbody: (props: any) => (
        <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800" {...props} />
    ),
    tr: (props: any) => (
        <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/30 transition-colors" {...props} />
    ),
    th: (props: any) => (
        <th className="px-4 py-3 text-left font-semibold text-black dark:text-white border-b border-neutral-200 dark:border-neutral-800" {...props} />
    ),
    td: (props: any) => (
        <td className="px-4 py-3 text-neutral-700 dark:text-neutral-300" {...props} />
    ),
    // Inline code
    code: async ({ children, className }: any) => {
        if (!className) {
            return (
                <code className="bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 font-mono text-sm text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-700">
                    {children}
                </code>
            );
        }
        return <code className={className}>{children}</code>;
    },
    // Code blocks
    pre: async ({ children, ...props }: any) => {
        const codeNode = children as any;
        const code = codeNode.props.children || "";
        const lang = codeNode.props.className?.replace("language-", "") || "text";

        if (lang === "mermaid") {
            return <Mermaid chart={code} />;
        }

        return <CodeBlock code={code} lang={lang} />;
    },
    // Feature card
    Card: ({ title, children, href }: any) => {
        return (
            <Link
                href={href || "#"}
                className="group block relative p-6 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:border-neutral-400 dark:hover:border-neutral-600 transition-all bg-white dark:bg-neutral-900 hover:shadow-lg dark:hover:shadow-neutral-900/50"
            >
                <div className="absolute top-4 right-4 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Plus className="w-3 h-3 text-neutral-900 dark:text-white" />
                    <Plus className="w-3 h-3 text-neutral-900 dark:text-white" />
                </div>
                <h3 className="font-serif text-lg mb-2 text-black dark:text-white">{title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 font-sans">{children}</p>
            </Link>
        );
    },
    // Card grid wrapper
    CardGrid: ({ children }: any) => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 not-prose">
            {children}
        </div>
    ),
    Callout: (props: any) => <Callout {...props} />,
};
