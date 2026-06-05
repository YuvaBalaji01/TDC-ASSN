import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await login({ username, password });
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid username or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.root}>
      {/* Left Panel */}
      <div style={styles.left}>
        <div style={styles.leftInner}>
          {/* Decorative circles */}
          <div style={styles.circle1} />
          <div style={styles.circle2} />
          <div style={styles.circle3} />

          <div style={styles.brandBlock}>
            <div style={styles.logoMark}>
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <path
                  d="M18 31C18 31 5 22.5 5 13.5C5 9.36 8.36 6 12.5 6C14.9 6 17.05 7.12 18 8.9C18.95 7.12 21.1 6 23.5 6C27.64 6 31 9.36 31 13.5C31 22.5 18 31 18 31Z"
                  fill="white"
                  fillOpacity="0.9"
                />
              </svg>
            </div>
            <h1 style={styles.brand}>The Date Crew</h1>
            <p style={styles.tagline}>Where love gets its perfect match</p>
          </div>

          <div style={styles.quoteCard}>
            <p style={styles.quoteText}>
              "Every great love story starts with the right introduction."
            </p>
            <div style={styles.quoteDivider} />
            <p style={styles.quoteAuthor}>Matchmaker's Creed</p>
          </div>

          <div style={styles.statsRow}>
            <div style={styles.stat}>
              <span style={styles.statNum}>2.4k+</span>
              <span style={styles.statLabel}>Matches Made</span>
            </div>
            <div style={styles.statDivider} />
            <div style={styles.stat}>
              <span style={styles.statNum}>94%</span>
              <span style={styles.statLabel}>Success Rate</span>
            </div>
            <div style={styles.statDivider} />
            <div style={styles.stat}>
              <span style={styles.statNum}>180+</span>
              <span style={styles.statLabel}>Matchmakers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div style={styles.right}>
        <div style={styles.formCard}>
          <div style={styles.formHeader}>
            <div style={styles.formIconWrap}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path
                  d="M11 19C11 19 2 13.5 2 7.5C2 4.97 4.24 3 7 3C8.74 3 10.27 3.87 11 5.12C11.73 3.87 13.26 3 15 3C17.76 3 20 4.97 20 7.5C20 13.5 11 19 11 19Z"
                  fill="#C2185B"
                />
              </svg>
            </div>
            <div>
              <h2 style={styles.formTitle}>Matchmaker Portal</h2>
              <p style={styles.formSubtitle}>Sign in to your dashboard</p>
            </div>
          </div>

          <form onSubmit={handleLogin} style={styles.form}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Username</label>
              <div style={styles.inputWrap}>
                <span style={styles.inputIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C2185B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={styles.input}
                  required
                  onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                  onBlur={(e) => Object.assign(e.target.style, styles.input)}
                />
              </div>
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label}>Password</label>
              <div style={styles.inputWrap}>
                <span style={styles.inputIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C2185B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ ...styles.input, paddingRight: "48px" }}
                  required
                  onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                  onBlur={(e) => Object.assign(e.target.style, { ...styles.input, paddingRight: "48px" })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.eyeBtn}
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9E9E9E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div style={styles.errorBox}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C62828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={loading ? { ...styles.btn, ...styles.btnDisabled } : styles.btn}
            >
              {loading ? (
                <span style={styles.btnInner}>
                  <span style={styles.spinner} />
                  Signing in…
                </span>
              ) : (
                <span style={styles.btnInner}>
                  Sign In to Dashboard
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              )}
            </button>
          </form>

          <div style={styles.demoBox}>
            <div style={styles.demoLabel}>
              <div style={styles.demoDot} />
              Demo Credentials
            </div>
            <div style={styles.demoRow}>
              <span style={styles.demoKey}>Username</span>
              <code style={styles.demoVal}>admin</code>
            </div>
            <div style={styles.demoRow}>
              <span style={styles.demoKey}>Password</span>
              <code style={styles.demoVal}>admin123</code>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@400;500&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}

const styles = {
  root: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "'DM Sans', sans-serif",
    background: "#FFF8F8",
  },

  /* ── Left Panel ── */
  left: {
    width: "44%",
    background: "linear-gradient(145deg, #B71C6C 0%, #880E4F 45%, #560027 100%)",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 40px",
  },
  leftInner: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: "380px",
    animation: "fadeUp 0.7s ease both",
  },
  circle1: {
    position: "absolute", top: "-80px", right: "-80px",
    width: "300px", height: "300px", borderRadius: "50%",
    background: "rgba(255,255,255,0.06)", zIndex: 1,
  },
  circle2: {
    position: "absolute", bottom: "60px", left: "-60px",
    width: "220px", height: "220px", borderRadius: "50%",
    background: "rgba(255,255,255,0.05)", zIndex: 1,
  },
  circle3: {
    position: "absolute", top: "40%", right: "-30px",
    width: "120px", height: "120px", borderRadius: "50%",
    background: "rgba(255,255,255,0.04)", zIndex: 1,
  },
  brandBlock: {
    marginBottom: "48px",
  },
  logoMark: {
    width: "60px", height: "60px", borderRadius: "18px",
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(8px)",
    display: "flex", alignItems: "center", justifyContent: "center",
    marginBottom: "20px",
    border: "1px solid rgba(255,255,255,0.2)",
  },
  brand: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "40px", fontWeight: "600",
    color: "white", margin: "0 0 8px",
    letterSpacing: "-0.5px", lineHeight: 1.1,
  },
  tagline: {
    fontSize: "14px", color: "rgba(255,255,255,0.65)",
    margin: 0, letterSpacing: "0.3px",
  },
  quoteCard: {
    background: "rgba(255,255,255,0.1)",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.15)",
    padding: "24px",
    marginBottom: "40px",
  },
  quoteText: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "20px", fontWeight: "500",
    color: "rgba(255,255,255,0.95)",
    margin: "0 0 16px", lineHeight: 1.5,
    fontStyle: "italic",
  },
  quoteDivider: {
    width: "32px", height: "1px",
    background: "rgba(255,255,255,0.35)",
    marginBottom: "12px",
  },
  quoteAuthor: {
    fontSize: "12px", color: "rgba(255,255,255,0.5)",
    margin: 0, letterSpacing: "1.5px", textTransform: "uppercase",
  },
  statsRow: {
    display: "flex", alignItems: "center", gap: "0",
  },
  stat: {
    display: "flex", flexDirection: "column", gap: "4px",
    flex: 1, textAlign: "center",
  },
  statNum: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "28px", fontWeight: "600",
    color: "white", lineHeight: 1,
  },
  statLabel: {
    fontSize: "11px", color: "rgba(255,255,255,0.5)",
    letterSpacing: "0.5px",
  },
  statDivider: {
    width: "1px", height: "36px",
    background: "rgba(255,255,255,0.2)",
    margin: "0 8px",
  },

  /* ── Right Panel ── */
  right: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 32px",
    background: "#FFF8F9",
  },
  formCard: {
    width: "100%",
    maxWidth: "420px",
    animation: "fadeUp 0.7s 0.1s ease both",
  },
  formHeader: {
    display: "flex", alignItems: "center", gap: "14px",
    marginBottom: "36px",
  },
  formIconWrap: {
    width: "48px", height: "48px",
    background: "#FCE4EC",
    borderRadius: "14px",
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0,
  },
  formTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "26px", fontWeight: "600",
    color: "#1A1A1A", margin: "0 0 2px",
    letterSpacing: "-0.3px",
  },
  formSubtitle: {
    fontSize: "13px", color: "#9E9E9E",
    margin: 0,
  },
  form: {
    display: "flex", flexDirection: "column", gap: "20px",
  },
  fieldGroup: {
    display: "flex", flexDirection: "column", gap: "8px",
  },
  label: {
    fontSize: "13px", fontWeight: "500",
    color: "#424242", letterSpacing: "0.1px",
  },
  inputWrap: {
    position: "relative",
  },
  inputIcon: {
    position: "absolute", left: "14px",
    top: "50%", transform: "translateY(-50%)",
    display: "flex", alignItems: "center",
    pointerEvents: "none",
  },
  input: {
    width: "100%",
    padding: "13px 14px 13px 42px",
    fontSize: "14px",
    fontFamily: "'DM Sans', sans-serif",
    border: "1.5px solid #EDD5DF",
    borderRadius: "12px",
    outline: "none",
    background: "white",
    color: "#1A1A1A",
    transition: "border-color 0.2s",
  },
  inputFocus: {
    width: "100%",
    padding: "13px 14px 13px 42px",
    fontSize: "14px",
    fontFamily: "'DM Sans', sans-serif",
    border: "1.5px solid #C2185B",
    borderRadius: "12px",
    outline: "none",
    background: "white",
    color: "#1A1A1A",
    transition: "border-color 0.2s",
  },
  eyeBtn: {
    position: "absolute", right: "14px",
    top: "50%", transform: "translateY(-50%)",
    background: "none", border: "none",
    cursor: "pointer", padding: "4px",
    display: "flex", alignItems: "center",
  },
  errorBox: {
    display: "flex", alignItems: "center", gap: "8px",
    background: "#FFEBEE",
    border: "1px solid #FFCDD2",
    borderRadius: "10px",
    padding: "12px 14px",
    fontSize: "13px",
    color: "#C62828",
  },
  btn: {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg, #C2185B 0%, #880E4F 100%)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "500",
    fontFamily: "'DM Sans', sans-serif",
    cursor: "pointer",
    marginTop: "4px",
    transition: "opacity 0.2s, transform 0.15s",
  },
  btnDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },
  btnInner: {
    display: "flex", alignItems: "center",
    justifyContent: "center", gap: "8px",
  },
  spinner: {
    display: "inline-block",
    width: "16px", height: "16px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTopColor: "white",
    borderRadius: "50%",
    animation: "spin 0.7s linear infinite",
  },
  demoBox: {
    marginTop: "28px",
    background: "white",
    border: "1px dashed #F8BBD0",
    borderRadius: "12px",
    padding: "16px 18px",
  },
  demoLabel: {
    display: "flex", alignItems: "center", gap: "6px",
    fontSize: "11px", fontWeight: "500",
    color: "#C2185B", letterSpacing: "1px",
    textTransform: "uppercase", marginBottom: "10px",
  },
  demoDot: {
    width: "6px", height: "6px",
    borderRadius: "50%", background: "#C2185B",
  },
  demoRow: {
    display: "flex", justifyContent: "space-between",
    alignItems: "center", padding: "5px 0",
  },
  demoKey: {
    fontSize: "13px", color: "#9E9E9E",
  },
  demoVal: {
    fontSize: "13px", fontFamily: "monospace",
    background: "#FFF0F5",
    color: "#880E4F",
    padding: "2px 10px",
    borderRadius: "6px",
  },
};

export default Login;
