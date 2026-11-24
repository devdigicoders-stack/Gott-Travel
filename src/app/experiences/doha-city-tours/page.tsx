import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { QatarCityCatalogSection } from "@/components/QatarCityCatalogSection";
import { ExperienceCard } from "@/components/ExperienceCard";
import experiencesData from "@/data/experiences.json";
import { Experience } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, ShieldCheck, ChevronRight } from "lucide-react";

export const metadata = {
  title: "Qatar City Tours & Experiences — Lusail, Katara & Souq Waqif | GottQatar",
  description:
    "Book top-rated Qatar city tours with Gott Qatar. Discover Lusail City, Katara Cultural Village, Souq Waqif, and the Doha Corniche with certified local guides.",
};

export default function DohaCityToursPage() {
  const dohaCityTours = (experiencesData as unknown as Experience[]).filter(
    (exp) =>
      exp.destinationId === "doha" &&
      ["lusail-city-tour-4-hours", "full-day-doha-city-tour-6-hours", "doha-express-city-tour-4-hours"].includes(exp.slug)
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBFC] text-black font-sans">
      <Navbar />

      <main className="flex-1 pb-16">
        {/* Hero Header */}
        <div className="relative min-h-[380px] sm:min-h-[440px] flex flex-col justify-end bg-[#071622] text-white overflow-hidden pb-12 pt-28">
          <Image
            src="/images/dest_doha.jpg"
            alt="Doha Qatar Skyline & City Tours"
            fill
            priority
            className="object-cover object-center opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071622] via-[#071622]/60 to-transparent" />

          <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-6 lg:px-10 w-full space-y-3">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-cyan-300 font-semibold">
              <Link href="/" className="hover:underline">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/destinations/doha" className="hover:underline">Doha</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white">City Tours</span>
            </div>

            <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold">
              <MapPin className="w-4 h-4" />
              <span>Doha & Lusail, Qatar</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>4.95 (3,050+ Reviews)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              Qatar City Tours & Experiences
            </h1>

            <p className="max-w-2xl text-xs sm:text-sm md:text-base text-gray-200 leading-relaxed font-normal">
              Immerse yourself in Qatar&apos;s stunning blend of futuristic architecture in Lusail, rich cultural heritage at Souq Waqif, and the artistic wonders of Katara.
            </p>
          </div>
        </div>

        {/* Featured WhatsApp / Dark-mode style catalog section */}
        <QatarCityCatalogSection className="bg-[#0b0e14] py-10" />

        {/* Full Interactive Grid */}
        <section className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-10 py-12">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-black">
                Available Tours & Packages
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                All tours include private air-conditioned vehicle, licensed guide, and instant confirmation.
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 bg-cyan-50 text-[#0097CA] rounded-full border border-cyan-200">
              {dohaCityTours.length} Curated Tours
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dohaCityTours.map((tour) => (
              <ExperienceCard key={tour.id} experience={tour} />
            ))}
          </div>

          {/* Value props */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 sm:p-8 bg-white rounded-3xl border border-gray-200/80 shadow-sm">
            <div className="space-y-1">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[#0097CA] flex items-center justify-center font-bold text-lg mb-2">
                ✓
              </div>
              <h3 className="font-bold text-sm sm:text-base text-black">Free Hotel & Airport Pickup</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Direct pickup and drop-off anywhere in Doha, Hamad International Airport, or the Cruise Terminal.
              </p>
            </div>

            <div className="space-y-1">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg mb-2">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm sm:text-base text-black">Transparent Pricing in QAR</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Guaranteed exact prices with no hidden charges. All taxes, tolls, and licensed guiding included.
              </p>
            </div>

            <div className="space-y-1">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg mb-2">
                <Star className="w-5 h-5 fill-amber-500" />
              </div>
              <h3 className="font-bold text-sm sm:text-base text-black">Local Qatari Experience</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Operating with deep local expertise since 2010. Handpicked stops and authentic hospitality.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
