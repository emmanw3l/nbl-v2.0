// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth }  from "../utils/AuthContext";
import type { Role } from "../utils/permissions";

interface Props {
  children:     React.ReactNode;
  requiredRoles?: Role[];   // if omitted, any authenticated user can access
  page?:         string;    // used for canAccess() check
}

export default function ProtectedRoute({ children, requiredRoles, page }: Props) {
  const { user, loading } = useAuth();

  // Still restoring session — don't flash redirect
  if (loading) return null;

  // Not logged in at all
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  // Logged in but wrong role for this page
  if (requiredRoles && !requiredRoles.includes(user.role)) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // Page-level access check via permissions map
  if (page && !["SUPER_ADMIN", "ADMIN", "EDITOR"].includes(user.role)) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
}