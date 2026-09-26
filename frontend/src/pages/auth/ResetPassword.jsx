import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
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
    setMessage("");

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/v1/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            token,
            password: formData.password,
            confirm_password: formData.confirmPassword
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to reset your password.");
        return;
      }

      setMessage("Password reset successfully. Redirecting to sign in...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
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
          <Link to="/login" className="auth-back-link">
            ← Back to sign in
          </Link>

          <div className="auth-header">
            <span className="auth-label">PASSWORD RESET</span>
            <h1>Create a new password</h1>
            <p>
              Choose a new password for your TaskFlow account.
            </p>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {message && (
            <div className="alert alert-success" role="alert">
              {message}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                New password
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
                Confirm new password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className="form-control"
                placeholder="Re-enter your new password"
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
              {loading ? "Updating password..." : "Update password"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;
