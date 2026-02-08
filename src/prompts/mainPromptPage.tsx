import "./promptpage.css";
import Layout from "../Nav/Nav";
import { motion, Variants } from "framer-motion";
import { allPrompts } from "../prompts/promptCollection";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Link } from "react-router-dom";

type PromptMonth = {
  month: string;
  year: string;
  Theme: string;
  page: "mainPromptPage" | "2024promptPage";
  anchor: string;
  title: string;
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const promptMonths: PromptMonth[] = [
  {
    month: "September",
    year: "2024",
    Theme: "",
    page: "2024promptPage",
    anchor: "september-0",
    title: "",
  },
  {
    month: "October",
    year: "2024",
    Theme: "",
    page: "2024promptPage",
    anchor: "october-0",
    title: "",
  },
  {
    month: "January",
    year: "2025",
    Theme: "Realm of divinity",
    page: "mainPromptPage",
    anchor: "january-0",
    title: "Reminisce of transcendence",
  },
  {
    month: "February",
    year: "2025",
    Theme: "Embracing the mirrors of reflection",
    page: "mainPromptPage",
    anchor: "february-0",
    title: "Mirror mirror, who am I?",
  },
  {
    month: "April",
    year: "2025",
    Theme: "Can I rise up?",
    page: "mainPromptPage",
    anchor: "april-0",
    title: "Can I rise up?",
  },
  {
    month: "May",
    year: "2025",
    Theme: "Back when I was a child",
    page: "mainPromptPage",
    anchor: "may-0",
    title: "Back when I was a child",
  },
  {
    month: "July",
    year: "2025",
    Theme: "Me, myself and my mind",
    page: "mainPromptPage",
    anchor: "july-0",
    title: "The voice within",
  },
  {
    month: "September",
    year: "2025",
    Theme: "The break I never thought I needed",
    page: "mainPromptPage",
    anchor: "september-0",
    title: "How did you spend your August?",
  },
];

function getPromptCount(month: string, year: string) {
  return allPrompts.filter(
    (p) =>
      p.month.toLowerCase().trim() === month.toLowerCase().trim() &&
      p.year === year,
  ).length;
}

function PromptCard({ m, count }: { m: PromptMonth; count: number }) {
  return (
    <div className=" card h-100 shadow-sm rounded-4 p-4">
      <h4 className="fw-semibold mb-1">
        {m.month} {m.year}
      </h4>

      <small className="text-muted d-block mb-2">
        • {count} prompt{count !== 1 && "s"}
      </small>

      <p className=" fst-italic mb-3">
        <u>Theme</u> : {m.Theme || "Monthly prompt Theme goes here."}
      </p>
      <p className="fst-italic mb-3">
        <u>Prompt</u> : {m.title || "Prompt title goes here."}
      </p>

      {/* <a
        href={`/${m.page}#${m.anchor}`}
        className="btn btn-outline-dark btn-sm rounded-3"
      >
        View prompts →
      </a> */}
      <a
        href={`/${m.year}/${m.month}`}
        className="btn btn-outline-dark btn-sm rounded-3"
      >
        View prompts →
      </a>
    </div>
  );
}

export default function PromptsPage() {
  const promptMonths2024 = promptMonths.filter((m) => m.year === "2024");
  const promptMonths2025 = promptMonths.filter((m) => m.year === "2025");

  return (
    <>
      <Layout />
      <div className="row my-5">
        <div className="col-lg-6 col-sm-12 col-6">
          <div className="first-heading animate__animated animate__zoomInDown">
            <h1 className="first-word ">PROMPTS</h1>
            <p className=" h3">
              Collection of prompts written by <Link to="/">NBL</Link> members
              over the years
            </p>
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
      <motion.div
        className="container py-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* ===== 2024 PROMPTS ===== */}
        <section className="mb-5">
          <h2 className="fw-bold mb-4 text-center">2024 Prompts</h2>

          <div className="row g-4">
            {promptMonths2024.map((m) => {
              const count = getPromptCount(m.month, m.year);

              return (
                <motion.div
                  key={`${m.month}-${m.year}`}
                  className="col-md-6 col-lg-4"
                  variants={cardVariants}
                >
                  <PromptCard m={m} count={count} />
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ===== 2025 PROMPTS ===== */}
        <section>
          <h2 className="fw-bold mb-4 text-center">2025 Prompts</h2>

          <div className="row g-4">
            {promptMonths2025.map((m) => {
              const count = getPromptCount(m.month, m.year);

              return (
                <motion.div
                  key={`${m.month}-${m.year}`}
                  className="col-md-6 col-lg-4"
                  variants={cardVariants}
                >
                  <PromptCard m={m} count={count} />
                </motion.div>
              );
            })}
          </div>
        </section>
      </motion.div>
    </>
  );
}
