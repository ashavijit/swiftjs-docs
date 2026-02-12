"use client";

import React from "react";
import { Copy, Check } from "lucide-react";

export function CopyButton({ code }: { code: string }) {
    const [copied, setCopied] = React.useState(false);

    const copy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={copy}
            className="p-1.5 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-500 transition-colors shadow-sm active:scale-95 border border-transparent hover:border-neutral-300 dark:hover:border-neutral-700"
            title="Copy code"
        >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
    );
}
