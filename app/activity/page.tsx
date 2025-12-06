"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Profile } from "@/lib/mock-data";
import Image from "next/image";

interface SwipeActivity {
  profile: Profile;
  direction: "left" | "right";
  timestamp: number;
}

export default function ActivityPage() {
  const router = useRouter();
  const [likes, setLikes] = useState<SwipeActivity[]>([]);
  const [passes, setPasses] = useState<SwipeActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

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

  useEffect(() => {
    if (!userId) return;

    const loadActivity = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/activity?userId=${userId}`);
        if (!response.ok) {
          throw new Error("Failed to load activity");
        }

        const data = await response.json();
        setLikes(data.likes || []);
        setPasses(data.passes || []);
      } catch (error) {
        console.error("Error loading activity:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadActivity();
  }, [userId]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Cargando actividad...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Mi Actividad</h1>
        <p className="text-muted-foreground">
          Revisa los perfiles que te han gustado y los que has pasado
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Likes */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            ❤️ Me gustaron ({likes.length})
          </h2>
          {likes.length === 0 ? (
            <p className="text-muted-foreground">No has dado like a ningún perfil aún</p>
          ) : (
            <div className="space-y-4">
              {likes.map((activity) => {
                const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(activity.profile.name)}&size=200&background=random&bold=true&color=fff`;
                return (
                  <Card key={activity.profile.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={avatarUrl}
                            alt={activity.profile.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold truncate">
                            {activity.profile.name}
                          </h3>
                          <p className="text-sm text-muted-foreground truncate">
                            {activity.profile.headline}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(activity.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Passes */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            ✕ Pasé ({passes.length})
          </h2>
          {passes.length === 0 ? (
            <p className="text-muted-foreground">No has pasado ningún perfil aún</p>
          ) : (
            <div className="space-y-4">
              {passes.map((activity) => {
                const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(activity.profile.name)}&size=200&background=random&bold=true&color=fff`;
                return (
                  <Card key={activity.profile.id} className="opacity-60">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={avatarUrl}
                            alt={activity.profile.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold truncate">
                            {activity.profile.name}
                          </h3>
                          <p className="text-sm text-muted-foreground truncate">
                            {activity.profile.headline}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(activity.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

