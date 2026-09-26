import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            confirm_password: formData.confirmPassword
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed.");
        return;
      }

      // Keep only the email so the verification page knows which account is being verified.
      sessionStorage.setItem(
        "taskflow-verification-email",
        formData.email.trim().toLowerCase()
      );

      navigate("/verify-email");
    } catch {
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-page">
      <div className="container">
        <div className="auth-card">
          <Link to="/" className="auth-back-link">
            ← Back to TaskFlow
          </Link>

          <div className="auth-header">
            <span className="auth-label">CREATE ACCOUNT</span>
            <h1>Get started with TaskFlow</h1>
            <p>
              Create your account and start managing training in one focused
              workspace.
            </p>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-control"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="form-control"
                placeholder="At least 8 characters"
                value={formData.password}
                onChange={handleChange}
                minLength={8}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className="form-control"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                minLength={8}
                required
              />
            </div>

            <button
              type="submit"
              className="btn taskflow-primary-btn w-100"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Register;