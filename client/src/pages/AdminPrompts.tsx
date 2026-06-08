// src/pages/AdminPrompts.tsx
import { useState, useEffect, useCallback } from "react";
import AdminLayout                           from "../components/AdminLayout";
import { adminFetch }                        from "../utils/adminApi";
import { useAuth }                           from "../utils/AuthContext";
import type { Prompt, Author }               from "../types/admin";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const YEARS  = [2024, 2025, 2026];

const EMPTY_FORM = {
  title: "", content: "", theme: "", month: 1,
  year: new Date().getFullYear(), slug: "", authorId: "",
};

function toSlug(month: number, year: number) {
  return `${MONTHS[month - 1]?.toLowerCase()}-${year}`;
}

export default function AdminPrompts() {
  const { can } = useAuth();

  const [prompts,    setPrompts]   = useState<Prompt[]>([]);
  const [authors,    setAuthors]   = useState<Author[]>([]);
  const [year,       setYear]      = useState<number | "all">("all");
  const [loading,    setLoading]   = useState(true);
  const [error,      setError]     = useState("");
  const [editing,    setEditing]   = useState<Prompt | "new" | null>(null);
  const [form,       setForm]      = useState(EMPTY_FORM);
  const [saving,     setSaving]    = useState(false);
  const [formError,  setFormError] = useState("");

  const fetchPrompts = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const url = year === "all" ? "/prompts" : `/prompts?year=${year}`;
      const d   = await adminFetch<{ prompts: Prompt[] }>(url);
      setPrompts(d.prompts);
    } catch (e) { setError((e as Error).message); }
    finally { setLoading(false); }
  }, [year]);

  useEffect(() => { fetchPrompts(); }, [fetchPrompts]);
  useEffect(() => {
    adminFetch<{ authors: Author[] }>("/authors")
      .then((d) => setAuthors(d.authors))
      .catch(console.error);
  }, []);

  function openNew() {
    setForm({ ...EMPTY_FORM, year: typeof year === "number" ? year : new Date().getFullYear(), slug: toSlug(1, typeof year === "number" ? year : new Date().getFullYear()) });
    setEditing("new"); setFormError("");
  }

  function openEdit(p: Prompt) {
    setForm({ title: p.title, content: p.content, theme: (p as Prompt & { theme?: string }).theme ?? "", month: p.month, year: p.year, slug: p.slug, authorId: String(p.authorId) });
    setEditing(p); setFormError("");
  }

  function handleMonthOrYear(field: "month" | "year", value: number) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (editing === "new") next.slug = toSlug(next.month, next.year);
      return next;
    });
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault(); setFormError(""); setSaving(true);
    try {
      if (editing === "new") {
        await adminFetch("/prompts", { method: "POST", body: JSON.stringify(form) });
      } else if (editing) {
        await adminFetch(`/prompts/${editing.id}`, { method: "PUT", body: JSON.stringify(form) });
      }
      setEditing(null); fetchPrompts();
    } catch (e) { setFormError((e as Error).message); }
    finally { setSaving(false); }
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Delete this prompt?")) return;
    try {
      await adminFetch(`/prompts/${id}`, { method: "DELETE" });
      setPrompts((prev) => prev.filter((p) => p.id !== id));
    } catch (e) { alert((e as Error).message); }
  }

  // ── Editor ────────────────────────────────────────────────────────────────
  if (editing !== null) return (
    <AdminLayout title={editing === "new" ? "New Prompt" : "Edit Prompt"}>
      <button className="btn btn-link text-secondary ps-0 mb-3 text-decoration-none" onClick={() => setEditing(null)}>
        ← Back
      </button>

      {formError && <div className="alert alert-danger">{formError}</div>}

      <div className="rounded-4 p-3 p-md-4" style={{ background: "#1a1d27", border: "1px solid #2a2d3a", maxWidth: 760 }}>
        <form onSubmit={handleSave}>
          <div className="mb-3">
            <label className="form-label text-secondary small text-uppercase fw-semibold">Title *</label>
            <input className="form-control" style={inputStyle}
              value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </div>

          <div className="mb-3">
            <label className="form-label text-secondary small text-uppercase fw-semibold">Theme</label>
            <input className="form-control" style={inputStyle}
              value={form.theme} onChange={(e) => setForm({ ...form, theme: e.target.value })}
              placeholder="e.g. Realm of divinity" />
          </div>

          <div className="row g-3 mb-3">
            <div className="col-6 col-md-3">
              <label className="form-label text-secondary small text-uppercase fw-semibold">Month *</label>
              <select className="form-select" style={inputStyle} value={form.month}
                onChange={(e) => handleMonthOrYear("month", +e.target.value)}>
                {MONTHS.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
              </select>
            </div>
            <div className="col-6 col-md-3">
              <label className="form-label text-secondary small text-uppercase fw-semibold">Year *</label>
              <select className="form-select" style={inputStyle} value={form.year}
                onChange={(e) => handleMonthOrYear("year", +e.target.value)}>
                {YEARS.map((y) => <option key={y}>{y}</option>)}
              </select>
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label text-secondary small text-uppercase fw-semibold">Slug *</label>
              <input className="form-control" style={inputStyle} value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label text-secondary small text-uppercase fw-semibold">Author *</label>
            <select className="form-select" style={inputStyle} value={form.authorId}
              onChange={(e) => setForm({ ...form, authorId: e.target.value })} required>
              <option value="">— select author —</option>
              {authors.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
          </div>

          <div className="mb-4">
            <label className="form-label text-secondary small text-uppercase fw-semibold">Content *</label>
            <textarea className="form-control" style={{ ...inputStyle, height: 260, resize: "vertical" }}
              value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required />
          </div>

          <div className="d-flex gap-2 flex-wrap">
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving
                ? <><span className="spinner-border spinner-border-sm me-2" />{editing === "new" ? "Creating…" : "Updating…"}</>
                : editing === "new" ? "Create Prompt" : "Update Prompt"
              }
            </button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => setEditing(null)}>Cancel</button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );

  // ── List ──────────────────────────────────────────────────────────────────
  return (
    <AdminLayout title="Prompts">
      <div className="d-flex flex-wrap gap-2 align-items-center mb-4">
        <select className="form-select" style={{ ...inputStyle, width: "auto" }}
          value={year} onChange={(e) => setYear(e.target.value === "all" ? "all" : +e.target.value)}>
          <option value="all">All Years</option>
          {YEARS.map((y) => <option key={y}>{y}</option>)}
        </select>
        {can("createPrompt") && (
          <button className="btn btn-primary" onClick={openNew}>
            <i className="bi bi-plus-lg me-1" /> New Prompt
          </button>
        )}
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : prompts.length === 0 ? (
        <p className="text-secondary">No prompts found.</p>
      ) : (
        <div className="table-responsive  bg-dark rounded-4" >
          <table className="table table-striped table-dark table-hover mb-0" >
            <thead >
              <tr style={{ borderColor: "#2a2d3a", background: "#1a1d27" }}>
                <th className="text-secondary  text-uppercase" style={{ borderColor: "#2a2d3a" }}>Month</th>
                <th className="text-secondary  text-uppercase" style={{ borderColor: "#2a2d3a" }}>Title</th>
                <th className="text-secondary  text-uppercase d-none d-md-table-cell" style={{ borderColor: "#2a2d3a" }}>Author</th>
                <th className="text-secondary  text-uppercase d-none d-md-table-cell" style={{ borderColor: "#2a2d3a" }}>Year</th>
                <th className="text-secondary  text-uppercase" style={{ borderColor: "#2a2d3a" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {prompts.map((p) => (
                <tr key={p.id} style={{ borderColor: "#2a2d3a", background: "#0f1117" }}>
                  <td style={{ borderColor: "#2a2d3a" }}>{MONTHS[p.month - 1]}</td>
                  <td style={{ borderColor: "#2a2d3a" }}>{p.title}</td>
                  <td className="d-none d-md-table-cell" style={{ borderColor: "#2a2d3a" }}>{p.author?.name ?? "—"}</td>
                  <td className="d-none d-md-table-cell" style={{ borderColor: "#2a2d3a" }}>{p.year}</td>
                  <td style={{ borderColor: "#2a2d3a" }}>
                    <div className="d-flex gap-2">
                      {can("editPrompt") && (
                        <button className="btn btn-outline-secondary btn-sm" onClick={() => openEdit(p)}>
                          <i className="bi bi-pencil" />
                          <span className="d-none d-md-inline ms-1">Edit</span>
                        </button>
                      )}
                      {can("deletePrompt") && (
                        <button className="btn btn-sm" style={{ background: "rgba(224,82,82,.15)", color: "#e05252", border: "none" }} onClick={() => handleDelete(p.id)}>
                          <i className="bi bi-trash" />
                          <span className="d-none d-md-inline ms-1">Delete</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}

const inputStyle: React.CSSProperties = {
  background: "#0f1117", border: "1px solid #2a2d3a",
  color: "#e2e4ed", borderRadius: 8,
};