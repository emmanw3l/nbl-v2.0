import WavyText from "../../components/wavytext";
import type { ProfileAccent } from "./specialProfiles";
import { useState, useEffect } from "react";

interface AuthorNameExtrasProps {
  isFounder: boolean;
  isPj: boolean;
  isBema: boolean;
  accent: ProfileAccent;
}

interface TypewriterProps {
  texts: string[];
  typingSpeed?: number;   // ms per character while typing
  deletingSpeed?: number; // ms per character while deleting
  pauseDuration?: number; // ms to hold at full text before deleting
  loop?: boolean;         // if false, stops after typing the last text once
  className?: string;
  style?: React.CSSProperties;
}

function Typewriter({ texts,
  typingSpeed = 95,
  deletingSpeed = 50,
  pauseDuration = 1000,
  loop = true,
  className,
  style,}: TypewriterProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");

 useEffect(() => {
    const current = texts[textIndex];

    if (phase === "typing") {
      if (typed.length < current.length) {
        const t = setTimeout(() => setTyped(current.slice(0, typed.length + 1)), typingSpeed);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("pausing"), pauseDuration);
      return () => clearTimeout(t);
    }

    if (phase === "pausing") {
      const isLast = textIndex === texts.length - 1;
      if (!loop && isLast) return; // stop here permanently
      const t = setTimeout(() => setPhase("deleting"), 0);
      return () => clearTimeout(t);
    }

    if (phase === "deleting") {
      if (typed.length > 0) {
        const t = setTimeout(() => setTyped(current.slice(0, typed.length - 1)), deletingSpeed);
        return () => clearTimeout(t);
      }
      setTextIndex((i) => (i + 1) % texts.length);
      setPhase("typing");
    }
  }, [typed, phase, textIndex, texts, typingSpeed, deletingSpeed, pauseDuration, loop]);

  return (
    <span className={className} style={style}>
      {typed}
      <span className="meta-cursor" />
    </span>
  );
}


export default function AuthorNameExtras({ isFounder, isPj, isBema, accent }: AuthorNameExtrasProps) {
  if (isPj) {
    return (
      <div>
        <WavyText
          text={"CHOCOLATESSS!!"}
          className="text-uppercase fw-semibold small mb-2"
          style={{ letterSpacing: ".08em", color: accent.badgeText }}
        />
      </div>
    );
  }
  if (isFounder) {
    return (
      <div className="mt-2">
        <p className=" " style={{ color: accent.badgeText, textTransform: "uppercase", fontSize:"2rem" }}>
          <Typewriter texts={["personality of the year", ]} />
        </p>
      </div>
    );
  }
  if (isBema) {
    return (
      <div className="mt-2">
        <p className=" " style={{ color: accent.badgeText, textTransform: "uppercase", fontSize:"2rem" }}>
          <Typewriter texts={["favourite admin"]}/>
        </p>
      </div>
    )
  }

  return null;
}