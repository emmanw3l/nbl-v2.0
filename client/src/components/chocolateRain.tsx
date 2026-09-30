
import { useEffect, useState } from "react";

const EMOJI_COUNT = 90;

interface Piece {
  id: number;
  left: number;
  duration: number;
  delay: number;
  size: number;
}

export default function ChocolateRain() {
  const [pieces, setPieces] = useState<Piece[] | null>(null);

  useEffect(() => {


    const generated: Piece[] = Array.from({ length: EMOJI_COUNT }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 3 + Math.random() * 2.5,
      delay: Math.random() * 3.5,
      size: 20 + Math.random() * 20,
    }));
    setPieces(generated);

    const timer = setTimeout(() => setPieces(null), 7000);
    return () => clearTimeout(timer);
  }, []);

  if (!pieces) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 1100,
      }}
    >
      {pieces.map((p) => (
        <span
          key={p.id}
          style={{
            position: "absolute",
            top: -40,
            left: `${p.left}%`,
            fontSize: p.size,
            animation: `chocolate-fall ${p.duration}s linear ${p.delay}s forwards`,
          }}
        >
          🍫
        </span>
      ))}
    </div>
  );
}

export function StarRain() {
  const [pieces, setPieces] = useState<Piece[] | null>(null);

  useEffect(() => {


    const generated: Piece[] = Array.from({ length: EMOJI_COUNT }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 3 + Math.random() * 2.5,
      delay: Math.random() * 3.5,
      size: 15 + Math.random() * 20,
    }));
    setPieces(generated);

    const timer = setTimeout(() => setPieces(null), 9000);
    return () => clearTimeout(timer);
  }, []);

  if (!pieces) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 1100,
      }}
    >
      {pieces.map((p) => (
        <span
          key={p.id}
          style={{
            position: "absolute",
            top: -40,
            left: `${p.left}%`,
            fontSize: p.size,
            animation: `chocolate-fall ${p.duration}s linear ${p.delay}s forwards`,
          }}
        >
          🌟🌟
        </span>
      ))}
    </div>
  );
}