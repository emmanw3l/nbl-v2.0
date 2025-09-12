// export default function Profile({ name, bio, avatar, links }) {
//     return (
//       <div className="profile-card">
//         <img src={avatar} alt={`${name}'s avatar`} className="profile-avatar" />
//         <h2>{name}</h2>
//         <p>{bio}</p>
//         <div className="profile-links">
//           {links.map((link, i) => (
//             <a key={i} href={link.url} target="_blank" rel="noopener noreferrer">
//               {link.label}
//             </a>
//           ))}
//         </div>
//       </div>
//     );
//   }

// import Profile from "./Profile";

// function App() {
//   const user = {
//     name: "Emmanuel N.",
//     bio: "Poet | Developer | Dreamer",
//     avatar: "https://via.placeholder.com/150",
//     links: [
//       { label: "GitHub", url: "https://github.com/emmanw3l" },
//       { label: "Wattpad", url: "https://www.wattpad.com/user/emmanw3l" },
//     ],
//   };

//   return (
//     <div className="container">
//       <Profile {...user} />
//     </div>
//   );
// }

// components/ProfileCard.jsx
// export default function ProfileCard({ name, bio, avatar, links }) {
//     return (
//       <div className="profile-card">
//         <img src={avatar} alt={`${name}'s avatar`} className="profile-avatar" />
//         <h2 className="profile-name">{name}</h2>
//         <p className="profile-bio">{bio}</p>
//         <div className="profile-links">
//           {links.map((link, i) => (
//             <a key={i} href={link.url} target="_blank" rel="noopener noreferrer">
//               {link.label}
//             </a>
//           ))}
//         </div>
//       </div>
//     );
//   }

// components/Sidebar.jsx
// import ProfileCard from "./ProfileCard";

// export default function Sidebar() {
//   const user = {
//     name: "Emmanuel N.",
//     bio: "Poet | Developer | Dreamer of words that breathe.",
//     avatar: "https://via.placeholder.com/150",
//     links: [
//       { label: "GitHub", url: "https://github.com/emmanw3l" },
//       { label: "Wattpad", url: "https://www.wattpad.com/user/emmanw3l" },
//     ],
//   };

//   return (
//     <aside className="sidebar">
//       <ProfileCard {...user} />
//     </aside>
//   );
// }

// app layout

// import Sidebar from "./components/Sidebar";
// import "./App.css";

// export default function App() {
//   return (
//     <div className="app-layout">
//       <Sidebar />
//       <main className="main-content">
//         <h1>Welcome to My Poetry Corner</h1>
//         <p>Here you'll find verses that whisper to the soul...</p>
//       </main>
//     </div>
//   );
// }

// import ProfileCard from "./profileCard";
// import {motion} from "framer-motion"

// const pageVariants = {
//   initial: { opacity: 0, x: 30 },
//   animate: { opacity: 1, x: 0 },
//   exit: { opacity: 0, x: -30 },
// };

// export default function Profiles() {
//   return (
//     <motion.div
//     variants={pageVariants}
//       initial="initial"
//       animate="animate"
//       exit="exit"
//       transition={{ duration: 0.5 }}
//     >
//       <div className="container mt-5">
//         <ProfileCard
//           imageSrc=""
//           title="January Prompts"
//           text="Check out our latest creative prompts for January!"
//           linkUrl="#january"
//           linkLabel="Go to Section"
//         />
//       </div>
//       hiiii
//     </motion.div>
//   );
// }

import { prompts } from "../prompts/2025/januaryPrompts";
import { febPrompts } from "../prompts/2025/februaryPrompts";
import { aprilPrompts } from "../prompts/2025/aprilPrompt";
import { mJPrompts } from "../prompts/2025/mayJune";
import { julyPrompts } from "../prompts/2025/july";
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

// Merge all prompts into one array
const allPrompts = [
  ...prompts,
  ...febPrompts,
  ...aprilPrompts,
  ...mJPrompts,
  ...julyPrompts,
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
  a.localeCompare(b)
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

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      {/* <Layout /> */}

      <div>
        <nav className="navbar navbars text-white ">
          <div className="container-fluid ">
            <Link to="/" className="navbar-brand">
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
          </div>
        </nav>

        {/* Sidebar */}
        <div
          className={` offcanvas sidebars offcanvas-end ${
            isOpen ? "show" : ""
          }`}
          style={{ visibility: isOpen ? "visible" : "hidden" }}
          tabIndex={-1}
        >
          <div className="offcanvas-header   ">
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
                {sortedAuthors.map(([author]) => (
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
      </div>

      <div className="container py-4 mt-5">
        <h1 className="mt-4 text-center ">AUTHOR PROFILES</h1>

        {/* option 2 */}

        {/* <div className="mb-5">
          <h4 className="mb-3"></h4>
          <ul className="list-inline">
            {sortedAuthors.map(([author]) => (
              <li key={author} className="list-inline-item mb-2">
                <a
                  href={`#${slugify(author)}`}
                  className="btn pill btn-sm rounded-pill"
                >
                  {author}
                </a>
              </li>
            ))}
          </ul>
        </div> */}

        {/* option 3 */}

        <div className="mb-5">
          <h4 className="mb-3"></h4>
          <div className="d-flex flex-wrap gap-2">
            {sortedAuthors.map(([author]) => (
              <a
                key={author}
                href={`#${slugify(author)}`}
                className="card p-2 px-3 text-decoration-none shadow author-card"
                style={{ minWidth: "10px" }}
              >
                <span className="fw-semibold">{author}</span>
              </a>
            ))}
          </div>
        </div>

        {/* accordion section */}

        {/* {sortedAuthors.map(([author, works], authorIndex) => (
          <div key={author} id={slugify(author)} className="mb-5 card cards">
            <h2 className="mb-3 text-center">{author}</h2>
            <h4 className="br-bottom">Prompts written so far...</h4>
            <div className="accordion" id={`accordion-${authorIndex}`}>
              {works.map((poem, poemIndex) => (
                <motion.div
                  key={poem.id}
                  className="accordion-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: poemIndex * 0.1 }}
                >
                  <h2
                    className="accordion-header"
                    id={`heading-${authorIndex}-${poemIndex}`}
                  >
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse-${authorIndex}-${poemIndex}`}
                      aria-expanded="false"
                      aria-controls={`collapse-${authorIndex}-${poemIndex}`}
                    >
                      {poem.title}
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
          </div>
        ))} */}

        {sortedAuthors.map(([author, works], authorIndex) => (
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
                    works.length === 1
                      ? "bg-secondary" // gray
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
                  const authorAwards = awardCategories.filter((award) =>
                    award.nominees.some((nominee) =>
                      Array.isArray(nominee)
                        ? nominee.includes(author)
                        : nominee === author
                    )
                  );

                  const wins = awardCategories.filter((award) =>
                    Array.isArray(award.winner)
                      ? award.winner.includes(author)
                      : award.winner === author
                  );

                  return (
                    <div className="mt-2">
                      {/* Nominations */}
                      <h4 className="fw-semibold mb-1">
                        🏆 Nominations: <span>{authorAwards.length}</span>
                      </h4>
                      {authorAwards.length > 0 ? (
                        <div className="d-flex flex-wrap gap-2 mb-2">
                          {authorAwards.map((award) => (
                            <Link
                              key={award.id}
                              to={`/awards#award-${award.id}`}
                              className="text-decoration-none card author-card p-1"
                            >
                              {award.category}
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted mb-2 fst-italic">
                          No nominations yet
                        </p>
                      )}

                      {/* Awards Won */}
                      <h5 className="mb-0">
                        Awards Won:{" "}
                        {wins.length > 0 ? (
                          wins.map((award, i) => (
                            <span key={award.id}>
                              {award.category}
                              {i < wins.length  && " ⭐ "}
                              {i < wins.length - 1 && " , "}

                            </span>
                          ))
                        ) : (
                          <span className="fst-italic">No awards won</span>
                        )}
                      </h5>
                    </div>
                  );
                })()}
              </div>
            </div>

            <h5 className="fw-light italics mb-3">Prompts written so far...</h5>

            {/* Accordion for works */}
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
                      className="accordion-button collapsed d-flex justify-content-betwwen fw-semibold"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse-${authorIndex}-${poemIndex}`}
                      aria-expanded="false"
                      aria-controls={`collapse-${authorIndex}-${poemIndex}`}
                    >
                      <span className="">{poem.title}</span>{" "}
                      <span className="italics ms-auto me-1 text-muted">
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
