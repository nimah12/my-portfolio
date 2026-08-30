"use client";

import { useEffect, useState } from "react";
import SplashCursor from "./SplashCursor";

export default function SplashCursorGate() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return enabled ? <SplashCursor /> : null;
}
