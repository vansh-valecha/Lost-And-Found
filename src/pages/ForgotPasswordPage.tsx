
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { supabase } from "../lib/supbase";
import "@/styles/forgot-password.css";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleResetPassword(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        setMessage(error.message);
      } else {
        setMessage(
          "If an account exists for this email, a password reset link has been sent."
        );
      }
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="forgot-password-page">
      <div className="forgot-bg">
        <div className="forgot-orb forgot-orb-1" />
        <div className="forgot-orb forgot-orb-2" />
        <div className="forgot-grid" />
      </div>

      <main className="forgot-container">
        <div className="forgot-brand">
          <span className="brand-dot" />
          Lost &amp; Found
        </div>

        <section className="forgot-card">
          <div className="forgot-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="3"
                y="5"
                width="18"
                height="14"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.7"
              />
              <path
                d="M3 7L12 13L21 7"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="forgot-header">
            <h1>Forgot Password?</h1>
            <p>
              Don't worry, it happens. Enter your email address and we'll
              help you get back into your account.
            </p>
          </div>

          <form onSubmit={handleResetPassword}>
            <div className="forgot-input-group">
              <label htmlFor="forgot-email">Email address</label>

              <div className="forgot-input-wrapper">
                <svg
                  className="forgot-input-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="14"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <path
                    d="M3 7L12 13L21 7"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                </svg>

                <input
                  id="forgot-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {message && (
              <p role="status" aria-live="polite">
                {message}
              </p>
            )}

            <button
              type="submit"
              className="reset-password-button"
              disabled={loading}
            >
              <span>
                {loading ? "Sending..." : "Reset password"}
              </span>
              <span className="reset-arrow">→</span>
            </button>
          </form>

          <Link to="/" className="back-link">
            <span>←</span>
            Back to login
          </Link>

          <div className="forgot-security">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="5"
                y="10"
                width="14"
                height="11"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <path
                d="M8 10V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V10"
                stroke="currentColor"
                strokeWidth="1.6"
              />
            </svg>
            <span>Your information is securely protected</span>
          </div>
        </section>
      </main>

      <footer className="forgot-footer">
        © {new Date().getFullYear()} Lost &amp; Found
      </footer>
    </div>
  );
}
