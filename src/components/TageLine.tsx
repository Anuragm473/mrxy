"use client";

import { useEffect, useState } from "react";

const taglines = [
  "MR.XY — Waves. Streets. Style.",
  "Born by the Beach, Built for the Streets.",
  "MR.XY — Where Ocean Meets Asphalt.",
  "Street Soul, Beach Spirit.",
  "MR.XY — Always Outdoor Ready.",
];

export default function TaglineSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % taglines.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-24 sm:h-28 overflow-hidden flex items-center justify-center" style={{
      background: "linear-gradient(to bottom, #0f172a 0%, #1e293b 50%, #0f172a 100%)"
    }}>
      {/* Dark overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40"></div>
      
      {/* Animated golden shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-600/5 to-transparent animate-pulse"></div>
      
      {/* Top and bottom accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-600/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-600/30 to-transparent"></div>
      
      {taglines.map((tagline, index) => (
        <div
          key={index}
          className={`absolute inset-0 flex items-center justify-center px-6 transition-all duration-1000 ${
            index === currentIndex
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-90 -translate-y-12"
          }`}
        >
          <p
            className="text-center font-black tracking-widest uppercase relative"
            style={{
              fontSize: "clamp(1.1rem, 3.5vw, 1.75rem)",
              letterSpacing: "0.18em",
              fontFamily: "'Inter', -apple-system, 'Helvetica Neue', sans-serif",
              fontWeight: "900",
              background: "linear-gradient(135deg, #d4af37 0%, #f4e4b0 30%, #d4af37 50%, #f4e4b0 70%, #d4af37 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 20px rgba(212, 175, 55, 0.4)) drop-shadow(0 0 40px rgba(212, 175, 55, 0.2))",
              animation: index === currentIndex ? "shimmer 4s linear infinite" : "none",
            }}
          >
            {tagline}
          </p>
        </div>
      ))}
      
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 200% center;
          }
        }
      `}</style>
    </div>
  );
}