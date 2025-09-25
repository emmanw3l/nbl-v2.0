import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import "../awards/awardviewer.css";
import { awardCategories2023 } from "./awardCategories2023";

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

export default function AwardCard() {
  return (
    <div>
      {awardCategories2023.map((award) => (
        <motion.div
          key={award.id}
          className="card border-0 shadow-lg mb-4 rounded-4 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          {/* Award Header */}
          <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center py-3 px-4">
            <h5 className="mb-0 fw-bold">{award.category}</h5>
            <span className="badge bg-warning text-dark px-3">
              {award.year}
            </span>
          </div>

          {/* Award Body */}
          <div className="card-body bg-light">
            <ul className="list-group list-group-flush">
              {award.nominees.map((nominee, idx) => {
                const isWinner = Array.isArray(award.winner)
                  ? Array.isArray(nominee) &&
                    nominee.every((n, i) => award.winner[i] === n)
                  : award.winner === nominee;

                return (
                  <li
                    key={idx}
                    className={`list-group-item d-flex align-items-center border-0 py-3 ${
                      isWinner
                        ? "bg-gradient fw-bold text-dark winner-item"
                        : "bg-white"
                    }`}
                  >
                    {/* Nominee Name(s) */}
                    {Array.isArray(nominee) ? (
                      nominee.map((name, i) => (
                        <span key={name}>
                          <Link
                            to={`/profile#${slugify(name)}`}
                            className="text-decoration-none text-dark"
                          >
                            {name}
                          </Link>
                          {i < nominee.length - 1 && " and "}
                        </span>
                      ))
                    ) : (
                      <Link
                        to={`/profile#${slugify(nominee as string)}`}
                        className="text-decoration-none text-dark"
                      >
                        {nominee}
                      </Link>
                    )}

                    {/* Winner Trophy */}
                    {isWinner && (
                      <motion.span
                        className="ms-auto d-flex align-items-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Trophy
                          size={24}
                          className="ms-2 text-warning trophy-pulse"
                        />
                      </motion.span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
