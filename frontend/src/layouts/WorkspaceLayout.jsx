import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function WorkspaceLayout({ theme, toggleTheme }) {
  const { organizationSlug } = useParams();
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  const [workspace, setWorkspace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ============================================================
  // PROFILE MENU STATE
  // Controls the personal account dropdown in the topbar.
  // ============================================================
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  // ============================================================
  // LOAD WORKSPACE
  // Fetches the organization only when the authenticated user
  // has access to the requested workspace.
  // ============================================================
  useEffect(() => {
    async function loadWorkspace() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/v1/organizations/${organizationSlug}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Unable to load workspace.");
          return;
        }

        setWorkspace(data);
      } catch {
        setError("Unable to connect to the server.");
      } finally {
        setLoading(false);
      }
    }

    if (token && organizationSlug) {
      loadWorkspace();
    }
  }, [token, organizationSlug]);

  // ============================================================
  // LOADING STATE
  // Keeps the workspace shell from rendering before the
  // organization context has been loaded.
  // ============================================================
  if (loading) {
    return (
      <div className="workspace-loading">
        <div className="workspace-loading-card">
          <div className="workspace-loading-mark">T</div>
          <p>Loading workspace...</p>
        </div>
      </div>
    );
  }

  // ============================================================
  // ERROR STATE
  // Prevents an inaccessible or invalid workspace from
  // displaying organization data.
  // ============================================================
  if (error || !workspace) {
    return (
      <div className="workspace-error">
        <div className="workspace-error-card">
          <span className="workspace-eyebrow">WORKSPACE</span>

          <h1>Workspace unavailable</h1>

          <p>
            {error || "We could not load this workspace."}
          </p>

          <button
            type="button"
            className="workspace-primary-btn"
            onClick={() => navigate("/workspace-setup")}
          >
            Back to workspace setup
          </button>
        </div>
      </div>
    );
  }

  const organization = workspace.organization;
  const membership = workspace.membership;

  // ============================================================
  // WORKSPACE NAVIGATION
  // These are organization-level modules. Personal account
  // actions are intentionally kept out of this navigation.
  // ============================================================
  const navigation = [
    {
      label: "Overview",
      path: `/workspaces/${organization.slug}`,
      icon: "grid"
    },
    {
      label: "Courses",
      path: `/workspaces/${organization.slug}/courses`,
      icon: "book"
    },
    {
      label: "Batches",
      path: `/workspaces/${organization.slug}/batches`,
      icon: "layers"
    },
    {
      label: "Classes",
      path: `/workspaces/${organization.slug}/classes`,
      icon: "calendar"
    },
    {
      label: "Trainers",
      path: `/workspaces/${organization.slug}/trainers`,
      icon: "users"
    },
    {
      label: "Mentors",
      path: `/workspaces/${organization.slug}/mentors`,
      icon: "mentor"
    },
    {
      label: "Students",
      path: `/workspaces/${organization.slug}/students`,
      icon: "student"
    },
    {
      label: "Tasks",
      path: `/workspaces/${organization.slug}/tasks`,
      icon: "check"
    },
    {
      label: "Assessments",
      path: `/workspaces/${organization.slug}/assessments`,
      icon: "clipboard"
    },
    {
      label: "Attendance",
      path: `/workspaces/${organization.slug}/attendance`,
      icon: "clock"
    }
  ];

  // ============================================================
  // ICONS
  // Uses simple SVG icons instead of text characters such as
  // arrows and symbols, giving the workspace a consistent UI.
  // ============================================================
  function NavigationIcon({ name }) {
    const commonProps = {
      width: 18,
      height: 18,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.8,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": true
    };

    const paths = {
      grid: (
        <>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </>
      ),
      book: (
        <>
          <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22V5.5Z" />
          <path d="M4 5.5V19a2 2 0 0 0 2 2h14" />
        </>
      ),
      layers: (
        <>
          <path d="m12 3 8.5 4.5L12 12 3.5 7.5 12 3Z" />
          <path d="m3.5 12 8.5 4.5 8.5-4.5" />
          <path d="m3.5 16.5 8.5 4.5 8.5-4.5" />
        </>
      ),
      calendar: (
        <>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M16 3v4M8 3v4M3 10h18" />
        </>
      ),
      users: (
        <>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </>
      ),
      mentor: (
        <>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        </>
      ),
      student: (
        <>
          <circle cx="12" cy="8" r="4" />
          <path d="M5 21a7 7 0 0 1 14 0" />
        </>
      ),
      check: (
        <>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="m8 12 2.5 2.5L16 9" />
        </>
      ),
      clipboard: (
        <>
          <rect x="5" y="4" width="14" height="17" rx="2" />
          <path d="M9 4V2h6v2M9 10h6M9 14h6M9 18h3" />
        </>
      ),
      clock: (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </>
      ),
      settings: (
        <>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-1.41 1.41-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V20h-2v-.09a1.7 1.7 0 0 0-1.03-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06-1.41-1.41.06-.06A1.7 1.7 0 0 0 9.4 15a1.7 1.7 0 0 0-1.56-1.03H7v-2h.84A1.7 1.7 0 0 0 9.4 11a1.7 1.7 0 0 0-.34-1.88L9 9.06l1.41-1.41.06.06A1.7 1.7 0 0 0 12.35 8a1.7 1.7 0 0 0 1.03-1.56V6h2v.44A1.7 1.7 0 0 0 16.4 8a1.7 1.7 0 0 0 1.88-.34l.06-.06 1.41 1.41-.06.06A1.7 1.7 0 0 0 19.4 11a1.7 1.7 0 0 0 1.56 1.03H22v2h-.84A1.7 1.7 0 0 0 19.4 15Z" />
        </>
      )
    };

    return <svg {...commonProps}>{paths[name]}</svg>;
  }

  return (
    <div className="workspace-app">
      {/* ============================================================
          SIDEBAR
          Contains organization-level navigation and workspace
          settings. Personal account controls stay in the profile
          menu.
          ============================================================ */}
      <aside className="workspace-sidebar">
        <div className="workspace-sidebar-header">
          <button
            type="button"
            className="workspace-brand"
            onClick={() => navigate(`/workspaces/${organization.slug}`)}
          >
            <span className="workspace-brand-mark">T</span>
            <span>TaskFlow</span>
          </button>
        </div>

        {/* ========================================================
            ORGANIZATION CONTEXT
            Shows the organization currently being managed.
            ======================================================== */}
        <div className="workspace-sidebar-section">
          <span className="workspace-sidebar-label">
            WORKSPACE
          </span>

          <button
            type="button"
            className="workspace-switcher"
          >
            <span className="workspace-switcher-mark">
              {organization.name.charAt(0).toUpperCase()}
            </span>

            <span className="workspace-switcher-info">
              <strong>{organization.name}</strong>
              <small>{membership.role}</small>
            </span>

            <span className="workspace-switcher-chevron" />
          </button>
        </div>

        {/* ========================================================
            MAIN NAVIGATION
            Organization management modules.
            ======================================================== */}
        <nav className="workspace-navigation">
          <span className="workspace-sidebar-label">
            MANAGEMENT
          </span>

          {navigation.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.label === "Overview"}
              className={({ isActive }) =>
                `workspace-nav-link ${isActive ? "active" : ""}`
              }
            >
              <span className="workspace-nav-icon">
                <NavigationIcon name={item.icon} />
              </span>

              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* ========================================================
            SIDEBAR FOOTER
            Organization settings belong here, not inside the
            personal account dropdown.
            ======================================================== */}
        <div className="workspace-sidebar-bottom">
          <NavLink
            to={`/workspaces/${organization.slug}/settings`}
            className={({ isActive }) =>
              `workspace-nav-link ${isActive ? "active" : ""}`
            }
          >
            <span className="workspace-nav-icon">
              <NavigationIcon name="settings" />
            </span>

            <span>Settings</span>
          </NavLink>

          <div className="workspace-user-mini">
            <div className="workspace-user-avatar">
              {user?.email?.charAt(0).toUpperCase()}
            </div>

            <div className="workspace-user-info">
              <strong>{user?.email?.split("@")[0]}</strong>
              <small>{membership.role}</small>
            </div>
          </div>
        </div>
      </aside>

      {/* ============================================================
          WORKSPACE MAIN AREA
          Contains the topbar and organization-specific page content.
          ============================================================ */}
      <div className="workspace-main">
        <header className="workspace-topbar">
          {/* ========================================================
              TOPBAR LEFT
              ======================================================== */}
          <div className="workspace-topbar-left">
            <button
              type="button"
              className="workspace-mobile-menu"
              aria-label="Open navigation"
            >
              <span />
              <span />
              <span />
            </button>

            <div>
              <span className="workspace-topbar-label">
                WORKSPACE
              </span>

              <strong>{organization.name}</strong>
            </div>
          </div>

          {/* ========================================================
              TOPBAR ACTIONS
              Theme, notifications, and personal account.
              ======================================================== */}
          <div className="workspace-topbar-actions">
            <button
              type="button"
              className="workspace-theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              <span
                className={
                  theme === "light"
                    ? "workspace-theme-icon moon"
                    : "workspace-theme-icon sun"
                }
              />
            </button>

            <button
              type="button"
              className="workspace-notification"
              aria-label="Notifications"
            >
              <span className="workspace-notification-icon" />
              <span className="workspace-notification-dot" />
            </button>

            {/* ======================================================
                PERSONAL ACCOUNT DROPDOWN
                Only personal account actions belong here.
                Organization settings remain in the sidebar.
                ====================================================== */}
            <div className="workspace-profile-menu">
              <button
                type="button"
                className="workspace-profile-button"
                onClick={() =>
                  setProfileMenuOpen((current) => !current)
                }
                aria-expanded={profileMenuOpen}
              >
                <span className="workspace-profile-avatar">
                  {user?.email?.charAt(0).toUpperCase()}
                </span>

                <span className="workspace-profile-info">
                  <strong>
                    {user?.email?.split("@")[0]}
                  </strong>

                  <small>{membership.role}</small>
                </span>

                <span
                  className={`workspace-profile-chevron ${
                    profileMenuOpen ? "open" : ""
                  }`}
                />
              </button>

              {profileMenuOpen && (
                <div className="workspace-profile-dropdown">
                  {/* ==================================================
                      ACCOUNT HEADER
                      ================================================== */}
                  <div className="workspace-profile-dropdown-header">
                    <div className="workspace-profile-dropdown-avatar">
                      {user?.email?.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <strong>
                        {user?.email?.split("@")[0]}
                      </strong>

                      <small>{user?.email}</small>
                    </div>
                  </div>

                  <div className="workspace-profile-dropdown-divider" />

                  {/* ==================================================
                      PERSONAL ACCOUNT ACTIONS
                      ================================================== */}
                  <button
                    type="button"
                    className="workspace-profile-dropdown-item"
                    onClick={() => {
                      setProfileMenuOpen(false);
                      navigate("/profile");
                    }}
                  >
                    Profile
                  </button>

                  <button
                    type="button"
                    className="workspace-profile-dropdown-item"
                    onClick={() => {
                      setProfileMenuOpen(false);
                      navigate("/account");
                    }}
                  >
                    Account
                  </button>

                  <div className="workspace-profile-dropdown-divider" />

                  {/* ==================================================
                      SIGN OUT
                      Clears the authenticated session and returns
                      the user to the login page.
                      ================================================== */}
                  <button
                    type="button"
                    className="workspace-signout-button"
                    onClick={() => {
                      logout();
                      navigate("/login");
                    }}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ============================================================
            PAGE CONTENT
            Individual workspace pages render inside this area.
            ============================================================ */}
        <main className="workspace-content">
          <Outlet context={{ workspace, organization, membership }} />
        </main>
      </div>
    </div>
  );
}

export default WorkspaceLayout;