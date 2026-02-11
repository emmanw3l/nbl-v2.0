import "../promptpage.css";
// import PromptViewerSeptember from "../pagetext";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import Footer from "../../components/footer/footer";
import PagedText from "../../components/paging";
import { Link, useLocation } from "react-router-dom";
import { septemberPrompts } from "../../assets/prompts/2025/septemberPrompt";
import PromptNav from "../promptNav";
import PromptNavigation from "../promptNavigation";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

export default function September2025() {
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
        <section id="september2025">
          <h1 className="text-center twenty">September 2025</h1>
          <h3 className="jan-head text-center">
            Theme: The Break I Never Thought I Needed
          </h3>
          <h3 className="text-center">
            PROMPT: How Did You Spend Your August?
          </h3>
          {/* <PromptViewerSeptember /> */}
          <div className="page-container py-4">
            <div className="row justify-content-evenly">
              {septemberPrompts.map((prompts) => (
                <motion.div
                  key={prompts.id}
                  className="mb-4 card col-md-5 col-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5 }}
                  id={`september-${slugify(prompts.id.toString())}`}
                >
                  <h1 className="bold">{prompts.title}</h1>
                  {/* <h4>{prompts.title1}</h4> */}
                  <h4 className="text-end blockquote">
                    <cite className="blockquote-footer">
                      <Link to={`/Profile#${slugify(prompts.author)}`}>
                        {prompts.author}
                      </Link>
                    </cite>
                  </h4>
                  <PagedText
                    paragraphs={prompts.content}
                    paragraphsPerPage={6}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <div className="promptnav">
        <PromptNavigation />
      </div>
      <Footer />
    </motion.div>
  );
}
