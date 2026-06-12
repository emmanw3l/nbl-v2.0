// src/prompts/MonthPromptPage.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
// import Layout from "../Nav/Nav";
import PromptNavbar from "../components/PromptNavbar";
import PagedContent from "../components/PagedContent";
import "../components/paging.css";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

const MONTH_NAMES: Record<string, number> = {
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12,
};

interface Prompt {
  id: number;
  title: string;
  content: string;
  theme: string | null;
  month: number;
  year: number;
  slug: string;
  author: {
    slug: any;
    id: number;
    name: string;
  };
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } as const },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function MonthPromptPage() {
  const { year, month } = useParams<{ year: string; month: string }>();

  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const monthNum = MONTH_NAMES[month?.toLowerCase() ?? ""];
  const monthLabel = month
    ? month.charAt(0).toUpperCase() + month.slice(1).toLowerCase()
    : "";

  useEffect(() => {
    if (!year || !monthNum) {
      setError("Invalid month or year.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    fetch(`${API}/prompts?year=${year}&month=${monthNum}`)
      .then((r) => r.json())
      .then((d: { prompts: Prompt[] }) => setPrompts(d.prompts ?? []))
      .catch(() => setError("Failed to load prompts."))
      .finally(() => setLoading(false));
  }, [year, monthNum]);

  const monthPrompt = prompts[0] ?? null;

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
      className="container-fluid"
    >
      <PromptNavbar month={month ?? ""} year={year ?? ""} />

      <div className="container py-5">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/mainPromptPage">Prompts</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/mainPromptPage">{year}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {monthLabel}
            </li>
          </ol>
        </nav>

        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border" role="status" />
          </div>
        )}

        {error && <p className="text-danger text-center">{error}</p>}

        {!loading && !error && prompts.length === 0 && (
          <div className="text-center py-5">
            <p className="text-muted">
              No prompts found for {monthLabel} {year}.
            </p>
            <Link
              to="/mainPromptPage"
              className="btn btn-outline-dark rounded-3 mt-2"
            >
              ← Back to prompts
            </Link>
          </div>
        )}

        {!loading && prompts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Month header */}
            <div className="text-center mb-5">
              <p
                className="text-muted text-uppercase fw-semibold mb-1"
                style={{ letterSpacing: ".5px", fontSize: 13 }}
              >
                {monthLabel} {year}
              </p>
              <h1 className="fw-bold display-5 mb-2">THEME: {monthPrompt?.title}</h1>
              {monthPrompt?.theme && (
                <p className="lead fst-italic text-muted">
                  Theme: {monthPrompt.theme}
                </p>
              )}
              <p className="text-muted small mt-2">
                {prompts.length} submission{prompts.length !== 1 && "s"}
              </p>
            </div>

            {/* Cards grid */}
            <motion.div
              className="row align-items-start g-4 justify-content-evenly "
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {prompts.map((prompt) => (
                <motion.div
                  key={prompt.id}
                  className="col-10 cardss col-md-5 "
                  variants={cardVariants}
                >
                  <div className=" shadow-sm rounded-4 h-100 p-4">
                    {/* Author header */}
                    <div
                      className="mb-3 pb-3"
                      style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}
                    >
                      <h2 className="fw-bold">{prompt.title}</h2>
                      <p className="text-end">
                        <Link to={`/profile/${prompt.author.slug}`}>
                          {prompt.author.name}
                        </Link>
                      </p>
                    </div>

                    <PagedContent
                      content={prompt.content}
                      paragraphsPerPage={6}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Back */}
            <div className="text-center mt-5">
              <Link
                to="/mainPromptPage"
                className="btn btn-outline-dark rounded-3"
              >
                ← Back to all prompts
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
