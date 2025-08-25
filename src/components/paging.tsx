// import { JSX, useState } from "react";

// interface PagedTextProps {
//   paragraphs: JSX.Element[];
//   paragraphsPerPage?: number;
// }

// export default function PagedText({ paragraphs, paragraphsPerPage = 2 }: PagedTextProps) {
//   const [page, setPage] = useState(0);
//   const totalPages = Math.ceil(paragraphs.length / paragraphsPerPage);

//   const start = page * paragraphsPerPage;
//   const visible = paragraphs.slice(start, start + paragraphsPerPage);

//   return (
//     <div>
//       <div>{visible}</div>
//       <div style={{ marginTop: "1rem" }}>
//         <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}>
//           Previous
//         </button>
//         <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }


import { JSX, useState } from "react";
import './paging.css'

interface PagedTextProps {
  paragraphs: JSX.Element[];      // Array of <p> elements
  paragraphsPerPage?: number;     // Number of paragraphs per page
}

export default function PagedText({ paragraphs, paragraphsPerPage = 1 }: PagedTextProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(paragraphs.length / paragraphsPerPage);

  const start = currentPage * paragraphsPerPage;
  const end = start + paragraphsPerPage;
  const currentParagraphs = paragraphs.slice(start, end);

  const nextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(prev => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(prev => prev - 1);
  };

  return (
    <div className="">
      {currentParagraphs}

      <div className="footer" style={{ marginBottom: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={prevPage} disabled={currentPage === 0} className="btn btn-outline">
          <i className="bi bi-chevron-double-left"></i>
          <span>Previous</span>
        </button>

        <span className="span">
          Page {currentPage + 1} of {totalPages}
        </span>

        <button onClick={nextPage} disabled={currentPage === totalPages - 1} className="btn">
          Next
          <i className="bi bi-chevron-double-right"></i>
        </button>
      </div>
    </div>
  );
}
