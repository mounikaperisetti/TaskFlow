import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const organizationTypes = [
  {
    value: "education",
    label: "Education / Training",
    description: "Training institutes, academies, colleges, and learning centers.",
    identifier: "Roll ID"
  },
  {
    value: "corporate",
    label: "Corporate",
    description: "Companies managing employee training and development.",
    identifier: "Employee ID"
  },
  {
    value: "other",
    label: "Other",
    description: "Organizations with a different member identification system.",
    identifier: "Member ID"
  }
];

function CreateWorkspace() {
  const navigate = useNavigate();
  const { token, login } = useAuth();
  const [name, setName] = useState("");
  const [organizationType, setOrganizationType] = useState("education");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const selectedType = organizationTypes.find(
    (type) => type.value === organizationType
  );

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/v1/organizations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            name,
            organization_type: organizationType
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to create the organization.");
        return;
      }

      await login(token);
      navigate(`/workspaces/${data.organization.slug}`, { replace: true });
    } catch {
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="workspace-form-page">
      <div className="container">
        <div className="workspace-form-shell">
          <button
            type="button"
            className="workspace-back-link"
            onClick={() => navigate("/workspace-setup")}
          >
            ← Back to workspace setup
          </button>

          <div className="workspace-form-header">
            <span className="workspace-eyebrow">CREATE WORKSPACE</span>
            <h1>Create your organization</h1>
            <p>
              Set up the foundation for your training workspace. You can add
              trainers, mentors, students, courses, and batches later.
            </p>
          </div>

          {error && (
            <div className="alert alert-danger workspace-alert" role="alert">
              {error}
            </div>
          )}

          <div className="row g-4 align-items-stretch">
            <div className="col-lg-7">
              <form className="workspace-form-card" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="organizationName" className="form-label">
                    Organization name
                  </label>
                  <input
                    id="organizationName"
                    type="text"
                    className="form-control"
                    placeholder="e.g. Codegnan"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    maxLength={255}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Organization type</label>

                  <div className="workspace-type-list">
                    {organizationTypes.map((type) => (
                      <label
                        className={`workspace-type-option ${
                          organizationType === type.value ? "selected" : ""
                        }`}
                        key={type.value}
                      >
                        <input
                          type="radio"
                          name="organizationType"
                          value={type.value}
                          checked={organizationType === type.value}
                          onChange={(event) =>
                            setOrganizationType(event.target.value)
                          }
                        />
                        <span>
                          <strong>{type.label}</strong>
                          <small>{type.description}</small>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="workspace-form-actions">
                  <button
                    type="button"
                    className="btn workspace-secondary-btn"
                    onClick={() => navigate("/workspace-setup")}
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    className="btn workspace-primary-btn"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create workspace"}
                  </button>
                </div>
              </form>
            </div>

            <div className="col-lg-5">
              <div className="workspace-preview-card">
                <span className="workspace-card-label">WORKSPACE PREVIEW</span>

                <div className="workspace-preview-logo">
                  {name ? name.charAt(0).toUpperCase() : "T"}
                </div>

                <h2>{name || "Your organization"}</h2>

                <p>
                  {selectedType?.label}
                </p>

                <div className="workspace-preview-detail">
                  <span>Member identifier</span>
                  <strong>{selectedType?.identifier}</strong>
                </div>

                <div className="workspace-preview-detail">
                  <span>Your role</span>
                  <strong>Owner</strong>
                </div>

                <div className="workspace-preview-note">
                  You will have full administrative control of this workspace.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreateWorkspace;