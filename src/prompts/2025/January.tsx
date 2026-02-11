import "../promptpage.css";
import PromptViewer from "../pagetext";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import Footer from "../../components/footer/footer";
import PromptNavigation from "../promptNavigation";
import PromptNav from "../promptNav";
import { useLocation } from "react-router-dom";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function January2025() {
  const [visible, setVisible] = useState(false);
    const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      console.log("HASH:", location.hash);
      const id = location.hash.replace("#", "");

      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const yOffset = -80; 
          const y =
            element.getBoundingClientRect().top + window.pageYOffset + yOffset;

          window.scrollTo({
            top: y,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  }, [location]);

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

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <PromptNav />
      <button
        onClick={scrollToTop}
        className={`btn  rounded-circle text-white shadow transition-opacity ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          position: "fixed",
          bottom: "70px",
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

      <div className="">
        <section id="january2025" className="">
          <h1 className="text-center twenty ">JANUARY 2025</h1>
          <h3 className="jan-head text-center">Theme: Realm of Divinity</h3>

          <h3 className="text-center">PROMPT: REMINISCE OF TRANSCENDENCE</h3>
          <hr />

          <PromptViewer />
          <div className="promptnav">
            <PromptNavigation />
          </div>
        </section>
      </div>

      <Footer />
    </motion.div>
  );
}
