"use client";

import { useState, useEffect, useRef } from "react";

// ─── Icons ────────────────────────────────────────────────────────────────────

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

const CheckCircle = ({ size = "w-4 h-4" }: { size?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={size}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ClipboardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
    <rect x="9" y="3" width="6" height="4" rx="1" />
    <line x1="9" y1="12" x2="15" y2="12" /><line x1="9" y1="16" x2="13" y2="16" />
  </svg>
);

const ChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ChevronDown = ({ open }: { open: boolean }) => (
  <svg
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 flex-shrink-0"
    style={{ transition: "transform 0.3s ease", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const ArrowUp = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────

const LOGOS = [
  "Riverstone Chiropractic", "NutriPath Clinic", "Summit Family Medicine",
  "CoreBalance Wellness", "TravelCare RN", "GreenLeaf Nutrition",
  "Horizon Integrative Health", "ClearPath Medical", "VitaWell Clinics", "Northside Chiro",
];

const TESTIMONIALS = [
  {
    quote: "PatientLight cut my admin time in half. Patients arrive already having filled out everything I need — I spend the first minutes actually talking to them, not doing paperwork.",
    highlights: ["cut my admin time in half", "first minutes actually talking to them"],
    name: "Dr. Maya Solano",
    title: "Chiropractor",
    org: "Riverstone Chiropractic",
    initials: "MS",
    bg: "#0B3D3A",
    stars: 5,
  },
  {
    quote: "The questionnaires are a game changer for my practice. I know each patient's dietary history and goals before they walk in. My consults went from 90 minutes down to 45.",
    highlights: ["game changer", "consults went from 90 minutes down to 45"],
    name: "Priya Nair, RDN",
    title: "Registered Dietitian",
    org: "GreenLeaf Nutrition",
    initials: "PN",
    bg: "#0EA5C5",
    stars: 5,
  },
  {
    quote: "I work with three clinics across the city. PatientLight keeps all my calendars synced and patients always know exactly when and where to book. Zero scheduling conflicts since day one.",
    highlights: ["all my calendars synced", "Zero scheduling conflicts since day one"],
    name: "James Okafor",
    title: "Traveling Nurse Practitioner",
    org: "TravelCare RN",
    initials: "JO",
    bg: "#155E59",
    stars: 5,
  },
  {
    quote: "We tried three platforms before PatientLight. Nothing else captures patient context this cleanly. Our practitioners walk into every appointment already prepared.",
    highlights: ["captures patient context this cleanly", "already prepared"],
    name: "Dr. Rachel Kim",
    title: "Medical Director",
    org: "Summit Family Medicine",
    initials: "RK",
    bg: "#6366F1",
    stars: 5,
  },
  {
    quote: "The automated reminders reduced our no-show rate by 40%. PatientLight literally paid for itself in the first two weeks.",
    highlights: ["reduced our no-show rate by 40%", "paid for itself in the first two weeks"],
    name: "Carlos Rivera",
    title: "Practice Manager",
    org: "ClearPath Medical",
    initials: "CR",
    bg: "#D97706",
    stars: 5,
  },
  {
    quote: "HIPAA compliance was our biggest concern switching platforms. PatientLight signed our BAA within hours and had us live the same day. The team was incredible.",
    highlights: ["signed our BAA within hours", "live the same day"],
    name: "Linda Park",
    title: "Operations Lead",
    org: "CoreBalance Wellness",
    initials: "LP",
    bg: "#0F4F3A",
    stars: 5,
  },
];

const PLANS = [
  {
    name: "Solo",
    monthly: "$49",
    annual: "$39",
    annualNote: "billed $468/yr",
    period: "/mo",
    desc: "Perfect for individual practitioners.",
    features: [
      "1 provider",
      "Unlimited patient bookings",
      "Smart intake questionnaires",
      "Google Calendar sync",
      "Email reminders",
      "HIPAA-ready infrastructure",
    ],
    cta: "Request Access",
    featured: false,
  },
  {
    name: "Practice",
    monthly: "$129",
    annual: "$99",
    annualNote: "billed $1,188/yr",
    period: "/mo",
    desc: "For small clinics with multiple providers.",
    features: [
      "Up to 5 providers",
      "Everything in Solo",
      "Team calendar management",
      "Performance metrics dashboard",
      "Custom questionnaire templates",
      "Priority support",
    ],
    cta: "Request Access",
    featured: true,
  },
  {
    name: "Enterprise",
    monthly: "Custom",
    annual: "Custom",
    annualNote: "",
    period: "",
    desc: "For larger organizations and multi-site practices.",
    features: [
      "Unlimited providers",
      "Multi-location management",
      "Advanced analytics & exports",
      "Dedicated onboarding",
      "Custom integrations",
      "24/7 support + SLA",
    ],
    cta: "Contact Us",
    featured: false,
  },
];

const FAQS = [
  {
    q: "Is PatientLight truly HIPAA compliant?",
    a: "Yes. PatientLight is built on HIPAA-compliant infrastructure from the ground up. All patient data is encrypted at rest and in transit using AES-256, access is logged and fully auditable, and our servers run in HIPAA-eligible environments. We sign a Business Associate Agreement (BAA) with every customer before they go live.",
  },
  {
    q: "Do you provide a Business Associate Agreement (BAA)?",
    a: "Absolutely. A BAA is included on all paid plans at no extra cost. It outlines each party's obligations under HIPAA and is signed electronically before your practice goes live. Enterprise customers can request a custom BAA review.",
  },
  {
    q: "How does patient data transfer work?",
    a: "Patients receive a secure, time-limited link to complete their intake questionnaire before their appointment. Responses are encrypted end-to-end and only accessible to authorized providers in your practice. No patient data is stored locally on any device or shared with third parties.",
  },
  {
    q: "Can PatientLight integrate with my existing EHR?",
    a: "We're actively building EHR integrations. Currently, patient questionnaire data can be exported as structured JSON or PDF. Native integrations with major EHR platforms are on our 2026 roadmap — contact us to discuss your specific system and get early access.",
  },
  {
    q: "How long does onboarding take?",
    a: "Most solo providers are fully set up in under 30 minutes. Our Getting Started video guide walks you through every step. For Practice and Enterprise plans, we provide dedicated onboarding support and can have you live within 48 hours of signing up.",
  },
  {
    q: "What if a patient doesn't complete the questionnaire?",
    a: "PatientLight sends automated reminders via email (and SMS on Practice/Enterprise plans) up to 48 hours before the appointment. You can see real-time completion status from your dashboard. If a patient arrives without completing it, you can send them a quick link on the spot from any device.",
  },
];

// ─── Utils ────────────────────────────────────────────────────────────────────

function StatCounter({ val, label, i }: { val: string; label: string; i: number }) {
  const match = val.match(/^(\d+)(.*)/);
  const num    = match ? parseInt(match[1]) : null;
  const suffix = match ? match[2] : val;
  const [count, setCount] = useState(0);
  const ref     = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (num === null) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();
        const duration = 1800;
        const t0 = performance.now();
        const step = (now: number) => {
          const t = Math.min((now - t0) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setCount(Math.round(eased * num));
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [num]);

  return (
    <div ref={ref} data-reveal data-delay={String(i + 1)} className="text-center">
      <div className="font-display text-4xl lg:text-5xl font-bold mb-2 text-gradient">
        {num !== null ? `${count}${suffix}` : val}
      </div>
      <div className="text-xs font-medium uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>
        {label}
      </div>
    </div>
  );
}

// ─── Logo mark ────────────────────────────────────────────────────────────────

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#home" className="flex items-center gap-2.5">
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center"
        style={{ background: light ? "rgba(255,255,255,0.15)" : "var(--forest)" }}
      >
        <svg viewBox="0 0 28 28" fill="none" className="w-5 h-5">
          <circle cx="14" cy="14" r="8" stroke={light ? "white" : "#0EA5C5"} strokeWidth="1.5" />
          <path d="M14 7v7l4 3" stroke={light ? "rgba(255,255,255,0.7)" : "#34D399"} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 14h3M18 14h3M14 7V4M14 24v-3" stroke={light ? "rgba(255,255,255,0.3)" : "#0EA5C5"} strokeWidth="1.25" strokeLinecap="round" opacity="0.6" />
        </svg>
      </div>
      <span
        className="font-display font-semibold text-lg tracking-tight"
        style={{ color: light ? "white" : "var(--forest)" }}
      >
        Patient<span style={{ color: light ? "#0EA5C5" : "var(--teal)" }}>Light</span>
      </span>
    </a>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Nav() {
  const [elevated, setElevated] = useState(false);
  const [open,     setOpen]     = useState(false);
  const [active,   setActive]   = useState("home");
  const [progress, setProgress] = useState(0);

  const LINKS = [
    { label: "Home",         href: "#home",         id: "home" },
    { label: "Features",     href: "#features",     id: "features" },
    { label: "Security",     href: "#security",     id: "security" },
    { label: "Compliance",   href: "#controls",     id: "controls" },
    { label: "Pricing",      href: "#pricing",      id: "pricing" },
  ];

  useEffect(() => {
    const onScroll = () => {
      const y   = window.scrollY;
      const max = document.body.scrollHeight - window.innerHeight;

      setProgress(max > 0 ? Math.min(100, (y / max) * 100) : 0);
      setElevated(y > 20);

      const ids = ["home", "features", "security", "controls", "pricing"];
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && y >= el.offsetTop - 160) {
          setActive(ids[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          style={{ background: "rgba(11,61,58,0.2)", backdropFilter: "blur(4px)" }}
          onClick={() => setOpen(false)}
        />
      )}

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${elevated ? "py-3" : "py-4"}`}
        style={{
          background: "rgba(255,255,255,0.97)",
          backdropFilter: elevated ? "blur(20px)" : "none",
          WebkitBackdropFilter: elevated ? "blur(20px)" : "none",
          borderBottom: elevated ? "1px solid var(--border)" : "1px solid transparent",
          boxShadow: elevated ? "0 2px 24px rgba(11,61,58,0.07)" : "none",
        }}
      >
        <div
          className="nav-progress"
          style={{ width: `${progress}%`, opacity: elevated ? 1 : 0 }}
        />

        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-6">

          <Logo />

          <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {LINKS.map(({ label, href, id }) => {
              const isActive = active === id;
              return (
                <a
                  key={id}
                  href={href}
                  className="relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                  style={{
                    color:      isActive ? "var(--forest)" : "var(--muted)",
                    background: isActive ? "var(--teal-light)" : "transparent",
                    fontWeight: isActive ? 600 : 500,
                  }}
                >
                  {label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                      style={{ background: "var(--teal)" }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <a
              href="#"
              className="text-sm font-medium px-4 py-2.5 rounded-xl transition-colors hover:bg-gray-100"
              style={{ color: "var(--muted)" }}
            >
              Sign In
            </a>
            <a
              href="#pricing"
              className="btn-amber inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm"
            >
              Request Access <ArrowRight />
            </a>
          </div>

          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl transition-colors"
            style={{
              color:      "var(--text)",
              background: open ? "var(--teal-light)" : "transparent",
            }}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5">
                <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {open && (
          <nav className="mobile-menu-enter md:hidden mx-4 mt-3 rounded-2xl overflow-hidden shadow-2xl border bg-white" style={{ borderColor: "var(--border)" }}>
            <div className="p-3 space-y-1">
              {LINKS.map(({ label, href, id }) => (
                <a
                  key={id}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                  style={{
                    color:      active === id ? "var(--forest)" : "var(--muted)",
                    background: active === id ? "var(--teal-light)" : "transparent",
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
            <div className="p-3 pt-0 flex flex-col gap-2">
              <a href="#" className="btn-outline-forest px-4 py-3 rounded-xl text-sm font-semibold text-center">Sign In</a>
              <a href="#pricing" onClick={() => setOpen(false)} className="btn-amber px-4 py-3 rounded-xl text-sm text-center inline-flex items-center justify-center gap-2">
                Request Access <ArrowRight />
              </a>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}

// ─── Home ─────────────────────────────────────────────────────────────────────

const WORDS = ["Chiropractors", "Nutritionists", "Clinicians", "Clinics", "Providers"];

function Home() {
  const [word, setWord] = useState<{ curr: number; prev: number | null }>({ curr: 0, prev: null });
  const [heroCount, setHeroCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setWord((w) => ({ curr: (w.curr + 1) % WORDS.length, prev: w.curr }));
    }, 2800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const t0 = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - t0) / 1200, 1);
      setHeroCount(Math.round((1 - Math.pow(1 - t, 3)) * 500));
      if (t < 1) requestAnimationFrame(step);
    };
    setTimeout(() => requestAnimationFrame(step), 400);
  }, []);

  const AVATARS = [
    { initials: "MS", bg: "#0B3D3A" },
    { initials: "PN", bg: "#0EA5C5" },
    { initials: "JO", bg: "#0B3D3A" },
    { initials: "PR", bg: "#F59E0B" },
  ];

  const APPOINTMENTS = [
    { time: "9:00 AM",  name: "Sarah Mitchell",  type: "Initial Consult",        status: "Ready",     statusColor: "#10B981", statusBg: "#D1FAE5" },
    { time: "10:30 AM", name: "James Okafor",     type: "Follow-up · Chiro",      status: "Form done", statusColor: "#0EA5C5", statusBg: "#E0F7FB" },
    { time: "12:00 PM", name: "Priya Nair",       type: "Nutrition Plan Review",  status: "Pending",   statusColor: "#F59E0B", statusBg: "#FEF3C7" },
    { time: "2:30 PM",  name: "Carlos Rivera",    type: "Initial Consult",        status: "Form done", statusColor: "#0EA5C5", statusBg: "#E0F7FB" },
    { time: "4:00 PM",  name: "Linda Chen",       type: "Travel Nurse Check-in",  status: "Confirmed", statusColor: "#6366F1", statusBg: "#EEF2FF" },
  ];

  return (
    <section id="home" className="hero-v2 relative overflow-hidden" style={{ paddingBottom: 0 }}>
      <div className="absolute inset-0 hero-grid-v2 pointer-events-none" />
      <div className="absolute inset-0 hero-glow-left pointer-events-none" />
      <div className="absolute inset-0 hero-glow-right pointer-events-none" />

      <div className="relative z-10 pt-40 pb-12 px-6 text-center max-w-4xl mx-auto">

        <div className="inline-flex items-center gap-3 trust-pill px-4 py-2 rounded-full mb-10 fade-up fade-up-d1">
          <div className="flex -space-x-2">
            {AVATARS.map((a) => (
              <div key={a.initials}
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold ring-2 ring-white flex-shrink-0"
                style={{ background: a.bg }}>
                {a.initials}
              </div>
            ))}
          </div>
          <span className="text-sm font-medium" style={{ color: "var(--text)" }}>
            Trusted by <strong>{heroCount}+</strong> healthcare providers
          </span>
        </div>

        <h1
          className="font-display font-semibold text-center mb-6 fade-up fade-up-d2"
          style={{ fontSize: "clamp(2.6rem, 6vw, 4.5rem)", lineHeight: 1.08, letterSpacing: "-0.03em", color: "var(--text)" }}
        >
          Smart Booking for Modern
          <br />
          Healthcare{" "}
          <span className="sr-only">Providers</span>
          <span
            aria-hidden="true"
            className="word-box"
            style={{
              position: "relative",
              display: "inline-block",
              overflow: "hidden",
              verticalAlign: "middle",
              minWidth: "14ch",
            }}
          >
            <span style={{ visibility: "hidden", display: "block" }}>
              {WORDS[word.curr]}
            </span>

            {word.prev !== null && (
              <span
                key={`out-${word.prev}`}
                aria-hidden
                style={{
                  position: "absolute", top: 0, left: 0, right: 0,
                  willChange: "transform, opacity",
                  animation: "wordSlideOut 0.38s cubic-bezier(0.4, 0, 0.2, 1) both",
                }}
              >
                {WORDS[word.prev]}
              </span>
            )}

            <span
              key={`in-${word.curr}`}
              style={{
                position: "absolute", top: 0, left: 0, right: 0,
                display: "flex",
                justifyContent: "center",
              }}
            >
              {WORDS[word.curr].split("").map((ch, i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-block",
                    willChange: "transform, opacity",
                    animation: word.prev === null
                      ? "none"
                      : `letterRise 0.55s cubic-bezier(0.16, 1, 0.3, 1) both`,
                    animationDelay: `${0.08 + i * 0.025}s`,
                  }}
                >
                  {ch}
                </span>
              ))}
            </span>

            {word.prev !== null && (
              <span
                key={`shimmer-${word.curr}`}
                className="word-box-shimmer"
                style={{
                  animation: "wordShimmer 1.1s ease-out 0.25s both",
                }}
              />
            )}
          </span>
        </h1>

        <p
          className="text-lg sm:text-xl leading-relaxed mb-10 mx-auto fade-up fade-up-d3"
          style={{ color: "var(--muted)", maxWidth: "600px" }}
        >
          PatientLight streamlines appointment booking and captures exactly what you need — through smart intake questionnaires patients complete before they arrive.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-6 fade-up fade-up-d4">
          <a href="#pricing" className="btn-amber inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm">
            Request Full Access <ArrowRight />
          </a>
          <a href="#security"
            className="btn-outline-forest inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold bg-white">
            <ShieldIcon /> Review Security
          </a>
        </div>

        <p className="text-xs fade-up fade-up-d5" style={{ color: "var(--muted)" }}>
          HIPAA-ready · End-to-end encrypted · No credit card required
        </p>
      </div>

      <div className="relative z-10 px-4 sm:px-8 lg:px-16 fade-up fade-up-d5">
        <div className="max-w-6xl mx-auto relative">

          {/* Floating card — left */}
          <div
            className="absolute -left-2 sm:left-4 top-12 z-20 rounded-2xl p-4 w-44 float-a mockup-shadow hidden sm:block"
            style={{ background: "white", border: "1px solid var(--border)" }}
          >
            <div className="text-xs font-semibold mb-2" style={{ color: "var(--muted)" }}>Questionnaire</div>
            <div className="text-2xl font-bold font-display mb-1" style={{ color: "var(--forest)" }}>94%</div>
            <div className="text-xs mb-3" style={{ color: "#10B981" }}>↑ Completion rate</div>
            <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "var(--teal-light)" }}>
              <div className="h-full rounded-full" style={{ width: "94%", background: "var(--teal)" }} />
            </div>
          </div>

          {/* Floating card — right */}
          <div
            className="absolute -right-2 sm:right-4 top-16 z-20 rounded-2xl p-4 w-52 float-b mockup-shadow hidden sm:block"
            style={{ background: "white", border: "1px solid var(--border)" }}
          >
            <div className="text-xs font-semibold mb-3" style={{ color: "var(--muted)" }}>Next patient</div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                style={{ background: "var(--teal)" }}>
                SM
              </div>
              <div>
                <div className="text-xs font-semibold" style={{ color: "var(--text)" }}>Sarah Mitchell</div>
                <div className="text-xs" style={{ color: "var(--muted)" }}>2:00 PM · Initial Consult</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg" style={{ background: "#D1FAE5" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#065F46" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-xs font-semibold" style={{ color: "#065F46" }}>Form complete</span>
            </div>
          </div>

          {/* Browser frame */}
          <div className="mockup-shadow rounded-t-2xl overflow-hidden border" style={{ borderColor: "var(--border-mid)", borderBottom: "none" }}>

            <div className="flex items-center gap-3 px-5 py-3.5" style={{ background: "#F8FAFC", borderBottom: "1px solid var(--border-mid)" }}>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs" style={{ background: "white", border: "1px solid var(--border-mid)", color: "var(--muted)", maxWidth: 260, width: "100%" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 flex-shrink-0"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                  app.patientlight.io
                </div>
              </div>
              <div className="w-20 flex items-center justify-end gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: "var(--forest)" }}>AK</div>
              </div>
            </div>

            <div className="flex" style={{ background: "white", minHeight: 440 }}>

              <div className="w-52 flex-shrink-0 hidden md:flex flex-col py-4" style={{ background: "#F8FAFC", borderRight: "1px solid var(--border)" }}>
                <div className="px-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "var(--forest)" }}>
                      <svg viewBox="0 0 28 28" fill="none" className="w-4 h-4">
                        <circle cx="14" cy="14" r="8" stroke="#0EA5C5" strokeWidth="1.5" />
                        <path d="M14 7v7l4 3" stroke="#34D399" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="font-display font-semibold text-sm" style={{ color: "var(--forest)" }}>PatientLight</span>
                  </div>
                </div>

                <div className="px-3 space-y-0.5">
                  {[
                    { label: "Dashboard",       active: false },
                    { label: "Appointments",    active: true },
                    { label: "Patients",        active: false },
                    { label: "Calendar",        active: false },
                    { label: "Questionnaires",  active: false },
                    { label: "Analytics",       active: false },
                  ].map(({ label, active }) => (
                    <div key={label}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium"
                      style={{
                        background: active ? "var(--teal-light)" : "transparent",
                        color: active ? "var(--forest)" : "var(--muted)",
                      }}>
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: active ? "var(--teal)" : "transparent" }} />
                      {label}
                    </div>
                  ))}
                </div>

                <div className="mt-auto px-3 pt-4 border-t mx-3" style={{ borderColor: "var(--border)" }}>
                  <div className="flex items-center gap-2.5 px-3 py-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: "var(--forest)" }}>AK</div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold truncate" style={{ color: "var(--text)" }}>Dr. A. Karimi</div>
                      <div className="text-xs truncate" style={{ color: "var(--muted)" }}>Chiropractor</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 min-w-0 p-6 overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-base font-semibold" style={{ color: "var(--text)" }}>Today&apos;s Appointments</h2>
                    <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>Thursday, April 24 · 5 of 8 complete</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white" style={{ background: "var(--teal)" }}>
                      + New Booking
                    </div>
                    <div className="px-3 py-1.5 rounded-lg text-xs font-medium border" style={{ borderColor: "var(--border-mid)", color: "var(--muted)" }}>
                      Apr 24 ▾
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { label: "Booked today",  value: "8",   sub: "+2 from yesterday", color: "var(--forest)" },
                    { label: "Forms complete", value: "6/8", sub: "75% completion",    color: "var(--teal)" },
                    { label: "Avg wait saved", value: "18m", sub: "per appointment",   color: "#6366F1" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl p-3.5" style={{ background: "var(--cream)", border: "1px solid var(--border)" }}>
                      <div className="text-xs mb-1" style={{ color: "var(--muted)" }}>{s.label}</div>
                      <div className="text-xl font-bold font-display" style={{ color: s.color }}>{s.value}</div>
                      <div className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{s.sub}</div>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl overflow-hidden border" style={{ borderColor: "var(--border)" }}>
                  <div className="grid text-xs font-semibold uppercase tracking-wide px-4 py-2.5"
                    style={{ gridTemplateColumns: "100px 1fr 1fr 100px", background: "var(--cream)", color: "var(--muted)", borderBottom: "1px solid var(--border)" }}>
                    <span>Time</span>
                    <span>Patient</span>
                    <span>Type</span>
                    <span>Status</span>
                  </div>
                  {APPOINTMENTS.map((apt, i) => (
                    <div key={i} className="grid items-center px-4 py-3 text-sm"
                      style={{
                        gridTemplateColumns: "100px 1fr 1fr 100px",
                        borderBottom: i < APPOINTMENTS.length - 1 ? "1px solid var(--border)" : "none",
                        background: i % 2 === 0 ? "white" : "#FAFFFE",
                      }}>
                      <span className="text-xs font-semibold" style={{ color: "var(--muted)" }}>{apt.time}</span>
                      <span className="font-medium text-xs truncate pr-3" style={{ color: "var(--text)" }}>{apt.name}</span>
                      <span className="text-xs truncate pr-3" style={{ color: "var(--muted)" }}>{apt.type}</span>
                      <span className="text-xs font-semibold px-2 py-1 rounded-full w-fit"
                        style={{ background: apt.statusBg, color: apt.statusColor }}>
                        {apt.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Logo strip ───────────────────────────────────────────────────────────────

function LogoStrip() {
  const doubled = [...LOGOS, ...LOGOS];
  return (
    <section className="py-10 overflow-hidden" style={{ background: "white", borderTop: "1px solid var(--border)" }}>
      <p data-reveal className="text-center text-xs font-semibold uppercase tracking-widest mb-8" style={{ color: "var(--muted)" }}>
        Trusted by independent practices across the country
      </p>
      <div className="marquee-wrap">
        <div className="flex marquee-track" style={{ width: "max-content" }}>
          {doubled.map((name, i) => (
            <div key={i} className="flex items-center px-10 whitespace-nowrap" style={{ color: "var(--muted)", fontSize: "0.875rem", fontWeight: 500 }}>
              <span className="w-1.5 h-1.5 rounded-full mr-3 flex-shrink-0" style={{ background: "var(--border-mid)" }} />
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────

function Features() {
  return (
    <section id="features" className="py-20 px-6" style={{ background: "var(--cream)" }}>
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <span data-reveal className="section-label mb-5 block">Core Features</span>
            <h2 data-reveal data-delay="1" className="font-display text-5xl lg:text-6xl font-semibold leading-[1.02] mb-4"
              style={{ color: "var(--forest)", letterSpacing: "-0.035em" }}>
              Everything your practice needs,{" "}
              <span className="italic text-gradient">nothing it doesn&apos;t.</span>
            </h2>
          </div>
          <p data-reveal data-delay="2" className="text-base lg:max-w-sm" style={{ color: "var(--muted)", lineHeight: 1.7 }}>
            Booking, intake, compliance, and insights in one focused product. Built for independent practices, not hospitals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-5">

          {/* Hero tile — HIPAA infrastructure, full-width */}
          <div data-reveal className="bento-tile bento-tile-dark md:col-span-6 p-8 lg:p-10 relative min-h-80">
            <div className="absolute inset-0 hero-grid opacity-40 pointer-events-none" />
            <div
              className="absolute top-0 right-0 w-[440px] h-[440px] pointer-events-none opacity-60"
              style={{ background: "radial-gradient(circle at 70% 20%, rgba(14,165,197,0.35) 0%, transparent 55%)" }}
            />
            <div className="relative grid md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-5"
                  style={{ background: "rgba(14,165,197,0.15)", color: "#67E8F9", border: "1px solid rgba(14,165,197,0.3)" }}>
                  <ShieldIcon /> Flagship
                </div>
                <h3 className="font-display text-4xl font-semibold leading-tight mb-4" style={{ letterSpacing: "-0.02em" }}>
                  HIPAA-compliant infrastructure, signed BAA included.
                </h3>
                <p className="text-base mb-6" style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.65 }}>
                  AES-256 at rest. TLS 1.3 in transit. Immutable audit log on every patient record. SOC 2-aligned controls. Business Associate Agreement auto-signed before you go live.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["AES-256", "TLS 1.3", "SOC 2", "BAA included", "Audit log"].map((t) => (
                    <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-md"
                      style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.1)" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="rounded-xl p-5 font-mono text-xs leading-relaxed" style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ color: "rgba(255,255,255,0.4)" }}>{"// audit.log · live"}</div>
                  <div className="mt-2" style={{ color: "#67E8F9" }}>PATIENT_RECORD_READ</div>
                  <div style={{ color: "rgba(255,255,255,0.55)" }}>user=dr.karimi · 11:42:08</div>
                  <div className="mt-2" style={{ color: "#A7F3D0" }}>CONSENT_FORM_SIGNED</div>
                  <div style={{ color: "rgba(255,255,255,0.55)" }}>patient=s.mitchell · 11:38:52</div>
                  <div className="mt-2" style={{ color: "#FCD34D" }}>MFA_VERIFIED</div>
                  <div style={{ color: "rgba(255,255,255,0.55)" }}>session=a9c4…ff1 · 11:36:01</div>
                  <div className="mt-2 flex items-center gap-2" style={{ color: "rgba(255,255,255,0.4)" }}>
                    <span className="live-dot" /> 1,284 events today
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Smart intake — wide */}
          <div data-reveal data-delay="1" className="bento-tile md:col-span-4 p-8">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "var(--teal-light)", color: "var(--teal)" }}>
              <ClipboardIcon />
            </div>
            <h3 className="font-semibold text-xl mb-3" style={{ color: "var(--forest)" }}>Smart intake questionnaires</h3>
            <p className="text-sm mb-5" style={{ color: "var(--muted)", lineHeight: 1.65 }}>
              Build dynamic intake forms patients complete before they arrive. Conditional logic, clinical context, goals — delivered to your dashboard automatically.
            </p>
            <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
              <div className="flex -space-x-1.5">
                {["MS", "JO", "PN"].map((i, k) => (
                  <div key={i} className="w-6 h-6 rounded-full ring-2 ring-white text-white text-[10px] font-bold flex items-center justify-center"
                    style={{ background: ["#0B3D3A", "#0EA5C5", "#F59E0B"][k] }}>{i}</div>
                ))}
              </div>
              <span className="text-xs font-medium" style={{ color: "var(--muted)" }}>94% completion rate · ~6 min avg</span>
            </div>
          </div>

          {/* Calendar — narrow */}
          <div data-reveal data-delay="2" className="bento-tile md:col-span-2 p-8">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "#EEF2FF", color: "#6366F1" }}>
              <CalendarIcon />
            </div>
            <h3 className="font-semibold text-xl mb-3" style={{ color: "var(--forest)" }}>Google Calendar sync</h3>
            <p className="text-sm" style={{ color: "var(--muted)", lineHeight: 1.65 }}>
              Two-way real-time sync. No double-bookings, ever.
            </p>
          </div>

          {/* Team access — narrow */}
          <div data-reveal data-delay="3" className="bento-tile md:col-span-2 p-8">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "#F0FDF4", color: "var(--forest)" }}>
              <UsersIcon />
            </div>
            <h3 className="font-semibold text-xl mb-3" style={{ color: "var(--forest)" }}>Team access controls</h3>
            <p className="text-sm" style={{ color: "var(--muted)", lineHeight: 1.65 }}>
              Role-based permissions. Front desk, clinicians, admins — each sees exactly what they need.
            </p>
          </div>

          {/* Reminders — narrow */}
          <div data-reveal data-delay="4" className="bento-tile md:col-span-2 p-8">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "#FEF3C7", color: "#D97706" }}>
              <BellIcon />
            </div>
            <h3 className="font-semibold text-xl mb-3" style={{ color: "var(--forest)" }}>Automated reminders</h3>
            <p className="text-sm" style={{ color: "var(--muted)", lineHeight: 1.65 }}>
              Email + SMS. Cut no-shows by up to <strong style={{ color: "var(--forest)" }}>40%</strong>.
            </p>
          </div>

          {/* Analytics — wide */}
          <div data-reveal data-delay="5" className="bento-tile md:col-span-2 p-8 relative">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "var(--teal-light)", color: "var(--teal)" }}>
              <ChartIcon />
            </div>
            <h3 className="font-semibold text-xl mb-3" style={{ color: "var(--forest)" }}>Actionable analytics</h3>
            <p className="text-sm mb-4" style={{ color: "var(--muted)", lineHeight: 1.65 }}>
              Booking patterns, completion rates, no-show trends — at a glance.
            </p>
            <div className="flex items-end gap-1 h-10">
              {[40, 58, 45, 72, 65, 88, 78].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i === 5 ? "var(--teal)" : "var(--border)" }} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────

function HowItWorks() {
  const STEPS = [
    {
      num: "01",
      title: "Patient Books Online",
      desc: "Patients visit your practice booking page, pick an available slot from your live calendar, and confirm instantly from any device.",
    },
    {
      num: "02",
      title: "Completes the Questionnaire",
      desc: "They receive a secure link and answer your custom intake questions — medical history, goals, symptoms — before they ever walk through the door.",
    },
    {
      num: "03",
      title: "Provider Arrives Prepared",
      desc: "You open PatientLight and see every patient's context for the day. No paperwork, no surprises — just focused, confident care.",
    },
  ];

  return (
    <section className="py-16 px-6" style={{ background: "white" }}>
      <div className="max-w-5xl mx-auto">

        <div className="text-center max-w-2xl mx-auto mb-14">
          <span data-reveal className="section-label mb-5 block">How It Works</span>
          <h2 data-reveal data-delay="1" className="font-display text-5xl font-semibold leading-tight mb-5"
            style={{ color: "var(--forest)", letterSpacing: "-0.025em" }}>
            From booking to{" "}
            <span className="italic text-gradient">prepared in minutes</span>
          </h2>
          <p data-reveal data-delay="2" className="text-lg" style={{ color: "var(--muted)" }}>
            Three steps is all it takes for a provider to walk into every appointment already knowing their patient.
          </p>
        </div>

        <div className="relative">
          {/* Dashed connector line — desktop only */}
          <div
            aria-hidden
            className="hidden lg:block absolute h-px pointer-events-none"
            style={{
              top: 40,
              left: "16.67%",
              right: "16.67%",
              background: "repeating-linear-gradient(90deg, var(--teal) 0px, var(--teal) 8px, transparent 8px, transparent 20px)",
              opacity: 0.35,
            }}
          />

          <div className="grid lg:grid-cols-3 gap-10 lg:gap-4">
            {STEPS.map((step, i) => (
              <div key={i} data-reveal data-delay={String(i + 1)} className="flex flex-col items-center text-center px-4">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-6 relative z-10"
                  style={{
                    background: i === 1 ? "var(--forest)" : "var(--teal-light)",
                    border: `2px solid ${i === 1 ? "var(--forest)" : "var(--teal)"}`,
                    boxShadow: i === 1 ? "0 0 0 6px rgba(11,61,58,0.08)" : "0 0 0 6px rgba(14,165,197,0.08)",
                  }}
                >
                  <span
                    className="font-display font-bold text-xl"
                    style={{ color: i === 1 ? "white" : "var(--teal)" }}
                  >
                    {step.num}
                  </span>
                </div>
                <h3 className="font-semibold text-xl mb-3" style={{ color: "var(--forest)" }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── Security Stack ───────────────────────────────────────────────────────────

function SecurityStack() {
  const LAYERS = [
    {
      num: "01",
      layer: "Transport",
      title: "TLS 1.3 everywhere",
      detail: "HSTS preloaded. Perfect forward secrecy. No fallback to legacy ciphers.",
      tags: ["TLS 1.3", "HSTS", "PFS"],
    },
    {
      num: "02",
      layer: "Application",
      title: "MFA + role-based access",
      detail: "OAuth 2.0 with mandatory MFA for every provider account. Scoped permissions per role.",
      tags: ["OAuth 2.0", "MFA enforced", "RBAC"],
    },
    {
      num: "03",
      layer: "Data",
      title: "AES-256-GCM at rest",
      detail: "Per-tenant encryption keys, rotated quarterly. Column-level encryption for PHI fields.",
      tags: ["AES-256-GCM", "Key rotation", "Field-level"],
    },
    {
      num: "04",
      layer: "Infrastructure",
      title: "SOC 2 · HIPAA-eligible cloud",
      detail: "Deployed on HIPAA-eligible AWS regions. Annual pen-testing. 24/7 intrusion detection.",
      tags: ["SOC 2", "AWS HIPAA", "Pen-tested"],
    },
  ];

  return (
    <section id="security" className="py-24 px-6 relative overflow-hidden" style={{ background: "var(--forest)" }}>
      <div className="absolute inset-0 hero-grid opacity-40 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(14,165,197,0.15) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-6xl mx-auto">

        <div className="text-center max-w-2xl mx-auto mb-16">
          <span data-reveal className="inline-block section-label mb-5"
            style={{ background: "rgba(14,165,197,0.15)", color: "#67E8F9", border: "1px solid rgba(14,165,197,0.3)" }}>
            Defense in Depth
          </span>
          <h2 data-reveal data-delay="1" className="font-display text-5xl lg:text-6xl font-semibold leading-[1.05] mb-5 text-white"
            style={{ letterSpacing: "-0.03em" }}>
            Security at{" "}
            <span className="italic text-gradient">every layer.</span>
          </h2>
          <p data-reveal data-delay="2" className="text-lg" style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
            Four independent layers protect every patient record. Breach one, three more stand between an attacker and PHI.
          </p>
        </div>

        <div className="relative">
          {/* vertical connector */}
          <div
            aria-hidden
            className="absolute left-[38px] top-10 bottom-10 w-px hidden md:block"
            style={{ background: "repeating-linear-gradient(to bottom, rgba(255,255,255,0.2) 0, rgba(255,255,255,0.2) 4px, transparent 4px, transparent 10px)" }}
          />

          <div className="space-y-4">
            {LAYERS.map((L, i) => (
              <div
                key={L.num}
                data-reveal="left"
                data-delay={String(i + 1)}
                className="stack-card flex flex-col md:flex-row md:items-center gap-5 p-6 md:p-7 relative"
              >
                <div className="flex-shrink-0 flex items-center gap-4 md:w-52">
                  <div className="font-display font-bold text-3xl w-16 text-center"
                    style={{ color: "rgba(255,255,255,0.2)", letterSpacing: "-0.03em" }}>
                    {L.num}
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest mb-1"
                      style={{ color: "#67E8F9" }}>
                      {L.layer}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="stack-dot" />
                      <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>Enforced</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-xl font-semibold mb-1.5 text-white" style={{ letterSpacing: "-0.01em" }}>
                    {L.title}
                  </h3>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.55 }}>
                    {L.detail}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 md:justify-end md:max-w-xs">
                  {L.tags.map((tag) => (
                    <span key={tag} className="text-[11px] font-mono px-2 py-1 rounded"
                      style={{ background: "rgba(0,0,0,0.25)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

// ─── HIPAA Controls Matrix ────────────────────────────────────────────────────

function HIPAAControls() {
  const CONTROLS = [
    { name: "Access Control",               cfr: "§164.312(a)(1)",    detail: "Unique user IDs, automatic logoff, encryption" },
    { name: "Audit Controls",                cfr: "§164.312(b)",       detail: "Immutable event log, 7-year retention" },
    { name: "Integrity Controls",            cfr: "§164.312(c)(1)",    detail: "SHA-256 checksums on every PHI write" },
    { name: "Transmission Security",         cfr: "§164.312(e)(1)",    detail: "TLS 1.3 with perfect forward secrecy" },
    { name: "Encryption & Decryption",       cfr: "§164.312(a)(2)(iv)", detail: "AES-256-GCM at rest, per-tenant keys" },
    { name: "Business Associate Contracts",  cfr: "§164.308(b)(1)",    detail: "Auto-signed BAA before go-live" },
    { name: "Workforce Security",            cfr: "§164.308(a)(3)",    detail: "MFA + role-based access, background checks" },
    { name: "Information Access Management", cfr: "§164.308(a)(4)",    detail: "Scoped permissions, least-privilege default" },
    { name: "Security Incident Procedures",  cfr: "§164.308(a)(6)",    detail: "24/7 SOC monitoring, ≤24h notification" },
    { name: "Contingency Plan",              cfr: "§164.308(a)(7)",    detail: "RPO 15 min · RTO 4 hr · daily backups" },
    { name: "Device & Media Controls",       cfr: "§164.310(d)",       detail: "Cloud-only, no local PHI storage" },
    { name: "Breach Notification",           cfr: "§164.400–414",      detail: "Automated detection, legal review < 24h" },
  ];

  return (
    <section id="controls" className="py-24 px-6" style={{ background: "white" }}>
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <span data-reveal className="section-label mb-5 block">Compliance Receipts</span>
            <h2 data-reveal data-delay="1" className="font-display text-5xl lg:text-6xl font-semibold leading-[1.03] mb-4"
              style={{ color: "var(--forest)", letterSpacing: "-0.035em" }}>
              Every HIPAA control, cited and{" "}
              <span className="italic text-gradient">enforced.</span>
            </h2>
          </div>
          <p data-reveal data-delay="2" className="text-base lg:max-w-sm" style={{ color: "var(--muted)", lineHeight: 1.7 }}>
            We map directly to 45 CFR §164. Ask your compliance officer — they&apos;ll recognize every line.
          </p>
        </div>

        <div data-reveal className="rounded-2xl overflow-hidden border" style={{ borderColor: "var(--border-mid)" }}>
          <div
            className="grid text-xs font-semibold uppercase tracking-widest px-6 py-4"
            style={{
              gridTemplateColumns: "1.3fr 0.8fr 2fr 0.6fr",
              background: "var(--forest)",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            <span>Control</span>
            <span>45 CFR Reference</span>
            <span className="hidden md:inline">Implementation</span>
            <span className="text-right">Status</span>
          </div>

          {CONTROLS.map((c, i) => (
            <div
              key={c.name}
              className="ctrl-row grid items-center px-6 py-4 text-sm"
              style={{
                gridTemplateColumns: "1.3fr 0.8fr 2fr 0.6fr",
                borderBottom: i < CONTROLS.length - 1 ? "1px solid var(--border)" : "none",
                background: i % 2 === 0 ? "white" : "var(--cream)",
              }}
            >
              <span className="font-semibold text-sm" style={{ color: "var(--forest)" }}>{c.name}</span>
              <span><span className="cfr-badge">{c.cfr}</span></span>
              <span className="text-xs hidden md:inline" style={{ color: "var(--muted)" }}>{c.detail}</span>
              <span className="flex justify-end">
                <span className="enforce-pill">
                  <CheckCircle size="w-2.5 h-2.5" />
                  Enforced
                </span>
              </span>
            </div>
          ))}
        </div>

        <div data-reveal className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-5 rounded-2xl px-7 py-5"
          style={{ background: "var(--cream)", border: "1px solid var(--border)" }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "var(--teal)", color: "white" }}>
              <ShieldIcon />
            </div>
            <div>
              <div className="font-semibold text-sm" style={{ color: "var(--forest)" }}>Want the full security review?</div>
              <div className="text-xs" style={{ color: "var(--muted)" }}>
                Download our SOC 2 Type II report and HIPAA controls matrix (PDF).
              </div>
            </div>
          </div>
          <a href="#" className="btn-outline-forest inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-white flex-shrink-0">
            Request documents <ArrowRight />
          </a>
        </div>

      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function boldify(text: string, highlights: string[]) {
  if (!highlights.length) return <>{text}</>;
  type Part = string | React.ReactElement;
  let parts: Part[] = [text];
  highlights.forEach((h, hi) => {
    parts = parts.flatMap((part) => {
      if (typeof part !== "string") return [part];
      const idx = part.indexOf(h);
      if (idx === -1) return [part];
      const result: Part[] = [];
      if (idx > 0) result.push(part.slice(0, idx));
      result.push(<strong key={`${hi}-${idx}`} style={{ color: "var(--text)" }}>{h}</strong>);
      if (idx + h.length < part.length) result.push(part.slice(idx + h.length));
      return result;
    });
  });
  return <>{parts}</>;
}

function TestimonialCard({ t }: { t: typeof TESTIMONIALS[number] }) {
  return (
    <div
      className="flex-shrink-0 rounded-2xl p-7 flex flex-col"
      style={{
        width: 360,
        background: "white",
        border: "1.5px solid var(--border-mid)",
        boxShadow: "0 2px 16px rgba(11,61,58,0.05)",
      }}
    >
      <div className="flex gap-1 mb-5">
        {Array(5).fill(0).map((_, j) => (
          <svg key={j} viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"
            style={{ color: j < t.stars ? "#F59E0B" : "#E2E8F0" }}>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-sm leading-relaxed flex-grow mb-6" style={{ color: "var(--muted)" }}>
        {boldify(t.quote, t.highlights)}
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
          style={{ background: t.bg }}>
          {t.initials}
        </div>
        <div>
          <div className="text-sm font-semibold" style={{ color: "var(--text)" }}>{t.name}</div>
          <div className="text-xs" style={{ color: "var(--muted)" }}>{t.title} · {t.org}</div>
        </div>
      </div>
    </div>
  );
}

function Testimonials() {
  const row1 = [...TESTIMONIALS, ...TESTIMONIALS];
  const reversed = [...TESTIMONIALS].reverse();
  const row2 = [...reversed, ...reversed];

  return (
    <section id="testimonials" className="py-16" style={{ background: "var(--cream)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span data-reveal className="section-label mb-5 block">Practitioners Love It</span>
          <h2 data-reveal data-delay="1" className="font-display text-5xl font-semibold leading-tight mb-5" style={{ color: "var(--forest)", letterSpacing: "-0.025em" }}>
            Less admin.{" "}
            <span className="italic text-gradient">More patient time.</span>
          </h2>
          <p data-reveal data-delay="2" className="text-lg" style={{ color: "var(--muted)" }}>
            Healthcare providers across specialties trust PatientLight to take paperwork off their plate.
          </p>
        </div>
      </div>

      {/* Row 1 — left scroll */}
      <div className="marquee-wrap mb-4">
        <div className="flex marquee-track" style={{ width: "max-content", gap: "20px", animationDuration: "80s" }}>
          {row1.map((t, i) => <TestimonialCard key={i} t={t} />)}
        </div>
      </div>

      {/* Row 2 — right scroll */}
      <div className="marquee-wrap mb-12">
        <div className="flex marquee-track-reverse" style={{ width: "max-content", gap: "20px", animationDuration: "80s" }}>
          {row2.map((t, i) => <TestimonialCard key={i} t={t} />)}
        </div>
      </div>

      {/* Stats strip */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="rounded-3xl px-8 py-14 relative overflow-hidden" style={{ background: "var(--forest)" }}>
          <div className="absolute inset-0 hero-grid pointer-events-none opacity-30" />
          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { val: "500+",  label: "Healthcare Providers" },
              { val: "94%",   label: "Questionnaire Completion Rate" },
              { val: "3hrs",  label: "Saved Per Provider Per Week" },
              { val: "HIPAA", label: "Compliant Infrastructure" },
            ].map((s, i) => (
              <StatCounter key={s.label} val={s.val} label={s.label} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

const COMPARISON = [
  { feature: "Providers",               solo: "1",              practice: "Up to 5",       enterprise: "Unlimited" },
  { feature: "Patient bookings",         solo: "Unlimited",      practice: "Unlimited",     enterprise: "Unlimited" },
  { feature: "Questionnaire templates",  solo: "3",              practice: "Unlimited",     enterprise: "Unlimited" },
  { feature: "Calendar sync",            solo: "Google",         practice: "Google + iCal", enterprise: "All providers" },
  { feature: "Patient reminders",        solo: "Email",          practice: "Email + SMS",   enterprise: "Email + SMS + Custom" },
  { feature: "Analytics",               solo: "Basic",          practice: "Full dashboard", enterprise: "Advanced + exports" },
  { feature: "Support",                  solo: "Email",          practice: "Priority",      enterprise: "24/7 + SLA" },
  { feature: "BAA included",             solo: true,             practice: true,            enterprise: true },
  { feature: "HIPAA compliant",          solo: true,             practice: true,            enterprise: true },
];

function Pricing() {
  const [annual,    setAnnual]    = useState(false);
  const [email,     setEmail]     = useState("");
  const [emailErr,  setEmailErr]  = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const validateEmail = (val: string) => {
    if (!val.trim())          return "Email is required.";
    if (!EMAIL_RE.test(val))  return "Enter a valid email address.";
    return "";
  };

  return (
    <section id="pricing" className="py-16 px-6" style={{ background: "white" }}>
      <div className="max-w-6xl mx-auto">

        <div className="text-center max-w-2xl mx-auto mb-12">
          <span data-reveal className="section-label mb-5 block">Simple Pricing</span>
          <h2 data-reveal data-delay="1" className="font-display text-5xl font-semibold leading-tight mb-5" style={{ color: "var(--forest)", letterSpacing: "-0.025em" }}>
            Grow your practice,
            <br />
            <span className="italic text-gradient">not your admin work</span>
          </h2>
          <p data-reveal data-delay="2" className="text-base mb-10" style={{ color: "var(--muted)" }}>
            Every plan includes a 14-day free trial. No credit card required.
          </p>

          {/* Monthly / Annual toggle */}
          <div data-reveal data-delay="3" className="inline-flex items-center gap-4">
            <span className="text-sm font-medium" style={{ color: annual ? "var(--muted)" : "var(--text)" }}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className="relative w-12 h-6 rounded-full transition-colors duration-200 flex-shrink-0"
              style={{ background: annual ? "var(--teal)" : "var(--border-mid)" }}
              aria-label="Toggle billing period"
            >
              <span
                className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200"
                style={{ transform: annual ? "translateX(24px)" : "translateX(0)" }}
              />
            </button>
            <span className="flex items-center gap-2 text-sm font-medium" style={{ color: annual ? "var(--text)" : "var(--muted)" }}>
              Annual
              <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: "#D1FAE5", color: "#065F46" }}>
                Save 20%
              </span>
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 items-stretch mb-12">
          {PLANS.map((plan, i) => (
            <div key={i} data-reveal data-delay={String(i + 1)} className={`pcard rounded-2xl p-8 flex flex-col relative ${plan.featured ? "pcard-featured" : "bg-white"}`}>
              {plan.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white"
                  style={{ background: "var(--teal)" }}>
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="font-semibold text-xs uppercase tracking-widest mb-4"
                  style={{ color: plan.featured ? "rgba(255,255,255,0.45)" : "var(--muted)" }}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="font-display text-5xl font-bold"
                    style={{ color: plan.featured ? "white" : "var(--forest)" }}>
                    {annual ? plan.annual : plan.monthly}
                  </span>
                  {plan.period && (
                    <span style={{ color: plan.featured ? "rgba(255,255,255,0.4)" : "var(--muted)" }}>{plan.period}</span>
                  )}
                </div>
                {annual && plan.annualNote && (
                  <p className="text-xs mb-3" style={{ color: plan.featured ? "rgba(255,255,255,0.4)" : "var(--muted)" }}>
                    {plan.annualNote}
                  </p>
                )}
                <p className="text-sm mt-2" style={{ color: plan.featured ? "rgba(255,255,255,0.5)" : "var(--muted)" }}>
                  {plan.desc}
                </p>
              </div>

              <ul className="space-y-3.5 mb-10 flex-grow">
                {plan.features.map((feat, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: plan.featured ? "rgba(14,165,197,0.25)" : "var(--teal-light)", color: "var(--teal)" }}>
                      <CheckCircle size="w-2.5 h-2.5" />
                    </span>
                    <span className="text-sm" style={{ color: plan.featured ? "rgba(255,255,255,0.7)" : "var(--text)" }}>
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>

              <a href="#"
                className={`block text-center py-3.5 px-6 rounded-xl font-semibold text-sm transition-all ${plan.featured ? "btn-amber" : "btn-outline-forest"}`}>
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div data-reveal className="mb-16">
          <button
            onClick={() => setShowTable(s => !s)}
            className="flex items-center gap-2 mx-auto mb-6 text-sm font-semibold transition-colors"
            style={{ color: "var(--teal)" }}
          >
            {showTable ? "Hide" : "Compare all features"}
            <ChevronDown open={showTable} />
          </button>

          <div style={{ maxHeight: showTable ? 900 : 0, overflow: "hidden", transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)" }}>
            <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "var(--border-mid)" }}>
              {/* Header */}
              <div className="grid grid-cols-4 text-xs font-semibold uppercase tracking-wide px-5 py-3"
                style={{ background: "var(--forest)", color: "white", gridTemplateColumns: "2fr 1fr 1fr 1fr" }}>
                <span>Feature</span>
                <span className="text-center">Solo</span>
                <span className="text-center">Practice</span>
                <span className="text-center">Enterprise</span>
              </div>

              {COMPARISON.map((row, i) => (
                <div
                  key={i}
                  className="grid items-center px-5 py-3.5 text-sm"
                  style={{
                    gridTemplateColumns: "2fr 1fr 1fr 1fr",
                    background: i % 2 === 0 ? "white" : "var(--cream)",
                    borderBottom: i < COMPARISON.length - 1 ? "1px solid var(--border)" : "none",
                  }}
                >
                  <span className="text-xs font-medium" style={{ color: "var(--text)" }}>{row.feature}</span>
                  {(["solo", "practice", "enterprise"] as const).map(k => (
                    <div key={k} className="flex justify-center">
                      {row[k] === true ? (
                        <span className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "var(--teal-light)", color: "var(--teal)" }}>
                          <CheckCircle size="w-2.5 h-2.5" />
                        </span>
                      ) : (
                        <span className="text-xs text-center" style={{ color: "var(--muted)" }}>{row[k] as string}</span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-3xl px-8 py-20 text-center relative overflow-hidden" style={{ background: "var(--forest)" }}>
          <div className="absolute inset-0 hero-grid pointer-events-none opacity-20" />
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 70% 70% at 50% 0%, rgba(14,165,197,0.2) 0%, transparent 60%)" }} />

          <div className="relative">
            <span data-reveal className="section-label mb-7 block mx-auto w-fit"
              style={{ background: "rgba(14,165,197,0.2)", color: "#0EA5C5", border: "1px solid rgba(14,165,197,0.3)" }}>
              Ready to Transform Your Practice?
            </span>

            <h2 data-reveal data-delay="1" className="font-display text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight"
              style={{ letterSpacing: "-0.025em" }}>
              Start easy patient booking
              <br />
              <span className="italic text-gradient">today.</span>
            </h2>

            <p data-reveal data-delay="2" className="text-lg mb-12 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
              Join 500+ healthcare providers who&apos;ve reclaimed their time and know their patients before they arrive.
            </p>

            {submitted && (
              <div
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl mb-4"
                style={{
                  background: "rgba(14,165,197,0.18)",
                  border: "1px solid rgba(14,165,197,0.4)",
                  animation: "successPop 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards",
                }}
              >
                <span className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--teal)", color: "white" }}>
                  <CheckCircle size="w-3 h-3" />
                </span>
                <span className="text-sm font-medium text-white">
                  You&apos;re on the list — we&apos;ll be in touch shortly!
                </span>
              </div>
            )}

            <form
              data-reveal
              data-delay="3"
              onSubmit={(e) => {
                e.preventDefault();
                const err = validateEmail(email);
                if (err) { setEmailErr(err); return; }
                setEmailErr("");
                setSubmitted(true);
              }}
              className="flex flex-col items-stretch gap-2 max-w-md mx-auto"
              noValidate
            >
              <div className="flex flex-col sm:flex-row items-stretch gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); if (emailErr) setEmailErr(validateEmail(e.target.value)); }}
                  onBlur={() => setEmailErr(validateEmail(email))}
                  placeholder="Enter your work email"
                  className="email-dark flex-1 px-4 py-3.5 rounded-xl text-sm"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    border: `1px solid ${emailErr ? "#F87171" : "rgba(255,255,255,0.2)"}`,
                    color: "white",
                  }}
                />
                <button
                  type="submit"
                  className="btn-amber inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm flex-shrink-0"
                >
                  Get Started Free <ArrowRight />
                </button>
              </div>
              {emailErr && (
                <p className="text-xs text-left pl-1" style={{ color: "#FCA5A5" }}>{emailErr}</p>
              )}
            </form>

            <p data-reveal data-delay="4" className="text-xs mt-6" style={{ color: "rgba(255,255,255,0.3)" }}>
              14-day free trial · No credit card required · HIPAA-compliant from day one
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="py-16 px-6" style={{ background: "var(--cream)" }}>
      <div className="max-w-3xl mx-auto">

        <div className="text-center mb-16">
          <span data-reveal className="section-label mb-5 block">FAQ</span>
          <h2 data-reveal data-delay="1" className="font-display text-5xl font-semibold leading-tight mb-5"
            style={{ color: "var(--forest)", letterSpacing: "-0.025em" }}>
            Questions we get{" "}
            <span className="italic text-gradient">all the time</span>
          </h2>
          <p data-reveal data-delay="2" className="text-lg" style={{ color: "var(--muted)" }}>
            Everything healthcare providers ask before going live with PatientLight.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                data-reveal
                data-delay={String((i % 3) + 1)}
                className="rounded-2xl overflow-hidden transition-all duration-200"
                style={{
                  background: "white",
                  border: `1.5px solid ${isOpen ? "var(--teal)" : "var(--border-mid)"}`,
                  boxShadow: isOpen ? "0 8px 24px rgba(14,165,197,0.08)" : "none",
                }}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                >
                  <span className="font-semibold text-base leading-snug" style={{ color: "var(--text)" }}>
                    {faq.q}
                  </span>
                  <ChevronDown open={isOpen} />
                </button>
                <div
                  style={{
                    maxHeight: isOpen ? 400 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)",
                  }}
                >
                  <p className="px-6 pb-6 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div data-reveal className="mt-12 text-center">
          <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
            Still have questions?{" "}
            <a href="#" className="font-semibold hover:underline" style={{ color: "var(--teal)" }}>
              Talk to our team →
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="px-6 py-10" style={{ background: "var(--forest)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div data-reveal><Logo light /></div>

        <div data-reveal data-delay="1" className="flex flex-wrap justify-center gap-6">
          {["Privacy Policy", "Terms of Service", "Contact", "Support"].map((item) => (
            <a key={item} href="#" className="text-xs font-medium hover:opacity-70 transition-opacity"
              style={{ color: "rgba(255,255,255,0.45)" }}>
              {item}
            </a>
          ))}
        </div>

        <div data-reveal data-delay="2" className="flex items-center gap-2">
          {["HIPAA", "SOC 2", "Encrypted"].map((badge) => (
            <span key={badge} className="px-2.5 py-1 rounded-md text-xs font-semibold"
              style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.1)" }}>
              {badge}
            </span>
          ))}
        </div>
      </div>
      <p data-reveal data-delay="3" className="text-center text-xs mt-6" style={{ color: "rgba(255,255,255,0.25)" }}>
        © 2026 PatientLight, Inc. All rights reserved.
      </p>
    </footer>
  );
}

// ─── Back to top ──────────────────────────────────────────────────────────────

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-8 right-8 z-50 w-11 h-11 rounded-full flex items-center justify-center shadow-lg"
      style={{
        background: "var(--forest)",
        color: "white",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(8px) scale(0.9)",
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}
    >
      <ArrowUp />
    </button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

export default function Page() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -48px 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Nav />
      <Home />
      <LogoStrip />
      <Features />
      <SecurityStack />
      <HIPAAControls />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
      <BackToTop />
    </main>
  );
}
