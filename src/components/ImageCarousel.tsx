"use client";
import { useState, useEffect } from 'react';

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const images = [
    { src: '/img1.jpg', alt: 'Mr.Xy Premium Collection 1' },
    { src: '/img2.jpg', alt: 'Mr.Xy Premium Collection 2' },
    { src: '/img3.jpg', alt: 'Mr.Xy Premium Collection 3' },
    { src: '/img4.jpg', alt: 'Mr.Xy Premium Collection 4' },
    { src: '/img5.jpg', alt: 'Mr.Xy Premium Collection 5' },
    { src: '/img6.jpg', alt: 'Mr.Xy Premium Collection 6' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 1000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setDirection('next');
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const handlePrev = () => {
    setDirection('prev');
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const goToSlide = (index: number) => {
    if (index !== currentIndex) {
      setDirection(index > currentIndex ? 'next' : 'prev');
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 400);
    }
  };

  return (
    <div className="relative w-full max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-16">
      {/* Decorative Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-96 bg-yellow-500/5 blur-[120px] rounded-full" />
      </div>

      {/* Main Carousel Container */}
      <div 
        className="relative overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl group"
        style={{
          background: 'linear-gradient(145deg, #1e293b 0%, #0f172a 50%, #1e293b 100%)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.03)'
        }}
      >
        {/* Premium Border Glow */}
        <div className="absolute inset-0 rounded-xl sm:rounded-2xl lg:rounded-3xl" style={{
          background: 'linear-gradient(145deg, rgba(251, 191, 36, 0.1), transparent, rgba(251, 191, 36, 0.1))',
          padding: '1px',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor'
        }} />

        {/* Images Container */}
        <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] bg-gradient-to-br from-slate-900 to-slate-800">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-500 ${
                index === currentIndex
                  ? 'opacity-100 scale-100 z-10'
                  : 'opacity-0 scale-95 z-0'
              }`}
              style={{
                transform: index === currentIndex 
                  ? 'scale(1) translateX(0)' 
                  : direction === 'next' 
                    ? 'scale(0.95) translateX(-20px)' 
                    : 'scale(0.95) translateX(20px)'
              }}
            >
              <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-2xl"
                  style={{
                    filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.4))'
                  }}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </div>
              
              {/* Multi-layer Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-slate-900/30 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/40 via-transparent to-slate-900/40 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 to-transparent pointer-events-none" />
            </div>
          ))}

          {/* Animated Corner Accents */}
          <div className="absolute top-0 left-0 w-20 h-20 sm:w-32 sm:h-32 opacity-30">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-500 to-transparent" />
            <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-yellow-500 to-transparent" />
          </div>
          <div className="absolute bottom-0 right-0 w-20 h-20 sm:w-32 sm:h-32 opacity-30">
            <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-yellow-500 to-transparent" />
            <div className="absolute bottom-0 right-0 w-0.5 h-full bg-gradient-to-t from-yellow-500 to-transparent" />
          </div>
        </div>

        {/* Navigation Arrows - Ultra Premium */}
        <button
          onClick={handlePrev}
          disabled={isTransitioning}
          className="absolute left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 backdrop-blur-2xl text-white p-2.5 sm:p-3 lg:p-4 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 z-20 group/btn border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: 'linear-gradient(135deg, rgba(100, 116, 139, 0.6), rgba(71, 85, 105, 0.6))',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 0 20px rgba(251, 191, 36, 0.1)'
          }}
          aria-label="Previous image"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 transition-all duration-300 group-hover/btn:-translate-x-1 drop-shadow-lg"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
          <div className="absolute inset-0 rounded-full bg-yellow-400/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
        </button>

        <button
          onClick={handleNext}
          disabled={isTransitioning}
          className="absolute right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 backdrop-blur-2xl text-white p-2.5 sm:p-3 lg:p-4 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 z-20 group/btn border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: 'linear-gradient(135deg, rgba(100, 116, 139, 0.6), rgba(71, 85, 105, 0.6))',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 0 20px rgba(251, 191, 36, 0.1)'
          }}
          aria-label="Next image"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 transition-all duration-300 group-hover/btn:translate-x-1 drop-shadow-lg"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
          <div className="absolute inset-0 rounded-full bg-yellow-400/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
        </button>

        {/* Dot Indicators - Refined Golden */}
        <div className="absolute bottom-3 sm:bottom-4 lg:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-2.5 lg:gap-3 z-20 backdrop-blur-xl bg-black/30 px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 rounded-full border border-white/20 shadow-2xl">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`transition-all duration-500 rounded-full hover:scale-125 disabled:cursor-not-allowed ${
                index === currentIndex
                  ? 'w-6 sm:w-8 lg:w-10 h-2 sm:h-2.5 lg:h-3'
                  : 'w-2 sm:w-2.5 lg:w-3 h-2 sm:h-2.5 lg:h-3'
              }`}
              style={{
                background: index === currentIndex 
                  ? 'linear-gradient(90deg, #fbbf24, #f59e0b, #fbbf24)'
                  : 'rgba(255, 255, 255, 0.4)',
                boxShadow: index === currentIndex 
                  ? '0 0 20px rgba(251, 191, 36, 0.8), 0 0 40px rgba(251, 191, 36, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                  : 'inset 0 1px 2px rgba(0, 0, 0, 0.2)'
              }}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>

        {/* Image Counter - Luxe Badge */}
        <div 
          className="absolute top-3 sm:top-4 lg:top-6 right-3 sm:right-4 lg:right-6 backdrop-blur-2xl text-white px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 lg:py-2.5 rounded-full text-xs sm:text-sm lg:text-base font-black tracking-wider border border-white/20 z-20"
          style={{
            background: 'linear-gradient(135deg, rgba(100, 116, 139, 0.7), rgba(71, 85, 105, 0.7))',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
          }}
        >
          <span className="text-yellow-400 font-black text-shadow">{currentIndex + 1}</span>
          <span className="text-white/50 mx-1 sm:mx-1.5">/</span>
          <span className="text-white/90">{images.length}</span>
        </div>
      </div>

      {/* Progress Bar - Ultimate Premium */}
      <div className="mt-4 sm:mt-6 lg:mt-8 w-full bg-slate-800/60 rounded-full h-1.5 sm:h-2 lg:h-2.5 overflow-hidden backdrop-blur-sm border border-white/10 shadow-lg relative">
        <div
          className="h-full rounded-full relative overflow-hidden transition-all duration-500 ease-out"
          style={{
            width: `${((currentIndex + 1) / images.length) * 100}%`,
            background: 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 25%, #fbbf24 50%, #f59e0b 75%, #fbbf24 100%)',
            backgroundSize: '200% 100%',
            boxShadow: '0 0 25px rgba(251, 191, 36, 0.6), 0 0 50px rgba(251, 191, 36, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
          }}
        >
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
              animation: 'shimmer 2.5s infinite linear'
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        
        @media (max-width: 640px) {
          .aspect-\[4\/3\] {
            aspect-ratio: 4/3;
          }
        }
      `}</style>
    </div>
  );
}