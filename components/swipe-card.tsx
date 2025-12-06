"use client";

import {
  motion,
  type PanInfo,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useState } from "react";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { Profile } from "@/lib/mock-data";
import Image from "next/image";

interface SwipeCardProps {
  profile: Profile;
  onSwipe: (direction: "left" | "right") => void;
  index: number;
  onSwipeRequest?: (handler: (direction: "left" | "right") => void) => void;
}

export function SwipeCard({
  profile,
  onSwipe,
  index,
  onSwipeRequest,
}: SwipeCardProps) {
  const [isExiting, setIsExiting] = useState(false);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-25, 0, 25]);
  const opacity = useTransform(
    x,
    [-300, -150, 0, 150, 300],
    [0, 0.5, 1, 0.5, 0]
  );

  const handleSwipe = React.useCallback(
    (direction: "left" | "right") => {
      if (isExiting) return;
      setIsExiting(true);
      const exitX = direction === "right" ? 500 : -500;

      // Animate out
      x.set(exitX);

      // Call onSwipe after a short delay to allow animation
      setTimeout(() => {
        onSwipe(direction);
      }, 300);
    },
    [isExiting, onSwipe, x]
  );

  // Expose swipe handler to parent
  React.useEffect(() => {
    if (onSwipeRequest && index === 0) {
      // Only expose handler for the top card (index 0)
      onSwipeRequest(handleSwipe);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const handleDragEnd = (_event: React.PointerEvent, info: PanInfo) => {
    const threshold = 100;
    if (Math.abs(info.offset.x) > threshold) {
      const direction = info.offset.x > 0 ? "right" : "left";
      handleSwipe(direction);
    } else {
      // Spring back to center
      x.set(0);
    }
  };

  if (isExiting) {
    return null;
  }

  // Generate avatar URL from name
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&size=400&background=random&bold=true&color=fff`;

  // Only show the first card, hide others completely
  if (index > 0) {
    return null;
  }

  return (
    <motion.div
      style={{
        x,
        rotate,
        opacity,
        zIndex: 5,
      }}
      drag="x"
      dragConstraints={{ left: -300, right: 300 }}
      dragElastic={0.3}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.8, opacity: 0, x: 500 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      className="w-full max-w-xs mx-auto"
    >
      <Card className="w-full cursor-grab active:cursor-grabbing shadow-xl">
        <CardContent className="p-4">
          <div className="aspect-[3/4] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg mb-3 flex items-center justify-center overflow-hidden relative">
            <Image
              src={avatarUrl}
              alt={profile.name}
              fill
              className="object-cover rounded-lg"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          <div className="space-y-1 mb-3">
            <h2 className="text-lg font-bold">{profile.name}</h2>
            <p className="text-muted-foreground text-xs">{profile.headline}</p>
          </div>

          <div className="mt-3 space-y-1.5">
            <h3 className="font-semibold text-xs">Skills</h3>
            <div className="flex flex-wrap gap-1.5">
              {profile.skills.slice(0, 4).map((skill) => (
                <span
                  key={skill}
                  className="px-1.5 py-0.5 bg-secondary rounded text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-3">
            <h3 className="font-semibold mb-1 text-xs">Bio</h3>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {profile.bio}
            </p>
          </div>

          <div className="mt-3 flex gap-1.5 text-xs text-muted-foreground">
            <span>{profile.experience_years} años exp.</span>
            <span>•</span>
            <span>{profile.industry}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
