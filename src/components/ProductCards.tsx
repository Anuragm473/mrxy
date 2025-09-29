"use client";

import { useEffect, useState, useRef } from "react";

function ProductCard({ product }:{product:any}) {
  const { name, price, discountedPrice, images } = product;

  return (
    <div className="w-full flex-shrink-0 px-2">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <img
          src={images[0]}
          alt={name}
          className="w-full h-52 object-cover"
        />
        <span className="inline-block mt-2 ml-2 px-3 py-1 text-sm font-bold text-white bg-black rounded-full">
          Sale
        </span>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{name}</h3>
          <div className="flex gap-2 items-center">
            <span className="line-through text-gray-400">INR {price}</span>
            <span className="font-bold text-black">INR {discountedPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductCards() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [limit, setLimit] = useState(5);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const carouselRef = useRef<any>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) {
        setLimit(1);
      } else if (window.innerWidth < 1024) {
        setLimit(2);
      } else if (window.innerWidth < 1280) {
        setLimit(3);
      } else {
        setLimit(4);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, products.length - limit);

  const getPositionX = (e:any) => {
    return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
  };

  const handleDragStart = (e:any) => {
    setIsDragging(true);
    setStartPos(getPositionX(e));
    if (carouselRef.current) {
      carouselRef.current.style.cursor = "grabbing";
    }
  };

  const handleDragMove = (e:any) => {
    if (!isDragging) return;
    const currentPosition = getPositionX(e);
    const diff = currentPosition - startPos;
    setCurrentTranslate(prevTranslate + diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const movedBy = currentTranslate - prevTranslate;
    const threshold = 50;

    if (movedBy < -threshold && currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 1);
    } else if (movedBy > threshold && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }

    if (carouselRef.current) {
      carouselRef.current.style.cursor = "grab";
    }
  };

  useEffect(() => {
    const cardWidth = carouselRef.current?.offsetWidth / limit || 0;
    const newTranslate = -currentIndex * cardWidth;
    setPrevTranslate(newTranslate);
    setCurrentTranslate(newTranslate);
  }, [currentIndex, limit, products]);

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <section className="max-w-[1600px] m-auto py-12 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>

      <div className="relative overflow-hidden px-6">
        <div
          ref={carouselRef}
          className="flex select-none"
          style={{
            transform: `translateX(${currentTranslate}px)`,
            transition: isDragging ? "none" : "transform 0.5s ease-out",
            cursor: "grab",
          }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {products.map((product:any) => (
            <div
              key={product._id}
              style={{ width: `${100 / limit}%` }}
              className="flex-shrink-0"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-black text-white rounded-full disabled:opacity-50 hover:bg-gray-800 transition"
        >
          Prev
        </button>
        <div className="flex space-x-2">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition ${
                idx === currentIndex ? "bg-black w-6" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
        <button
          onClick={handleNext}
          disabled={currentIndex === maxIndex}
          className="px-4 py-2 bg-black text-white rounded-full disabled:opacity-50 hover:bg-gray-800 transition"
        >
          Next
        </button>
      </div>

      <div className="flex justify-center mt-8">
        <button className="px-8 py-3 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition">
          View All
        </button>
      </div>
    </section>
  );
}