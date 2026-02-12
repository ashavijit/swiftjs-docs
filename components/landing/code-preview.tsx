"use client";

import { motion } from "framer-motion";
import { Copy, Check, Terminal } from "lucide-react";
import { useState } from "react";

const codeString = `import { createApp } from 'swiftjs-core'
import { z } from 'zod'

const app = createApp()

// Type-safe route with Zod validation
app.post('/users', {
  body: z.object({
    name: z.string(),
    email: z.string().email()
  }),
  handler: (ctx) => {
    return ctx.json({ user: ctx.body })
  }
})

app.listen(3000)`;

const tokenColors: Record<string, string> = {
    keyword: "text-violet-400",
    fn: "text-blue-400",
    string: "text-emerald-400",
    number: "text-orange-400",
    comment: "text-neutral-500 italic",
    variable: "text-amber-400",
    default: "text-neutral-300",
};

function highlightCode(code: string) {
    const rules = [
        { regex: /\/\/.*$/gm, type: "comment" },
        { regex: /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, type: "string" },
        { regex: /\b(import|from|const|return|export|await|async|type|interface|class|extends|new|let|var)\b/g, type: "keyword" },
        { regex: /\b(createApp|post|listen|json|object|string|email|get|use|map|filter|find|push|pop|shift|unshift|listen)\b(?=\s*[.(])/g, type: "fn" },
        { regex: /\b\d+\b/g, type: "number" },
        { regex: /\b(z|app|ctx|req|res)\b/g, type: "variable" },
    ];

    return code.split("\n").map((line, i) => {
        let tokens: { text: string; type: string }[] = [];
        let matches: { start: number; end: number; type: string; text: string }[] = [];

        rules.forEach((rule) => {
            let match;
            rule.regex.lastIndex = 0;
            while ((match = rule.regex.exec(line)) !== null) {
                matches.push({
                    start: match.index,
                    end: match.index + match[0].length,
                    type: rule.type,
                    text: match[0],
                });
            }
        });

        matches.sort((a, b) => a.start - b.start);

        let filteredMatches: typeof matches = [];
        let lastEnd = 0;
        matches.forEach((m) => {
            if (m.start >= lastEnd) {
                filteredMatches.push(m);
                lastEnd = m.end;
            }
        });

        let currentPos = 0;
        filteredMatches.forEach((m) => {
            if (m.start > currentPos) {
                tokens.push({ text: line.substring(currentPos, m.start), type: "default" });
            }
            tokens.push({ text: m.text, type: m.type });
            currentPos = m.end;
        });
        if (currentPos < line.length) {
            tokens.push({ text: line.substring(currentPos), type: "default" });
        }

        if (line.length === 0) tokens.push({ text: " ", type: "default" });

        return { tokens, lineNum: i + 1 };
    });
}

export function CodePreview() {
    const [copied, setCopied] = useState(false);
    const lines = highlightCode(codeString);

    function handleCopy() {
        navigator.clipboard.writeText(codeString);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <section className="py-32 px-6">
            <div className="mx-auto max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-900 text-white mb-6">
                            <Terminal className="w-5 h-5" />
                        </div>
                        <h2 className="font-serif text-5xl sm:text-6xl font-medium text-neutral-900 dark:text-white mb-6 tracking-tight leading-[1.1]">
                            Build in minutes, <br />
                            not months.
                        </h2>
                        <p className="text-xl text-neutral-500 dark:text-neutral-400 mb-8 max-w-lg leading-relaxed">
                            A developer-first experience with zero configuration. Use modern patterns like Zod validation and TypeScript out of the box.
                        </p>

                        <div className="space-y-4">
                            {[
                                "Zero-boilerplate setup",
                                "End-to-end type safety",
                                "Production-ready templates"
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                        <Check className="w-3 h-3 text-emerald-500" />
                                    </div>
                                    <span className="text-neutral-700 dark:text-neutral-300 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Code Block */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        {/* Decorative Background Glow */}
                        <div className="absolute -inset-10 bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-transparent rounded-[3rem] blur-3xl -z-10" />

                        <div className="rounded-2xl bg-[#0a0a0a] border border-white/10 shadow-2xl overflow-hidden">
                            {/* Window Header */}
                            <div className="flex items-center justify-between px-8 py-5 border-b border-white/5 bg-neutral-900/50">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-400/60" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                                        <div className="w-3 h-3 rounded-full bg-green-400/60" />
                                    </div>
                                    <span className="ml-4 text-xs font-mono text-neutral-500 font-medium">server.ts</span>
                                </div>
                                <button
                                    onClick={handleCopy}
                                    className="p-2 rounded-xl text-neutral-500 hover:text-white hover:bg-white/5 transition-all"
                                >
                                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                                </button>
                            </div>

                            {/* Code Area */}
                            <div className="overflow-x-auto p-8 pt-6">
                                <pre className="text-[13px] sm:text-sm font-mono leading-[1.8]">
                                    <code>
                                        {lines.map((line) => (
                                            <div key={line.lineNum} className="flex group">
                                                <span className="select-none w-10 text-right pr-6 text-neutral-700 text-xs tabular-nums group-hover:text-neutral-500 transition-colors">
                                                    {line.lineNum}
                                                </span>
                                                <span className="text-neutral-300">
                                                    {line.tokens.map((token, tIdx) => (
                                                        <span key={tIdx} className={tokenColors[token.type]}>
                                                            {token.text}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        ))}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
