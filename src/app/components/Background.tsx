"use client";

import GhostFibers from "./GhostFibers/GhostFibers";

export default function Background() {
  return (
    <div className="fx-background" aria-hidden="true">
      <GhostFibers
        lineColor="#140E35"
        glowColor="#3437A0"
        lightMode={false}
        speed={0.2}
        scale={2}
        rotationSpeed={0.25}
        layers={4}
        vignette={0.8}
        brightness={2}
        dpr={1}
        fps={30}
      />
      <div className="fx-orbs">
        <span className="fx-orb fx-orb--1" />
        <span className="fx-orb fx-orb--2" />
        <span className="fx-orb fx-orb--3" />
      </div>
    </div>
  );
}
