import { useEffect, useRef, useState } from "react";
import Layout from "../Nav/Nav";
import { motion, Variants } from "framer-motion";
// import { allPrompts } from "../prompts/promptCollection";
// import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Link } from "react-router-dom";
import January2024 from "../components/img/Prompts/2024/January_2024.jpg";
import February2024 from "../components/img/Prompts/2024/february_2024.jpg";
import March2024 from "../components/img/Prompts/2024/March_2024.jpg";
import June2024 from "../components/img/Prompts/2024/June_2024.jpg";
import August2024 from "../components/img/Prompts/2024/August_2024.jpg";
import October2024 from "../components/img/Prompts/2024/October_2024.jpg";
import January2025 from "../components/img/Prompts/2025/January_2025.jpg";
import February2025 from "../components/img/Prompts/2025/February_2025.jpg";
import April2025 from "../components/img/Prompts/2025/April_2025.jpg";
import May2025 from "../components/img/Prompts/2025/May_2025.jpg";
import September2025 from "../components/img/Prompts/2025/September_2025.jpg";
import July2025 from "../components/img/Prompts/2025/July_2025.jpg";
import January2026 from "../components/img/Prompts/2026/January_2026.jpg";
import February2026 from "../components/img/Prompts/2026/February_2026.jpg";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// ── Types ──────────────────────────────────────────────────────────────────
interface DBPrompt {
  id: number;
  title: string;
  content: string;
  theme: string | null;
  month: number;
  year: number;
  slug: string;
  author: { id: number; name: string };
}

interface PromptMetaProps {
  total: number;
  yearRange: string;
}

function PromptMeta({ total, yearRange }: PromptMetaProps) {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<"counting" | "typing" | "done">(
    "counting",
  );
  const [typed, setTyped] = useState("");
  const rafRef = useRef<number | null>(null);

  const suffix = ` prompts · ${yearRange}`;

  useEffect(() => {
    if (phase !== "counting") return;
    const duration = 900;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.round(progress * total));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setPhase("typing");
      }
    }
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [phase, total]);

  useEffect(() => {
    if (phase !== "typing") return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTyped(suffix.slice(0, i));
      if (i >= suffix.length) {
        clearInterval(interval);
        setPhase("done");
      }
    }, 35);
    return () => clearInterval(interval);
  }, [phase, suffix]);

  return (
    <span style={{ fontFamily: "monospace", fontSize: "12px", color: "#999" }}>
      {count}
      {typed}
      {phase !== "done" && <span className="meta-cursor" />}
    </span>
  );
}

// ── Images ─────────────────────────────────────────────────────────────────
const images = [
  { month: "january2024", src: January2024 },
  { month: "february2024", src: February2024 },
  { month: "march2024", src: March2024 },
  { month: "june2024", src: June2024 },
  { month: "august2024", src: August2024 },
  { month: "october2024", src: October2024 },
  { month: "january2025", src: January2025 },
  { month: "february2025", src: February2025 },
  { month: "april2025", src: April2025 },
  { month: "may2025", src: May2025 },
  { month: "september2025", src: September2025 },
  { month: "july2025", src: July2025 },
  { month: "january2026", src: January2026 },
  { month: "february2026", src: February2026 },
];

// ── Helpers ────────────────────────────────────────────────────────────────
const MotionLink = motion(Link);

function monthName(n: number) {
  return MONTH_NAMES[n - 1] ?? "";
}

function getPromptCount(prompts: DBPrompt[], month: number, year: number) {
  return prompts.filter((p) => p.month === month && p.year === year).length;
}

function getUniqueMonths(prompts: DBPrompt[], year: number) {
  const monthMap = new Map<number, DBPrompt>();

  prompts.forEach((prompt) => {
    if (prompt.year === year && !monthMap.has(prompt.month)) {
      monthMap.set(prompt.month, prompt);
    }
  });

  return Array.from(monthMap.values()).sort((a, b) => a.month - b.month);
}

// ── Animations ─────────────────────────────────────────────────────────────
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

// ── Card ───────────────────────────────────────────────────────────────────
function PromptCard({ prompt, count }: { prompt: DBPrompt; count: number }) {
  const name = monthName(prompt.month);
  const imageKey = `${name.toLowerCase()}${prompt.year}`;
  const image = images.find((img) => img.month === imageKey);

  return (
    <motion.div
      className="card cards h-100 shadow-lg rounded-4 ac p-4"
      whileHover={{ y: -6, boxShadow: "0px 20px 40px rgba(0,0,0,0.15)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {image && (
        <motion.img
          src={image.src}
          alt={`${name} ${prompt.year}`}
          className="d-block mb-3 rounded-3 img-fluid"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        />
      )}

      <h4 className="fw-semibold mb-1">
        {name} {prompt.year}
      </h4>

      <small className="text-muted d-block mb-2">
        • {count} prompt{count !== 1 && "s"}
      </small>

      {prompt.theme && (
        <p className="fst-italic mb-3">
          <u>Theme</u>: {prompt.theme}
        </p>
      )}

      <p className="fst-italic mb-3">
        <u>Prompt</u>: {prompt.title}
      </p>

      <MotionLink
        to={`/mainPromptPage/${prompt.year}/${name.toLowerCase()}`}
        className="btn btn-outline-dark btn-sm rounded-3"
        whileHover={{ x: 4 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        View prompts →
      </MotionLink>
    </motion.div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function PromptsPage() {
  const [prompts, setPrompts] = useState<DBPrompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API}/prompts`)
      .then((r) => r.json())
      .then((d) => setPrompts(d.prompts))
      .catch(() => setError("Failed to load prompts"))
      .finally(() => setLoading(false));
  }, []);

  const prompts2024 = getUniqueMonths(prompts, 2024);
  const prompts2025 = getUniqueMonths(prompts, 2025);
  const prompts2026 = getUniqueMonths(prompts, 2026);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
      className="container-fluid "
      style={{ backgroundColor: "#e2d7db" }}
    >
      <Layout />

      <motion.header
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{
          borderBottom: "1px solid #e5e5e5",
          paddingBottom: "2rem",
          marginBottom: "3rem",
          marginTop: "60px",
        }}
      >
        {/* <p style={{ fontFamily: "monospace", fontSize: "16px", letterSpacing: "0.32em",
    textTransform: "uppercase", color: "#999", margin: "0 0 0.75rem" }}>
    NBL Writing Community
  </p> */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "1.5rem",
            flexWrap: "wrap",
            margin: "0 0 0.85rem",
          }}
        >
          <h1
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(2.4rem,7vw,4rem)",
              fontWeight: 400,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            Prompts
          </h1>

          {!loading && (
            <PromptMeta
              key={prompts.length}
              total={prompts.length}
              yearRange={`2024 – ${new Date().getFullYear()}`}
            />
          )}
        </div>
        <p
          style={{
            fontSize: "0.95rem",
            lineHeight: 1.6,
            color: "#555",
            maxWidth: "48ch",
            margin: 0,
          }}
        >
          A growing archive of monthly written prompts from NBL members.
        </p>
      </motion.header>

      {error && <p className="text-center text-danger">{error}</p>}

      {loading ? (
        <p className="text-center my-5 vh-100"
          style={{backgroundColor: "#e2d7db"}}
        
        >Loading prompts…</p>
      ) : (
        <motion.div
          className="container py-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{backgroundColor: "#e2d7db"}}
        >
          {[
            { label: "2024 Prompts", list: prompts2024 },
            { label: "2025 Prompts", list: prompts2025 },
            { label: "2026 Prompts", list: prompts2026 },
          ].map(({ label, list }) =>
            list.length === 0 ? null : (
              <section key={label} className="mb-5">
                <h2 className="fw-bold mb-4 text-center">{label}</h2>
                <div className="row g-4">
                  {list.map((p) => (
                    <motion.div
                      key={p.id}
                      className="col-md-6 col-lg-4"
                      variants={cardVariants}
                    >
                      <PromptCard
                        prompt={p}
                        count={getPromptCount(prompts, p.month, p.year)}
                      />
                    </motion.div>
                  ))}
                </div>
              </section>
            ),
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
