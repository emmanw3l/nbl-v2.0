import { JSX } from "react";
import "./Home.css";
import Layout from "./Nav/Nav";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Content from "./content/content";
import Footer from "./components/footer/footer";
import { motion } from "framer-motion";
import { getRandomPrompt } from "./prompts/promptCollection";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
// import Search from "./components/search/search";

// Define the interface for your prompts
interface Prompt {
  id: number;
  title: string;
  author: string;
  month: string;
  year: string;
  content: JSX.Element[];
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function Home() {
  const [randomPrompt, setRandomPrompt] = useState<Prompt | null>(null);

  useEffect(() => {
    setRandomPrompt(getRandomPrompt());
  }, []);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
      className="container-fluid"
    >
      <Layout />
      {/* <Search /> */}

      <div className="row my-4">
        <div className="col-lg-6 col-sm-12 col-6">
          <div className="first-heading animate__animated animate__zoomInDown">
            <h1 className="first-word">WELCOME</h1>
            <h1>To Naija Book Lovers</h1>
          </div>
        </div>

        <div className="col-lg-5 col-5 col-sm-8 lottie mx-auto">
          <DotLottieReact
            src="https://lottie.host/6db403da-3cf5-45a4-8cec-3fe99fddd0c9/sq1o2jMyKu.lottie"
            backgroundColor="transparent"
            speed={0.7}
            autoplay
          />
        </div>
      </div>

      <Content />

      {/* Random Prompt Card */}
      <div className="container my-5 ">
        <h1 className="text-center my-4">
          <u> Random Prompts</u>
        </h1>
        {randomPrompt && (
          <div className="card shadow-lg p-4 mb-5 rounded-4">
            <h2 className="fw-bold mb-1">{randomPrompt.title}</h2>

            {/* Author link */}
            <Link
              to={`/profile#${randomPrompt.author
                .replace(/\s+/g, "-")
                .toLowerCase()}`}
              className="text-decoration-none text-primary"
            >
              <h5 className="mb-3">{randomPrompt.author}</h5>
            </Link>

            <Link
              className="text-decoration-none"
              to={`/${randomPrompt.year === "2024" ? "mainPromptPage/2024/" : "mainPromptPage/2025/"}${randomPrompt.month.toLowerCase().trim()}`}
            >
              <p className="text-muted mb-3">
                <span className="cap"></span>
                {randomPrompt.month} {randomPrompt.year}
              </p>
            </Link>

            {/* Preview first two lines */}
            <div className="mb-3">
              {randomPrompt.content.slice(0, 1)}
              <span className="h3">...</span>
            </div>

            <div className="d-flex gap-2">
              <Link
                to={`/${
                  randomPrompt.year === "2024"
                    ? "mainPromptPage/2024/"
                    : randomPrompt.year === "2025"
                      ? "mainPromptPage/2025/"
                      : randomPrompt.year === "2026"
                        ? "mainPromptPage/2026/"
                        : "mainPromptPage/2023/"
                }${randomPrompt.month.toLowerCase().trim()}#${randomPrompt.id}`}
                className="btn btn-outline-dark btn-sm mt-3 w-100 rounded-3"
              >
                Read full prompt →
              </Link>

              <button
                className="btn btn-outline-dark btn-sm rounded-3"
                onClick={() => setRandomPrompt(getRandomPrompt())}
              >
                Another Prompt
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </motion.div>
  );
}
