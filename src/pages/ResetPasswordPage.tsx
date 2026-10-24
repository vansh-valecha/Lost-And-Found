
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { supabase } from "../lib/supbase";
import "@/styles/forgot-password.css";

export function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [checking, setChecking] = useState(true);
  const [sessionReady, setSessionReady] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    async function checkSession() {
      const { data, error } = await supabase.auth.getSession();

      if (!active) return;

      if (error || !data.session) {
        setMessage("Please open this page using the reset link sent to your email.");
      } else {
        setSessionReady(true);
      }

      setChecking(false);
    }

    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!active) return;

        if (event === "PASSWORD_RECOVERY" && session) {
          setSessionReady(true);
          setMessage("");
          setChecking(false);
        }
      }
    );

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  async function handleUpdatePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        setMessage(error.message);
      } else {
        setMessage("Password updated successfully! You can now log in.");
        setPassword("");
        setConfirmPassword("");
        setSessionReady(false);
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
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="10" width="14" height="11" rx="2" stroke="currentColor" strokeWidth="1.7" />
              <path d="M8 10V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V10" stroke="currentColor" strokeWidth="1.7" />
            </svg>
          </div>

          <div className="forgot-header">
            <h1>Set a New Password</h1>
            <p>Choose a strong new password to get back into your account.</p>
          </div>

          {checking ? (
            <p>Checking your reset link...</p>
          ) : sessionReady ? (
            <form onSubmit={handleUpdatePassword}>
              <div className="forgot-input-group">
                <label htmlFor="new-password">New password</label>
                <div className="forgot-input-wrapper">
                  <input
                    id="new-password"
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={6}
                    autoComplete="new-password"
                    required
                  />
                </div>
              </div>

              <div className="forgot-input-group">
                <label htmlFor="confirm-password">Confirm new password</label>
                <div className="forgot-input-wrapper">
                  <input
                    id="confirm-password"
                    type="password"
                    placeholder="Re-enter new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    minLength={6}
                    autoComplete="new-password"
                    required
                  />
                </div>
              </div>

              {message && <p role="status">{message}</p>}

              <button
                type="submit"
                className="reset-password-button"
                disabled={loading}
              >
                <span>{loading ? "Updating..." : "Update password"}</span>
                <span className="reset-arrow">→</span>
              </button>
            </form>
          ) : (
            <p role="status">{message}</p>
          )}

          {!sessionReady && !checking && message.includes("successfully") ? null : (
            <Link to="/" className="back-link">
              <span>←</span> Back to login
            </Link>
          )}

          <div className="forgot-security">
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
