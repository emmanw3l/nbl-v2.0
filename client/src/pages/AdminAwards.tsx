// src/pages/AdminAwards.tsx
import { useState, useEffect, useCallback } from "react";
import AdminLayout from "../components/AdminLayout";
import { adminFetch } from "../utils/adminApi";
import type { Award, Nominee } from "../types/admin";

const YEARS = [2024, 2025, 2026];

interface AwardForm {
  description: string;
  category: string;
  year: number;
  nominees: Nominee[];
  winner: Nominee;
}

const EMPTY_FORM: AwardForm = {
  description: "",
  category: "",
  year: new Date().getFullYear(),
  nominees: [{ name: "", work: "" }],
  winner: { name: "", work: "" },
};

export default function AdminAwards() {
  const [awards, setAwards] = useState<Award[]>([]);
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

  function openNew() {
    setForm({ ...EMPTY_FORM, year });
    setEditing("new");
    setFormError("");
  }
  function openEdit(a: Award) {
    setForm({
      description: a.description,
      category: a.category,
      year: a.year,
      nominees: a.nominees,
      winner: a.winner,
    });
    setEditing(a);
    setFormError("");
  }

  function setNominee(i: number, field: keyof Nominee, value: string) {
    setForm((prev) => ({
      ...prev,
      nominees: prev.nominees.map((n, idx) =>
        idx === i ? { ...n, [field]: value } : n,
      ),
    }));
  }
  function addNominee() {
    setForm((p) => ({
      ...p,
      nominees: [...p.nominees, { name: "", work: "" }],
    }));
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
      if (editing === "new") {
        await adminFetch("/awards", {
          method: "POST",
          body: JSON.stringify(form),
        });
      } else if (editing) {
        await adminFetch(`/awards/${editing.id}`, {
          method: "PUT",
          body: JSON.stringify(form),
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
            <div className="row g-3 mb-3">
              <div className="col-12 col-md-8">
                <label className="form-label text-secondary small text-uppercase fw-semibold">
                  Category *
                </label>
                <input
                  className="form-control"
                  style={inputStyle}
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
                  style={inputStyle}
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: +e.target.value })}
                >
                  {YEARS.map((y) => (
                    <option key={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label text-secondary small text-uppercase fw-semibold">
                Description *
              </label>
              <textarea
                className="form-control"
                style={{ ...inputStyle, height: 80, resize: "vertical" }}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                required
              />
            </div>

            {/* Nominees */}
            <div
              className="rounded-3 p-3 mb-3"
              style={{ border: "1px solid #2a2d3a" }}
            >
              <p
                className="text-secondary small text-uppercase fw-semibold mb-3"
                style={{ letterSpacing: ".5px" }}
              >
                Nominees
              </p>
              {form.nominees.map((n, i) => (
                <div key={i} className="row g-2 mb-2 align-items-end">
                  <div className="col-12 col-md-5">
                    <label className="form-label text-secondary small text-uppercase fw-semibold">
                      Name
                    </label>
                    <input
                      className="form-control"
                      style={inputStyle}
                      value={n.name}
                      onChange={(e) => setNominee(i, "name", e.target.value)}
                    />
                  </div>
                  <div className="col-10 col-md-5">
                    <label className="form-label text-secondary small text-uppercase fw-semibold">
                      Work / Entry
                    </label>
                    <input
                      className="form-control"
                      style={inputStyle}
                      value={n.work}
                      onChange={(e) => setNominee(i, "work", e.target.value)}
                    />
                  </div>
                  {form.nominees.length > 1 && (
                    <div className="col-2">
                      <button
                        type="button"
                        className="btn btn-sm w-100"
                        style={{
                          background: "rgba(224,82,82,.15)",
                          color: "#e05252",
                          border: "none",
                        }}
                        onClick={() => removeNominee(i)}
                      >
                        <i className="bi bi-x-lg" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm mt-1"
                onClick={addNominee}
              >
                <i className="bi bi-plus-lg me-1" />
                Add Nominee
              </button>
            </div>

            {/* Winner */}
            <div
              className="rounded-3 p-3 mb-4"
              style={{ border: "1px solid #2a2d3a" }}
            >
              <p
                className="text-secondary small text-uppercase fw-semibold mb-3"
                style={{ letterSpacing: ".5px" }}
              >
                Winner
              </p>
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label text-secondary small text-uppercase fw-semibold">
                    Name
                  </label>
                  <input
                    className="form-control"
                    style={inputStyle}
                    value={form.winner.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        winner: { ...form.winner, name: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label text-secondary small text-uppercase fw-semibold">
                    Work / Entry
                  </label>
                  <input
                    className="form-control"
                    style={inputStyle}
                    value={form.winner.work}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        winner: { ...form.winner, work: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
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
          style={{ ...inputStyle, width: "auto" }}
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
                    {a.winner?.name ?? "—"}
                  </td>
                  <td style={{ borderColor: "#2a2d3a" }}>
                    <span className="badge bg-secondary">
                      {Array.isArray(a.nominees) ? a.nominees.length : "—"}
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

const inputStyle: React.CSSProperties = {
  background: "#0f1117",
  border: "1px solid #2a2d3a",
  color: "#e2e4ed",
  borderRadius: 8,
};
