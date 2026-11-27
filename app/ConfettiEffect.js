"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";

const Confetti = dynamic(() => import("react-confetti"), {
  ssr: false,
});

const CONFETTI_STYLE = {
  position: "fixed",
  inset: 0,
  pointerEvents: "none",
  zIndex: 50,
};

export default function ConfettiEffect() {
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [isActive, setIsActive] = useState(true);

  const handleComplete = useCallback(() => {
    setIsActive(false);
  }, []);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsActive(false);
      return;
    }

    let frameId = null;

    const updateViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setViewport((prev) =>
        prev.width === width && prev.height === height
          ? prev
          : { width, height }
      );
    };

    const handleResize = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        updateViewport();
      });
    };

    updateViewport();
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [isActive]);

  if (!isActive || viewport.width === 0 || viewport.height === 0) {
    return null;
  }

  return (
    <Confetti
      width={viewport.width}
      height={viewport.height}
      numberOfPieces={280}
      recycle={false}
      gravity={0.22}
      onConfettiComplete={handleComplete}
      style={CONFETTI_STYLE}
    />
  );
}
