"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Profile } from "@/lib/mock-data";

interface Match {
  id: string;
  matchId: string;
  createdAt: number;
  profile: Profile | null;
}

interface MatchesListProps {
  matches: Match[];
}

export function MatchesList({ matches }: MatchesListProps) {
  if (matches.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No tienes matches aún</p>
        <p className="text-sm text-muted-foreground mt-2">
          Sigue deslizando para encontrar conexiones
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {matches.map((match) => {
        if (!match.profile) return null;

        return (
          <Card key={match.id}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-2xl font-bold">
                  {match.profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <CardTitle className="text-xl">
                    {match.profile.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {match.profile.headline}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {match.profile.skills.slice(0, 4).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-secondary rounded-md text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Bio</h4>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {match.profile.bio}
                </p>
              </div>

              {match.profile.contact && (
                <div className="pt-4 border-t space-y-2">
                  <h4 className="font-semibold">Contacto</h4>
                  {match.profile.contact.email && (
                    <p className="text-sm">📧 {match.profile.contact.email}</p>
                  )}
                  {match.profile.contact.linkedin && (
                    <p className="text-sm">
                      💼{" "}
                      <a
                        href={`https://${match.profile.contact.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {match.profile.contact.linkedin}
                      </a>
                    </p>
                  )}
                </div>
              )}

              <div className="text-xs text-muted-foreground pt-2">
                Match el {new Date(match.createdAt).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
