// src/context/AuthContext.tsx
import {
  createContext, useContext, useState,
  useEffect, useCallback,
  type ReactNode,
} from "react";
import type { Role } from "./permissions";
import { canAccessPage, canDoAction } from "./permissions";

// ── Types ─────────────────────────────────────────────────────────────────
export interface AuthUser {
  id:    number;
  email: string;
  name:  string;
  role:  Role;
}

interface AuthContextValue {
  user:         AuthUser | null;
  loading:      boolean;
  login:        (email: string, password: string) => Promise<void>;
  logout:       () => void;
  canAccess:    (page: string)   => boolean;
  can:          (action: string) => boolean;
}

// ── Helpers ───────────────────────────────────────────────────────────────
function decodeToken(token: string): AuthUser | null {
  try {
    const payload = token.split(".")[1];
    // atob doesn't handle URL-safe base64 — fix padding first
    const base64  = payload.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64)) as AuthUser;
  } catch {
    return null;
  }
}

function isTokenExpired(token: string): boolean {
  try {
    const decoded = decodeToken(token) as (AuthUser & { exp?: number }) | null;
    if (!decoded?.exp) return false;
    return Date.now() >= decoded.exp * 1000;
  } catch {
    return true;
  }
}

const API = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

// ── Context ───────────────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user,    setUser]    = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isTokenExpired(token)) {
      // Prefer stored user object (has name), fall back to decoded token
      const stored = localStorage.getItem("admin_user");
      if (stored) {
        setUser(JSON.parse(stored) as AuthUser);
      } else {
        const decoded = decodeToken(token);
        if (decoded) setUser(decoded);
      }
    } else {
      // Token missing or expired — clear everything
      localStorage.removeItem("token");
      localStorage.removeItem("admin_user");
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res  = await fetch(`${API}/auth/login`, {
      method:      "POST",
      credentials: "include",
      headers:     { "Content-Type": "application/json" },
      body:        JSON.stringify({ email, password }),
    });
    const data = await res.json() as { token?: string; user?: AuthUser; error?: string };
    if (!res.ok) throw new Error(data.error ?? "Login failed");

    localStorage.setItem("token",      data.token!);
    localStorage.setItem("admin_user", JSON.stringify(data.user!));
    setUser(data.user!);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin_user");
    setUser(null);
    fetch(`${API}/auth/logout`, { method: "POST", credentials: "include" }).catch(() => {});
  }, []);

  const canAccess = useCallback((page: string)   => canAccessPage(user?.role ?? null,  page),   [user]);
  const can       = useCallback((action: string)  => canDoAction(user?.role  ?? null, action), [user]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, canAccess, can }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}