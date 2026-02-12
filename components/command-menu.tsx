"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import {
    Search,
    Book,
    FileText,
    Laptop,
    Moon,
    Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { docsConfig } from "@/lib/docs-config";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle } from "@radix-ui/react-dialog";

interface CommandMenuProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CommandMenu({ open, setOpen }: CommandMenuProps) {
    const router = useRouter();
    const { setTheme } = useTheme();

    /* Toggle Cmd + K */
    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((o) => !o);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [setOpen]);

    const runCommand = React.useCallback(
        (command: () => unknown) => {
            setOpen(false);
            command();
        },
        [setOpen]
    );

    return (
        <Command.Dialog
            open={open}
            onOpenChange={setOpen}
            label="Global Command Menu"
            className="
                fixed top-1/2 left-1/2
                -translate-x-1/2 -translate-y-1/2
                w-full max-w-xl
                rounded-2xl
                border border-white/10
                bg-white/70 dark:bg-neutral-900/70
                backdrop-blur-xl
                shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)]
                overflow-hidden
                z-[100]
                animate-in fade-in zoom-in-95
            "
        >
            <VisuallyHidden>
                <DialogTitle>Global Command Menu</DialogTitle>
            </VisuallyHidden>

            {/* Search Bar */}
            <div
                className="
                    flex items-center gap-3
                    border-b border-black/5 dark:border-white/10
                    px-4 py-3
                    bg-white/40 dark:bg-black/30
                "
            >
                <Search className="h-4 w-4 text-neutral-500" />

                <Command.Input
                    placeholder="Search commands..."
                    className="
                        w-full
                        bg-transparent
                        text-sm
                        outline-none
                        placeholder:text-neutral-500
                        dark:placeholder:text-neutral-400
                    "
                />
            </div>

            {/* Results */}
            <Command.List
                className="
                    max-h-[320px]
                    overflow-y-auto
                    px-2 py-3
                    scrollbar-thin
                "
            >
                <Command.Empty className="py-8 text-center text-sm text-neutral-500">
                    No results found
                </Command.Empty>

                {/* Links */}
                <Command.Group
                    heading="Links"
                    className="px-2 text-xs text-neutral-500 font-medium"
                >
                    {docsConfig.mainNav.map((nav) => (
                        <Command.Item
                            key={nav.href}
                            value={nav.title}
                            onSelect={() =>
                                runCommand(() => router.push(nav.href))
                            }
                            className="
                                group
                                flex items-center gap-3
                                px-3 py-2
                                rounded-lg
                                text-sm
                                cursor-pointer
                                transition-all
                                hover:bg-black/5 dark:hover:bg-white/10
                                aria-selected:bg-black/10
                                dark:aria-selected:bg-white/15
                            "
                        >
                            <FileText className="h-4 w-4 text-neutral-500" />
                            <span>{nav.title}</span>
                        </Command.Item>
                    ))}
                </Command.Group>

                {/* Docs */}
                <Command.Group
                    heading="Documentation"
                    className="mt-3 px-2 text-xs text-neutral-500 font-medium"
                >
                    {docsConfig.sidebar.map((group) => (
                        <div key={group.title}>
                            {group.items.map((item) => (
                                <Command.Item
                                    key={item.href}
                                    value={item.title}
                                    onSelect={() =>
                                        runCommand(() =>
                                            router.push(item.href)
                                        )
                                    }
                                    className="
                                        group
                                        flex items-center gap-3
                                        px-3 py-2
                                        rounded-lg
                                        text-sm
                                        cursor-pointer
                                        transition-all
                                        hover:bg-black/5 dark:hover:bg-white/10
                                        aria-selected:bg-black/10
                                        dark:aria-selected:bg-white/15
                                    "
                                >
                                    <Book className="h-4 w-4 text-neutral-500" />

                                    <span>{item.title}</span>

                                    <span className="ml-auto text-xs text-neutral-400">
                                        {group.title}
                                    </span>
                                </Command.Item>
                            ))}
                        </div>
                    ))}
                </Command.Group>

                <Command.Separator className="my-3 h-px bg-black/5 dark:bg-white/10" />

                {/* Theme */}
                <Command.Group
                    heading="Theme"
                    className="px-2 text-xs text-neutral-500 font-medium"
                >
                    <ThemeItem
                        label="Light"
                        icon={Sun}
                        onClick={() => setTheme("light")}
                        run={runCommand}
                    />

                    <ThemeItem
                        label="Dark"
                        icon={Moon}
                        onClick={() => setTheme("dark")}
                        run={runCommand}
                    />

                    <ThemeItem
                        label="System"
                        icon={Laptop}
                        onClick={() => setTheme("system")}
                        run={runCommand}
                    />
                </Command.Group>
            </Command.List>

            {/* Footer */}
            <div
                className="
                    border-t border-black/5 dark:border-white/10
                    px-3 py-2
                    bg-white/30 dark:bg-black/30
                "
            >
                <p className="text-[11px] text-center text-neutral-500">
                    ⌘ K — Smart Command Palette
                </p>
            </div>
        </Command.Dialog>
    );
}

/* Reusable Theme Item */
function ThemeItem({
    label,
    icon: Icon,
    onClick,
    run,
}: {
    label: string;
    icon: any;
    onClick: () => void;
    run: (fn: () => void) => void;
}) {
    return (
        <Command.Item
            value={label}
            onSelect={() => run(onClick)}
            className="
                flex items-center gap-3
                px-3 py-2
                rounded-lg
                text-sm
                cursor-pointer
                transition-all
                hover:bg-black/5 dark:hover:bg-white/10
                aria-selected:bg-black/10
                dark:aria-selected:bg-white/15
            "
        >
            <Icon className="h-4 w-4 text-neutral-500" />
            <span>{label}</span>
        </Command.Item>
    );
}
