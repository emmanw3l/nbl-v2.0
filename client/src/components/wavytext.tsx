
import { motion } from "framer-motion";

interface Props {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function WavyText({ text, className, style }: Props) {
  return (
    <p
      className={className}
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", margin: 0, ...style }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.05,
          }}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </p>
  );
}