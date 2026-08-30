"use client";

import { useApp } from "../providers";
import GhostFibers from "./GhostFibers/GhostFibers";

export default function Background() {
  const { theme } = useApp();
  const isDark = theme === "dark";

  return (
    <div className="fx-background" aria-hidden="true">
      <GhostFibers
        lineColor={isDark ? "#140E35" : "#0b1030"}
        glowColor={isDark ? "#3437A0" : "#6d72e0"}
        lightMode={!isDark}
        speed={0.2}
        scale={2}
        rotationSpeed={0.25}
        layers={4}
        vignette={isDark ? 0.8 : 0.5}
        brightness={isDark ? 2 : 1.4}
        dpr={1}
      />
    </div>
  );
}
