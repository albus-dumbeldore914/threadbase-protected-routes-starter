// components/PrivateRoute.jsx
// ────────────────────────────────────────────────────────────
// TASK 1 (done): an authentication gate for whole routes.
//
// It reads the current user from AuthContext — the single source of truth
// for "who is logged in". No user means the page is off-limits, so we render
// React Router's declarative redirect instead of the page.
//
// Two props matter on that redirect:
//   replace — overwrites the current history entry instead of pushing a new
//             one, so Back never returns the user to a page they were just
//             bounced off.
//   state   — carries the attempted location so LoginPage can send them back
//             to where they were actually headed.
//
// NOTE: this is UX, not security. Deleting this component in DevTools renders
// the page shell, but every API call still hits the server's verifyToken and
// comes back 401. The server is the real boundary.
// ────────────────────────────────────────────────────────────
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

export default function PrivateRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  // not logged in? send them to login instead of rendering the page
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // logged in — render whatever was wrapped
  return children;
}
