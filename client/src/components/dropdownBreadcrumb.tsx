// src/components/DropdownBreadcrumb.tsx
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate }           from "react-router-dom";
import "./dropdownBreadcrumb.css";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

interface Props {
  currentYear:  string;
  currentMonth: string;
}

interface PromptMeta {
  month: number;
  year:  number;
}

export default function DropdownBreadcrumb({ currentYear, currentMonth }: Props) {
  const navigate = useNavigate();

  const [years,         setYears]         = useState<number[]>([]);
  const [monthsForYear, setMonthsForYear] = useState<number[]>([]);
  const [yearOpen,      setYearOpen]      = useState(false);
  const [monthOpen,     setMonthOpen]     = useState(false);

  const yearRef  = useRef<HTMLDivElement>(null);
  const monthRef = useRef<HTMLDivElement>(null);

  const monthLabel = currentMonth
    ? currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1).toLowerCase()
    : "";

  // Fetch all available years
  useEffect(() => {
    fetch(`${API}/prompts/years`)
      .then((r) => r.json())
      .then((d: { years: number[] }) => setYears(d.years ?? []))
      .catch(console.error);
  }, []);

  // Fetch available months when year changes
  useEffect(() => {
    if (!currentYear) return;
    fetch(`${API}/prompts?year=${currentYear}`)
      .then((r) => r.json())
      .then((d: { prompts: PromptMeta[] }) => {
        const unique = [...new Set((d.prompts ?? []).map((p) => p.month))].sort(
          (a, b) => a - b
        );
        setMonthsForYear(unique);
      })
      .catch(console.error);
  }, [currentYear]);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (yearRef.current  && !yearRef.current.contains(e.target as Node))  setYearOpen(false);
      if (monthRef.current && !monthRef.current.contains(e.target as Node)) setMonthOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function goToYear(year: number) {
    fetch(`${API}/prompts?year=${year}`)
      .then((r) => r.json())
      .then((d: { prompts: PromptMeta[] }) => {
        const months = [...new Set((d.prompts ?? []).map((p) => p.month))].sort((a, b) => a - b);
        if (months.length > 0) {
          const monthName = MONTH_NAMES[months[0] - 1]?.toLowerCase();
          navigate(`/mainPromptPage/${year}/${monthName}`);
        }
      })
      .catch(console.error);
    setYearOpen(false);
  }

  function goToMonth(monthNum: number) {
    const monthName = MONTH_NAMES[monthNum - 1]?.toLowerCase();
    navigate(`/mainPromptPage/${currentYear}/${monthName}`);
    setMonthOpen(false);
  }

  return (
    <nav aria-label="breadcrumb" className="mb-4">
      <ol className="breadcrumb align-items-center">

        {/* ── Prompts ── */}
        <li className="breadcrumb-item">
          <Link to="/mainPromptPage">Prompts</Link>
        </li>

        {/* ── Year dropdown ── */}
        <li className="breadcrumb-item">
          <div ref={yearRef} className="bc-item-wrap">
            <button
              className={`bc-trigger ${yearOpen ? "open" : ""}`}
              onClick={() => { setYearOpen((o) => !o); setMonthOpen(false); }}
            >
              {currentYear}
              <i className="bi bi-chevron-down" />
            </button>

            {yearOpen && (
              <div className="bc-dropdown">
                {years.map((y) => (
                  <button
                    key={y}
                    className={`bc-dropdown-item ${String(y) === currentYear ? "bc-dropdown-item--current" : ""}`}
                    onClick={() => goToYear(y)}
                  >
                    {String(y) === currentYear && <i className="bi bi-check2" />}
                    {y}
                  </button>
                ))}
              </div>
            )}
          </div>
        </li>

        {/* ── Month dropdown ── */}
        <li className="breadcrumb-item active">
          <div ref={monthRef} className="bc-item-wrap">
            <button
              className={`bc-trigger bc-trigger--active ${monthOpen ? "open" : ""}`}
              onClick={() => { setMonthOpen((o) => !o); setYearOpen(false); }}
            >
              {monthLabel}
              <i className="bi bi-chevron-down" />
            </button>

            {monthOpen && (
              <div className="bc-dropdown">
                {monthsForYear.length === 0 ? (
                  <span className="bc-dropdown-empty">No months found</span>
                ) : (
                  monthsForYear.map((m) => {
                    const name      = MONTH_NAMES[m - 1] ?? "";
                    const isCurrent = name.toLowerCase() === currentMonth.toLowerCase();
                    return (
                      <button
                        key={m}
                        className={`bc-dropdown-item ${isCurrent ? "bc-dropdown-item--current" : ""}`}
                        onClick={() => goToMonth(m)}
                      >
                        {isCurrent && <i className="bi bi-check2" />}
                        {name}
                      </button>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </li>

      </ol>
    </nav>
  );
}