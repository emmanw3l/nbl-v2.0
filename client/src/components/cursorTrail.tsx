
import { useEffect, useRef } from "react";

interface CursorTrailProps {
  emoji?: string;       
  color?: string;       
  size?: number;
  particleLifetime?: number; // ms
  spawnInterval?: number;    // ms between particles while moving
}

export default function CursorTrail({
  emoji,
  color = "#6c63ff",
  size = 16,
  particleLifetime = 700,
  spawnInterval = 40,
}: CursorTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastSpawn = useRef(0);

useEffect(() => {
  function handleMove(clientX: number, clientY: number) {
    const now = performance.now();
    if (now - lastSpawn.current < spawnInterval) return;
    lastSpawn.current = now;

    const particle = document.createElement("span");
    particle.textContent = emoji ?? "";
    particle.style.position = "fixed";
    particle.style.left = `${clientX}px`;
    particle.style.top = `${clientY}px`;
    particle.style.fontSize = `${size}px`;
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "1200";
    particle.style.transform = "translate(-50%, -50%)";
    particle.style.transition = `opacity ${particleLifetime}ms ease, transform ${particleLifetime}ms ease`;

    if (!emoji) {
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.borderRadius = "50%";
      particle.style.background = color;
    }

    containerRef.current?.appendChild(particle);

    requestAnimationFrame(() => {
      particle.style.opacity = "0";
      particle.style.transform = "translate(-50%, -50%) translateY(-20px) scale(0.6)";
    });

    setTimeout(() => particle.remove(), particleLifetime);
  }

  function handleMouseMove(e: MouseEvent) {
    handleMove(e.clientX, e.clientY);
  }
  function handleTouchMove(e: TouchEvent) {
    const touch = e.touches[0];
    if (touch) handleMove(touch.clientX, touch.clientY);
  }

  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("touchmove", handleTouchMove);
  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("touchmove", handleTouchMove);
  };
}, [emoji, color, size, particleLifetime, spawnInterval]);

  return <div ref={containerRef} style={{ position: "fixed", inset: 0, pointerEvents: "none" }} />;
}