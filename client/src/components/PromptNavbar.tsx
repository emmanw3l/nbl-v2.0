// src/components/PromptNavbar.tsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface Props {
  month: string;
  year:  string;
}

export default function PromptNavbar({ month, year }: Props) {
  const monthLabel = month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();

  return (
    <nav
      className="navbar sticky-top px-3 px-md-4"
      style={{
        background:   "rgba(255,255,255,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        zIndex: 1030,
      }}
    >
      <div className="container-fluid d-flex align-items-center justify-content-between">

        {/* ── Left — back link ── */}
        <Link
          to="/mainPromptPage"
          className="btn btn-outline-dark btn-sm rounded-3 d-flex align-items-center gap-1"
          style={{ minWidth: 90 }}
        >
          <i className="bi bi-arrow-left" />
          <span className="d-none d-sm-inline">Prompts</span>
        </Link>

        {/* ── Center — month & year ── */}
        <motion.div
          className="text-center position-absolute start-50 translate-middle-x"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span
            className="fw-bold"
            style={{ fontSize: "1.05rem", letterSpacing: ".3px" }}
          >
            {monthLabel}
          </span>
          <span
            className="text-muted ms-2"
            style={{ fontSize: "1.05rem" }}
          >
            {year}
          </span>
        </motion.div>

        {/* ── Right — home link ── */}
        <Link
          to="/"
          className="navbar-brand fw-bold mb-0"
          style={{ fontSize: "1rem", minWidth: 90, textAlign: "right" }}
        >
          NBL
        </Link>

      </div>
    </nav>
  );
}