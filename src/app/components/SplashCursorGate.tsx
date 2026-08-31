"use client";

import { useEffect, useState } from "react";
import SplashCursor from "./SplashCursor";

export default function SplashCursorGate() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(mq.matches && !reduced.matches);
    update();
    mq.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  return enabled ? <SplashCursor DYE_RESOLUTION={512} SIM_RESOLUTION={64} /> : null;
}
