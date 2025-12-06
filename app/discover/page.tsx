"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import React from "react";
import { SwipeCard } from "@/components/swipe-card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import type { Profile } from "@/lib/mock-data";

export default function DiscoverPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const swipeHandlerRef = React.useRef<((direction: "left" | "right") => void) | null>(null);

  // Get user ID from sessionStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = sessionStorage.getItem("userId");
      if (!id) {
        router.push("/onboarding");
        return;
      }
      setUserId(id);
    }
  }, [router]);

  // Load profiles
  useEffect(() => {
    if (!userId) return;

    const loadProfiles = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/profiles?userId=${userId}`);
        if (!response.ok) {
          throw new Error("Failed to load profiles");
        }

        const data = await response.json();
        setProfiles(data.profiles || []);
      } catch (error) {
        console.error("Error loading profiles:", error);
        toast({
          title: "Error",
          description: "Failed to load profiles",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadProfiles();
  }, [userId, toast]);

  const handleSwipe = async (direction: "left" | "right") => {
    if (!userId || currentIndex >= profiles.length) return;

    const swipedProfile = profiles[currentIndex];

    try {
      const response = await fetch("/api/swipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          swiperId: userId,
          swipedId: swipedProfile.id,
          direction,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to process swipe");
      }

      const data = await response.json();

      // Show match notification if there's a match
      if (data.match) {
        toast({
          title: "¡Match! 🎉",
          description: `Has hecho match con ${data.match.profile.name}`,
        });
      }

      // Move to next profile
      setCurrentIndex((prev) => prev + 1);
    } catch (error) {
      console.error("Swipe error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to process swipe";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const handlePass = () => {
    if (currentIndex >= profiles.length) return;
    const handler = swipeHandlerRef.current;
    if (handler) {
      handler("left");
    } else {
      handleSwipe("left");
    }
  };

  const handleLike = () => {
    if (currentIndex >= profiles.length) return;
    const handler = swipeHandlerRef.current;
    if (handler) {
      handler("right");
    } else {
      handleSwipe("right");
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Cargando perfiles...</p>
        </div>
      </div>
    );
  }

  if (profiles.length === 0 || currentIndex >= profiles.length) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">No hay más perfiles</h2>
          <p className="text-muted-foreground">
            Has visto todos los perfiles disponibles
          </p>
          <Button onClick={() => router.push("/matches")}>
            Ver mis matches
          </Button>
        </div>
      </div>
    );
  }

  const visibleProfiles = profiles.slice(currentIndex, currentIndex + 3);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-xs mx-auto">
        <div className="mb-4 text-center relative z-10">
          <h1 className="text-xl font-bold mb-1">Descubre</h1>
          <p className="text-muted-foreground text-sm">
            Desliza para encontrar conexiones
          </p>
        </div>

        <div className="relative h-[500px] mb-4 w-full flex items-center justify-center">
          <div className="relative w-full max-w-xs h-full flex items-center justify-center">
            {visibleProfiles.map((profile, idx) => (
              <SwipeCard
                key={profile.id}
                profile={profile}
                onSwipe={handleSwipe}
                index={idx}
                onSwipeRequest={(handler) => {
                  if (idx === 0) {
                    swipeHandlerRef.current = handler;
                  }
                }}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-4 relative z-10">
          <Button
            variant="outline"
            size="lg"
            onClick={handlePass}
            className="flex-1"
          >
            ✕ Pasar
          </Button>
          <Button size="lg" onClick={handleLike} className="flex-1">
            ❤️ Me gusta
          </Button>
        </div>
      </div>
    </div>
  );
}
