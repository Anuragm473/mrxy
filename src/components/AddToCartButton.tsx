"use client";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";

export default function AddToCartButton({
  productId,
  name,
  price,
  discountedPrice,
  image,
}: any) {
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();
  const [quantity, setQuantity] = useState(0);

  // Check if product already in cart
  useEffect(() => {
    const existing = cart?.find((item: any) => item.productId === productId);
    setQuantity(existing ? existing.quantity : 0);
  }, [cart, productId]);

  const handleAdd = () => {
    if (quantity === 0) {
      addToCart({
        productId: productId,
        name: name,
        price: price,
        quantity: 1,
        image: image,
      });
    } else {
      updateQuantity(productId, quantity + 1);
    }
  };

  const handleReduce = () => {
    if (quantity > 1) {
      updateQuantity(productId, quantity - 1);
    } else {
      removeFromCart(productId);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {quantity === 0 ? (
        <button
          onClick={handleAdd}
          className="px-5 py-2 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-400 transition-all shadow-md"
        >
          Add to Cart
        </button>
      ) : (
        <div className="flex items-center border border-yellow-500 rounded-full overflow-hidden shadow-md">
          <button
            onClick={handleReduce}
            className="px-3 py-1 bg-black text-yellow-500 font-bold hover:bg-gray-900 transition-all"
          >
            −
          </button>
          <span className="px-4 text-black font-semibold bg-white">
            {quantity}
          </span>
          <button
            onClick={handleAdd}
            className="px-3 py-1 bg-black text-yellow-500 font-bold hover:bg-gray-900 transition-all"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}
