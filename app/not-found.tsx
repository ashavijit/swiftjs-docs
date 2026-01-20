import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 text-center">
            <div className="relative z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl -z-10" />

                <h1 className="font-serif text-8xl sm:text-9xl font-medium tracking-tight bg-gradient-to-r from-black/50 to-black/20 dark:from-white/50 dark:to-white/20 bg-clip-text text-transparent">
                    404
                </h1>
            </div>

            <h2 className="mt-8 font-serif text-3xl sm:text-4xl font-medium text-black dark:text-white">
                Page not found
            </h2>

            <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
                Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
            </p>

            <div className="mt-10">
                <Link
                    href="/"
                    className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-black dark:bg-white text-white dark:text-black font-medium hover:opacity-90 transition-all hover:scale-[1.02]"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
