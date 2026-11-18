"use client";

import React, { useState, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { useCurrency } from "@/context/CurrencyContext";
import multidayData from "@/data/multiday.json";
import {
  SlidersHorizontal,
  Star,
  X,
  RotateCcw,
  Compass
} from "lucide-react";

export interface MultidayTour {
  id: string;
  slug: string;
  title: string;
  titleAr: string;
  destination: string;
  destinationAr: string;
  duration: string;
  durationAr: string;
  rating: number;
  reviews: number;
  price: number;
  currency: string;
  nextDate?: string;
  image: string;
}

const DESTINATIONS = [
  { id: "Cairo", label: "Cairo", labelAr: "القاهرة" },
  { id: "Hurghada", label: "Hurghada", labelAr: "الغردقة" },
  { id: "Abu Dhabi", label: "Abu Dhabi", labelAr: "أبوظبي" },
];

const CATEGORIES = [
  { id: "Multiday", label: "Multi-day", labelAr: "رحلات متعددة الأيام" },
  { id: "Desert", label: "Desert", labelAr: "صحراء" },
  { id: "Historical", label: "Historical", labelAr: "تاريخية" },
  { id: "Cultural", label: "Cultural", labelAr: "ثقافية" },
  { id: "Adventure", label: "Adventure", labelAr: "مغامرة" },
];

const DURATIONS = [
  { id: "2-3-days", label: "2–3 Days", labelAr: "يومان إلى 3 أيام" },
  { id: "4-6-days", label: "4–6 Days", labelAr: "4 إلى 6 أيام" },
  { id: "7-plus-days", label: "7+ Days", labelAr: "7 أيام فأكثر" },
];

const PRICE_RANGES = [
  { id: "under-400", labelEur: "Under EUR 400", labelAr: "أقل من 400 يورو", max: 400 },
  { id: "400-800", labelEur: "EUR 400–800", labelAr: "400 إلى 800 يورو", min: 400, max: 800 },
  { id: "800-plus", labelEur: "EUR 800+", labelAr: "+800 يورو", min: 800 },
];

const TIMES_OF_DAY = [
  { id: "overnight", label: "Multi-day / Overnight", labelAr: "رحلات مبيت وعدة أيام" },
];

const RATINGS = [
  { id: 4.8, label: "★ 4.8 & up", labelAr: "★ 4.8 وأعلى" },
  { id: 4.5, label: "★ 4.5 & up", labelAr: "★ 4.5 وأعلى" },
  { id: 0, label: "Any rating", labelAr: "جميع التقييمات" },
];

function MultidayCatalogContent() {
  const { language } = useLanguage();
  const { formatPrice } = useCurrency();
  const searchParams = useSearchParams();

  // Filter States initialized directly from URL searchParams
  const [selectedDestination, setSelectedDestination] = useState<string>(
    () => searchParams.get("destination") || "all"
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(
    () => searchParams.get("category") || "all"
  );
  const [selectedDuration, setSelectedDuration] = useState<string>("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("all");
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState<string>("all");
  const [selectedMinRating, setSelectedMinRating] = useState<number>(0);
  const [selectedSort, setSelectedSort] = useState<string>("recommended");

  // Drawer / Modal State
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedDestination !== "all") count++;
    if (selectedCategory !== "all") count++;
    if (selectedDuration !== "all") count++;
    if (selectedPriceRange !== "all") count++;
    if (selectedTimeOfDay !== "all") count++;
    if (selectedMinRating > 0) count++;
    return count;
  }, [selectedDestination, selectedCategory, selectedDuration, selectedPriceRange, selectedTimeOfDay, selectedMinRating]);

  // Reset all filters
  const handleClearAll = () => {
    setSelectedDestination("all");
    setSelectedCategory("all");
    setSelectedDuration("all");
    setSelectedPriceRange("all");
    setSelectedTimeOfDay("all");
    setSelectedMinRating(0);
  };

  // Raw tours list
  const allTours = multidayData as unknown as MultidayTour[];

  // Filter & Sort Logic
  const filteredTours = useMemo(() => {
    let list = allTours.filter((tour) => {
      // 1. Destination
      if (selectedDestination !== "all" && tour.destination.toLowerCase() !== selectedDestination.toLowerCase()) {
        return false;
      }

      // 2. Duration filter
      if (selectedDuration === "2-3-days") {
        if (!tour.duration.includes("2") && !tour.duration.includes("3")) return false;
      } else if (selectedDuration === "4-6-days") {
        if (!tour.duration.includes("4") && !tour.duration.includes("6")) return false;
      } else if (selectedDuration === "7-plus-days") {
        if (!tour.duration.includes("8") && !tour.duration.includes("9")) return false;
      }

      // 3. Price Range (in EUR base)
      if (selectedPriceRange === "under-400" && tour.price >= 400) return false;
      if (selectedPriceRange === "400-800" && (tour.price < 400 || tour.price > 800)) return false;
      if (selectedPriceRange === "800-plus" && tour.price < 800) return false;

      // 4. Rating
      if (selectedMinRating > 0 && tour.rating < selectedMinRating) return false;

      return true;
    });

    // Sorting
    list = [...list].sort((a, b) => {
      switch (selectedSort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating-desc":
          return b.rating - a.rating;
        case "reviews-desc":
          return b.reviews - a.reviews;
        case "recommended":
        default:
          return 0; // Natural curated order from footermultiday.png
      }
    });

    return list;
  }, [
    allTours,
    selectedDestination,
    selectedDuration,
    selectedPriceRange,
    selectedMinRating,
    selectedSort,
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA]">
      <Navbar />

      <main className="flex-1 pb-24">
        {/* ==============================================================
            1. HERO SECTION (Pixel-Perfect from footermultiday.png)
            ============================================================== */}
        <section className="relative w-full h-[340px] sm:h-[400px] lg:h-[430px] flex items-end pb-12 sm:pb-16 overflow-hidden">
          {/* Panoramic Background with Dark Moody Overlay */}
          <div className="absolute inset-0">
            <Image
              src="/images/cat_multiday.jpg"
              alt="Multi-day journeys"
              fill
              priority
              className="object-cover object-center scale-105"
            />
            {/* Smooth Atmospheric Vignette & Contrast Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#071622]/95 via-[#071622]/65 to-[#071622]/80" />
            <div className="absolute inset-0 bg-black/35" />
          </div>

          <div className="relative z-10 max-w-[1360px] mx-auto px-4 md:px-6 lg:px-10 w-full">
            {/* Eyebrow */}
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-300 block mb-2">
              {language === "ar" ? "الكتالوج" : "CATALOG"}
            </span>

            {/* H1 Title */}
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-semibold text-white tracking-tight leading-[1.12] sm:leading-[1.08] mb-2 sm:mb-3">
              {language === "ar" ? "رحلات متعددة الأيام" : "Multi-day journeys"}
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm md:text-base text-white/90 max-w-2xl font-normal leading-relaxed">
              {language === "ar"
                ? "رحلات أطول، مع تنظيم الإقامة الفندقية والمواصلات كاملة عبر جميع وجهاتنا."
                : "Longer trips, hotels and transfers handled, across our destinations."}
            </p>
          </div>
        </section>

        {/* ==============================================================
            2. "EVERY EXPERIENCE" HEADLINE & FILTER CONTAINER
            ============================================================== */}
        <div className="max-w-[1360px] mx-auto px-4 md:px-6 lg:px-10 space-y-5 pt-8 sm:pt-10">
          <div>
            <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#0097CA] block mb-1">
              {language === "ar" ? "كل التجارب" : "EVERY EXPERIENCE"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-black tracking-tight">
              {language === "ar"
                ? "طرق لقضاء يومك تفوق عدد الأيام."
                : "More ways to spend a day than days."}
            </h2>
          </div>

          {/* ==============================================================
              FILTER BAR & SORTING HEADER
              ============================================================== */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-3 sm:p-4 shadow-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Filter Buttons & Dropdowns */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* 1. All Filters Drawer Trigger */}
                <button
                  type="button"
                  onClick={() => setIsFilterModalOpen(true)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    activeFiltersCount > 0
                      ? "bg-[#0097CA] text-white shadow-sm hover:bg-[#0083B0]"
                      : "bg-black text-white hover:bg-black/85"
                  }`}
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>{language === "ar" ? "فلاتر" : "Filters"}</span>
                  {activeFiltersCount > 0 && (
                    <span className="w-4 h-4 rounded-full bg-white text-[#0097CA] text-[10px] flex items-center justify-center font-bold">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>

                {/* 2. Destination Dropdown */}
                <select
                  value={selectedDestination}
                  onChange={(e) => setSelectedDestination(e.target.value)}
                  className="px-3.5 py-2 rounded-full border border-gray-200 bg-gray-50/50 hover:bg-white text-xs font-bold text-black cursor-pointer hover:border-gray-300 focus:outline-hidden transition-colors"
                >
                  <option value="all">
                    {language === "ar" ? "الوجهة: الكل" : "Destination: All"}
                  </option>
                  {DESTINATIONS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {language === "ar" ? d.labelAr : d.label}
                    </option>
                  ))}
                </select>

                {/* 3. Category Dropdown */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3.5 py-2 rounded-full border border-gray-200 bg-gray-50/50 hover:bg-white text-xs font-bold text-black cursor-pointer hover:border-gray-300 focus:outline-hidden transition-colors"
                >
                  <option value="all">
                    {language === "ar" ? "الفئة: رحلات متعددة الأيام" : "Category: Multi-day"}
                  </option>
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {language === "ar" ? c.labelAr : c.label}
                    </option>
                  ))}
                </select>

                {/* 4. Duration Dropdown */}
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="px-3.5 py-2 rounded-full border border-gray-200 bg-gray-50/50 hover:bg-white text-xs font-bold text-black cursor-pointer hover:border-gray-300 focus:outline-hidden transition-colors hidden sm:inline-block"
                >
                  <option value="all">
                    {language === "ar" ? "المدة: الكل" : "Duration: All"}
                  </option>
                  {DURATIONS.map((dur) => (
                    <option key={dur.id} value={dur.id}>
                      {language === "ar" ? dur.labelAr : dur.label}
                    </option>
                  ))}
                </select>

                {/* 5. Price Dropdown */}
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="px-3.5 py-2 rounded-full border border-gray-200 bg-gray-50/50 hover:bg-white text-xs font-bold text-black cursor-pointer hover:border-gray-300 focus:outline-hidden transition-colors hidden sm:inline-block"
                >
                  <option value="all">
                    {language === "ar" ? "السعر: الكل" : "Price: All"}
                  </option>
                  {PRICE_RANGES.map((pr) => (
                    <option key={pr.id} value={pr.id}>
                      {language === "ar" ? pr.labelAr : pr.labelEur}
                    </option>
                  ))}
                </select>

                {/* 6. Time of Day Dropdown */}
                <select
                  value={selectedTimeOfDay}
                  onChange={(e) => setSelectedTimeOfDay(e.target.value)}
                  className="px-3.5 py-2 rounded-full border border-gray-200 bg-gray-50/50 hover:bg-white text-xs font-bold text-black cursor-pointer hover:border-gray-300 focus:outline-hidden transition-colors hidden md:inline-block"
                >
                  <option value="all">
                    {language === "ar" ? "الوقت: الكل" : "Time of day: All"}
                  </option>
                  {TIMES_OF_DAY.map((t) => (
                    <option key={t.id} value={t.id}>
                      {language === "ar" ? t.labelAr : t.label}
                    </option>
                  ))}
                </select>

                {/* 7. Rating Dropdown */}
                <select
                  value={selectedMinRating}
                  onChange={(e) => setSelectedMinRating(Number(e.target.value))}
                  className="px-3.5 py-2 rounded-full border border-gray-200 bg-gray-50/50 hover:bg-white text-xs font-bold text-black cursor-pointer hover:border-gray-300 focus:outline-hidden transition-colors hidden md:inline-block"
                >
                  <option value={0}>
                    {language === "ar" ? "التقييم: الكل" : "Rating: All"}
                  </option>
                  {RATINGS.filter((r) => r.id > 0).map((r) => (
                    <option key={r.id} value={r.id}>
                      {language === "ar" ? r.labelAr : r.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Right Side: Sort Control */}
              <div className="flex items-center gap-2 ms-auto">
                <span className="text-xs text-gray-500 font-medium hidden sm:inline">
                  {language === "ar" ? "ترتيب:" : "Sort:"}
                </span>
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="px-3 py-1.5 rounded-full border border-gray-200 bg-gray-50/50 hover:bg-white text-xs font-bold text-black cursor-pointer hover:border-gray-300 focus:outline-hidden transition-colors"
                >
                  <option value="recommended">
                    {language === "ar" ? "الموصى به" : "Recommended"}
                  </option>
                  <option value="price-asc">
                    {language === "ar" ? "السعر: من الأقل للأعلى" : "Price: Low to high"}
                  </option>
                  <option value="price-desc">
                    {language === "ar" ? "السعر: من الأعلى للأقل" : "Price: High to low"}
                  </option>
                  <option value="rating-desc">
                    {language === "ar" ? "أعلى تقييم" : "Highest rated"}
                  </option>
                  <option value="reviews-desc">
                    {language === "ar" ? "الأكثر تقييماً" : "Most reviewed"}
                  </option>
                </select>
              </div>
            </div>

            {/* Active Filter Chips Strip */}
            {activeFiltersCount > 0 && (
              <div className="pt-2 border-t border-gray-100 flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  {language === "ar" ? "فلاتر مفعلة:" : "Active:"}
                </span>

                {selectedDestination !== "all" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-[#0097CA] text-xs font-semibold">
                    {selectedDestination}
                    <button
                      type="button"
                      onClick={() => setSelectedDestination("all")}
                      className="cursor-pointer hover:text-black"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {selectedDuration !== "all" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-[#0097CA] text-xs font-semibold">
                    {selectedDuration}
                    <button
                      type="button"
                      onClick={() => setSelectedDuration("all")}
                      className="cursor-pointer hover:text-black"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {selectedPriceRange !== "all" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-[#0097CA] text-xs font-semibold">
                    {selectedPriceRange}
                    <button
                      type="button"
                      onClick={() => setSelectedPriceRange("all")}
                      className="cursor-pointer hover:text-black"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {selectedMinRating > 0 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-[#0097CA] text-xs font-semibold">
                    ★ {selectedMinRating}+
                    <button
                      type="button"
                      onClick={() => setSelectedMinRating(0)}
                      className="cursor-pointer hover:text-black"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                <button
                  type="button"
                  onClick={handleClearAll}
                  className="text-xs font-bold text-gray-500 hover:text-red-600 transition-colors inline-flex items-center gap-1 cursor-pointer ms-2"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{language === "ar" ? "إعادة ضبط" : "Reset all"}</span>
                </button>
              </div>
            )}
          </div>

          {/* Results Count Line (Pixel-Perfect from footermultiday.png) */}
          <div className="flex items-center justify-between text-xs text-gray-600 font-medium">
            <p>
              <strong className="text-black font-bold">{filteredTours.length}</strong>{" "}
              {language === "ar"
                ? "تجارب في رحلات متعددة الأيام."
                : "experiences in Multi-day journeys."}
            </p>
          </div>

          {/* ==============================================================
              3. 4-COLUMN TOUR CARDS GRID (Pixel-Perfect Replication)
              ============================================================== */}
          {filteredTours.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 pt-2">
              {filteredTours.map((tour) => {
                const tourTitle = language === "ar" && tour.titleAr ? tour.titleAr : tour.title;
                const destTitle = language === "ar" && tour.destinationAr ? tour.destinationAr : tour.destination;

                return (
                  <div
                    key={tour.id}
                    className="group bg-white rounded-3xl border border-gray-100/90 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden"
                  >
                    {/* Card Photo Container */}
                    <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-gray-100">
                      <Image
                        src={tour.image}
                        alt={tourTitle}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>

                    {/* Card Body */}
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-1.5">
                        {/* Destination Eyebrow (Uppercase cyan) */}
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#0097CA] block">
                          {destTitle}
                        </span>

                        {/* Title (2 lines clamp) */}
                        <Link href={`/experiences/${tour.slug}`}>
                          <h3 className="text-sm sm:text-[15px] font-bold text-black group-hover:text-[#0097CA] transition-colors line-clamp-2 min-h-[44px] leading-snug">
                            {tourTitle}
                          </h3>
                        </Link>

                        {/* Rating Row */}
                        <div className="flex items-center gap-1.5 text-xs text-black font-semibold pt-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{tour.rating}</span>
                          <span className="text-gray-400 font-normal">
                            ({tour.reviews.toLocaleString()})
                          </span>
                        </div>
                      </div>

                      {/* Card Footer: Price & CTA */}
                      <div className="pt-3 border-t border-gray-100 flex items-end justify-between">
                        <div>
                          <span className="text-[11px] text-gray-500 block">
                            {language === "ar" ? "من" : "From"}
                          </span>
                          <div className="flex items-baseline gap-1">
                            <span className="text-sm sm:text-base font-bold text-black">
                              {formatPrice(tour.price)}
                            </span>
                          </div>
                        </div>

                        <Link
                          href={`/experiences/${tour.slug}`}
                          className="text-xs font-bold text-[#0097CA] hover:text-[#0083B0] flex items-center gap-1 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform cursor-pointer"
                        >
                          <span>{language === "ar" ? "عرض" : "View"}</span>
                          <span>→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-20 text-center space-y-4 bg-white rounded-3xl border border-gray-100 p-8">
              <div className="w-14 h-14 rounded-full bg-gray-50 text-[#0097CA] mx-auto flex items-center justify-center">
                <Compass className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-black">
                {language === "ar"
                  ? "لا توجد رحلات تطابق معايير البحث"
                  : "No journeys match your filter criteria"}
              </h3>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                {language === "ar"
                  ? "جرّب إزالة بعض الفلاتر لعرض جميع الرحلات المتعددة الأيام المتوفرة."
                  : "Try clearing selected filters to browse all available multi-day journeys."}
              </p>
              <button
                type="button"
                onClick={handleClearAll}
                className="px-5 py-2.5 rounded-full bg-[#0097CA] hover:bg-[#0083B0] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                {language === "ar" ? "عرض جميع الرحلات" : "Show all journeys"}
              </button>
            </div>
          )}
        </div>
      </main>

      {/* ==============================================================
          4. ALL FILTERS MODAL / SLIDE-OVER DRAWER
          ============================================================== */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in">
          <div
            className="w-full max-w-md h-full bg-white shadow-2xl flex flex-col justify-between overflow-y-auto animate-slide-left p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-[#0097CA]" />
                  <h3 className="text-base font-bold text-black">
                    {language === "ar" ? "جميع الفلاتر" : "All Filters"}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsFilterModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Destination Filter */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-black uppercase tracking-wider block">
                  {language === "ar" ? "الوجهة" : "Destination"}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedDestination("all")}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold text-center transition-all cursor-pointer ${
                      selectedDestination === "all"
                        ? "bg-[#0097CA] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {language === "ar" ? "الكل" : "All"}
                  </button>
                  {DESTINATIONS.map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setSelectedDestination(d.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold text-center transition-all cursor-pointer ${
                        selectedDestination === d.id
                          ? "bg-[#0097CA] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {language === "ar" ? d.labelAr : d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration Filter */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-black uppercase tracking-wider block">
                  {language === "ar" ? "المدة" : "Duration"}
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {DURATIONS.map((dur) => (
                    <button
                      key={dur.id}
                      type="button"
                      onClick={() =>
                        setSelectedDuration(
                          selectedDuration === dur.id ? "all" : dur.id
                        )
                      }
                      className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold text-start flex items-center justify-between transition-all cursor-pointer ${
                        selectedDuration === dur.id
                          ? "bg-[#0097CA] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <span>{language === "ar" ? dur.labelAr : dur.label}</span>
                      {selectedDuration === dur.id && <span>✓</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-black uppercase tracking-wider block">
                  {language === "ar" ? "نطاق السعر" : "Price Range"}
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {PRICE_RANGES.map((pr) => (
                    <button
                      key={pr.id}
                      type="button"
                      onClick={() =>
                        setSelectedPriceRange(
                          selectedPriceRange === pr.id ? "all" : pr.id
                        )
                      }
                      className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold text-start flex items-center justify-between transition-all cursor-pointer ${
                        selectedPriceRange === pr.id
                          ? "bg-[#0097CA] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <span>{language === "ar" ? pr.labelAr : pr.labelEur}</span>
                      {selectedPriceRange === pr.id && <span>✓</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Minimum Rating */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-black uppercase tracking-wider block">
                  {language === "ar" ? "التقييم الأدنى" : "Minimum Rating"}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {RATINGS.filter((r) => r.id > 0).map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() =>
                        setSelectedMinRating(
                          selectedMinRating === r.id ? 0 : r.id
                        )
                      }
                      className={`px-3 py-2 rounded-xl text-xs font-semibold text-center transition-all cursor-pointer ${
                        selectedMinRating === r.id
                          ? "bg-[#0097CA] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-6 border-t border-gray-100 flex items-center gap-3">
              <button
                type="button"
                onClick={handleClearAll}
                className="w-1/3 py-3 rounded-xl border border-gray-200 text-xs font-bold text-black hover:bg-gray-50 transition-colors cursor-pointer"
              >
                {language === "ar" ? "مسح الكل" : "Reset"}
              </button>
              <button
                type="button"
                onClick={() => setIsFilterModalOpen(false)}
                className="w-2/3 py-3 rounded-xl bg-[#0097CA] hover:bg-[#0083B0] text-xs font-bold text-white transition-colors shadow-md cursor-pointer"
              >
                {language === "ar"
                  ? `عرض ${filteredTours.length} تجارب`
                  : `Show ${filteredTours.length} Experiences`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function MultidayCatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FBFBFA]">
          <div className="w-8 h-8 border-3 border-[#0097CA] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <MultidayCatalogContent />
    </Suspense>
  );
}
