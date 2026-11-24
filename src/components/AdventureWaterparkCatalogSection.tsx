"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import experiencesData from "@/data/experiences.json";
import { Experience } from "@/types";
import { Plus, Check, ArrowRight } from "lucide-react";

interface AdventureWaterparkCatalogProps {
  className?: string;
  showHeading?: boolean;
}

const ADVENTURE_WATERPARK_PRICES: Record<string, string> = {
  "doha-fishing-tour-10-hours": "QAR 2,000.00",
  "meryal-waterpark-ultimate-water-adventure": "QAR 300.00",
  "desert-falls-water-adventure-park": "QAR 400.00",
  "jet-ski-adventure-in-doha": "QAR 300.00",
  "parasailing-experience-in-doha": "QAR 250.00",
  "snow-theme-park-qatar-snow-dunes": "QAR 200.00",
};

export function AdventureWaterparkCatalogSection({
  className = "",
  showHeading = true,
}: AdventureWaterparkCatalogProps) {
  const router = useRouter();
  const { language } = useLanguage();
  const { addItem } = useCart();
  const [addedSlug, setAddedSlug] = useState<string | null>(null);

  // All 6 Adventure & Water Park catalog tours matching WhatsApp catalog
  const catalogTours = (experiencesData as unknown as Experience[]).filter((exp) =>
    [
      "doha-fishing-tour-10-hours",
      "meryal-waterpark-ultimate-water-adventure",
      "desert-falls-water-adventure-park",
      "jet-ski-adventure-in-doha",
      "parasailing-experience-in-doha",
      "snow-theme-park-qatar-snow-dunes",
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
          {/* Header matching screenshot: ADVENTURE & WATER PARK TOURS | See all */}
          {showHeading && (
            <div className="flex items-center justify-between gap-4 mb-5 sm:mb-6 border-b border-white/10 pb-4">
              <h2 className="text-base sm:text-lg md:text-xl font-extrabold tracking-wider uppercase text-white font-sans">
                {language === "ar"
                  ? "جولات المغامرات والحدائق المائية"
                  : "ADVENTURE & WATER PARK TOURS"}
              </h2>
              <Link
                href="/experiences?destination=Doha&category=Adventure"
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
                  {/* Left: HD Photo in rounded square matching screenshot */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 shadow-sm border border-white/15 bg-gray-900">
                    <Image
                      src={tour.images[0]}
                      alt={title}
                      fill
                      sizes="80px"
                      className="object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                  </div>

                  {/* Middle: Title, Snippet, and Exact QAR Price */}
                  <div className="flex-1 min-w-0 pr-2">
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#38bdf8] transition-colors truncate leading-tight">
                      {title}
                    </h3>

                    <p className="text-xs sm:text-[13px] text-gray-400 truncate mt-1 leading-snug">
                      {snippet}
                    </p>

                    <div className="mt-1.5 sm:mt-2">
                      <span className="text-sm sm:text-base font-bold text-white tracking-tight">
                        {ADVENTURE_WATERPARK_PRICES[tour.slug] || "QAR 300.00"}
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
                ? "معدات صيد وركوب أمواج حديثة مع مدربين وقباطنة بحريين معتمدين"
                : "Top-grade marine gear, licensed boat captains & certified watersport instructors"}
            </span>
            <Link
              href="/experiences?destination=Doha&category=Adventure"
              className="text-[#38bdf8] hover:underline font-semibold flex items-center gap-1"
            >
              <span>{language === "ar" ? "استكشف جميع الأنشطة المائية" : "Explore All Adventure & Water Park Tours"}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
