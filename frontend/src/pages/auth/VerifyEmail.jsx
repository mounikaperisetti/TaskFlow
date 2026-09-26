import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function maskEmail(email) {
  const [name, domain] = email.split("@");

  if (!name || !domain) {
    return email;
  }

  if (name.length <= 2) {
    return `${name[0]}*@${domain}`;
  }

  return `${name[0]}${"*".repeat(Math.min(name.length - 1, 6))}@${domain}`;
}

function VerifyEmail() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(300);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    const savedEmail = sessionStorage.getItem("taskflow-verification-email");

    if (!savedEmail) {
      navigate("/register", { replace: true });
      return;
    }

    setEmail(savedEmail);
  }, [navigate]);

  // Display a 5-minute countdown for the current OTP.
  useEffect(() => {
    if (secondsLeft <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }

  function handleOtpChange(event) {
    const value = event.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (otp.length !== 6) {
      setError("Please enter the 6-digit OTP.");
      return;
    }

    if (secondsLeft <= 0) {
      setError("This OTP has expired. Please request a new OTP.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/v1/auth/verify-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            otp
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to verify your email.");
        return;
      }

      setMessage("Email verified successfully. Redirecting to sign in...");

      sessionStorage.removeItem("taskflow-verification-email");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch {
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setError("");
    setMessage("");
    setOtp("");
    setResending(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/v1/auth/resend-otp",
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
        setError(data.message || "Unable to resend the OTP.");
        return;
      }

      setSecondsLeft(300);
      setMessage("A new verification code has been sent to your email.");
    } catch {
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setResending(false);
    }
  }

  return (
    <section className="auth-page">
      <div className="container">
        <div className="auth-card">
          <Link to="/register" className="auth-back-link">
            ← Back to registration
          </Link>

          <div className="auth-header">
            <span className="auth-label">EMAIL VERIFICATION</span>
            <h1>Verify your email</h1>
            <p>
              We sent a 6-digit verification code to{" "}
              <strong>{maskEmail(email)}</strong>.
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
              <label htmlFor="otp" className="form-label">
                Verification code
              </label>
              <input
                id="otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                className="form-control otp-input"
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={handleOtpChange}
                maxLength={6}
                required
              />
            </div>

            <div className="otp-timer">
              {secondsLeft > 0 ? (
                <>
                  Code expires in{" "}
                  <strong>{formatTime(secondsLeft)}</strong>
                </>
              ) : (
                <span className="otp-expired">
                  This verification code has expired.
                </span>
              )}
            </div>

            <button
              type="submit"
              className="btn taskflow-primary-btn w-100"
              disabled={loading || secondsLeft <= 0}
            >
              {loading ? "Verifying..." : "Verify email"}
            </button>
          </form>

          <div className="otp-resend">
            <span>Didn't receive the code?</span>
            <button
              type="button"
              className="btn btn-link"
              onClick={handleResend}
              disabled={resending}
            >
              {resending ? "Sending..." : "Resend OTP"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VerifyEmail;