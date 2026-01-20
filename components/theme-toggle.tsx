"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggle = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    if (!mounted) return <div className="w-9 h-9" />;

    return (
        <button
            onClick={toggle}
            className={cn(
                "relative flex h-9 w-9 items-center justify-center rounded-lg",
                "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white",
                "hover:bg-neutral-100 dark:hover:bg-neutral-800",
                "transition-all duration-200"
            )}
            aria-label="Toggle theme"
        >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
        </button>
    );
}
