"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { X, Trash2, Calendar, Users, ShoppingBag } from "lucide-react";
import Link from "next/link";

export function CartDrawer() {
  const { items, removeItem, isCartOpen, setIsCartOpen, totalAmountAed } = useCart();
  const { formatPrice } = useCurrency();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="relative z-10 w-full max-w-md bg-white h-full shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#00A3C4]" />
            <h2 className="text-lg font-semibold text-[#0A1E3F]">Your Bookings ({items.length})</h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 space-y-3">
              <ShoppingBag className="w-12 h-12 text-gray-300" />
              <p className="font-medium">Your cart is empty</p>
              <p className="text-sm text-gray-400">Explore our curated desert safaris and city tours to start booking.</p>
              <Link
                href="/"
                onClick={() => setIsCartOpen(false)}
                className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0097CA] hover:bg-[#0085B2] text-white text-xs font-bold transition-all"
              >
                <span>Explore Home Page</span>
                <span>→</span>
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex flex-col gap-2"
              >
                <div className="flex justify-between items-start gap-2">
                  <h4 className="text-sm font-semibold text-[#0A1E3F] line-clamp-2">
                    {item.experience.title}
                  </h4>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#00A3C4]" />
                    {item.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#00A3C4]" />
                    {item.adults} Adults {item.children > 0 && `• ${item.children} Children`}
                  </span>
                </div>

                <div className="flex justify-between items-center mt-1 pt-2 border-t border-gray-200/60">
                  <span className="text-xs text-gray-500">{item.timeSlot}</span>
                  <span className="text-sm font-bold text-[#0A1E3F]">
                    {formatPrice(item.totalPrice)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t border-gray-100 bg-gray-50/50 space-y-3">
            <div className="flex justify-between text-base font-bold text-[#0A1E3F]">
              <span>Total</span>
              <span className="text-lg text-[#00A3C4]">{formatPrice(totalAmountAed)}</span>
            </div>
            <p className="text-xs text-gray-500">Taxes and booking fees included • Free cancellation</p>
            <Link
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="block w-full py-3 bg-[#0A1E3F] hover:bg-[#162E56] text-white text-center font-medium rounded-xl transition-all shadow-md"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
