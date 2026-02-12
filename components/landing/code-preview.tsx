"use client";

import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

const codeString = `import { createApp } from 'swiftjs-core'
import { z } from 'zod'

const app = createApp();

// Type-safe route with Zod validation
app.post('/users', {
  body: z.object({
    name: z.string(),
    email: z.string().email()
  }),
  handler: (ctx) => {
    return ctx.json({ user: ctx.body });
  }
});

app.listen(3000);`;

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
        { regex: /\b(createApp|post|listen|json|object|string|email|get|use|map|filter|find|push|pop|shift|unshift)\b(?=\s*[.(])/g, type: "fn" },
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
        <section className="py-24 px-6 relative">
            <div className="mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="font-serif text-3xl sm:text-5xl font-medium text-neutral-900 dark:text-white tracking-tight mb-4">
                        Intuitive by Design
                    </h2>
                    <p className="text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto">
                        Build type-safe APIs with an elegant, expressive syntax. Powered by Zod schemas and modern TypeScript.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="relative group"
                >
                    {/* Glow behind the card */}
                    <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-indigo-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10" />

                    <div className="rounded-2xl border border-white/10 bg-[#0a0a0a] overflow-hidden shadow-2xl shadow-black/40">
                        {/* Title bar */}
                        <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-neutral-900/50">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-400/80" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-400/80" />
                                </div>
                                <span className="ml-3 text-xs font-mono text-neutral-500">
                                    server.ts
                                </span>
                            </div>
                            <button
                                onClick={handleCopy}
                                className="p-1.5 rounded-md text-neutral-500 hover:text-neutral-300 hover:bg-white/5 transition-colors"
                            >
                                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                            </button>
                        </div>

                        {/* Code block */}
                        <div className="overflow-x-auto">
                            <pre className="p-5 text-[13px] sm:text-sm font-mono leading-[1.75]">
                                <code>
                                    {lines.map((line) => (
                                        <div key={line.lineNum} className="flex">
                                            <span className="select-none w-8 text-right pr-4 text-neutral-700 text-xs tabular-nums">
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
        </section>
    );
}
