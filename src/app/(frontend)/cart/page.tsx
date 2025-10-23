"use client";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartWithProducts, setCartWithProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // Fetch product data for cart items
  useEffect(() => {
    const fetchProductData = async () => {
      if (!cart || cart.length === 0) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Create an array of promises to fetch product data
        const productPromises = cart.map(async (cartItem: any) => {
          try {
            console.log(cartItem)
            const response = await fetch(`/api/products/product/${cartItem.productId}`);
            if (!response.ok) {
              throw new Error(`Failed to fetch product ${cartItem.productId}`);
            }
            const productData = await response.json();

            // Combine cart item with product data
            return {
              ...cartItem,
              product: productData
            };
          } catch (error) {
            console.error(`Error fetching product ${cartItem.productId}:`, error);
            return {
              ...cartItem,
              product: null,
              error: `Failed to load product`
            };
          }
        });

        const results: any = await Promise.all(productPromises);
        setCartWithProducts(results);
      } catch (error) {
        console.error('Error fetching cart products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [cart]);

  const subtotal = cartWithProducts.reduce((sum, item: any) => {
    if (!item.product) return sum;
    const price = item.product.discountedPrice || item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;
  const savings = cartWithProducts.reduce((sum, item: any) => {
    if (!item.product || !item.product.discountedPrice) return sum;
    return sum + (item.product.price - item.product.discountedPrice) * item.quantity;
  }, 0);

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    try {
      // Add your order processing logic here
      console.log("Processing order...");
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Redirect to success page or show success message
    } catch (error) {
      console.error("Order failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-black mx-auto mb-4"></div>
            <p className="text-gray-600 text-sm sm:text-base">Loading your cart...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-6 sm:mb-8 border-2 border-red-500 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-black mb-4">Error Loading Cart</h1>
            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-6 sm:px-8 py-2.5 sm:py-3 bg-black text-white font-medium hover:bg-gray-800 transition-colors duration-200 text-sm sm:text-base"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Empty cart state
  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-6 sm:mb-8 border-2 border-black rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-black mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base px-4">Looks like you haven't added any items to your cart yet.</p>
            <Link
              href="/products"
              className="inline-flex items-center px-6 sm:px-8 py-2.5 sm:py-3 bg-black text-white font-medium hover:bg-gray-800 transition-colors duration-200 text-sm sm:text-base"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-12">
        {/* Header */}
        <div className="border-b border-gray-200 pb-4 sm:pb-6 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-black">Shopping Cart</h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
            {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8 xl:gap-12">
          {/* Cart Items */}
          <div className="xl:col-span-2 space-y-4 sm:space-y-6">
            {cartWithProducts.map((item: any) => {
              // Handle case where product data failed to load
              if (!item.product) {
                return (
                  <div key={item._id} className="border-b border-gray-200 pb-4 sm:pb-6">
                    <div className="flex gap-3 sm:gap-6">
                      <div className="w-20 h-20 sm:w-32 sm:h-32 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-500 text-xs sm:text-sm">No Image</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-red-500 mb-2 text-sm sm:text-base">
                          {item.error || 'Product not found'}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="text-gray-500 hover:text-black transition-colors text-xs sm:text-sm font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }

              const itemPrice = item.product.discountedPrice || item.product.price;
              const hasDiscount = item.product.discountedPrice && item.product.discountedPrice < item.product.price;

              return (
                <div key={item._id} className="border-b border-gray-200 pb-4 sm:pb-6">
                  <div className="flex gap-3 sm:gap-6">
                    {/* Product Image */}
                    <div className="w-20 h-20 sm:w-32 sm:h-32 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.images?.[0] || '/placeholder-image.jpg'}
                        alt={item.product.name || 'Product'}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-xl font-semibold text-black mb-1 sm:mb-2 line-clamp-2 sm:truncate">
                        {item.product.name || 'Unknown Product'}
                      </h3>

                      {item.product.description && (
                        <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2 hidden sm:block">
                          {item.product.description}
                        </p>
                      )}

                      {/* Price */}
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-3 sm:mb-4">
                        <span className="text-base sm:text-lg font-bold text-black">₹{itemPrice?.toLocaleString()}</span>
                        {hasDiscount && (
                          <>
                            <span className="text-gray-500 line-through text-sm">₹{item.product.price?.toLocaleString()}</span>
                            <span className="text-green-600 text-xs sm:text-sm font-medium">
                              {Math.round(((item.product.price - item.product.discountedPrice) / item.product.price) * 100)}% off
                            </span>
                          </>
                        )}
                      </div>

                      {/* Mobile Layout: Stack quantity and remove */}
                      <div className="sm:hidden space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <label className="text-xs font-medium text-gray-700">Qty:</label>
                            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden shadow-sm">
                              <button
                                onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                                className="px-2 py-1 text-sm font-semibold text-gray-700 hover:bg-gray-200 active:bg-gray-300 disabled:opacity-40 transition-all duration-150"
                                disabled={item.quantity <= 1}
                              >
                                −
                              </button>
                              <input
                                type="number"
                                min={1}
                                max={10}
                                value={item.quantity}
                                onChange={(e) => {
                                  const value = parseInt(e.target.value) || 1;
                                  updateQuantity(item.productId, Math.max(1, Math.min(10, value)));
                                }}
                                className="w-12 text-center py-1 border-l border-r border-gray-300 text-sm font-medium focus:outline-none text-gray-700"
                              />
                              <button
                                onClick={() => updateQuantity(item.productId, Math.min(10, item.quantity + 1))}
                                className="px-2 py-1 text-sm font-semibold text-gray-700 hover:bg-gray-200 active:bg-gray-300 disabled:opacity-40 transition-all duration-150"
                                disabled={item.quantity >= 10}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <span className="text-sm font-semibold text-black">
                            ₹{(itemPrice * item.quantity).toLocaleString()}
                          </span>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="text-red-500 hover:text-red-700 transition-all duration-200 text-xs font-medium"
                        >
                          Remove
                        </button>
                      </div>

                      {/* Desktop Layout: Side by side quantity and remove */}
                      <div className="hidden sm:flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm">
                        {/* Quantity Section */}
                        <div className="flex items-center space-x-3">
                          <label className="text-sm font-medium text-gray-700">Qty:</label>
                          <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                              className="px-3 py-2 text-gray-700 hover:bg-yellow-400 hover:text-black transition-all font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              min={1}
                              max={10}
                              value={item.quantity}
                              onChange={(e) => {
                                const value = parseInt(e.target.value) || 1;
                                updateQuantity(item.productId, Math.max(1, Math.min(10, value)));
                              }}
                              className="w-12 text-center py-2 text-gray-900 font-medium bg-white focus:outline-none"
                            />
                            <button
                              onClick={() => updateQuantity(item.productId, Math.min(10, item.quantity + 1))}
                              className="px-3 py-2 text-gray-700 hover:bg-yellow-400 hover:text-black transition-all font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
                              disabled={item.quantity >= 10}
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="text-sm font-semibold text-gray-600 hover:text-red-500 transition-colors duration-200"
                        >
                          Remove
                        </button>
                      </div>

                      {/* Item Total - Desktop only */}
                      <div className="mt-3 text-right hidden sm:block">
                        <span className="text-lg font-semibold text-black">
                          ₹{(itemPrice * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Clear Cart */}
            <div className="pt-2 sm:pt-4">
              <button
                onClick={clearCart}
                className="text-gray-500 hover:text-black transition-colors text-xs sm:text-sm font-medium"
              >
                Clear entire cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="xl:col-span-1 order-first xl:order-last">
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg xl:sticky xl:top-8">
              <h2 className="text-lg sm:text-xl font-bold text-black mb-4 sm:mb-6">Order Summary</h2>

              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                </div>

                {savings > 0 && (
                  <div className="flex justify-between text-green-600 text-sm sm:text-base">
                    <span>You Save</span>
                    <span className="font-semibold">-₹{savings.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-700">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>

                {subtotal < 999 && (
                  <p className="text-xs sm:text-sm text-gray-600">
                    Add ₹{(999 - subtotal).toLocaleString()} more for free shipping
                  </p>
                )}

                <div className="border-t border-gray-300 pt-3 sm:pt-4">
                  <div className="flex justify-between text-base sm:text-lg font-bold text-black">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Actions */}
              <div className="space-y-3 sm:space-y-4">
                {isAuthenticated ? (
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="w-full bg-black text-white py-2.5 sm:py-3 px-4 sm:px-6 font-medium hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    {isProcessing ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-3 w-3 sm:h-4 sm:w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      'Place Order'
                    )}
                  </button>
                ) : (
                  <div className="space-y-2 sm:space-y-3">
                    <p className="text-xs sm:text-sm text-gray-600 text-center px-2">
                      Please sign in to continue with checkout
                    </p>
                    <Link
                      href="/login"
                      className="block w-full bg-black text-white py-2.5 sm:py-3 px-4 sm:px-6 font-medium text-center hover:bg-gray-800 transition-colors duration-200 text-sm sm:text-base"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      className="block w-full border border-black text-black py-2.5 sm:py-3 px-4 sm:px-6 font-medium text-center hover:bg-black hover:text-white transition-colors duration-200 text-sm sm:text-base"
                    >
                      Create Account
                    </Link>
                  </div>
                )}

                <Link
                  href="/products"
                  className="block w-full text-center py-2.5 sm:py-3 px-4 sm:px-6 border border-gray-300 text-gray-700 font-medium hover:border-black hover:text-black transition-colors duration-200 text-sm sm:text-base"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Security Badge */}
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-300">
                <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm text-gray-600">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Secure checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}