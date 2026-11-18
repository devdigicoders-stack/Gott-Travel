"use client";

import React, { createContext, useContext, useState, useSyncExternalStore } from "react";
import { Experience } from "@/types";

export interface CartItem {
  id: string;
  experience: Experience;
  date: string;
  timeSlot: string;
  adults: number;
  children: number;
  totalPrice: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalCount: number;
  totalAmountAed: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const EMPTY_CART: CartItem[] = [];

let cachedRawCart = "";
let cachedCartItems: CartItem[] = EMPTY_CART;

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("gottqatar_cart_change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("gottqatar_cart_change", callback);
  };
}

function getSnapshot(): CartItem[] {
  if (typeof window === "undefined") return EMPTY_CART;
  const raw = localStorage.getItem("gottqatar_cart") || "[]";
  if (raw !== cachedRawCart) {
    cachedRawCart = raw;
    try {
      cachedCartItems = JSON.parse(raw);
    } catch {
      cachedCartItems = EMPTY_CART;
    }
  }
  return cachedCartItems;
}

function getServerSnapshot(): CartItem[] {
  return EMPTY_CART;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const saveItems = (newItems: CartItem[]) => {
    const raw = JSON.stringify(newItems);
    cachedRawCart = raw;
    cachedCartItems = newItems;
    localStorage.setItem("gottqatar_cart", raw);
    window.dispatchEvent(new Event("gottqatar_cart_change"));
  };

  const addItem = (item: CartItem) => {
    const updated = [...items, item];
    saveItems(updated);
    setIsCartOpen(true);
  };

  const removeItem = (id: string) => {
    const updated = items.filter((i) => i.id !== id);
    saveItems(updated);
  };

  const clearCart = () => {
    saveItems([]);
  };

  const totalCount = items.length;
  const totalAmountAed = items.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        totalCount,
        totalAmountAed,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
