import Link from "next/link";
import { codeToHtml } from "shiki/bundle/web";
import { cn } from "@/lib/utils";
import { Plus, Copy, Check } from "lucide-react";

const SUPPORTED_LANGS = new Set([
    "javascript", "js", "typescript", "ts", "tsx", "jsx",
    "json", "html", "css", "scss", "markdown", "md", "mdx",
    "yaml", "yml", "bash", "sh", "shell", "python", "py",
    "ruby", "rb", "go", "rust", "rs", "java", "c", "cpp",
    "csharp", "cs", "php", "sql", "graphql", "vue", "svelte",
    "xml", "diff", "text", "plaintext"
]);

async function CodeBlock({ code, lang }: { code: string; lang: string }) {
    const normalizedLang = lang.toLowerCase();
    const useLang = SUPPORTED_LANGS.has(normalizedLang) ? lang : "text";

    try {
        const lightHtml = await codeToHtml(code.trim(), {
            lang: useLang,
            theme: "github-light",
        });

        const darkHtml = await codeToHtml(code.trim(), {
            lang: useLang,
            theme: "github-dark",
        });

        return (
            <div className="group relative my-6 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
                <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800/50">
                    <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                        {lang}
                    </span>
                </div>
                <div
                    dangerouslySetInnerHTML={{ __html: lightHtml }}
                    className="dark:hidden overflow-x-auto p-4 text-sm [&_pre]:!bg-transparent [&_code]:!bg-transparent"
                />
                <div
                    dangerouslySetInnerHTML={{ __html: darkHtml }}
                    className="hidden dark:block overflow-x-auto p-4 text-sm [&_pre]:!bg-transparent [&_code]:!bg-transparent"
                />
            </div>
        );
    } catch {
        // Fallback for unsupported languages
        return (
            <div className="group relative my-6 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
                <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800/50">
                    <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                        {lang}
                    </span>
                </div>
                <pre className="overflow-x-auto p-4 text-sm">
                    <code className="text-neutral-800 dark:text-neutral-200 whitespace-pre">
                        {code.trim()}
                    </code>
                </pre>
            </div>
        );
    }
}

export const CustomComponents = {
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
    blockquote: (props: any) => (
        <blockquote className="border-l-4 border-neutral-300 dark:border-neutral-700 pl-4 my-6 italic text-neutral-600 dark:text-neutral-400" {...props} />
    ),
    hr: () => (
        <hr className="my-8 border-neutral-200 dark:border-neutral-800" />
    ),
    // Table components
    table: (props: any) => (
        <div className="my-6 w-full overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
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
                <code className="bg-neutral-100 dark:bg-neutral-800 rounded-md px-1.5 py-0.5 font-mono text-sm text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-700">
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
    // Callout/Note component
    Callout: ({ type = "info", title, children }: any) => {
        const styles = {
            info: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100",
            warning: "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800 text-yellow-900 dark:text-yellow-100",
            error: "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 text-red-900 dark:text-red-100",
            success: "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100",
        };
        return (
            <div className={cn("my-6 rounded-lg border p-4", styles[type as keyof typeof styles] || styles.info)}>
                {title && <p className="font-semibold mb-2">{title}</p>}
                <div className="text-sm">{children}</div>
            </div>
        );
    },
};
