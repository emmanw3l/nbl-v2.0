import { motion } from "framer-motion";
import { awardCategories } from "./awardCategories";
import Layout from "../Nav/Nav";
import "./awards.css";
import { Link } from "react-router-dom";
import { Trophy } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Collapse } from "bootstrap";


function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

export default function AwardsAccordion() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);

      if (el) {
        // 🔽 Scroll to the award card
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });

          // 🔽 Open accordion collapse inside this award item
          const collapseEl = el.querySelector(".accordion-collapse");
          if (collapseEl) {
            const bsCollapse = new Collapse(collapseEl, { toggle: false });
            bsCollapse.show();
          }
        }, 200); // wait a bit for DOM to be ready
      }
    }
  }, [location]);

  return (
    <motion.div
      className="container py-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <Layout />

      <h1 className="mb-4 text-center mt-4 fw-bold">Awards</h1>
      <div className="accordion " id="awardsAccordion">
        {awardCategories.map((award) => (
          <div
            key={award.id}
            id={`award-${award.id}`}
            className="accordion-item "
          >
            <h2 className="accordion-header" id={`heading-${award.id}`}>
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse-${award.id}`}
                aria-expanded="false"
                aria-controls={`collapse-${award.id}`}
              >
                {award.category}
              </button>
            </h2>
            <div
              id={`collapse-${award.id}`}
              className="accordion-collapse collapse "
              aria-labelledby={`heading-${award.id}`}
              data-bs-parent="#awardsAccordion"
            >
              <div className="accordion-body aww">
                <ul className="list-group">
                  {award.nominees.map((nominee, idx) => {
                    const isWinner = Array.isArray(award.winner)
                      ? Array.isArray(nominee) && 
                      nominee.every((n, i) => award.winner![i] === n)
                      : award.winner === nominee;

                    return (
                      <li
                        key={idx}
                        className={`list-group-item d-flex align-items-center ${
                          isWinner
                            ? " fw-bold shadow-sm winner"
                            : "acc"
                        }`}
                      >
                        {Array.isArray(nominee) ? (
                          nominee.map((name, i) => (
                            <span key={name}>
                              <Link
                                to={`/profile#${slugify(name)}`}
                                className="text-dark ms-1"
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
                          <span className="d-flex align-items-center ms-2 ">
                            <Trophy size={25} className="ms-3  trophy-pulse" />
                            
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );

  {
    /* <h2 className="text-center mb-4 fw-bold">🏆 Awards & Winners</h2>

      <div className="accordion" id="awardsAccordion">
        {awardCategories.map((award, index) => (
          <motion.div
            key={index}
            className="accordion-item"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h2 className="accordion-header" id={`heading-${index}`}>
              <button
                className="accordion-button collapsed fw-semibold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse-${index}`}
                aria-expanded="false"
                aria-controls={`collapse-${index}`}
              >
                {award.category}
              </button>
            </h2>
            <div
              id={`collapse-${index}`}
              className="accordion-collapse collapse"
              aria-labelledby={`heading-${index}`}
              data-bs-parent="#awardsAccordion"
            >
              <div className="accordion-body">
                <ul className="list-unstyled list-group">
                  {award.nominees.map((nominee, i) => (
                    <li key={i}
                    className="list-group-item ">
                      {nominee}{" "}
                      {nominee === award.winner && (
                        <span className="badge bg-warning text-dark">Winner</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div> */
  }
}
