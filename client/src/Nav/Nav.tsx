import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./Nav.css";
import Search from "../components/search/search";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
      className=""
    >
      {/* Navbar */}
      <nav
        className="navbar navbar-dark fixed-top px-3 px-md-4"
        style={{
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          zIndex: 1030,
        }}
      >
        <Link
          to="/"
          className="navbar-brand fw-bold mb-0"
          style={{ fontSize: "2rem", minWidth: 90, textAlign: "left" }}
        >
          <i className="bi bi-house "></i>
        </Link>
        <a href="#" className="navbar-brand h1 fs-sm-6 fs-sm-6 fs-lg-1 ">
          <span className="d-none d-lg-block">NAIJA BOOK LOVERS</span>
          <span className=" d-sm-block d-md-none">NBL</span>
        </a>
        

      <Search />
        <button className="btn pe-4 navbar-brand tree" onClick={toggleSidebar}>
          <i className={`bi ${sidebarOpen ? "bi-x" : "bi-list"} fs-3`}></i>
        </button>
      </nav>

      {/* AnimatePresence handles exit animations */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            className="sidebar"
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ type: "tween", duration: 0.1 }}
            style={{
              backdropFilter: "blur(32px)",
              borderBottom: "1px solid rgba(0,0,0,0.08)",
              zIndex: 1030,
            }}
          >
            <ul className="list-unstyled ms-auto text-center ule">
              <li>
                <Link to="/awards" className="nav-link">
                  Awards
                </Link>
              </li>
              <li>
                <Link to="/profile" className="nav-link">
                  Profiles
                </Link>
              </li>
              <li>
                <Link to="/mainPromptPage" className="nav-link">
                  Prompts
                </Link>
              </li>
            </ul>
          </motion.aside>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
