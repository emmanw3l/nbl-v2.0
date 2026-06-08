// src/profiles/AuthorProfile.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "../Nav/Nav";

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

interface Prompt {
  id: number;
  title: string;
  theme: string | null;
  month: number;
  year: number;
  slug: string;
}

interface Author {
  id: number;
  name: string;
  slug: string;
  prompts: Prompt[];
  createdAt: string;
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.06, ease: [0.4, 0, 0.2, 1] },
  }),
};

export default function AuthorProfile() {
  const { slug } = useParams<{ slug: string }>();

  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError("");

    fetch(`${API}/authors/${slug}`)
      .then((r) => r.json())
      .then((d: { author: Author }) => setAuthor(d.author ?? null))
      .catch(() => setError("Failed to load author profile."))
      .finally(() => setLoading(false));
  }, [slug]);

  // Sort prompts chronologically — oldest first
  const sortedPrompts = author?.prompts
    ? [...author.prompts].sort((a, b) =>
        a.year !== b.year ? a.year - b.year : a.month - b.month,
      )
    : [];

  // Group by year for section headings
  const byYear = sortedPrompts.reduce<Record<number, Prompt[]>>((acc, p) => {
    if (!acc[p.year]) acc[p.year] = [];
    acc[p.year].push(p);
    return acc;
  }, {});

  const years = Object.keys(byYear)
    .map(Number)
    .sort((a, b) => a - b);

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

      <div className="container py-5">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/profile">Profiles</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {author?.name ?? slug}
            </li>
          </ol>
        </nav>

        {/* Loading */}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border" role="status" />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-5">
            <p className="text-danger">{error}</p>
            <Link to="/profile" className="btn btn-outline-dark rounded-3 mt-2">
              ← Back to profiles
            </Link>
          </div>
        )}

        {/* Not found */}
        {!loading && !error && !author && (
          <div className="text-center py-5">
            <p className="text-muted">Author not found.</p>
            <Link to="/profile" className="btn btn-outline-dark rounded-3 mt-2">
              ← Back to profiles
            </Link>
          </div>
        )}

        {/* Profile */}
        {!loading && author && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* ── Author header ── */}
            <div className="text-center mb-5">
              {/* Avatar initials */}
              <div
                className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3 fw-bold fs-3 text-white"
                style={{
                  width: 90,
                  height: 90,
                  background: "linear-gradient(135deg, #6c63ff, #3ecf8e)",
                  letterSpacing: 1,
                }}
              >
                {author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </div>

              <h1 className="fw-bold mb-1">{author.name}</h1>
              <p className="text-muted small">
                {sortedPrompts.length} prompt{sortedPrompts.length !== 1 && "s"}{" "}
                written
              </p>
            </div>

            {/* ── Prompts by year ── */}
            {years.length === 0 ? (
              <p className="text-center text-muted">No prompts yet.</p>
            ) : (
              years.map((year) => (
                <section key={year} className="mb-5">
                  <h2 className="fw-bold mb-4 text-center">{year}</h2>

                  <div className="row g-4">
                    {byYear[year].map((prompt, i) => (
                      <motion.div
                        key={prompt.id}
                        className="col-12 col-md-6 col-lg-4"
                        custom={i}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <div className="card shadow-sm rounded-4 h-100 p-4">
                          {/* Month badge */}
                          <span
                            className="badge mb-3 text-uppercase fw-semibold"
                            style={{
                              background: "rgba(108,99,255,0.12)",
                              color: "#6c63ff",
                              letterSpacing: ".5px",
                              width: "fit-content",
                            }}
                          >
                            {MONTH_NAMES[prompt.month - 1]} {prompt.year}
                          </span>

                          <h5 className="fw-semibold mb-2">{prompt.title}</h5>

                          {prompt.theme && (
                            <p className="text-muted fst-italic small mb-3">
                              Theme: {prompt.theme}
                            </p>
                          )}

                          <div className="mt-auto pt-3">
                            <Link
                              to={`/mainPromptPage/${prompt.year}/${MONTH_NAMES[prompt.month - 1]?.toLowerCase()}`}
                              className="btn btn-outline-dark btn-sm rounded-3"
                            >
                              View prompt →
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>
              ))
            )}

            {/* Back */}
            <div className="text-center mt-4">
              <Link to="/profile" className="btn btn-outline-dark rounded-3">
                ← Back to profiles
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
