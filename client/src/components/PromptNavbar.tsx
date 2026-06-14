// src/components/PromptNavbar.tsx
import { Link }   from "react-router-dom";
import { motion } from "framer-motion";

interface Props {
  month: string;
  year:  string;
}

export default function PromptNavbar({ month, year }: Props) {
  const monthLabel = month
    ? month.charAt(0).toUpperCase() + month.slice(1).toLowerCase()
    : "";

  return (
    <nav
      className="navbar fixed-top px-3 px-md-4"
      style={{
        background:     "rgba(255,255,255,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom:   "1px solid rgba(0,0,0,0.08)",
        zIndex:         1030,
        height:         56,
      }}
    >
      {/* Three equal columns — left / center / right */}
      <div
        style={{
          display:       "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems:    "center",
          width:         "100%",
        }}
      >
        {/* ── Left — back ── */}<div className="">
          <Link to="/" className="fw-bold text-decoration-none" style={{ fontSize: "1.5rem" }}>
            <i className="bi bi-house text-black"></i>
          </Link>
        </div>
        

        {/* ── Center — month & year ── */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <span className="fw-bold" style={{ fontSize: "1rem" }}>
            {monthLabel}
          </span>
          {year && (
            <span className="text-muted ms-2" style={{ fontSize: "1rem" }}>
              {year}
            </span>
          )}
        </motion.div>

        {/* ── Right — home ── */}
        <div className="text-end">
          <Link
            to="/mainPromptPage"
            className="btn btn-outline-dark btn-sm rounded-3 d-inline-flex align-items-center gap-1"
          >
            <i className="bi bi-arrow-left" />
            <span className="d-none d-sm-inline">Prompts</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}