"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ExperienceCard } from "@/components/ExperienceCard";
import { QatarCityCatalogSection } from "@/components/QatarCityCatalogSection";
import { MuseumCulturalCatalogSection } from "@/components/MuseumCulturalCatalogSection";
import { ComboToursCatalogSection } from "@/components/ComboToursCatalogSection";
import { BeyondDohaCatalogSection } from "@/components/BeyondDohaCatalogSection";
import { AdventureWaterparkCatalogSection } from "@/components/AdventureWaterparkCatalogSection";
import { DesertSafariCatalogSection } from "@/components/DesertSafariCatalogSection";
import destinationsData from "@/data/destinations.json";
import experiencesData from "@/data/experiences.json";
import { useLanguage } from "@/context/LanguageContext";
import { MapPin, Compass, ChevronRight, Award } from "lucide-react";

export default function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const destination = destinationsData.find((d) => d.slug === resolvedParams.slug);

  if (!destination) {
    notFound();
  }

  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const destinationExperiences = experiencesData.filter(
    (exp) => exp.destinationId === destination.id
  );

  const filteredExperiences = activeCategory === "all"
    ? destinationExperiences
    : destinationExperiences.filter((exp) => exp.categoryId === activeCategory);

  const destName = language === "ar" && destination.nameAr ? destination.nameAr : destination.name;
  const countryName =
    language === "ar" && destination.countryAr ? destination.countryAr : destination.country;
  const description =
    language === "ar" && destination.descriptionAr
      ? destination.descriptionAr
      : destination.description;

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA]">
      <Navbar />

      <main className="flex-1 pb-20">
        {/* Destination Hero */}
        <div
          style={{ position: "relative" }}
          className="relative h-[380px] sm:h-[460px] w-full overflow-hidden bg-[#07152B] text-white"
        >
          <Image
            src={destination.image}
            alt={destName}
            fill
            priority
            className="object-cover opacity-60 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07152B] via-black/40 to-black/20" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-12 space-y-3">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <Link href="/" className="hover:text-[#00A3C4]">
                {language === "ar" ? "الرئيسية" : "Home"}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
              <span>{t.navDestinations}</span>
              <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
              <span className="text-white font-semibold">{destName}</span>
            </div>

            <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold">
              <MapPin className="w-4 h-4" />
              <span>{countryName}</span>
              <span>•</span>
              <span>
                {destinationExperiences.length} {t.curatedTours}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              {destName}
            </h1>

            <p className="max-w-2xl text-sm sm:text-base text-gray-200 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Featured Qatar Catalog when viewing Doha */}
        {resolvedParams.slug === "doha" && (
          <>
            <QatarCityCatalogSection className="pt-8 pb-2" />
            <MuseumCulturalCatalogSection className="pt-2 pb-2" />
            <ComboToursCatalogSection className="pt-2 pb-2" />
            <BeyondDohaCatalogSection className="pt-2 pb-2" />
            <AdventureWaterparkCatalogSection className="pt-2 pb-2" />
            <DesertSafariCatalogSection className="pt-2 pb-4" />
          </>
        )}

        {/* Filter Bar & Tour Catalog */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200/80 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0A1E3F]">
                {language === "ar" ? `أفضل الأنشطة في ${destName}` : `Things to do in ${destName}`}
              </h2>
              <p className="text-xs text-gray-500">
                {language === "ar"
                  ? `عرض ${filteredExperiences.length} تجربة سياحية مختارة`
                  : `Showing ${filteredExperiences.length} hand-picked experiences`}
              </p>
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === "all"
                    ? "bg-[#0A1E3F] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {t.allExperiences}
              </button>
              <button
                onClick={() => setActiveCategory("desert")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === "desert"
                    ? "bg-[#0A1E3F] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {language === "ar" ? "سفاري صحراوي" : "Desert Safaris"}
              </button>
              <button
                onClick={() => setActiveCategory("city-tours")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === "city-tours"
                    ? "bg-[#0A1E3F] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {language === "ar" ? "جولات المدينة" : "City Sightseeing"}
              </button>
              <button
                onClick={() => setActiveCategory("cultural")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === "cultural"
                    ? "bg-[#0A1E3F] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {language === "ar" ? "المتاحف والتراث" : "Museums & Culture"}
              </button>
            </div>
          </div>

          {/* Grid */}
          {filteredExperiences.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-gray-100 space-y-3">
              <Compass className="w-12 h-12 text-gray-300 mx-auto" />
              <h3 className="text-lg font-bold text-[#0A1E3F]">
                {language === "ar" ? "لا توجد جولات في هذه الفئة حالياً" : "No tours found in this category"}
              </h3>
              <p className="text-xs text-gray-500">
                {language === "ar"
                  ? `قم بالتبديل إلى "جميع التجارب" لمشاهدة كافة الأنشطة المتاحة في ${destName}.`
                  : `Switch to "All Experiences" to see everything available in ${destName}.`}
              </p>
              <button
                onClick={() => setActiveCategory("all")}
                className="px-4 py-2 bg-[#0A1E3F] text-white text-xs font-bold rounded-xl"
              >
                {language === "ar" ? `مشاهدة جميع جولات ${destName}` : `View all ${destName} tours`}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredExperiences.map((exp) => (
                <ExperienceCard key={exp.id} experience={exp} />
              ))}
            </div>
          )}
        </div>

        {/* Travel Information & FAQs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xs space-y-6">
            <div className="flex items-center gap-2 text-xs font-bold text-[#00A3C4] uppercase tracking-wider">
              <Award className="w-4 h-4 text-[#D4AF37]" />
              <span>{language === "ar" ? "معلومات هامة قبل الانطلاق" : "Good to know before you visit"}</span>
            </div>

            <h3 className="text-xl font-bold text-[#0A1E3F]">
              {language === "ar"
                ? `الأسئلة الأكثر شيوعاً حول زيارة ${destName}`
                : `Frequently Asked Questions about ${destName}`}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-gray-700">
              <div className="p-4 bg-gray-50 rounded-2xl space-y-1.5">
                <h4 className="font-bold text-[#0A1E3F]">
                  {language === "ar" ? "ما هو أفضل وقت في السنة للزيارة؟" : "When is the best time of year to visit?"}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {language === "ar"
                    ? "يمتد موسم السياحة المثالي من أكتوبر حتى أبريل، حيث يكون الطقس معتدلاً ومشجعاً للغاية لرحلات السفاري الصحراوية والجولات البحرية والأنشطة الخارجية."
                    : "The ideal travel season runs from October through April when daytime temperatures are pleasantly warm and evening breezes are perfect for desert safaris and outdoor excursions."}
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl space-y-1.5">
                <h4 className="font-bold text-[#0A1E3F]">
                  {language === "ar" ? "ما هي الملابس المناسبة للجولات والمواقع الثقافية؟" : "What should I wear for tours and cultural sites?"}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {language === "ar"
                    ? "يُنصح بارتداء ملابس قطنية خفيفة ومريحة. وعند زيارة المعالم الدينية والثقافية، يُرجى ارتداء ملابس محتشمة تغطي الكتفين والركبتين."
                    : "Casual, modest, lightweight clothing is recommended. When visiting cultural monuments and mosques, respectful attire covering shoulders and knees is appreciated."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
