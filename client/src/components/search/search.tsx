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
  id:     number;
  name:   string;
  slug:   string;
  _count?: { prompts: number };
}

interface Results {
  prompts: Prompt[];
  awards:  Award[];
  authors: Author[];
}

// ── Highlight ──────────────────────────────────────────────────────────────
function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim() || !text) return <>{text}</>;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts   = text.split(new RegExp(`(${escaped})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase()
          ? <mark key={i} className="search-highlight">{part}</mark>
          : part
      )}
    </>
  );
}

// ── Filter helpers ─────────────────────────────────────────────────────────
function filterPrompts(prompts: Prompt[], q: string) {
  const l = q.toLowerCase();
  return prompts.filter((p) =>
    p.title.toLowerCase().includes(l) ||
    p.theme?.toLowerCase().includes(l) ||
    p.author?.name.toLowerCase().includes(l) ||
    MONTH_NAMES[p.month - 1]?.toLowerCase().includes(l)
  );
}

function filterAwards(awards: Award[], q: string) {
  const l = q.toLowerCase();
  return awards.filter((a) =>
    a.category.toLowerCase().includes(l) ||
    a.description.toLowerCase().includes(l) ||
    a.winner?.name.toLowerCase().includes(l) ||
    a.nominees?.some((n) => n.name.toLowerCase().includes(l))
  );
}

function filterAuthors(authors: Author[], q: string) {
  return authors.filter((a) => a.name.toLowerCase().includes(q.toLowerCase()));
}

// ── Result cards ───────────────────────────────────────────────────────────
function PromptResult({ prompt, query, onClick }: { prompt: Prompt; query: string; onClick: () => void }) {
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
        <Highlight text={`${MONTH_NAMES[prompt.month - 1]} ${prompt.year}`} query={query} />
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
        {award.winner?.name && <> · Winner: <Highlight text={award.winner.name} query={query} /></>}
        {matchingNominee   && <> · Nominee: <Highlight text={matchingNominee.name} query={query} /></>}
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

// ── Main ───────────────────────────────────────────────────────────────────
export default function Search() {
  const navigate = useNavigate();

  const [query,   setQuery]   = useState("");
  const [open,    setOpen]    = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Results>({ prompts: [], awards: [], authors: [] });
  const [cache,   setCache]   = useState<{ prompts: Prompt[]; awards: Award[]; authors: Author[] } | null>(null);

  const inputRef    = useRef<HTMLInputElement>(null);
  const panelRef    = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close when clicking outside the panel
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        close();
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  function close() {
    setOpen(false);
    setQuery("");
    setResults({ prompts: [], awards: [], authors: [] });
  }

  // Fetch all data once and cache
  const fetchAll = useCallback(async () => {
    if (cache) return cache;
    setLoading(true);
    try {
      const [pr, ar, au] = await Promise.all([
        fetch(`${API}/prompts`).then((r) => r.json()),
        fetch(`${API}/awards`).then((r)  => r.json()),
        fetch(`${API}/authors`).then((r) => r.json()),
      ]);
      const data = {
        prompts: pr.prompts  ?? [],
        awards:  ar.awards   ?? [],
        authors: au.authors  ?? [],
      };
      setCache(data);
      return data;
    } catch {
      return { prompts: [], awards: [], authors: [] };
    } finally {
      setLoading(false);
    }
  }, [cache]);

  // Debounced search
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

  function go(path: string) {
    navigate(path);
    close();
  }

  return (
    <>
      {/* Trigger */}
      <button className="search-trigger" onClick={handleOpen} aria-label="Search">
        <i className="bi bi-search" />
      </button>

      {/* Full-width panel beneath navbar */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            className="search-panel"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Input row */}
            <div className="search-input-row">
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
              <button className="search-close-btn" onClick={close}>
                Close
              </button>
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
                <p className="search-status">
                  No results for "<strong>{query}</strong>"
                </p>
              )}

              <div className="search-results-grid">
                {/* Prompts */}
                {results.prompts.length > 0 && (
                  <div className="search-group">
                    <p className="search-group-label">
                      Prompts <span>{results.prompts.length}</span>
                    </p>
                    {results.prompts.map((p) => (
                      <PromptResult
                        key={p.id} prompt={p} query={query}
                        onClick={() => go(`/mainPromptPage/${p.year}/${MONTH_NAMES[p.month - 1]?.toLowerCase()}`)}
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
                        key={a.id} award={a} query={query}
                        onClick={() => go("/awards")}
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
                        key={a.id} author={a} query={query}
                        onClick={() => go(`/profile/${a.slug}`)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}