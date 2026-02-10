import { prompts } from "../assets/prompts/2025/januaryPrompts";
import { febPrompts } from "../assets/prompts/2025/februaryPrompts";
import { aprilPrompts } from "../assets/prompts/2025/aprilPrompt";
import { mJPrompts } from "../assets/prompts/2025/mayJune";
import { julyPrompts } from "../assets/prompts/2025/july";
import { septemberPrompts } from "../assets/prompts/2025/septemberPrompt";
import { octPrompts2024 } from "../assets/prompts/2024/october";
import { motion } from "framer-motion";
// import { NavLink } from "react-router-dom";
import "./profile.css";
// import Layout from "../Nav/Nav";
import PagedText from "../components/paging";
// import { li } from "framer-motion/client";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import Footer from "../components/footer/footer";
import { awardCategories } from "../awards/awardCategories";
import { awardCategories2023 } from "../awards/awardCategories2023";
import Search from "../components/search/search";

// Merge all prompts into one array
const allPrompts = [
  ...octPrompts2024,

  // 2025

  ...prompts,
  ...febPrompts,
  ...aprilPrompts,
  ...mJPrompts,
  ...julyPrompts,
  ...septemberPrompts,
];

// sluuuugssss
const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

// Group prompts by author name
const authorsMap: { [author: string]: typeof allPrompts } = {};

allPrompts.forEach((poem) => {
  if (!authorsMap[poem.author]) {
    authorsMap[poem.author] = [];
  }
  authorsMap[poem.author].push(poem);
});

// Convert to entries and sort alphabetically by author name
const sortedAuthors = Object.entries(authorsMap).sort(([a], [b]) =>
  a.localeCompare(b),
);

// Get all authors from works
const workAuthors = new Set(sortedAuthors.map(([author]) => author));

// Get all authors from award categories (nominees + winners)
const awardAuthors = new Set<string>();
[...awardCategories, ...awardCategories2023].forEach((award) => {
  award.nominees.forEach((nominee) => {
    if (Array.isArray(nominee)) {
      nominee.forEach((n) => awardAuthors.add(n));
    } else {
      awardAuthors.add(nominee);
    }
  });

  if (award.winner) {
    if (Array.isArray(award.winner)) {
      award.winner.forEach((w) => awardAuthors.add(w));
    } else {
      awardAuthors.add(award.winner);
    }
  }
});

// Merge both sets
const allAuthors = Array.from(new Set([...workAuthors, ...awardAuthors]));

let authorsWithWorks = allAuthors.map((author) => {
  const works = sortedAuthors.find(([a]) => a === author)?.[1] || [];
  return [author, works] as [string, typeof works];
});
authorsWithWorks = authorsWithWorks.sort(([a], [b]) =>
  a.localeCompare(b, "en", { sensitivity: "base" }),
);

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function Profiles() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location]);

  const [isOpen, setIsOpen] = useState(false);
  const [openNominations, setOpenNominations] = useState<string | null>(null);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const [sortOption, setSortOption] = useState<
    "name" | "nominations" | "awards" | "works"
  >("name");

  const sortedProfiles = [...authorsWithWorks].sort(
    ([aName, aWorks], [bName, bWorks]) => {
      const aNoms = [...awardCategories, ...awardCategories2023].filter(
        (award) =>
          award.nominees.some((nominee) =>
            Array.isArray(nominee)
              ? nominee.includes(aName)
              : nominee === aName,
          ),
      ).length;

      const bNoms = [...awardCategories, ...awardCategories2023].filter(
        (award) =>
          award.nominees.some((nominee) =>
            Array.isArray(nominee)
              ? nominee.includes(bName)
              : nominee === bName,
          ),
      ).length;

      const aWins = [...awardCategories, ...awardCategories2023].filter(
        (award) =>
          Array.isArray(award.winner)
            ? award.winner.includes(aName)
            : award.winner === aName,
      ).length;

      const bWins = [...awardCategories, ...awardCategories2023].filter(
        (award) =>
          Array.isArray(award.winner)
            ? award.winner.includes(bName)
            : award.winner === bName,
      ).length;

      if (sortOption === "works") return bWorks.length - aWorks.length;
      if (sortOption === "nominations") return bNoms - aNoms;
      if (sortOption === "awards") return bWins - aWins;
      return aName.localeCompare(bName, "en", { sensitivity: "base" }); // default A–Z
    },
  );

  // const [showNominations, setShowNominations] = useState(
  //   window.innerWidth >= 768
  // );
  const [showAwards, setShowAwards] = useState(window.innerWidth >= 768);
  const isSmallScreen = window.innerWidth < 768;

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      {/* <Layout /> */}

      <motion.div
        className=""
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5 }}
      >
        <nav className="navbar navbar-dark fixed-top 100vw text-white ">
          
            <Link to="/" className="navbar-brand ">
              <i className="bi bi-house fs-3 text-white"></i>
            </Link>

            <h2 className="text-white">
              <a href="#" className="text-decoration-none text-white">
                Profiles
              </a>
            </h2>

            <button
              className="btn btn-outline-light"
              onClick={() => setIsOpen(!isOpen)}
            >
              ☰
            </button>
          
        </nav>

        {/* Sidebar */}
        <div
          className={` offcanvas sidebars offcanvas-end ${
            isOpen ? "show" : ""
          }`}
          style={{ visibility: isOpen ? "visible" : "hidden" }}
          tabIndex={-1}
        >
          <div className="offcanvas-header ">
            <nav className="mx-auto">
              <Link to="/awards" className="nav-link  fw-semibold dib">
                Awards
              </Link>
              <Link to="/mainPromptPage" className="nav-link  fw-semibold dib">
                Prompts
              </Link>
            </nav>
            <button
              className="btn btn-outline-light "
              onClick={() => setIsOpen(false)}
            >
              x
            </button>
          </div>
          <div className="offcanvas-body">
            <div className="mb-5">
              <h4 className="mb-3 text-center text-white">
                List of NBL Authors
              </h4>
              <ol className="list-group list-group-numbered text-white">
                {authorsWithWorks.map(([author]) => (
                  <li
                    key={author}
                    className="list-group-item  justify-content-between align-items-center"
                  >
                    <a
                      href={`#${slugify(author)}`}
                      className="text-decoration-none fw-bold text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      {author}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container py-4 mt-5">
        <Search />
        <h1 className="mt-4 text-center ">AUTHOR PROFILES</h1>

        <div className="mb-5">
          <h4 className="mb-3"></h4>
          <div className="d-flex flex-wrap gap-2">
            {authorsWithWorks.map(([author]) => (
              <a
                key={author}
                href={`#${slugify(author)}`}
                className="rounded-pill p-2 px-3 text-decoration-none shadow author-card"
                style={{ minWidth: "10px" }}
              >
                <span className="fw-semibold">{author}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="d-flex justify-content-end mb-3 ">
          <select
            className="form-select w-auto bg"
            value={sortOption}
            onChange={(e) =>
              setSortOption(
                e.target.value as "name" | "nominations" | "awards" | "works",
              )
            }
          >
            <option value="name">Sort by Name (A–Z)</option>
            <option value="nominations">Sort by Nominations</option>
            <option value="awards">Sort by Awards</option>
            <option value="works">Sort by Number of Prompts</option>
          </select>
        </div>

        {sortedProfiles.map(([author, works], authorIndex) => (
          <motion.div
            key={author}
            id={slugify(author)}
            className="mb-5 card shadow-lg border-0 rounded-4 p-4 ac"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            {/* Author Header */}
            <div className="position-relative mb-3">
              {/* Circle Avatar (top-left) */}
              <div
                className="rounded-circle bg text-white fw-bold d-flex align-items-center justify-content-center position-absolute"
                style={{
                  width: "60px",
                  height: "60px",
                  fontSize: "1.5rem",
                  top: "-15px",
                  left: "-15px",
                }}
              >
                {author.charAt(0)}
              </div>

              {/* Author Name + Works */}
              <div className="">
                <h2 className="ms-5 ps-2 mb-1">{author}</h2>
                <span
                  className={`badge ms-5  ${
                    works.length <= 1
                      ? "bg-secondary"
                      : works.length <= 2
                        ? "bg-warn"
                        : works.length <= 3
                          ? "bg-4"
                          : "bg-success"
                  }`}
                >
                  {works.length} {works.length === 1 ? "work" : "works"}
                </span>

                {/* 🏆 Nominations + Awards */}
                {(() => {
                  const allAwards = [
                    ...awardCategories,
                    ...awardCategories2023,
                  ];
                  const authorAwards = allAwards.filter((award) =>
                    award.nominees.some((nominee) =>
                      Array.isArray(nominee)
                        ? nominee.includes(author)
                        : nominee === author,
                    ),
                  );

                  const wins = allAwards.filter((award) =>
                    Array.isArray(award.winner)
                      ? award.winner.includes(author)
                      : award.winner === author,
                  );

                  return (
                    <div className="mt-2">
                      {/* Nominations */}
                      {/* <h4 className="fw-semibold mb-1 ">
                        🏆 Nominations: <span>{authorAwards.length}</span>
                      </h4>
                     
                      {authorAwards.length > 0 ? (
                        <div className="d-flex flex-wrap gap-2 mb-2 " >
                          {authorAwards.map((award) => (
                            <Link
                              key={award.id}
                              
                              to={`/awards#award-${award.id}`}
                              className="text-decoration-none card author-card p-1 nominations"
                            >
                              {award.category} {award.year}
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted mb-2 fst-italic">
                          No nominations yet
                        </p>
                      )} */}
                      <h4
                        className="fw-semibold mb-3 d-flex align-items-center justify-content-between"
                        style={{
                          cursor:
                            window.innerWidth < 768 ? "pointer" : "default",
                        }}
                        onClick={() => {
                          if (window.innerWidth < 768) {
                            setOpenNominations(
                              openNominations === author ? null : author,
                            );
                          }
                        }}
                      >
                        🏆 Nominations: {authorAwards.length}
                        {window.innerWidth < 768 && (
                          <span className="ms-2">
                            {openNominations === author ? "▲" : "▼"}
                          </span>
                        )}
                      </h4>

                      {authorAwards.length > 0 ? (
                        <div
                          className={
                            window.innerWidth >= 768 ||
                            openNominations === author
                              ? "nominations-open"
                              : "nominations-closed"
                          }
                        >
                          <div className="d-flex flex-wrap gap-2 mb-2">
                            {authorAwards.map((award) => (
                              <Link
                                key={award.id}
                                to={`/awards#award-${award.id}`}
                                className="text-decoration-none card author-card p-1"
                              >
                                {award.category} {award.year}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <p className="text-muted mb-2 fst-italic">
                          No nominations yet
                        </p>
                      )}

                      {/* Awards Won */}
                      {/* <h4 className="mb-0">
                        Awards Won: <span>{wins.length}</span> <br />{" "}
                        {wins.length > 0 ? (
                          wins.map((award, i) => (
                            <span
                              key={award.id}
                              className="author-card card ps-1 m-1 "
                            >
                              {award.category} {""}
                              {award.year}
                              {i < wins.length && " ⭐ "}
                              {i < wins.length - 1 && " , "}
                            </span>
                          ))
                        ) : (
                          <span className="fst-italic">No awards won</span>
                        )}
                      </h4> */}
                      <h4
                        className="fw-semibold mb-1 d-flex align-items-center justify-content-between"
                        style={{
                          cursor: isSmallScreen ? "pointer" : "default",
                        }}
                        onClick={() =>
                          isSmallScreen && setShowAwards((prev) => !prev)
                        }
                      >
                        🥇 Awards Won: {wins.length}
                        {isSmallScreen && (
                          <span className="ms-2">{showAwards ? "▲" : "▼"}</span>
                        )}
                      </h4>
                      {/* Collapsible Section */}
                      <div
                        className={`collapse ${
                          showAwards ? "show" : ""
                        } d-md-block`}
                      >
                        {wins.length > 0 ? (
                          <div className="d-flex flex-wrap gap-2 mb-2">
                            {wins.map((award, i) => (
                              <span
                                key={award.id}
                                className="author-card card ps-1 m-1  text-decoration-none"
                              >
                                {award.category} {award.year}
                                {i < wins.length && " ⭐ "}
                                {/* {i < wins.length - 1 && " , "} */}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="fst-italic text-muted">
                            No awards won
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>

            <h3 className="fw-light italics mb-3">Prompts....</h3>

            {/* Accordion for works */}
            {works.length > 0 ? (
              <div className="accordion" id={`accordion-${authorIndex}`}>
                {works.map((poem, poemIndex) => (
                  <motion.div
                    key={poem.id}
                    className="accordion-item border-0 mb-2 shadow-sm rounded-3 overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: poemIndex * 0.1 }}
                  >
                    <h2
                      className="accordion-header"
                      id={`heading-${authorIndex}-${poemIndex}`}
                    >
                      <button
                        className="accordion-button collapsed d-block justify-content-between fw-semibold"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse-${authorIndex}-${poemIndex}`}
                        aria-expanded="false"
                        aria-controls={`collapse-${authorIndex}-${poemIndex}`}
                      >
                        <h4 className="">{poem.title}</h4>{" "}
                        <span className="italics  me-1 text-muted">
                          ({poem.month}
                          {poem.year})
                        </span>
                      </button>
                    </h2>

                    <div
                      id={`collapse-${authorIndex}-${poemIndex}`}
                      className="accordion-collapse collapse"
                      aria-labelledby={`heading-${authorIndex}-${poemIndex}`}
                      data-bs-parent={`#accordion-${authorIndex}`}
                    >
                      <div className="accordion-body">
                        <PagedText
                          paragraphs={poem.content}
                          paragraphsPerPage={6}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <h1 className="fst-italic mx-auto">No Prompts Yet</h1>
            )}
          </motion.div>
        ))}
      </div>
      <button
        onClick={scrollToTop}
        className={`btn  rounded-circle text-white shadow transition-opacity ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "50px",
          background: "#5f3205",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        <ArrowUp size={20} />
      </button>

      <Footer />
    </motion.div>
  );
}
