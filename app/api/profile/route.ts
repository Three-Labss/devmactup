import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { Profile } from "@/lib/mock-data";
import { addProfile, getProfile, updateProfile } from "@/lib/mock-data";

export const runtime = "nodejs";

// POST - Create/activate profile
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { profile, userId } = body;

    if (!profile || !userId) {
      return NextResponse.json(
        { error: "Profile data and userId are required" },
        { status: 400 }
      );
    }

    // Create full profile object
    const fullProfile: Profile = {
      id: userId,
      name: profile.name,
      headline: profile.headline,
      skills: profile.skills || [],
      experience_years: profile.experience_years || 0,
      industry: profile.industry || "",
      bio: profile.bio || "",
      contact: profile.contact,
      looking_for: profile.looking_for || [],
      offering: profile.offering || [],
      created_at: Date.now(),
    };

    addProfile(fullProfile);

    return NextResponse.json({
      success: true,
      profile: fullProfile,
    });
  } catch (error) {
    console.error("Profile creation error:", error);
    return NextResponse.json(
      { error: "Failed to create profile" },
      { status: 500 }
    );
  }
}

// PATCH - Update profile
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, updates } = body;

    if (!userId || !updates) {
      return NextResponse.json(
        { error: "UserId and updates are required" },
        { status: 400 }
      );
    }

    const existing = getProfile(userId);
    if (!existing) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    updateProfile(userId, updates);

    return NextResponse.json({
      success: true,
      profile: getProfile(userId),
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
