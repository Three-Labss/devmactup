"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ConditionalHeader() {
  const pathname = usePathname();
  
  // Don't show header on landing page
  if (pathname === "/") {
    return null;
  }

  return <Header />;
}

function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const handleReset = () => {
    // Clear sessionStorage
    if (typeof window !== "undefined") {
      sessionStorage.clear();
    }
    // Redirect to onboarding
    router.push("/onboarding");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          DevMatchup
        </Link>

        <nav className="flex items-center gap-2">
          <Button
            variant={pathname === "/discover" ? "default" : "ghost"}
            size="sm"
            asChild
          >
            <Link href="/discover">Descubrir</Link>
          </Button>
          <Button
            variant={pathname === "/matches" ? "default" : "ghost"}
            size="sm"
            asChild
          >
            <Link href="/matches">Matches</Link>
          </Button>
          <Button
            variant={pathname === "/activity" ? "default" : "ghost"}
            size="sm"
            asChild
          >
            <Link href="/activity">Actividad</Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="ml-2"
          >
            🔄 Resetear
          </Button>
        </nav>
      </div>
    </header>
  );
}

