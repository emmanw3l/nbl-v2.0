import "../awards/awards.css";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Trophy } from "lucide-react";
import { awardCategories2023 } from "./awardCategories2023";
import { useState } from "react";

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}
export default function AwardsAccordion2023() {
  const [openId, setOpenId] = useState<number | null>(null);


  const toggleAccordion = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <motion.div
      className="container py-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="mb-4 text-center mt-4 fw-bold">2023</h1>

      <div className="accordion">
        {awardCategories2023.map((award) => (
          <motion.div
            key={award.id}
            className="accordion-item mb-2 shadow-sm rounded-3 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            
          >
            {/* Accordion Header */}
            <h2 className="accordion-header" id={`heading-${award.id}`}>
              <button
                className={`accordion-button ${
                  openId === award.id ? "" : "collapsed"
                }`}
                type="button"
                onClick={() => toggleAccordion(award.id)}
              >
                {award.category}
              </button>
            </h2>

            {/* Accordion Body */}
            <div
              id={`award-${award.id}`}
              className={`accordion-collapse collapse ${
                openId === award.id ? "show" : ""
              }`}
              aria-labelledby={`heading-${award.id}`}
            >
              <div className="accordion-body">
                <h6>{award.description}</h6>
                <ul className="list-group m-1">
                  {award.nominees.map((nominee, idx) => {
                    const isWinner = Array.isArray(award.winner)
                      ? Array.isArray(nominee) &&
                        nominee.every((n, i) => award.winner![i] === n)
                      : award.winner === nominee;

                    return (
                      <li
                        key={idx}
                        className={`list-group-item d-flex align-items-center ${
                          isWinner ? "fw-bold winner highlight" : "acc"
                        }`}
                      >
                        {Array.isArray(nominee) ? (
                          nominee.map((name, i) => (
                            <span key={name}>
                              <Link
                                to={`/profile#${slugify(name)}`}
                                className="text-dark ps-1"
                              >
                                {name}
                              </Link>
                              {i < nominee.length - 1 && " and "}
                            </span>
                          ))
                        ) : (
                          <Link
                            to={`/profile#${slugify(nominee as string)}`}
                            className="text-dark"
                          >
                            {nominee}
                          </Link>
                        )}

                        {isWinner && (
                          <span className="d-flex align-items-center ms-2">
                            <Trophy
                              size={22}
                              className="ms-2 trophy-pulse text-warning"
                            />
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}