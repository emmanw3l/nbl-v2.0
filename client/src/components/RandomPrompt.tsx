// src/components/RandomPrompt.tsx
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

interface DBPrompt {
  id:      number;
  title:   string;
  theme:   string | null;
  content: string;
  month:   number;
  year:    number;
  slug:    string;
  author:  { id: number; name: string; slug: string };
}

// Get first paragraph as preview
function getPreview(content: string): string {
  const first = content.split(/\n\n+/)[0]?.trim() ?? content.trim();
  return first.length > 220 ? first.slice(0, 220) + "…" : first;
}

export default function RandomPrompt() {
  const [prompts, setPrompts]       = useState<DBPrompt[]>([]);
  const [current, setCurrent]       = useState<DBPrompt | null>(null);
  const [loading, setLoading]       = useState(true);
  const [animating, setAnimating]   = useState(false);

  useEffect(() => {
    fetch(`${API}/prompts`)
      .then((r) => r.json())
      .then((d: { prompts: DBPrompt[] }) => {
        const list = d.prompts ?? [];
        setPrompts(list);
        if (list.length > 0) {
          setCurrent(list[Math.floor(Math.random() * list.length)]);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const pickAnother = useCallback(() => {
    if (prompts.length <= 1) return;
    setAnimating(true);
    setTimeout(() => {
      let next: DBPrompt;
      do {
        next = prompts[Math.floor(Math.random() * prompts.length)];
      } while (next.id === current?.id);
      setCurrent(next);
      setAnimating(false);
    }, 250);
  }, [prompts, current]);

  const monthName = current ? MONTH_NAMES[current.month - 1] ?? "" : "";
  const monthPath = monthName.toLowerCase();
  const promptPath = current ? `/mainPromptPage/${current.year}/${monthPath}#prompt-${current.id}` : "";
  return (
    <div className="container my-5">
      <h1 className="text-center my-4">
        <u>Random Prompt</u>
      </h1>

      {loading && (
        <div className="text-center py-4">
          <div className="spinner-border" role="status" />
        </div>
      )}

      {!loading && !current && (
        <p className="text-center text-muted">No prompts available.</p>
      )}

      <AnimatePresence mode="wait">
        {!loading && current && !animating && (
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="card shadow-lg p-4 mb-5 rounded-4"
          >
            {/* Title */}
            <h2 className="fw-bold mb-1">{current.title}</h2>

            {/* Theme */}
            {current.theme && (
              <p className="text-muted fst-italic small mb-2">
                Theme: {current.theme}
              </p>
            )}

            {/* Author */}
            <Link
              to={`/profile/${current.author.slug}`}
              className="text-decoration-none text-primary"
            >
              <h5 className="mb-3">{current.author.name}</h5>
            </Link>

            {/* Month / Year */}
            <Link
              to={promptPath}
              className="text-decoration-none"
            >
              <p className="text-muted mb-3">
                {monthName} {current.year}
              </p>
            </Link>

            {/* Content preview */}
            <div className="mb-3">
              <p style={{ lineHeight: 1.8 }}>
                {getPreview(current.content)}
              </p>
            </div>

            {/* Actions */}
            <div className="d-flex gap-2 flex-wrap">
              <Link
                to={promptPath}
                className="btn btn-outline-dark btn-sm mt-3 rounded-3 flex-grow-1"
              >
                Read full prompt →
              </Link>

              <button
                className="btn btn-outline-dark btn-sm mt-3 rounded-3"
                onClick={pickAnother}
                disabled={prompts.length <= 1}
              >
                Another Prompt
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}