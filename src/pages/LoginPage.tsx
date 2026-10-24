
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "../lib/supbase";
import "@/styles/login.css";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      await navigate({ to: "/dashboard" });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-bg">
        <div className="bg-orb orb-one"></div>
        <div className="bg-orb orb-two"></div>
        <div className="bg-grid"></div>
      </div>

      <main className="login-container">
        <section className="login-brand">
          <div className="brand-badge">
            <span className="brand-dot"></span>
            Lost &amp; Found
          </div>

          <h1>
            Find what matters.
            <span>Return what’s lost.</span>
          </h1>

          <p>
            A simple place to report, discover, and reconnect people with
            their lost belongings.
          </p>

          <div className="brand-stats">
            <div><strong>24/7</strong><span>Community</span></div>
            <div className="stat-divider"></div>
            <div><strong>Fast</strong><span>Matching</span></div>
            <div className="stat-divider"></div>
            <div><strong>Safe</strong><span>Connections</span></div>
          </div>
        </section>

        <section className="login-card">
          <div className="login-card-header">
            <div className="login-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </div>
            <div>
              <h2>Welcome back</h2>
              <p>Sign in to continue to your account</p>
            </div>
          </div>

          <form className="login-form" onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="email">Email address</label>
              <div className="input-wrapper">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" />
                  <path d="M3 7L12 13L21 7" stroke="currentColor" strokeWidth="1.7" />
                </svg>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <div className="password-label">
                <label htmlFor="password">Password</label>
                <Link to="/forgot-password">Forgot password?</Link>
              </div>
              <div className="input-wrapper">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="10" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.7" />
                  <path d="M8 10V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V10" stroke="currentColor" strokeWidth="1.7" />
                </svg>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="login-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span className="custom-checkbox"></span>
                Remember me
              </label>
            </div>

            {error && (
              <p role="alert" style={{ color: "#dc2626", fontSize: "14px" }}>
                {error}
              </p>
            )}

            <button type="submit" className="login-button" disabled={loading}>
              <span>{loading ? "Signing in..." : "Login"}</span>
              <span className="button-arrow">→</span>
            </button>
          </form>

          <div className="divider">
            <span>New here?</span>
          </div>

          <Link to="/signup" className="signup-link">
            Create your account <span>→</span>
          </Link>

          <p className="security-note">
            <span className="security-dot"></span>
            Your information is securely protected
          </p>
        </section>
      </main>

      <footer className="login-footer">
        © {new Date().getFullYear()} Lost &amp; Found
      </footer>
    </div>
  );
}
