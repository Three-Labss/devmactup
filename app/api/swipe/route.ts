import { type NextRequest, NextResponse } from "next/server";
import { addSwipe, createMatchIfMutual, getProfile } from "@/lib/mock-data";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { swiperId, swipedId, direction } = body;

    if (!swiperId || !swipedId || !direction) {
      return NextResponse.json(
        { error: "swiperId, swipedId, and direction are required" },
        { status: 400 }
      );
    }

    if (direction !== "left" && direction !== "right") {
      return NextResponse.json(
        { error: "direction must be 'left' or 'right'" },
        { status: 400 }
      );
    }

    // Validate that profiles exist
    const swiperProfile = getProfile(swiperId);
    const swipedProfile = getProfile(swipedId);

    if (!swiperProfile) {
      console.error(`Swiper profile not found: ${swiperId}`);
      return NextResponse.json(
        { error: "Tu perfil no existe. Por favor, completa el onboarding primero." },
        { status: 404 }
      );
    }

    if (!swipedProfile) {
      console.error(`Swiped profile not found: ${swipedId}`);
      return NextResponse.json(
        { error: "Perfil no encontrado" },
        { status: 404 }
      );
    }

    // Add swipe
    addSwipe({
      swiper_id: swiperId,
      swiped_id: swipedId,
      direction: direction as "left" | "right",
      timestamp: Date.now(),
    });

    // Check for mutual swipe (match)
    let match = null;
    if (direction === "right") {
      match = createMatchIfMutual(swiperId, swipedId);
    }

    return NextResponse.json({
      success: true,
      match: match
        ? {
            id: match.id,
            profile: swipedProfile,
          }
        : null,
    });
  } catch (error) {
    console.error("Swipe error:", error);
    return NextResponse.json(
      { error: "Failed to process swipe" },
      { status: 500 }
    );
  }
}
