import { type NextRequest, NextResponse } from "next/server";
import { getMatches, getProfile } from "@/lib/mock-data";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    // Get all matches for this user
    const matches = getMatches(userId);

    // Enrich matches with profile information
    const enrichedMatches = matches.map((match) => {
      const otherUserId =
        match.user1_id === userId ? match.user2_id : match.user1_id;
      const otherProfile = getProfile(otherUserId);

      return {
        id: match.id,
        matchId: match.id,
        createdAt: match.created_at,
        profile: otherProfile || null,
      };
    });

    return NextResponse.json({
      success: true,
      matches: enrichedMatches,
      count: enrichedMatches.length,
    });
  } catch (error) {
    console.error("Get matches error:", error);
    return NextResponse.json(
      { error: "Failed to get matches" },
      { status: 500 }
    );
  }
}
