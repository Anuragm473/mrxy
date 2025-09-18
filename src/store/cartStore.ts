import { create } from "zustand";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addToCart: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.productId === item.productId);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.productId === item.productId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, item] };
    }),
  removeFromCart: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.productId !== id),
    })),
  updateQuantity: (id, qty) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.productId === id ? { ...i, quantity: qty } : i
      ),
    })),
  clearCart: () => set({ items: [] }),
}));
