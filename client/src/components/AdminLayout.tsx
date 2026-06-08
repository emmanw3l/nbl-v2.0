// src/components/AdminLayout.tsx
import { useState, type ReactNode } from "react";
import { NavLink, useNavigate }     from "react-router-dom";
import { useAuth }                  from "../utils/AuthContext";
import { canAccessPage }            from "../utils/permissions";

interface Props {
  title:    string;
  children: ReactNode;
}

const NAV_LINKS = [
  { to: "/admin/dashboard", label: "Dashboard", page: "dashboard", icon: "bi bi-speedometer2"    },
  { to: "/admin/prompts",   label: "Prompts",   page: "prompts",   icon: "bi bi-pencil-square"   },
  { to: "/admin/authors",   label: "Authors",   page: "authors",   icon: "bi bi-person-lines-fill"},
  { to: "/admin/awards",    label: "Awards",    page: "awards",    icon: "bi bi-trophy"           },
  { to: "/admin/users",     label: "Users",     page: "users",     icon: "bi bi-people-fill"      },
];

const ROLE_BADGE: Record<string, string> = {
  SUPER_ADMIN: "bg-primary",
  ADMIN:       "bg-success",
  EDITOR:      "bg-warning text-dark",
};

const ROLE_LABELS: Record<string, string> = {
  SUPER_ADMIN: "Super Admin",
  ADMIN:       "Admin",
  EDITOR:      "Editor",
};

export default function AdminLayout({ title, children }: Props) {
  const { user, logout } = useAuth();
  const navigate         = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate("/admin/login");
  }

  const navLinks = NAV_LINKS.filter(({ page }) =>
    canAccessPage(user?.role ?? null, page)
  );

  const SidebarContent = () => (
    <>
      {/* Brand */}
      <div className="px-3 py-3 border-bottom border-secondary bg-dark">
        <span className="fs-5 fw-bold text-primary">NBL Admin</span>
      </div>

      {/* User info */}
      {user && (
        <div className="px-3 py-3 border-bottom border-secondary bg-dark">
          <p className="mb-1 fw-semibold text-white small">{user.name}</p>
          <span className={`badge ${ROLE_BADGE[user.role] ?? "bg-secondary"}`}>
            {ROLE_LABELS[user.role] ?? user.role}
          </span>
        </div>
      )}

      {/* Nav links */}
      <ul className="nav bg-dark flex-column py-2 flex-grow-1">
        {navLinks.map(({ to, label, icon }) => (
          <li key={to} className="nav-item">
            <NavLink
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-2 px-3 py-2 ${
                  isActive
                    ? "text-white bg-primary bg-opacity-25 border-end border-primary border-3"
                    : "text-secondary"
                }`
              }
            >
              <i className={icon} />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Sign out */}
      <div className="px-3 py-3 border-top border-secondary bg-dark">
        <button
          className="btn btn-outline-secondary btn-sm w-100"
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-left me-2" />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <div className="d-flex min-vh-100" style={{ background: "#0f1117", color: "#e2e4ed" }}>

      {/* ── Desktop sidebar ── */}
      <div
        className="d-none d-lg-flex flex-column flex-shrink-0"
        style={{ width: 240, background: "#1a1d27", borderRight: "1px solid #2a2d3a", position: "sticky", top: 0, height: "100vh" }}
      >
        <SidebarContent />
      </div>

      {/* ── Mobile offcanvas sidebar ── */}
      <div
        className={`offcanvas offcanvas-start d-lg-none ${sidebarOpen ? "show" : ""}`}
        style={{ background: "#1a1d27", width: 240, visibility: sidebarOpen ? "visible" : "hidden" }}
        tabIndex={-1}
      >
        <div className="offcanvas-body p-0 d-flex flex-column">
          <SidebarContent />
        </div>
      </div>

      {/* Offcanvas backdrop */}
      {sidebarOpen && (
        <div
          className="offcanvas-backdrop fade show d-lg-none"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Main content ── */}
      <div className="flex-grow-1 d-flex flex-column min-w-0">

        {/* Top bar */}
        <header
          className="d-flex align-items-center justify-content-between px-3 px-lg-4 py-3 sticky-top"
          style={{ background: "#1a1d27", borderBottom: "1px solid #2a2d3a" }}
        >
          {/* Mobile hamburger */}
          <button
            className="btn btn-outline-secondary btn-sm d-lg-none"
            onClick={() => setSidebarOpen(true)}
          >
            <i className="bi bi-list fs-5" />
          </button>

          <h1 className="h5 mb-0 fw-semibold mx-auto">{title}</h1>

          {/* Mobile user badge */}
          {/* {user && (
            <span className={`badge d-lg-none ${ROLE_BADGE[user.role] ?? "bg-secondary"}`}>
              {user}
            </span>
          )} */}
          {/* Desktop spacer */}
          <span className="d-none d-lg-block" />
        </header>

        {/* Page content */}
        <main className="p-3 p-lg-4 flex-grow-1">
          {children}
        </main>
      </div>
    </div>
  );
}