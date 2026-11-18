"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useCart } from "@/context/CartContext";
import {
  Star,
  Clock,
  MapPin,
  Calendar,
  Check,
  X,
  ShieldCheck,
  Share2,
  Heart,
  Camera,
  Compass,
  Utensils,
  Sparkles,
  Flame,
  Award,
  AlertTriangle,
  Users,
  CheckCircle2
} from "lucide-react";

export interface ExperienceDetailProps {
  slug?: string;
}

// 6 Feature cards matching "What makes this trip worth booking?"
const WHY_WORTH_BOOKING = [
  {
    id: "fast-track",
    title: "Designated Fast Track Access",
    titleAr: "مسار سريع ومخصص",
    desc: "Priority access to rides, activities & buffet with your Premium Tour Guide.",
    descAr: "أولوية الدخول إلى الأنشطة وركوب الجمال وبوفيه العشاء مع مرشدك السياحي الخاص.",
    image: "/images/exp_safari_alkhayma.jpg",
    icon: Compass,
  },
  {
    id: "exclusive-access",
    title: "Exclusive Access to Al Khayma Camp",
    titleAr: "دخول حصري لمخيم الخيمة",
    desc: "Exclusive access to award-winning Al Khayma Camp.",
    descAr: "دخول حصري ومميز لمخيم الخيمة التراثي الحائز على أرقى الجوائز العالمية.",
    image: "/images/exp_alkhayma_bbq.jpg",
    icon: ShieldCheck,
  },
  {
    id: "michelin-dining",
    title: "Dining by a Michelin Bib Gourmand-Awarded Restaurant",
    titleAr: "تناول طعام برعاية مطعم ميشلان بيب جورماند",
    desc: "Dining Experience Curated by a Michelin Bib Gourmand-Awarded Restaurant.",
    descAr: "تجربة طعام وبوفيهات فاخرة مُعدّة بإشراف مطعم حائز على تصنيف ميشلان العالمي.",
    image: "/images/oceanair_13.jpg",
    icon: Utensils,
  },
  {
    id: "arabian-legends",
    title: "Meet the Arabian Legends",
    titleAr: "تعرّف على الخيول العربية الأصيلة",
    desc: "Exclusive access to Al Jalah Arabian Horse Stud and horse show.",
    descAr: "دخول حصري إلى مربط الجلاح للخيول العربية الأصيلة مع عرض استعراضي مبهر.",
    image: "/images/exp_heritage_vintage_gclass.jpg",
    icon: Award,
  },
  {
    id: "sunset-camel",
    title: "The Longest Camel Ride at Sunset",
    titleAr: "أطول مسار لركوب الجمال وقت الغروب",
    desc: "Dubai's longest camel ride with sunset views.",
    descAr: "أطول جولة قافلة جمال في دبي مع إطلالات ساحرة على غروب الشمس الذهبي.",
    image: "/images/exp_horse_riding.jpg",
    icon: Flame,
  },
  {
    id: "stargazing",
    title: "Stargazing Session",
    titleAr: "جلسة مراقبة النجوم بالتلسكوب",
    desc: "Explore the desert night sky with an expert astronomer.",
    descAr: "استكشف سماء الصحراء الليلية وكواكبها مع عالم فلك متخصص عبر تلسكوب احترافي.",
    image: "/images/oceanair_8.jpg",
    icon: Sparkles,
  },
];

// Timeline Itinerary steps matching "Your trip, hour by hour"
const ITINERARY_STEPS = [
  {
    duration: "45 min",
    durationAr: "45 دقيقة",
    title: "Ride to the Lahbab Desert",
    titleAr: "الانطلاق إلى صحراء لهباب",
    desc: "Hop into a 4-wheel drive vehicle with your designated premium safari captain and head straight for the rolling dunes. Get ready for an epic ride into the heart of the wilderness!",
    descAr: "انطلق بسيارة دفع رباعي مجهزة مع قائد السفاري المحترف نحو الكثبان الرملية الحمراء المهيبة لتبدأ المغامرة في قلب الصحراء.",
    images: [],
  },
  {
    duration: "35 min",
    durationAr: "35 دقيقة",
    title: "Optional Quad Bike Adventure",
    titleAr: "مغامرة الدراجات الرباعية (اختياري)",
    desc: "Add an extra thrill to your desert escape with a 35-minute quad bike ride across Dubai's red dunes.",
    descAr: "أضف مزيداً من الحماس والإثارة لرحلتك مع جولة قيادة الدراجات الرباعية لمدة 35 دقيقة عبر الكثبان الحمراء.",
    images: ["/images/exp_half_day_quad.jpg", "/images/exp_red_dune_quad.jpg"],
  },
  {
    duration: "45 min",
    durationAr: "45 دقيقة",
    title: "Dunebashing & Sandboarding Experience",
    titleAr: "مغامرة قيادة الكثبان والتزلج على الرمال",
    desc: "Enjoy a fun desert adventure with dune bashing in a 4x4 and sandboarding down the sand dunes. It's an exciting and easy way to explore the Arabian desert!",
    descAr: "استمتع بقيادة الكثبان الرملية المثيرة والتزلج بالألواح على المنحدرات الرملية الناعمة في مغامرة تناسب الجميع.",
    images: ["/images/hero_desert_safari.jpg", "/images/feat_sandboarding.jpg"],
  },
  {
    duration: "45 min",
    durationAr: "45 دقيقة",
    title: "Al Khayma Desert Camp",
    titleAr: "الوصول إلى مخيم الخيمة التراثي",
    desc: "Arrive at camp to a warm Emirati welcome: fragrant rose water, rich Arabic coffee, melt-in-your-mouth sweets, and fresh local dates. Feel the absolute thrill of posing with majestic falcons for unforgettable photos.",
    descAr: "استقبال إماراتي أصيل بماء الورد والقهوة العربية والتمور واللقيمات، مع فرصة التقاط صور تذكارية فريدة مع الصقور المهيبة.",
    images: ["/images/exp_alkhayma_bbq.jpg", "/images/exp_safari_alkhayma.jpg"],
  },
  {
    duration: "45 min",
    durationAr: "45 دقيقة",
    title: "Authentic Bedouin Experiences",
    titleAr: "تجارب الحياة البدوية الأصيلة",
    desc: "Feed and ride majestic camels, get a beautiful, intricate henna tattoo, and capture breathtaking sunset photos as the desert sky turns to gold. Pure magic awaits!",
    descAr: "إطعام وركوب الجمال الأصيلة، ورسم الحناء التراثية، والتقاط أروع صور الغروب عندما تتحول السماء إلى ذهب خالص.",
    images: ["/images/exp_horse_riding.jpg", "/images/exp_marmoom_bedouin.jpg"],
  },
  {
    duration: "60 min",
    durationAr: "60 دقيقة",
    title: "Award Winning 3-Cuisine Feast",
    titleAr: "بوفيه عشاء حائز على جوائز من 3 مطابخ عالمية",
    desc: "Experience a delectable feast featuring Moroccan, Arabian, and Emirati culinary delights from our Michelin Bib Gourmand-awarded restaurant.",
    descAr: "وليمة عشاء فاخرة تضم أشهى المأكولات الإماراتية والمغربية والعربية من إعداد طهاة مطعمنا الحائز على تصنيف ميشلان.",
    images: ["/images/oceanair_13.jpg"],
  },
  {
    duration: "45 min",
    durationAr: "45 دقيقة",
    title: "Traditional & Entertainment Shows",
    titleAr: "عروض فلكلورية وعروض النار والخيول",
    desc: "Relax in camp as the live entertainment begins, featuring the traditional Yola dance. As night falls, the arena comes alive with thrilling fire stunts, graceful Arabian horses, and traditional Bedouin camel shows.",
    descAr: "استمتع بعروض رقصة اليولة التراثية، وعروض النار الحية، واستعراضات الخيول العربية الأصيلة وعروض قوافل الجمال.",
    images: ["/images/exp_overnight_safari.jpg", "/images/oceanair_8.jpg"],
  },
  {
    duration: "30 min",
    durationAr: "30 دقيقة",
    title: "Stargazing Session",
    titleAr: "جلسة رصد النجوم بالتلسكوب الفلكي",
    desc: "When the daylight completely dims, and stars appear in the sky, enjoy your chance to observe the beautiful desert sky through a stargazing session with a telescope before calling it a day.",
    descAr: "عندما يسدل الليل ستاره وتتلألأ النجوم، اختتم أمسيتك برصد ساحر للنجوم والكواكب عبر تلسكوب فلكي متطور.",
    images: ["/images/oceanair_8.jpg"],
  },
  {
    duration: "45 min",
    durationAr: "45 دقيقة",
    title: "Drop off",
    titleAr: "العودة إلى الفندق",
    desc: 'We look forward to hosting you again: "Maa Al Salama" gets dropped off at your hotel.',
    descAr: 'نتطلع إلى استضافتك مجدداً. العودة المريحة بسيارة مكيفة إلى فندقك في دبي مع تمنياتنا بسلامة السفر.',
    images: [],
  },
];

// Inclusions list matching screenshot exactly
const INCLUSIONS = [
  "Exclusive Fast Track Access to Camel Ride, Henna, Buffet & Quad Bike (if booked)",
  "Pickup & Drop off in state of the art vehicle",
  "Designated Premium Safari Guide",
  "Dune bashing (35-45 minutes)",
  "Sandboarding",
  "Longest camel ride at sunset",
  "Camel feeding",
  "Falcon experience",
  "Luqaimat (sweets), Gahwa (coffee) & Dates",
  "Henna tattooing",
  "Shisha smoking",
  "Unlimited water & Soft drinks",
  "Sunset photo Opportunity",
  "Mega Fire Show (only evening time slots)",
  "Arabian Horse Show",
  "Bedouin Camel Show",
  "Traditional Yola dance",
  "Al Khayma Desert Camp",
  "Authentic Emirati, Moroccan & Arabian cuisine curated by the Michelin Bib Gourmand award winning Al Khayma Heritage Restaurant",
  "Vegetarian & Non-vegetarian options",
  "Stargazing session with a telescope (only evening time slots)",
];

const EXCLUSIONS = [
  "Alcoholic Drinks",
  "Quad Bike Ride (Optional)",
];

// Verified reviews matching screenshot
const VERIFIED_REVIEWS = [
  {
    id: "r1",
    author: "Tina T.",
    date: "June 2026",
    tripType: "Couple",
    rating: 5,
    comment: "Great guide, great English, very well organised.",
    commentAr: "مرشد ممتاز، لغة إنجليزية رائعة، وتنظيم على أعلى مستوى من الاحترافية.",
  },
  {
    id: "r2",
    author: "Lisa B.",
    date: "12 Nov 2026",
    tripType: "Friends",
    rating: 5,
    comment:
      "Inaam was a super guide. He told us a lot about Dubai and was an excellent driver. We felt very comfortable with him. The tour was amazing.",
    commentAr:
      "كان إنعام مرشداً رائعاً وسائقاً محترفاً وممتعاً جداً. قدم لنا الكثير من المعلومات المثرية وشعرنا براحة وأمان تام. جولة لا تُنسى في صحراء دبي.",
  },
  {
    id: "r3",
    author: "OceanAir guest",
    date: "11 Nov 2026",
    tripType: "Couple",
    rating: 5,
    comment: "Rafik was a great driver. Fire show amazing",
    commentAr: "رفيق كان سائقاً رائعاً جداً. عروض النار مذهلة وأجواء المخيم ساحرة.",
  },
  {
    id: "r4",
    author: "Sabrina B.",
    date: "10 Nov 2026",
    tripType: "Couple",
    rating: 5,
    comment: "Thank you so much for this day 🤍",
    commentAr: "شكراً جزيلاً لكم على هذا اليوم الرائع والذكريات الجميلة 🤍",
  },
  {
    id: "r5",
    author: "Tiberiu V.",
    date: "9 Nov 2026",
    tripType: "Couple",
    rating: 5,
    comment:
      "We had an amazing experience with OceanAir. Our guide Dilshad Ali is a great and a very serious person. He was looking after us in a very professional way. Thank you Dilshad",
    commentAr:
      "تجربة استثنائية لا تُنسى. مرشدنا دلشاد علي شخص رائع ومحترف للغاية واعتنى بنا بكل اهتمام. شكراً جزيلاً.",
  },
  {
    id: "r6",
    author: "Qutaiba",
    date: "8 Nov 2026",
    tripType: "Friends",
    rating: 5,
    comment: "It's raid super... my guest went so happy thnx for amazing efforts 🌟",
    commentAr: "رحلة تفوق الوصف... ضيوفي في قمة السعادة والامتنان. شكراً لجهودكم المتميزة 🌟",
  },
];

// 5 "Also in Dubai" tours
const ALSO_IN_DUBAI = [
  {
    title: "Dubai: Half-Day Desert Safari, Quad Bike, Camels & Sandboarding",
    titleAr: "دبي: سفاري صحراوي نصف يوم، دراجات رباعية، ركوب الجمال والتزلج على الرمال",
    slug: "dubai-half-day-desert-safari-quad-bike-camels-sandboarding",
    rating: 4.9,
    reviews: 70280,
    duration: "4h",
    price: 31.62,
    image: "/images/exp_half_day_quad.jpg",
  },
  {
    title: "Dubai City Tour with Frame Ticket, Creek, Souks & Blue Mosque",
    titleAr: "جولة مدينة دبي مع تذكرة البرواز، الخور، الأسواق والمسجد الأزرق",
    slug: "dubai-city-tour-with-frame-ticket-creek-souks-blue-mosque",
    rating: 4.8,
    reviews: 6295,
    duration: "4h",
    price: 54.43,
    image: "/images/exp_dubai_frame.jpg",
  },
  {
    title: "Dubai: Al Marmoom Oasis Horse Riding Experience",
    titleAr: "دبي: تجربة ركوب الخيل في واحة ومحمية المرموم",
    slug: "dubai-al-marmoom-oasis-horse-riding-experience",
    rating: 4.8,
    reviews: 272,
    duration: "1h",
    price: 27.21,
    image: "/images/exp_horse_riding.jpg",
  },
  {
    title: "Dubai: Red Dune Quad Biking, Camel Ride, Al Khayma Camp & BBQ",
    titleAr: "دبي: قيادة الدراجات الرباعية في الرمال الحمراء، ركوب الجمال وعشاء باربكيو",
    slug: "dubai-red-dune-quad-biking-camel-ride-al-khayma-camp-bbq",
    rating: 4.9,
    reviews: 1939,
    duration: "6h",
    price: 92.85,
    image: "/images/exp_red_dune_quad.jpg",
  },
  {
    title: "Dubai: Overnight Safari, Dinner, Stargazing & Al Khayma Camp",
    titleAr: "دبي: سفاري مبيت، عشاء مشاوي، مراقبة النجوم ومخيم الخيمة",
    slug: "dubai-overnight-safari-dinner-stargazing-al-khayma-camp",
    rating: 4.8,
    reviews: 2632,
    duration: "16h",
    price: 146.96,
    image: "/images/exp_overnight_safari.jpg",
  },
];

// Explore other destinations
const OTHER_DESTINATIONS = [
  { name: "Abu Dhabi", nameAr: "أبوظبي", image: "/images/dest_abu_dhabi.jpg", href: "/experiences?destination=Abu Dhabi" },
  { name: "Doha", nameAr: "الدوحة", image: "/images/dest_doha.jpg", href: "/experiences?destination=Doha" },
  { name: "Cairo", nameAr: "القاهرة", image: "/images/dest_cairo.jpg", href: "/experiences?destination=Cairo" },
  { name: "Sharm El Sheikh", nameAr: "شرم الشيخ", image: "/images/dest_sharm.jpg", href: "/experiences?destination=Sharm El Sheikh" },
  { name: "Alexandria", nameAr: "الإسكندرية", image: "/images/dest_cairo.jpg", href: "/experiences?destination=Alexandria" },
  { name: "Dubrovnik", nameAr: "دوبروفنيك", image: "/images/dest_dubai.jpg", href: "/experiences?destination=Dubrovnik" },
  { name: "Hurghada", nameAr: "الغردقة", image: "/images/dest_sharm.jpg", href: "/experiences?destination=Hurghada" },
];

export function ExperienceDetailPageComponent() {
  const { language } = useLanguage();
  const { formatPrice } = useCurrency();
  const { addItem } = useCart();

  // Booking states
  const [selectedDate, setSelectedDate] = useState("2026-11-20");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("14:00 PM (Sunset Safari)");
  const [adultsCount, setAdultsCount] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [hasCopiedLink, setHasCopiedLink] = useState(false);

  const pricePerAdult = 97.0;
  const pricePerChild = 68.0;
  const totalPrice = adultsCount * pricePerAdult + childrenCount * pricePerChild;

  const handleReserve = () => {
    addItem({
      id: `safari-alkhayma-${selectedDate}-${selectedTimeSlot.substring(0, 5)}`,
      experience: {
        id: "exp-safari-alkhayma",
        slug: "dubai-premium-safari-camel-ride-al-khayma-camp-3-buffets",
        title: "Dubai: Premium Safari, Camel Ride & Al Khayma Camp 3 Buffets",
        titleAr: "دبي: سفاري فاخر، ركوب الجمال ومخيم الخيمة التراثي مع 3 بوفيهات",
        shortDescription: "Premium desert safari to Al Khayma Camp with camel rides and Michelin-curated dining.",
        destinationId: "dubai",
        destinationName: "Dubai",
        categoryId: "desert",
        categoryName: "Desert",
        price: pricePerAdult,
        currency: "EUR",
        rating: 4.9,
        reviewCount: 30566,
        duration: "7 hours",
        pickupIncluded: true,
        cancellationPolicy: "Free cancellation up to 24 hours before experience starts.",
        images: ["/images/exp_safari_alkhayma.jpg"],
        highlights: ["Priority access", "Al Khayma Camp", "Michelin-curated feast"],
        itinerary: [],
        inclusions: INCLUSIONS,
        exclusions: EXCLUSIONS,
      },
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      adults: adultsCount,
      children: childrenCount,
      totalPrice: totalPrice,
    });
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      setHasCopiedLink(true);
      setTimeout(() => setHasCopiedLink(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black font-montserrat">
      <Navbar />

      <main className="flex-1 pt-20 sm:pt-24 pb-20">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-10 space-y-6">
          {/* ==============================================================
              1. TOP HEADER & BREADCRUMBS
              ============================================================== */}
          <div className="pt-2 space-y-2">
            {/* Back link */}
            <Link
              href="/experiences/dubai-desert-safari"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#808283] hover:text-[#0097CA] transition-colors"
            >
              <span>‹</span>
              <span>{language === "ar" ? "العودة إلى دبي" : "Back to Dubai"}</span>
            </Link>

            {/* Breadcrumb path */}
            <div className="flex items-center gap-2 text-xs text-[#808283] font-medium">
              <Link href="/" className="hover:text-[#0097CA]">
                {language === "ar" ? "الرئيسية" : "Home"}
              </Link>
              <span>›</span>
              <Link href="/experiences?destination=Dubai" className="hover:text-[#0097CA]">
                {language === "ar" ? "دبي" : "Dubai"}
              </Link>
              <span>›</span>
              <span className="text-black font-semibold">
                {language === "ar" ? "صحراء" : "Desert"}
              </span>
            </div>

            {/* H1 Title */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pt-1">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-black leading-tight tracking-tight">
                  {language === "ar"
                    ? "دبي: سفاري فاخر، ركوب الجمال ومخيم الخيمة التراثي مع 3 بوفيهات"
                    : "Dubai: Premium Safari, Camel Ride & Al Khayma Camp 3 Buffets"}
                </h1>

                {/* Metadata Pills Row */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#525456] pt-2">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#0097CA]" />
                    <span>{language === "ar" ? "دبي" : "Dubai"}</span>
                  </div>
                  <span>·</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#0097CA]" />
                    <span>{language === "ar" ? "7 ساعات" : "7h"}</span>
                  </div>
                  <span>·</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-black">4.9</span>
                    <span>(30,566 {language === "ar" ? "تقييم" : "reviews"})</span>
                  </div>
                  <span>·</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#0097CA]" />
                    <span>{language === "ar" ? "نعمل منذ 2010" : "Operating since 2010"}</span>
                  </div>
                  <span>·</span>
                  <div className="flex items-center gap-1 text-emerald-600 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{language === "ar" ? "طلب مرتفع" : "High Demand"}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons (Share, Wishlist) */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleShare}
                  className="p-2.5 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-700 transition-colors cursor-pointer relative"
                  title="Share experience"
                >
                  <Share2 className="w-4 h-4" />
                  {hasCopiedLink && (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-0.5 rounded shadow whitespace-nowrap">
                      Copied!
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-2.5 rounded-full border transition-colors cursor-pointer ${
                    isWishlisted
                      ? "border-red-300 bg-red-50 text-red-500"
                      : "border-gray-200 hover:bg-gray-50 text-gray-700"
                  }`}
                  title="Save to wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? "fill-red-500" : ""}`} />
                </button>
              </div>
            </div>
          </div>

          {/* ==============================================================
              2. MEDIA PHOTO GALLERY (Mosaic Grid matching Screenshot)
              ============================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 h-[360px] sm:h-[460px] lg:h-[520px] rounded-2xl overflow-hidden">
            {/* Big Featured Left Image (8 cols) */}
            <div className="md:col-span-8 relative h-full overflow-hidden group cursor-pointer">
              <Image
                src="/images/exp_safari_alkhayma.jpg"
                alt="Dubai Desert Safari 4x4 Land Cruiser"
                fill
                priority
                className="object-cover group-hover:scale-103 transition-transform duration-500"
                onClick={() => setIsPhotoModalOpen(true)}
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            </div>

            {/* Right 4-Grid Side (4 cols) */}
            <div className="md:col-span-4 grid grid-cols-2 gap-3 h-full">
              {/* Photo 2 */}
              <div
                className="relative h-full overflow-hidden group cursor-pointer rounded-lg"
                onClick={() => setIsPhotoModalOpen(true)}
              >
                <Image
                  src="/images/exp_alkhayma_bbq.jpg"
                  alt="Al Khayma Dining"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Photo 3 */}
              <div
                className="relative h-full overflow-hidden group cursor-pointer rounded-lg"
                onClick={() => setIsPhotoModalOpen(true)}
              >
                <Image
                  src="/images/feat_sandboarding.jpg"
                  alt="Sandboarding on Red Dunes"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Photo 4 */}
              <div
                className="relative h-full overflow-hidden group cursor-pointer rounded-lg"
                onClick={() => setIsPhotoModalOpen(true)}
              >
                <Image
                  src="/images/exp_horse_riding.jpg"
                  alt="Camel Caravan Ride at Sunset"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Photo 5 with "+23 all photos" Button Overlay */}
              <div
                className="relative h-full overflow-hidden group cursor-pointer rounded-lg"
                onClick={() => setIsPhotoModalOpen(true)}
              >
                <Image
                  src="/images/exp_overnight_safari.jpg"
                  alt="Camp Stargazing Night"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/45 group-hover:bg-black/55 transition-colors flex items-center justify-center">
                  <span className="text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-xs border border-white/20">
                    <Camera className="w-3.5 h-3.5" />
                    <span>+23 {language === "ar" ? "صورة" : "all photos"}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ==============================================================
              3. ABOUT THIS EXPERIENCE & AWARDS STRIP
              ============================================================== */}
          <div className="pt-2 pb-6 border-b border-gray-100 space-y-3">
            <h2 className="text-lg font-bold text-black">
              {language === "ar" ? "عن هذه التجربة" : "About this experience"}
            </h2>

            {/* Badges Strip */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200/80 text-xs font-bold">
                <span className="text-amber-500">🏆</span>
                <span>
                  {language === "ar"
                    ? "المركز الأول عالمياً · تريب أدفايزر الأفضل على الإطلاق"
                    : "No.1 World's 3rd Best of the Best"}
                </span>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 text-red-900 border border-red-200/80 text-xs font-bold">
                <span className="text-red-500">⭐</span>
                <span>
                  {language === "ar"
                    ? "ميشلان بيب جورماند"
                    : "Michelin Bib Gourmand"}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-3xl">
              {language === "ar"
                ? "استمتع بمغامرة صحراوية استثنائية في صحراء لهباب الحمراء بصحبة مرشد سفاري معتمد ومخصص لك. تشمل الجولة قيادة الكثبان والتزلج على الرمال، وركوب قوافل الجمال الأصيلة وقت الغروب، وعشاء بوفيه فاخر من 3 مطابخ عالمية في مخيم الخيمة التراثي."
                : "Experience a Lahbab desert adventure with your Designated Premium Safari Guide, featuring thrilling dune bashing, sandboarding, the longest sunset camel ride in Dubai, and an award-winning feast curated by a Michelin Bib Gourmand restaurant."}
            </p>
          </div>

          {/* ==============================================================
              4. MAIN CONTENT GRID (LEFT: CONTENT, RIGHT: STICKY BOOKING)
              ============================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pt-4">
            {/* Left 8 Columns */}
            <div className="lg:col-span-8 space-y-12">
              {/* ==========================================================
                  SECTION A: "WHY TRAVELLERS CHOOSE THIS EXPERIENCE"
                  ========================================================== */}
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-amber-600 block mb-1">
                    {language === "ar" ? "// لماذا يختار المسافرون هذه التجربة" : "// WHY TRAVELLERS CHOOSE THIS EXPERIENCE"}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
                    {language === "ar" ? (
                      <>
                        ما الذي يجعل هذه الرحلة <span className="text-[#0097CA]">تستحق الحجز؟</span>
                      </>
                    ) : (
                      <>
                        What makes this trip <span className="text-[#0097CA]">worth booking?</span>
                      </>
                    )}
                  </h3>
                  <p className="text-xs text-[#808283] mt-1 font-medium">
                    {language === "ar"
                      ? "تجارب فاخرة. لحظات حقيقية وأصيلة. قيمة لا تضاهى."
                      : "Premium experiences. Authentic moments. Unmatched value."}
                  </p>
                </div>

                {/* 6 Feature Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {WHY_WORTH_BOOKING.map((card) => {
                    const IconComponent = card.icon;
                    return (
                      <div
                        key={card.id}
                        className="group flex flex-col bg-white rounded-2xl border border-gray-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300"
                      >
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                          <Image
                            src={card.image}
                            alt={card.title}
                            fill
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-2.5 left-2.5 rtl:left-auto rtl:right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#0097CA] shadow-sm">
                            <IconComponent className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        <div className="p-3.5 flex-1 flex flex-col justify-between space-y-1.5">
                          <h4 className="text-xs font-bold text-black leading-snug group-hover:text-[#0097CA] transition-colors">
                            {language === "ar" ? card.titleAr : card.title}
                          </h4>
                          <p className="text-[11px] text-gray-500 leading-relaxed">
                            {language === "ar" ? card.descAr : card.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ==========================================================
                  SECTION B: "YOUR TRIP, HOUR BY HOUR" TIMELINE
                  ========================================================== */}
              <div className="space-y-6 pt-4 border-t border-gray-100">
                <h3 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
                  {language === "ar" ? "برنامج رحلتك، ساعة بساعة" : "Your trip, hour by hour"}
                </h3>

                <div className="relative ps-6 rtl:ps-0 rtl:pe-6 border-s-2 rtl:border-s-0 rtl:border-e-2 border-[#0097CA]/30 space-y-8 my-4">
                  {ITINERARY_STEPS.map((step, idx) => (
                    <div key={idx} className="relative">
                      {/* Timeline Circle Bullet */}
                      <div className="absolute -left-[31px] rtl:-left-auto rtl:-right-[31px] top-1 w-4 h-4 rounded-full bg-[#0097CA] border-4 border-white shadow-xs" />

                      <div className="space-y-2">
                        {/* Time duration pill */}
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-cyan-50 border border-cyan-200 text-[#0097CA] text-[10.5px] font-bold">
                          {language === "ar" ? step.durationAr : step.duration}
                        </span>

                        {/* Title */}
                        <h4 className="text-sm sm:text-base font-bold text-black">
                          {language === "ar" ? step.titleAr : step.title}
                        </h4>

                        {/* Desc */}
                        <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed">
                          {language === "ar" ? step.descAr : step.desc}
                        </p>

                        {/* Photo Thumbnails */}
                        {step.images.length > 0 && (
                          <div className="flex items-center gap-2 pt-2">
                            {step.images.map((imgSrc, i) => (
                              <div
                                key={i}
                                className="relative w-20 h-16 sm:w-24 sm:h-20 rounded-xl overflow-hidden border border-gray-200 shadow-2xs"
                              >
                                <Image
                                  src={imgSrc}
                                  alt={step.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ==========================================================
                  SECTION C: INCLUSIONS & EXCLUSIONS
                  ========================================================== */}
              <div className="space-y-6 pt-4 border-t border-gray-100">
                <h3 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
                  {language === "ar" ? "ما تشمله التجربة" : "Inclusions"}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* What's included */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-black flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{language === "ar" ? "المشمول في الرحلة" : "What's included"}</span>
                    </h4>
                    <ul className="space-y-2 text-xs text-gray-700">
                      {INCLUSIONS.map((inc, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Not included */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-black flex items-center gap-2">
                      <X className="w-4 h-4 text-red-500" />
                      <span>{language === "ar" ? "غير مشمول" : "Not included"}</span>
                    </h4>
                    <ul className="space-y-2 text-xs text-gray-700">
                      {EXCLUSIONS.map((exc, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <X className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{exc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* ==========================================================
                  SECTION D: "GOOD TO KNOW"
                  ========================================================== */}
              <div className="space-y-6 pt-4 border-t border-gray-100">
                <h3 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
                  {language === "ar" ? "معلومات هامة" : "Good to know"}
                </h3>

                {/* Disclaimer Callout Box */}
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 leading-relaxed flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p>
                    Quad biking carries inherent risk. Provider insurance excludes accidents or damages. Non-passengers bear full financial and legal responsibility. Travel insurance is strongly recommended. Age & Weight Restrictions: Quad biking requires ages 16+ to ride solo. Camel riding requires ages 12+ to ride solo (max weight 90 kg / 200 lbs; not advised for seniors 60+ or back issues). Duration includes transfers. Avoid eating 2-3 hours prior. Stargazing and fire shows run in evening slots only.
                  </p>
                </div>

                {/* 3 Columns: What to bring / Not allowed / Not suitable for */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                  <div className="space-y-2 text-xs">
                    <h5 className="font-bold text-black flex items-center gap-1.5">
                      <span>🎒</span>
                      <span>{language === "ar" ? "ما يجب إحضاره" : "What to bring"}</span>
                    </h5>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Sunscreen</li>
                      <li>• Sunglasses</li>
                      <li>• Sun hat</li>
                      <li>• Comfortable shoes</li>
                    </ul>
                  </div>

                  <div className="space-y-2 text-xs">
                    <h5 className="font-bold text-black flex items-center gap-1.5">
                      <span>🚫</span>
                      <span>{language === "ar" ? "غير مسموح" : "Not allowed"}</span>
                    </h5>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Luggage or large bags</li>
                      <li>• Wheelchairs</li>
                    </ul>
                  </div>

                  <div className="space-y-2 text-xs">
                    <h5 className="font-bold text-black flex items-center gap-1.5">
                      <span>⚠️</span>
                      <span>{language === "ar" ? "غير مناسب لـ" : "Not suitable for"}</span>
                    </h5>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Pregnant women</li>
                      <li>• People with back problems</li>
                      <li>• People with heart problems</li>
                      <li>• Children under 3 years</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* ==========================================================
                  SECTION E: 30,566 VERIFIED REVIEWS
                  ========================================================== */}
              <div className="space-y-6 pt-4 border-t border-gray-100">
                <h3 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
                  {language === "ar" ? "30,566 تقييم موثق" : "30,566 verified reviews"}
                </h3>

                {/* Big Score Block + Rating Bars */}
                <div className="bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center shadow-xs">
                  {/* Left big 4.9 */}
                  <div className="md:col-span-4 text-center md:border-e md:border-gray-100 md:pe-6">
                    <div className="text-4xl sm:text-5xl font-extrabold text-[#071622]">4.9</div>
                    <div className="flex items-center justify-center gap-1 text-yellow-400 my-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400" />
                      ))}
                    </div>
                    <div className="text-xs text-gray-500 font-medium">30,566 reviews</div>
                  </div>

                  {/* Right Score Bars */}
                  <div className="md:col-span-8 space-y-2 text-xs font-semibold">
                    {[
                      { label: "Guide", score: "5.00", pct: "100%" },
                      { label: "Food", score: "4.71", pct: "94%" },
                      { label: "Pickup", score: "5.00", pct: "100%" },
                      { label: "Value", score: "4.99", pct: "99%" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-3">
                        <span className="w-16 text-gray-600">{item.label}</span>
                        <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                          <div
                            className="h-full bg-[#0097CA] rounded-full"
                            style={{ width: item.pct }}
                          />
                        </div>
                        <span className="w-10 text-right text-black font-bold">{item.score}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 6 Review Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {VERIFIED_REVIEWS.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 rounded-2xl bg-white border border-gray-200/80 shadow-xs space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-cyan-100 text-[#0097CA] font-bold text-xs flex items-center justify-center">
                            {rev.author.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <span className="block text-xs font-bold text-black leading-tight">
                              {rev.author}
                            </span>
                            <span className="text-[10.5px] text-gray-400">
                              {rev.date} · {rev.tripType}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-yellow-400" />
                          ))}
                        </div>
                      </div>

                      <p className="text-xs text-gray-700 leading-relaxed italic">
                        &ldquo;{language === "ar" && rev.commentAr ? rev.commentAr : rev.comment}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>

                {/* Operator Trust Callout */}
                <div className="p-4 rounded-2xl bg-[#071622] text-white flex items-start gap-3.5 shadow-md">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5 text-xs">
                    <h5 className="font-bold text-white">
                      Run by OceanAir, not a third-party reseller.
                    </h5>
                    <p className="text-white/75 text-[11.5px] leading-relaxed">
                      Licensed UAE guides, vehicles maintained in-house, food prepared and quality-checked by our own team.
                    </p>
                  </div>
                </div>

                {/* Ratings on other platforms */}
                <div className="flex items-center gap-4 text-xs text-gray-500 pt-1">
                  <span>ALSO RATED ON:</span>
                  <span className="font-bold text-black">GetYourGuide ★ 4.9 (57,489)</span>
                  <span>·</span>
                  <span className="font-bold text-black">Google ★ 4.9 (18,217) brand reviews</span>
                </div>
              </div>

              {/* ==========================================================
                  SECTION F: "ALSO IN DUBAI"
                  ========================================================== */}
              <div className="space-y-5 pt-4 border-t border-gray-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400 block mb-0.5">
                    {language === "ar" ? "مسافرون مثلك حجزوا أيضاً" : "TRAVELLERS IN YOUR SHOES ALSO BOOKED"}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
                    {language === "ar" ? "أيضاً في دبي" : "Also in Dubai"}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {ALSO_IN_DUBAI.slice(0, 3).map((item) => (
                    <div
                      key={item.slug}
                      className="group flex flex-col bg-white rounded-2xl border border-gray-200/90 overflow-hidden shadow-xs hover:shadow-lg transition-all"
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                        <h4 className="text-xs font-bold text-black leading-snug line-clamp-2 min-h-[34px] group-hover:text-[#0097CA] transition-colors">
                          {language === "ar" ? item.titleAr : item.title}
                        </h4>
                        <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-100">
                          <span className="font-bold text-black">
                            {formatPrice(item.price)}
                          </span>
                          <Link
                            href={`/experiences/${item.slug}`}
                            className="text-xs font-bold text-[#0097CA] hover:underline"
                          >
                            View →
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ==========================================================
                  SECTION G: "FEATURED IN THESE COLLECTIONS"
                  ========================================================== */}
              <div className="space-y-3 pt-4 border-t border-gray-100">
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400 block">
                  ALSO PART OF
                </span>
                <h4 className="text-base font-bold text-black">
                  {language === "ar" ? "مدرج في هذه المجموعات" : "Featured in these collections"}
                </h4>
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { label: "Al Khayma Desert Camp ›", href: "/experiences/dubai-desert-safari" },
                    { label: "Camel Ride in Dubai ›", href: "/experiences/dubai-desert-safari" },
                    { label: "Dubai Desert Safari ›", href: "/experiences/dubai-desert-safari" },
                  ].map((chip) => (
                    <Link
                      key={chip.label}
                      href={chip.href}
                      className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors"
                    >
                      {chip.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* ==========================================================
                  SECTION H: "EXPLORE OTHER DESTINATIONS"
                  ========================================================== */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#0097CA] block mb-0.5">
                      KEEP EXPLORING
                    </span>
                    <h4 className="text-lg font-bold text-black">
                      {language === "ar" ? "استكشف وجهات أخرى" : "Explore other destinations"}
                    </h4>
                  </div>
                  <Link
                    href="/experiences"
                    className="text-xs font-bold text-[#0097CA] hover:underline"
                  >
                    {language === "ar" ? "جميع التجارب ←" : "All experiences →"}
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
                  {OTHER_DESTINATIONS.map((dest) => (
                    <Link
                      key={dest.name}
                      href={dest.href}
                      className="group flex flex-col items-center text-center cursor-pointer"
                    >
                      <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-gray-200 shadow-2xs group-hover:scale-105 transition-transform mb-1.5">
                        <Image
                          src={dest.image}
                          alt={dest.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-[11px] font-bold text-black group-hover:text-[#0097CA] truncate w-full">
                        {language === "ar" ? dest.nameAr : dest.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 4 Columns: STICKY BOOKING WIDGET matching Screenshot */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-6 shadow-[0_16px_40px_rgba(0,0,0,0.08)] space-y-5">
                {/* Header with Price */}
                <div className="bg-[#071F30] rounded-xl p-4 text-white -m-1 mb-2">
                  <span className="text-[10px] uppercase font-bold text-white/70 tracking-wider block">
                    FROM
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-3xl font-extrabold text-white">
                      {formatPrice(pricePerAdult)}
                    </span>
                    <span className="text-xs text-white/70">/ adult</span>
                  </div>
                  <div className="text-[10.5px] font-bold text-emerald-400 mt-1 uppercase tracking-wide">
                    SAVE UP TO 10% · SELECT DATES
                  </div>
                </div>

                {/* Date Picker */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-black block">
                    {language === "ar" ? "التاريخ" : "DATE"}
                  </label>
                  <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/60 text-xs">
                    <div className="flex items-center gap-2 text-gray-800 font-semibold">
                      <Calendar className="w-4 h-4 text-[#0097CA]" />
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="bg-transparent focus:outline-hidden font-semibold cursor-pointer"
                      />
                    </div>
                    <span className="text-[11px] font-bold text-[#0097CA] cursor-pointer">
                      Pick
                    </span>
                  </div>
                </div>

                {/* Time slot */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-black block">
                    {language === "ar" ? "الوقت المفضل" : "TIME SLOT"}
                  </label>
                  <select
                    value={selectedTimeSlot}
                    onChange={(e) => setSelectedTimeSlot(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/60 text-xs font-semibold text-black focus:outline-hidden cursor-pointer"
                  >
                    <option value="14:00 PM (Sunset Safari)">02:00 PM (Sunset Safari & BBQ)</option>
                    <option value="15:30 PM (Evening Safari)">03:30 PM (Evening Safari & Stargazing)</option>
                    <option value="08:00 AM (Morning Safari)">08:00 AM (Morning Desert Safari)</option>
                  </select>
                </div>

                {/* Guests Counter */}
                <div className="space-y-2.5 pt-1">
                  <label className="text-xs font-bold text-black block">
                    {language === "ar" ? "عدد الضيوف" : "GUESTS"}
                  </label>

                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-black block">
                        {language === "ar" ? "البالغين (12+ سنة)" : "Adults (Age 12+)"}
                      </span>
                      <span className="text-[11px] text-gray-400">
                        {formatPrice(pricePerAdult)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setAdultsCount(Math.max(1, adultsCount - 1))}
                        className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center font-bold hover:bg-gray-100 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-bold text-black">
                        {adultsCount}
                      </span>
                      <button
                        type="button"
                        onClick={() => setAdultsCount(adultsCount + 1)}
                        className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center font-bold hover:bg-gray-100 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-black block">
                        {language === "ar" ? "الأطفال (3 - 11 سنة)" : "Children (Age 3-11)"}
                      </span>
                      <span className="text-[11px] text-gray-400">
                        {formatPrice(pricePerChild)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                        className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center font-bold hover:bg-gray-100 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-bold text-black">
                        {childrenCount}
                      </span>
                      <button
                        type="button"
                        onClick={() => setChildrenCount(childrenCount + 1)}
                        className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center font-bold hover:bg-gray-100 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Total Price Row */}
                <div className="pt-3 border-t border-gray-100 flex items-baseline justify-between">
                  <span className="text-xs text-gray-500 font-semibold">
                    {language === "ar" ? "المجموع الكلي:" : "Total Price:"}
                  </span>
                  <span className="text-2xl font-bold text-black">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                {/* Big Reserve Button */}
                <button
                  type="button"
                  onClick={handleReserve}
                  className="w-full py-3.5 rounded-full bg-[#0097CA] hover:bg-[#0083B0] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  <span>{language === "ar" ? "حجز الآن" : "Reserve"}</span>
                </button>

                {/* Trust bullets below Reserve */}
                <div className="pt-1 flex flex-col items-center justify-center gap-1 text-[11px] text-gray-500">
                  <span className="flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Free cancellation 24h</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Instant confirmation</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Photo Gallery Modal */}
      {isPhotoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <button
            type="button"
            onClick={() => setIsPhotoModalOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-cyan-400 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative max-w-4xl w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/exp_safari_alkhayma.jpg"
              alt="Dubai Desert Safari Gallery"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
