import "./App.css";
// import Layout from "./Nav/Nav"
// import PoemViewer from "./prompts/pagetext"
import { Routes, Route, useLocation } from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import '@dotlottie/player-component'; 



import { Suspense, lazy } from "react";
import PageLoader from "./components/PageLoader";
import { AnimatePresence } from "framer-motion";
// import { motion } from "framer-motion";
// import PromptsPage from "./prompts/mainPromptPage";
// import profiles from "./profiles/profile";


const Home = lazy(() => import("./Home"));
const PromptsPage = lazy(() => import("./prompts/mainPromptPage"));
const Profiles = lazy(() => import ("./profiles/profile"));

export default function App() {
  const location = useLocation();
  return (
     <div className="app">
      <AnimatePresence mode="wait">
        <Suspense
          fallback={
            <AnimatePresence mode="wait">
              <PageLoader />
            </AnimatePresence>
          }
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profiles />} />
            <Route path="/mainPromptPage" element={<PromptsPage />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </div>
  );
}
