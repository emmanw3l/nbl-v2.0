import { useEffect, useState } from "react";
import Layout from "../Nav/Nav";
import { motion, Variants } from "framer-motion";
import { allPrompts } from "../prompts/promptCollection";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
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
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

// ── Types ──────────────────────────────────────────────────────────────────
interface DBPrompt {
  id:      number;
  title:   string;
  content: string;
  theme:   string | null;
  month:   number;
  year:    number;
  slug:    string;
  author:  { id: number; name: string };
}

// ── Images ─────────────────────────────────────────────────────────────────
const images = [
  { month: "january2024",   src: January2024   },
  { month: "february2024",  src: February2024  },
  { month: "march2024",     src: March2024     },
  { month: "june2024",      src: June2024      },
  { month: "august2024",    src: August2024    },
  { month: "october2024",   src: October2024   },
  { month: "january2025",   src: January2025   },
  { month: "february2025",  src: February2025  },
  { month: "april2025",     src: April2025     },
  { month: "may2025",       src: May2025       },
  { month: "september2025", src: September2025 },
  { month: "july2025",      src: July2025      },
  { month: "january2026",   src: January2026   },
  { month: "february2026",  src: February2026  },
];

// ── Helpers ────────────────────────────────────────────────────────────────
function monthName(n: number) {
  return MONTH_NAMES[n - 1] ?? "";
}

function getPromptCount(month: string, year: number) {
  return allPrompts.filter(
    (p) =>
      p.month.toLowerCase().trim() === month.toLowerCase().trim() &&
      p.year === String(year),
  ).length;
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
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -20 },
};

const cardVariants: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
};

// ── Card ───────────────────────────────────────────────────────────────────
function PromptCard({ prompt }: { prompt: DBPrompt }) {
  const name     = monthName(prompt.month);
  const imageKey = `${name.toLowerCase()}${prompt.year}`;
  const image    = images.find((img) => img.month === imageKey);
  const count    = getPromptCount(name, prompt.year);

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

      <h4 className="fw-semibold mb-1">{name} {prompt.year}</h4>

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

      <motion.a
        href={`/mainPromptPage/${prompt.year}/${name.toLowerCase()}`}
        className="btn btn-outline-dark btn-sm rounded-3"
        whileHover={{ x: 4 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        View prompts →
      </motion.a>
    </motion.div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function PromptsPage() {
  const [prompts, setPrompts] = useState<DBPrompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");

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
      className="container-fluid"
    >
      <Layout />
      <div className="row my-5">
        <div className="col-lg-6 col-sm-12 col-6">
          <div className="first-heading animate__animated animate__zoomInDown">
            <h1 className="first-word">PROMPTS</h1>
            <p className="h3">
              Collection of prompts written by <Link to="/">NBL</Link> members over the years
            </p>
          </div>
        </div>
        <div className="col-lg-5 col-5 col-sm-8 lottie mx-auto">
          <DotLottieReact
            src="https://lottie.host/6db403da-3cf5-45a4-8cec-3fe99fddd0c9/sq1o2jMyKu.lottie"
            backgroundColor="transparent"
            speed={0.7}
            autoplay
          />
        </div>
      </div>

      {error && <p className="text-center text-danger">{error}</p>}

      {loading ? (
        <p className="text-center my-5">Loading prompts…</p>
      ) : (
        <motion.div
          className="container py-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
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
                      <PromptCard prompt={p} />
                    </motion.div>
                  ))}
                </div>
              </section>
            )
          )}
        </motion.div>
      )}
    </motion.div>
  );
}