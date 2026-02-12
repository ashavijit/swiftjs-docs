import Link from "next/link";
import { Twitter, Github, Linkedin, Slack, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full bg-white dark:bg-black border-t border-neutral-100 dark:border-neutral-900 py-20 px-6 mt-auto">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 lg:gap-8 mb-20">
                    {/* Brand Section */}
                    <div className="col-span-2 lg:col-span-2">
                        <Link href="/" className="inline-flex items-center gap-2.5 mb-6 group">
                            <div className="relative h-8 w-8 overflow-hidden rounded-lg border border-neutral-200/50 dark:border-neutral-800/50 bg-white dark:bg-neutral-900 shadow-sm transition-transform group-hover:scale-105">
                                <img
                                    src="/image.ico"
                                    alt="SwiftJS Logo"
                                    className="h-full w-full object-contain p-1"
                                />
                            </div>
                            <span className="font-serif text-xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
                                SwiftJS
                            </span>
                        </Link>
                        <p className="text-neutral-500 dark:text-neutral-400 max-w-xs leading-relaxed mb-8">
                            High-performance API infrastructure for the modern web. Built for speed, security, and developer joy.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="https://twitter.com" className="p-2 rounded-lg text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="https://github.com" className="p-2 rounded-lg text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="https://discord.com" className="p-2 rounded-lg text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all">
                                <Slack className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Columns */}
                    <div>
                        <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-neutral-900 dark:text-white mb-8">Framework</h4>
                        <ul className="space-y-4 text-sm text-neutral-500 dark:text-neutral-400">
                            <li><Link href="/docs" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Documentation</Link></li>
                            <li><Link href="/docs/guide/introduction" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Get Started</Link></li>
                            <li><Link href="/docs/api/reference" className="hover:text-neutral-900 dark:hover:text-white transition-colors">API Reference</Link></li>
                            <li><Link href="/changelog" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Changelog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-neutral-900 dark:text-white mb-8">Ecosystem</h4>
                        <ul className="space-y-4 text-sm text-neutral-500 dark:text-neutral-400">
                            <li><Link href="/showcase" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Showcase</Link></li>
                            <li><Link href="/plugins" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Plugins</Link></li>
                            <li><Link href="/templates" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Templates</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-neutral-900 dark:text-white mb-8">Community</h4>
                        <ul className="space-y-4 text-sm text-neutral-500 dark:text-neutral-400">
                            <li><Link href="https://github.com" className="hover:text-neutral-900 dark:hover:text-white transition-colors">GitHub</Link></li>
                            <li><Link href="https://discord.com" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Discord</Link></li>
                            <li><Link href="https://twitter.com" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Twitter</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-neutral-900 dark:text-white mb-8">Company</h4>
                        <ul className="space-y-4 text-sm text-neutral-500 dark:text-neutral-400">
                            <li><Link href="/about" className="hover:text-neutral-900 dark:hover:text-white transition-colors">About</Link></li>
                            <li><Link href="/blog" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Blog</Link></li>
                            <li><Link href="/privacy" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-12 border-t border-neutral-100 dark:border-neutral-900">
                    <div className="flex items-center gap-6 text-xs text-neutral-400 font-medium">
                        <p>© {new Date().getFullYear()} SwiftJS Inc.</p>
                        <Link href="/terms" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Terms of Service</Link>
                    </div>

                    <div className="text-xs text-neutral-400 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        All systems operational
                    </div>
                </div>
            </div>
        </footer>
    );
}
