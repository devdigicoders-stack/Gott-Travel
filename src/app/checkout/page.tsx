"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import {
  ShieldCheck,
  Calendar,
  Users,
  CheckCircle,
  CreditCard,
  ShoppingBag,
  ArrowRight,
  Sparkles
} from "lucide-react";

export default function CheckoutPage() {
  const { items, totalAmountAed, clearCart } = useCart();
  const { formatPrice } = useCurrency();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hotelPickup, setHotelPickup] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `OA-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(ref);
    setIsSubmitted(true);
    clearCart();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {isSubmitted ? (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#00A3C4] uppercase tracking-wider">
                Booking Confirmed
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A1E3F]">
                Thank you, {fullName}!
              </h1>
              <p className="text-sm text-gray-600">
                Your reservation reference is{" "}
                <strong className="text-[#0A1E3F]">{bookingRef}</strong>. A confirmation email has been sent to{" "}
                <strong className="text-[#0A1E3F]">{email}</strong>.
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-left text-xs space-y-2 text-gray-700">
              <div className="font-bold text-[#0A1E3F]">Important Information:</div>
              <p>• Your driver will contact you via WhatsApp (+971/international) 2 hours prior to pickup.</p>
              <p>• Pickup Location: {hotelPickup || "To be confirmed via WhatsApp"}.</p>
              <p>• Free cancellation remains valid up to 24 hours prior to departure.</p>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#0A1E3F] hover:bg-[#00A3C4] text-white font-bold rounded-2xl shadow-md transition-all text-xs"
            >
              <span>Back to Homepage</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : items.length === 0 ? (
          <div className="max-w-lg mx-auto bg-white rounded-3xl p-10 shadow-sm border border-gray-100 text-center space-y-4">
            <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto" />
            <h2 className="text-xl font-bold text-[#0A1E3F]">Your cart is empty</h2>
            <p className="text-xs text-gray-500">
              You haven&apos;t added any experiences yet. Browse our curated desert safaris and city tours to start booking.
            </p>
            <Link
              href="/"
              className="inline-block mt-2 px-6 py-3 bg-[#0A1E3F] text-white text-xs font-bold rounded-xl"
            >
              Browse Tours
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            {/* Form Column (2 Cols) */}
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#00A3C4] uppercase tracking-wider">
                  Secure Checkout
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A1E3F]">
                  Guest &amp; Pickup Details
                </h1>
              </div>

              <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Lead Traveler Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-hidden focus:border-[#00A3C4]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-hidden focus:border-[#00A3C4]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Phone / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+971 50 123 4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-hidden focus:border-[#00A3C4]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Hotel Name or Pickup Address *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Atlantis The Palm, Dubai"
                      value={hotelPickup}
                      onChange={(e) => setHotelPickup(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-hidden focus:border-[#00A3C4]"
                    />
                  </div>
                </div>

                {/* Payment Selection */}
                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <label className="text-xs font-bold text-gray-700 block">Payment Method</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <label
                      className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                        paymentMethod === "card"
                          ? "border-[#00A3C4] bg-cyan-50/30 text-[#0A1E3F]"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={() => setPaymentMethod("card")}
                        className="text-[#00A3C4]"
                      />
                      <CreditCard className="w-4 h-4 text-[#00A3C4]" />
                      <span className="font-semibold">Credit / Debit Card (Instant)</span>
                    </label>

                    <label
                      className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                        paymentMethod === "later"
                          ? "border-[#00A3C4] bg-cyan-50/30 text-[#0A1E3F]"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="later"
                        checked={paymentMethod === "later"}
                        onChange={() => setPaymentMethod("later")}
                        className="text-[#00A3C4]"
                      />
                      <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                      <span className="font-semibold">Reserve Now &amp; Pay Later</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-[#00A3C4] to-[#0284C7] hover:from-[#0284C7] hover:to-[#0A1E3F] text-white font-bold rounded-2xl shadow-lg transition-all text-sm"
                >
                  Complete Reservation ({formatPrice(totalAmountAed)})
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>256-bit SSL Encrypted • Zero booking fees • Free cancellation</span>
                </div>
              </form>
            </div>

            {/* Order Summary (1 Col) */}
            <div className="lg:col-span-1 bg-white rounded-3xl p-6 border border-gray-100 shadow-md space-y-6">
              <h3 className="text-base font-bold text-[#0A1E3F] border-b border-gray-100 pb-3">
                Order Summary ({items.length})
              </h3>

              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="space-y-1.5 pb-4 border-b border-gray-100 text-xs">
                    <div className="font-bold text-[#0A1E3F]">{item.experience.title}</div>
                    <div className="flex items-center gap-3 text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#00A3C4]" />
                        {item.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-[#00A3C4]" />
                        {item.adults} Adults {item.children > 0 && `• ${item.children} Ch.`}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-gray-400">{item.timeSlot}</span>
                      <span className="font-bold text-[#0A1E3F]">{formatPrice(item.totalPrice)}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalAmountAed)}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Booking Fee &amp; VAT</span>
                  <span className="text-emerald-600 font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-base font-black text-[#0A1E3F] pt-3 border-t border-gray-100">
                  <span>Total Due</span>
                  <span className="text-[#00A3C4] text-xl">{formatPrice(totalAmountAed)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
