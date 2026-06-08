// src/components/PagedPrompts.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Prompt {
  id:      number;
  title:   string;
  content: string;
  theme:   string | null;
  month:   number;
  year:    number;
  slug:    string;
  author:  { id: number; name: string };
}

interface PagedPromptsProps {
  prompts:         Prompt[];
  promptsPerPage?: number;
}

export default function PagedPrompts({ prompts, promptsPerPage = 1 }: PagedPromptsProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction,   setDirection]   = useState(0); // -1 = prev, 1 = next

  const totalPages = Math.ceil(prompts.length / promptsPerPage);
  const start      = currentPage * promptsPerPage;
  const current    = prompts.slice(start, start + promptsPerPage);

  function nextPage() {
    if (currentPage < totalPages - 1) {
      setDirection(1);
      setCurrentPage((p) => p + 1);
    }
  }

  function prevPage() {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage((p) => p - 1);
    }
  }

  function goToPage(i: number) {
    setDirection(i > currentPage ? 1 : -1);
    setCurrentPage(i);
  }

  const variants = {
    enter:   (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center:  { opacity: 1, x: 0 },
    exit:    (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  };

  return (
    <div>
      {/* ── Prompt cards ── */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentPage}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        >
          {current.map((prompt) => (
            <div key={prompt.id} className="card shadow-sm rounded-4 p-4 p-md-5 mb-4">
              {/* Author + meta */}
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div>
                  <span className="fw-semibold">{prompt.author?.name}</span>
                </div>
                <span className="badge bg-secondary text-uppercase" style={{ letterSpacing: ".5px", fontSize: 10 }}>
                  {prompt.author?.name}
                </span>
              </div>

              {/* Content */}
              <div
                className="prompt-content"
                style={{ whiteSpace: "pre-wrap", lineHeight: 1.9, fontSize: "1.05rem" }}
              >
                {prompt.content}
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-3">
          {/* Prev */}
          <button
            className="btn btn-outline-dark rounded-3"
            onClick={prevPage}
            disabled={currentPage === 0}
          >
            <i className="bi bi-chevron-double-left me-1" />
            Previous
          </button>

          {/* Page numbers */}
          <div className="d-flex gap-2 flex-wrap justify-content-center">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className={`btn btn-sm rounded-circle ${
                  i === currentPage
                    ? "btn-dark"
                    : "btn-outline-secondary"
                }`}
                style={{ width: 36, height: 36, padding: 0 }}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {/* Next */}
          <button
            className="btn btn-outline-dark rounded-3"
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
          >
            Next
            <i className="bi bi-chevron-double-right ms-1" />
          </button>
        </div>
      )}

      {/* Page indicator */}
      {totalPages > 1 && (
        <p className="text-center text-muted small mt-3">
          Page {currentPage + 1} of {totalPages}
        </p>
      )}
    </div>
  );
}