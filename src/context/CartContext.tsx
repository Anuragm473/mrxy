"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Check authentication status reactively
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      setIsLoggedIn(!!token);
    };

    checkAuthStatus();

    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "token") {
        checkAuthStatus();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ✅ Load cart when authentication status changes
  useEffect(() => {
    if (isLoggedIn) {
      fetchCartFromBackend();
    } else {
      // Load from localStorage for guest users
      const savedCart = localStorage.getItem("cart");
      setCart(savedCart ? JSON.parse(savedCart) : []);
      setLoading(false);
    }
  }, [isLoggedIn]);

  // ✅ Sync guest cart to localStorage (only for guest users)
  useEffect(() => {
    if (!isLoggedIn && !loading) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isLoggedIn, loading]);

  // --- BACKEND HANDLERS ---
  const fetchCartFromBackend = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data);
    } catch (error:any) {
      console.error("Error fetching cart", error);
      // If token is invalid, clear it and switch to guest mode
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product: any) => {
    try {
      if (isLoggedIn) {
        const token = localStorage.getItem("token");
        const res = await axios.post(
          "/api/cart/add",
          { productId: product.productId, quantity: product.quantity || 1 },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCart(res.data);
      } else {
        const existing = cart.find((item) => item.productId === product.productId);
        if (existing) {
          setCart(
            cart.map((item) =>
              item.productId === product.productId
                ? { ...item, quantity: item.quantity + (product.quantity || 1) }
                : item
            )
          );
        } else {
          setCart([...cart, { ...product, quantity: product.quantity || 1 }]);
        }
      }
    } catch (error:any) {
      console.error("Error adding to cart", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
    }
  };

  const updateQuantity = async (productId: string, newQty: number) => {
    
    if (newQty <= 0) {
      return removeFromCart(productId);
    }

    try {
      if (isLoggedIn) {
        const token = localStorage.getItem("token");
        const res = await axios.put(
          "/api/cart",
          { productId, quantity: newQty },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCart(res.data);
      } else {
        setCart(
          cart.map((item) =>
            item.productId === productId ? { ...item, quantity: newQty } : item
          )
        );
      }
    } catch (error:any) {
      console.error("Error updating quantity", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      if (isLoggedIn) {
        const token = localStorage.getItem("token");
        const res = await axios.delete(`/api/cart/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCart(res.data);
      } else {
        setCart(cart.filter((item) => item.productId !== productId));
      }
    } catch (error:any) {
      console.error("Error removing from cart", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
    }
  };

  // ✅ Clear cart
  const clearCart = async () => {
    try {
      if (isLoggedIn) {
        const token = localStorage.getItem("token");
        await axios.delete("/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        localStorage.removeItem("cart");
      }
      setCart([]);
    } catch (error:any) {
      console.error("Error clearing cart", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
    }
  };

  // Method to manually refresh auth status (call this after login/logout)
  const refreshAuthStatus = () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    setIsLoggedIn(!!token);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        setCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        loading,
        isLoggedIn,
        refreshAuthStatus, // Expose this for manual auth refresh
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);