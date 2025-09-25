import "./App.css";
// import Layout from "./Nav/Nav"
// import PoemViewer from "./prompts/pagetext"
import { Routes, Route, useLocation } from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import '@dotlottie/player-component'; 



import { Suspense, lazy } from "react";
import PageLoader from "./components/PageLoader";
import { AnimatePresence } from "framer-motion";
import PageNotFound from "./components/pagenotfound/pageNotFound";
// import { motion } from "framer-motion";
// import PromptsPage from "./prompts/mainPromptPage";
// import profiles from "./profiles/profile";


const Home = lazy(() => import("./Home"));
const PromptsPage = lazy(() => import("./prompts/mainPromptPage"));
const Profiles = lazy(() => import ("./profiles/profile"));
const Awards = lazy(()=> import ("./awards/awards"))
const PromptsPage2024 = lazy(()=> import ("./prompts/2024promptPage"))

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
             <Route path="*" element={<PageNotFound />} />
             <Route path="/awards" element={<Awards/>}/>
             <Route path="/2024PromptPage" element={<PromptsPage2024/>}/>
          </Routes>
        </Suspense>
      </AnimatePresence>
    </div>
  );
}
