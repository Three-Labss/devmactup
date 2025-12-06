"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MatchesList } from "@/components/matches-list";
import { Button } from "@/components/ui/button";
import type { Profile } from "@/lib/mock-data";

interface Match {
  id: string;
  matchId: string;
  createdAt: number;
  profile: Profile | null;
}

export default function MatchesPage() {
  const router = useRouter();
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

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

  // Load matches
  useEffect(() => {
    if (!userId) return;

    const loadMatches = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/matches?userId=${userId}`);
        if (!response.ok) {
          throw new Error("Failed to load matches");
        }

        const data = await response.json();
        setMatches(data.matches || []);
      } catch (error) {
        console.error("Error loading matches:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMatches();
  }, [userId]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Cargando matches...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Mis Matches</h1>
          <p className="text-muted-foreground">
            {matches.length} {matches.length === 1 ? "match" : "matches"}
          </p>
        </div>
        <Button asChild>
          <Link href="/discover">Descubrir más</Link>
        </Button>
      </div>

      <MatchesList matches={matches} />
    </div>
  );
}
