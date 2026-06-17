// src/profiles/profile.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import Layout from "../Nav/Nav";
import Footer from "../components/footer/footer";
import "./profile.css";

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
interface PromptMeta {
  id: number;
  title: string;
  month: number;
  year: number;
  slug: string;
}

interface Nomination {
  id: number;
  isWinner: boolean;
  award: {
    id: number;

    category: string;
  };
}

interface Author {
  id: number;
  name: string;
  slug: string;
  prompts: PromptMeta[];
  nominations: Nomination[];
  _count: { prompts: number; nominations: number };
}

type SortKey = "name" | "prompts" | "nominations" | "awards";

// ── Helpers ────────────────────────────────────────────────────────────────
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const AVATAR_COLORS: [string, string][] = [
  ["#6c63ff", "#3d3799"],
  ["#3ecf8e", "#1a9e63"],
  ["#f59e0b", "#b97a00"],
  ["#38bdf8", "#0284c7"],
  ["#f472b6", "#c2185b"],
  ["#a78bfa", "#6d28d9"],
  ["#fb923c", "#c2410c"],
  ["#34d399", "#059669"],
];

function getColor(name: string): [string, string] {
  const index =
    name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) %
    AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

function winCount(author: Author): number {
  return author.nominations?.filter((n) => n.isWinner).length ?? 0;
}
function nominationCount(author: Author): number {
  return author.nominations?.length ?? 0;
}

function sortAuthors(authors: Author[], key: SortKey): Author[] {
  return [...authors].sort((a, b) => {
    if (key === "name") return a.name.localeCompare(b.name);
    if (key === "prompts") return b._count.prompts - a._count.prompts;
    if (key === "nominations") return nominationCount(b) - nominationCount(a);
    if (key === "awards") return winCount(b) - winCount(a);
    return 0;
  });
}

// ── Animations ─────────────────────────────────────────────────────────────
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
};

// ── Author Card ────────────────────────────────────────────────────────────
function AuthorCard({ author, index }: { author: Author; index: number }) {
  const [light, dark] = getColor(author.name);
  const wins = winCount(author);
  const nominations = nominationCount(author);
  const isNominee = author.nominations?.length > 0 && wins === 0;

  const awards = author.nominations?.filter((n) => n.isWinner) ?? [];

  const [showPrompts, setShowPrompts] = useState(false);
  const [showAwards, setShowAwards] = useState(false);
  return (
    <motion.div
      className="col-12  col-sm-6 col-lg-4 col-xl-3"
      variants={cardVariants}
    >
      <div
        className={`card h-100 rounded-4 p-4 position-relative author-card ${
          index % 2 === 0 ? "ac" : "ac-even"
        }`}
      >
        {/* Award badge */}
        {wins > 0 && (
          <span
            className="position-absolute top-0 end-0 mt-2 me-2 badge"
            style={{
              background: "rgba(245,158,11,0.15)",
              color: "#8a5d0f",
              fontSize: 11,
            }}
          >
            🏆 {wins > 1 ? `${wins}x Winner` : "Winner"}
          </span>
        )}
        {isNominee && (
          <span
            className="position-absolute top-0 end-0 mt-2 me-2 badge"
            style={{
              background: "rgba(108,99,255,0.1)",
              color: "#6c63ff",
              fontSize: 11,
            }}
          >
            ✦ Nominee
          </span>
        )}

        {/* Avatar + name */}
        <div className="text-center mb-3">
          <div
            className="rounded-circle d-inline-flex align-items-center justify-content-center mb-2 fw-bold text-white"
            style={{
              width: 64,
              height: 64,
              fontSize: "1.2rem",
              background: `linear-gradient(135deg, ${light}, ${dark})`,
            }}
          >
            {getInitials(author.name)}
          </div>
          <h5 className="fw-bold mb-0">{author.name}</h5>
          <p className="text-muted small mb-0">
            {author._count.prompts} prompt{author._count.prompts !== 1 && "s"}
            {" · "}
            {nominations} nomination{nominations !== 1 && "s"}
            {wins > 0 && (
              <>
                {" · "}
                {wins} award{wins !== 1 && "s"} won
              </>
            )}
          </p>
        </div>

        {/* Prompt titles */}
        <button
          className="btn btn-link p-0 text-decoration-none text-muted small text-start mb-2"
          onClick={() => setShowPrompts((p) => !p)}
        >
          <i className={`bi bi-chevron-${showPrompts ? "up" : "down"} me-1`} />
          {showPrompts ? "Hide" : "Show"} prompts ({author.prompts.length})
        </button>

        {showPrompts && (
          <motion.ul
            className="list-unstyled mb-3"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{ maxHeight: 140, overflowY: "auto" }}
          >
            {author.prompts.map((p) => {
              const monthName = MONTH_NAMES[p.month - 1]?.toLowerCase() ?? "";

              return (
                <li key={p.id} className="mb-2">
                  <Link
                    to={`/mainPromptPage/${p.year}/${monthName}#prompt-${p.id}`}
                    className="text-decoration-none d-flex gap-2 text-white"
                  >
                    <span className="text-muted">⁍</span>
                    <span className="">{p.title}</span>
                  </Link>
                </li>
              );
            })}
          </motion.ul>
        )}
        <hr className="my-3 opacity-25" />
        <button
          className="btn btn-link p-0 text-decoration-none text-muted small text-start mb-2"
          onClick={() => setShowAwards((p) => !p)}
        >
          <i className={`bi bi-chevron-${showAwards ? "up" : "down"} me-1`} />
          {showAwards ? "Hide" : "Show"} awards ({awards.length})
        </button>

        {showAwards && (
          <motion.ul
            className="list-unstyled mb-0"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            {awards.length === 0 ? (
              <li className="text-muted small">No awards yet.</li>
            ) : (
              awards.map((n) => (
                <li key={n.id} className="d-flex gap-2 mb-2">
                  <span>🏆</span>

                  <span className="fw-semibold">
                    {n.award?.category ?? "Unknown Award"}
                  </span>
                </li>
              ))
            )}
          </motion.ul>
        )}



        {/* View profile */}
        <div className="mt-auto pt-2">
          <Link
            to={`/profile/${author.slug}`}
            className="btn btn-outline-dark btn-sm rounded-3 w-100"
          >
            View Full Profile →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function Profiles() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("name");

  useEffect(() => {
    fetch(`${API}/authors`)
      .then((r) => r.json())
      .then((d: { authors: Author[] }) => setAuthors(d.authors ?? []))
      .catch(() => setError("Failed to load authors."))
      .finally(() => setLoading(false));
  }, []);

  const sorted = sortAuthors(authors, sortBy);

  const SORT_OPTIONS: { key: SortKey; label: string; icon: string }[] = [
    { key: "name", label: "A – Z", icon: "bi-sort-alpha-down" },
    { key: "prompts", label: "Most Prompts", icon: "bi-pencil-square" },
    { key: "nominations", label: "Most Nominations", icon: "bi-bookmark-star" },
    { key: "awards", label: "Most Awards", icon: "bi-trophy" },
  ];

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
      className="container-fluid body"
    >
      <Layout />

      <div className="container py-5">
        {/* Header */}
        <div className="text-center mb-4">
          {/* <h1 className="fw-bold display-4 mb-2">Our Writers</h1> */}
          {/* <p className="lead text-muted mb-1">The voices behind every prompt</p> */}
          {!loading && (
            <p className="text-muted small">
              {authors.length} author{authors.length !== 1 && "s"}
            </p>
          )}
        </div>

        {/* Sort controls */}
        {!loading && authors.length > 0 && (
          <div className="d-flex justify-content-center gap-2 flex-wrap mb-5">
            {SORT_OPTIONS.map(({ key, label, icon }) => (
              <button
                key={key}
                className={`btn btn-sm rounded-3 d-inline-flex align-items-center gap-1 ${
                  sortBy === key ? "btn-dark" : "btn-outline-secondary"
                }`}
                onClick={() => setSortBy(key)}
              >
                <i className={`bi ${icon}`} />
                {label}
              </button>
            ))}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border" role="status" />
          </div>
        )}

        {/* Error */}
        {error && <div className="alert alert-danger text-center">{error}</div>}

        {/* Empty */}
        {!loading && sorted.length === 0 && (
          <p className="text-center text-muted">No authors yet.</p>
        )}

        {/* Grid */}
        {!loading && sorted.length > 0 && (
          <motion.div
            className="row g-4 align-items-stretch "
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={sortBy} // re-animate on sort change
          >
            {sorted.map((author, index) => (
              <AuthorCard key={author.id} author={author} index={index} />
            ))}
          </motion.div>
        )}
      </div>
      <Footer />
    </motion.div>
  );
}
