// src/components/PagedContent.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  content:            string;
  paragraphsPerPage?: number;
}

export default function PagedContent({ content, paragraphsPerPage = 6 }: Props) {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction,   setDirection]   = useState(0);

  // Split content into paragraphs — double newline first, fall back to single
  const paragraphs = content
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const totalPages = Math.ceil(paragraphs.length / paragraphsPerPage);
  const start      = currentPage * paragraphsPerPage;
  const current    = paragraphs.slice(start, start + paragraphsPerPage);

  function next() {
    if (currentPage < totalPages - 1) {
      setDirection(1);
      setCurrentPage((p) => p + 1);
    }
  }

  function prev() {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage((p) => p - 1);
    }
  }

  const variants = {
    enter:  (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit:   (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
  };

  return (
    <div className="d-flex flex-column "
    >
      {/* ── Content ── */}
      <div className="flex-grow-1" >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          style={{ minHeight: "fitContent" }}>
            {current.map((para, i) => (
              <p key={i} style={{ lineHeight: 1.8, marginBottom: "0.75rem" }}>
                {para}
              </p>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Pager (only shown if more than one page) ── */}
      {totalPages > 1 && (
        <div
          className="d-flex justify-content-between align-items-center pt-3 "
          style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }}
        >
          <button
            className="btn btn-outline-dark btn-sm rounded-3"
            onClick={prev}
            disabled={currentPage === 0}
          >
            <i className="bi bi-chevron-double-left" />
          </button>

          <span className="text-muted small">
            {currentPage + 1} / {totalPages}
          </span>

          <button
            className="btn btn-outline-dark btn-sm rounded-3"
            onClick={next}
            disabled={currentPage === totalPages - 1}
          >
            <i className="bi bi-chevron-double-right" />
          </button>
        </div>
      )}
    </div>
  );
}