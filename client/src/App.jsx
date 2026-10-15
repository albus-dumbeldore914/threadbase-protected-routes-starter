// App.jsx — the router config.
// ────────────────────────────────────────────────────────────
// TASK 2 (done): the three private routes are each wrapped in <PrivateRoute>.
// "/" , "/login" and "/threads" stay public — gating the login page would make
// it unreachable for exactly the people who need it.
//
// Wrapper-per-element rather than one guarded parent route with an <Outlet />:
// this way each protected route is visibly guarded at its own definition, which
// is the easiest thing to audit.
// ────────────────────────────────────────────────────────────
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ThreadsPage from "./pages/ThreadsPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import NewThreadPage from "./pages/NewThreadPage.jsx";

export default function App() {
  return (
    <div className="wrap">
      <h1>Threadbase</h1>
      <NavBar />
      <Routes>
        {/* public */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/threads" element={<ThreadsPage />} />

        {/* protected — each element wrapped in the gate */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/threads/new"
          element={
            <PrivateRoute>
              <NewThreadPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}
