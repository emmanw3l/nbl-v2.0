

import { motion } from "framer-motion";
import { Feather } from "lucide-react"; 
import "./PageLoader.css";

export default function PageLoader() {
  return (
    <motion.div
      className="basic-loader"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 3, ease: "easeOut" }}
    >
      <motion.div
        className="feather-icon"
        animate={{
          y: [0, -5, 0],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Feather size={60} color="#5f3205" strokeWidth={2.5} />
      </motion.div>
      <p className="loading-text">Loading…</p>
    </motion.div>
  );
}
