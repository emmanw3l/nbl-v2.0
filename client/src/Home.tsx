// import { JSX } from "react";
import "./home.css";
import Layout from "./Nav/Nav";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Content from "./content/content";
import Footer from "./components/footer/footer";
import { motion } from "framer-motion";

// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
import RandomPrompt from "./components/RandomPrompt";
// import Search from "./components/search/search";

// Define the interface for your prompts


const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function Home() {


  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
      className="container-fluid "
    >
      <Layout />
      
      {/* <Search /> */}

      <div className="row ">
        <div className="col-lg-6 col-sm-12 col-6">
          <div className="first-heading animate__animated animate__zoomInDown">
            <h1 className="first-word">WELCOME</h1>
            <h1>To Naija Book Lovers</h1>
          </div>
        </div>

        <div className="col-lg-5 col-5 col-sm-8 lottie mx-auto mt-5">
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
      <RandomPrompt/>

      <Footer />
    </motion.div>
  );
}
