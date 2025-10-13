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
    }, 3000); // every 3s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-14 sm:h-16 overflow-hidden bg-black text-white">
      {taglines.map((tagline, index) => (
        <p
          key={index}
          className={`absolute inset-0 flex items-center justify-center text-center font-extrabold tracking-wide uppercase transition-all duration-700 ease-in-out ${
            index === currentIndex
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-90 translate-y-6"
          }`}
          style={{
            textShadow: "0 0 10px rgba(255, 255, 255, 0.2)",
            letterSpacing: "0.08em",
          }}
        >
          {tagline}
        </p>
      ))}
    </div>
  );
}
