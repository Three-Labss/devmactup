import { type NextRequest, NextResponse } from "next/server";
import { getProfiles, getSwipedIds } from "@/lib/mock-data";

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

    // Get swiped profile IDs for this user
    const swipedIds = getSwipedIds(userId);

    // Get available profiles (excluding current user and already swiped)
    const availableProfiles = getProfiles(userId, swipedIds);

    return NextResponse.json({
      success: true,
      profiles: availableProfiles,
      count: availableProfiles.length,
    });
  } catch (error) {
    console.error("Get profiles error:", error);
    return NextResponse.json(
      { error: "Failed to get profiles" },
      { status: 500 }
    );
  }
}
