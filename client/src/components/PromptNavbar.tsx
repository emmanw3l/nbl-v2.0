// src/components/PromptNavbar.tsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Search from "./search/search";

interface Props {
  month: string;
  year: string;
}

export default function PromptNavbar({ month, year }: Props) {
  const monthLabel = month
    ? month.charAt(0).toUpperCase() + month.slice(1).toLowerCase()
    : "";

  return (
    <nav
      className="navbar fixed-top px-3 px-md-4 navbar-dark"
      style={{
        background: "#5f3205",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        zIndex: 1030,
        height: 56,
      }}
    >
      {/* Three equal columns — left / center / right */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* ── Left — back ── */}
        <div className="">
          <Link
            to="/"
            className="fw-bold text-decoration-none"
            style={{ fontSize: "1.5rem" }}
          >
            <i className="bi bi-house text-white"></i>
          </Link>
        </div>

        {/* ── Center — month & year ── */}
        <motion.div
          className="text-center "
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <span className="fw-bold text-white" style={{ fontSize: "1rem" }}>
            {monthLabel}
          </span>
          {year && (
            <span className=" ms-2 text-white" style={{ fontSize: "1rem" }}>
              {year}
            </span>
          )}
        </motion.div>

        {/* ── Right — home ── */}
        <div className="d-flex justify-content-end align-items-center gap-3">
          <div className="d-flex">
            <Search />
          </div>

          <Link
            to="/mainPromptPage"
            className="btn btn-outline-light btn-sm rounded-3 d-inline-flex align-items-center gap-1"
          >
            <i className="bi bi-arrow-left" />
            <span className="d-none d-sm-inline">Prompts</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
