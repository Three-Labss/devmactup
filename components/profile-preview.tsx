"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ExtractedProfile } from "@/lib/ai/extract-profile";

interface ProfilePreviewProps {
  extractedProfile: ExtractedProfile;
  quickAnswers: {
    looking_for?: string;
    offering?: string;
    industry?: string;
  };
  onActivate: (
    profile: ExtractedProfile & { looking_for?: string[]; offering?: string[] }
  ) => void;
  isActivating?: boolean;
}

export function ProfilePreview({
  extractedProfile,
  quickAnswers,
  onActivate,
  isActivating = false,
}: ProfilePreviewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(extractedProfile);

  const handleActivate = () => {
    const fullProfile = {
      ...editedProfile,
      industry: quickAnswers.industry || editedProfile.industry,
      looking_for: quickAnswers.looking_for ? [quickAnswers.looking_for] : [],
      offering: quickAnswers.offering ? [quickAnswers.offering] : [],
    };
    onActivate(fullProfile);
  };

  const updateField = (
    field: keyof ExtractedProfile,
    value: string | number | string[] | { email?: string; linkedin?: string }
  ) => {
    setEditedProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateSkills = (skillsString: string) => {
    const skills = skillsString
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    updateField("skills", skills);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Vista Previa del Perfil</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Ver Vista Previa" : "Editar"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                value={editedProfile.name}
                onChange={(e) => updateField("name", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="headline">Headline</Label>
              <Input
                id="headline"
                value={editedProfile.headline}
                onChange={(e) => updateField("headline", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Skills (separados por comas)</Label>
              <Input
                id="skills"
                value={editedProfile.skills.join(", ")}
                onChange={(e) => updateSkills(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience_years">Años de Experiencia</Label>
              <Input
                id="experience_years"
                type="number"
                value={editedProfile.experience_years}
                onChange={(e) =>
                  updateField(
                    "experience_years",
                    parseInt(e.target.value, 10) || 0
                  )
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <textarea
                id="bio"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={editedProfile.bio}
                onChange={(e) => updateField("bio", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={editedProfile.contact?.email || ""}
                onChange={(e) =>
                  updateField("contact", {
                    ...editedProfile.contact,
                    email: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                value={editedProfile.contact?.linkedin || ""}
                onChange={(e) =>
                  updateField("contact", {
                    ...editedProfile.contact,
                    linkedin: e.target.value,
                  })
                }
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold">{editedProfile.name}</h3>
              <p className="text-muted-foreground">{editedProfile.headline}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {editedProfile.skills.map((skill) => (
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
              <h4 className="font-semibold mb-2">Experiencia</h4>
              <p>{editedProfile.experience_years} años</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Industria</h4>
              <p>{quickAnswers.industry || editedProfile.industry}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Bio</h4>
              <p className="text-muted-foreground">{editedProfile.bio}</p>
            </div>

            {editedProfile.contact && (
              <div>
                <h4 className="font-semibold mb-2">Contacto</h4>
                {editedProfile.contact.email && (
                  <p className="text-sm">📧 {editedProfile.contact.email}</p>
                )}
                {editedProfile.contact.linkedin && (
                  <p className="text-sm">💼 {editedProfile.contact.linkedin}</p>
                )}
              </div>
            )}
          </div>
        )}

        <div className="flex gap-2 pt-4">
          <Button
            onClick={handleActivate}
            disabled={isActivating}
            className="flex-1"
          >
            {isActivating ? "Activando..." : "Activar Perfil"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
