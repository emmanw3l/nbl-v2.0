import {  useState } from "react";
import { allPrompts } from "../../prompts/promptCollection";
import { Prompt } from "../../prompts/promptCollection";
import { Link } from "react-router-dom";
import { JSX } from "react";
import "./search.css"



export default function Search() {
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showBar, setShowBar] = useState(false);

  const extractTextFromContent = (content: JSX.Element[]) => {
    return content
      .map((el) =>
        typeof el.props.children === "string" ? el.props.children : "",
      )
      .join(" ");
  };

  const highlightMatch = (text: string, term: string) => {
    if (!term) return text;

    const parts = text.split(new RegExp(`(${term})`, "gi"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === term.toLowerCase() ? (
            <mark
              key={i}
              style={{
                background: "#fff176",
                padding: "0 2px",
                borderRadius: "2px",
              }}
            >
              {part}
            </mark>
          ) : (
            part
          ),
        )}
      </>
    );
  };

  const getSnippet = (prompt: Prompt) => {
    const fullText = extractTextFromContent(prompt.content);
    const lowerFull = fullText.toLowerCase();
    const lowerQuery = searchTerm.toLowerCase();

    const index = lowerFull.indexOf(lowerQuery);
    if (index !== -1) {
      const start = Math.max(0, index - 40);
      const end = Math.min(fullText.length, index + searchTerm.length + 40);
      const snippet = fullText.substring(start, end) + "...";
      return highlightMatch(snippet, searchTerm);
    }

    const firstTwo =
      fullText
        .split(/[\n\\.]/)
        .slice(0, 2)
        .join(" ") + "...";
    return firstTwo;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchTerm(query.trim());
    }
  };

  const handleClear = () => {
    setQuery("");
    setSearchTerm("");
  };

  const filtered =
    searchTerm.length === 0
      ? []
      : allPrompts.filter((prompt) => {
          const text = extractTextFromContent(prompt.content).toLowerCase();
          const term = searchTerm.toLowerCase();
          return (
            prompt.title.toLowerCase().includes(term) ||
            prompt.author.toLowerCase().includes(term) ||
            text.includes(term)
          );
        });

  return (
    <div className="container py-2 ">
      {/* SEARCH ICON (toggles input visibility) */}
      <div
        className="d-flex justify-content-end fixed-top mb-3 "
        style={{ top: "10px", right: "70px" }}
      >
        <button
          className="btn btn-outline-light rounded-circle"
          onClick={() => setShowBar(!showBar)}
        >
          <i className="bi bi-search"></i>
        </button>
      </div>

      {showBar && (
        <div className="d-flex justify-content-end">
          <div className="input-group mb-4" style={{ maxWidth: "350px" }}>
            <input
              className="form-control text-end"
              type="text"
              placeholder="Press Enter to search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            {searchTerm && (
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={handleClear}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}

      {/* RESULTS */}
      {searchTerm && (
        <div className="result">
          <p className="text-muted mb-3">
            Found {filtered.length} result{filtered.length !== 1 && "s"}
          </p>

          {filtered.length === 0 && (
            <p className="text-danger fst-italic">No results found.</p>
          )}

          <div
            className="d-flex flex-wrap gap-3"
            style={{ maxHeight: "300px", overflowY: "auto" }}
          >
            {filtered.map((p) => (
              <div
                key={p.id}
                className="card shadow-sm p-3 flex-fill"
                style={{ minWidth: "250px", maxWidth: "300px" }}
              >
                <strong className="d-block mb-1">{p.title}</strong>
                <Link
                to={`/mainPromptPage/${p.year}/${p.month}`}
                className="text-decoration-none">
                  <span className="text-muted italic small">
                  {p.month} {p.year}
                </span>
                </Link>
                

                <Link
                  to={`/profile#${p.author.replace(/\s+/g, "-").toLowerCase()}`}
                  className="text-decoration-none text-primary d-block mb-2"
                >
                  <small>{p.author}</small>
                </Link>

                <small className="text-muted">{getSnippet(p)}</small>

                <Link
                  to={`/${
                    p.year === "2024"
                      ? "mainPromptPage/2024/"
                      : p.year === "2025"
                        ? "mainPromptPage/2025/"
                        : p.year === "2026"
                          ? "mainPromptPage/2026/"
                          : "mainPromptPage/2023/"
                  }${p.month.charAt(0).toUpperCase().trim()+p.month.slice(1).toLowerCase()}#${p.month.toLocaleLowerCase()}-${p.id}`}
                  className="btn btn-outline-dark btn-sm mt-3 w-100 rounded-3"
                >
                  Read full prompt →
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
