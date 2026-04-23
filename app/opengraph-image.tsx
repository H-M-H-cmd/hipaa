import { ImageResponse } from "next/og";

export const alt = "PatientLight — HIPAA-Compliant Patient Booking";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(135deg, #0B3D3A 0%, #155E59 60%, #0EA5C5 160%)",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            display: "flex",
          }}
        />

        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 700,
            height: 700,
            background:
              "radial-gradient(circle, rgba(14,165,197,0.35) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Logo + brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: "auto",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "rgba(14,165,197,0.2)",
              border: "1.5px solid rgba(14,165,197,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="36" height="36" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="8" stroke="#0EA5C5" strokeWidth="2" />
              <path
                d="M14 7v7l4 3"
                stroke="#34D399"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "white",
              letterSpacing: "-0.02em",
              display: "flex",
            }}
          >
            Patient<span style={{ color: "#0EA5C5" }}>Light</span>
          </div>
        </div>

        {/* HIPAA pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 16px",
            borderRadius: 999,
            background: "rgba(16,185,129,0.15)",
            border: "1px solid rgba(16,185,129,0.4)",
            color: "#A7F3D0",
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            alignSelf: "flex-start",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#10B981",
              display: "flex",
            }}
          />
          HIPAA-Compliant · BAA Included
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 84,
            fontWeight: 700,
            color: "white",
            lineHeight: 1.04,
            letterSpacing: "-0.035em",
            maxWidth: 1040,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span style={{ display: "flex" }}>Smart patient booking</span>
          <span style={{ display: "flex", color: "#67E8F9", fontStyle: "italic" }}>
            for modern healthcare.
          </span>
        </div>

        {/* Footer chips */}
        <div
          style={{
            marginTop: 40,
            display: "flex",
            gap: 12,
            alignItems: "center",
          }}
        >
          {["AES-256", "TLS 1.3", "SOC 2", "Audit log", "500+ providers"].map((c) => (
            <div
              key={c}
              style={{
                padding: "8px 14px",
                borderRadius: 8,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.8)",
                fontSize: 20,
                fontWeight: 500,
                display: "flex",
              }}
            >
              {c}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
