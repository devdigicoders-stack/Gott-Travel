"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Experience } from "@/types";
import { useCurrency } from "@/context/CurrencyContext";
import { useLanguage } from "@/context/LanguageContext";
import { Star, Clock, ShieldCheck, ArrowRight, MapPin } from "lucide-react";

interface ExperienceCardProps {
  experience: Experience;
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  const { formatPrice } = useCurrency();
  const { language, t } = useLanguage();

  const title = language === "ar" && experience.titleAr ? experience.titleAr : experience.title;
  const description =
    language === "ar" && experience.shortDescriptionAr
      ? experience.shortDescriptionAr
      : experience.shortDescription;
  const destName =
    language === "ar" && experience.destinationNameAr
      ? experience.destinationNameAr
      : experience.destinationName;
  const badge =
    language === "ar" && experience.badgeAr ? experience.badgeAr : experience.badge;
  const categoryName =
    language === "ar" && experience.categoryNameAr
      ? experience.categoryNameAr
      : experience.categoryName;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Image container */}
      <div
        style={{ position: "relative", minHeight: "220px" }}
        className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100"
      >
        <Image
          src={experience.images[0]}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 flex flex-wrap gap-1.5 z-10">
          {badge && (
            <span className="bg-[#0A1E3F]/90 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-xs">
              {badge}
            </span>
          )}
          <span className="bg-white/90 backdrop-blur-xs text-[#0A1E3F] text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#00A3C4]" />
            {destName}
          </span>
        </div>

        {/* Rating overlay bottom left */}
        <div className="absolute bottom-2.5 left-3 rtl:left-auto rtl:right-3 flex items-center gap-1 bg-black/60 backdrop-blur-xs text-white text-xs px-2 py-0.5 rounded-md">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="font-bold">{experience.rating}</span>
          <span className="text-gray-300">({experience.reviewCount.toLocaleString()})</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="text-xs font-semibold text-[#00A3C4] uppercase tracking-wider">
            {categoryName}
          </div>

          <Link href={`/experiences/${experience.slug}`} className="block group-hover:text-[#00A3C4] transition-colors">
            <h3 className="text-base font-bold text-[#0A1E3F] line-clamp-2 leading-snug">
              {title}
            </h3>
          </Link>

          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Meta Pills */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            <span>{experience.duration}</span>
          </div>

          <div className="flex items-center gap-1 text-emerald-700 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="truncate max-w-[130px]">{t.freeCancelBadge}</span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-gray-400 block leading-none">{t.fromPrice}</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-lg font-extrabold text-[#0A1E3F]">
                {formatPrice(experience.price)}
              </span>
              {experience.originalPrice && (
                <span className="text-xs text-gray-400 line-through">
                  {formatPrice(experience.originalPrice)}
                </span>
              )}
            </div>
          </div>

          <Link
            href={`/experiences/${experience.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-[#0A1E3F] hover:bg-[#00A3C4] px-3.5 py-2 rounded-xl transition-colors shadow-xs"
          >
            <span>{t.explore}</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
