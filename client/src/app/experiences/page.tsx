"use client";

import React, { useState, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { useCurrency } from "@/context/CurrencyContext";
import catalogData from "@/data/catalog_experiences.json";
import { CatalogExperience } from "@/types";
import {
  SlidersHorizontal,
  Star,
  X,
  RotateCcw,
  Compass
} from "lucide-react";

// Static Filter Definitions
const DESTINATIONS = [
  { id: "Dubai", label: "Dubai", labelAr: "دبي" },
  { id: "Abu Dhabi", label: "Abu Dhabi", labelAr: "أبوظبي" },
  { id: "Doha", label: "Doha", labelAr: "الدوحة" },
  { id: "Cairo", label: "Cairo", labelAr: "القاهرة" },
  { id: "Sharm El Sheikh", label: "Sharm El Sheikh", labelAr: "شرم الشيخ" },
  { id: "Alexandria", label: "Alexandria", labelAr: "الإسكندرية" },
  { id: "Dubrovnik", label: "Dubrovnik", labelAr: "دوبروفنيك" },
  { id: "Hurghada", label: "Hurghada", labelAr: "الغردقة" },
  { id: "Luxor", label: "Luxor", labelAr: "الأقصر" },
  { id: "Marrakech", label: "Marrakech", labelAr: "مراكش" },
  { id: "Sarajevo", label: "Sarajevo", labelAr: "سراييفو" },
  { id: "Split", label: "Split", labelAr: "سبليت" }
];

const CATEGORIES = [
  { id: "Desert", label: "Desert", labelAr: "صحراء" },
  { id: "Historical", label: "Historical", labelAr: "تاريخية" },
  { id: "Adventure", label: "Adventure", labelAr: "مغامرة" },
  { id: "City", label: "City Tours", labelAr: "جولات المدينة" },
  { id: "Multiday", label: "Multiday", labelAr: "رحلات متعددة الأيام" },
  { id: "Cultural", label: "Cultural", labelAr: "ثقافية" },
  { id: "Sea", label: "Sea", labelAr: "بحرية" },
  { id: "Family", label: "Family", labelAr: "عائلية" },
  { id: "Luxury", label: "Luxury", labelAr: "فاخرة" }
];

const DURATIONS = [
  { id: "under-3h", label: "Under 3 hours", labelAr: "أقل من 3 ساعات" },
  { id: "3-6h", label: "3–6 hours", labelAr: "3 إلى 6 ساعات" },
  { id: "6-12h", label: "6–12 hours", labelAr: "6 إلى 12 ساعة" },
  { id: "overnight", label: "Overnight", labelAr: "مبيت" },
  { id: "multiday", label: "Multi-day", labelAr: "عدة أيام" }
];

const PRICE_RANGES = [
  { id: "under-50", label: "Under AED 200", labelEur: "Under EUR 50", labelAr: "أقل من 200 درهم", max: 50 },
  { id: "50-125", label: "AED 200–500", labelEur: "EUR 50–125", labelAr: "200 إلى 500 درهم", min: 50, max: 125 },
  { id: "125-250", label: "AED 500–1,000", labelEur: "EUR 125–250", labelAr: "500 إلى 1,000 درهم", min: 125, max: 250 },
  { id: "250-plus", label: "AED 1,000+", labelEur: "EUR 250+", labelAr: "+1,000 درهم", min: 250 }
];

const TIMES_OF_DAY = [
  { id: "morning", label: "Morning", labelAr: "صباحاً" },
  { id: "afternoon", label: "Afternoon", labelAr: "ظهراً" },
  { id: "evening", label: "Evening", labelAr: "مساءً" },
  { id: "overnight", label: "Overnight", labelAr: "مبيت" }
];

const RATINGS = [
  { id: 4.8, label: "★ 4.8 & up", labelAr: "★ 4.8 وأعلى" },
  { id: 4.5, label: "★ 4.5 & up", labelAr: "★ 4.5 وأعلى" },
  { id: 4.0, label: "★ 4.0 & up", labelAr: "★ 4.0 وأعلى" },
  { id: 0, label: "Any rating", labelAr: "جميع التقييمات" }
];

function ExperiencesCatalogContent() {
  const { language } = useLanguage();
  const { formatPrice, currentCurrency } = useCurrency();
  const searchParams = useSearchParams();

  // Filter States initialized directly from URL searchParams
  const [selectedDestination, setSelectedDestination] = useState<string>(
    () => searchParams.get("destination") || "all"
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(
    () => searchParams.get("category") || "all"
  );
  const [selectedDuration, setSelectedDuration] = useState<string>(
    () => searchParams.get("duration") || "all"
  );
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
    setSelectedSort("recommended");
  };

  // Filter and sort items
  const filteredExperiences = useMemo(() => {
    let list = (catalogData as unknown as CatalogExperience[]);

    // 1. Destination
    if (selectedDestination !== "all") {
      list = list.filter((item) => item.destination === selectedDestination);
    }

    // 2. Category
    if (selectedCategory !== "all") {
      if (selectedCategory === "Historical") {
        list = list.filter((item) => item.category === "Historical" || item.category === "Cultural");
      } else if (selectedCategory === "Multiday") {
        list = list.filter((item) => item.durationBucket === "multiday" || item.durationBucket === "overnight");
      } else {
        list = list.filter((item) => item.category === selectedCategory);
      }
    }

    // 3. Duration
    if (selectedDuration !== "all") {
      list = list.filter((item) => item.durationBucket === selectedDuration);
    }

    // 4. Price range (evaluated against base EUR price)
    if (selectedPriceRange !== "all") {
      const range = PRICE_RANGES.find((p) => p.id === selectedPriceRange);
      if (range) {
        list = list.filter((item) => {
          if (range.min !== undefined && range.max !== undefined) {
            return item.price >= range.min && item.price < range.max;
          }
          if (range.min !== undefined) {
            return item.price >= range.min;
          }
          if (range.max !== undefined) {
            return item.price < range.max;
          }
          return true;
        });
      }
    }

    // 5. Time of day
    if (selectedTimeOfDay !== "all") {
      list = list.filter((item) => item.timeOfDay === selectedTimeOfDay);
    }

    // 6. Rating
    if (selectedMinRating > 0) {
      list = list.filter((item) => item.rating >= selectedMinRating);
    }

    // Sorting
    const sorted = [...list];
    if (selectedSort === "price-low") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (selectedSort === "price-high") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (selectedSort === "rating") {
      sorted.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    } else if (selectedSort === "reviews") {
      sorted.sort((a, b) => b.reviews - a.reviews);
    } else {
      // "recommended" default: Best sellers, sales and highest reviews first
      sorted.sort((a, b) => {
        if (a.savePercent > 0 && b.savePercent === 0) return -1;
        if (b.savePercent > 0 && a.savePercent === 0) return 1;
        return b.reviews - a.reviews;
      });
    }

    return sorted;
  }, [
    selectedDestination,
    selectedCategory,
    selectedDuration,
    selectedPriceRange,
    selectedTimeOfDay,
    selectedMinRating,
    selectedSort
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBFC] text-black font-montserrat">
      <Navbar />

      <main className="flex-1 pb-20">
        {/* ==============================================================
            1. FULL-WIDTH HERO HEADER (Matches viewallexperiencepage.png)
            ============================================================== */}
        <section className="relative pt-24 sm:pt-28 pb-12 sm:pb-16 text-white overflow-hidden bg-[#0A1E3F]">
          <div className="absolute inset-0 z-0">
            <Image
              src="/brand/hero/home-hero.jpg"
              alt="Experiences"
              fill
              priority
              className="object-cover object-center scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071622]/95 via-[#071622]/65 to-[#071622]/80" />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative z-10 max-w-[1360px] mx-auto px-4 md:px-6 lg:px-10">
            {/* Eyebrow */}
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-300 block mb-2">
              {language === "ar" ? "دليل التجارب" : "CATALOG"}
            </span>

            {/* H1 Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-semibold text-white tracking-tight leading-[1.08] mb-3">
              {language === "ar" ? "تجارب" : "Experiences"}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-white/90 max-w-2xl font-normal leading-relaxed">
              {language === "ar"
                ? "جولات إرشادية، وأنشطة ترفيهية، ورحلات يومية متميزة عبر الإمارات، قطر، ومصر، والوجهات العالمية."
                : "Guided tours, activities and day trips across the UAE and beyond."}
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
              2. FILTER BAR & SORTING HEADER
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
                    {language === "ar" ? "الفئة: الكل" : "Category: All"}
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
                  className="px-3.5 py-2 rounded-full border border-gray-200 bg-gray-50/50 hover:bg-white text-xs font-bold text-black cursor-pointer hover:border-gray-300 focus:outline-hidden transition-colors"
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
                  className="px-3.5 py-2 rounded-full border border-gray-200 bg-gray-50/50 hover:bg-white text-xs font-bold text-black cursor-pointer hover:border-gray-300 focus:outline-hidden transition-colors"
                >
                  <option value="all">
                    {language === "ar" ? "السعر: الكل" : "Price: All"}
                  </option>
                  {PRICE_RANGES.map((pr) => (
                    <option key={pr.id} value={pr.id}>
                      {language === "ar" ? pr.labelAr : currentCurrency.code === "EUR" ? pr.labelEur : pr.label}
                    </option>
                  ))}
                </select>

                {/* 6. Time of day Dropdown */}
                <select
                  value={selectedTimeOfDay}
                  onChange={(e) => setSelectedTimeOfDay(e.target.value)}
                  className="hidden md:inline-block px-3.5 py-2 rounded-full border border-gray-200 bg-gray-50/50 hover:bg-white text-xs font-bold text-black cursor-pointer hover:border-gray-300 focus:outline-hidden transition-colors"
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
                  className="hidden lg:inline-block px-3.5 py-2 rounded-full border border-gray-200 bg-gray-50/50 hover:bg-white text-xs font-bold text-black cursor-pointer hover:border-gray-300 focus:outline-hidden transition-colors"
                >
                  <option value={0}>
                    {language === "ar" ? "التقييم: الكل" : "Rating: All"}
                  </option>
                  <option value={4.8}>★ 4.8 & up</option>
                  <option value={4.5}>★ 4.5 & up</option>
                  <option value={4.0}>★ 4.0 & up</option>
                </select>

                {/* Clear Filters Reset Button if active */}
                {activeFiltersCount > 0 && (
                  <button
                    type="button"
                    onClick={handleClearAll}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-full text-xs font-semibold text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>{language === "ar" ? "إعادة تعيين" : "Clear all"}</span>
                  </button>
                )}
              </div>

              {/* Sorting Control */}
              <div className="flex items-center gap-2 text-xs text-[#808283]">
                <span className="font-semibold text-black whitespace-nowrap">
                  {language === "ar" ? "ترتيب:" : "Sort"}
                </span>
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="bg-transparent font-bold text-black cursor-pointer focus:outline-hidden"
                >
                  <option value="recommended">
                    {language === "ar" ? "الموصى به" : "Recommended"}
                  </option>
                  <option value="price-low">
                    {language === "ar" ? "السعر: من الأقل للأعلى" : "Price: Low to High"}
                  </option>
                  <option value="price-high">
                    {language === "ar" ? "السعر: من الأعلى للأقل" : "Price: High to Low"}
                  </option>
                  <option value="rating">
                    {language === "ar" ? "الأعلى تقييماً" : "Highest Rating"}
                  </option>
                  <option value="reviews">
                    {language === "ar" ? "الأكثر مراجعة" : "Most Reviewed"}
                  </option>
                </select>
              </div>
            </div>

            {/* Results Counter Bar */}
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-black/75">
              <span className="font-bold text-black">
                {language === "ar"
                  ? `${filteredExperiences.length} تجربة في قائمة التجارب.`
                  : `${filteredExperiences.length} experiences in Experiences.`}
              </span>
              {activeFiltersCount > 0 && (
                <span className="text-[#0097CA] font-medium">
                  {language === "ar"
                    ? `تم تطبيق ${activeFiltersCount} فلتر`
                    : `${activeFiltersCount} filters applied`}
                </span>
              )}
            </div>
          </div>

          {/* ==============================================================
              3. EXPERIENCES CARD GRID
              ============================================================== */}
          {filteredExperiences.length === 0 ? (
            /* Empty State */
            <div className="py-20 text-center bg-white rounded-3xl border border-gray-200/80 p-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-cyan-50 text-[#0097CA] flex items-center justify-center mx-auto">
                <Compass className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#1A2B33]">
                {language === "ar" ? "لم يتم العثور على تجارب" : "No experiences found"}
              </h3>
              <p className="text-sm text-[#808283] max-w-md mx-auto">
                {language === "ar"
                  ? "جرب إزالة بعض الفلاتر لعرض المزيد من الرحلات والأنشطة المتوفرة."
                  : "Try clearing some of your filters to see more tours and curated activities."}
              </p>
              <button
                type="button"
                onClick={handleClearAll}
                className="px-6 py-2.5 rounded-full bg-[#0097CA] hover:bg-[#0083B0] text-white text-xs font-bold transition-all shadow-sm"
              >
                {language === "ar" ? "إعادة تعيين جميع الفلاتر" : "Clear all filters"}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredExperiences.map((tour) => (
                <div
                  key={tour.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#E5E9EE] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Image Container with Badge Overlays */}
                    <div
                      style={{ position: "relative", minHeight: "185px" }}
                      className="relative aspect-[16/11] w-full overflow-hidden bg-gray-100"
                    >
                      <Image
                        src={tour.image}
                        alt={tour.title}
                        fill
                        sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover group-hover:scale-106 transition-transform duration-500"
                      />

                      {/* Top Left Badges */}
                      <div className="absolute top-2.5 left-2.5 rtl:left-auto rtl:right-2.5 flex flex-wrap gap-1.5 z-10 max-w-[85%]">
                        {tour.savePercent > 0 && (
                          <span className="bg-[#DC2626] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                            Save {tour.savePercent}%
                          </span>
                        )}
                        {tour.badges.includes("TripAdvisor recognised") && (
                          <span className="bg-[#047857] text-white text-[9.5px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                            TripAdvisor recognised
                          </span>
                        )}
                        {tour.badges.includes("Michelin recognised") && (
                          <span className="bg-[#B91C1C] text-white text-[9.5px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                            Michelin recognised
                          </span>
                        )}
                        {tour.badges.includes("TripAdvisor Best of the Best 2026") && (
                          <span className="bg-[#D97706] text-white text-[9.5px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                            Best of the Best 2026
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 space-y-2">
                      {/* Destination · Duration · Departs */}
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#0097CA]">
                        {language === "ar" && tour.destinationAr ? tour.destinationAr : tour.destination}{" "}
                        ·{" "}
                        <span className="text-[#808283] font-normal">
                          {tour.duration}
                        </span>
                        {tour.departsDubai && (
                          <span className="text-[#808283] font-normal">
                            {" "}· {language === "ar" ? "ينطلق من دبي" : "Departs Dubai"}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <Link
                        href={`/experiences/${tour.slug}`}
                        className="block group-hover:text-[#0097CA] transition-colors"
                      >
                        <h3 className="text-[13.5px] font-semibold text-black leading-snug line-clamp-2 min-h-[38px]">
                          {language === "ar" && tour.titleAr ? tour.titleAr : tour.title}
                        </h3>
                      </Link>

                      {/* Rating & Reviews */}
                      <div className="flex items-center gap-1.5 text-[11px] pt-0.5">
                        <Star className="w-3.5 h-3.5 fill-[#0097CA] text-[#0097CA]" />
                        <span className="font-bold text-black">{tour.rating}</span>
                        <span className="text-[#808283]">
                          ({tour.reviews.toLocaleString()})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Price & View CTA */}
                  <div className="p-4 pt-2 border-t border-gray-100 flex items-baseline justify-between mt-2">
                    <div>
                      <span className="text-[10px] text-[#808283] block leading-none">
                        {language === "ar" ? "يبدأ من" : "From"}
                      </span>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span className="text-base font-bold text-black">
                          {formatPrice(tour.price)}
                        </span>
                        {tour.originalPrice && (
                          <span className="text-[11px] text-[#808283] line-through">
                            {formatPrice(tour.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    <Link
                      href={`/experiences/${tour.slug}`}
                      className="text-xs font-bold text-[#0097CA] hover:text-[#007EA8] flex items-center gap-0.5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform"
                    >
                      <span>{language === "ar" ? "عرض" : "View"}</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* ==============================================================
          4. "ALL FILTERS" SLIDE-OVER MODAL / DRAWER
          ============================================================== */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-lg h-full bg-white shadow-2xl flex flex-col justify-between text-[#3A3D3F] animate-in slide-in-from-right duration-300">
            {/* Modal Header */}
            <div className="p-5 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#1A2B33]">
                  {language === "ar" ? "جميع الفلاتر" : "All filters"}
                </h3>
                <p className="text-xs text-[#808283]">
                  {language === "ar" ? "خصص بحثك بدقة" : "Refine your experience search"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsFilterModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              {/* Filter 1: Destination */}
              <div className="space-y-2.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1A2B33]">
                  {language === "ar" ? "الوجهة" : "Destination"}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSelectedDestination("all")}
                    className={`px-3 py-1.5 rounded-full border font-semibold transition-all ${
                      selectedDestination === "all"
                        ? "bg-[#1A2B33] text-white border-[#1A2B33]"
                        : "bg-gray-50 hover:bg-gray-100 text-[#3A3D3F] border-gray-200"
                    }`}
                  >
                    {language === "ar" ? "الكل" : "All"}
                  </button>
                  {DESTINATIONS.map((d) => {
                    const isSelected = selectedDestination === d.id;
                    return (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => setSelectedDestination(isSelected ? "all" : d.id)}
                        className={`px-3 py-1.5 rounded-full border font-semibold transition-all ${
                          isSelected
                            ? "bg-[#0097CA] text-white border-[#0097CA] shadow-xs"
                            : "bg-gray-50 hover:bg-gray-100 text-[#3A3D3F] border-gray-200"
                        }`}
                      >
                        {language === "ar" ? d.labelAr : d.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Filter 2: Category */}
              <div className="space-y-2.5 border-t border-gray-100 pt-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1A2B33]">
                  {language === "ar" ? "الفئة" : "Category"}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory("all")}
                    className={`px-3 py-1.5 rounded-full border font-semibold transition-all ${
                      selectedCategory === "all"
                        ? "bg-[#1A2B33] text-white border-[#1A2B33]"
                        : "bg-gray-50 hover:bg-gray-100 text-[#3A3D3F] border-gray-200"
                    }`}
                  >
                    {language === "ar" ? "الكل" : "All"}
                  </button>
                  {CATEGORIES.map((c) => {
                    const isSelected = selectedCategory === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setSelectedCategory(isSelected ? "all" : c.id)}
                        className={`px-3 py-1.5 rounded-full border font-semibold transition-all ${
                          isSelected
                            ? "bg-[#0097CA] text-white border-[#0097CA] shadow-xs"
                            : "bg-gray-50 hover:bg-gray-100 text-[#3A3D3F] border-gray-200"
                        }`}
                      >
                        {language === "ar" ? c.labelAr : c.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Filter 3: Duration */}
              <div className="space-y-2.5 border-t border-gray-100 pt-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1A2B33]">
                  {language === "ar" ? "المدة" : "Duration"}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSelectedDuration("all")}
                    className={`px-3 py-1.5 rounded-full border font-semibold transition-all ${
                      selectedDuration === "all"
                        ? "bg-[#1A2B33] text-white border-[#1A2B33]"
                        : "bg-gray-50 hover:bg-gray-100 text-[#3A3D3F] border-gray-200"
                    }`}
                  >
                    {language === "ar" ? "الكل" : "All"}
                  </button>
                  {DURATIONS.map((dur) => {
                    const isSelected = selectedDuration === dur.id;
                    return (
                      <button
                        key={dur.id}
                        type="button"
                        onClick={() => setSelectedDuration(isSelected ? "all" : dur.id)}
                        className={`px-3 py-1.5 rounded-full border font-semibold transition-all ${
                          isSelected
                            ? "bg-[#0097CA] text-white border-[#0097CA] shadow-xs"
                            : "bg-gray-50 hover:bg-gray-100 text-[#3A3D3F] border-gray-200"
                        }`}
                      >
                        {language === "ar" ? dur.labelAr : dur.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Filter 4: Price per person */}
              <div className="space-y-2.5 border-t border-gray-100 pt-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1A2B33]">
                  {language === "ar" ? "السعر للشخص" : "Price per person"}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSelectedPriceRange("all")}
                    className={`px-3 py-1.5 rounded-full border font-semibold transition-all ${
                      selectedPriceRange === "all"
                        ? "bg-[#1A2B33] text-white border-[#1A2B33]"
                        : "bg-gray-50 hover:bg-gray-100 text-[#3A3D3F] border-gray-200"
                    }`}
                  >
                    {language === "ar" ? "الكل" : "All"}
                  </button>
                  {PRICE_RANGES.map((pr) => {
                    const isSelected = selectedPriceRange === pr.id;
                    return (
                      <button
                        key={pr.id}
                        type="button"
                        onClick={() => setSelectedPriceRange(isSelected ? "all" : pr.id)}
                        className={`px-3 py-1.5 rounded-full border font-semibold transition-all ${
                          isSelected
                            ? "bg-[#0097CA] text-white border-[#0097CA] shadow-xs"
                            : "bg-gray-50 hover:bg-gray-100 text-[#3A3D3F] border-gray-200"
                        }`}
                      >
                        {language === "ar" ? pr.labelAr : currentCurrency.code === "EUR" ? pr.labelEur : pr.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Filter 5: Time of day */}
              <div className="space-y-2.5 border-t border-gray-100 pt-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1A2B33]">
                  {language === "ar" ? "الوقت المفضل من اليوم" : "Time of day"}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSelectedTimeOfDay("all")}
                    className={`px-3 py-1.5 rounded-full border font-semibold transition-all ${
                      selectedTimeOfDay === "all"
                        ? "bg-[#1A2B33] text-white border-[#1A2B33]"
                        : "bg-gray-50 hover:bg-gray-100 text-[#3A3D3F] border-gray-200"
                    }`}
                  >
                    {language === "ar" ? "الكل" : "All"}
                  </button>
                  {TIMES_OF_DAY.map((tod) => {
                    const isSelected = selectedTimeOfDay === tod.id;
                    return (
                      <button
                        key={tod.id}
                        type="button"
                        onClick={() => setSelectedTimeOfDay(isSelected ? "all" : tod.id)}
                        className={`px-3 py-1.5 rounded-full border font-semibold transition-all ${
                          isSelected
                            ? "bg-[#0097CA] text-white border-[#0097CA] shadow-xs"
                            : "bg-gray-50 hover:bg-gray-100 text-[#3A3D3F] border-gray-200"
                        }`}
                      >
                        {language === "ar" ? tod.labelAr : tod.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Filter 6: Rating */}
              <div className="space-y-2.5 border-t border-gray-100 pt-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1A2B33]">
                  {language === "ar" ? "التقييم" : "Rating"}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {RATINGS.map((r) => {
                    const isSelected = selectedMinRating === r.id;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setSelectedMinRating(r.id)}
                        className={`px-3.5 py-1.5 rounded-full border font-semibold transition-all flex items-center gap-1 ${
                          isSelected
                            ? "bg-[#0097CA] text-white border-[#0097CA] shadow-xs"
                            : "bg-gray-50 hover:bg-gray-100 text-[#3A3D3F] border-gray-200"
                        }`}
                      >
                        <span>{language === "ar" ? r.labelAr : r.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Modal Sticky Bottom Action Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleClearAll}
                className="px-4 py-2.5 rounded-full text-xs font-bold text-[#525456] hover:bg-gray-200 transition-colors cursor-pointer"
              >
                {language === "ar" ? "مسح الكل" : "Clear all"}
              </button>

              <button
                type="button"
                onClick={() => setIsFilterModalOpen(false)}
                className="px-6 py-2.5 rounded-full bg-[#0097CA] hover:bg-[#0083B0] text-white text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                {language === "ar"
                  ? `عرض ${filteredExperiences.length} نتيجة`
                  : `Show ${filteredExperiences.length} results`}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default function ExperiencesCatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFBFC]" />}>
      <ExperiencesCatalogContent />
    </Suspense>
  );
}
