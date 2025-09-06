// import Carousel1 from "../components/carousel/carousel";
// import Carousel from '../components/carousel/carousel';
import "./promptpage.css";
// import { prompts } from "./januaryPrompts";
import PromptViewer, {
  PromptViewerApril,
  PromptViewerFeb,
  PromptViewerMJ,
  PromptViewerJuly,
} from "./pagetext";
import { motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import Footer from "../components/footer/footer";
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

  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <nav className="navbar  navbar-dark navbars fixed-top">
        <NavLink to="/">
          <span className="bi bi-house fs-3 navbar-brand ms-2"></span>
        </NavLink>

        <a className="navbar-brand mx-auto" href="#">
          PROMPTS
        </a>
        <button
          className="btn btn-outline-light"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </nav>
      <div
        className={` offcanvas sidebars offcanvas-end  ${isOpen ? "show" : ""}`}
        style={{ visibility: isOpen ? "visible" : "hidden" }}
        tabIndex={-1}
      >
        <div className="offcanvas-header   ">
          <nav className="mx-auto">
            <Link to="/awards" className="nav-link  fw-semibold dib">
              Awards
            </Link>
            <Link to="/Profile" className="nav-link  fw-semibold dib">
              Profiles
            </Link>
          </nav>
          <button
            className="btn btn-outline-light "
            onClick={() => setIsOpen(false)}
          >
            x
          </button>
        </div>

        <div className="offcanvas-body">
          <div className="accordion" id="yearAccordion">

            
            {/* 2024 Section */}


            {/* <div className="accordion-item">
              <h2 className="accordion-header" id="heading2024">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse2024"
                  aria-expanded="true"
                  aria-controls="collapse2024"
                >
                  2024
                </button>
              </h2>
              <div
                id="collapse2024"
                className="accordion-collapse collapse show"
                aria-labelledby="heading2024"
                data-bs-parent="#yearAccordion"
              >
                <div className="accordion-body">
                  <ul>
                    <li>
                      <a href="#2024-january">January</a>
                    </li>
                    <li>
                      <a href="#2024-february">February</a>
                    </li>
                    <li>
                      <a href="#2024-march">March</a>
                    </li>
                    <li>
                      <a href="#2024-april">April</a>
                    </li>
                    <li>
                      <a href="#2024-may">May</a>
                    </li>
                    <li>
                      <a href="#2024-june">June</a>
                    </li>
                    <li>
                      <a href="#2024-july">July</a>
                    </li>
                    <li>
                      <a href="#2024-august">August</a>
                    </li>
                    <li>
                      <a href="#2024-september">September</a>
                    </li>
                    <li>
                      <a href="#2024-october">October</a>
                    </li>
                    <li>
                      <a href="#2024-november">November</a>
                    </li>
                    <li>
                      <a href="#2024-december">December</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div> */}

            {/* 2025 Section */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="heading2025">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse2025"
                  aria-expanded="false"
                  aria-controls="collapse2025"
                >
                  2025
                </button>
              </h2>
              <div
                id="collapse2025"
                className="accordion-collapse collapse"
                aria-labelledby="heading2025"
                data-bs-parent="#yearAccordion"
              >
                <div className="accordion-body">
                  <ul>
                    <li>
                      <a href="#january" onClick={() => setIsOpen(false)} className="nav-link">
                        January
                      </a>
                    </li>
                    <li>
                      <a href="#february" onClick={() => setIsOpen(false)} className="nav-link">
                        February
                      </a>
                    </li>

                    <li>
                      <a href="#april" onClick={() => setIsOpen(false)} className="nav-link">
                        April
                      </a>
                    </li>
                    <li>
                      <a href="#mj" onClick={() => setIsOpen(false)} className="nav-link">
                        May
                      </a>
                    </li>
                    <li>
                      <a href="#mj" onClick={() => setIsOpen(false)} className="nav-link">
                        June
                      </a>
                    </li>
                    <li>
                      <a href="#july" onClick={() => setIsOpen(false)} className="nav-link">
                        July
                      </a>
                    </li>

                    {/* <li>
                      <a href="#september"
                      onClick={() => setIsOpen(false)}>September</a>
                    </li>
                    <li>
                      <a href="#october"
                      onClick={() => setIsOpen(false)}>October</a>
                    </li>
                    <li>
                      <a href="#november"
                      onClick={() => setIsOpen(false)}>November</a>
                    </li>
                    <li>
                      <a href="#december"
                      onClick={() => setIsOpen(false)}>December</a>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
          <section id="january" className="">
            <h1 className="text-center twenty ">JANUARY 2025</h1>
            <h3 className="jan-head text-center">Theme: Realm of Divinity</h3>

            <h3 className="text-center">PROMPT: REMINISCE OF TRANSCENDENCE</h3>
            <hr />

            <PromptViewer />
          </section>
        </div>

        <div className="page-container">
          <section id="february" className="">
            <h1 className="text-center twenty">FEBRUARY 2025</h1>
            <h3 className="jan-head text-center">
              Theme: Embracing the mirrors of reflection
            </h3>
            <h3 className="text-center">PROMPT: MIRROR MIRROR, WHO AM I?</h3>

            <PromptViewerFeb />
          </section>
        </div>

        <div className="page-container">
          <section id="april" className="">
            <h1 className="text-center twenty">APRIL 2025</h1>
            <h3 className="jan-head text-center">Theme: </h3>
            <h3 className="text-center">PROMPT: Can I rise up?</h3>
            <PromptViewerApril />
          </section>
        </div>

        <div className="page-container">
          <section id="mj" className="">
            <h1 className="text-center twenty">MAY/JUNE 2025</h1>
            <h3 className="jan-head text-center">Theme: </h3>
            <h3 className="text-center">PROMPT: Back when I was a child</h3>
            <PromptViewerMJ />
          </section>
        </div>

        <div className="page-container">
          <section id="mj" className="">
            <h1 className="text-center twenty">JULY 2025</h1>
            <h3 className="jan-head text-center">
              Theme: Me, myself and my mind
            </h3>
            <h3 className="text-center">PROMPT: The voice within</h3>
            <PromptViewerJuly />
          </section>
        </div>
      </div>

      <Footer/>
    </motion.div>
  );
}
