"use client";

import React from "react";
import Image from "next/image";
import reviewsData from "@/data/reviews.json";
import { useLanguage } from "@/context/LanguageContext";
import { Star, CheckCircle, Award } from "lucide-react";

export function ReviewsSection() {
  const { t } = useLanguage();

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-[#F8F5EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00A3C4] uppercase tracking-wider">
              <Award className="w-4 h-4 text-[#D4AF37]" />
              <span>{t.tripAdvisorAward}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0A1E3F]">
              {t.reviewsTitle}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-xl">
              {t.reviewsSubtitle}
            </p>
          </div>

          {/* Rating Summary Card */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-200/60 flex items-center gap-4 shrink-0">
            <div className="w-14 h-14 rounded-xl bg-[#0A1E3F] text-white flex flex-col items-center justify-center font-extrabold">
              <span className="text-xl leading-none">4.9</span>
              <span className="text-[10px] text-gray-300 font-normal mt-0.5">/ 5.0</span>
            </div>
            <div>
              <div className="flex text-amber-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <div className="text-xs font-bold text-[#0A1E3F] mt-1">
                TripAdvisor Best of the Best 2024
              </div>
              <div className="text-[11px] text-gray-500">{t.happyTravelers}</div>
            </div>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviewsData.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400 gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">{rev.date}</span>
                </div>

                <h4 className="text-base font-bold text-[#0A1E3F] leading-snug">
                  &ldquo;{rev.title}&rdquo;
                </h4>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed italic">
                  {rev.comment}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 shrink-0">
                    <Image
                      src={rev.avatar}
                      alt={rev.author}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0A1E3F] flex items-center gap-1">
                      {rev.author}
                      <CheckCircle className="w-3.5 h-3.5 text-[#00A3C4]" />
                    </div>
                    <div className="text-[11px] text-gray-400">{rev.country}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
