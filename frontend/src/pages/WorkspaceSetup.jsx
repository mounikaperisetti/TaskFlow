import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function WorkspaceSetup() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <section className="workspace-setup-page">
      <div className="container">
        <div className="workspace-setup-shell">
          <div className="workspace-setup-header">
            <span className="workspace-eyebrow">WORKSPACE SETUP</span>
            <h1>Welcome to TaskFlow</h1>
            <p>
              Choose how you want to get started with your training workspace.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-6">
              <div className="workspace-card h-100">
                <div className="workspace-card-icon">+</div>
                <div>
                  <span className="workspace-card-label">NEW WORKSPACE</span>
                  <h2>Create an organization</h2>
                  <p>
                    Start a new workspace for your organization, manage your
                    training operations, and become its Owner.
                  </p>
                </div>
                <button
                  type="button"
                  className="btn workspace-primary-btn mt-auto"
                  onClick={() => navigate("/workspace/create")}
                >
                  Create workspace
                  <span>→</span>
                </button>
              </div>
            </div>

            <div className="col-md-6">
              <div className="workspace-card h-100">
                <div className="workspace-card-icon workspace-card-icon-soft">
                  ↗
                </div>
                <div>
                  <span className="workspace-card-label">EXISTING WORKSPACE</span>
                  <h2>Join an organization</h2>
                  <p>
                    Already part of a team? Join an existing organization using
                    an invitation or access link.
                  </p>
                </div>
                <button
                  type="button"
                  className="btn workspace-secondary-btn mt-auto"
                  onClick={() => navigate("/workspace/join")}
                >
                  Join workspace
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>

          <div className="workspace-setup-footer">
            <span>Signed in as</span>
            <strong>{user?.email}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WorkspaceSetup;