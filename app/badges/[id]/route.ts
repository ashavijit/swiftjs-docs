import { NextRequest, NextResponse } from "next/server";
import { BADGES } from "@/lib/badges";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const badge = BADGES.find(b => b.id === id);

    if (!badge) {
        return new NextResponse("Badge not found", { status: 404 });
    }

    return new NextResponse(badge.svg, {
        headers: {
            "Content-Type": "image/svg+xml",
            "Cache-Control": "public, max-age=31536000, immutable",
        },
    });
}
