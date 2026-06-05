import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MatchModal from "../components/MatchModal";
import { getCustomer, getMatches, generateEmail } from "../services/api";

function CustomerDetails() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [matches, setMatches] = useState([]);
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const customerData = await getCustomer(id);
        const matchData = await getMatches(id);
        setCustomer(customerData);
        setMatches(matchData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [id]);

  if (!customer) {
    return (
      <div style={styles.loadingScreen}>
        <div style={styles.loadingCard}>
          <div style={styles.loadingHeart}>
            <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
              <path d="M18 31C18 31 5 22.5 5 13.5C5 9.36 8.36 6 12.5 6C14.9 6 17.05 7.12 18 8.9C18.95 7.12 21.1 6 23.5 6C27.64 6 31 9.36 31 13.5C31 22.5 18 31 18 31Z" fill="#C2185B" />
            </svg>
          </div>
          <p style={styles.loadingText}>Loading profile…</p>
        </div>
        <style>{`@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.15)}}`}</style>
      </div>
    );
  }

  const handleSendMatch = async (match) => {
    try {
      const response = await generateEmail(
        customer._id, match.customer._id, match.score, match.explanation
      );
      setEmail(response.email);
      setShowModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  const initials = `${customer.firstName?.[0] || ""}${customer.lastName?.[0] || ""}`;

  const scoreStyle = (score) => {
    if (score >= 80) return { border: "#2E7D32", badge: { bg: "#E8F5E9", color: "#2E7D32" }, btn: "linear-gradient(135deg,#388E3C,#2E7D32)" };
    if (score >= 60) return { border: "#F57F17", badge: { bg: "#FFF8E1", color: "#F57F17" }, btn: "linear-gradient(135deg,#F9A825,#F57F17)" };
    return { border: "#C62828", badge: { bg: "#FFEBEE", color: "#C62828" }, btn: "linear-gradient(135deg,#E53935,#C62828)" };
  };

  return (
    <div style={styles.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@400;500&display=swap');
        @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.12)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        *{box-sizing:border-box;}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:#EDD5DF;border-radius:4px}
      `}</style>

      {/* ── Nav ── */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.brand}>
            <div style={styles.brandIcon}>
              <svg width="20" height="20" viewBox="0 0 36 36" fill="none">
                <path d="M18 31C18 31 5 22.5 5 13.5C5 9.36 8.36 6 12.5 6C14.9 6 17.05 7.12 18 8.9C18.95 7.12 21.1 6 23.5 6C27.64 6 31 9.36 31 13.5C31 22.5 18 31 18 31Z" fill="white" />
              </svg>
            </div>
            <div>
              <span style={styles.brandName}>The Date Crew</span>
              <span style={styles.brandSub}>Customer Profile</span>
            </div>
          </div>
          <div style={styles.avatar}>MM</div>
        </div>
      </header>

      {/* ── Profile Hero ── */}
      <div style={styles.heroBanner}>
        <div style={styles.heroCircle1} />
        <div style={styles.heroCircle2} />
        <div style={styles.heroInner}>
          <div style={styles.profileAvatar}>{initials}</div>
          <h1 style={styles.heroName}>{customer.firstName} {customer.lastName}</h1>
          <div style={styles.heroPills}>
            {customer.city && <span style={styles.pill}>📍 {customer.city}, {customer.country}</span>}
            {customer.age && <span style={styles.pill}>🎂 {customer.age} yrs</span>}
            {customer.gender && <span style={styles.pill}>{customer.gender === "Male" ? "♂" : "♀"} {customer.gender}</span>}
          </div>
          <p style={styles.heroId}>ID: {id}</p>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={styles.body}>
        <div style={styles.grid}>

          {/* LEFT */}
          <div style={styles.left}>

            {/* Personal Info */}
            <Section title="Personal Information" icon="👤">
              <div style={styles.infoGrid}>
                <Info label="Full Name"      value={`${customer.firstName} ${customer.lastName}`} />
                <Info label="Gender"         value={customer.gender} />
                <Info label="Age"            value={customer.age} />
                <Info label="Height"         value={customer.height} />
                <Info label="City"           value={customer.city} />
                <Info label="Country"        value={customer.country} />
                <Info label="Marital Status" value={customer.maritalStatus} />
                <Info label="Religion"       value={customer.religion} />
                <Info label="Caste"          value={customer.caste} />
                <Info label="Languages"      value={customer.languages?.join(", ") || "N/A"} />
              </div>
            </Section>

            {/* Education & Career */}
            <Section title="Education & Career" icon="🎓">
              <div style={styles.infoGrid}>
                <Info label="College"     value={customer.college} />
                <Info label="Degree"      value={customer.degree} />
                <Info label="Company"     value={customer.company} />
                <Info label="Designation" value={customer.designation} />
                <Info label="Income"      value={customer.income} />
              </div>
            </Section>

            {/* Partner Preferences */}
            <Section title="Partner Preferences" icon="💞">
              <div style={styles.prefGrid}>
                <PrefBadge label="Want Kids"        value={customer.wantKids} />
                <PrefBadge label="Open to Relocate" value={customer.openToRelocate} />
                <PrefBadge label="Open to Pets"     value={customer.openToPets} />
              </div>
            </Section>

          </div>

          {/* RIGHT — Matches */}
          <div style={styles.rightSticky}>
            <div style={styles.matchPanel}>

              <div style={styles.matchHeader}>
                <div style={styles.matchTitleRow}>
                  <svg width="18" height="18" viewBox="0 0 36 36" fill="none">
                    <path d="M18 31C18 31 5 22.5 5 13.5C5 9.36 8.36 6 12.5 6C14.9 6 17.05 7.12 18 8.9C18.95 7.12 21.1 6 23.5 6C27.64 6 31 9.36 31 13.5C31 22.5 18 31 18 31Z" fill="#C2185B" />
                  </svg>
                  <h2 style={styles.matchTitle}>Suggested Matches</h2>
                </div>
                <span style={styles.matchCount}>{matches.length}</span>
              </div>

              <div style={styles.matchList}>
                {matches.map((match) => {
                  const s = scoreStyle(match.score);
                  const mInitials = `${match.customer.firstName?.[0] || ""}${match.customer.lastName?.[0] || ""}`;
                  return (
                    <div key={match.customer._id} style={{ ...styles.matchCard, borderLeftColor: s.border }}>
                      <div style={styles.matchCardTop}>
                        <div style={{ ...styles.matchAvatar, background: s.badge.bg, color: s.border }}>
                          {mInitials}
                        </div>
                        <div style={styles.matchInfo}>
                          <h3 style={styles.matchName}>{match.customer.firstName} {match.customer.lastName}</h3>
                          <p style={styles.matchSub}>{match.customer.age} yrs • {match.customer.city}</p>
                        </div>
                        <span style={{ ...styles.scoreBadge, background: s.badge.bg, color: s.border }}>
                          {match.score}%
                        </span>
                      </div>

                      <p style={styles.matchExplanation}>{match.explanation}</p>

                      <button
                        onClick={() => handleSendMatch(match)}
                        style={{ ...styles.sendBtn, background: s.btn }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                        Send Match
                      </button>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>
      </div>

      <MatchModal isOpen={showModal} onClose={() => setShowModal(false)} email={email} />
    </div>
  );
}

/* ── Sub-components ── */
function Section({ title, icon, children }) {
  return (
    <div style={styles.section}>
      <div style={styles.sectionHeader}>
        <span style={styles.sectionIcon}>{icon}</span>
        <h2 style={styles.sectionTitle}>{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div style={styles.infoItem}>
      <p style={styles.infoLabel}>{label}</p>
      <p style={styles.infoValue}>{value || "—"}</p>
    </div>
  );
}

function PrefBadge({ label, value }) {
  const isYes = String(value).toLowerCase() === "yes" || value === true;
  const isNo  = String(value).toLowerCase() === "no"  || value === false;
  return (
    <div style={styles.prefItem}>
      <p style={styles.infoLabel}>{label}</p>
      <span style={{
        ...styles.prefTag,
        background: isYes ? "#E8F5E9" : isNo ? "#FFEBEE" : "#FFF8F9",
        color:      isYes ? "#2E7D32" : isNo ? "#C62828" : "#9E9E9E",
      }}>
        {isYes ? "✓ Yes" : isNo ? "✗ No" : value || "—"}
      </span>
    </div>
  );
}

/* ── Styles ── */
const styles = {
  root: { minHeight: "100vh", background: "#FFF8F9", fontFamily: "'DM Sans', sans-serif" },

  loadingScreen: { minHeight: "100vh", background: "#FFF8F9", display: "flex", alignItems: "center", justifyContent: "center" },
  loadingCard:   { display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", background: "white", borderRadius: "20px", border: "1px solid #F8BBD0", padding: "48px 64px" },
  loadingHeart:  { animation: "pulse 1.2s ease-in-out infinite" },
  loadingText:   { fontSize: "15px", color: "#9E9E9E", margin: 0 },

  header: { background: "linear-gradient(135deg,#C2185B 0%,#880E4F 100%)", position: "sticky", top: 0, zIndex: 50, boxShadow: "0 2px 16px rgba(136,14,79,0.25)" },
  headerInner: { maxWidth: "1280px", margin: "0 auto", padding: "0 32px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" },
  brand: { display: "flex", alignItems: "center", gap: "12px" },
  brandIcon: { width: "38px", height: "38px", borderRadius: "11px", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.25)" },
  brandName: { display: "block", fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontWeight: "600", color: "white", lineHeight: 1.1 },
  brandSub:  { display: "block", fontSize: "11px", color: "rgba(255,255,255,0.6)", letterSpacing: "0.3px" },
  avatar: { width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", border: "2px solid rgba(255,255,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "600", color: "white" },

  heroBanner: { background: "linear-gradient(160deg,#880E4F 0%,#C2185B 60%,#E91E8C 100%)", padding: "48px 32px 72px", position: "relative", overflow: "hidden", textAlign: "center" },
  heroCircle1: { position: "absolute", top: "-60px", right: "5%", width: "240px", height: "240px", borderRadius: "50%", background: "rgba(255,255,255,0.05)" },
  heroCircle2: { position: "absolute", bottom: "-80px", left: "3%", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(255,255,255,0.05)" },
  heroInner: { position: "relative", zIndex: 2 },
  profileAvatar: { width: "80px", height: "80px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", border: "3px solid rgba(255,255,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontFamily: "'Cormorant Garamond', serif", fontSize: "30px", fontWeight: "600", color: "white" },
  heroName: { fontFamily: "'Cormorant Garamond', serif", fontSize: "38px", fontWeight: "600", color: "white", margin: "0 0 14px", letterSpacing: "-0.5px" },
  heroPills: { display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap", marginBottom: "12px" },
  pill: { background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", color: "white", fontSize: "13px", padding: "5px 14px", borderRadius: "20px" },
  heroId: { fontSize: "12px", color: "rgba(255,255,255,0.45)", margin: 0, letterSpacing: "0.5px" },

  body: { maxWidth: "1280px", margin: "-28px auto 0", padding: "0 32px 48px", position: "relative", zIndex: 3 },
  grid: { display: "grid", gridTemplateColumns: "1fr 380px", gap: "24px", alignItems: "start" },
  left: { display: "flex", flexDirection: "column", gap: "20px" },

  section: { background: "white", borderRadius: "20px", border: "1px solid #F8BBD0", padding: "28px", boxShadow: "0 2px 12px rgba(194,24,91,0.06)", animation: "fadeUp 0.5s ease both" },
  sectionHeader: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", paddingBottom: "16px", borderBottom: "1px solid #FCE4EC" },
  sectionIcon: { fontSize: "20px" },
  sectionTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: "600", color: "#1A1A1A", margin: 0 },

  infoGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px 24px" },
  infoItem: { display: "flex", flexDirection: "column", gap: "4px" },
  infoLabel: { fontSize: "11px", color: "#BDBDBD", margin: 0, textTransform: "uppercase", letterSpacing: "0.8px", fontWeight: "500" },
  infoValue: { fontSize: "15px", color: "#1A1A1A", margin: 0, fontWeight: "500" },

  prefGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" },
  prefItem: { display: "flex", flexDirection: "column", gap: "8px" },
  prefTag: { display: "inline-flex", alignItems: "center", padding: "6px 14px", borderRadius: "20px", fontSize: "13px", fontWeight: "500", width: "fit-content" },

  rightSticky: { position: "sticky", top: "80px", height: "calc(100vh - 104px)" },
  matchPanel: { background: "white", borderRadius: "20px", border: "1px solid #F8BBD0", height: "100%", display: "flex", flexDirection: "column", boxShadow: "0 2px 12px rgba(194,24,91,0.06)", overflow: "hidden" },
  matchHeader: { padding: "20px 24px 16px", borderBottom: "1px solid #FCE4EC", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 },
  matchTitleRow: { display: "flex", alignItems: "center", gap: "8px" },
  matchTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: "600", color: "#1A1A1A", margin: 0 },
  matchCount: { background: "#FCE4EC", color: "#C2185B", fontSize: "12px", fontWeight: "600", padding: "3px 10px", borderRadius: "20px" },
  matchList: { flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "14px" },

  matchCard: { background: "#FFFAFB", borderRadius: "14px", border: "1px solid #F8BBD0", borderLeft: "4px solid", padding: "16px", transition: "box-shadow 0.2s" },
  matchCardTop: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" },
  matchAvatar: { width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "600", flexShrink: 0 },
  matchInfo: { flex: 1, minWidth: 0 },
  matchName: { fontSize: "15px", fontWeight: "600", color: "#1A1A1A", margin: "0 0 2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  matchSub: { fontSize: "12px", color: "#9E9E9E", margin: 0 },
  scoreBadge: { fontSize: "13px", fontWeight: "700", padding: "4px 10px", borderRadius: "20px", flexShrink: 0 },
  matchExplanation: { fontSize: "12px", color: "#757575", margin: "0 0 12px", lineHeight: 1.6 },
  sendBtn: { width: "100%", border: "none", borderRadius: "10px", padding: "10px", color: "white", fontSize: "13px", fontWeight: "500", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "7px", fontFamily: "'DM Sans', sans-serif" },
};

export default CustomerDetails;
