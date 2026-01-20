import { Sidebar, MobileSidebar } from "@/components/sidebar";

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex gap-10 py-10">
                {/* Desktop sidebar */}
                <Sidebar className="hidden lg:block" />

                {/* Main content */}
                <main className="min-w-0 flex-1">
                    {children}
                </main>
            </div>

            {/* Mobile sidebar FAB */}
            <MobileSidebar />
        </div>
    );
}
