import "./promptpage.css";
import { motion } from "framer-motion";
// import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import Footer from "../../components/footer/footer";
import { PromptViewerOctober2024 } from "../pagetext";
import PromptNav from "../promptNav";
import Search from "../../components/search/search";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function PromptsPage2024() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  //   const location = useLocation();

  //   useEffect(() => {
  //     if (location.hash) {
  //       const element = document.querySelector(location.hash);
  //       if (element) {
  //         element.scrollIntoView({ behavior: "smooth" });
  //       }
  //     }
  //   }, [location]);
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <PromptNav />
      <br />
      <br />
      <br />
      <Search />

      <button
        onClick={scrollToTop}
        className={`btn  rounded-circle text-white shadow transition-opacity ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "50px",
          background: "#5f3205",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        <ArrowUp size={20} />
      </button>

      <div className="page-container twentyfive" id="2024">
        <div className="">
          <section id="october2024" className="">
            <h1 className="text-center twenty ">October 2024</h1>
            <h3 className="jan-head text-center">
              Theme: The Year We Turned 64
            </h3>

            <h3 className="text-center">PROMPT: The Year We Turned 64</h3>
            <hr />

            <PromptViewerOctober2024 />
          </section>
        </div>
      </div>

      <Footer />
    </motion.div>
  );
}
