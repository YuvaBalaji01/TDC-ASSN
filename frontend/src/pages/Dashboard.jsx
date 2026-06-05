import { useEffect, useState } from "react";
import CustomerCard from "../components/CustomerCard";
import { getCustomers } from "../services/api";

function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const data = await getCustomers();
        setCustomers(data);
        setFilteredCustomers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCustomers();
  }, []);

  useEffect(() => {
    let filtered = customers.filter((customer) => {
      const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase();
      return (
        fullName.includes(search.toLowerCase()) ||
        customer.city?.toLowerCase().includes(search.toLowerCase()) ||
        customer.gender?.toLowerCase().includes(search.toLowerCase())
      );
    });

    if (activeFilter !== "All") {
      filtered = filtered.filter((c) => c.gender === activeFilter);
    }

    setFilteredCustomers(filtered);
  }, [search, customers, activeFilter]);

  const maleCount = customers.filter((c) => c.gender === "Male").length;
  const femaleCount = customers.filter((c) => c.gender === "Female").length;

  if (loading) {
    return (
      <div style={styles.loadingScreen}>
        <div style={styles.loadingCard}>
          <div style={styles.loadingHeart}>
            <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
              <path
                d="M18 31C18 31 5 22.5 5 13.5C5 9.36 8.36 6 12.5 6C14.9 6 17.05 7.12 18 8.9C18.95 7.12 21.1 6 23.5 6C27.64 6 31 9.36 31 13.5C31 22.5 18 31 18 31Z"
                fill="#C2185B"
              />
            </svg>
          </div>
          <p style={styles.loadingText}>Loading profiles…</p>
        </div>
        <style>{`@keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.15)} } @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }`}</style>
      </div>
    );
  }

  return (
    <div style={styles.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@400;500&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.12)} }
        * { box-sizing: border-box; }
        input::placeholder { color: #BDBDBD; }
        input:focus { outline: none; border-color: #C2185B !important; }
      `}</style>

      {/* ── Top Nav ── */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.brand}>
            <div style={styles.brandIcon}>
              <svg width="20" height="20" viewBox="0 0 36 36" fill="none">
                <path
                  d="M18 31C18 31 5 22.5 5 13.5C5 9.36 8.36 6 12.5 6C14.9 6 17.05 7.12 18 8.9C18.95 7.12 21.1 6 23.5 6C27.64 6 31 9.36 31 13.5C31 22.5 18 31 18 31Z"
                  fill="white"
                />
              </svg>
            </div>
            <div>
              <span style={styles.brandName}>The Date Crew</span>
              <span style={styles.brandSub}>Matchmaker Dashboard</span>
            </div>
          </div>

          <div style={styles.headerRight}>
            <div style={styles.badge}>
              <svg width="14" height="14" viewBox="0 0 36 36" fill="none">
                <path d="M18 31C18 31 5 22.5 5 13.5C5 9.36 8.36 6 12.5 6C14.9 6 17.05 7.12 18 8.9C18.95 7.12 21.1 6 23.5 6C27.64 6 31 9.36 31 13.5C31 22.5 18 31 18 31Z" fill="#C2185B" />
              </svg>
              {customers.length} Profiles
            </div>
            <div style={styles.avatar}>MM</div>
          </div>
        </div>
      </header>

      {/* ── Hero Search Banner ── */}
      <div style={styles.heroBanner}>
        <div style={styles.heroCircle1} />
        <div style={styles.heroCircle2} />
        <div style={styles.heroInner}>
          <h1 style={styles.heroTitle}>Find the Perfect Match</h1>
          <p style={styles.heroSub}>Search and manage all customer profiles in one place</p>

          <div style={styles.searchWrap}>
            <span style={styles.searchIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C2185B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search by name, city or gender…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
            />
            {search && (
              <button onClick={() => setSearch("")} style={styles.clearBtn}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9E9E9E" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      <div style={styles.body}>

        {/* ── Stats ── */}
        <div style={styles.statsRow}>
          {[
            { label: "Total Profiles", value: customers.length, icon: "👥", color: "#C2185B", bg: "#FCE4EC" },
            { label: "Male Profiles",  value: maleCount,        icon: "♂",  color: "#1565C0", bg: "#E3F2FD" },
            { label: "Female Profiles",value: femaleCount,      icon: "♀",  color: "#6A1B9A", bg: "#F3E5F5" },
          ].map((s) => (
            <div key={s.label} style={styles.statCard}>
              <div style={{ ...styles.statIconWrap, background: s.bg, color: s.color }}>
                <span style={{ fontSize: "18px" }}>{s.icon}</span>
              </div>
              <div>
                <p style={styles.statLabel}>{s.label}</p>
                <p style={{ ...styles.statValue, color: s.color }}>{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Filter Chips + Count ── */}
        <div style={styles.filterRow}>
          <div style={styles.chips}>
            {["All", "Male", "Female"].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={activeFilter === f ? { ...styles.chip, ...styles.chipActive } : styles.chip}
              >
                {f === "All" ? "All Profiles" : f === "Male" ? "♂ Male" : "♀ Female"}
              </button>
            ))}
          </div>
          <span style={styles.resultCount}>
            Showing <strong>{filteredCustomers.length}</strong> profile{filteredCustomers.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* ── Grid ── */}
        {filteredCustomers.length === 0 ? (
          <div style={styles.empty}>
            <div style={styles.emptyIcon}>💔</div>
            <p style={styles.emptyTitle}>No profiles found</p>
            <p style={styles.emptySub}>Try a different search or filter</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {filteredCustomers.map((customer) => (
              <CustomerCard key={customer._id} customer={customer} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

const styles = {
  root: {
    minHeight: "100vh",
    background: "#FFF8F9",
    fontFamily: "'DM Sans', sans-serif",
  },

  /* Loading */
  loadingScreen: {
    minHeight: "100vh", background: "#FFF8F9",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  loadingCard: {
    display: "flex", flexDirection: "column", alignItems: "center", gap: "16px",
    background: "white", borderRadius: "20px",
    border: "1px solid #F8BBD0",
    padding: "48px 64px",
  },
  loadingHeart: {
    animation: "pulse 1.2s ease-in-out infinite",
  },
  loadingText: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "15px", color: "#9E9E9E", margin: 0,
  },

  /* Header */
  header: {
    background: "linear-gradient(135deg, #C2185B 0%, #880E4F 100%)",
    position: "sticky", top: 0, zIndex: 50,
    boxShadow: "0 2px 16px rgba(136,14,79,0.25)",
  },
  headerInner: {
    maxWidth: "1280px", margin: "0 auto",
    padding: "0 32px",
    height: "64px",
    display: "flex", alignItems: "center", justifyContent: "space-between",
  },
  brand: {
    display: "flex", alignItems: "center", gap: "12px",
  },
  brandIcon: {
    width: "38px", height: "38px", borderRadius: "11px",
    background: "rgba(255,255,255,0.2)",
    display: "flex", alignItems: "center", justifyContent: "center",
    border: "1px solid rgba(255,255,255,0.25)",
  },
  brandName: {
    display: "block",
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "20px", fontWeight: "600", color: "white", lineHeight: 1.1,
  },
  brandSub: {
    display: "block",
    fontSize: "11px", color: "rgba(255,255,255,0.6)", letterSpacing: "0.3px",
  },
  headerRight: {
    display: "flex", alignItems: "center", gap: "12px",
  },
  badge: {
    display: "flex", alignItems: "center", gap: "6px",
    background: "rgba(255,255,255,0.15)",
    border: "1px solid rgba(255,255,255,0.25)",
    color: "white", fontSize: "13px", fontWeight: "500",
    padding: "6px 14px", borderRadius: "20px",
  },
  avatar: {
    width: "36px", height: "36px", borderRadius: "50%",
    background: "rgba(255,255,255,0.2)",
    border: "2px solid rgba(255,255,255,0.4)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "12px", fontWeight: "600", color: "white",
    letterSpacing: "0.5px",
  },

  /* Hero Banner */
  heroBanner: {
    background: "linear-gradient(160deg, #880E4F 0%, #C2185B 60%, #E91E8C 100%)",
    padding: "52px 32px 64px",
    position: "relative", overflow: "hidden",
    textAlign: "center",
  },
  heroCircle1: {
    position: "absolute", top: "-60px", right: "5%",
    width: "240px", height: "240px", borderRadius: "50%",
    background: "rgba(255,255,255,0.05)",
  },
  heroCircle2: {
    position: "absolute", bottom: "-80px", left: "3%",
    width: "200px", height: "200px", borderRadius: "50%",
    background: "rgba(255,255,255,0.05)",
  },
  heroInner: {
    position: "relative", zIndex: 2,
    maxWidth: "640px", margin: "0 auto",
  },
  heroTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "42px", fontWeight: "600",
    color: "white", margin: "0 0 8px",
    letterSpacing: "-0.5px",
  },
  heroSub: {
    fontSize: "15px", color: "rgba(255,255,255,0.7)",
    margin: "0 0 28px",
  },
  searchWrap: {
    position: "relative", maxWidth: "520px", margin: "0 auto",
  },
  searchIcon: {
    position: "absolute", left: "16px",
    top: "50%", transform: "translateY(-50%)",
    display: "flex", pointerEvents: "none",
  },
  searchInput: {
    width: "100%",
    padding: "15px 48px 15px 48px",
    fontSize: "14px",
    fontFamily: "'DM Sans', sans-serif",
    background: "white",
    border: "2px solid transparent",
    borderRadius: "14px",
    color: "#1A1A1A",
    boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
    transition: "border-color 0.2s",
  },
  clearBtn: {
    position: "absolute", right: "14px",
    top: "50%", transform: "translateY(-50%)",
    background: "none", border: "none",
    cursor: "pointer", padding: "4px",
    display: "flex", alignItems: "center",
  },

  /* Body */
  body: {
    maxWidth: "1280px", margin: "0 auto",
    padding: "0 32px 48px",
    marginTop: "-24px", position: "relative", zIndex: 3,
  },

  /* Stats */
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    marginBottom: "28px",
  },
  statCard: {
    background: "white",
    borderRadius: "16px",
    border: "1px solid #F8BBD0",
    padding: "20px 24px",
    display: "flex", alignItems: "center", gap: "16px",
    boxShadow: "0 2px 12px rgba(194,24,91,0.07)",
    animation: "fadeUp 0.5s ease both",
  },
  statIconWrap: {
    width: "48px", height: "48px", borderRadius: "14px",
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0,
  },
  statLabel: {
    fontSize: "12px", color: "#9E9E9E",
    margin: "0 0 4px", letterSpacing: "0.3px",
    textTransform: "uppercase",
  },
  statValue: {
    fontSize: "30px", fontWeight: "600",
    fontFamily: "'Cormorant Garamond', serif",
    margin: 0, lineHeight: 1,
  },

  /* Filter Chips */
  filterRow: {
    display: "flex", alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
    flexWrap: "wrap", gap: "12px",
  },
  chips: {
    display: "flex", gap: "8px",
  },
  chip: {
    padding: "8px 18px",
    borderRadius: "20px",
    border: "1.5px solid #EDD5DF",
    background: "white",
    fontSize: "13px", fontWeight: "500",
    color: "#757575", cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    transition: "all 0.15s",
  },
  chipActive: {
    background: "linear-gradient(135deg, #C2185B 0%, #880E4F 100%)",
    border: "1.5px solid transparent",
    color: "white",
  },
  resultCount: {
    fontSize: "13px", color: "#9E9E9E",
  },

  /* Grid */
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  },

  /* Empty */
  empty: {
    textAlign: "center", padding: "80px 20px",
  },
  emptyIcon: {
    fontSize: "52px", marginBottom: "16px",
  },
  emptyTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "24px", fontWeight: "600",
    color: "#424242", margin: "0 0 8px",
  },
  emptySub: {
    fontSize: "14px", color: "#9E9E9E", margin: 0,
  },
};

export default Dashboard;
