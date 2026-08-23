"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const SLAT_H = 34;

export default function ShutterLoader() {
  const [phase, setPhase] = useState<"visible" | "opening" | "done">("visible");
  const [slatCount, setSlatCount] = useState(40);

  useEffect(() => {
    setSlatCount(Math.ceil(window.innerHeight / SLAT_H) + 4);
    const openTimer = setTimeout(() => setPhase("opening"), 1000);
    const doneTimer = setTimeout(() => setPhase("done"), 3600);
    return () => {
      clearTimeout(openTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "done") return null;

  const isOpening = phase === "opening";

  return (
    <>
      {isOpening && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 9998,
          background: "white",
          animation: "page-reveal 0.8s ease-out 2.0s forwards",
          pointerEvents: "none",
        }} />
      )}

      <div aria-hidden="true" style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 9999,
        pointerEvents: isOpening ? "none" : "all",
        overflow: "hidden",
        background: "#111",
      }}>

        {/* ── LEFT GUIDE RAIL ── */}
        <div style={{
          position: "absolute", top: 0, bottom: 0, left: 0, width: "22px",
          zIndex: 10001,
          background: "linear-gradient(90deg, #06131e 0%, #0d2235 30%, #122840 60%, #050f1a 100%)",
          boxShadow: "4px 0 12px rgba(0,0,0,0.5)",
        }}>
          <div className="noise-overlay" />
          {[...Array(14)].map((_, i) => (
            <div key={i} style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#0a1c2e", margin: "0 auto", marginTop: i === 0 ? "260px" : "30px", boxShadow: "inset 0 1px 1px rgba(0,0,0,0.8)" }} />
          ))}
        </div>
        <div style={{ position: "absolute", top: 0, bottom: 0, left: "18px", width: "4px", zIndex: 10001, background: "linear-gradient(90deg, #020810, #0a1c2e, #020810)" }} />

        {/* ── RIGHT GUIDE RAIL ── */}
        <div style={{
          position: "absolute", top: 0, bottom: 0, right: 0, width: "22px",
          zIndex: 10001,
          background: "linear-gradient(270deg, #06131e 0%, #0d2235 30%, #122840 60%, #050f1a 100%)",
          boxShadow: "-4px 0 12px rgba(0,0,0,0.5)",
        }}>
          <div className="noise-overlay" />
          {[...Array(14)].map((_, i) => (
            <div key={i} style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#0a1c2e", margin: "0 auto", marginTop: i === 0 ? "260px" : "30px", boxShadow: "inset 0 1px 1px rgba(0,0,0,0.8)" }} />
          ))}
        </div>
        <div style={{ position: "absolute", top: 0, bottom: 0, right: "18px", width: "4px", zIndex: 10001, background: "linear-gradient(90deg, #020810, #0a1c2e, #020810)" }} />

        {/* ── BIG SHOP BANNER / FASCIA BOARD ── */}
        <div style={{
          position: "absolute",
          top: 0, left: "22px", right: "22px",
          height: "220px",
          zIndex: 10003,
          background: "linear-gradient(180deg, #0A2540 0%, #0d2d4e 60%, #0A2540 100%)",
          borderBottom: "4px solid #E59819",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 6px 30px rgba(0,0,0,0.7)",
        }}>
          <div className="noise-overlay" style={{ opacity: 0.02 }} />
          
          <div className="banner-content" style={{ display: "flex", alignItems: "center", gap: "30px", position: "relative", zIndex: 2, padding: "0 20px" }}>
            {/* Logo on Left */}
            <div style={{
              background: "white", borderRadius: "16px", width: "130px", height: "110px",
              position: "relative", flexShrink: 0, boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
            }}>
              <Image src="/images/logo.png" alt="Najmat Raozan" fill sizes="130px" style={{ objectFit: "contain", padding: "12px" }} priority />
            </div>

            {/* Info on Right */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <p className="banner-title" style={{ color: "white", fontSize: "40px", fontWeight: 900, letterSpacing: "0.05em", textTransform: "uppercase", margin: 0, lineHeight: 1.1 }}>
                  NAJMAT RAOZAN
                </p>
                <p style={{ color: "#E59819", fontSize: "16px", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", margin: 0, marginTop: "4px" }}>
                  Technical Service
                </p>
              </div>

              {/* Contact Info (Below Name) */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", color: "rgba(255,255,255,0.8)", fontSize: "14px", fontWeight: 500, letterSpacing: "0.02em" }}>
                <p style={{ margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                  <span>📍</span> 78G5+8VG - 18th St - Al Murar, Dubai
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                  <p style={{ margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                    <span>📞</span> +971 56 588 2185
                  </p>
                  <p style={{ margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                    <span>✉️</span> info@najmatraozan.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── SHUTTER CONTAINER (Starts at 220px now) ── */}
        <div style={{
          position: "absolute",
          top: "220px", left: "22px", right: "22px", bottom: 0,
          overflow: "hidden"
        }}>
          
          <div
            style={{
              position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
              willChange: "transform",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              animation: isOpening ? "shutter-roll 2.6s cubic-bezier(0.65, 0, 0.35, 1) forwards" : "none",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Slats */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              {[...Array(slatCount)].map((_, i) => (
                <div key={i} style={{
                  flex: 1, position: "relative",
                  background: `linear-gradient(180deg, #8fa8be 0%, #7090a8 8%, #7a9ab4 28%, #6888a0 50%, #5c7a92 68%, #4e6a82 85%, #3e5a72 100%)`,
                  borderTop: "1px solid rgba(255,255,255,0.15)",
                  borderBottom: "1px solid rgba(0,0,0,0.35)",
                }}>
                  <div className="noise-overlay" />
                  <div style={{ position: "absolute", top: "5px", left: 0, right: 0, height: "1px", background: "rgba(255,255,255,0.25)" }} />
                  <div style={{ position: "absolute", top: "13px", left: 0, right: 0, height: "1px", background: "rgba(255,255,255,0.08)" }} />
                  {i % 3 === 0 && (
                    <>
                      <div style={{ position: "absolute", top: "50%", left: "24px", transform: "translateY(-50%)", width: "5px", height: "5px", borderRadius: "50%", background: "#2a4a5e", boxShadow: "inset 0 1px 1px rgba(0,0,0,0.7)" }} />
                      <div style={{ position: "absolute", top: "50%", right: "24px", transform: "translateY(-50%)", width: "5px", height: "5px", borderRadius: "50%", background: "#2a4a5e", boxShadow: "inset 0 1px 1px rgba(0,0,0,0.7)" }} />
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Gold bottom bar with Lock & Handles */}
            <div style={{
              height: "24px", flexShrink: 0,
              background: "linear-gradient(180deg, #E59819 0%, #C78210 60%, #a06a0a 100%)",
              boxShadow: "0 -2px 8px rgba(0,0,0,0.6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative"
            }}>
              <div className="noise-overlay" style={{ opacity: 0.1 }} />
              <div style={{ position: "absolute", left: "calc(50% - 70px)", width: "35px", height: "8px", background: "linear-gradient(180deg, #555, #222)", borderRadius: "4px", boxShadow: "0 2px 4px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.2)" }} />
              <div style={{
                width: "48px", height: "18px",
                background: "linear-gradient(180deg, #444, #111)",
                borderRadius: "3px", border: "1px solid #000",
                display: "flex", justifyContent: "center", alignItems: "center",
                boxShadow: "inset 0 1px 2px rgba(255,255,255,0.2), 0 2px 5px rgba(0,0,0,0.5)"
              }}>
                <div style={{ width: "4px", height: "10px", background: "#000", borderRadius: "2px", boxShadow: "inset 0 1px 2px rgba(0,0,0,1)" }} />
              </div>
              <div style={{ position: "absolute", right: "calc(50% - 70px)", width: "35px", height: "8px", background: "linear-gradient(180deg, #555, #222)", borderRadius: "4px", boxShadow: "0 2px 4px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.2)" }} />
            </div>
          </div>

          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "45px",
            background: "linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
            pointerEvents: "none", zIndex: 2
          }} />
        </div>

        {/* ── DROP SHADOW ── */}
        <div style={{
          position: "absolute",
          left: "22px", right: "22px", height: "80px",
          top: "220px",
          zIndex: 10000, pointerEvents: "none",
          background: "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 40%, transparent 100%)",
          willChange: "transform",
          transform: "translate3d(0, 100vh, 0)",
          animation: isOpening ? "shutter-shadow 2.6s cubic-bezier(0.65, 0, 0.35, 1) forwards" : "none",
        }} />
      </div>

      <style>{`
        .noise-overlay {
          position: absolute; inset: 0; opacity: 0.15; pointer-events: none;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
        @keyframes sl-bar {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes page-reveal {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
        @keyframes shutter-roll {
          0% { transform: translate3d(0, 0, 0); }
          3% { transform: translate3d(0, -4px, 0); }
          6% { transform: translate3d(0, 2px, 0); }
          9% { transform: translate3d(0, -1px, 0); }
          13% { transform: translate3d(0, 0, 0); }
          85% { transform: translate3d(0, -100%, 0); }
          92% { transform: translate3d(0, -98.5%, 0); }
          100% { transform: translate3d(0, -100%, 0); }
        }
        @keyframes shutter-shadow {
          0% { transform: translate3d(0, calc(100vh - 220px), 0); }
          3% { transform: translate3d(0, calc(100vh - 224px), 0); }
          6% { transform: translate3d(0, calc(100vh - 218px), 0); }
          9% { transform: translate3d(0, calc(100vh - 221px), 0); }
          13% { transform: translate3d(0, calc(100vh - 220px), 0); }
          85% { transform: translate3d(0, -80px, 0); }
          92% { transform: translate3d(0, -60px, 0); }
          100% { transform: translate3d(0, -80px, 0); }
        }
        
        /* Mobile responsiveness for banner */
        @media (max-width: 640px) {
          .banner-content {
            flex-direction: column !important;
            text-align: center;
            gap: 16px !important;
          }
          .banner-title {
            font-size: 24px !important;
          }
          .banner-content > div:last-child {
            align-items: center;
          }
          .banner-content > div:last-child > div:last-child {
            align-items: center;
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
}
