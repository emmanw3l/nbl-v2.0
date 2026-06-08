// import Carousel1 from "../components/carousel/carousel";
// import Carousel from '../components/carousel/carousel';
import "../promptpage.css";
// import { prompts } from "./januaryPrompts";
import PromptViewer, {
  PromptViewerApril,
  PromptViewerFeb,
  PromptViewerMJ,
  PromptViewerJuly,
  PromptViewerSeptember,
} from "../pagetext";
import { motion } from "framer-motion";
// import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import Footer from "../../components/footer/footer";
import PromptNav from "../promptNav";
import Search from "../../components/search/search";
// import { ArrowUp } from "react-bootstrap-icons";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function PromptsPage() {
  //   const show2024 = () => {
  //     console.log("Show 2024 logic goes here");
  //   };

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

  // const [isOpen, setIsOpen] = useState(false);

  // const location = useLocation();

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <PromptNav /><br /><br /><br />
      <Search/>
      {/* <Carousel1 /> */}

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

      <div className="page-container twentyfive" id="2025">
        <div className="">
          <section id="january2025" className="">
            <h1 className="text-center twenty ">JANUARY 2025</h1>
            <h3 className="jan-head text-center">Theme: Realm of Divinity</h3>

            <h3 className="text-center">PROMPT: REMINISCE OF TRANSCENDENCE</h3>
            <hr />

            <PromptViewer />
          </section>
        </div>

        <div className="page-container">
          <section id="february2025" className="">
            <h1 className="text-center twenty">FEBRUARY 2025</h1>
            <h3 className="jan-head text-center">
              Theme: Embracing the mirrors of reflection
            </h3>
            <h3 className="text-center">PROMPT: MIRROR MIRROR, WHO AM I?</h3>

            <PromptViewerFeb />
          </section>
        </div>

        <div className="page-container">
          <section id="april2025" className="">
            <h1 className="text-center twenty">APRIL 2025</h1>
            <h3 className="jan-head text-center">Theme: </h3>
            <h3 className="text-center">PROMPT: Can I rise up?</h3>
            <PromptViewerApril />
          </section>
        </div>

        <div className="page-container">
          <section id="may2025" className="">
            <h1 className="text-center twenty">MAY/JUNE 2025</h1>
            <h3 className="jan-head text-center">Theme: </h3>
            <h3 className="text-center">PROMPT: Back when I was a child</h3>
            <PromptViewerMJ />
          </section>
        </div>

        <div className="page-container">
          <section id="july2025" className="">
            <h1 className="text-center twenty">JULY 2025</h1>
            <h3 className="jan-head text-center">
              Theme: Me, myself and my mind
            </h3>
            <h3 className="text-center">PROMPT: The voice within</h3>
            <PromptViewerJuly />
          </section>
        </div>

        <div className="page-container">
          <section id="september2025">
            <h1 className="text-center twenty">September 2025</h1>
            <h3 className="jan-head text-center">
              Theme: The Break I Never Thought I Needed
            </h3>
            <h3 className="text-center">
              PROMPT: How Did You Spend Your August?
            </h3>
            <PromptViewerSeptember/>
          </section>
        </div>
      </div>

      <Footer />
    </motion.div>
  );
}
