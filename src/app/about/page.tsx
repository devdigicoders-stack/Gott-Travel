"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { Mail, Phone, Quote } from "lucide-react";

export default function AboutPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBFC] text-black font-sans">
      <Navbar />

      <main className="flex-1 pt-[72px] sm:pt-[84px] lg:pt-[96px]">
        {/* ==============================================================
            SECTION 1: HERO HEADER
            ============================================================== */}
        <section className="border-b border-[#E5E9EE] bg-white">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10 py-12 lg:py-20">
            {/* Eyebrow */}
            <p className="t-eyebrow text-[#0097CA] mb-3">
              {language === "ar" ? "عن جوّ قطر" : "About GottQatar"}
            </p>

            {/* H1 Title */}
            <h1 className="t-hero-title text-3xl sm:text-4xl lg:text-[46px] font-semibold text-black max-w-[840px] leading-[1.12] tracking-tight">
              {language === "ar"
                ? "اكتشف ما هو استثنائي في مدن الإمكانيات والفرص اللامحدودة."
                : "Discover extraordinary in the city of endless possibilities."}
            </h1>

            {/* Intro paragraph */}
            <p className="t-body mt-5 max-w-[680px] text-sm sm:text-base text-black/80 leading-[1.75]">
              {language === "ar"
                ? "منذ عام 2010، قمنا ببناء فريق عمل متفانٍ ومحب للتواصل مع الآخرين وإثراء كل رحلة. من التقاليد العريقة إلى المغامرات الحماسية في كثبان الرمال والبحار، تشاركنا ذكريات لا تُنسى مع مئات الآلاف من المسافرين حول العالم."
                : "Since 2010 we’ve built a team of passionate people who love connecting with others and enriching every journey. From ancient traditions to thrilling adventures, we’ve shared unforgettable moments with hundreds of thousands of travellers."}
            </p>
          </div>
        </section>

        {/* ==============================================================
            SECTION 2: CORE VALUES (3 CARDS GRID)
            ============================================================== */}
        <section className="bg-white">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10 py-12 lg:py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
              {/* Card 1: Authentic experiences */}
              <div className="rounded-[18px] border border-[#DDE3EB] bg-white shadow-[0_12px_34px_rgba(13,38,48,0.06)] p-6 lg:p-7 space-y-3">
                <p className="t-eyebrow text-[#0097CA] inline-flex">
                  {language === "ar" ? "ما نؤمن به" : "What we believe"}
                </p>
                <h3 className="t-section-title text-lg lg:text-[20px] font-semibold text-black leading-snug">
                  {language === "ar" ? "تجارب أصيلة" : "Authentic experiences"}
                </h3>
                <p className="t-body text-black/75 text-xs sm:text-[13px] leading-relaxed">
                  {language === "ar"
                    ? "تجارب محلية حقيقية تربطك بقلب وروح كل وجهة سياحية. ذكريات تدوم مدى الحياة."
                    : "Genuine local experiences that connect you with the heart and soul of each destination. Memories that last a lifetime."}
                </p>
              </div>

              {/* Card 2: Sustainable tourism */}
              <div className="rounded-[18px] border border-[#DDE3EB] bg-white shadow-[0_12px_34px_rgba(13,38,48,0.06)] p-6 lg:p-7 space-y-3">
                <p className="t-eyebrow text-[#0097CA] inline-flex">
                  {language === "ar" ? "ما نؤمن به" : "What we believe"}
                </p>
                <h3 className="t-section-title text-lg lg:text-[20px] font-semibold text-black leading-snug">
                  {language === "ar" ? "سياحة مستدامة" : "Sustainable tourism"}
                </h3>
                <p className="t-body text-black/75 text-xs sm:text-[13px] leading-relaxed">
                  {language === "ar"
                    ? "ممارسات سفر مسؤولة تحافظ على البيئة والوجهات الطبيعية وتدعم المجتمعات المحلية للأجيال القادمة."
                    : "Responsible travel practices that preserve destinations and support local communities for future generations."}
                </p>
              </div>

              {/* Card 3: Customer first */}
              <div className="rounded-[18px] border border-[#DDE3EB] bg-white shadow-[0_12px_34px_rgba(13,38,48,0.06)] p-6 lg:p-7 space-y-3">
                <p className="t-eyebrow text-[#0097CA] inline-flex">
                  {language === "ar" ? "ما نؤمن به" : "What we believe"}
                </p>
                <h3 className="t-section-title text-lg lg:text-[20px] font-semibold text-black leading-snug">
                  {language === "ar" ? "العميل أولاً" : "Customer first"}
                </h3>
                <p className="t-body text-black/75 text-xs sm:text-[13px] leading-relaxed">
                  {language === "ar"
                    ? "رضاك هو أولويتنا المطلقة. دعم على مدار الساعة طوال أيام الأسبوع وخدمة مخصصة لضمان أن رحلتك تتجاوز كل التوقعات."
                    : "Your satisfaction is our priority. 24/7 support and personalised service to make sure your journey exceeds expectations."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==============================================================
            SECTION 3: MISSION & VISION
            ============================================================== */}
        <section className="bg-[#FAFBFC] border-t border-[#E5E9EE]">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10 py-12 lg:py-16 space-y-10">
            {/* Our Mission */}
            <div className="max-w-[760px] space-y-3">
              <h2 className="t-section-title text-xl sm:text-2xl font-semibold text-black">
                {language === "ar" ? "رسالتنا" : "Our mission"}
              </h2>
              <p className="t-body text-sm sm:text-base text-black/80 leading-[1.75]">
                {language === "ar"
                  ? "جعل تجربة السفر والاستكشاف متاحة، أصيلة، وملهمة للجميع."
                  : "To make travel accessible, authentic, and transformative for everyone."}
              </p>
            </div>

            {/* Our Vision */}
            <div className="max-w-[760px] space-y-3">
              <h2 className="t-section-title text-xl sm:text-2xl font-semibold text-black">
                {language === "ar" ? "رؤيتنا" : "Our vision"}
              </h2>
              <p className="t-body text-sm sm:text-base text-black/80 leading-[1.75]">
                {language === "ar"
                  ? "نؤمن بعالم توحده رغبة مشتركة — حلم السفر والاستكشاف. إن اكتشاف أماكن جديدة يقرب بين الشعوب ويعمق تقديرنا لجمال كوكبنا. وإذا تمكنا من المساعدة في تحويل هذا الحلم إلى حقيقة ملموسة من خلال خدماتنا، فإن هدفنا قد تحقق وشغفنا يتجدد كل يوم."
                  : "We believe in a world united by a shared dream — the dream of travel. Exploring new places connects people and deepens appreciation for our planet. If we can help turn that dream into reality through our services, then our purpose is fulfilled and our passion renewed."}
              </p>
            </div>
          </div>
        </section>

        {/* ==============================================================
            SECTION 4: FOUNDER QUOTE SECTION (DARK NAVY)
            ============================================================== */}
        <section className="bg-[#07152B] text-white">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10 py-12 lg:py-20">
            <div className="max-w-[840px] space-y-6">
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-[#0097CA]" />

              {/* Blockquote */}
              <blockquote className="font-display text-[20px] sm:text-[24px] lg:text-[28px] font-semibold leading-[1.4] text-white">
                {language === "ar"
                  ? "“الشيء الأهم على الإطلاق هو أن تستمتع بما تفعله. عندما وقعت في حب عملي الأول كمرشد سياحي، عشقت كل ما حولي. كنت في غاية السعادة حين أستيقظ كل صباح في السادسة فجراً للقاء مجموعاتي وأغادر فقط بعد خلق ذكريات رائعة لهم. ولهذا كان من الطبيعي جداً أن نبني شركة تفعل الشيء نفسه — على نطاق واسع، لآلاف الضيوف الأعزاء.”"
                  : "“The most important thing is to enjoy what you do. When I fell in love with my first job as a tour guide, I loved everything around me. I was more than happy to wake up every day at 6 AM to meet my groups and finally leave after creating great memories. That’s why it was natural to build a company that does the same — at scale, for thousands of guests.”"}
              </blockquote>

              {/* Founder Signature & Avatar */}
              <div className="pt-2 flex items-center gap-3">
                <span className="inline-flex w-11 h-11 items-center justify-center rounded-full bg-[#0097CA]/25 text-cyan-300 font-display font-bold text-sm tracking-wide">
                  EAS
                </span>
                <div>
                  <p className="font-body font-semibold text-[14px] text-white">
                    {language === "ar" ? "عصام الصلاح" : "Essam Al Salah"}
                  </p>
                  <p className="font-body text-[12px] text-white/65">
                    {language === "ar" ? "المؤسس والرئيس التنفيذي" : "Founder & CEO"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==============================================================
            SECTION 5: CAREERS CTA CARD
            ============================================================== */}
        <section className="bg-white border-t border-[#E5E9EE]">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10 py-12 lg:py-16">
            <div className="rounded-[18px] border border-[#DDE3EB] bg-[#FAFBFC] shadow-[0_12px_34px_rgba(13,38,48,0.06)] p-6 lg:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Text Side */}
              <div className="max-w-[620px]">
                <p className="t-eyebrow text-[#0097CA] mb-2">
                  {language === "ar" ? "الوظائف والمهن" : "Careers"}
                </p>
                <h2 className="t-section-title text-xl sm:text-2xl font-semibold text-black leading-snug">
                  {language === "ar"
                    ? "هل أنت شغوف بالعمل معنا في جوّ قطر؟"
                    : "Curious about a role at GottQatar?"}
                </h2>
                <p className="t-body mt-2 text-xs sm:text-sm text-black/75">
                  {language === "ar"
                    ? "فريق الموارد البشرية لدينا يجيب خلال يوم واحد على أي استفسار مهني."
                    : "Our HR team replies within a day to any career question."}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="mailto:support@gottqatar.com"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0097CA] hover:bg-[#0083B0] text-white font-body font-semibold text-[14px] px-6 h-[44px] transition-colors shadow-sm"
                >
                  <Mail className="w-4 h-4" />
                  <span>{language === "ar" ? "راسلنا عبر البريد" : "Email us"}</span>
                </a>
                <a
                  href="tel:+97444574140"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#DDE3EB] bg-white hover:border-[#0097CA] hover:text-[#0097CA] text-black font-body font-semibold text-[14px] px-6 h-[44px] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>+974 4457 4140</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
