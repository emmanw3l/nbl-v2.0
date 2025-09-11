import { motion } from "framer-motion";
import { awardCategories } from "./awardCategories";
import Layout from "../Nav/Nav";
import "./awards.css";

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

      <h1 className="mb-4 text-center mt-4 fw-bold">Awards</h1>
      <div className="accordion " id="awardsAccordion">
        {awardCategories.map((award, index) => (
          <div key={award.id} className="accordion-item ">
            <h2 className="accordion-header" id={`heading-${index}`}>
              <button
                className="accordion-button collapsed"
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
              className="accordion-collapse collapse "
              aria-labelledby={`heading-${index}`}
              data-bs-parent="#awardsAccordion"
            >
              <div className="accordion-body aww">
                <ul className="list-group ">
                  {award.nominees.map((nominee) => (
                    <li
                      key={nominee}
                      className={`list-group-item d-flex justify-content-between align-items-center ${
                        nominee === award.winner
                          ? "bg-warning text-dark fw-semibold"
                          : ""
                      }`}
                    >
                      {nominee}
                      {nominee === award.winner && (
                        <span className="ms-2">🥇</span>
                      )}
                    </li>
                  ))}
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
