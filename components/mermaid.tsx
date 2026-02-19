"use client";

import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { useTheme } from "next-themes";

interface MermaidProps {
    chart: string;
}

export const Mermaid: React.FC<MermaidProps> = ({ chart }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [svg, setSvg] = useState<string>("");
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        const isDark = resolvedTheme === "dark";
        
        mermaid.initialize({
            startOnLoad: true,
            theme: isDark ? "dark" : "default",
            securityLevel: "loose",
            fontFamily: "var(--font-sans)",
        });

        const renderChart = async () => {
            if (ref.current) {
                // Generate a unique ID for each render to avoid conflicts
                const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
                try {
                    // Clear previous content before rendering new one
                    const { svg } = await mermaid.render(id, chart);
                    setSvg(svg);
                } catch (error) {
                    console.error("Mermaid error:", error);
                }
            }
        };

        renderChart();
    }, [chart, resolvedTheme]);

    return (
        <div 
            ref={ref} 
            className="mermaid-wrapper my-8 flex justify-center bg-white dark:bg-neutral-900/50 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm overflow-x-auto transition-colors duration-300"
            dangerouslySetInnerHTML={{ __html: svg }} 
        />
    );
};

