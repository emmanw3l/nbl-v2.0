// import Carousel1 from "../components/carousel/carousel";
// import Carousel from '../components/carousel/carousel';
import "./promptpage.css";
// import { prompts } from "./januaryPrompts";
import PromptViewer, { PromptViewerApril, PromptViewerFeb, PromptViewerMJ,PromptViewerJuly } from "./pagetext";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};




export default function PromptsPage() {
  //   const show2024 = () => {
  //     console.log("Show 2024 logic goes here");
  //   };
  return (
    <motion.div
    variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <nav className="navbar  navbar-dark navbars ">
        <NavLink to="/">
        <span className="bi bi-house fs-3 navbar-brand ms-2"></span></NavLink>
        
          <a className="navbar-brand mx-auto" href="#">
            PROMPTS
          </a>
        
      </nav>
      {/* <Carousel1 /> */}

      <div className="page-container" id="2025">
        <div className="">
          <h1 className="text-center twenty ">JANUARY 2025</h1>
          <h3 className="jan-head text-center">Theme: Realm of Divinity</h3>

          <h3 className="text-center">PROMPT: REMINISCE OF TRANSCENDENCE</h3>
          <hr />

          <section id="january" className="">
            <PromptViewer />
            
          </section>
        </div>


        <div className="page-container">
          <h1 className="text-center twenty">FEBRUARY 2025</h1>
          <h3 className="jan-head text-center">Theme: Embracing the mirrors of reflection</h3>
          <h3 className="text-center">PROMPT: MIRROR MIRROR, WHO AM I?</h3>
          <section id="february" className="">
            <PromptViewerFeb/>
          </section>
        </div>

        <div className="page-container">
          <h1 className="text-center twenty">APRIL 2025</h1>
          <h3 className="jan-head text-center">Theme: </h3>
          <h3 className="text-center">PROMPT: Can I rise up?</h3>
          <section id="april" className="">
            <PromptViewerApril/>
          </section>
        </div>

        <div className="page-container">
          <h1 className="text-center twenty">MAY/JUNE 2025</h1>
          <h3 className="jan-head text-center">Theme: </h3>
          <h3 className="text-center">PROMPT: Back when I was a child</h3>
          <section id="mj" className="">
            <PromptViewerMJ/>
          </section>
        </div>

        <div className="page-container">
          <h1 className="text-center twenty">JULY 2025</h1>
          <h3 className="jan-head text-center">Theme: Me, myself and my mind</h3>
          <h3 className="text-center">PROMPT: The voice within</h3>
          <section id="mj" className="">
            <PromptViewerJuly/>
          </section>
        </div>
        
      </div>
    </motion.div>
  );
}
