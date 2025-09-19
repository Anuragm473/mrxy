"use client";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";

export default function AddToCartButton({productId,name,price,discountedPrice,image}:any) {
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();
  const [quantity, setQuantity] = useState(0);

  // Check if product already in cart
  useEffect(() => {
    const existing = cart?.find((item:any) => item.productId === productId);
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
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Add to Cart
        </button>
      ) : (
        <div className="flex items-center border rounded">
          <button
            onClick={handleReduce}
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
          >
            -
          </button>
          <span className="px-4">{quantity}</span>
          <button
            onClick={handleAdd}
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}
