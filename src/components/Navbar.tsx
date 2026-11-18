"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCurrency } from "@/context/CurrencyContext";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { CartDrawer } from "./CartDrawer";
import {
  ShoppingBag,
  ChevronDown,
  Menu,
  X,
  Globe,
  MapPin,
  Check,
  Compass
} from "lucide-react";
import { Language } from "@/translations";

// Exactly the 10 destinations requested by the user
const DESTINATION_LIST = [
  { name: "Dubai", nameAr: "دبي", slug: "dubai", destinationParam: "Dubai" },
  { name: "Abu Dhabi", nameAr: "أبوظبي", slug: "abu-dhabi", destinationParam: "Abu Dhabi" },
  { name: "Doha", nameAr: "الدوحة", slug: "doha", destinationParam: "Doha" },
  { name: "Cairo", nameAr: "القاهرة", slug: "cairo", destinationParam: "Cairo" },
  { name: "Sharm El Sheikh", nameAr: "شرم الشيخ", slug: "sharm-el-sheikh", destinationParam: "Sharm El Sheikh" },
  { name: "Alexandria", nameAr: "الإسكندرية", slug: "alexandria", destinationParam: "Alexandria" },
  { name: "Dubrovnik", nameAr: "دوبروفنيك", slug: "dubrovnik", destinationParam: "Dubrovnik" },
  { name: "Hurghada", nameAr: "الغردقة", slug: "hurghada", destinationParam: "Hurghada" },
  { name: "Luxor", nameAr: "الأقصر", slug: "luxor", destinationParam: "Luxor" },
  { name: "Marrakech", nameAr: "مراكش", slug: "marrakech", destinationParam: "Marrakech" },
];

// Experiences dropdown sections & items exactly as specified by the user
const EXPERIENCES_DROPDOWN_SECTIONS = [
  {
    title: "Dubai",
    titleAr: "دبي",
    items: [
      {
        label: "Dubai Desert Safari",
        labelAr: "سفاري صحراء دبي",
        href: "/experiences/dubai-desert-safari",
      },
      {
        label: "Dubai City Tours",
        labelAr: "جولات مدينة دبي",
        href: "/experiences/dubai-city-tours",
      },
    ],
  },
  {
    title: "Abu Dhabi",
    titleAr: "أبوظبي",
    items: [
      {
        label: "Abu Dhabi City Tours",
        labelAr: "جولات مدينة أبوظبي",
        href: "/experiences/abu-dhabi-city-tours",
      },
      {
        label: "Abu Dhabi Desert Safari",
        labelAr: "سفاري صحراء أبوظبي",
        href: "/experiences/abu-dhabi-desert-safari",
      },
    ],
  },
  {
    title: "Doha",
    titleAr: "الدوحة",
    items: [
      {
        label: "Doha Desert Safari",
        labelAr: "سفاري صحراء الدوحة",
        href: "/experiences/doha-desert-safari",
      },
    ],
  },
  {
    title: "Categories",
    titleAr: "الفئات",
    items: [
      {
        label: "Desert",
        labelAr: "صحراء",
        href: "/experiences?category=Desert",
      },
      {
        label: "Historical",
        labelAr: "تاريخية",
        href: "/experiences?category=Historical",
      },
      {
        label: "Adventure",
        labelAr: "مغامرة",
        href: "/experiences?category=Adventure",
      },
      {
        label: "City Tours",
        labelAr: "جولات المدينة",
        href: "/experiences?category=City",
      },
      {
        label: "Multiday",
        labelAr: "رحلات متعددة الأيام",
        href: "/multiday",
      },
      {
        label: "Cultural",
        labelAr: "ثقافية",
        href: "/experiences?category=Cultural",
      },
    ],
  },
];

export function Navbar() {
  const { currentCurrency, setCurrency } = useCurrency();
  const { totalCount, setIsCartOpen } = useCart();
  const { language, setLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExperiencesOpen, setMobileExperiencesOpen] = useState(false);
  const [mobileDestinationsOpen, setMobileDestinationsOpen] = useState(false);
  const [destDropdownOpen, setDestDropdownOpen] = useState(false);
  const [expDropdownOpen, setExpDropdownOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const langRef = useRef<HTMLDivElement>(null);
  const destRef = useRef<HTMLDivElement>(null);
  const expRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isHeroMode = isHomePage && !isScrolled;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (langRef.current && !langRef.current.contains(target)) {
        setLangMenuOpen(false);
      }
      if (destRef.current && !destRef.current.contains(target)) {
        setDestDropdownOpen(false);
      }
      if (expRef.current && !expRef.current.contains(target)) {
        setExpDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLangMenuOpen(false);
        setDestDropdownOpen(false);
        setExpDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };

    if (langMenuOpen || destDropdownOpen || expDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [langMenuOpen, destDropdownOpen, expDropdownOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* 
        Pure Glassmorphism Navigation Bar
        No opaque white background — only frosted translucent glass with backdrop blur 
      */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          isHeroMode
            ? "bg-white/[0.07] backdrop-blur-xl border-b border-white/10 shadow-[0_4px_24px_0_rgba(0,0,0,0.1)] py-4 lg:py-5 text-white"
            : "bg-white/85 backdrop-blur-2xl border-b border-[#E5E9EE] shadow-[0_4px_20px_rgba(0,0,0,0.06)] py-3 text-black"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-10 flex items-center justify-between">
          {/* 1. LEFT: Brand Logo */}
          <Link href="/" className="shrink-0 flex items-center gap-2 group">
            <div className="relative h-9 sm:h-11 w-36 sm:w-44">
              <Image
                src="/brand/logo-blue.png"
                alt="GottQatar"
                fill
                priority
                className={`object-contain object-left rtl:object-right transition-all group-hover:scale-102 ${
                  isHeroMode
                    ? "brightness-0 invert drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]"
                    : ""
                }`}
              />
            </div>
          </Link>

          {/* 2. CENTER: Menu Items (Home, Experiences, Destinations, About) */}
          <nav
            className="hidden md:flex items-center gap-7 lg:gap-9"
            aria-label="Primary"
          >
            {/* Menu 0: Home */}
            <Link
              href="/"
              className={`font-semibold text-[13.5px] lg:text-[14.5px] transition-colors cursor-pointer ${
                isHomePage
                  ? isHeroMode
                    ? "text-cyan-300 font-bold drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]"
                    : "text-[#0097CA] font-bold"
                  : isHeroMode
                  ? "text-white/90 hover:text-cyan-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]"
                  : "text-black hover:text-[#0097CA]"
              }`}
            >
              {language === "ar" ? "الرئيسية" : "Home"}
            </Link>

            {/* Menu 1: Experiences (with Mega-Dropdown) */}
            <div
              ref={expRef}
              className="relative"
              onMouseEnter={() => setExpDropdownOpen(true)}
              onMouseLeave={() => setExpDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setExpDropdownOpen(!expDropdownOpen)}
                className={`font-semibold text-[13.5px] lg:text-[14.5px] transition-colors inline-flex items-center gap-1.5 cursor-pointer ${
                  isHeroMode
                    ? "text-white/90 hover:text-cyan-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]"
                    : "text-black hover:text-[#0097CA]"
                }`}
                aria-expanded={expDropdownOpen}
              >
                <span>{language === "ar" ? "تجارب" : "Experiences"}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 opacity-70 transition-transform duration-200 ${
                    expDropdownOpen ? "rotate-180 text-cyan-400" : ""
                  }`}
                />
              </button>

              {expDropdownOpen && (
                <div
                  className="absolute top-full left-0 rtl:left-auto rtl:right-0 pt-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  style={{ width: "min(780px, 92vw)" }}
                >
                  <div className="bg-white/95 backdrop-blur-2xl rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.16)] border border-gray-200/80 p-5 text-black">
                    {/* 4 Column Layout: Dubai, Abu Dhabi, Doha, Categories */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {EXPERIENCES_DROPDOWN_SECTIONS.map((sec) => (
                        <div key={sec.title} className="space-y-1.5">
                          <div className="text-[11px] font-bold uppercase tracking-wider text-[#0097CA] pb-2 border-b border-gray-100 flex items-center gap-1.5">
                            {sec.title === "Categories" ? (
                              <Compass className="w-3.5 h-3.5" />
                            ) : (
                              <MapPin className="w-3.5 h-3.5" />
                            )}
                            <span>{language === "ar" ? sec.titleAr : sec.title}</span>
                          </div>
                          <ul className="space-y-0.5">
                            {sec.items.map((item) => (
                              <li key={item.label}>
                                <Link
                                  href={item.href}
                                  onClick={() => setExpDropdownOpen(false)}
                                  className="block px-2.5 py-1.5 rounded-lg text-xs font-semibold text-black hover:bg-black/[0.04] hover:text-[#0097CA] transition-colors leading-relaxed"
                                >
                                  {language === "ar" ? item.labelAr : item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="mt-4 pt-3.5 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[11px] text-[#808283] font-medium hidden sm:inline">
                        {language === "ar"
                          ? "أكثر من 90 تجربة منسقة وموثوقة"
                          : "90+ handcrafted, verified experiences"}
                      </span>
                      <Link
                        href="/experiences"
                        onClick={() => setExpDropdownOpen(false)}
                        className="text-xs font-bold text-[#0097CA] hover:text-[#007EA8] flex items-center gap-1 group transition-colors ms-auto sm:ms-0"
                      >
                        <span>
                          {language === "ar"
                            ? "عرض جميع التجارب"
                            : "View all experiences"}
                        </span>
                        <span className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                          →
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Menu 2: Destinations (with 10-Item Glassmorphic Dropdown) */}
            <div
              ref={destRef}
              className="relative"
              onMouseEnter={() => setDestDropdownOpen(true)}
              onMouseLeave={() => setDestDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setDestDropdownOpen(!destDropdownOpen)}
                className={`font-semibold text-[13.5px] lg:text-[14.5px] transition-colors inline-flex items-center gap-1.5 cursor-pointer ${
                  isHeroMode
                    ? "text-white/90 hover:text-cyan-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]"
                    : "text-black hover:text-[#0097CA]"
                }`}
                aria-expanded={destDropdownOpen}
              >
                <span>{language === "ar" ? "وجهات" : "Destinations"}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 opacity-70 transition-transform duration-200 ${
                    destDropdownOpen ? "rotate-180 text-cyan-400" : ""
                  }`}
                />
              </button>

              {destDropdownOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  style={{ width: "min(400px, 92vw)" }}
                >
                  <div className="bg-white/95 backdrop-blur-2xl rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.16)] border border-gray-200/80 p-3 text-black">
                    <div className="grid grid-cols-2 gap-1">
                      {DESTINATION_LIST.map((dest) => (
                        <Link
                          key={dest.name}
                          href={`/experiences?destination=${encodeURIComponent(dest.destinationParam)}`}
                          onClick={() => setDestDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-black hover:bg-black/[0.04] hover:text-[#0097CA] transition-colors group"
                        >
                          <MapPin className="w-3.5 h-3.5 text-[#0097CA] shrink-0" />
                          <span className="truncate">
                            {language === "ar" ? dest.nameAr : dest.name}
                          </span>
                        </Link>
                      ))}
                    </div>

                    {/* Bottom CTA for Destinations */}
                    <div className="mt-2 pt-2.5 border-t border-gray-100 px-2 flex items-center justify-between text-xs font-bold text-[#0097CA]">
                      <Link
                        href="/experiences"
                        onClick={() => setDestDropdownOpen(false)}
                        className="flex items-center gap-1 hover:text-[#007EA8] group transition-colors"
                      >
                        <span>
                          {language === "ar"
                            ? "جميع الوجهات في التجارب"
                            : "All destinations in Experiences"}
                        </span>
                        <span className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                          →
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Menu 3: About */}
            <Link
              href="/about"
              className={`font-semibold text-[13.5px] lg:text-[14.5px] transition-colors cursor-pointer ${
                isHeroMode
                  ? "text-white/90 hover:text-cyan-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]"
                  : "text-black hover:text-[#0097CA]"
              }`}
            >
              {language === "ar" ? "عن جوّ قطر" : "About"}
            </Link>
          </nav>

          {/* 3. RIGHT: Language / Currency Toggle & Cart Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language & Currency Glass Pill Switcher */}
            <div ref={langRef} className="relative">
              <button
                type="button"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className={`inline-flex items-center gap-1.5 text-[12px] font-bold rounded-full px-3.5 py-2 transition-all cursor-pointer backdrop-blur-xl ${
                  isHeroMode
                    ? "bg-white/12 hover:bg-white/20 text-white border border-white/25 shadow-[0_4px_16px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.25)]"
                    : "bg-black/[0.06] hover:bg-black/[0.1] text-black border border-black/15 shadow-xs"
                }`}
                title="Switch Language / Currency"
              >
                <Globe className={`w-3.5 h-3.5 ${isHeroMode ? "text-cyan-300" : "text-[#0097CA]"}`} />
                <span className="uppercase tracking-wider font-bold">
                  {language.toUpperCase()} · {currentCurrency.code}
                </span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {/* Glassmorphic Language / Currency Popup Dropdown */}
              {langMenuOpen && (
                <div className="absolute right-0 rtl:right-auto rtl:left-0 top-full mt-2 w-[320px] sm:w-[380px] max-h-[85vh] overflow-y-auto bg-white/95 backdrop-blur-2xl rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.15)] border border-gray-200/80 p-4 sm:p-5 z-50 space-y-4 text-black animate-in fade-in slide-in-from-top-2">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-gray-200/80">
                    <div>
                      <h4 className="text-sm font-bold text-black tracking-tight">
                        {language === "ar" ? "اللغة والعملة" : "Language & currency"}
                      </h4>
                      <p className="text-[11px] text-gray-500">
                        {language === "ar" ? "اختر لغتك وعملتك المفضلة" : "Select your preferred language & currency"}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setLangMenuOpen(false)}
                      className="text-gray-400 hover:text-black p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Section 1: Languages */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#0097CA] mb-2">
                      {language === "ar" ? "اللغة" : "Language"}
                    </label>
                    <div className="grid grid-cols-2 gap-1.5 max-h-[220px] overflow-y-auto pr-1">
                      {[
                        { code: "en", name: "English", english: "English", flag: "🇬🇧" },
                        { code: "ar", name: "العربية", english: "Arabic", flag: "🇦🇪" },
                        { code: "fr", name: "Français", english: "French", flag: "🇫🇷" },
                        { code: "de", name: "Deutsch", english: "German", flag: "🇩🇪" },
                        { code: "es", name: "Español", english: "Spanish", flag: "🇪🇸" },
                        { code: "it", name: "Italiano", english: "Italian", flag: "🇮🇹" },
                        { code: "ja", name: "日本語", english: "Japanese", flag: "🇯🇵" },
                        { code: "ko", name: "한국어", english: "Korean", flag: "🇰🇷" },
                        { code: "tr", name: "Türkçe", english: "Turkish", flag: "🇹🇷" },
                        { code: "zh", name: "中文", english: "Chinese", flag: "🇨🇳" },
                        { code: "pt", name: "Português", english: "Portuguese", flag: "🇵🇹" },
                        { code: "ru", name: "Русский", english: "Russian", flag: "🇷🇺" }
                      ].map((langItem) => {
                        const isSelected = language === langItem.code;
                        return (
                          <button
                            key={langItem.code}
                            type="button"
                            onClick={() => {
                              setLanguage(langItem.code as Language);
                              setLangMenuOpen(false);
                            }}
                            className={`flex items-center gap-2 p-2 rounded-xl text-left rtl:text-right border transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#0097CA] text-white border-[#0097CA] shadow-xs"
                                : "bg-gray-50/80 hover:bg-gray-100 text-black border-gray-200/60"
                            }`}
                          >
                            <span className="text-base leading-none">{langItem.flag}</span>
                            <div className="flex-1 min-w-0">
                              <span className={`block text-xs font-bold leading-tight ${isSelected ? "text-white" : "text-black"}`}>
                                {langItem.name}
                              </span>
                              <span className={`block text-[10px] leading-tight ${isSelected ? "text-white/80" : "text-gray-400"}`}>
                                {langItem.english}
                              </span>
                            </div>
                            {isSelected && <Check className="w-3.5 h-3.5 shrink-0 text-white" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Section 2: Currencies */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#0097CA] mb-2">
                      {language === "ar" ? "العملة" : "Currency"}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { code: "AED", symbol: "د.إ", name: "UAE Dirham", nameAr: "درهم إماراتي" },
                        { code: "USD", symbol: "$", name: "US Dollar", nameAr: "دولار أمريكي" },
                        { code: "EUR", symbol: "€", name: "Euro", nameAr: "يورو" }
                      ].map((curr) => {
                        const isSelected = currentCurrency.code === curr.code;
                        return (
                          <button
                            key={curr.code}
                            type="button"
                            onClick={() => {
                              setCurrency(curr.code as "AED" | "USD" | "EUR");
                              setLangMenuOpen(false);
                            }}
                            className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#0097CA] text-white border-[#0097CA] shadow-xs"
                                : "bg-gray-50/80 hover:bg-gray-100 text-black border-gray-200/60"
                            }`}
                          >
                            <div className="flex items-center justify-center gap-1">
                              <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                                isSelected ? "bg-white/20 text-white" : "bg-gray-200/70 text-black"
                              }`}>
                                {curr.symbol}
                              </span>
                              <span className={`block text-xs font-bold leading-tight ${isSelected ? "text-white" : "text-black"}`}>
                                {curr.code}
                              </span>
                            </div>
                            <span className={`block text-[9.5px] mt-1 leading-tight truncate ${isSelected ? "text-white/85" : "text-gray-400"}`}>
                              {language === "ar" ? curr.nameAr : curr.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Cart Button with Count Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative p-2.5 rounded-full transition-all cursor-pointer backdrop-blur-xl ${
                isHeroMode
                  ? "bg-white/12 hover:bg-white/20 text-white border border-white/25 shadow-[0_4px_16px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.25)]"
                  : "bg-black/[0.06] hover:bg-black/[0.1] text-black border border-black/15 shadow-xs"
              }`}
              aria-label="View Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#0097CA] text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center animate-pulse shadow-sm">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-xl transition-all cursor-pointer ${
                isHeroMode
                  ? "text-white bg-white/10 hover:bg-white/20 border border-white/20"
                  : "text-black bg-black/[0.06] hover:bg-black/[0.1] border border-black/15"
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Glass Menu */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden backdrop-blur-2xl px-5 py-5 space-y-4 shadow-2xl animate-in fade-in duration-200 border-t max-h-[85vh] overflow-y-auto ${
              isHeroMode
                ? "bg-[#071F30]/95 border-white/15 text-white"
                : "bg-white/95 border-gray-200 text-black"
            }`}
          >
            <nav className="flex flex-col space-y-2">
              {/* Home */}
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-bold py-2 border-b transition-colors ${
                  isHomePage
                    ? isHeroMode
                      ? "text-cyan-300 border-white/20"
                      : "text-[#0097CA] border-gray-200"
                    : isHeroMode
                    ? "text-white hover:text-cyan-300 border-white/10"
                    : "text-black hover:text-[#0097CA] border-gray-100"
                }`}
              >
                {language === "ar" ? "الرئيسية" : "Home"}
              </Link>

              {/* Experiences with Collapsible Submenu */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileExperiencesOpen(!mobileExperiencesOpen)}
                  className={`w-full flex items-center justify-between text-base font-bold py-2 border-b ${
                    isHeroMode
                      ? "text-white hover:text-cyan-300 border-white/10"
                      : "text-black hover:text-[#0097CA] border-gray-100"
                  }`}
                >
                  <span>{language === "ar" ? "تجارب" : "Experiences"}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      mobileExperiencesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {mobileExperiencesOpen && (
                  <div className="py-2.5 ps-3 space-y-3 animate-in fade-in duration-150">
                    {EXPERIENCES_DROPDOWN_SECTIONS.map((sec) => (
                      <div key={sec.title} className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#0097CA]">
                          {language === "ar" ? sec.titleAr : sec.title}
                        </span>
                        <div className="space-y-1 ps-1.5">
                          {sec.items.map((item) => (
                            <Link
                              key={item.label}
                              href={item.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className={`block text-xs font-semibold py-1 ${
                                isHeroMode
                                  ? "text-white/85 hover:text-cyan-300"
                                  : "text-black/85 hover:text-[#0097CA]"
                              }`}
                            >
                              {language === "ar" ? item.labelAr : item.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                    <Link
                      href="/experiences"
                      onClick={() => setMobileMenuOpen(false)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#0097CA] pt-1"
                    >
                      <span>
                        {language === "ar"
                          ? "عرض جميع التجارب"
                          : "View all experiences"}
                      </span>
                      <span>→</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* Destinations with Collapsible Submenu */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileDestinationsOpen(!mobileDestinationsOpen)}
                  className={`w-full flex items-center justify-between text-base font-bold py-2 border-b ${
                    isHeroMode
                      ? "text-white hover:text-cyan-300 border-white/10"
                      : "text-black hover:text-[#0097CA] border-gray-100"
                  }`}
                >
                  <span>{language === "ar" ? "وجهات" : "Destinations"}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      mobileDestinationsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {mobileDestinationsOpen && (
                  <div className="grid grid-cols-2 gap-1.5 py-2.5 ps-2 animate-in fade-in duration-150">
                    {DESTINATION_LIST.map((dest) => (
                      <Link
                        key={dest.name}
                        href={`/experiences?destination=${encodeURIComponent(dest.destinationParam)}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`text-xs font-bold py-1 flex items-center gap-1.5 ${
                          isHeroMode
                            ? "text-white/85 hover:text-cyan-300"
                            : "text-black/85 hover:text-[#0097CA]"
                        }`}
                      >
                        <MapPin className="w-3 h-3 text-[#0097CA] shrink-0" />
                        <span className="truncate">
                          {language === "ar" ? dest.nameAr : dest.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* About */}
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-bold py-2 border-b ${
                  isHeroMode
                    ? "text-white hover:text-cyan-300 border-white/10"
                    : "text-black hover:text-[#0097CA] border-gray-100"
                }`}
              >
                {language === "ar" ? "عن جوّ قطر" : "About"}
              </Link>
            </nav>

            <div
              className={`pt-3 border-t flex items-center justify-between ${
                isHeroMode ? "border-white/15" : "border-gray-200"
              }`}
            >
              <span
                className={`text-xs font-bold ${
                  isHeroMode ? "text-white/70" : "text-black/70"
                }`}
              >
                {language === "ar" ? "تبديل اللغة:" : "Switch Language:"}
              </span>
              <button
                type="button"
                onClick={() => {
                  setLanguage(language === "en" ? "ar" : "en");
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-2 rounded-lg bg-[#0097CA] text-white text-xs font-bold cursor-pointer"
              >
                {language === "en" ? "العربية" : "English"}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      <CartDrawer />
    </>
  );
}
