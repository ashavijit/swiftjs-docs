"use client";

import React, { useState } from "react";
import { Copy, Check, Link as LinkIcon, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { BADGES, BadgeStyle } from "@/lib/badges";

function BadgeCard({ badge }: { badge: BadgeStyle }) {
    const [copied, setCopied] = useState(false);
    const [urlCopied, setUrlCopied] = useState(false);
    const [mdCopied, setMdCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(badge.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleCopyUrl = () => {
        const url = `${window.location.origin}/badges/${badge.id}`;
        navigator.clipboard.writeText(url);
        setUrlCopied(true);
        setTimeout(() => setUrlCopied(false), 2000);
    };

    const handleCopyMd = () => {
        const url = `${window.location.origin}/badges/${badge.id}`;
        const markdown = `![Built with SwiftJS](${url})`;
        navigator.clipboard.writeText(markdown);
        setMdCopied(true);
        setTimeout(() => setMdCopied(false), 2000);
    };

    return (
        <div className="group relative flex flex-col p-6 rounded-2xl border border-neutral-100 dark:border-white/5 bg-neutral-50/50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/5 hover:-translate-y-1">
            <div className="flex-1 flex items-center justify-center p-8 rounded-xl bg-white dark:bg-black/20 border border-neutral-100/50 dark:border-white/5 mb-6 group-hover:scale-[1.02] transition-transform">
                {badge.render(true)}
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-0.5">{badge.name}</h3>
                        <p className="text-[10px] text-neutral-400 uppercase font-black tracking-widest">Monochrome</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-2">
                    <button
                        onClick={handleCopy}
                        className={cn(
                            "flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 border",
                            copied
                                ? "bg-emerald-500 text-white border-emerald-500"
                                : "bg-neutral-900 dark:bg-white text-white dark:text-black border-transparent hover:bg-neutral-800 dark:hover:bg-neutral-100"
                        )}
                    >
                        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        {copied ? "Copied Snippet" : "Snippet (HTML)"}
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={handleCopyUrl}
                            className={cn(
                                "flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 border border-neutral-200 dark:border-white/10",
                                urlCopied
                                    ? "bg-indigo-500 text-white border-indigo-500"
                                    : "bg-white dark:bg-transparent text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-white/5"
                            )}
                        >
                            {urlCopied ? <Check className="w-3.5 h-3.5" /> : <LinkIcon className="w-3.5 h-3.5" />}
                            {urlCopied ? "Copied" : "URL"}
                        </button>

                        <button
                            onClick={handleCopyMd}
                            className={cn(
                                "flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 border border-neutral-200 dark:border-white/10",
                                mdCopied
                                    ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                                    : "bg-white dark:bg-transparent text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-white/5"
                            )}
                        >
                            {mdCopied ? <Check className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
                            {mdCopied ? "Copied" : "Markdown"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function BadgesPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-black pt-20 pb-20 px-6">
            <div className="mx-auto max-w-6xl">
                {/* Header Section */}
                <div className="mb-20 text-center sm:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200/60 dark:border-white/10 bg-neutral-50/50 dark:bg-white/5 backdrop-blur-md mb-8 shadow-sm">
                        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400 italic">Built with SwiftJS</span>
                    </div>

                    <h1 className="font-zalando text-4xl sm:text-6xl font-black tracking-tighter text-neutral-900 dark:text-white mb-6 leading-none">
                        Badge Gallery
                    </h1>
                    <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed">
                        Design-focused, framework-neutral badges for your next project.
                        Copy the snippet or use a direct URL.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {BADGES.map((badge) => (
                        <BadgeCard key={badge.id} badge={badge} />
                    ))}
                </div>
            </div>
        </main>
    );
}
