"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useCart } from "@/context/CartContext";
import experiencesData from "@/data/experiences.json";
import { Experience } from "@/types";
import { Plus, Check, ArrowRight } from "lucide-react";

interface QatarCityCatalogProps {
  className?: string;
  showHeading?: boolean;
}

const QATAR_CATALOG_PRICES: Record<string, string> = {
  "lusail-city-tour-4-hours": "QAR 485.00",
  "full-day-doha-city-tour-6-hours": "QAR 600.00",
  "doha-express-city-tour-4-hours": "QAR 446.00",
  "fifa-stadiums-tour-4-hours": "QAR 350.00",
  "exclusive-shopping-tour-4-hours": "QAR 200.00",
  "banana-island-day-tour-doha": "QAR 300.00",
  "katara-cultural-tour-2-hours": "QAR 200.00",
};

export function QatarCityCatalogSection({
  className = "",
  showHeading = true,
}: QatarCityCatalogProps) {
  const router = useRouter();
  const { language } = useLanguage();
  const { addItem } = useCart();
  const [addedSlug, setAddedSlug] = useState<string | null>(null);

  // Qatar City & Highlights catalog tours
  const catalogTours = (experiencesData as unknown as Experience[]).filter((exp) =>
    [
      "lusail-city-tour-4-hours",
      "full-day-doha-city-tour-6-hours",
      "doha-express-city-tour-4-hours",
      "fifa-stadiums-tour-4-hours",
      "exclusive-shopping-tour-4-hours",
      "banana-island-day-tour-doha",
      "katara-cultural-tour-2-hours",
    ].includes(exp.slug)
  );

  const handleQuickAdd = (e: React.MouseEvent, exp: Experience) => {
    e.preventDefault();
    e.stopPropagation();

    const todayStr = new Date().toISOString().split("T")[0];
    const bookingId = `${exp.id}-${todayStr}-catalog`;
    addItem({
      id: bookingId,
      experience: exp,
      date: todayStr,
      timeSlot: exp.itinerary[0]?.time || "09:00 AM",
      adults: 1,
      children: 0,
      totalPrice: exp.price,
    });

    setAddedSlug(exp.slug);
    setTimeout(() => {
      setAddedSlug(null);
    }, 2000);
  };

  return (
    <section className={`w-full py-8 sm:py-12 ${className}`}>
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-10">
        <div className="bg-[#121417] text-white rounded-3xl p-5 sm:p-7 md:p-9 shadow-2xl border border-white/10">
          {/* Header matching screenshot: QATAR CITY TOURS & EXPERIENCES | See all */}
          {showHeading && (
            <div className="flex items-center justify-between gap-4 mb-5 sm:mb-6 border-b border-white/10 pb-4">
              <h2 className="text-base sm:text-lg md:text-xl font-extrabold tracking-wider uppercase text-white font-sans">
                {language === "ar"
                  ? "جولات وتجارب مدينة قطر"
                  : "QATAR CITY TOURS & EXPERIENCES"}
              </h2>
              <Link
                href="/experiences?destination=Doha&category=City"
                className="text-sm sm:text-base font-bold text-[#22c55e] hover:text-[#16a34a] transition-colors flex items-center gap-1 shrink-0"
              >
                <span>{language === "ar" ? "عرض الكل" : "See all"}</span>
                <span className="text-xs">→</span>
              </Link>
            </div>
          )}

          {/* 3 Catalog Cards matching screenshot layout */}
          <div className="space-y-3 sm:space-y-4">
            {catalogTours.map((tour) => {
              const isAdded = addedSlug === tour.slug;
              const title = language === "ar" && tour.titleAr ? tour.titleAr : tour.title;
              const snippet =
                language === "ar" && tour.shortDescriptionAr
                  ? tour.shortDescriptionAr
                  : tour.shortDescription;

              return (
                <div
                  key={tour.id}
                  onClick={() => router.push(`/experiences/${tour.slug}`)}
                  className="group relative bg-[#1c1f24] hover:bg-[#23272e] border border-white/10 hover:border-white/20 rounded-2xl sm:rounded-2xl p-3 sm:p-4.5 transition-all duration-300 flex items-center justify-between gap-3 sm:gap-5 cursor-pointer shadow-md hover:shadow-xl"
                >
                  {/* Left: White rounded square with Gott Qatar logo */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl p-1.5 flex items-center justify-center shrink-0 shadow-sm overflow-hidden border border-gray-100">
                    <Image
                      src="/brand/logo-blue.png"
                      alt={title}
                      fill
                      sizes="80px"
                      className="object-contain p-1.5 group-hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* Middle: Title, Snippet, and Price */}
                  <div className="flex-1 min-w-0 pr-2">
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#38bdf8] transition-colors truncate leading-tight">
                      {title}
                    </h3>

                    <p className="text-xs sm:text-[13px] text-gray-400 truncate mt-1 leading-snug">
                      {snippet}
                    </p>

                    <div className="mt-1.5 sm:mt-2">
                      <span className="text-sm sm:text-base font-bold text-white tracking-tight">
                        {QATAR_CATALOG_PRICES[tour.slug] || "QAR 485.00"}
                      </span>
                    </div>
                  </div>

                  {/* Right: Plus (+) / Check button */}
                  <button
                    type="button"
                    onClick={(e) => handleQuickAdd(e, tour)}
                    title={isAdded ? "Added to Cart!" : "Add to Booking"}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 transition-all cursor-pointer border ${
                      isAdded
                        ? "bg-emerald-600 text-white border-emerald-500 shadow-md"
                        : "bg-white/10 hover:bg-white/20 text-white border-white/20 hover:scale-105"
                    }`}
                  >
                    {isAdded ? (
                      <Check className="w-5 h-5 text-white animate-in zoom-in" />
                    ) : (
                      <Plus className="w-5 h-5 text-white/90" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Bottom Trust bar */}
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-gray-400 gap-2">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {language === "ar"
                ? "تأكيد فوري ودفع آمن بالريال القطري"
                : "Instant confirmation & secure checkout in QAR"}
            </span>
            <Link
              href="/destinations/doha"
              className="text-[#38bdf8] hover:underline font-semibold flex items-center gap-1"
            >
              <span>{language === "ar" ? "استكشف دليل الدوحة" : "Explore Doha Destination Guide"}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
