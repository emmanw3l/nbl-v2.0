// import { useEffect, useState } from "react";
// import { Link, NavLink, useLocation } from "react-router-dom";
// export default function PromptNav() {
//   const location = useLocation();

//   const [isOpen, setIsOpen] = useState(false);
//   useEffect(() => {
//     if (location.hash) {
//       const element = document.querySelector(location.hash);
//       if (element) {
//         element.scrollIntoView({ behavior: "smooth" });
//       }
//     }
//   }, [location]);
//   return (
//     <>
//       <nav className="navbar  navbar-dark navbars fixed-top mb-4">
//         <NavLink to="/">
//           <span className="bi bi-house fs-3 navbar-brand ms-2"></span>
//         </NavLink>

//         <a className="navbar-brand mx-auto" href="#">
//           PROMPTS
//         </a>
//         <button
//           className="btn btn-outline-light"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           ☰
//         </button>
//       </nav>
//       <div
//         className={` offcanvas sidebars offcanvas-end  ${isOpen ? "show" : ""}`}
//         style={{ visibility: isOpen ? "visible" : "hidden" }}
//         tabIndex={-1}
//       >
//         <div className="offcanvas-header   ">
//           <nav className="mx-auto">
//             <Link to="/awards" className="nav-link  fw-semibold dib">
//               Awards
//             </Link>
//             <Link to="/Profile" className="nav-link  fw-semibold dib">
//               Profiles
//             </Link>
//           </nav>
//           <button
//             className="btn btn-outline-light "
//             onClick={() => setIsOpen(false)}
//           >
//             x
//           </button>
//         </div>

//         <div className="offcanvas-body">
//           <div className="accordion" id="yearAccordion">
//             {/* 2024 Section */}

//             <div className="accordion-item">
//               <h2 className="accordion-header" id="heading2024">
//                 <button
//                   className="accordion-button collapsed"
//                   type="button"
//                   data-bs-toggle="collapse"
//                   data-bs-target="#collapse2024"
//                   aria-expanded="false"
//                   aria-controls="collapse2024"
//                 >
//                   2024
//                 </button>
//               </h2>
//               <div
//                 id="collapse2024"
//                 className="accordion-collapse collapse "
//                 aria-labelledby="heading2024"
//                 data-bs-parent="#yearAccordion"
//               >
//                 <div className="accordion-body">
//                   <ul>
//                     <li>
//                       <Link
//                         to="/2024PromptPage#january2024"
//                         onClick={() => setIsOpen(false)}
//                         className="nav-link"
//                       >
//                         January
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         to="/2024PromptPage#february2024"
//                         onClick={() => setIsOpen(false)}
//                         className="nav-link"
//                       >
//                         February
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         to="/2024PromptPage#march2024"
//                         onClick={() => setIsOpen(false)}
//                         className="nav-link"
//                       >
//                         March
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         to="/2024PromptPage#june2024"
//                         onClick={() => setIsOpen(false)}
//                         className="nav-link"
//                       >
//                         June
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         to="/2024PromptPage#august2024"
//                         onClick={() => setIsOpen(false)}
//                         className="nav-link"
//                       >
//                         August
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         to="/2024PromptPage#september2024"
//                         onClick={() => setIsOpen(false)}
//                         className="nav-link"
//                       >
//                         September
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         to="/2024PromptPage#october2024"
//                         onClick={() => setIsOpen(false)}
//                         className="nav-link"
//                       >
//                         October
//                       </Link>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>

//             {/* 2025 Section */}
//             <div className="accordion-item">
//               <h2 className="accordion-header" id="heading2025">
//                 <button
//                   className="accordion-button collapsed"
//                   type="button"
//                   data-bs-toggle="collapse"
//                   data-bs-target="#collapse2025"
//                   aria-expanded="false"
//                   aria-controls="collapse2025"
//                 >
//                   2025
//                 </button>
//               </h2>
//               <div
//                 id="collapse2025"
//                 className="accordion-collapse collapse"
//                 aria-labelledby="heading2025"
//                 data-bs-parent="#yearAccordion"
//               >
//                 <div className="accordion-body">
//                   <ul>
//                     <li>
//                       <Link
//                         to="/mainPromptPage#january2025"
//                         onClick={() => setIsOpen(false)}
//                         className="nav-link"
//                       >
//                         January
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         to="/mainPromptPage#february2025"
//                         onClick={() => setIsOpen(false)}
//                         className="nav-link"
//                       >
//                         February
//                       </Link>
//                     </li>

//                     <li>
//                       <Link
//                         to="/mainPromptPage#april2025"
//                         onClick={() => setIsOpen(false)}
//                         className="nav-link"
//                       >
//                         April
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         to="/mainPromptPage#may2025"
//                         onClick={() => setIsOpen(false)}
//                         className="nav-link"
//                       >
//                         May
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         to="/mainPromptPage#may2025"
//                         onClick={() => setIsOpen(false)}
//                         className="nav-link"
//                       >
//                         June
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         to="/mainPromptPage#july2025"
//                         onClick={() => setIsOpen(false)}
//                         className="nav-link"
//                       >
//                         July
//                       </Link>
//                     </li>

//                      <li>
//                       <Link
//                         to="/mainPromptPage#september2025"
//                         onClick={() => setIsOpen(false)}
//                         className="nav-link"
//                       >
//                         September
//                       </Link>
//                     </li>
//                     {/*<li>
//                       <a href="#october"
//                       onClick={() => setIsOpen(false)}>October</a>
//                     </li>
//                     <li>
//                       <a href="#november"
//                       onClick={() => setIsOpen(false)}>November</a>
//                     </li>
//                     <li>
//                       <a href="#december"
//                       onClick={() => setIsOpen(false)}>December</a>
//                     </li> */}
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import "./promptpage.css";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Search from "../components/search/search";

const promptMonths = [
  { month: "January", year: 2024 },
  { month: "February", year: 2024 },
  { month: "March", year: 2024 },
  { month: "June", year: 2024 },
  { month: "August", year: 2024 },
  { month: "September", year: 2024 },
  { month: "October", year: 2024 },
  { month: "January", year: 2025 },
  { month: "February", year: 2025 },
  { month: "April", year: 2025 },
  { month: "May", year: 2025 },
  // { month: "June", year: 2025 },
  { month: "July", year: 2025 },
  { month: "September", year: 2025 },
];

  const isSmallScreen = window.innerWidth < 768;

export default function PromptNav() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="navbars ">
        <nav className="navbar text-white ">
          <div className="container-fluid ">
            <Link to="/" className="navbar-brand">
              <i className="bi bi-house fs-3 text-white"></i>
            </Link>

            
              {promptMonths.map((m) => (
                
                  <NavLink
                    key={`${m.month}-${m.year}`}
                    to={`/mainPromptPage/${m.year}/${m.month}`}
                    className={({ isActive }) =>
                      `h2 text-decoration-none  ${isActive ? "" : "d-none"}`
                    }
                  >
                    
                     {isSmallScreen ? m.month.slice(0,3).toUpperCase() : (m.month === "May" && m.year === 2025 ? "May/June" : m.month.toUpperCase())
                      } {m.year}
                    
                  </NavLink>
                
              ))}
            
            <button
              className="btn btn-outline-light"
              onClick={() => setIsOpen(!isOpen)}
            >
              ☰
            </button>
          </div>
        </nav>
        <div
          className={` offcanvas sidebars offcanvas-end ${isOpen ? "show" : ""}`}
          style={{ visibility: isOpen ? "visible" : "hidden" }}
          tabIndex={-1}
        >
          <div className="offcanvas-header justify-content-between">
            <nav className="btn m-0 p-0  btn-outline-dark "> 
             
            <Link to="/mainPromptPage" className="nav-link  fw-semibold dib">
                <i className="bi bi-arrow-90deg-left"></i>
            </Link>
            </nav>
            
            <button
              className="btn btn-outline-dark fs-2"
              onClick={() => setIsOpen(false)}
            >
              <i className="bi bi-x"></i>
            </button>
          </div>
          <div className="offcanvas-body">
            <div className="mb-5">
              <h3 className="mb-3 text-center">Prompt months</h3>
              {promptMonths.map((m) => (
                <ol className="list-group list-group-numbered">
                  <NavLink
                    key={`${m.month}-${m.year}`}
                    to={`/mainPromptPage/${m.year}/${m.month}`}
                    className={({ isActive }) =>
                      `btn btn-sm rounded-pill my-1 ${isActive ? "btn-dark" : "btn-outline-dark"}`
                    }
                  >
                    <li className="list-group-item justify-content-between align-items-center">
                      {m.month.slice(0, 3).toUpperCase()} {m.year}
                    </li>
                  </NavLink>
                </ol>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="space"></div>
      <Search />
    </>
  );
}
