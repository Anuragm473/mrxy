"use client";

import { useEffect, useState } from "react";

// Add this new component at the top of your page.tsx file, after the imports

const taglines = [
  "Mr.XY – Waves. Streets. Style.",
  "Born by the Beach, Built for the Streets.",
  "Mr.XY – Where Ocean Meets Asphalt.",
  "Street Soul, Beach Spirit.",
  "Mr.XY – Always Outdoor Ready."
];

export default function TaglineSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % taglines.length);
    }, 3000); // Change tagline every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-8 xs:h-10 sm:h-12 overflow-hidden">
      {taglines.map((tagline, index) => (
        <p
          key={index}
          className={`absolute inset-0 flex items-center justify-center text-xs xs:text-sm sm:text-base md:text-lg font-medium text-white transition-all duration-700 ${
            index === currentIndex
              ? "opacity-100 translate-y-0"
              : index < currentIndex
              ? "opacity-0 -translate-y-full"
              : "opacity-0 translate-y-full"
          }`}
        >
          {tagline}
        </p>
      ))}
    </div>
  );
}