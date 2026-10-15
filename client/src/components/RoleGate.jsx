// components/RoleGate.jsx
// ────────────────────────────────────────────────────────────
// TASK 3 (done): authorization at the size of a single control.
//
// Unlike PrivateRoute, this does not gate a page — it gates a slice of UI.
// A member who is allowed on the dashboard simply does not get the
// "Delete site" button, so there is nothing to redirect away from: we
// render null and leave the rest of the page untouched.
//
// The role comes from the user object the login endpoint returned. We never
// decode the JWT on the client — that would be both unnecessary and
// untrustworthy, since anyone can craft a token payload. Only the server's
// signature check means anything.
//
// Like PrivateRoute, this is UX only: the server re-checks the role on every
// admin request regardless of what the React tree renders.
// ────────────────────────────────────────────────────────────
import { useAuth } from "../auth/AuthContext.jsx";

export default function RoleGate({ requiredRole, children }) {
  const { user } = useAuth();

  // optional chaining keeps a logged-out visitor (user === null) from
  // crashing the page: undefined !== requiredRole, so the gate just hides.
  if (user?.role !== requiredRole) {
    return null;
  }

  return children;
}
