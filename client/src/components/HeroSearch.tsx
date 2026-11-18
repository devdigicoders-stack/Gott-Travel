"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, MapPin, Compass, Calendar, Award, ShieldCheck, Star } from "lucide-react";
import destinationsData from "@/data/destinations.json";
import categoriesData from "@/data/categories.json";
import { useLanguage } from "@/context/LanguageContext";

interface HeroSearchProps {
  onSearch?: (destination: string, category: string, date?: string) => void;
}

export function HeroSearch({ onSearch }: HeroSearchProps) {
  const { language, t } = useLanguage();
  const [selectedDest, setSelectedDest] = useState("");
  const [selectedCat, setSelectedCat] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(selectedDest, selectedCat, selectedDate);
    }
    const target = document.getElementById("bestsellers");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="search"
      className="relative bg-[#07152B] min-h-[88svh] md:min-h-[96svh] flex flex-col justify-center overflow-hidden"
      aria-labelledby="home-hero-title"
    >
      {/* Background Image & OceanAir Vignette Overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-x-0 -inset-y-[8%]">
          <Image
            src="/brand/hero/home-hero.jpg"
            alt="Desert dunes at sunset"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Radial & linear gradient overlay matching OceanAir */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 65% 70% at 20% 55%, rgba(0,0,0,0.52) 0%, transparent 75%), linear-gradient(to right, rgba(7,21,43,0.85) 0%, rgba(7,21,43,0.4) 50%, rgba(0,0,0,0.25) 100%), linear-gradient(to top, rgba(7,21,43,0.95) 0%, rgba(7,21,43,0.4) 45%, rgba(0,0,0,0.2) 100%)",
            }}
          />
        </div>

        {/* Ambient Glass Glow Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[420px] h-[420px] bg-[#0097CA]/25 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[380px] h-[380px] bg-[#D4AF37]/20 rounded-full blur-[120px] pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 md:px-6 lg:px-10 pt-[100px] md:pt-[130px] pb-[50px] md:pb-[70px]">
        {/* Glassmorphic Overline Capsule */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.12] hover:bg-white/[0.18] backdrop-blur-xl border border-white/25 shadow-[0_4px_20px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.35)] mb-4 md:mb-5 transition-all">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
          <p
            className="uppercase font-semibold text-white/95 text-[10px] md:text-[11.5px] tracking-[0.22em] leading-none"
            style={{ textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}
          >
            {t.heroOverline}
          </p>
        </div>

        {/* H1 Main Headline */}
        <h1
          id="home-hero-title"
          className="text-white font-extrabold text-[clamp(30px,5.8vw,56px)] leading-[1.1] max-w-[720px] mb-4 md:mb-5 tracking-tight"
          style={{ textShadow: "0 3px 18px rgba(0,0,0,0.55)" }}
        >
          {t.heroH1}
        </h1>

        {/* Subtitle */}
        <p
          className="text-white/85 text-[13.5px] md:text-[16px] leading-[1.7] max-w-[580px] mb-8 md:mb-10 font-normal"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.45)" }}
        >
          {t.heroSubtitle}
        </p>

        {/* Glassmorphic Interactive Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="max-w-[960px] bg-white/[0.12] hover:bg-white/[0.16] backdrop-blur-2xl rounded-2xl md:rounded-[28px] p-2.5 md:p-3.5 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)] border border-white/30 text-white grid grid-cols-1 md:grid-cols-[1.25fr_1fr_1.1fr_auto] gap-2.5 items-center transition-all duration-300"
        >
          {/* 1. Destination Field (Glass Pill) */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl md:rounded-2xl bg-black/25 hover:bg-black/35 focus-within:bg-black/40 backdrop-blur-md border border-white/20 focus-within:border-cyan-300 focus-within:ring-2 focus-within:ring-cyan-300/30 transition-all">
            <MapPin className="w-4 h-4 text-cyan-400 shrink-0 drop-shadow-[0_0_6px_rgba(34,211,238,0.5)]" />
            <div className="flex-1 min-w-0 text-left rtl:text-right">
              <label className="block text-[9.5px] font-bold uppercase tracking-wider text-cyan-200/90 leading-none mb-1">
                {t.searchDestination}
              </label>
              <select
                value={selectedDest}
                onChange={(e) => setSelectedDest(e.target.value)}
                className="w-full bg-transparent text-[13.5px] font-semibold text-white focus:outline-hidden cursor-pointer truncate [&>option]:bg-[#07152B] [&>option]:text-white"
              >
                <option value="">{t.allDestinations}</option>
                {destinationsData.map((d) => (
                  <option key={d.id} value={d.id}>
                    {language === "ar" && d.nameAr ? d.nameAr : d.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 2. Date Picker (Glass Pill) */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl md:rounded-2xl bg-black/25 hover:bg-black/35 focus-within:bg-black/40 backdrop-blur-md border border-white/20 focus-within:border-cyan-300 focus-within:ring-2 focus-within:ring-cyan-300/30 transition-all">
            <Calendar className="w-4 h-4 text-cyan-400 shrink-0 drop-shadow-[0_0_6px_rgba(34,211,238,0.5)]" />
            <div className="flex-1 min-w-0 text-left rtl:text-right">
              <label className="block text-[9.5px] font-bold uppercase tracking-wider text-cyan-200/90 leading-none mb-1">
                {t.selectDate}
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-transparent text-[13px] font-semibold text-white focus:outline-hidden cursor-pointer [color-scheme:dark]"
              />
            </div>
          </div>

          {/* 3. Category Field (Glass Pill) */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl md:rounded-2xl bg-black/25 hover:bg-black/35 focus-within:bg-black/40 backdrop-blur-md border border-white/20 focus-within:border-cyan-300 focus-within:ring-2 focus-within:ring-cyan-300/30 transition-all">
            <Compass className="w-4 h-4 text-cyan-400 shrink-0 drop-shadow-[0_0_6px_rgba(34,211,238,0.5)]" />
            <div className="flex-1 min-w-0 text-left rtl:text-right">
              <label className="block text-[9.5px] font-bold uppercase tracking-wider text-cyan-200/90 leading-none mb-1">
                {t.searchExperienceType}
              </label>
              <select
                value={selectedCat}
                onChange={(e) => setSelectedCat(e.target.value)}
                className="w-full bg-transparent text-[13.5px] font-semibold text-white focus:outline-hidden cursor-pointer truncate [&>option]:bg-[#07152B] [&>option]:text-white"
              >
                <option value="">{t.allCategories}</option>
                {categoriesData.map((c) => (
                  <option key={c.id} value={c.id}>
                    {language === "ar" && c.nameAr ? c.nameAr : c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 4. Glassmorphic Glowing CTA Button */}
          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3.5 bg-gradient-to-r from-[#0097CA] via-cyan-500 to-[#0284C7] hover:from-[#0085B2] hover:to-[#0A1E3F] text-white font-extrabold text-[13px] rounded-xl md:rounded-2xl shadow-[0_10px_25px_rgba(0,151,202,0.45)] border border-cyan-300/40 backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>{t.searchButton}</span>
          </button>
        </form>

        {/* Floating Glassmorphic Trust Badges */}
        <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-3 sm:gap-4 text-white/90 text-[11px] md:text-[12px] font-semibold">
          <div className="flex items-center gap-2 bg-white/[0.09] hover:bg-white/[0.15] backdrop-blur-xl px-4 py-2 rounded-full border border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.2)] transition-all">
            <Award className="w-4 h-4 text-amber-300 drop-shadow-[0_0_6px_rgba(252,211,77,0.5)]" />
            <span>{t.tripAdvisorAward}</span>
          </div>

          <div className="flex items-center gap-2 bg-white/[0.09] hover:bg-white/[0.15] backdrop-blur-xl px-4 py-2 rounded-full border border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.2)] transition-all">
            <ShieldCheck className="w-4 h-4 text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
            <span>{t.freeCancellation}</span>
          </div>

          <div className="flex items-center gap-2 bg-white/[0.09] hover:bg-white/[0.15] backdrop-blur-xl px-4 py-2 rounded-full border border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.2)] transition-all">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]" />
            <span>★ 4.9 • 50,000+ {t.curatedTours}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
