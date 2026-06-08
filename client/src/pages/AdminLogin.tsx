// src/pages/AdminLogin.tsx
import { useState }        from "react";
import { useNavigate }     from "react-router-dom";
import { useAuth }         from "../utils/AuthContext";

export default function AdminLogin() {
  const { login, user }   = useAuth();
  const navigate          = useNavigate();

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  // Already logged in — redirect straight to dashboard
  if (user) {
    navigate("/admin/dashboard", { replace: true });
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={s.wrap}>
      <div style={s.card}>
        <h1 style={s.title}>NBL Admin</h1>
        <p style={s.sub}>Sign in to continue</p>

        {error && <p style={s.error}>{error}</p>}

        <form onSubmit={handleSubmit} style={s.form}>
          <div style={s.field}>
            <label style={s.label}>Email</label>
            <input
              type="email"
              style={s.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div style={s.field}>
            <label style={s.label}>Password</label>
            <input
              type="password"
              style={s.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <button type="submit" style={s.btn} disabled={loading}>
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  wrap:  { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0f1117" },
  card:  { background: "#1a1d27", border: "1px solid #2a2d3a", borderRadius: 12, padding: 40, width: "100%", maxWidth: 400 },
  title: { fontSize: 22, fontWeight: 700, color: "#6c63ff", margin: "0 0 4px" },
  sub:   { fontSize: 13, color: "#7b7f96", margin: "0 0 28px" },
  form:  { display: "flex", flexDirection: "column", gap: 16 },
  field: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: 12, color: "#7b7f96", textTransform: "uppercase", letterSpacing: ".4px" },
  input: { background: "#0f1117", border: "1px solid #2a2d3a", borderRadius: 8, color: "#e2e4ed", padding: "10px 12px", fontSize: 13 },
  btn:   { background: "#6c63ff", color: "#fff", border: "none", borderRadius: 8, padding: "10px 16px", fontSize: 14, fontWeight: 600, cursor: "pointer", marginTop: 4 },
  error: { color: "#e05252", fontSize: 13, margin: "0 0 8px" },
};