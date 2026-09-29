import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user, memberships } = useAuth();

  return (
    <section className="py-5">
      <div className="container">
        <span className="auth-label">WORKSPACE</span>
        <h1 className="mt-2">Welcome back</h1>
        <p className="text-muted">
          Signed in as {user.email}
        </p>
        <p className="mb-0">
          Organizations: {memberships.length}
        </p>
      </div>
    </section>
  );
}

export default Dashboard;