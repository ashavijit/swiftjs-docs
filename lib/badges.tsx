import React from "react";
import { Box, Shield, Zap, Lock, Globe, Terminal, Cpu, Sparkles, Check } from "lucide-react";

export type BadgeStyle = {
    id: string;
    name: string;
    render: (active: boolean) => React.ReactNode;
    code: string;
    svg: string;
};

export const BAD_LINKS_BASE = "/badges/";

export const BADGES: BadgeStyle[] = [
    {
        id: "classic-solid",
        name: "Classic Solid",
        render: (a) => (
            <div className="flex items-center h-7 rounded border border-neutral-900 bg-neutral-900 overflow-hidden">
                <div className="px-2 text-[10px] font-black uppercase tracking-widest text-white/50 border-r border-white/10 h-full flex items-center bg-white/5">Built with</div>
                <div className="px-2 text-[10px] font-black uppercase tracking-widest text-white h-full flex items-center">SwiftJS</div>
            </div>
        ),
        code: '<div style="display:inline-flex;align-items:center;height:28px;border-radius:4px;border:1px solid #171717;background:#171717;overflow:hidden;font-family:sans-serif;"><span style="padding:0 8px;color:rgba(255,255,255,0.5);font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:0.1em;border-right:1px solid rgba(255,255,255,0.1);height:100%;display:flex;align-items:center;background:rgba(255,255,255,0.05);">Built with</span><span style="padding:0 8px;color:#fff;font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:0.1em;height:100%;display:flex;align-items:center;">SwiftJS</span></div>',
        svg: `<svg width="140" height="28" viewBox="0 0 140 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="140" height="28" rx="4" fill="#171717"/>
            <rect width="80" height="28" fill="white" fill-opacity="0.05"/>
            <line x1="80" y1="0" x2="80" y2="28" stroke="white" stroke-opacity="0.1"/>
            <text x="40" y="18" text-anchor="middle" fill="white" fill-opacity="0.5" style="font-family:sans-serif;font-weight:900;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;">BUILT WITH</text>
            <text x="110" y="18" text-anchor="middle" fill="white" style="font-family:sans-serif;font-weight:900;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;">SWIFTJS</text>
        </svg>`
    },
    {
        id: "modern-mono",
        name: "Modern Mono",
        render: (a) => (
            <div className="flex items-center h-8 rounded-full border border-neutral-200 dark:border-white/10 bg-white dark:bg-black px-4 gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                <span className="text-[11px] font-bold tracking-tight text-neutral-900 dark:text-white">Built with SwiftJS</span>
            </div>
        ),
        code: '<div style="display:inline-flex;align-items:center;height:32px;border-radius:9999px;border:1px solid #e5e7eb;background:#fff;padding:0 16px;gap:8px;font-family:sans-serif;"><div style="width:6px;height:6px;border-radius:9999px;background:#6366f1;"></div><span style="font-size:11px;font-weight:700;color:#171717;">Built with SwiftJS</span></div>',
        svg: `<svg width="150" height="32" viewBox="0 0 150 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="149" height="31" rx="15.5" fill="white" stroke="#E5E7EB"/>
            <circle cx="20" cy="16" r="3" fill="#6366F1"/>
            <text x="32" y="20.5" fill="#171717" style="font-family:sans-serif;font-weight:700;font-size:11px;">Built with SwiftJS</text>
        </svg>`
    },
    {
        id: "glass-glow",
        name: "Glass Glow",
        render: (a) => (
            <div className="flex items-center h-8 rounded-lg bg-neutral-100/50 dark:bg-white/5 backdrop-blur-md border border-neutral-200/50 dark:border-white/10 px-3 gap-2">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-300">Fast with SwiftJS</span>
            </div>
        ),
        code: '<div style="display:inline-flex;align-items:center;height:32px;border-radius:8px;background:rgba(255,255,255,0.05);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.1);padding:0 12px;gap:8px;font-family:sans-serif;"><span style="font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:0.2em;color:rgba(255,255,255,0.7);">Fast with SwiftJS</span></div>',
        svg: `<svg width="160" height="32" viewBox="0 0 160 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="159" height="31" rx="7.5" fill="#171717" stroke="white" stroke-opacity="0.1"/>
            <path d="M15 11L16.5 14L19.5 15.5L16.5 17L15 20L13.5 17L10.5 15.5L13.5 14L15 11Z" fill="#6366F1"/>
            <text x="30" y="20" fill="white" fill-opacity="0.7" style="font-family:sans-serif;font-weight:900;font-size:10px;text-transform:uppercase;letter-spacing:0.2em;">Fast with SwiftJS</text>
        </svg>`
    },
    {
        id: "retro-dot",
        name: "Retro Dot",
        render: (a) => (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded border-2 border-neutral-900 dark:border-white bg-white dark:bg-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)]">
                <div className="w-2 h-2 bg-neutral-900 dark:bg-white" />
                <span className="text-[10px] font-black uppercase tracking-wider text-neutral-900 dark:text-white">Powered by SwiftJS</span>
            </div>
        ),
        code: '<div style="display:inline-flex;align-items:center;gap:6px;padding:4px 12px;border:2px solid #000;background:#fff;box-shadow:3px 3px 0px 0px #000;font-family:sans-serif;"><div style="width:8px;height:8px;background:#000;"></div><span style="font-size:10px;font-weight:900;text-transform:uppercase;color:#000;">Powered by SwiftJS</span></div>',
        svg: `<svg width="160" height="36" viewBox="0 0 160 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="150" height="28" fill="white" stroke="black" stroke-width="2"/>
            <rect x="5" y="5" width="150" height="28" fill="black" fill-opacity="0.1"/>
            <rect x="12" y="12" width="8" height="8" fill="black"/>
            <text x="28" y="21" fill="black" style="font-family:sans-serif;font-weight:900;font-size:10px;text-transform:uppercase;letter-spacing:0.05em;">Powered by SwiftJS</text>
            <path d="M5 32H155V35H5V32Z" fill="black"/>
            <path d="M152 5H155V35H152V5Z" fill="black"/>
        </svg>`
    },
    {
        id: "minimal-slim",
        name: "Minimal Slim",
        render: (a) => (
            <div className="flex items-center gap-3">
                <div className="w-8 h-[1px] bg-neutral-300 dark:bg-white/20" />
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-neutral-400 dark:text-neutral-500 hover:text-indigo-500 transition-colors cursor-default">SwiftJS Engine</span>
            </div>
        ),
        code: '<div style="display:inline-flex;align-items:center;gap:12px;font-family:sans-serif;"><div style="width:32px;height:1px;background:#d1d5db;"></div><span style="font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:0.4em;color:#9ca3af;">SwiftJS Engine</span></div>',
        svg: `<svg width="180" height="20" viewBox="0 0 180 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="10" x2="32" y2="10" stroke="#D1D5DB"/>
            <text x="44" y="13" fill="#9CA3AF" style="font-family:sans-serif;font-weight:900;font-size:9px;text-transform:uppercase;letter-spacing:0.4em;">SwiftJS Engine</text>
        </svg>`
    },
    {
        id: "stealth-inverted",
        name: "Stealth Inverted",
        render: (a) => (
            <div className="flex items-center h-7 rounded bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-white/5 py-1 px-2.5 gap-2 shadow-sm">
                <Terminal className="w-3.5 h-3.5 text-neutral-400" />
                <span className="text-[11px] font-medium text-neutral-900 dark:text-neutral-100">built.swiftjs.com</span>
            </div>
        ),
        code: '<div style="display:inline-flex;align-items:center;height:28px;border-radius:4px;background:#fff;border:1px solid #f5f5f5;padding:0 10px;gap:8px;font-family:sans-serif;"><span style="font-size:11px;font-weight:500;color:#171717;">built.swiftjs.com</span></div>',
        svg: `<svg width="130" height="28" viewBox="0 0 130 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="129" height="27" rx="3.5" fill="white" stroke="#F5F5F5"/>
            <path d="M12 9V19M8 12H16" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round"/>
            <text x="25" y="18" fill="#171717" style="font-family:sans-serif;font-weight:500;font-size:11px;">built.swiftjs.com</text>
        </svg>`
    },
    {
        id: "dev-tag",
        name: "Dev Tag",
        render: (a) => (
            <div className="flex items-center h-6 rounded border border-neutral-200 dark:border-white/10 overflow-hidden">
                <div className="bg-neutral-100 dark:bg-white/5 px-2 text-[9px] font-bold text-neutral-500 h-full flex items-center">built-with</div>
                <div className="bg-white dark:bg-black px-2 text-[9px] font-bold text-neutral-900 dark:text-white h-full flex items-center">swiftjs</div>
            </div>
        ),
        code: '<div style="display:inline-flex;align-items:center;height:24px;border-radius:4px;border:1px solid #e5e7eb;overflow:hidden;font-family:sans-serif;"><span style="background:#f3f4f6;padding:0 8px;font-size:9px;font-weight:700;color:#6b7280;height:100%;display:flex;align-items:center;">built-with</span><span style="background:#fff;padding:0 8px;font-size:9px;font-weight:700;color:#171717;height:100%;display:flex;align-items:center;">swiftjs</span></div>',
        svg: `<svg width="100" height="24" viewBox="0 0 100 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="99" height="23" rx="3.5" stroke="#E5E7EB" fill="white"/>
            <rect x="0.5" y="0.5" width="50" height="23" rx="3.5" fill="#F3F4F6"/>
            <text x="25" y="15" text-anchor="middle" fill="#6B7280" style="font-family:sans-serif;font-weight:700;font-size:9px;">built-with</text>
            <text x="75" y="15" text-anchor="middle" fill="#171717" style="font-family:sans-serif;font-weight:700;font-size:9px;">swiftjs</text>
        </svg>`
    },
    {
        id: "brutalist-block",
        name: "Brutalist Block",
        render: (a) => (
            <div className="bg-neutral-900 dark:bg-white px-4 py-1.5 inline-flex items-center gap-3">
                <Box className="w-4 h-4 text-white dark:text-black" />
                <span className="text-xs font-black uppercase italic tracking-tighter text-white dark:text-black">SwiftJS Only</span>
            </div>
        ),
        code: '<div style="background:#171717;padding:6px 16px;display:inline-flex;align-items:center;gap:12px;font-family:sans-serif;"><span style="font-size:12px;font-weight:900;text-transform:uppercase;font-style:italic;letter-spacing:-0.05em;color:#fff;">SwiftJS Only</span></div>',
        svg: `<svg width="120" height="32" viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="120" height="32" fill="#171717"/>
            <text x="60" y="21" text-anchor="middle" fill="white" style="font-family:sans-serif;font-weight:900;font-size:12px;text-transform:uppercase;font-style:italic;letter-spacing:-0.05em;">SwiftJS Only</text>
        </svg>`
    },
    {
        id: "pixel-perfect",
        name: "Pixel Perfect",
        render: (a) => (
            <div className="h-6 flex items-center border border-neutral-900 bg-neutral-900 p-[1px]">
                <div className="bg-white px-2 h-full flex items-center">
                    <span className="text-[10px] font-bold text-neutral-900">SWIFTJS</span>
                </div>
                <div className="px-2 h-full flex items-center">
                    <span className="text-[10px] font-bold text-white">READY</span>
                </div>
            </div>
        ),
        code: '<div style="height:24px;display:inline-flex;align-items:center;border:1px solid #171717;background:#171717;padding:1px;font-family:sans-serif;"><div style="background:#fff;padding:0 8px;height:100%;display:flex;align-items:center;"><span style="font-size:10px;font-weight:700;color:#171717;">SWIFTJS</span></div><div style="padding:0 8px;height:100%;display:flex;align-items:center;"><span style="font-size:10px;font-weight:700;color:#fff;">READY</span></div></div>',
        svg: `<svg width="112" height="24" viewBox="0 0 112 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="112" height="24" fill="#171717"/>
            <rect x="1" y="1" width="55" height="22" fill="white"/>
            <text x="28.5" y="15" text-anchor="middle" fill="#171717" style="font-family:sans-serif;font-weight:700;font-size:10px;">SWIFTJS</text>
            <text x="83.5" y="15" text-anchor="middle" fill="white" style="font-family:sans-serif;font-weight:700;font-size:10px;">READY</text>
        </svg>`
    },
    {
        id: "gradient-text",
        name: "Gradient Ghost",
        render: (a) => (
            <div className="flex items-center gap-2 group cursor-default">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-200 dark:bg-white/20 group-hover:bg-indigo-500 transition-colors" />
                <span className="text-[11px] font-black uppercase tracking-widest text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors">Built on SwiftJS</span>
            </div>
        ),
        code: '<div style="display:inline-flex;align-items:center;gap:8px;font-family:sans-serif;"><div style="width:6px;height:6px;border-radius:9999px;background:#e5e7eb;"></div><span style="font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:0.1em;color:#9ca3af;">Built on SwiftJS</span></div>',
        svg: `<svg width="150" height="20" viewBox="0 0 150 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="6" cy="10" r="3" fill="#E5E7EB"/>
            <text x="18" y="14" fill="#9CA3AF" style="font-family:sans-serif;font-weight:900;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Built on SwiftJS</text>
        </svg>`
    },
    {
        id: "badge-outline",
        name: "Outline Chic",
        render: (a) => (
            <div className="px-3 py-1 rounded-full border border-neutral-900 dark:border-white inline-flex items-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-900 dark:text-white">Built with SwiftJS</span>
            </div>
        ),
        code: '<div style="padding:4px 12px;border-radius:9999px;border:1px solid #171717;display:inline-flex;align-items:center;font-family:sans-serif;"><span style="font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:0.1em;color:#171717;">Built with SwiftJS</span></div>',
        svg: `<svg width="140" height="28" viewBox="0 0 140 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="138" height="26" rx="13" stroke="#171717" stroke-width="2"/>
            <text x="70" y="18" text-anchor="middle" fill="#171717" style="font-family:sans-serif;font-weight:900;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;">Built with SwiftJS</text>
        </svg>`
    },
    {
        id: "monocle-tag",
        name: "Monocle Tag",
        render: (a) => (
            <div className="flex items-center h-6 overflow-hidden">
                <div className="w-1 h-full bg-indigo-500" />
                <div className="bg-neutral-100 dark:bg-white/5 px-3 h-full flex items-center">
                    <span className="text-[10px] font-black uppercase tracking-tight text-neutral-500 dark:text-neutral-400">Project SwiftJS</span>
                </div>
            </div>
        ),
        code: '<div style="display:inline-flex;height:24px;overflow:hidden;font-family:sans-serif;"><div style="width:4px;background:#6366f1;"></div><div style="background:#f3f4f6;padding:0 12px;display:flex;align-items:center;"><span style="font-size:10px;font-weight:900;text-transform:uppercase;color:#6b7280;">Project SwiftJS</span></div></div>',
        svg: `<svg width="120" height="24" viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="4" height="24" fill="#6366F1"/>
            <rect x="4" width="116" height="24" fill="#F3F4F6"/>
            <text x="62" y="16" text-anchor="middle" fill="#6B7280" style="font-family:sans-serif;font-weight:900;font-size:10px;text-transform:uppercase;">Project SwiftJS</text>
        </svg>`
    },
    {
        id: "slash-badge",
        name: "Slash Badge",
        render: (a) => (
            <div className="flex items-center gap-1">
                <span className="text-xl font-thin text-neutral-300 dark:text-white/20">/</span>
                <span className="text-[11px] font-black text-neutral-900 dark:text-white uppercase tracking-tighter">Powered.SwiftJS</span>
            </div>
        ),
        code: '<div style="display:inline-flex;align-items:center;gap:4px;font-family:sans-serif;"><span style="font-size:20px;font-weight:100;color:#d1d5db;">/</span><span style="font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:-0.05em;color:#171717;">Powered.SwiftJS</span></div>',
        svg: `<svg width="130" height="24" viewBox="0 0 130 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text x="5" y="19" fill="#D1D5DB" style="font-family:sans-serif;font-weight:100;font-size:20px;">/</text>
            <text x="20" y="17" fill="#171717" style="font-family:sans-serif;font-weight:900;font-size:11px;text-transform:uppercase;letter-spacing:-0.05em;">Powered.SwiftJS</text>
        </svg>`
    },
    {
        id: "box-label",
        name: "Box Label",
        render: (a) => (
            <div className="flex flex-col items-start leading-none group">
                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-neutral-400 mb-1 group-hover:text-indigo-500 transition-colors">Framework</span>
                <span className="text-xs font-black text-neutral-900 dark:text-white">Built with SwiftJS</span>
            </div>
        ),
        code: '<div style="display:inline-flex;flex-direction:column;font-family:sans-serif;"><span style="font-size:8px;font-weight:900;text-transform:uppercase;letter-spacing:0.3em;color:#9ca3af;margin-bottom:4px;">Framework</span><span style="font-size:12px;font-weight:900;color:#171717;">Built with SwiftJS</span></div>',
        svg: `<svg width="120" height="30" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text x="0" y="8" fill="#9CA3AF" style="font-family:sans-serif;font-weight:900;font-size:8px;text-transform:uppercase;letter-spacing:0.3em;">FRAMEWORK</text>
            <text x="0" y="24" fill="#171717" style="font-family:sans-serif;font-weight:900;font-size:12px;">Built with SwiftJS</text>
        </svg>`
    },
    {
        id: "tiny-pill",
        name: "Tiny Pill",
        render: (a) => (
            <div className="h-5 rounded-full bg-neutral-900 dark:bg-white px-2.5 flex items-center justify-center">
                <span className="text-[8px] font-black text-white dark:text-black uppercase tracking-widest">SwiftJS 1.0</span>
            </div>
        ),
        code: '<div style="display:inline-flex;height:20px;border-radius:9999px;background:#171717;padding:0 10px;align-items:center;font-family:sans-serif;"><span style="font-size:8px;font-weight:900;color:#fff;text-transform:uppercase;letter-spacing:0.1em;">SwiftJS 1.0</span></div>',
        svg: `<svg width="80" height="20" viewBox="0 0 80 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="80" height="20" rx="10" fill="#171717"/>
            <text x="40" y="13" text-anchor="middle" fill="white" style="font-family:sans-serif;font-weight:900;font-size:8px;text-transform:uppercase;letter-spacing:0.1em;">SwiftJS 1.0</text>
        </svg>`
    },
    {
        id: "bracket-tag",
        name: "Bracket Tag",
        render: (a) => (
            <div className="flex items-center gap-1 font-mono">
                <span className="text-neutral-400">[</span>
                <span className="text-[10px] font-black text-neutral-900 dark:text-white uppercase">SwiftJS</span>
                <span className="text-neutral-400">]</span>
            </div>
        ),
        code: '<div style="display:inline-flex;align-items:center;gap:4px;font-family:monospace;"><span style="color:#9ca3af;">[</span><span style="font-size:10px;font-weight:900;text-transform:uppercase;color:#171717;">SwiftJS</span><span style="color:#9ca3af;">]</span></div>',
        svg: `<svg width="70" height="20" viewBox="0 0 70 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text x="5" y="14" fill="#9CA3AF" style="font-family:monospace;font-size:12px;">[</text>
            <text x="15" y="14" fill="#171717" style="font-family:sans-serif;font-weight:900;font-size:10px;text-transform:uppercase;">SwiftJS</text>
            <text x="60" y="14" fill="#9CA3AF" style="font-family:monospace;font-size:12px;">]</text>
        </svg>`
    },
    {
        id: "check-badge",
        name: "Verified Badge",
        render: (a) => (
            <div className="flex items-center gap-2 h-7 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200/50 dark:border-emerald-500/20 px-2 rounded-lg">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">SwiftJS Verified</span>
            </div>
        ),
        code: '<div style="display:inline-flex;align-items:center;height:28px;background:#ecfdf5;border:1px solid rgba(16,185,129,0.2);padding:0 8px;border-radius:8px;gap:8px;font-family:sans-serif;"><span style="font-size:10px;font-weight:700;color:#047857;text-transform:uppercase;">SwiftJS Verified</span></div>',
        svg: `<svg width="130" height="28" viewBox="0 0 130 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="130" height="28" rx="8" fill="#ECFDF5" stroke="#10B981" stroke-opacity="0.2"/>
            <path d="M12 14L15 17L20 12" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <text x="28" y="18" fill="#047857" style="font-family:sans-serif;font-weight:700;font-size:10px;text-transform:uppercase;">SwiftJS Verified</text>
        </svg>`
    },
    {
        id: "dot-minimal",
        name: "Dot Minimal",
        render: (a) => (
            <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-neutral-900 dark:bg-white" />
                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-900 dark:text-white">Built by SwiftJS</span>
            </div>
        ),
        code: '<div style="display:inline-flex;align-items:center;gap:8px;font-family:sans-serif;"><div style="width:4px;height:4px;border-radius:9999px;background:#171717;"></div><span style="font-size:10px;font-weight:900;text-transform:uppercase;letter-spacing:0.1em;color:#171717;">Built by SwiftJS</span></div>',
        svg: `<svg width="120" height="20" viewBox="0 0 120 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="5" cy="10" r="2" fill="#171717"/>
            <text x="15" y="14" fill="#171717" style="font-family:sans-serif;font-weight:900;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;">Built by SwiftJS</text>
        </svg>`
    },
    {
        id: "shield-badge",
        name: "Secure Shield",
        render: (a) => (
            <div className="flex items-center h-8 rounded-lg border border-neutral-200 dark:border-white/10 overflow-hidden shadow-sm">
                <div className="w-8 h-full bg-neutral-900 dark:bg-white flex items-center justify-center shrink-0">
                    <Lock className="w-3.5 h-3.5 text-white dark:text-black" />
                </div>
                <div className="px-3">
                    <span className="text-[10px] font-black text-neutral-900 dark:text-white uppercase tracking-tighter italic">SwiftJS Enforced</span>
                </div>
            </div>
        ),
        code: '<div style="display:inline-flex;height:32px;border-radius:8px;border:1px solid #e5e7eb;overflow:hidden;align-items:center;font-family:sans-serif;"><div style="width:32px;height:100%;background:#171717;display:flex;align-items:center;justify-center;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></div><div style="padding:0 12px;"><span style="font-size:10px;font-weight:900;text-transform:uppercase;font-style:italic;color:#171717;">SwiftJS Enforced</span></div></div>',
        svg: `<svg width="140" height="32" viewBox="0 0 140 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="139" height="31" rx="7.5" fill="white" stroke="#E5E7EB"/>
            <rect width="32" height="32" rx="0" fill="#171717"/>
            <path d="M12 18V14C12 12.8954 12.8954 12 14 12C15.1046 12 16 12.8954 16 14V18" stroke="white" stroke-width="1.5"/>
            <rect x="11" y="18" width="6" height="4" rx="1" fill="white"/>
            <text x="44" y="20" fill="#171717" style="font-family:sans-serif;font-weight:900;font-size:10px;text-transform:uppercase;font-style:italic;letter-spacing:-0.05em;">SwiftJS Enforced</text>
        </svg>`
    },
    {
        id: "modern-box",
        name: "Modern Box",
        render: (a) => (
            <div className="flex flex-col border-l-2 border-neutral-900 dark:border-white pl-3 py-0.5">
                <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">Powered by</span>
                <span className="text-xs font-black text-neutral-900 dark:text-white uppercase tracking-tighter leading-none">SwiftJS Engine</span>
            </div>
        ),
        code: '<div style="display:inline-flex;flex-direction:column;border-left:2px solid #171717;padding-left:12px;font-family:sans-serif;"><span style="font-size:9px;font-weight:700;text-transform:uppercase;color:#9ca3af;letter-spacing:0.1em;">Powered by</span><span style="font-size:12px;font-weight:900;text-transform:uppercase;color:#171717;margin-top:2px;">SwiftJS Engine</span></div>',
        svg: `<svg width="120" height="32" viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="2" height="32" fill="#171717"/>
            <text x="12" y="12" fill="#9CA3AF" style="font-family:sans-serif;font-weight:700;font-size:9px;text-transform:uppercase;letter-spacing:0.1em;">Powered by</text>
            <text x="12" y="26" fill="#171717" style="font-family:sans-serif;font-weight:900;font-size:12px;text-transform:uppercase;letter-spacing:-0.05em;">SwiftJS Engine</text>
        </svg>`
    }
];
