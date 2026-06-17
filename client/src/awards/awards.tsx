// src/awards/awards.tsx
import { useEffect, useState } from "react";
import { Link }                from "react-router-dom";
import { motion, Variants }    from "framer-motion";
import Layout                  from "../Nav/Nav";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

// ── Types ──────────────────────────────────────────────────────────────────
interface AwardNominee {
  id:       number;
  author:   { id: number; name: string; slug: string };
  work:     string;
  isWinner: boolean;
}

interface Award {
  id:          number;
  category:    string;
  description: string;
  year:        number;
  nominees:    AwardNominee[];
}

// ── Animations ─────────────────────────────────────────────────────────────
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -20 },
};

const containerVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
};

// ── Award Card ─────────────────────────────────────────────────────────────
function AwardCard({ award }: { award: Award }) {
  const [showNominees, setShowNominees] = useState(false);

  const winner    = award.nominees?.find((n) => n.isWinner);
  const otherNoms = award.nominees?.filter((n) => !n.isWinner) ?? [];

  return (
    // id anchor so search can link directly to this card
    <motion.div
      id={`award-${award.id}`}
      className="col-12 col-md-6 col-lg-4"
      variants={cardVariants}
    >
      <motion.div
        className="card h-100 shadow-sm rounded-4 p-4"
        whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.12)" }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Category badge */}
        <span
          className="badge mb-3 text-uppercase fw-semibold"
          style={{
            background:    "rgba(108,99,255,0.1)",
            color:         "#6c63ff",
            letterSpacing: ".5px",
            fontSize:      11,
            width:         "fit-content",
          }}
        >
          {award.category}
        </span>

        {/* Description */}
        <h5 className="fw-bold mb-3">{award.description}</h5>

        {/* Winner */}
        {winner && (
          <div
            className="rounded-3 p-3 mb-3"
            style={{ background: "rgba(62,207,142,0.08)", border: "1px solid rgba(62,207,142,0.2)" }}
          >
            <p className="text-uppercase fw-semibold mb-1"
              style={{ fontSize: 10, letterSpacing: ".6px", color: "#3ecf8e" }}>
              🏆 Winner
            </p>
            <Link
              to={`/profile/${winner.author.slug}`}
              className="fw-semibold text-decoration-none"
              style={{ color: "inherit" }}
            >
              {winner.author.name}
            </Link>
            {winner.work && (
              <p className="text-muted small mb-0 fst-italic mt-1 ">{winner.work}</p>
            )}
          </div>
        )}

        {/* Other nominees */}
        {otherNoms.length > 0 && (
          <>
            <button
              className="btn btn-link p-0 text-decoration-none text-muted small text-start mb-2"
              onClick={() => setShowNominees((p) => !p)}
            >
              <i className={`bi bi-chevron-${showNominees ? "up" : "down"} me-1`} />
              {showNominees ? "Hide" : "Show"} nominees ({otherNoms.length})
            </button>

            {showNominees && (
              <motion.ul
                className="list-unstyled mb-0"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.25 }}
              >
                {otherNoms.map((n) => (
                  <li key={n.id} className="d-flex align-items-start gap-2 mb-2" style={{ fontSize: 13 }}>
                    <span className="text-muted mt-1">•</span>
                    <span>
                      <Link
                        to={`/profile/${n.author.slug}`}
                        className="fw-semibold text-decoration-none"
                        style={{ color: "inherit" }}
                      >
                        {n.author.name}
                      </Link>
                      {n.work && (
                        <span className="text-muted fst-italic "> — {n.work}</span>
                        
                      )}
                    </span>
                  </li>
                ))}
              </motion.ul>
            )}
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function Awards() {
  const [awards,  setAwards]  = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");

  useEffect(() => {
    fetch(`${API}/awards`)
      .then((r) => r.json())
      .then((d: { awards: Award[] }) => setAwards(d.awards ?? []))
      .catch(() => setError("Failed to load awards."))
      .finally(() => setLoading(false));
  }, []);

  // Scroll to anchor if URL has hash (from search)
  useEffect(() => {
    if (!loading && window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [loading]);

  // Group by year ascending
  const byYear = awards.reduce<Record<number, Award[]>>((acc, a) => {
    if (!acc[a.year]) acc[a.year] = [];
    acc[a.year].push(a);
    return acc;
  }, {});
  const years = Object.keys(byYear).map(Number).sort((a, b) => a - b);

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
        <div className="text-center mb-5">
          <h1 className="fw-bold display-4 mb-3">Awards</h1>
          <p className="lead text-muted">
            Celebrating the best work from NBL members over the years
          </p>
        </div>

        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border" role="status" />
          </div>
        )}

        {error && <div className="alert alert-danger text-center">{error}</div>}

        {!loading && awards.length === 0 && (
          <p className="text-center text-muted py-5">No awards yet.</p>
        )}

        {!loading && years.map((year) => (
          <section key={year} className="mb-5">
            <div className="d-flex align-items-center gap-3 mb-4">
              <h2 className="fw-bold mb-0">{year}</h2>
              <div className="flex-grow-1" style={{ height: 1, background: "rgba(0,0,0,0.1)" }} />
              <span className="text-muted small">
                {byYear[year].length} award{byYear[year].length !== 1 && "s"}
              </span>
            </div>

            <motion.div
              className="row g-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {byYear[year].map((award) => (
                <AwardCard key={award.id} award={award} />
              ))}
            </motion.div>
          </section>
        ))}
      </div>
    </motion.div>
  );
}