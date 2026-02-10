import "../promptpage.css";
// import PromptViewerApril from "../pagetext";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import Footer from "../../components/footer/footer";
import { aprilPrompts } from "../../assets/prompts/2025/aprilPrompt";
import { Link } from "react-router-dom";
import PagedText from "../../components/paging";
import PromptNavigation from "../promptNavigation";
import PromptNav from "../promptNav";

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

export default function April2025() {
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

      <div className="">
        <section id="april2025" className="">
          <h1 className="text-center twenty">APRIL 2025</h1>
          <h3 className="jan-head text-center">Theme: </h3>
          <h3 className="text-center">PROMPT: Can I rise up?</h3>

          {/* <PromptViewerApril /> */}

          <div className="page-container py-4">
            <div className="row justify-content-evenly">
              {aprilPrompts.map((prompts) => (
                <motion.div
                  key={prompts.id}
                  className="mb-4 card col-md-5 col-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5 }}
                  id={`april-${slugify(prompts.id.toString())}`}
                >
                  <h1 className="bold">{prompts.title}</h1>
                  <h4>{prompts.title1}</h4>
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
