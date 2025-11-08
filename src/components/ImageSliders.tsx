"use client";
import { useState } from "react";

interface ImageSliderProps {
  images: string[];
  productName: string;
  discount: number;
}

export default function ImageSlider({ images, productName, discount }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative">
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-4 left-4 z-10 bg-yellow-400 text-black px-4 py-2 text-sm font-bold rounded-lg shadow-lg">
          {discount}% OFF
        </div>
      )}

      {/* Main Image Display */}
      <div className="relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-700 shadow-xl border-4 border-gray-200 dark:border-gray-600">
        <img
          src={images[currentIndex] || '/placeholder.jpg'}
          alt={`${productName} - Image ${currentIndex + 1}`}
          className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover transition-opacity duration-300"
          loading="eager"
        />

        {/* Navigation Arrows - Only show if multiple images */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 text-gray-800 dark:text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 text-gray-800 dark:text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
              aria-label="Next image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Navigation - Only show if multiple images */}
      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-5 gap-2 sm:gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative overflow-hidden rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                currentIndex === index 
                  ? 'border-yellow-400 ring-2 ring-yellow-400 ring-offset-2 dark:ring-offset-gray-800' 
                  : 'border-gray-300 dark:border-gray-600 hover:border-yellow-300 dark:hover:border-yellow-500'
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <img
                src={image || '/placeholder.jpg'}
                alt={`${productName} thumbnail ${index + 1}`}
                className="w-full h-16 sm:h-20 lg:h-24 object-cover"
                loading="lazy"
              />
              {currentIndex === index && (
                <div className="absolute inset-0 bg-yellow-400/20"></div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Dot Indicators - Alternative for mobile */}
      {images.length > 1 && (
        <div className="flex justify-center mt-4 space-x-2 sm:hidden">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentIndex === index 
                  ? 'bg-yellow-400 w-8' 
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-yellow-300'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}