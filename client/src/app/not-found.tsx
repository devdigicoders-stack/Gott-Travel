"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { Home } from "lucide-react";

export default function NotFound() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA]">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-28 px-4 text-center">
        <div className="max-w-md space-y-5">
          <span className="text-6xl font-extrabold text-[#0097CA]">404</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-black">
            {language === "ar" ? "الصفحة غير موجودة" : "Page not found"}
          </h1>
          <p className="text-sm text-gray-600">
            {language === "ar"
              ? "عذراً، الصفحة التي تبحث عنها غير متوفرة أو قد تم نقلها."
              : "Sorry, the page you are looking for does not exist or has been moved."}
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0097CA] hover:bg-[#0085B2] text-white text-sm font-bold shadow-md transition-all cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>
                {language === "ar"
                  ? "العودة إلى الصفحة الرئيسية"
                  : "Back to Home Page"}
              </span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
