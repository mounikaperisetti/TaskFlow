import { useOutletContext } from "react-router-dom";

function WorkspaceDashboard() {
  const { organization, membership } = useOutletContext();

  const stats = [
    {
      label: "Active courses",
      value: "—",
      description: "Courses in this workspace"
    },
    {
      label: "Active batches",
      value: "—",
      description: "Training batches running"
    },
    {
      label: "Students",
      value: "—",
      description: "Students enrolled"
    },
    {
      label: "Trainers",
      value: "—",
      description: "Trainers in your workspace"
    }
  ];

  return (
    <div className="workspace-dashboard">
      <section className="workspace-dashboard-header">
        <div>
          <span className="workspace-eyebrow">
            {membership.role.toUpperCase()} WORKSPACE
          </span>

          <h1>Welcome to {organization.name}</h1>

          <p>
            Manage your training operations, people, batches, and
            learning activities from one place.
          </p>
        </div>

        <button
          type="button"
          className="workspace-primary-btn"
        >
          + Create
        </button>
      </section>

      <section className="workspace-stat-grid">
        {stats.map((stat) => (
          <div className="workspace-stat-card" key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
            <small>{stat.description}</small>
          </div>
        ))}
      </section>

      <section className="workspace-dashboard-grid">
        <div className="workspace-panel workspace-panel-large">
          <div className="workspace-panel-header">
            <div>
              <span className="workspace-panel-label">
                GETTING STARTED
              </span>
              <h2>Set up your workspace</h2>
            </div>
          </div>

          <div className="workspace-setup-list">
            <div className="workspace-setup-item">
              <span className="workspace-setup-number">01</span>
              <div>
                <strong>Add your trainers</strong>
                <p>
                  Invite trainers and assign them to your training
                  batches.
                </p>
              </div>
              <span className="workspace-setup-arrow">→</span>
            </div>

            <div className="workspace-setup-item">
              <span className="workspace-setup-number">02</span>
              <div>
                <strong>Create your first course</strong>
                <p>
                  Define the courses that your organization offers.
                </p>
              </div>
              <span className="workspace-setup-arrow">→</span>
            </div>

            <div className="workspace-setup-item">
              <span className="workspace-setup-number">03</span>
              <div>
                <strong>Create a batch</strong>
                <p>
                  Organize students, trainers, schedules, and classes.
                </p>
              </div>
              <span className="workspace-setup-arrow">→</span>
            </div>
          </div>
        </div>

        <div className="workspace-panel">
          <div className="workspace-panel-header">
            <div>
              <span className="workspace-panel-label">
                QUICK ACCESS
              </span>
              <h2>Workspace</h2>
            </div>
          </div>

          <div className="workspace-quick-list">
            <button type="button">
              <span>＋</span>
              <div>
                <strong>Create course</strong>
                <small>Add a training course</small>
              </div>
            </button>

            <button type="button">
              <span>＋</span>
              <div>
                <strong>Create batch</strong>
                <small>Start a new training batch</small>
              </div>
            </button>

            <button type="button">
              <span>＋</span>
              <div>
                <strong>Invite trainer</strong>
                <small>Add a trainer to your team</small>
              </div>
            </button>

            <button type="button">
              <span>＋</span>
              <div>
                <strong>Invite student</strong>
                <small>Add a student to the workspace</small>
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default WorkspaceDashboard;