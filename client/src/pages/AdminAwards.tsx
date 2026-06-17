// src/pages/AdminAwards.tsx
import { useState, useEffect, useCallback } from "react";
import AdminLayout from "../components/AdminLayout";
import { adminFetch } from "../utils/adminApi";
import type { Award, AwardNominee, Author } from "../types/admin";

const YEARS = [2024, 2025, 2026];

interface NomineeInput {
  authorId: string;
  work: string;
  isWinner: boolean;
}

interface AwardForm {
  description: string;
  category: string;
  year: number;
  nominees: NomineeInput[];
}

const emptyNominee = (): NomineeInput => ({
  authorId: "",
  work: "",
  isWinner: false,
});

const EMPTY_FORM: AwardForm = {
  description: "",
  category: "",
  year: new Date().getFullYear(),
  nominees: [emptyNominee()],
};

export default function AdminAwards() {
  const [awards, setAwards] = useState<Award[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<Award | "new" | null>(null);
  const [form, setForm] = useState<AwardForm>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const fetchAwards = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const d = await adminFetch<{ awards: Award[] }>(`/awards?year=${year}`);
      setAwards(d.awards);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [year]);

  useEffect(() => {
    fetchAwards();
  }, [fetchAwards]);

  useEffect(() => {
    adminFetch<{ authors: Author[] }>("/authors")
      .then((d) => setAuthors(d.authors))
      .catch(console.error);
  }, []);

  function openNew() {
    setForm({ ...EMPTY_FORM, year });
    setEditing("new");
    setFormError("");
  }

  function openEdit(a: Award) {
    // Convert existing nominees to form shape
    setForm({
      description: a.description,
      category: a.category,
      year: a.year,
      nominees: a.nominees.map((n: AwardNominee) => ({
        authorId: String(n.authorId),
        work: n.work ?? "",
        isWinner: n.isWinner,
      })),
    });
    setEditing(a);
    setFormError("");
  }

  // Nominee helpers
  function setNomineeField(
    i: number,
    field: keyof NomineeInput,
    value: string | boolean,
  ) {
    setForm((prev) => ({
      ...prev,
      nominees: prev.nominees.map((n, idx) =>
        idx === i ? { ...n, [field]: value } : n,
      ),
    }));
  }

  function markAsWinner(i: number) {
    // Only one winner at a time
    setForm((prev) => ({
      ...prev,
      nominees: prev.nominees.map((n, idx) => ({ ...n, isWinner: idx === i })),
    }));
  }

  function addNominee() {
    setForm((p) => ({ ...p, nominees: [...p.nominees, emptyNominee()] }));
  }
  function removeNominee(i: number) {
    setForm((p) => ({
      ...p,
      nominees: p.nominees.filter((_, idx) => idx !== i),
    }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    setSaving(true);
    try {
      const payload = {
        ...form,
        nominees: form.nominees
          .filter((n) => n.authorId)
          .map((n) => ({
            authorId: parseInt(n.authorId, 10),
            work: n.work,
            isWinner: n.isWinner,
          })),
      };
      if (editing === "new") {
        await adminFetch("/awards", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      } else if (editing) {
        await adminFetch(`/awards/${editing.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      }
      setEditing(null);
      fetchAwards();
    } catch (e) {
      setFormError((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Delete this award?")) return;
    try {
      await adminFetch(`/awards/${id}`, { method: "DELETE" });
      setAwards((prev) => prev.filter((a) => a.id !== id));
    } catch (e) {
      alert((e as Error).message);
    }
  }

  const winner = (a: Award) => a.nominees?.find((n) => n.isWinner);

  // ── Editor ────────────────────────────────────────────────────────────────
  if (editing !== null)
    return (
      <AdminLayout title={editing === "new" ? "New Award" : "Edit Award"}>
        <button
          className="btn btn-link text-secondary ps-0 mb-3 text-decoration-none"
          onClick={() => setEditing(null)}
        >
          ← Back
        </button>

        {formError && <div className="alert alert-danger">{formError}</div>}

        <div
          className="rounded-4 p-3 p-md-4"
          style={{
            background: "#1a1d27",
            border: "1px solid #2a2d3a",
            maxWidth: 760,
          }}
        >
          <form onSubmit={handleSave}>
            {/* Category + Year */}
            <div className="row g-3 mb-3">
              <div className="col-12 col-md-8">
                <label className="form-label text-secondary small text-uppercase fw-semibold">
                  Category *
                </label>
                <input
                  className="form-control"
                  style={s}
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  required
                />
              </div>
              <div className="col-12 col-md-4">
                <label className="form-label text-secondary small text-uppercase fw-semibold">
                  Year *
                </label>
                <select
                  className="form-select"
                  style={s}
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: +e.target.value })}
                >
                  {YEARS.map((y) => (
                    <option key={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label text-secondary small text-uppercase fw-semibold">
                Description *
              </label>
              <textarea
                className="form-control"
                style={{ ...s, height: 80, resize: "vertical" }}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                required
              />
            </div>

            {/* Nominees */}
            <div
              className="rounded-3 p-3 mb-4"
              style={{ border: "1px solid #2a2d3a" }}
            >
              <p
                className="text-secondary small text-uppercase fw-semibold mb-1"
                style={{ letterSpacing: ".5px" }}
              >
                Nominees
              </p>
              <p className="text-secondary small mb-3" style={{ fontSize: 11 }}>
                Select an author for each nominee. Toggle the ★ to mark the
                winner.
              </p>

              {form.nominees.map((n, i) => (
                <div key={i} className="row g-2 mb-3 align-items-end">
                  {/* Author dropdown */}
                  <div className="col-12 col-md-5">
                    <label className="form-label text-secondary small text-uppercase fw-semibold">
                      Author
                    </label>
                    <select
                      className="form-select"
                      style={s}
                      value={n.authorId}
                      onChange={(e) =>
                        setNomineeField(i, "authorId", e.target.value)
                      }
                    >
                      <option value="">— select author —</option>
                      {authors.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Work / entry */}
                  <div className="col-9 col-md-4">
                    <label className="form-label text-secondary small text-uppercase fw-semibold">
                      Work / Entry
                    </label>
                    <input
                      className="form-control"
                      style={s}
                      value={n.work}
                      onChange={(e) =>
                        setNomineeField(i, "work", e.target.value)
                      }
                      placeholder="(the name of the work or nomination"
                    />
                  </div>

                  {/* Winner toggle + remove */}
                  <div className="col-3 col-md-3 d-flex gap-2">
                    <button
                      type="button"
                      title="Mark as winner"
                      className={`btn btn-sm flex-grow-1 ${n.isWinner ? "btn-warning" : "btn-outline-secondary"}`}
                      onClick={() => markAsWinner(i)}
                    >
                      ★
                    </button>
                    {form.nominees.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-sm"
                        style={{
                          background: "rgba(224,82,82,.15)",
                          color: "#e05252",
                          border: "none",
                        }}
                        onClick={() => removeNominee(i)}
                      >
                        <i className="bi bi-x-lg" />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={addNominee}
              >
                <i className="bi bi-plus-lg me-1" />
                Add Nominee
              </button>
            </div>

            <div className="d-flex gap-2 flex-wrap">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    {editing === "new" ? "Creating…" : "Updating…"}
                  </>
                ) : editing === "new" ? (
                  "Create Award"
                ) : (
                  "Update Award"
                )}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setEditing(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </AdminLayout>
    );

  // ── List ──────────────────────────────────────────────────────────────────
  return (
    <AdminLayout title="Awards">
      <div className="d-flex flex-wrap gap-2 align-items-center mb-4">
        <select
          className="form-select"
          style={{ ...s, width: "auto" }}
          value={year}
          onChange={(e) => setYear(+e.target.value)}
        >
          {YEARS.map((y) => (
            <option key={y}>{y}</option>
          ))}
        </select>
        <button className="btn btn-primary" onClick={openNew}>
          <i className="bi bi-plus-lg me-1" />
          New Award
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : awards.length === 0 ? (
        <p className="text-secondary">No awards for {year}.</p>
      ) : (
        <div
          className="table-responsive rounded-4"
          style={{ border: "1px solid #2a2d3a" }}
        >
          <table
            className="table table-hover mb-0"
            style={{ color: "#e2e4ed" }}
          >
            <thead>
              <tr style={{ background: "#1a1d27", borderColor: "#2a2d3a" }}>
                <th
                  className="text-secondary small text-uppercase"
                  style={{ borderColor: "#2a2d3a" }}
                >
                  Category
                </th>
                <th
                  className="text-secondary small text-uppercase d-none d-md-table-cell"
                  style={{ borderColor: "#2a2d3a" }}
                >
                  Winner
                </th>
                <th
                  className="text-secondary small text-uppercase"
                  style={{ borderColor: "#2a2d3a" }}
                >
                  Nominees
                </th>
                <th
                  className="text-secondary small text-uppercase"
                  style={{ borderColor: "#2a2d3a" }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {awards.map((a) => (
                <tr
                  key={a.id}
                  style={{ background: "#0f1117", borderColor: "#2a2d3a" }}
                >
                  <td style={{ borderColor: "#2a2d3a" }}>{a.category}</td>
                  <td
                    className="d-none d-md-table-cell"
                    style={{ borderColor: "#2a2d3a" }}
                  >
                    {winner(a)?.author?.name ?? "—"}
                  </td>
                  <td style={{ borderColor: "#2a2d3a" }}>
                    <span className="badge bg-secondary">
                      {a.nominees?.length ?? 0}
                    </span>
                  </td>
                  <td style={{ borderColor: "#2a2d3a" }}>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => openEdit(a)}
                      >
                        <i className="bi bi-pencil" />
                        <span className="d-none d-md-inline ms-1">Edit</span>
                      </button>
                      <button
                        className="btn btn-sm"
                        style={{
                          background: "rgba(224,82,82,.15)",
                          color: "#e05252",
                          border: "none",
                        }}
                        onClick={() => handleDelete(a.id)}
                      >
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

const s: React.CSSProperties = {
  background: "#0f1117",
  border: "1px solid #2a2d3a",
  color: "#e2e4ed",
  borderRadius: 8,
};
