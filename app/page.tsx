import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="container mx-auto max-w-4xl text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              DevMatchup
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Conecta con desarrolladores y emprendedores. Encuentra cofounders,
              mentores y oportunidades de networking.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/onboarding">Sube tu CV/Portfolio</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6"
            >
              <Link href="/discover">Explorar</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-muted/50 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            ¿Cómo funciona?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center space-y-4">
                <div className="text-4xl mb-4">📄</div>
                <h3 className="text-xl font-semibold">1. Sube tu CV</h3>
                <p className="text-muted-foreground">
                  Sube tu CV o portfolio. Nuestra IA extraerá automáticamente tu
                  perfil profesional.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center space-y-4">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="text-xl font-semibold">2. Responde preguntas</h3>
                <p className="text-muted-foreground">
                  Cuéntanos qué buscas y qué ofreces para mejorar las
                  conexiones.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center space-y-4">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="text-xl font-semibold">3. Conecta</h3>
                <p className="text-muted-foreground">
                  Desliza para descubrir perfiles y haz match con personas
                  afines.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>DevMatchup - Networking para desarrolladores y emprendedores</p>
        </div>
      </footer>
    </div>
  );
}
