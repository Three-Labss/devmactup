"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PDFUpload } from "@/components/pdf-upload";
import { ProfilePreview } from "@/components/profile-preview";
import { QuickQuestions } from "@/components/quick-questions";
import { useToast } from "@/components/ui/use-toast";
import type { ExtractedProfile } from "@/lib/ai/extract-profile";

type OnboardingStep = "upload" | "questions" | "preview";

export default function OnboardingPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState<OnboardingStep>("upload");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [extractedProfile, setExtractedProfile] =
    useState<ExtractedProfile | null>(null);
  const [quickAnswers, setQuickAnswers] = useState({
    looking_for: "",
    offering: "",
    industry: "",
  });
  const [isActivating, setIsActivating] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // Get or create user ID from sessionStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      let id = sessionStorage.getItem("userId");
      if (!id) {
        id = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        sessionStorage.setItem("userId", id);
      }
      setUserId(id);
    }
  }, []);

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to upload file");
      }

      const data = await response.json();
      setExtractedProfile(data.profile);
      setStep("questions");
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to process PDF",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleAnswersChange = (answers: {
    looking_for?: string;
    offering?: string;
    industry?: string;
  }) => {
    setQuickAnswers((prev) => ({
      ...prev,
      ...answers,
    }));
    // Auto-advance to preview when all questions are answered
    const updated = { ...quickAnswers, ...answers };
    if (updated.looking_for && updated.offering && updated.industry) {
      setStep("preview");
    }
  };

  const handleActivate = async (
    profile: ExtractedProfile & {
      looking_for?: string[];
      offering?: string[];
    }
  ) => {
    if (!userId) {
      toast({
        title: "Error",
        description: "User ID not found",
        variant: "destructive",
      });
      return;
    }

    setIsActivating(true);

    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          profile,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to activate profile");
      }

      toast({
        title: "¡Perfil activado!",
        description: "Tu perfil ha sido creado exitosamente",
      });

      // Navigate to discover page
      router.push("/discover");
    } catch (error) {
      console.error("Activation error:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to activate profile",
        variant: "destructive",
      });
    } finally {
      setIsActivating(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Crea tu Perfil</h1>
        <p className="text-muted-foreground">
          Sube tu CV o portfolio para comenzar
        </p>
      </div>

      <div className="space-y-6">
        {step === "upload" && (
          <PDFUpload
            onFileSelect={handleFileSelect}
            selectedFile={selectedFile}
            isUploading={isUploading}
          />
        )}

        {step === "questions" && extractedProfile && (
          <>
            <QuickQuestions
              answers={quickAnswers}
              onAnswersChange={handleAnswersChange}
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setStep("preview")}
                className="text-sm text-primary hover:underline"
              >
                Continuar →
              </button>
            </div>
          </>
        )}

        {step === "preview" && extractedProfile && (
          <ProfilePreview
            extractedProfile={extractedProfile}
            quickAnswers={quickAnswers}
            onActivate={handleActivate}
            isActivating={isActivating}
          />
        )}
      </div>
    </div>
  );
}
