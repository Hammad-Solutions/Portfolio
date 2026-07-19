import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Muhammad Hammad — Full-Stack Software Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#060913",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(16, 185, 129, 0.15) 0%, transparent 55%), radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.15) 0%, transparent 55%)",
          padding: "60px 80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "#FFFFFF",
          position: "relative",
        }}
      >
        {/* Decorative Grid Overlay Accent */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Top Header Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            backgroundColor: "rgba(16, 185, 129, 0.12)",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            padding: "8px 20px",
            borderRadius: "9999px",
            fontSize: "16px",
            fontWeight: 700,
            color: "#34D399",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#10B981",
              boxShadow: "0 0 10px #10B981",
            }}
          />
          Available for Work &amp; Engineering Roles
        </div>

        {/* Main Title & Description */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", zIndex: 10, maxWidth: "980px" }}>
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              margin: 0,
              background: "linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 50%, #94A3B8 100%)",
              backgroundClip: "text",
              color: "transparent",
              lineHeight: 1.1,
            }}
          >
            Muhammad Hammad
          </h1>

          <p
            style={{
              fontSize: "30px",
              fontWeight: 700,
              color: "#34D399",
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            Full-Stack Software Engineer — Web &amp; Systems
          </p>

          <p
            style={{
              fontSize: "20px",
              color: "#94A3B8",
              margin: 0,
              lineHeight: 1.5,
              maxWidth: "840px",
            }}
          >
            Architecting production React, Next.js, Node.js &amp; C++ applications. Built with clean SOLID principles, responsive design, and fast performance.
          </p>
        </div>

        {/* Bottom Footer Tags & Domain */}
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "24px",
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", gap: "12px" }}>
            {["React.js", "Next.js", "TypeScript", "Node.js", "C++"].map((skill) => (
              <span
                key={skill}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  color: "#E2E8F0",
                  padding: "6px 14px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                {skill}
              </span>
            ))}
          </div>

          <div
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#60A5FA",
              letterSpacing: "0.05em",
            }}
          >
            hammadsolutions.vercel.app ↗
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
