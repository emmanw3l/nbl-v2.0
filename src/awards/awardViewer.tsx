// import { Collapse } from "bootstrap";
// import { motion } from "framer-motion";
// import { Trophy } from "lucide-react";
// import { useEffect } from "react";
// import { useLocation, Link } from "react-router-dom";
// import { awardCategories } from "./awardCategories";

import "../awards/awards.css";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Trophy } from "lucide-react";
import { awardCategories } from "./awardCategories";
import { useState } from "react";

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}
export default function AwardsAccordion2024() {
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
      <h1 className="mb-4 text-center mt-4 fw-bold">2024</h1>
      {/* <span className="h1 bg-primary text-center  fw-bold">2024</span> */}

      <div className="accordion">
        {awardCategories.map((award) => (
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
                                className=" text-dark ms-2"
                              >
                                <span className="authorname ">{name}</span>
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
                              className=" trophy-pulse text-warning"
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

// function slugify(name: string) {
//   return name
//     .toLowerCase()
//     .replace(/\s+/g, "-")
//     .replace(/[^\w-]+/g, "");
// }

// export default function AwardsAccordion2024() {
//   const location = useLocation();

//   useEffect(() => {
//     if (location.hash) {
//       const id = location.hash.replace("#", "");
//       const el = document.getElementById(id);

//       if (el) {

//         setTimeout(() => {
//           el.scrollIntoView({ behavior: "smooth", block: "start" });

//           const collapseEl = el.querySelector(".accordion-collapse");
//           if (collapseEl) {
//             const bsCollapse = new Collapse(collapseEl, { toggle: false });
//             bsCollapse.show();
//           }
//         }, 200);
//       }
//     }
//   }, [location]);

//   return (
//     <motion.div
//       className="container py-4"
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -30 }}
//       transition={{ duration: 0.5 }}
//     >
//       <h1 className="mb-4 text-center mt-4 fw-bold">2024</h1>
//       <div className="accordion">
//         {awardCategories.map((award) => (
//           <motion.div
//             key={award.id}
//             id={`accordion${award.id}`}
//             className="accordion-item"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, amount: 0.2 }}
//           >
//             <h2 className="accordion-header" id={`heading-${award.id}`}>
//               <button
//                 className="accordion-button collapsed"
//                 type="button"
//                 data-bs-toggle="collapse"
//                 data-bs-target={`#award-${award.id}`}
//                 aria-expanded="false"
//                 aria-controls={`collapse-${award.id}`}
//               >
//                 {award.category}
//               </button>
//             </h2>
//             <div
//               id={`award-${award.id}`}
//               className="accordion-collapse collapse"
//               aria-labelledby={`heading-${award.id}`}
//               data-bs-parent={`accordion${award.id}`}
//             >
//               <div className="accordion-body aww">
//                 <ul className="list-group">
//                   {award.nominees.map((nominee, idx) => {
//                     const isWinner = Array.isArray(award.winner)
//                       ? Array.isArray(nominee) &&
//                         nominee.every((n, i) => award.winner![i] === n)
//                       : award.winner === nominee;

//                     return (
//                       <li
//                         key={idx}
//                         className={`list-group-item d-flex align-items-center ${
//                           isWinner ? "fw-bold shadow-sm winner" : "acc"
//                         }`}
//                       >
//                         {Array.isArray(nominee) ? (
//                           nominee.map((name, i) => (
//                             <span key={name}>
//                               <Link
//                                 to={`/profile#${slugify(name)}`}
//                                 className="text-dark ms-1"
//                               >
//                                 {name}
//                               </Link>
//                               {i < nominee.length - 1 && " and "}
//                             </span>
//                           ))
//                         ) : (
//                           <Link
//                             to={`/profile#${slugify(nominee as string)}`}
//                             className="text-dark"
//                           >
//                             {nominee}
//                           </Link>
//                         )}

//                         {isWinner && (
//                           <span className="d-flex align-items-center ms-2">
//                             <Trophy size={25} className="ms-3 trophy-pulse" />
//                           </span>
//                         )}
//                       </li>
//                     );
//                   })}
//                 </ul>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </motion.div>
//   );
// }
