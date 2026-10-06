import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function WorkspaceSelector() {
  const navigate = useNavigate();
  const { memberships, user } = useAuth();

  return (
    <section className="workspace-selector-page">
      <div className="workspace-selector-shell">
        <div className="workspace-selector-header">
          <span className="workspace-eyebrow">YOUR WORKSPACES</span>
          <h1>Choose a workspace</h1>
          <p>
            Select an organization to continue, or create or join another
            workspace.
          </p>
        </div>

        <div className="workspace-selector-list">
          {memberships.map((membership) => (
            <button
              type="button"
              className="workspace-selector-item"
              key={membership.organization_id}
              onClick={() =>
                navigate(`/workspaces/${membership.organization_slug}`)
              }
            >
              <span className="workspace-selector-logo">
                {membership.organization_name.charAt(0).toUpperCase()}
              </span>

              <span className="workspace-selector-info">
                <strong>{membership.organization_name}</strong>
                <small>
                  {membership.role} · {membership.organization_slug}
                </small>
              </span>

              <span className="workspace-selector-arrow">→</span>
            </button>
          ))}
        </div>

        <div className="workspace-selector-actions">
          <button
            type="button"
            className="workspace-primary-btn"
            onClick={() => navigate("/workspace/create")}
          >
            + Create organization
          </button>

          <button
            type="button"
            className="workspace-secondary-btn"
            onClick={() => navigate("/workspace/join")}
          >
            Join organization
          </button>
        </div>

        <div className="workspace-selector-user">
          Signed in as <strong>{user?.email}</strong>
        </div>
      </div>
    </section>
  );
}

export default WorkspaceSelector;