// src/components/search/search.tsx
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./search.css";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

// ── Types ──────────────────────────────────────────────────────────────────
interface Prompt {
  id:     number;
  title:  string;
  theme:  string | null;
  month:  number;
  year:   number;
  slug:   string;
  author: { id: number; name: string; slug: string };
}

interface Award {
  id:          number;
  category:    string;
  description: string;
  year:        number;
  winner:      { name: string; work: string };
  nominees:    { name: string; work: string }[];
}

interface Author {
  id:   number;
  name: string;
  slug: string;
  _count?: { prompts: number };
}

interface Results {
  prompts: Prompt[];
  awards:  Award[];
  authors: Author[];
}

// ── Highlight utility ──────────────────────────────────────────────────────
function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim() || !text) return <>{text}</>;

  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts   = text.split(new RegExp(`(${escaped})`, "gi"));

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="search-highlight">{part}</mark>
        ) : (
          part
        )
      )}
    </>
  );
}

// ── Filter helpers ─────────────────────────────────────────────────────────
function filterPrompts(prompts: Prompt[], q: string): Prompt[] {
  const lower = q.toLowerCase();
  return prompts.filter(
    (p) =>
      p.title.toLowerCase().includes(lower) ||
      p.theme?.toLowerCase().includes(lower) ||
      p.author?.name.toLowerCase().includes(lower) ||
      MONTH_NAMES[p.month - 1]?.toLowerCase().includes(lower)
  );
}

function filterAwards(awards: Award[], q: string): Award[] {
  const lower = q.toLowerCase();
  return awards.filter(
    (a) =>
      a.category.toLowerCase().includes(lower) ||
      a.description.toLowerCase().includes(lower) ||
      a.winner?.name.toLowerCase().includes(lower) ||
      a.nominees?.some((n) => n.name.toLowerCase().includes(lower))
  );
}

function filterAuthors(authors: Author[], q: string): Author[] {
  const lower = q.toLowerCase();
  return authors.filter((a) => a.name.toLowerCase().includes(lower));
}

// ── Result cards ───────────────────────────────────────────────────────────
function PromptResult({ prompt, query, onClick }: { prompt: Prompt; query: string; onClick: () => void }) {
  const monthName = MONTH_NAMES[prompt.month - 1] ?? "";
  return (
    <div className="search-result-card" onClick={onClick}>
      <div className="search-result-type">Prompt</div>
      <p className="search-result-title">
        <Highlight text={prompt.title} query={query} />
      </p>
      {prompt.theme && (
        <p className="search-result-sub">
          Theme: <Highlight text={prompt.theme} query={query} />
        </p>
      )}
      <p className="search-result-meta">
        <Highlight text={`${monthName} ${prompt.year}`} query={query} />
        {" · "}
        <Highlight text={prompt.author?.name ?? ""} query={query} />
      </p>
    </div>
  );
}

function AwardResult({ award, query, onClick }: { award: Award; query: string; onClick: () => void }) {
  const matchingNominee = award.nominees?.find((n) =>
    n.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="search-result-card" onClick={onClick}>
      <div className="search-result-type">Award</div>
      <p className="search-result-title">
        <Highlight text={award.category} query={query} />
      </p>
      <p className="search-result-sub">
        <Highlight text={award.description} query={query} />
      </p>
      <p className="search-result-meta">
        {award.year}
        {award.winner?.name && (
          <> · Winner: <Highlight text={award.winner.name} query={query} /></>
        )}
        {matchingNominee && (
          <> · Nominee: <Highlight text={matchingNominee.name} query={query} /></>
        )}
      </p>
    </div>
  );
}

function AuthorResult({ author, query, onClick }: { author: Author; query: string; onClick: () => void }) {
  return (
    <div className="search-result-card" onClick={onClick}>
      <div className="search-result-type">Author</div>
      <p className="search-result-title">
        <Highlight text={author.name} query={query} />
      </p>
      {author._count && (
        <p className="search-result-meta">
          {author._count.prompts} prompt{author._count.prompts !== 1 && "s"}
        </p>
      )}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function Search() {
  const navigate = useNavigate();

  const [query,   setQuery]   = useState("");
  const [open,    setOpen]    = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Results>({ prompts: [], awards: [], authors: [] });
  const [cache,   setCache]   = useState<{ prompts: Prompt[]; awards: Award[]; authors: Author[] } | null>(null);

  const inputRef    = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") { setOpen(false); setQuery(""); }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  // Fetch all data once and cache it
  const fetchAll = useCallback(async () => {
    if (cache) return cache;
    setLoading(true);
    try {
      const [promptsRes, awardsRes, authorsRes] = await Promise.all([
        fetch(`${API}/prompts`).then((r) => r.json()),
        fetch(`${API}/awards`).then((r)  => r.json()),
        fetch(`${API}/authors`).then((r) => r.json()),
      ]);
      const data = {
        prompts: promptsRes.prompts  ?? [],
        awards:  awardsRes.awards    ?? [],
        authors: authorsRes.authors  ?? [],
      };
      setCache(data);
      return data;
    } catch {
      return { prompts: [], awards: [], authors: [] };
    } finally {
      setLoading(false);
    }
  }, [cache]);

  // Search with debounce
  useEffect(() => {
    if (!query.trim()) {
      setResults({ prompts: [], awards: [], authors: [] });
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      const data = await fetchAll();
      setResults({
        prompts: filterPrompts(data.prompts, query),
        awards:  filterAwards(data.awards,   query),
        authors: filterAuthors(data.authors, query),
      });
    }, 300);

    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query, fetchAll]);

  const totalResults = results.prompts.length + results.awards.length + results.authors.length;
  const hasQuery     = query.trim().length > 0;

  function handleOpen() {
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  function handlePromptClick(p: Prompt) {
    navigate(`/mainPromptPage/${p.year}/${MONTH_NAMES[p.month - 1]?.toLowerCase()}`);
    setOpen(false); setQuery("");
  }

  function handleAwardClick() {
    navigate("/awards");
    setOpen(false); setQuery("");
  }

  function handleAuthorClick(a: Author) {
    navigate(`/profile/${a.slug}`);
    setOpen(false); setQuery("");
  }

  return (
    <div ref={containerRef} className="search-wrapper">
      {/* ── Search trigger ── */}
      <button className="search-trigger" onClick={handleOpen} aria-label="Search">
        <i className="bi bi-search" />
      </button>

      {/* ── Overlay ── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="search-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setOpen(false); setQuery(""); }}
            />

            <motion.div
              className="search-modal"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Input */}
              <div className="search-input-wrap">
                <i className="bi bi-search search-icon" />
                <input
                  ref={inputRef}
                  type="text"
                  className="search-input"
                  placeholder="Search prompts, awards, authors…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                {query && (
                  <button className="search-clear" onClick={() => setQuery("")}>
                    <i className="bi bi-x-lg" />
                  </button>
                )}
              </div>

              {/* Results */}
              <div className="search-results">
                {loading && (
                  <div className="search-status">
                    <div className="spinner-border spinner-border-sm text-secondary" role="status" />
                    <span>Loading…</span>
                  </div>
                )}

                {!loading && !hasQuery && (
                  <p className="search-status">Start typing to search…</p>
                )}

                {!loading && hasQuery && totalResults === 0 && (
                  <p className="search-status">No results for "<strong>{query}</strong>"</p>
                )}

                {/* Prompts */}
                {results.prompts.length > 0 && (
                  <div className="search-group">
                    <p className="search-group-label">
                      Prompts <span>{results.prompts.length}</span>
                    </p>
                    {results.prompts.map((p) => (
                      <PromptResult
                        key={p.id}
                        prompt={p}
                        query={query}
                        onClick={() => handlePromptClick(p)}
                      />
                    ))}
                  </div>
                )}

                {/* Awards */}
                {results.awards.length > 0 && (
                  <div className="search-group">
                    <p className="search-group-label">
                      Awards <span>{results.awards.length}</span>
                    </p>
                    {results.awards.map((a) => (
                      <AwardResult
                        key={a.id}
                        award={a}
                        query={query}
                        onClick={() => handleAwardClick()}
                      />
                    ))}
                  </div>
                )}

                {/* Authors */}
                {results.authors.length > 0 && (
                  <div className="search-group">
                    <p className="search-group-label">
                      Authors <span>{results.authors.length}</span>
                    </p>
                    {results.authors.map((a) => (
                      <AuthorResult
                        key={a.id}
                        author={a}
                        query={query}
                        onClick={() => handleAuthorClick(a)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}