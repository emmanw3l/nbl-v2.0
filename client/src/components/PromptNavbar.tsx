import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Search from "./search/search";
import { useState } from "react";

interface Props {
  month: string;
  year: string;
}

export default function PromptNavbar({ month, year }: Props) {
  const monthLabel = month
    ? month.charAt(0).toUpperCase() + month.slice(1).toLowerCase()
    : "";

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <nav
      className="navbar fixed-top px-3 px-md-4 navbar-dark"
      style={{
        background: "#5f3205",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        zIndex: 1030,
        height: 60,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Left — home */}
        <Link to="/" className="text-decoration-none" style={{ fontSize: "1.5rem", lineHeight: 1 }}>
          <i className="bi bi-house text-white" />
        </Link>

        {/* Center — month & year */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <span className="fw-bold text-white" style={{ fontSize: "1rem" }}>
            {monthLabel}
          </span>
          {year && (
            <span className="ms-2 text-white" style={{ fontSize: "1rem" }}>
              {year}
            </span>
          )}
        </motion.div>

        {/* Right — search & menu toggle */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "0.25rem" }}>
          <Search />
          <button
            className="btn text-white p-1"
            onClick={() => setSidebarOpen((o) => !o)}
            aria-label={sidebarOpen ? "Close menu" : "Open menu"}
            aria-expanded={sidebarOpen}
          >
            <i className={`bi ${sidebarOpen ? "bi-x" : "bi-list"} fs-3`} />
          </button>
        </div>
      </div>

      {/* Sidebar — sibling to the grid so it spans full width */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            className="sidebar"
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ type: "tween", duration: 0.2 }}
             style={{
              backdropFilter: "blur(32px)",
              borderBottom: "1px solid rgba(0,0,0,0.08)",
              zIndex: 1030,
            }}
          >
            <ul className="list-unstyled text-center mb-0">
              <li><Link to="/awards"        className="nav-link text-white">Awards</Link></li>
              <li><Link to="/profile"       className="nav-link text-white">Profiles</Link></li>
              <li><Link to="/mainPromptPage" className="nav-link text-white">Prompts</Link></li>
            </ul>
          </motion.aside>
        )}
      </AnimatePresence>
    </nav>
  );
}