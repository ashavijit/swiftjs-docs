"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { docsConfig, type SidebarNavItem } from "@/lib/docs-config";

function SidebarGroup({ group }: { group: SidebarNavItem }) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(true);

    const hasActiveItem = group.items.some(
        (item) => pathname === item.href || pathname === item.href + "/"
    );

    return (
        <div className="pb-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex w-full items-center justify-between py-2 text-sm font-semibold transition-colors",
                    hasActiveItem
                        ? "text-black dark:text-white"
                        : "text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                )}
            >
                {group.title}
                <ChevronDown
                    className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        isOpen ? "" : "-rotate-90"
                    )}
                />
            </button>
            {isOpen && (
                <ul className="space-y-1 pt-1">
                    {group.items.map((item) => {
                        const isActive = pathname === item.href || pathname === item.href + "/";
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "block py-1.5 pl-3 text-sm border-l-2 transition-all duration-150",
                                        isActive
                                            ? "border-black dark:border-white text-black dark:text-white font-medium"
                                            : "border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:border-neutral-300 dark:hover:border-neutral-600"
                                    )}
                                >
                                    {item.title}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

export function Sidebar({ className }: { className?: string }) {
    return (
        <aside className={cn("w-64 shrink-0", className)}>
            <nav className="sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto pr-4 pb-10">
                {docsConfig.sidebar.map((group) => (
                    <SidebarGroup key={group.title} group={group} />
                ))}
            </nav>
        </aside>
    );
}

export function MobileSidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black shadow-lg hover:scale-105 transition-transform"
            >
                <Menu className="h-5 w-5" />
            </button>

            {isOpen && (
                <div className="lg:hidden fixed inset-0 z-50">
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800 p-6 overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <span className="font-serif text-lg font-medium">Documentation</span>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <nav onClick={() => setIsOpen(false)}>
                            {docsConfig.sidebar.map((group) => (
                                <SidebarGroup key={group.title} group={group} />
                            ))}
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
}
