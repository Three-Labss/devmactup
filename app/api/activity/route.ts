import { NextRequest, NextResponse } from "next/server";
import { getSwipesByUser, getProfile } from "@/lib/mock-data";

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

    // Get all swipes by this user
    const swipes = getSwipesByUser(userId);

    // Separate likes and passes
    const likes: Array<{ profile: any; direction: string; timestamp: number }> = [];
    const passes: Array<{ profile: any; direction: string; timestamp: number }> = [];

    for (const swipe of swipes) {
      const profile = getProfile(swipe.swiped_id);
      if (profile) {
        if (swipe.direction === "right") {
          likes.push({
            profile,
            direction: swipe.direction,
            timestamp: swipe.timestamp,
          });
        } else {
          passes.push({
            profile,
            direction: swipe.direction,
            timestamp: swipe.timestamp,
          });
        }
      }
    }

    // Sort by timestamp (newest first)
    likes.sort((a, b) => b.timestamp - a.timestamp);
    passes.sort((a, b) => b.timestamp - a.timestamp);

    return NextResponse.json({
      success: true,
      likes,
      passes,
      total: swipes.length,
    });
  } catch (error) {
    console.error("Get activity error:", error);
    return NextResponse.json(
      { error: "Failed to get activity" },
      { status: 500 }
    );
  }
}

