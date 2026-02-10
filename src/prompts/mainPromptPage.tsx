import "./promptpage.css";
import Layout from "../Nav/Nav";
import { motion, Variants } from "framer-motion";
import { allPrompts } from "../prompts/promptCollection";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Link } from "react-router-dom";
import "../Home.css";
import January2024 from "../components/img/Prompts/2024/January_2024.jpg";
import February2024 from "../components/img/Prompts/2024/february_2024.jpg";
import March2024 from "../components/img/Prompts/2024/March_2024.jpg";
import June2024 from "../components/img/Prompts/2024/June_2024.jpg";
import August2024 from "../components/img/Prompts/2024/August_2024.jpg";
// import September2024 from "../components/img/Prompts/2024/September_2024.jpg";
import October2024 from "../components/img/Prompts/2024/October_2024.jpg";

// 2025

import January2025 from "../components/img/Prompts/2025/January_2025.jpg";
import February2025 from "../components/img/Prompts/2025/February_2025.jpg";
import April2025 from "../components/img/Prompts/2025/April_2025.jpg";
import May2025 from "../components/img/Prompts/2025/May_2025.jpg";
import September2025 from "../components/img/Prompts/2025/September_2025.jpg";
import July2025 from "../components/img/Prompts/2025/July_2025.jpg";

type PromptMonth = {
  month: string;
  year: string;
  theme: string;
  // page: "mainPromptPage" | "2024promptPage";
  // anchor: string;
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
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
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
    month: "January",
    year: "2024",
    theme: "My new chapter",
    // anchor: "january-1",
    // page: "2024promptPage",
    title: "My new chapter",
  },
  {
    month: "February",
    year: "2024",
    theme: "Paradigm of love",
    // page: "2024promptPage",
    // anchor: "february-1",
    title: "Paradigm of love",
  },
  {
    month: "March",
    year: "2024",
    theme: "She must be obeyed",
    // page: "2024promptPage",
    // anchor: "march-1",
    title: "She must be obeyed",
  },
  {
    month: "June",
    year: "2024",
    theme: "The reality of fatherhood",
    // page: "2024promptPage",
    // anchor: "june-1",
    title: "The reality of fatherhood",
  },
  {
    month: "August",
    year: "2024",
    theme: "Creativity meets emotions",
    // page: "2024promptPage",
    // anchor: "august-1",
    title: "[REDACTED]",
  },

  // {
  //   month: "September",
  //   year: "2024",
  //   theme: "",
  //   page: "2024promptPage",
  //   anchor: "september-0",
  //   title: "",
  // },
  {
    month: "October",
    year: "2024",
    theme: "The year we turned 64",
    // page: "2024promptPage",
    // anchor: "october-0",
    title: "The year we turned 64",
  },
  {
    month: "January",
    year: "2025",
    theme: "Realm of divinity",
    // page: "mainPromptPage",
    // anchor: "january-0",
    title: "Reminisce of transcendence",
  },
  {
    month: "February",
    year: "2025",
    theme: "Embracing the mirrors of reflection",
    // page: "mainPromptPage",
    // anchor: "february-0",
    title: "Mirror mirror, who am I?",
  },
  {
    month: "April",
    year: "2025",
    theme: "Can I rise up?",
    // page: "mainPromptPage",
    // anchor: "april-0",
    title: "Can I rise up?",
  },
  {
    month: "May",
    year: "2025",
    theme: "Long ago; Days of my childhood",
    // page: "mainPromptPage",
    // anchor: "may-0",
    title: "Back when I was a child",
  },
  {
    month: "July",
    year: "2025",
    theme: "Me, myself and my mind",
    // page: "mainPromptPage",
    // anchor: "july-0",
    title: "The voice within",
  },
  {
    month: "September",
    year: "2025",
    theme: "The break I never thought I needed",
    // page: "mainPromptPage",
    // anchor: "september-0",
    title: "How did you spend your August?",
  },
];

function  getPromptCount(month: string, year: string) {
  return allPrompts.filter(
    (p) =>
      p.month.toLowerCase().trim() === month.toLowerCase().trim() &&
      p.year === year,
  ).length;
}
const images = [
  { month: "january2024", src: January2024 },
  { month: "february2024", src: February2024 },
  { month: "march2024", src: March2024 },
  { month: "june2024", src: June2024 },
  { month: "august2024", src: August2024 },
  // { month: "september2024", src: September2024 },
  { month: "october2024", src: October2024 },
  { month: "january2025", src: January2025 },
  { month: "february2025", src: February2025 },
  { month: "april2025", src: April2025 },
  { month: "may2025", src: May2025 },
  { month: "september2025", src: September2025 },
  { month: "july2025", src: July2025 },
];
// function PromptCard({ m, count }: { m: PromptMonth; count: number }) {
//   return (
//     <div className=" card cards h-100 shadow-sm rounded-4 p-4">
//       {images.map((item, index) => (
//         <div key={item.month}>
//         <motion.img
//           src={item.src}
//           alt={item.month}
//           className="d-block car"
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.8 }}
//         />
//         </div>
//       ))}

//       <h4 className="fw-semibold mb-1">
//         {m.month} {m.year}
//       </h4>

//       <small className="text-muted d-block mb-2">
//         • {count} prompt{count !== 1 && "s"}
//       </small>

//       <p className=" fst-italic mb-3">
//         <u>theme</u> : {m.theme || "Monthly prompt theme goes here."}
//       </p>
//       <p className="fst-italic mb-3">
//         <u>Prompt</u> : {m.title || "Prompt title goes here."}
//       </p>

//       <a
//         href={`/mainPromptPage/${m.year}/${m.month}`}
//         className="btn btn-outline-dark btn-sm rounded-3"
//       >
//         View prompts →
//       </a>
//     </div>
//   );
// }

function PromptCard({ m, count }: { m: PromptMonth; count: number }) {
  const imageKey = `${m.month.toLowerCase()}${m.year}`;
  const image = images.find((img) => img.month === imageKey);

  return (
    <motion.div
      className="card cards h-100 shadow-sm rounded-4 ac p-4"
      whileHover={{
        y: -6,
        boxShadow: "0px 20px 40px rgba(0,0,0,0.15)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {image && (
        <motion.img
          src={image.src}
          alt={`${m.month} ${m.year}`}
          className="d-block mb-3 rounded-3 img-fluid"
          whileHover={{scale: 1.05}}
          
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        />
      )}

      <h4 className="fw-semibold mb-1">
        {m.month} {m.year}
      </h4>

      <small className="text-muted d-block mb-2">
        • {count} prompt{count !== 1 && "s"}
      </small>

      <p className="fst-italic mb-3">
        <u>Theme</u>: {m.theme || "Monthly prompt theme goes here."}
      </p>

      <p className="fst-italic mb-3">
        <u>Prompt</u>: {m.title || "Prompt title goes here."}
      </p>

      <motion.a
        href={`/mainPromptPage/${m.year}/${m.month.toLowerCase()}`}
        className="btn btn-outline-dark btn-sm rounded-3"
        whileHover={{ x: 4 }}
        transition={{type:"spring", stiffness: 400 }}
      >
        View prompts →
      </motion.a>
    </motion.div>
  );
}

export default function PromptsPage() {
  const promptMonths2024 = promptMonths.filter((m) => m.year === "2024");
  const promptMonths2025 = promptMonths.filter((m) => m.year === "2025");

  return (
    <motion.div
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5 }}
          className="container-fluid">
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
    </motion.div>
  );
}
