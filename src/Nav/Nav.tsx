import { useState } from "react";
import { NavLink } from "react-router-dom";
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
      transition={{ duration: 0.5 }}> 
      {/* Navbar */}
      <nav className="navbar navbar-dark fixed-top 100vw">
        <NavLink to= "/"
        className="navbar-brand">
          <span className="bi bi-house navbar-brand ms-2 fs-3 text-decoration-none"></span>
        </NavLink>
        <a href="#" className="navbar-brand h1 fs-sm-6 fs-sm-6 fs-lg-1 ">
          <span className="d-none d-lg-block">NAIJA BOOK LOVERS</span>
          <span className=" d-sm-block d-md-none">NBL</span>
        </a>
        
        <button className="btn pe-4 navbar-brand tree" onClick={toggleSidebar}>
          <i className={`bi ${sidebarOpen ? "bi-x" : "bi-list"} fs-3`}></i>
        </button>
      </nav>;
        <Search />

      {/* AnimatePresence handles exit animations */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            className="sidebar"
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ type: "tween", duration: 0.1 }}
          >
           
            <ul className="list-unstyled ms-auto text-center ule">
              <li>
                
                <NavLink to = "/awards" className="nav-link">Awards</NavLink>
              </li>
              <li>
                
                <NavLink to = "/profile" className="nav-link">Profiles</NavLink>

              </li>
              <li>
                <NavLink to = "/mainPromptPage" className="nav-link">Prompts</NavLink>

              </li>
            </ul>
          </motion.aside>
        )}
      </AnimatePresence>
      


      {/* Sidebar - Aligned to the right */}
      {/* <div
        className="sidebar text-white"
        style={{
          width: "250px",
          transform: sidebarOpen ? "translateX(100%)" : "translateX(-10%)",
          transition: "transform 0.3s ease-in-out",
          zIndex: 1040,
        }}
      >
        <h5></h5>
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink to="/" className="nav-link text-white">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className="nav-link text-white">
              About
            </NavLink>
          </li>
        </ul>
      </div> */}

      {/* Overlay (optional) */}
      {/* {sidebarOpen && (
        <div
          className="position-fixed end-0 start-0 w-100 h-100"
          style={{ background: "rgba(0,0,0,0.3)", zIndex: 1039 }}
          onClick={toggleSidebar}
        />
      )} */}



      
    </motion.div>
  );
}
