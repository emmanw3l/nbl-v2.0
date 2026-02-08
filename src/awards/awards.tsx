import { motion } from "framer-motion";
// import { awardCategories } from "./awardCategories";
import Layout from "../Nav/Nav";
import "./awards.css";
// import { Link } from "react-router-dom";
// import { Trophy } from "lucide-react";

import AwardsAccordion2024 from "./awardViewer";
import AwardsAccordion2023 from "./awardViewer2023";
import Search from "../components/search/search";
// import AwardCard from "./awardViewerTesting";

// function slugify(name: string) {
//   return name
//     .toLowerCase()
//     .replace(/\s+/g, "-")
//     .replace(/[^\w-]+/g, "");
// }

export default function AwardsAccordion() {
  


  return (
    <motion.div
      className="container py-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <Layout />
      <br />
      <Search/>


      <AwardsAccordion2024/>
      <AwardsAccordion2023/>
      {/* <AwardCard/> */}
    </motion.div>
  );


  
}
