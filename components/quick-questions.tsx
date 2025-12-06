"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

interface QuickQuestionsProps {
  answers: {
    looking_for?: string;
    offering?: string;
    industry?: string;
  };
  onAnswersChange: (answers: {
    looking_for?: string;
    offering?: string;
    industry?: string;
  }) => void;
}

export function QuickQuestions({
  answers,
  onAnswersChange,
}: QuickQuestionsProps) {
  const updateAnswer = (key: keyof typeof answers, value: string) => {
    onAnswersChange({
      ...answers,
      [key]: value,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cuéntanos sobre ti</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="looking_for">¿Qué buscas?</Label>
          <Select
            id="looking_for"
            value={answers.looking_for || ""}
            onChange={(e) => updateAnswer("looking_for", e.target.value)}
          >
            <option value="">Selecciona una opción</option>
            <option value="cofounder">Cofounder</option>
            <option value="mentor">Mentor</option>
            <option value="networking">Networking</option>
            <option value="inversión">Inversión</option>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="offering">¿Qué ofreces?</Label>
          <Select
            id="offering"
            value={answers.offering || ""}
            onChange={(e) => updateAnswer("offering", e.target.value)}
          >
            <option value="">Selecciona una opción</option>
            <option value="tech">Tech/Desarrollo</option>
            <option value="business">Business/Producto</option>
            <option value="capital">Capital/Inversión</option>
            <option value="conexiones">Conexiones/Networking</option>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry">¿Industria?</Label>
          <Select
            id="industry"
            value={answers.industry || ""}
            onChange={(e) => updateAnswer("industry", e.target.value)}
          >
            <option value="">Selecciona una opción</option>
            <option value="AI">AI</option>
            <option value="fintech">Fintech</option>
            <option value="healthtech">Healthtech</option>
            <option value="edtech">Edtech</option>
            <option value="ecommerce">E-commerce</option>
            <option value="other">Otra</option>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
