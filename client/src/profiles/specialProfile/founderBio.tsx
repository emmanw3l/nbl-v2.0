import { motion } from "framer-motion";
import type { ProfileAccent } from "./specialProfiles";

export default function FounderBio({ accent }: { accent: ProfileAccent }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-4 p-4 mb-5 text-center"
      style={{
        background: accent.badgeBg,
        border: `1px solid ${accent.badgeBg}`,
      }}
    >
      <p
        className="text-uppercase fw-semibold small mb-2"
        style={{ letterSpacing: ".08em", color: accent.badgeText }}
      >
        Mastermind behind the nbl site
      </p>
      <p className="mb-0" style={{ maxWidth: 560, margin: "0 auto" }}>
        Special interface simply because I can
      </p>
      <p>I'm built different</p>
      <div className="d-flex justify-content-center gap-4">
        <motion.a
          href="https://emmanw3l.substack.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: accent.badgeText }}
          whileHover={{ y: -3, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <i className="bi bi-substack fs-2" />
        </motion.a>
        <motion.a
          href="https://instagram.com/emmanw3l_"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: accent.badgeText }}
          whileHover={{ y: -3, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <i className="bi bi-instagram fs-2" />
        </motion.a>
        <motion.a
          href="https://github.com/emmanw3l"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: accent.badgeText }}
          whileHover={{ y: -3, scale: 1.15 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <i className="bi bi-github fs-2" />
        </motion.a>
        <motion.a
          href="https://wa.me/2349023990244"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: accent.badgeText }}
          whileHover={{ y: -3, scale: 1.15 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <i className="bi bi-whatsapp fs-2" />
        </motion.a>
      </div>
    </motion.div>
  );
}