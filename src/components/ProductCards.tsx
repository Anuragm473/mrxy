"use client";

// app/components/ProductCard.jsx
function ProductCard({ product }:{product:any}) {
  const { name, price, discountedPrice, images } = product;

  return (
    <div className="w-74 flex-shrink-0 p-4">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Product Image */}
        <img
          src={images[0]}
          alt={name}
          className="w-full h-52 object-cover"
        />

        {/* Sale Tag */}
        <span className="inline-block mt-2 ml-2 px-3 py-1 text-sm font-bold text-white bg-black rounded-full">
          Sale
        </span>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{name}</h3>
          <div className="flex gap-2 items-center">
            <span className="line-through text-gray-400">
              INR {price}
            </span>
            <span className="font-bold text-black">
              INR {discountedPrice}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}


import { useEffect, useState } from "react";

export default function ProductCards() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [limit,setLimit] = useState(5);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res =await fetch("/api/products");
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
        // Mobile
        setLimit(3);
      } else if (window.innerWidth < 1024) {
        // Tablet
        setLimit(4);
      } else {
        // Laptop / Desktop
        setLimit(5);
      }
    }

    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const handleNext = () => {
    if ((page + 1) * limit < products.length) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <section className="max-w-[1600px] m-auto py-12 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8">
        Featured Products
      </h2>

      {/* Wrapper */}
      <div className="relative overflow-hidden px-6">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${page * 100}%)`,
            width: `${Math.ceil(products.length / limit) * 100}%`,
          }}
        >
          {Array.from({ length: Math.ceil(products.length / limit) }).map(
            (_, idx) => (
              <div key={idx} className="flex w-full flex-shrink-0 space-x-4">
                {products
                  .slice(idx * limit, idx * limit + limit)
                  .map((product:any) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
              </div>
            )
          )}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          onClick={handlePrev}
          disabled={page === 0}
          className="px-4 py-2 bg-black text-white rounded-full disabled:opacity-50"
        >
          Prev
        </button>
        <span className="font-semibold">
          {page + 1} / {Math.ceil(products.length / limit)}
        </span>
        <button
          onClick={handleNext}
          disabled={(page + 1) * limit >= products.length}
          className="px-4 py-2 bg-black text-white rounded-full disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* View All Button */}
      <div className="flex justify-center mt-8">
        <button className="px-8 py-3 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition">
          View All
        </button>
      </div>
    </section>
  );
}
