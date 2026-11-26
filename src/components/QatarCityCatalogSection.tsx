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

const CATALOG_CATEGORIES = [
  { id: "city", labelEn: "City Tours & Highlights", labelAr: "جولات المدينة والمعالم", filter: ["lusail-city-tour-4-hours", "full-day-doha-city-tour-6-hours", "doha-express-city-tour-4-hours", "fifa-stadiums-tour-4-hours", "exclusive-shopping-tour-4-hours", "banana-island-day-tour-doha", "katara-cultural-tour-2-hours"] },
  { id: "desert", labelEn: "Desert Safari", labelAr: "رحلات السفاري الصحراوية", filter: ["overnight-desert-safari-qatar", "sunrise-desert-safari", "sunset-desert-safari", "full-day-desert-safari-with-quad-bike-inland-sea", "half-day-desert-safari-inland-sea-qatar"] },
  { id: "adventure", labelEn: "Adventure & Water Parks", labelAr: "المغامرات والمدن المائية", filter: ["doha-fishing-tour-10-hours", "meryal-waterpark-ultimate-water-adventure", "jet-ski-adventure-in-doha", "parasailing-experience-in-doha", "desert-falls-water-adventure-park", "snow-theme-park-qatar-snow-dunes"] },
  { id: "museum", labelEn: "Museums & Culture", labelAr: "المتاحف والثقافة", filter: ["sheikh-faisal-museum-camel-track-tour", "full-day-museum-tour-6-hours", "museum-of-illusions-doha"] },
  { id: "combo", labelEn: "Combo Tours", labelAr: "الجولات المدمجة", filter: ["doha-city-tour-with-dhow-cruise-4-5-hours", "zubara-north-coast-tour-with-kayaking-7-hours", "doha-city-tour-with-desert-safari-7-hours"] },
  { id: "beyond", labelEn: "Beyond Doha", labelAr: "خارج الدوحة", filter: ["panda-house-al-khor-with-zoo-tour-4-hours", "dukhan-west-coast-tour-4-hours", "purple-island-kayaking-tour-4-hours"] },
  { id: "all", labelEn: "All 27 Tours", labelAr: "جميع الـ 27 جولة", filter: [] }
];

export function QatarCityCatalogSection({
  className = "",
  showHeading = true,
}: QatarCityCatalogProps) {
  const router = useRouter();
  const { language } = useLanguage();
  const { formatPrice } = useCurrency();
  const { addItem } = useCart();
  const [activeTab, setActiveTab] = useState<string>("city");
  const [addedSlug, setAddedSlug] = useState<string | null>(null);

  const allTours = experiencesData as unknown as Experience[];
  const currentCategory = CATALOG_CATEGORIES.find((c) => c.id === activeTab) || CATALOG_CATEGORIES[0];

  const filteredTours = activeTab === "all"
    ? allTours
    : allTours.filter((t) => currentCategory.filter.includes(t.slug));

  const handleQuickAdd = (e: React.MouseEvent, exp: Experience) => {
    e.preventDefault();
    e.stopPropagation();

    const todayStr = new Date().toISOString().split("T")[0];
    const bookingId = `${exp.id}-${todayStr}-catalog`;
    addItem({
      id: bookingId,
      experience: exp,
      date: todayStr,
      timeSlot: exp.itinerary?.[0]?.time || "09:00 AM",
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
          {/* Header matching WhatsApp Catalog style */}
          {showHeading && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 sm:mb-6 border-b border-white/10 pb-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">
                  {language === "ar" ? "كتالوج واتساب الرسمي" : "Official Qatar WhatsApp Catalog"}
                </span>
                <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-wider uppercase text-white font-sans mt-0.5">
                  {language === "ar" ? "كتالوج جولات قطر الرسمية" : "QATAR TOURS & EXPERIENCES"}
                </h2>
              </div>
              <Link
                href="/experiences"
                className="text-sm sm:text-base font-bold text-[#22c55e] hover:text-[#16a34a] transition-colors flex items-center gap-1 shrink-0 self-start sm:self-auto"
              >
                <span>{language === "ar" ? "عرض كل الـ 27 جولة" : "See all 27 tours"}</span>
                <span className="text-xs">→</span>
              </Link>
            </div>
          )}

          {/* Catalog Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none border-b border-white/5">
            {CATALOG_CATEGORIES.map((cat) => {
              const isActive = activeTab === cat.id;
              const label = language === "ar" ? cat.labelAr : cat.labelEn;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-white text-gray-900 shadow-md font-bold scale-[1.02]"
                      : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Catalog Cards matching screenshot layout */}
          <div className="space-y-3 sm:space-y-4">
            {filteredTours.map((tour) => {
              const isAdded = addedSlug === tour.slug;
              const title = language === "ar" && tour.titleAr ? tour.titleAr : tour.title;
              const snippet =
                language === "ar" && tour.shortDescriptionAr
                  ? tour.shortDescriptionAr
                  : tour.shortDescription;
              const tourImage = (tour as any).image || tour.images?.[0] || "/images/dest_doha.jpg";

              return (
                <div
                  key={tour.id}
                  onClick={() => router.push(`/experiences/${tour.slug}`)}
                  className="group relative bg-[#1c1f24] hover:bg-[#23272e] border border-white/10 hover:border-white/20 rounded-2xl p-3 sm:p-4.5 transition-all duration-300 flex items-center justify-between gap-3 sm:gap-5 cursor-pointer shadow-md hover:shadow-xl"
                >
                  {/* Left: Real HD Tour Thumbnail */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 shadow-sm border border-white/10 bg-black/40">
                    <Image
                      src={tourImage}
                      alt={title}
                      fill
                      sizes="80px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
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

                    <div className="mt-1.5 sm:mt-2 flex items-center gap-2">
                      <span className="text-sm sm:text-base font-extrabold text-white tracking-tight">
                        {formatPrice(tour.price)}
                      </span>
                      {tour.originalPrice && tour.originalPrice > tour.price && (
                        <span className="text-xs text-gray-500 line-through">
                          {formatPrice(tour.originalPrice)}
                        </span>
                      )}
                      <span className="text-[11px] font-medium text-gray-400 bg-white/5 px-2 py-0.5 rounded">
                        {tour.duration}
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
                ? "تأكيد فوري ودفع آمن بالريال القطري (QAR)"
                : "Instant confirmation & secure checkout in QAR"}
            </span>
            <Link
              href="/experiences"
              className="text-[#38bdf8] hover:underline font-semibold flex items-center gap-1"
            >
              <span>{language === "ar" ? "تصفح جميع الجولات" : "Browse all Qatar Tours"}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
