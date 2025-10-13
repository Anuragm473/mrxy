"use client";
import { useState, useEffect } from 'react';

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const images = [
    { src: '/img1.jpg', alt: 'Mr.Xy Premium Collection 1' },
    { src: '/img2.jpg', alt: 'Mr.Xy Premium Collection 2' },
    { src: '/img3.jpg', alt: 'Mr.Xy Premium Collection 3' },
    { src: '/img4.jpg', alt: 'Mr.Xy Premium Collection 4' },
    { src: '/img5.jpg', alt: 'Mr.Xy Premium Collection 5' },
    { src: '/img6.jpg', alt: 'Mr.Xy Premium Collection 6' },
  ];

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const handlePrev = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const goToSlide = (index:any) => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
      {/* Main Carousel Container */}
      <div className="relative overflow-hidden rounded-xl xs:rounded-2xl sm:rounded-3xl shadow-2xl bg-gray-900">
        {/* Images Container */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] lg:aspect-[24/9]">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                index === currentIndex
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-105'
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-contain"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-2 xs:left-4 sm:left-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-2 xs:p-3 sm:p-4 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 z-10 group"
          aria-label="Previous image"
        >
          <svg
            className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2 xs:right-4 sm:right-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-2 xs:p-3 sm:p-4 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 z-10 group"
          aria-label="Next image"
        >
          <svg
            className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-3 xs:bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 xs:gap-2.5 sm:gap-3 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'bg-white w-6 xs:w-8 sm:w-10 h-2 xs:h-2.5 sm:h-3'
                  : 'bg-white/50 hover:bg-white/70 w-2 xs:w-2.5 sm:w-3 h-2 xs:h-2.5 sm:h-3'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>

        {/* Image Counter */}
        <div className="absolute top-3 xs:top-4 sm:top-6 right-3 xs:right-4 sm:right-6 bg-black/50 backdrop-blur-md text-white px-3 xs:px-4 sm:px-5 py-1.5 xs:py-2 sm:py-2.5 rounded-full text-xs xs:text-sm sm:text-base font-semibold">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 xs:mt-5 sm:mt-6 w-full bg-gray-200 rounded-full h-1 xs:h-1.5 sm:h-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-300 rounded-full"
          style={{
            width: `${((currentIndex + 1) / images.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}