import "./App.css";
// import Layout from "./Nav/Nav"
// import PoemViewer from "./prompts/pagetext"
import { Routes, Route, useLocation } from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import '@dotlottie/player-component';
// import MonthPromptPage from "./prompts/monthPromptPage";
// import { months } from "./prompts/monthConfig";

import { Suspense, lazy } from "react";
import PageLoader from "./components/PageLoader";
import { AnimatePresence } from "framer-motion";
import PageNotFound from "./components/pagenotfound/pageNotFound";
import January2025 from "./prompts/2025/January";
import February2025 from "./prompts/2025/February";
import April2025 from "./prompts/2025/April";
import MayJune2025 from "./prompts/2025/MayJune";
import July2025 from "./prompts/2025/July";
import September2025 from "./prompts/2025/September";
// import PromptsPage2024 from "./prompts/2024/2024promptPage";
// import { motion } from "framer-motion";
// import PromptsPage from "./prompts/mainPromptPage";
// import profiles from "./profiles/profile";

const Home = lazy(() => import("./Home"));
const PromptsPage = lazy(() => import("./prompts/mainPromptPage"));
const Profiles = lazy(() => import("./profiles/profile"));
const Awards = lazy(() => import("./awards/awards"));
// const PromptsPage2024 = lazy(() => import("./prompts/2024/2024promptPage"));

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
            <Route path="/awards" element={<Awards />} />
            <Route path="mainPromptPage/2025/January" element={<January2025 />} />
            <Route path="mainPromptPage/2025/February" element={<February2025 />} />
            <Route path="mainPromptPage/2025/April" element={<April2025 />} />
            <Route path="mainPromptPage/2025/May" element={<MayJune2025 />} />
            <Route path="mainPromptPage/2025/July" element={<July2025 />} />
            <Route path="mainPromptPage/2025/September" element={<September2025 />} />
            {/* <Route path="/2024PromptPage" element={<PromptsPage2024 />} /> */}
            {/* {months.map(({ month, year }) => (
              <Route
                key={`${month}-${year}`}
                path={`/prompts/${year.toLowerCase()}${month.replace("/", "").toLowerCase()}`}
                element={<MonthPromptPage month={month} year={year} />}
              />
            ))} */}
          </Routes>
        </Suspense>
      </AnimatePresence>
    </div>
  );
}
