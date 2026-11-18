"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import faqsData from "@/data/faqs.json";
import {
  ChevronDown,
  Phone,
  Mail,
  ExternalLink
} from "lucide-react";

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.972.53 1.761.815 2.796.816h.005c3.18 0 5.767-2.587 5.769-5.766.001-1.543-.599-2.993-1.69-4.085-1.09-1.092-2.54-1.692-4.084-1.692zm9.969 5.766c-.003 5.485-4.464 9.946-9.969 9.946-1.745 0-3.376-.454-4.81-1.246l-5.221 1.368 1.393-5.088c-.878-1.493-1.341-3.21-1.341-4.98 0-5.485 4.463-9.946 9.97-9.946 2.662 0 5.166 1.036 7.049 2.919 1.882 1.882 2.926 4.385 2.929 7.047z" />
    </svg>
  );
}

export interface FaqItem {
  id: string;
  question: string;
  questionAr: string;
  answer: string;
  answerAr: string;
}

export interface FaqCategory {
  category: string;
  categoryTitle: string;
  categoryTitleAr: string;
  categorySubtitle: string;
  categorySubtitleAr: string;
  items: FaqItem[];
}

export default function FaqPage() {
  const { language } = useLanguage();
  const categories = faqsData as FaqCategory[];

  // Active Category Filter ("all" or specific category ID)
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Track expanded accordion item IDs
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleAccordion = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handlePillClick = (catId: string) => {
    if (selectedCategory === catId) {
      setSelectedCategory("all");
    } else {
      setSelectedCategory(catId);
      const element = document.getElementById(`section-${catId}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const filteredCategories =
    selectedCategory === "all"
      ? categories
      : categories.filter((c) => c.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA]">
      <Navbar />

      <main className="flex-1 pt-24 sm:pt-28 pb-20">
        <div className="max-w-[1240px] mx-auto px-4 md:px-6 lg:px-10 space-y-12">
          {/* ==============================================================
              1. HERO SECTION (Pixel-Perfect from footerfaq.png)
              ============================================================== */}
          <div className="space-y-4 max-w-3xl pt-4">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-[#0097CA] block">
              {language === "ar" ? "مركز المساعدة" : "HELP CENTRE"}
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-bold text-black tracking-tight leading-[1.08]">
              {language === "ar" ? "كيف يمكننا مساعدتك؟" : "How can we help?"}
            </h1>

            <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed max-w-2xl">
              {language === "ar"
                ? "27 إجابة شاملة حول مواعيد الاستقبال، والزي المناسب، والمدفوعات وسياسات الحجز. إذا لم تجد ما تبحث عنه، فريقنا يجيبك خلال ساعات عبر واتساب."
                : "27 answers across pickup timings, dress codes, payments and policy. If you can't find what you're looking for, our team replies within a few hours on WhatsApp."}
            </p>

            {/* Quick Category Pills with Counts */}
            <div className="flex items-center gap-2.5 flex-wrap pt-2">
              {categories.map((cat) => {
                const title =
                  language === "ar" ? cat.categoryTitleAr : cat.categoryTitle;
                const isSelected = selectedCategory === cat.category;

                return (
                  <button
                    key={cat.category}
                    type="button"
                    onClick={() => handlePillClick(cat.category)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#0097CA] text-white shadow-sm"
                        : "bg-white border border-gray-200/90 text-black hover:border-gray-300 hover:shadow-xs"
                    }`}
                  >
                    <span>{title}</span>
                    <span
                      className={`text-[11px] font-semibold ${
                        isSelected ? "text-cyan-100" : "text-gray-400"
                      }`}
                    >
                      {cat.items.length}
                    </span>
                  </button>
                );
              })}

              {selectedCategory !== "all" && (
                <button
                  type="button"
                  onClick={() => setSelectedCategory("all")}
                  className="text-xs font-bold text-gray-500 hover:text-black underline ms-2 cursor-pointer"
                >
                  {language === "ar" ? "عرض الكل" : "Show all"}
                </button>
              )}
            </div>
          </div>

          {/* ==============================================================
              2. TWO-COLUMN LAYOUT (Accordions Left, Sticky Contact Right)
              ============================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 lg:gap-12 items-start">
            {/* LEFT COLUMN: FAQ CATEGORIES & ACCORDIONS */}
            <div className="space-y-12">
              {filteredCategories.map((cat) => {
                const catTitle =
                  language === "ar" ? cat.categoryTitleAr : cat.categoryTitle;
                const catSubtitle =
                  language === "ar"
                    ? cat.categorySubtitleAr
                    : cat.categorySubtitle;

                return (
                  <section
                    key={cat.category}
                    id={`section-${cat.category}`}
                    className="space-y-4 scroll-mt-28"
                  >
                    <div className="space-y-1 pb-1">
                      <h2 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
                        {catTitle}
                      </h2>
                      <p className="text-xs text-gray-500">{catSubtitle}</p>
                    </div>

                    <div className="space-y-2.5">
                      {cat.items.map((item) => {
                        const question =
                          language === "ar" ? item.questionAr : item.question;
                        const answer =
                          language === "ar" ? item.answerAr : item.answer;
                        const isExpanded = !!expandedIds[item.id];

                        return (
                          <div
                            key={item.id}
                            className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200/80 shadow-2xs overflow-hidden transition-all duration-200"
                          >
                            <button
                              type="button"
                              onClick={() => toggleAccordion(item.id)}
                              className="w-full px-5 sm:px-6 py-4.5 text-start flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50/50 transition-colors"
                              aria-expanded={isExpanded}
                            >
                              <span className="text-sm sm:text-[15px] font-semibold text-black leading-snug">
                                {question}
                              </span>
                              <ChevronDown
                                className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-300 ${
                                  isExpanded ? "rotate-180 text-[#0097CA]" : ""
                                }`}
                              />
                            </button>

                            {isExpanded && (
                              <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-[13px] text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/30 animate-fade-in">
                                <p className="pt-2">{answer}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
            </div>

            {/* RIGHT COLUMN: STICKY CONTACT CARD */}
            <aside className="lg:sticky lg:top-28">
              <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-7 shadow-xs space-y-5">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#0097CA] block">
                    {language === "ar" ? "هل ما زلت بحاجة للمساعدة؟" : "STILL NEED HELP?"}
                  </span>
                  <h3 className="text-lg font-bold text-black tracking-tight">
                    {language === "ar"
                      ? "فريقنا يجيب خلال ساعات."
                      : "Our team replies within hours."}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {language === "ar"
                      ? "تواصل معنا عبر واتساب للحصول على أسرع إجابة."
                      : "Reach us on WhatsApp for the fastest answer."}
                  </p>
                </div>

                <div className="space-y-3 pt-1">
                  {/* WhatsApp Channel */}
                  <a
                    href="https://wa.me/971554030943"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 rounded-2xl border border-gray-200 hover:border-[#0097CA] hover:bg-cyan-50/30 transition-all flex items-center gap-3.5 group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#25D366] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <WhatsAppIcon className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <span className="text-xs font-bold text-black group-hover:text-[#0097CA] transition-colors flex items-center gap-1">
                        WhatsApp
                        <ExternalLink className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </span>
                      <p className="text-[11px] text-gray-500 truncate">
                        +971 55 4030 943
                      </p>
                    </div>
                  </a>

                  {/* Email Channel */}
                  <a
                    href="mailto:support@oceanairtravels.com"
                    className="p-3.5 rounded-2xl border border-gray-200 hover:border-[#0097CA] hover:bg-cyan-50/30 transition-all flex items-center gap-3.5 group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-full bg-cyan-50 text-[#0097CA] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <span className="text-xs font-bold text-black group-hover:text-[#0097CA] transition-colors">
                        {language === "ar" ? "البريد الإلكتروني" : "Email"}
                      </span>
                      <p className="text-[11px] text-gray-500 truncate">
                        support@oceanairtravels.com
                      </p>
                    </div>
                  </a>

                  {/* Phone Channel */}
                  <a
                    href="tel:+971554030943"
                    className="p-3.5 rounded-2xl border border-gray-200 hover:border-[#0097CA] hover:bg-cyan-50/30 transition-all flex items-center gap-3.5 group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-full bg-cyan-50 text-[#0097CA] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <span className="text-xs font-bold text-black group-hover:text-[#0097CA] transition-colors">
                        {language === "ar" ? "الهاتف المباشر" : "Phone"}
                      </span>
                      <p className="text-[11px] text-gray-500 truncate">
                        +971 55 4030 943
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
