import { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/v1/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to process your request.");
        return;
      }

      setMessage(data.message);
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
            <span className="auth-label">PASSWORD RECOVERY</span>
            <h1>Forgot your password?</h1>
            <p>
              Enter your email and we'll send you a secure password reset link.
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
            <div className="mb-4">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                id="email"
                type="email"
                className="form-control"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn taskflow-primary-btn w-100"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send reset link"}
            </button>
          </form>

          <p className="auth-switch">
            Remember your password? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;