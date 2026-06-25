// src/profiles/AuthorProfile.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "../Nav/Nav";
import Footer from "../components/footer/footer";
import "./authorprofile.css";
import PagedContent from "../components/PagedContent";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

const FOUNDER_SLUG = "anonymous";

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
  content: string;
  year: number;
  slug: string;
}

interface NominationAward {
  id: number;
  category: string;
  description: string;
  year: number;
}

interface Nomination {
  id: number;
  work: string;
  link?: string | null;
  isWinner: boolean;
  award: NominationAward;
}

interface Author {
  id: number;
  name: string;
  slug: string;
  prompts: Prompt[];
  nominations: Nomination[];
  createdAt: string;
}

interface AuthorSummary {
  id: number;
  name: string;
  slug: string;
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
    transition: {
      duration: 0.4,
      delay: i * 0.06,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  }),
};

export default function AuthorProfile() {
  const { slug } = useParams<{ slug: string }>();
  const isFounder = slug === FOUNDER_SLUG;

  const accent = isFounder
    ? {
        from: "#cfa544",
        to: "#1f1f1f",
        badgeBg: "rgba(207,165,68,0.15)",
        badgeText: "#b8862e",
        pageBg: "#072830",
        textColor: "#f0f0f0",
      }
    : {
        from: "#6c63ff",
        to: "#3ecf8e",
        badgeBg: "rgba(108,99,255,0.12)",
        badgeText: "#6c63ff",
        pageBg: undefined,
        textColor: undefined,
      };
  const [author, setAuthor] = useState<Author | null>(null);
  const [authors, setAuthors] = useState<AuthorSummary[]>([]);
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

  useEffect(() => {
    fetch(`${API}/authors`)
      .then((r) => r.json())
      .then((d: { authors: AuthorSummary[] }) => setAuthors(d.authors))
      .catch(console.error);
  }, []);

  const sortedPrompts = author?.prompts
    ? [...author.prompts].sort((a, b) =>
        a.year !== b.year ? a.year - b.year : a.month - b.month,
      )
    : [];

  const byYear = sortedPrompts.reduce<Record<number, Prompt[]>>((acc, p) => {
    if (!acc[p.year]) acc[p.year] = [];
    acc[p.year].push(p);
    return acc;
  }, {});

  const years = Object.keys(byYear)
    .map(Number)
    .sort((a, b) => a - b);

  const nominations = author?.nominations
    ? [...author.nominations].sort((a, b) => b.award.year - a.award.year)
    : [];
  const wins = nominations.filter((n) => n.isWinner);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  function toggleExpand(id: number) {
    setExpandedId((prev) => (prev === id ? null : id));
  }
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
      className="container-fluid"
      style={{
        background: accent.pageBg,
        color: accent.textColor,
        minHeight: "100vh",
      }}
    >
      <Layout />

      <div className="container py-5">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb align-items-center">
            <li className="breadcrumb-item">
              <Link to="/profile">Profiles</Link>
            </li>

            <li className="breadcrumb-item dropdown">
              <button
                className="btn btn-link p-0 text-decoration-none dropdown-toggle fw-semibold"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {author?.name ?? slug}
              </button>

              <ul className="dropdown-menu">
                {authors.map((a) => (
                  <li key={a.id}>
                    <Link
                      className={`small dropdown-item ${a.slug === slug ? "active" : ""}`}
                      to={`/profile/${a.slug}`}
                    >
                      {a.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ol>
        </nav>

        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border" role="status" />
          </div>
        )}

        {error && (
          <div className="text-center py-5">
            <p className="text-danger">{error}</p>
            <Link to="/profile" className="btn btn-outline-dark rounded-3 mt-2">
              ← Back to profiles
            </Link>
          </div>
        )}

        {!loading && !error && !author && (
          <div className="text-center py-5">
            <p className="text-muted">Author not found.</p>
            <Link to="/profile" className="btn btn-outline-dark rounded-3 mt-2">
              ← Back to profiles
            </Link>
          </div>
        )}

        {!loading && author && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-5">
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

              <h1 className="fw-bold mb-1">
                {author.name}
                {isFounder && (
                  <div className="marquee marqueee ">
                    <p>personality of the year <span className=" fs-6  italic">-amongst other things</span></p> 
                  </div>
                )}
              </h1>
              <p className=" small mb-0" style={{ color: accent.badgeText }}>
                {sortedPrompts.length} prompt{sortedPrompts.length !== 1 && "s"}{" "}
                written
                {nominations.length > 0 && (
                  <>
                    {" "}
                    · {nominations.length} nomination
                    {nominations.length !== 1 && "s"}
                  </>
                )}
                {wins.length > 0 && (
                  <>
                    {" "}
                    · {wins.length} award win{wins.length !== 1 && "s"}
                  </>
                )}
              </p>
            </div>

            {isFounder && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="rounded-4 p-4 mb-5 text-center"
                style={{
                  background: accent.badgeBg,
                  border: `1px solid ${accent.badgeBg}`,
                }}
              >
                <p
                  className="text-uppercase fw-semibold small mb-2"
                  style={{ letterSpacing: ".08em", color: accent.badgeText }}
                >
                  Mastermind behind the nbl site
                </p>
                <p className="mb-0" style={{ maxWidth: 560, margin: "0 auto" }}>
                  Special interface simply because I can
                </p>
                <p>I'm built different</p>
                <div className="d-flex justify-content-center gap-4">
                  <motion.a
                    href="https://emmanw3l.substack.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: accent.badgeText }}
                    whileHover={{ y: -3, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <i className="bi bi-substack fs-2" />
                  </motion.a>
                  <motion.a
                    href="https://instagram.com/emmanw3l_"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: accent.badgeText }}
                    whileHover={{ y: -3, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <i className="bi bi-instagram fs-2" />
                  </motion.a>
                  <motion.a
                    href="https://github.com/emmanw3l"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: accent.badgeText }}
                    whileHover={{ y: -3, scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <i className="bi bi-github fs-2" />
                  </motion.a>
                  <motion.a
                    href="https://wa.me/2349023990244"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: accent.badgeText }}
                    whileHover={{ y: -3, scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <i className="bi bi-whatsapp fs-2" />
                  </motion.a>
                </div>
              </motion.div>
            )}

            {nominations.length > 0 && (
              <section className="mb-5">
                <h2 className="fw-bold mb-4 text-center">
                  Awards & Nominations
                </h2>

                <div className="row g-4">
                  {nominations.map((n, i) => (
                    <motion.div
                      key={n.id}
                      className="col-12 col-md-6 col-lg-4"
                      custom={i}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.div
                        whileHover={{
                          y: -6,
                          boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                        className="card shadow-sm rounded-4 h-100 p-4"
                        style={
                          n.isWinner
                            ? {
                                background: "rgb(32, 194, 121)",
                                border: "1px solid rgb(252, 172, 0)",
                              }
                            : undefined
                        }
                      >
                        <div className="d-flex justify-content-between align-items-baseline mb-2">
                          <h5 className="fw-semibold mb-0">
                            {n.award.category}
                          </h5>
                          <span className="text-muted small">
                            {n.award.year}
                          </span>
                        </div>

                        {n.isWinner ? (
                          <span
                            className="badge mb-2"
                            style={{
                              background: "rgba(62,207,142,0.15)",
                              color: "rgb(199, 147, 36)",
                              fontWeight: 600,
                              fontSize: 15,
                              width: "fit-content",
                            }}
                          >
                            Winner
                          </span>
                        ) : (
                          <span>Nominated</span>
                        )}

                        {n.work &&
                          (n.link ? (
                            <button className="btn btn-outline-dark btn-sm">
                              <a
                                href={n.link}
                                target="_self"
                                className="text-decoration-none"
                                style={{ color: "inherit" }}
                              >
                                {n.work}
                              </a>
                            </button>
                          ) : (
                            <p className="mb-0">{n.work}</p>
                          ))}
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {years.length === 0 ? (
              <p className="text-center text-muted">No prompts yet.</p>
            ) : (
              years.map((year) => (
                <section key={year} className="mb-5">
                  <h1 className="fw-bold mb-5 text-center ">PROMPTS</h1>
                  <h3 className=" mb-4 text-center">{year}</h3>

                  <div className="row g-4">
                    {byYear[year].map((prompt, i) => {
                      const isOpen = expandedId === prompt.id;

                      return (
                        <motion.div
                          key={prompt.id}
                          className="col-12 col-md-6 col-lg-4"
                          custom={i}
                          variants={cardVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          <motion.div
                            className="card shadow-sm rounded-4 h-100 p-4"
                            whileHover={{
                              y: -4,
                              boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 20,
                            }}
                          >
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

                            <AnimatePresence>
                              {isOpen && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{
                                    duration: 0.3,
                                    ease: [0.4, 0, 0.2, 1],
                                  }}
                                  style={{ overflow: "hidden" }}
                                >
                                  <div className="pt-1 pb-3">
                                    <PagedContent content={prompt.content} />
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            <div className="mt-auto pt-3">
                              <button
                                className="btn btn-outline-dark btn-sm rounded-3"
                                onClick={() => toggleExpand(prompt.id)}
                              >
                                {isOpen
                                  ? "Hide prompt ↑"
                                  : "View full prompt ↡"}
                              </button>
                            </div>
                          </motion.div>
                        </motion.div>
                      );
                    })}
                  </div>
                </section>
              ))
            )}

            <div className="text-center mt-4">
              <Link
                to="/profile"
                className="btn btn-outline-dark rounded-3"
                style={{ color: accent.textColor }}
              >
                ← Back to profiles
              </Link>
            </div>
          </motion.div>
        )}
      </div>
      <Footer />
    </motion.div>
  );
}
