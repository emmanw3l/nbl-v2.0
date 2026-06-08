// src/pages/AdminAuthors.tsx
import { useState, useEffect } from "react";
import AdminLayout             from "../components/AdminLayout";
import { adminFetch }          from "../utils/adminApi";
import type { Author }         from "../types/admin";

const EMPTY = { name: "", slug: "" };

function toSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export default function AdminAuthors() {
  const [authors,   setAuthors]   = useState<Author[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState("");
  const [form,      setForm]      = useState(EMPTY);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formError, setFormError] = useState("");
  const [saving,    setSaving]    = useState(false);

  async function fetchAuthors() {
    setLoading(true); setError("");
    try {
      const d = await adminFetch<{ authors: Author[] }>("/authors");
      setAuthors(d.authors);
    } catch (e) { setError((e as Error).message); }
    finally { setLoading(false); }
  }

  useEffect(() => { fetchAuthors(); }, []);

  function handleNameChange(name: string) {
    setForm((prev) => ({ ...prev, name, slug: editingId ? prev.slug : toSlug(name) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setFormError(""); setSaving(true);
    try {
      if (editingId) {
        await adminFetch(`/authors/${editingId}`, { method: "PUT",  body: JSON.stringify(form) });
      } else {
        await adminFetch("/authors",              { method: "POST", body: JSON.stringify(form) });
      }
      setForm(EMPTY); setEditingId(null); fetchAuthors();
    } catch (e) { setFormError((e as Error).message); }
    finally { setSaving(false); }
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Delete this author?")) return;
    try {
      await adminFetch(`/authors/${id}`, { method: "DELETE" });
      setAuthors((prev) => prev.filter((a) => a.id !== id));
    } catch (e) { alert((e as Error).message); }
  }

  function startEdit(a: Author) { setEditingId(a.id); setForm({ name: a.name, slug: a.slug }); setFormError(""); }
  function cancelEdit()          { setEditingId(null); setForm(EMPTY); setFormError(""); }

  return (
    <AdminLayout title="Authors">
      {/* ── Form card ── */}
      <div className="rounded-4 p-3 p-md-4 mb-4" style={{ background: "#1a1d27", border: "1px solid #2a2d3a" }}>
        <h2 className="h6 text-secondary text-uppercase fw-semibold mb-3" style={{ letterSpacing: ".5px" }}>
          {editingId ? "Edit Author" : "Add Author"}
        </h2>

        {formError && <div className="alert alert-danger py-2 small">{formError}</div>}

        <form onSubmit={handleSubmit}>
          <div className="row g-3 mb-3">
            <div className="col-12 col-md-6">
              <label className="form-label text-secondary small text-uppercase fw-semibold">Name *</label>
              <input className="form-control" style={inputStyle}
                value={form.name} onChange={(e) => handleNameChange(e.target.value)} required />
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label text-secondary small text-uppercase fw-semibold">Slug *</label>
              <input className="form-control" style={inputStyle}
                value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
            </div>
          </div>

          <div className="d-flex gap-2 flex-wrap">
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving
                ? <><span className="spinner-border spinner-border-sm me-2" />{editingId ? "Updating…" : "Creating…"}</>
                : editingId ? "Update Author" : "Create Author"
              }
            </button>
            {editingId && (
              <button type="button" className="btn btn-outline-secondary" onClick={cancelEdit}>Cancel</button>
            )}
          </div>
        </form>
      </div>

      {/* ── Table ── */}
      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : (
        <div className="table-responsive rounded-4" style={{ border: "1px solid #2a2d3a" }}>
          <table className="table table-hover table-striped table-dark mb-0" style={{ color: "#e2e4ed" }}>
            <thead>
              <tr style={{ background: "#1a1d27", borderColor: "#2a2d3a" }}>
                <th className="text-secondary small text-uppercase" style={{ borderColor: "#2a2d3a" }}>Name</th>
                <th className="text-secondary small text-uppercase d-none d-md-table-cell" style={{ borderColor: "#2a2d3a" }}>Slug</th>
                <th className="text-secondary small text-uppercase" style={{ borderColor: "#2a2d3a" }}>Prompts</th>
                <th className="text-secondary small text-uppercase" style={{ borderColor: "#2a2d3a" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {authors.map((a) => (
                <tr key={a.id} style={{ background: "#0f1117", borderColor: "#2a2d3a" }}>
                  <td style={{ borderColor: "#2a2d3a" }}>{a.name}</td>
                  <td className="d-none d-md-table-cell" style={{ borderColor: "#2a2d3a" }}>
                    <code className="text-secondary">{a.slug}</code>
                  </td>
                  <td style={{ borderColor: "#2a2d3a" }}>
                    <span className="badge bg-secondary">{a._count?.prompts ?? 0}</span>
                  </td>
                  <td style={{ borderColor: "#2a2d3a" }}>
                    <div className="d-flex gap-2">
                      <button className="btn btn-outline-secondary btn-sm" onClick={() => startEdit(a)}>
                        <i className="bi bi-pencil" />
                        <span className="d-none d-md-inline ms-1">Edit</span>
                      </button>
                      <button className="btn btn-sm" style={{ background: "rgba(224,82,82,.15)", color: "#e05252", border: "none" }} onClick={() => handleDelete(a.id)}>
                        <i className="bi bi-trash" />
                        <span className="d-none d-md-inline ms-1">Delete</span>
                      </button>
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