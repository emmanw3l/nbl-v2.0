// src/pages/AdminDashboard.tsx
import { useState, useEffect } from "react";
import AdminLayout             from "../components/AdminLayout";
import { adminFetch }          from "../utils/adminApi";
import type { Stats }          from "../types/admin";
import { Link } from "react-router-dom";

// import ProtectedRoute                from "../components/Protected";

 export default function AdminDashboard() {
  const [stats,   setStats]   = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");

  useEffect(() => {
    adminFetch<{ stats: Stats }>("/admin/stats")
      .then((d) => setStats(d.stats))
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminLayout title="Dashboard">
      {error && <p style={s.error}>{error}</p>}

      {loading ? (
        <p style={s.muted}>Loading…</p>
      ) : stats ? (
        <>
          {/* ── Stat Cards ── */}
          <div style={s.grid}>

            <Link to="/admin/prompts" style={{ textDecoration: "none" }}>
            <StatCard label="Prompts" value={stats.totalPrompts} /></Link>
          
            <Link to="/admin/authors" style={{ textDecoration: "none" }}>
              <StatCard label="Authors" value={stats.totalAuthors} />
            </Link>
            <Link to="/admin/awards" style={{ textDecoration: "none" }}>
              <StatCard label="Awards" value={stats.totalAwards} />
            </Link>
            <Link to="/admin/users" style={{ textDecoration: "none" }}>
              <StatCard label="Admins" value={stats.totalUsers} />
            </Link>
          </div>

          {/* ── Prompts by Year ── */}
          {stats.promptsByYear.length > 0 && (
            <div style={s.section}>
              <h2 style={s.sectionTitle}>Prompts by Year</h2>
              <table style={s.table}>
                <thead>
                  <tr>
                    <Th>Year</Th>
                    <Th>Prompts</Th>
                  </tr>
                </thead>
                <tbody>
                  {stats.promptsByYear.map((r) => (
                    <tr key={r.year}>
                      <Td>{r.year}</Td>
                      <Td>{r.count}</Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : null}
    </AdminLayout>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div style={s.card}>
      <span style={s.cardValue}>{value}</span>
      <span style={s.cardLabel}>{label}</span>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th style={s.th}>{children}</th>;
}
function Td({ children }: { children: React.ReactNode }) {
  return <td style={s.td}>{children}</td>;
}

const s: Record<string, React.CSSProperties> = {
  grid:         { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px,1fr))", gap: 16, marginBottom: 32 },
  card:         { background: "#1a1d27", border: "1px solid #2a2d3a", borderRadius: 8, padding: 20, display: "flex", flexDirection: "column", gap: 6 },
  cardValue:    { fontSize: 32, fontWeight: 700, color: "#6c63ff" },
  cardLabel:    { fontSize: 12, color: "#7b7f96", textTransform: "uppercase", letterSpacing: ".5px" },
  section:      { marginBottom: 32 },
  sectionTitle: { fontSize: 13, fontWeight: 600, color: "#7b7f96", textTransform: "uppercase", letterSpacing: ".5px", marginBottom: 12 },
  table:        { width: "100%", borderCollapse: "collapse" },
  th:           { padding: "8px 12px", textAlign: "left", borderBottom: "1px solid #2a2d3a", fontSize: 11, color: "#7b7f96", textTransform: "uppercase", letterSpacing: ".5px" },
  td:           { padding: "10px 12px", borderBottom: "1px solid #2a2d3a", color: "#e2e4ed" },
  muted:        { color: "#7b7f96" },
  error:        { color: "#e05252", marginBottom: 16 },
};



