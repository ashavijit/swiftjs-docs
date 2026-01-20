"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import {
    Search,
    Book,
    FileText,
    Code,
    Settings,
    Laptop,
    Moon,
    Sun,
    Layout
} from "lucide-react";
import { useTheme } from "next-themes";
import { docsConfig } from "@/lib/docs-config";
import { cn } from "@/lib/utils";

interface CommandMenuProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CommandMenu({ open, setOpen }: CommandMenuProps) {
    const router = useRouter();
    const { setTheme } = useTheme();

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [setOpen]);

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false);
        command();
    }, [setOpen]);

    return (
        <Command.Dialog
            open={open}
            onOpenChange={setOpen}
            label="Global Command Menu"
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] bg-white dark:bg-[#0a0a0a] rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-2xl p-0 z-[100]"
        >
            <div className="flex items-center border-b border-neutral-200 dark:border-neutral-800 px-3">
                <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                <Command.Input
                    className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-neutral-500 disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-neutral-400"
                    placeholder="Type a command or search..."
                />
            </div>

            <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
                <Command.Empty className="py-6 text-center text-sm">No results found.</Command.Empty>

                <Command.Group heading="Links" className="px-2 pb-1.5 text-xs text-neutral-500 font-medium">
                    {docsConfig.mainNav.map((navItem) => (
                        <Command.Item
                            key={navItem.href}
                            value={navItem.title}
                            onSelect={() => runCommand(() => router.push(navItem.href))}
                            className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 aria-selected:bg-neutral-100 dark:aria-selected:bg-neutral-800 group"
                        >
                            <FileText className="h-4 w-4 text-neutral-500 group-hover:text-black dark:group-hover:text-white group-aria-selected:text-black dark:group-aria-selected:text-white" />
                            <span className="text-neutral-700 dark:text-neutral-300 group-hover:text-black dark:group-hover:text-white group-aria-selected:text-black dark:group-aria-selected:text-white">{navItem.title}</span>
                        </Command.Item>
                    ))}
                </Command.Group>

                <Command.Group heading="Documentation" className="px-2 pb-1.5 text-xs text-neutral-500 font-medium mt-2">
                    {docsConfig.sidebar.map((group) => (
                        <div key={group.title}>
                            {group.items.map((item) => (
                                <Command.Item
                                    key={item.href}
                                    value={item.title}
                                    onSelect={() => runCommand(() => router.push(item.href))}
                                    className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 aria-selected:bg-neutral-100 dark:aria-selected:bg-neutral-800 group"
                                >
                                    <Book className="h-4 w-4 text-neutral-500 group-hover:text-black dark:group-hover:text-white group-aria-selected:text-black dark:group-aria-selected:text-white" />
                                    <span className="text-neutral-700 dark:text-neutral-300 group-hover:text-black dark:group-hover:text-white group-aria-selected:text-black dark:group-aria-selected:text-white">{item.title}</span>

                                    <span className="ml-auto text-xs text-neutral-400 opacity-60 group-hover:opacity-100">
                                        {group.title}
                                    </span>
                                </Command.Item>
                            ))}
                        </div>
                    ))}
                </Command.Group>

                <Command.Separator className="my-1 h-px bg-neutral-200 dark:bg-neutral-800" />

                <Command.Group heading="Theme" className="px-2 pb-1.5 text-xs text-neutral-500 font-medium mt-2">
                    <Command.Item
                        value="light"
                        onSelect={() => runCommand(() => setTheme("light"))}
                        className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 aria-selected:bg-neutral-100 dark:aria-selected:bg-neutral-800 group"
                    >
                        <Sun className="h-4 w-4 text-neutral-500 group-hover:text-black dark:group-hover:text-white group-aria-selected:text-black dark:group-aria-selected:text-white" />
                        <span className="text-neutral-700 dark:text-neutral-300 group-hover:text-black dark:group-hover:text-white group-aria-selected:text-black dark:group-aria-selected:text-white">Light</span>
                    </Command.Item>
                    <Command.Item
                        value="dark"
                        onSelect={() => runCommand(() => setTheme("dark"))}
                        className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 aria-selected:bg-neutral-100 dark:aria-selected:bg-neutral-800 group"
                    >
                        <Moon className="h-4 w-4 text-neutral-500 group-hover:text-black dark:group-hover:text-white group-aria-selected:text-black dark:group-aria-selected:text-white" />
                        <span className="text-neutral-700 dark:text-neutral-300 group-hover:text-black dark:group-hover:text-white group-aria-selected:text-black dark:group-aria-selected:text-white">Dark</span>
                    </Command.Item>
                    <Command.Item
                        value="system"
                        onSelect={() => runCommand(() => setTheme("system"))}
                        className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 aria-selected:bg-neutral-100 dark:aria-selected:bg-neutral-800 group"
                    >
                        <Laptop className="h-4 w-4 text-neutral-500 group-hover:text-black dark:group-hover:text-white group-aria-selected:text-black dark:group-aria-selected:text-white" />
                        <span className="text-neutral-700 dark:text-neutral-300 group-hover:text-black dark:group-hover:text-white group-aria-selected:text-black dark:group-aria-selected:text-white">System</span>
                    </Command.Item>
                </Command.Group>
            </Command.List>

            <div className="border-t border-neutral-200 dark:border-neutral-800 p-2">
                <p className="text-[10px] text-center text-neutral-400">
                    Search powered by internal index
                </p>
            </div>
        </Command.Dialog>
    );
}
