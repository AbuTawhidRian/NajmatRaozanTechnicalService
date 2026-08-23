"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const SLAT_H = 34;

export default function ShutterLoader() {
  const [phase, setPhase] = useState<"visible" | "opening" | "done">("visible");
  const [slatCount, setSlatCount] = useState(40);

  useEffect(() => {
    // Calculate exactly how many slats are needed to fill the screen
    setSlatCount(Math.ceil(window.innerHeight / SLAT_H) + 4);

    const openTimer = setTimeout(() => setPhase("opening"), 1200);
    const doneTimer = setTimeout(() => setPhase("done"), 3200);
    return () => {
      clearTimeout(openTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 9999,
        pointerEvents: phase === "opening" ? "none" : "all",
        overflow: "hidden",
      }}
    >
      {/* ── SHUTTER PANEL ── */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          willChange: "transform",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform: phase === "opening"
            ? "translate3d(0, -100%, 0)"
            : "translate3d(0, 0, 0)",
          transition: "transform 1.8s cubic-bezier(0.65, 0, 0.35, 1)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Roller drum at top */}
        <div style={{
          height: "28px",
          flexShrink: 0,
          background: "linear-gradient(180deg, #0a1e30 0%, #163554 40%, #1a3d60 60%, #0d2540 100%)",
          borderBottom: "3px solid #0a1625",
          boxShadow: "0 4px 12px rgba(0,0,0,0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "40px",
        }}>
          {[...Array(8)].map((_, i) => (
            <div key={i} style={{
              width: "8px", height: "8px",
              borderRadius: "50%",
              background: "#081525",
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.05)",
            }} />
          ))}
        </div>

        {/* Slats — flex-grow to fill remaining height */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {[...Array(slatCount)].map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                position: "relative",
                background: `linear-gradient(
                  180deg,
                  #2a5c8a 0%,
                  #1e4878 10%,
                  #245882 28%,
                  #1d4570 50%,
                  #163861 65%,
                  #0f2c4d 82%,
                  #0a2238 95%,
                  #071828 100%
                )`,
                borderTop: "1px solid rgba(255,255,255,0.08)",
                borderBottom: "1px solid rgba(0,0,0,0.5)",
              }}
            >
              <div style={{ position: "absolute", top: "6px", left: 0, right: 0, height: "1px", background: "rgba(255,255,255,0.12)" }} />
              <div style={{ position: "absolute", top: "14px", left: 0, right: 0, height: "1px", background: "rgba(255,255,255,0.04)" }} />
              {i % 3 === 0 && (
                <>
                  <div style={{ position: "absolute", top: "50%", left: "32px", transform: "translateY(-50%)", width: "5px", height: "5px", borderRadius: "50%", background: "#06141f", boxShadow: "inset 0 1px 1px rgba(0,0,0,0.9)" }} />
                  <div style={{ position: "absolute", top: "50%", right: "32px", transform: "translateY(-50%)", width: "5px", height: "5px", borderRadius: "50%", background: "#06141f", boxShadow: "inset 0 1px 1px rgba(0,0,0,0.9)" }} />
                </>
              )}
            </div>
          ))}
        </div>

        {/* Gold bottom locking bar */}
        <div style={{
          height: "18px",
          flexShrink: 0,
          background: "linear-gradient(180deg, #E59819 0%, #C78210 60%, #a06a0a 100%)",
          boxShadow: "0 -2px 8px rgba(0,0,0,0.6)",
        }} />
      </div>

      {/* ── LOGO & BRANDING (fades before shutter opens) ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          opacity: phase === "opening" ? 0 : 1,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
        }}
      >
        <div style={{
          background: "white",
          borderRadius: "16px",
          width: "150px",
          height: "75px",
          position: "relative",
          boxShadow: "0 12px 48px rgba(0,0,0,0.5)",
        }}>
          <Image src="/images/logo.png" alt="Najmat Raozan" fill sizes="150px" style={{ objectFit: "contain", padding: "10px" }} priority />
        </div>

        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#E59819", fontSize: "10px", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "4px" }}>
            Najmat Raozan
          </p>
          <p style={{ color: "white", fontSize: "20px", fontWeight: 800, letterSpacing: "0.04em" }}>
            Technical Service
          </p>
        </div>

        <div style={{ width: "150px", height: "2px", background: "rgba(255,255,255,0.12)", borderRadius: "999px", overflow: "hidden" }}>
          <div style={{ height: "100%", background: "#E59819", animation: "sl-bar 1.2s ease-out forwards", transformOrigin: "left" }} />
        </div>
      </div>

      <style>{`
        @keyframes sl-bar {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}
