// src/pages/AdminUsers.tsx
import { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import { adminFetch } from "../utils/adminApi";
import type { AdminUser, Role } from "../types/admin";

const EMPTY = { name: "", email: "", password: "", role: "ADMIN" as Role };

export default function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  async function fetchUsers() {
    setLoading(true);
    setError("");
    try {
      const d = await adminFetch<{ users: AdminUser[] }>("/users");
      setUsers(d.users);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    setSaving(true);
    try {
      if (editingId) {
        const body = form.password
          ? form
          : { name: form.name, email: form.email, role: form.role };
        await adminFetch(`/users/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(body),
        });
      } else {
        await adminFetch("/users", {
          method: "POST",
          body: JSON.stringify(form),
        });
      }
      setForm(EMPTY);
      setEditingId(null);
      fetchUsers();
    } catch (e) {
      setFormError((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Delete this user?")) return;
    try {
      await adminFetch(`/users/${id}`, { method: "DELETE" });
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (e) {
      alert((e as Error).message);
    }
  }

  function startEdit(u: AdminUser) {
    setEditingId(u.id);
    setForm({ name: u.name, email: u.email, password: "", role: u.role });
    setFormError("");
  }

  const roleBadge: Record<string, string> = {
    SUPER_ADMIN: "bg-primary",
    ADMIN: "bg-success",
    EDITOR: "bg-warning text-dark",
  };

  return (
    <div className="sm-12 md-12 lg-12 xs-12">
      <AdminLayout title="Admin Users">
        {/* ── Form card ── */}

        <div
          className="rounded-4 p-3 p-md-4 mb-4 "
          style={{ background: "#1a1d27", border: "1px solid #2a2d3a" }}
        >
          <h2
            className="h6 text-secondary text-uppercase fw-semibold mb-3"
            style={{ letterSpacing: ".5px" }}
          >
            {editingId ? "Edit User" : "Add Admin"}
          </h2>

          {formError && (
            <div className="alert alert-danger py-2 small">{formError}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="row g-3 mb-3">
              <div className="col-12 col-md-6">
                <label className="form-label text-secondary small text-uppercase fw-semibold">
                  Name *
                </label>
                <input
                  className="form-control"
                  style={inputStyle}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label text-secondary small text-uppercase fw-semibold">
                  Email *
                </label>
                <input
                  type="email"
                  className="form-control"
                  style={inputStyle}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="row g-3 mb-4">
              <div className="col-12 col-md-6">
                <label className="form-label text-secondary small text-uppercase fw-semibold">
                  Password{" "}
                  {editingId && (
                    <span className="text-secondary fw-normal text-lowercase">
                      (leave blank to keep)
                    </span>
                  )}
                </label>
                <input
                  type="password"
                  className="form-control"
                  style={inputStyle}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required={!editingId}
                  minLength={8}
                />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label text-secondary small text-uppercase fw-semibold">
                  Role
                </label>
                <select
                  className="form-select"
                  style={inputStyle}
                  value={form.role}
                  onChange={(e) =>
                    setForm({ ...form, role: e.target.value as Role })
                  }
                >
                  <option value="EDITOR">Editor</option>
                  <option value="ADMIN">Admin</option>
                  <option value="SUPER_ADMIN">Super Admin</option>
                </select>
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
                    {editingId ? "Updating…" : "Creating…"}
                  </>
                ) : editingId ? (
                  "Update User"
                ) : (
                  "Create User"
                )}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    setEditingId(null);
                    setForm(EMPTY);
                  }}
                >
                  Cancel
                </button>
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
          <div
            className="table-responsive rounded-4"
            style={{ border: "1px solid #2a2d3a" }}
          >
            <table className="table table-hover table-striped table-dark mb-0">
              <thead>
                <tr style={{ background: "#1a1d27", borderColor: "#2a2d3a" }}>
                  <th
                    className="text-secondary small text-uppercase"
                    style={{ borderColor: "#2a2d3a" }}
                  >
                    Name
                  </th>
                  <th
                    className="text-secondary small text-uppercase d-none d-md-table-cell"
                    style={{ borderColor: "#2a2d3a" }}
                  >
                    Email
                  </th>
                  <th
                    className="text-secondary small text-uppercase"
                    style={{ borderColor: "#2a2d3a" }}
                  >
                    Role
                  </th>
                  <th
                    className="text-secondary small text-uppercase d-none d-sm-table-cell"
                    style={{ borderColor: "#2a2d3a" }}
                  >
                    Status
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
                {users.map((u) => (
                  <tr key={u.id}>
                    <td style={{ borderColor: "#2a2d3a" }}>{u.name}</td>
                    <td
                      className="d-none d-md-table-cell text-secondary small"
                      style={{ borderColor: "#2a2d3a" }}
                    >
                      {u.email}
                    </td>
                    <td style={{ borderColor: "#2a2d3a" }}>
                      <span
                        className={`badge ${roleBadge[u.role] ?? "bg-secondary"}`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td
                      className="d-none d-sm-table-cell"
                      style={{ borderColor: "#2a2d3a" }}
                    >
                      <span
                        className={`badge ${u.isActive ? "bg-success" : "bg-danger"}`}
                      >
                        {u.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td style={{ borderColor: "#2a2d3a" }}>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => startEdit(u)}
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
                          onClick={() => handleDelete(u.id)}
                        >
                          <i className="bi bi-trash" />
                          <span className="d-none d-md-inline ms-1">
                            Delete
                          </span>
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
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  background: "#0f1117",
  border: "1px solid #2a2d3a",
  color: "#e2e4ed",
  borderRadius: 8,
};
