import "./App.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
import PageLoader from "./components/PageLoader";
import { AnimatePresence } from "framer-motion";
import PageNotFound from "./components/pagenotfound/pageNotFound";
import { AuthProvider } from "./utils/AuthContext";
import ProtectedRoute   from "./components/Protected";



const Home = lazy(() => import("./Home"));
const PromptsPage = lazy(() => import("./prompts/mainPromptPage"));
const Profiles = lazy(() => import("./profiles/profile"));
const Awards = lazy(() => import("./awards/awards"));
const Awardspage = lazy(() => import("./pages/AwardsPage"));

// Admin

const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminPrompts = lazy(() => import("./pages/AdminPrompts"));
const AdminAuthors = lazy(() => import("./pages/AdminAuthors"));
const AdminAwards = lazy(() => import("./pages/AdminAwards"));
const AdminUsers = lazy(() => import("./pages/AdminUsers"));
const MonthPromptPage = lazy(() => import("./prompts/MonthPromptPages"));
const AuthorProfile = lazy(() => import("./profiles/AuthorProfiles"));
export default function App() {
  const location = useLocation();
  return (
    <AuthProvider>
    <div className="app">
      <AnimatePresence mode="wait">
        <Suspense
          fallback={
            <AnimatePresence mode="wait">
              <PageLoader />
            </AnimatePresence>
          }
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profiles />} />
<Route path="/profile/:slug" element={<AuthorProfile />} />
            <Route path="/mainPromptPage" element={<PromptsPage />} />
            <Route path="/awards" element={<Awards />} />
            <Route path="/award" element={<Awardspage />} />


            

<Route path="/mainPromptPage/:year/:month" element={<MonthPromptPage />} />


            {/* ── Admin ── */}
              <Route path="/admin"         element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="/admin/login"   element={<AdminLogin />} />
 
              <Route path="/admin/dashboard" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
 
              <Route path="/admin/prompts" element={
                <ProtectedRoute requiredRoles={["SUPER_ADMIN", "ADMIN", "EDITOR"]}>
                  <AdminPrompts />
                </ProtectedRoute>
              } />
 
              <Route path="/admin/authors" element={
                <ProtectedRoute requiredRoles={["SUPER_ADMIN", "ADMIN"]}>
                  <AdminAuthors />
                </ProtectedRoute>
              } />
 
              <Route path="/admin/awards" element={
                <ProtectedRoute requiredRoles={["SUPER_ADMIN", "ADMIN"]}>
                  <AdminAwards />
                </ProtectedRoute>
              } />
 
              <Route path="/admin/users" element={
                <ProtectedRoute requiredRoles={["SUPER_ADMIN"]}>
                  <AdminUsers />
                </ProtectedRoute>
              } />
 
              <Route path="*" element={<PageNotFound />} />
            </Routes>
        </Suspense>
      </AnimatePresence>
    </div>
    </AuthProvider>
  );
}
