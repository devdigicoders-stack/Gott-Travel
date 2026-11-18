"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ExperienceCard } from "@/components/ExperienceCard";
import { ExperienceCollectionPage } from "@/components/ExperienceCollectionPage";
import { ExperienceDetailPageComponent } from "@/components/ExperienceDetailPageComponent";
import experiencesData from "@/data/experiences.json";
import catalogExperiencesData from "@/data/catalog_experiences.json";
import { Experience, CatalogExperience } from "@/types";
import { useCurrency } from "@/context/CurrencyContext";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import {
  Star,
  Clock,
  ShieldCheck,
  MapPin,
  Check,
  X,
  Calendar,
  Users,
  ChevronRight,
  Sparkles,
  Share2,
  Heart
} from "lucide-react";

function getExperience(slug: string): Experience | undefined {
  let experience: Experience | undefined = (experiencesData as unknown as Experience[]).find((e) => e.slug === slug);
  if (!experience) {
    const catalogItem = (catalogExperiencesData as unknown as CatalogExperience[]).find(
      (c) => c.slug === slug
    );
    if (catalogItem) {
      const firstBadge = catalogItem.badges && catalogItem.badges.length > 0 ? catalogItem.badges[0] : undefined;
      experience = {
        id: catalogItem.id,
        slug: catalogItem.slug,
        title: catalogItem.title,
        titleAr: catalogItem.titleAr || catalogItem.title,
        shortDescription: `${catalogItem.title}. Discover top-rated sights in ${catalogItem.destination} with professional guides and seamless roundtrip transfers.`,
        shortDescriptionAr: `${catalogItem.title}. اكتشف أجمل المعالم في ${catalogItem.destinationAr || catalogItem.destination} مع مرشدين معتمدين ونقل مريح.`,
        destinationId: catalogItem.destination.toLowerCase().replace(/[^a-z0-9]/g, "-"),
        destinationName: catalogItem.destination,
        destinationNameAr: catalogItem.destinationAr || catalogItem.destination,
        categoryId: catalogItem.category.toLowerCase(),
        categoryName: catalogItem.category,
        categoryNameAr: catalogItem.categoryAr || catalogItem.category,
        price: catalogItem.price,
        ...(catalogItem.originalPrice ? { originalPrice: catalogItem.originalPrice } : {}),
        currency: "EUR",
        rating: catalogItem.rating,
        reviewCount: catalogItem.reviews,
        duration: catalogItem.duration,
        pickupIncluded: true,
        cancellationPolicy: "Free cancellation up to 24 hours before experience starts.",
        cancellationPolicyAr: "إلغاء مجاني حتى 24 ساعة قبل موعد بدء التجربة.",
        ...(firstBadge
          ? { badge: firstBadge, badgeAr: firstBadge }
          : catalogItem.savePercent > 0
          ? { badge: `Save ${catalogItem.savePercent}%` }
          : {}),
        images: [
          catalogItem.image,
          "/brand/hero/home-hero.jpg",
          "/images/feat_sandboarding.jpg",
          "/images/dest_dubai.jpg"
        ],
        highlights: [
          `Authentic guided exploration across ${catalogItem.destination}`,
          "Air-conditioned luxury transfers with certified local expert guides",
          "Includes signature local refreshments, photo stops, and priority admission",
          "Small group experience ensuring attentive service and guest-first pacing"
        ],
        itinerary: [
          { time: "09:00 AM", title: "Hotel Pickup", desc: "Comfortable pickup in an air-conditioned luxury vehicle from your hotel or residence." },
          { time: "10:30 AM", title: "Signature Sightseeing & Activities", desc: "Immersive guided experience exploring key historical and scenic landmarks." },
          { time: "13:30 PM", title: "Refreshments & Local Dining", desc: "Enjoy premium local hospitality, refreshments, and authentic delicacies." },
          { time: "15:00 PM", title: "Return Transfer", desc: "Relax on the scenic return journey back to your pickup location." }
        ],
        inclusions: [
          "Hotel pickup and drop-off in air-conditioned vehicle",
          "Licensed English & Arabic speaking professional guide",
          "All entry permits, tickets, and safety equipment",
          "Unlimited cold mineral water, soft drinks, and Arabic coffee"
        ],
        exclusions: [
          "Personal souvenir purchases and gratuities",
          "Optional upgrades not selected at booking"
        ]
      };
    }
  }
  return experience;
}

function TourDetailContent({ experience }: { experience: Experience }) {
  const { formatPrice } = useCurrency();
  const { addItem } = useCart();
  const { language } = useLanguage();

  // Booking state
  const [selectedDate, setSelectedDate] = useState("2026-11-20");
  const [selectedTime, setSelectedTime] = useState(
    experience.itinerary[0]?.time || "14:00 PM"
  );
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const pricePerAdult = experience.price;
  const pricePerChild = Math.round(experience.price * 0.7);
  const totalCostAed = adults * pricePerAdult + childrenCount * pricePerChild;

  const handleAddToCart = () => {
    const bookingId = `${experience.id}-${selectedDate}-${selectedTime.replace(/[^a-zA-Z0-9]/g, "")}`;
    addItem({
      id: bookingId,
      experience,
      date: selectedDate,
      timeSlot: selectedTime,
      adults,
      children: childrenCount,
      totalPrice: totalCostAed,
    });
  };

  const relatedExperiences = experiencesData.filter(
    (e) => e.id !== experience.id && e.destinationId === experience.destinationId
  );

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
    <div className="min-h-screen flex flex-col bg-[#FBFBFA]">
      <Navbar />

      <main className="flex-1 pb-20 pt-20">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-xs text-gray-500 font-medium">
            <Link href="/" className="hover:text-[#00A3C4] transition-colors">
              {language === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
            <Link
              href={`/experiences?destination=${encodeURIComponent(experience.destinationName)}`}
              className="hover:text-[#00A3C4] transition-colors"
            >
              {destName}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
            <span className="text-gray-900 truncate max-w-xs">{title}</span>
          </nav>
        </div>

        {/* Title Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                {badge && (
                  <span className="inline-flex items-center gap-1 bg-[#D4AF37]/15 text-[#927315] text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                    <Sparkles className="w-3 h-3" />
                    {badge}
                  </span>
                )}
                <span className="text-xs text-gray-500">{categoryName}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0A1E3F] leading-tight">
                {title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-gray-900">{experience.rating}</span>
                  <span>({experience.reviewCount} {language === "ar" ? "تقييم" : "reviews"})</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  <span>{destName}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  <span>{experience.duration}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start">
              <button
                type="button"
                className="p-2.5 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer"
                aria-label="Share"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="p-2.5 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer"
                aria-label="Save to wishlist"
              >
                <Heart className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Photo Gallery Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-3 h-[320px] sm:h-[420px] md:h-[480px] rounded-2xl overflow-hidden">
            <div className="md:col-span-2 md:row-span-2 relative">
              <Image
                src={experience.images[0] || experience.images[activePhotoIdx]}
                alt={title}
                fill
                priority
                className="object-cover cursor-pointer hover:scale-102 transition-transform duration-300"
                onClick={() => setActivePhotoIdx(0)}
              />
            </div>
            {experience.images.slice(1, 5).map((img, i) => (
              <div key={i} className="relative hidden md:block">
                <Image
                  src={img}
                  alt={`${title} - ${i + 2}`}
                  fill
                  className="object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={() => setActivePhotoIdx(i + 1)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Main Content & Sticky Booking Form */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column (2 Cols) */}
            <div className="lg:col-span-2 space-y-10">
              {/* Highlights */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-[#0A1E3F]">
                  {language === "ar" ? "أبرز مميزات التجربة" : "Experience Highlights"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {experience.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-gray-100 shadow-xs"
                    >
                      <Check className="w-4 h-4 text-[#00A3C4] shrink-0 mt-0.5" />
                      <span className="text-xs text-gray-700 leading-relaxed">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#0A1E3F]">
                  {language === "ar" ? "نظرة عامة" : "Overview"}
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
              </div>

              {/* Itinerary */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-[#0A1E3F]">
                  {language === "ar" ? "برنامج الرحلة" : "Itinerary"}
                </h2>
                <div className="relative pl-6 rtl:pl-0 rtl:pr-6 border-l-2 rtl:border-l-0 rtl:border-r-2 border-[#00A3C4]/30 space-y-6 my-4">
                  {experience.itinerary.map((step, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-[31px] rtl:-left-auto rtl:-right-[31px] top-0 w-4 h-4 rounded-full bg-[#00A3C4] border-4 border-white shadow-xs" />
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-[#00A3C4]">
                          {step.time}
                        </span>
                        <h4 className="text-sm font-bold text-gray-900">
                          {step.title}
                        </h4>
                        <p className="text-xs text-gray-600">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusions & Exclusions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-200">
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    {language === "ar" ? "ما تشمله التجربة" : "What's Included"}
                  </h3>
                  <ul className="space-y-2 text-xs text-gray-600">
                    {experience.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <X className="w-4 h-4 text-red-500" />
                    {language === "ar" ? "ما لا تشمله التجربة" : "What's Excluded"}
                  </h3>
                  <ul className="space-y-2 text-xs text-gray-600">
                    {experience.exclusions.map((exc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <X className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Policy Notes */}
              <div className="p-4 rounded-xl bg-[#00A3C4]/5 border border-[#00A3C4]/20 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#00A3C4] shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <div className="font-bold text-[#0A1E3F]">
                    {language === "ar" ? "سياسة الإلغاء المرنة" : "Flexible Cancellation"}
                  </div>
                  <p className="text-gray-600">
                    {language === "ar"
                      ? experience.cancellationPolicyAr || experience.cancellationPolicy
                      : experience.cancellationPolicy}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Booking Widget (1 Col) */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-2xl border border-gray-200 p-6 shadow-xl space-y-6">
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                    {language === "ar" ? "السعر يبدأ من" : "Starting from"}
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-extrabold text-[#0A1E3F]">
                      {formatPrice(experience.price)}
                    </span>
                    <span className="text-xs text-gray-500">
                      / {language === "ar" ? "للشخص" : "per person"}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-100">
                  {/* Date Selection */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#00A3C4]" />
                      {language === "ar" ? "اختر التاريخ" : "Select Date"}
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-800 focus:outline-hidden focus:border-[#00A3C4]"
                    />
                  </div>

                  {/* Time Slot Selection */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#00A3C4]" />
                      {language === "ar" ? "وقت الانطلاق" : "Departure Time"}
                    </label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-800 focus:outline-hidden focus:border-[#00A3C4]"
                    >
                      <option value="09:00 AM">09:00 AM (Morning Safari)</option>
                      <option value="14:00 PM">02:00 PM (Sunset Safari)</option>
                      <option value="16:00 PM">04:00 PM (Evening Safari)</option>
                    </select>
                  </div>

                  {/* Guests Counter */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between">
                      <div className="text-xs">
                        <div className="font-bold text-gray-800">
                          {language === "ar" ? "البالغين" : "Adults"}
                        </div>
                        <div className="text-gray-400 text-[11px]">
                          {formatPrice(pricePerAdult)}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-xs font-bold hover:bg-gray-50"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-bold">
                          {adults}
                        </span>
                        <button
                          type="button"
                          onClick={() => setAdults(adults + 1)}
                          className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-xs font-bold hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-xs">
                        <div className="font-bold text-gray-800">
                          {language === "ar" ? "الأطفال (تحت 12)" : "Children (<12)"}
                        </div>
                        <div className="text-gray-400 text-[11px]">
                          {formatPrice(pricePerChild)}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                          className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-xs font-bold hover:bg-gray-50"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-bold">
                          {childrenCount}
                        </span>
                        <button
                          type="button"
                          onClick={() => setChildrenCount(childrenCount + 1)}
                          className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-xs font-bold hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total and CTA Button */}
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-semibold">
                      {language === "ar" ? "المجموع الكلي:" : "Total Price:"}
                    </span>
                    <span className="text-xl font-extrabold text-[#0A1E3F]">
                      {formatPrice(totalCostAed)}
                    </span>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    type="button"
                    className="w-full py-3.5 rounded-xl bg-[#0097CA] hover:bg-[#0083B0] text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Users className="w-4 h-4" />
                    <span>{language === "ar" ? "أضف إلى السلة" : "Book This Experience"}</span>
                  </button>
                  <p className="text-center text-[11px] text-gray-400">
                    {language === "ar" ? "تأكيد فوري للحجز" : "Instant confirmation"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Tours */}
        {relatedExperiences.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-[#0A1E3F]">
              {language === "ar"
                ? `تجارب سياحية أخرى في ${destName}`
                : `Other experiences in ${destName}`}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedExperiences.map((rel) => (
                <ExperienceCard key={rel.id} experience={rel} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function ExperienceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);

  // Check if requested slug is an Experience Collection / Subcategory
  if (resolvedParams.slug === "dubai-desert-safari") {
    return (
      <ExperienceCollectionPage
        destinationName="Dubai"
        destinationNameAr="دبي"
        collectionTitle="Dubai Desert Safari."
        collectionTitleAr="سفاري صحراء دبي."
        collectionSubtitle="Dune bashing, camel rides and desert camps across Dubai."
        collectionSubtitleAr="قيادة الكثبان الرملية وركوب الجمال والمخيمات الصحراوية التراثية في دبي."
        heroImage="/brand/hero/home-hero.jpg"
        toursCount={10}
        averageRating={4.8}
        lowestPrice={31.62}
      />
    );
  }
  if (resolvedParams.slug === "dubai-city-tours") {
    return (
      <ExperienceCollectionPage
        destinationName="Dubai"
        destinationNameAr="دبي"
        collectionTitle="Dubai City Tours."
        collectionTitleAr="جولات مدينة دبي."
        collectionSubtitle="Modern skyline marvels, historic creek abra rides and vibrant souks."
        collectionSubtitleAr="روائع العمارة الحديثة، وجولات العبرة التراثية في خور دبي، وأسواق الذهب والتوابل العريقة."
        heroImage="/images/exp_alfahidi_walking.jpg"
        toursCount={8}
        averageRating={4.8}
        lowestPrice={18.02}
      />
    );
  }
  if (resolvedParams.slug === "abu-dhabi-city-tours") {
    return (
      <ExperienceCollectionPage
        destinationName="Abu Dhabi"
        destinationNameAr="أبوظبي"
        collectionTitle="Abu Dhabi City Tours."
        collectionTitleAr="جولات مدينة أبوظبي."
        collectionSubtitle="Sheikh Zayed Grand Mosque, Louvre Abu Dhabi and cultural palaces."
        collectionSubtitleAr="جامع الشيخ زايد الكبير المهيب، ومتحف اللوفر أبوظبي، والقصور الثقافية والتراثية."
        heroImage="/images/dest_abu_dhabi.jpg"
        toursCount={8}
        averageRating={4.8}
        lowestPrice={22.72}
      />
    );
  }
  if (resolvedParams.slug === "abu-dhabi-desert-safari") {
    return (
      <ExperienceCollectionPage
        destinationName="Abu Dhabi"
        destinationNameAr="أبوظبي"
        collectionTitle="Abu Dhabi Desert Safari."
        collectionTitleAr="سفاري صحراء أبوظبي."
        collectionSubtitle="Golden dune driving, camel rides and Bedouin desert hospitality."
        collectionSubtitleAr="قيادة الكثبان الرملية الذهبية، وركوب الجمال، وكرم الضيافة البدوية في قلب الصحراء."
        heroImage="/images/exp_abu_dhabi_safari.jpg"
        toursCount={6}
        averageRating={4.9}
        lowestPrice={44.89}
      />
    );
  }
  if (resolvedParams.slug === "doha-desert-safari") {
    return (
      <ExperienceCollectionPage
        destinationName="Doha"
        destinationNameAr="الدوحة"
        collectionTitle="Doha Desert Safari."
        collectionTitleAr="سفاري صحراء الدوحة."
        collectionSubtitle="Thrilling dune bashing to the Inland Sea (Khor Al Adaid) and sunset camel rides."
        collectionSubtitleAr="مغامرات الكثبان الرملية نحو خور العديد (البحر الداخلي) وركوب الجمال وقت الغروب."
        heroImage="/images/dest_doha.jpg"
        toursCount={6}
        averageRating={4.9}
        lowestPrice={49.0}
      />
    );
  }

  // Specific experience plan matching experiencespecificplanmodelcomponent.png
  if (resolvedParams.slug === "dubai-premium-safari-camel-ride-al-khayma-camp-3-buffets") {
    return <ExperienceDetailPageComponent />;
  }

  const experience = getExperience(resolvedParams.slug);
  if (!experience) {
    notFound();
  }

  return <TourDetailContent experience={experience} />;
}
