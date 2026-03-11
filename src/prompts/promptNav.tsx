

import "./promptpage.css";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Search from "../components/search/search";
import { motion } from "framer-motion";

const promptMonths = [
  { month: "January", year: 2024 },
  { month: "February", year: 2024 },
  { month: "March", year: 2024 },
  {month: "April", year: 2024},
  { month: "June", year: 2024 },
  { month: "July", year: 2024 },
  { month: "August", year: 2024 },
  // { month: "September", year: 2024 },
  { month: "October", year: 2024 },
  { month: "January", year: 2025 },
  { month: "February", year: 2025 },
  { month: "April", year: 2025 },
  { month: "May", year: 2025 },
  // { month: "June", year: 2025 },
  { month: "July", year: 2025 },
  { month: "September", year: 2025 },
];

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const isSmallScreen = window.innerWidth < 768;

export default function PromptNav() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const navbar = document.querySelector(".navbar-collapse");
    if (navbar?.classList.contains("show")) {
      navbar.classList.remove("show");
    }
  }, [location]);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className=""
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5 }}
      >
        <nav className="navbar navbars text-white navbar-dark fixed-top 100vw">
            <Link to="/" className="navbar-brand">
              <i className="bi bi-house fs-3 text-white"></i>
            </Link>

            {promptMonths.map((m) => (
              <NavLink
                key={`${m.month}-${m.year}`}
                to={`/mainPromptPage/${m.year}/${m.month}`}
                className={({ isActive }) =>
                  `h2 text-decoration-none  ${isActive ? "" : "d-none"}`
                }
              >
                {isSmallScreen
                  ? m.month.slice(0, 3).toUpperCase()
                  : m.month === "May" && m.year === 2025
                    ? "May/June"
                    : m.month.toUpperCase()}{" "}
                {m.year}
              </NavLink>
            ))}

            <button
              className="btn btn-outline-light"
              onClick={() => setIsOpen(!isOpen)}
            >
              ☰
            </button>
          
        </nav>
        <div
          className={` offcanvas sidebars offcanvas-end ${isOpen ? "show" : ""}`}
          style={{ visibility: isOpen ? "visible" : "hidden" }}
          tabIndex={-1}
        >
          <div className="offcanvas-header justify-content-between">
            <nav className="btn m-0 p-0  btn-outline-dark ">
              <Link to="/mainPromptPage" className="nav-link  fw-semibold dib">
                <i className="bi bi-arrow-90deg-left"></i>
              </Link>
            </nav>

            <button
              className="btn btn-outline-dark "
              onClick={() => setIsOpen(false)}
            >
              <i className="bi bi-x"></i>
            </button>
          </div>
          <div className="offcanvas-body">
            <div className="mb-5">
              <h3 className="mb-3 text-center">Prompt months</h3>
              {promptMonths.map((m) => (
                <ol className="list-group list-group-numbered">
                  <NavLink
                    key={`${m.month}-${m.year}`}
                    to={`/mainPromptPage/${m.year}/${m.month}`}
                    className={({ isActive }) =>
                      `btn btn-sm rounded-pill my-1 btn-outline-dark ${isActive ? "btn-activee " : "btn-outline-dark"}`
                    }
                  >
                    <li className=" justify-content-between align-items-center ">
                      {m.month.slice(0, 3).toUpperCase()} {m.year}
                    </li>
                  </NavLink>
                </ol>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
      <div className="space"></div>
      <Search />
    </motion.div>
  );
}
