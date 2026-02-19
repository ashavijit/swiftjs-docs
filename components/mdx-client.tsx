"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

export const Tabs = ({ children, items = [] }: { children: any, items?: string[] }) => {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const childArray = React.Children.toArray(children);
    
    return (
        <div className="my-6 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden bg-white dark:bg-neutral-900 shadow-sm text-left">
            {items && items.length > 0 && (
                <div className="flex border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/20 overflow-x-auto no-scrollbar">
                    {items.map((item, i) => (
                        <button
                            key={item}
                            onClick={() => setActiveIndex(i)}
                            className={cn(
                                "px-6 py-3 text-sm font-medium transition-all relative whitespace-nowrap",
                                activeIndex === i 
                                    ? "text-blue-600 dark:text-blue-400" 
                                    : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200"
                            )}
                        >
                            {item}
                            {activeIndex === i && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
                            )}
                        </button>
                    ))}
                </div>
            )}
            <div className="p-0 prose-pre:my-0 prose-pre:rounded-none">
                {childArray[activeIndex] || childArray[0]}
            </div>
        </div>
    );
};

export const Tab = ({ children }: any) => <div>{children}</div>;

export const Steps = ({ children }: any) => (
    <div className="my-8 ml-4 border-l border-neutral-200 dark:border-neutral-800 space-y-8">
        {children}
    </div>
);

export const Step = ({ title, children, number }: { title: string, children: any, number?: string }) => (
    <div className="relative pl-8 text-left">
        <div className="absolute -left-[13px] top-0 w-6 h-6 rounded-full bg-white dark:bg-neutral-900 border-2 border-blue-600 dark:border-blue-400 flex items-center justify-center">
            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">{number}</span>
        </div>
        <h4 className="font-serif text-lg font-medium mb-2 text-black dark:text-white mt-0">{title}</h4>
        <div className="text-neutral-700 dark:text-neutral-300 space-y-2 prose-p:my-0">{children}</div>
    </div>
);
