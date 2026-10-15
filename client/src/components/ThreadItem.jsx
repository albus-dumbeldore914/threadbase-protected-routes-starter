// components/ThreadItem.jsx
// ────────────────────────────────────────────────────────────
// TASK 4 (done): ownership + role, combined into one "can edit" rule.
//
// "Can this user edit this thread?" is really two questions:
//   ownership — did they write it?  user?.userId === thread.authorId
//   role      — may they moderate?   user?.role === "admin"
// Neither substitutes for the other: you may edit your own thread as a plain
// member, and an admin may edit a thread they never wrote. The real rule is
// ownership OR role.
//
// Note the strict === — it compares numbers on both sides. A loose == across a
// string/number mismatch ("1" vs 1) would quietly show the controls to nobody,
// or to everybody.
// ────────────────────────────────────────────────────────────
import { useAuth } from "../auth/AuthContext.jsx";

export default function ThreadItem({ thread }) {
  const { user } = useAuth();

  const isAuthor = user?.userId === thread.authorId; // ownership
  const isAdmin = user?.role === "admin"; // role
  const canEdit = isAuthor || isAdmin;

  return (
    <article className="thread">
      <h3>{thread.title}</h3>
      <p>{thread.body}</p>
      <p className="byline">by {thread.authorName}</p>
      {canEdit && (
        <div className="controls">
          <button>Edit</button>
          <button className="danger">Delete</button>
        </div>
      )}
    </article>
  );
}
