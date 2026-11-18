"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

interface CookieSection {
  id: string;
  number: number;
  title: string;
  titleAr: string;
  content: string[];
  contentAr: string[];
}

const COOKIE_SECTIONS: CookieSection[] = [
  {
    id: "what-cookies-are",
    number: 1,
    title: "What cookies are",
    titleAr: "ما هي ملفات تعريف الارتباط؟",
    content: [
      "Cookies are small text files a website stores on your device. Some are essential for the site to work; others help us understand how the site is used so we can improve it. We also use a couple of similar technologies (such as your browser's local storage) to remember your choices — we treat those the same way as cookies here.",
    ],
    contentAr: [
      "ملفات تعريف الارتباط (الكوكيز) هي ملفات نصية صغيرة يخزنها الموقع على جهازك. بعضها ضروري وأساسي لتشغيل الموقع؛ والبعض الآخر يساعدنا على فهم كيفية استخدام الموقع لتطويره وتحسينه. نستخدم أيضاً تقنيات مشابهة (مثل التخزين المحلي لمتصفحك) لتذكر تفضيلاتك وخياراتك — ونتعامل معها بنفس الطريقة الموضحة هنا.",
    ],
  },
  {
    id: "categories-we-use",
    number: 2,
    title: "The categories we use",
    titleAr: "الفئات التي نستخدمها",
    content: [
      "Essential — always on. These keep the site secure and working: your session, your shopping cart, fraud prevention, load balancing, and remembering the cookie choice you made. The site cannot function without them, so they do not require consent.",
      "Analytics — only with your consent. These help us understand which experiences people view and how the booking flow performs, so we can make it better. In the EU, EEA and UK these are switched off until you accept; elsewhere they run by default and you can opt out at any time.",
      "Advertising / marketing — we do not currently use advertising or cross-site tracking cookies. If that changes, we will update this policy and ask for your consent before any such cookies are set.",
    ],
    contentAr: [
      "الأساسية — مفعلة دائماً: تحافظ هذه الملفات على أمان الموقع واستمرارية عمله: إدارة جلستك، سلة التسوق والحجز، الحماية من الاحتيال، توزيع الأحمال، وتذكر خيارات الخصوصية. لا يمكن للموقع العمل بدونها، لذا لا تتطلب موافقة مسبقة.",
      "التحليلية — بموافقتك فقط: تساعدنا على معرفة التجارب الأكثر زيارة وقياس أداء خطوات الحجز لتحسين الموقع. في الاتحاد الأوروبي وبريطانيا تكون معطلة حتى توافق عليها، وفي المناطق الأخرى تعمل افتراضياً مع إمكانية إلغاء الاشتراك في أي وقت.",
      "التسويقية والإعلانية — لا نستخدم حالياً أي ملفات تعريف ارتباط للإعلانات أو التتبع عبر المواقع الأخرى. وإذا تغير ذلك مستقبلاً، سنحدث هذه السياسة ونطلب موافقتك المسبقة.",
    ],
  },
  {
    id: "cookies-and-tools",
    number: 3,
    title: "The cookies and tools we use",
    titleAr: "الملفات والأدوات المستخدمة",
    content: [
      "Essential — your cookie choice (so we do not ask again), an anonymous id that records that choice for our records, your language and currency preferences, your in-progress cart, and the security/session cookies set by our hosting (Vercel) and security/delivery network (Cloudflare).",
      "Payments — when you check out, our payment provider Stripe sets cookies it needs to process the payment securely and detect fraud. These are essential to completing a booking.",
      "Maps — on pages that show a map, Google Maps may set cookies needed to display and interact with the map.",
      "Performance — Vercel Speed Insights measures real-visitor page-load performance (Core Web Vitals). It is cookieless and aggregate, does not identify you, and is treated as essential performance measurement.",
      "Analytics — we use PostHog and Vercel Web Analytics to understand site usage. Both run only after you consent (in consent-required regions such as the EU, EEA and UK); PostHog is configured for privacy (no session recording, no advertising use) and Vercel Web Analytics is cookieless. Analytics identifiers typically last up to 12 months, and cookie consent records are kept for up to 5 years as proof of your choice.",
      "Error monitoring — Sentry helps us detect and fix technical errors; it is used to keep the site reliable and does not track you across other sites.",
    ],
    contentAr: [
      "الأساسية: حفظ تفضيلات الكوكيز (حتى لا نسألك مجدداً)، رمز معرف مجهول لتوثيق اختيارك، لغتك المفضلة، عملتك المختارة، سلة الحجز قيد التنفيذ، وملفات تعريف ارتباط الأمان والجلسة المحددة بواسطة شبكة الاستضافة والتوزيع السحابي.",
      "المدفوعات: عند الدفع، يحدد مزود الدفع (Stripe) ملفات تعريف الارتباط اللازمة لمعالجة الدفع بأمان ومنع الاحتيال، وتعد ضرورية لإتمام الحجز بنجاح.",
      "الخرائط: في الصفحات التي تعرض الخرائط، قد تحدد Google Maps ملفات ضرورية لعرض الخريطة والتفاعل معها بصورة دقيقة.",
      "الأداء: تقيس أدوات السرعة والأداء سرعة تحميل الصفحات وتجربة التصفح الفعلية بشكل مجمع ومجهول دون أي ملفات تتبع شخصية.",
      "التحليلات: نستخدم أدوات إحصائية لفهم استخدام الموقع دون تسجيل جلسات أو استخدام إعلاني. تدوم المعرفات الإحصائية حتى 12 شهراً فقط وتُحفظ سجلات الموافقة لمدة 5 سنوات كدليل على اختيارك.",
      "مراقبة الأخطاء: تساعدنا منصات الرصد على كشف الأعطال التقنية وإصلاحها لضمان كفاءة الموقع واستقراره دون أي تتبع لمواقع خارجية.",
    ],
  },
  {
    id: "your-choices",
    number: 4,
    title: "Your choices",
    titleAr: "خياراتك والتحكم في الكوكيز",
    content: [
      'When you first visit, we show a cookie banner. In the EU, EEA and UK nothing non-essential runs until you choose "Accept". In other regions analytics run by default and the banner lets you opt out.',
      'You can review or change your choice at any time using the "Cookie settings" link in the footer of every page — withdrawing consent is as easy as giving it.',
      "You can also control or delete cookies through your browser settings. Blocking essential cookies may stop parts of the site (such as checkout) from working.",
    ],
    contentAr: [
      'عند زيارتك الأولى، يظهر شريط تفضيلات ملفات تعريف الارتباط. في الاتحاد الأوروبي وبريطانيا لا يعمل أي ملف غير أساسي إلا بعد اختيار "قبول". وفي المناطق الأخرى تعمل التحليلات افتراضياً مع إمكانية الرفض فوراً.',
      'يمكنك مراجعة أو تعديل خياراتك في أي وقت من خلال رابط "إعدادات الكوكيز" في أسفل كل صفحة — فسحب الموافقة متاح وسهل دائماً.',
      "يمكنك أيضاً التحكم بالملفات أو حذفها عبر إعدادات متصفحك. يرجى ملاحظة أن حظر الملفات الأساسية قد يعطل بعض وظائف الموقع مثل إتمام الحجز والدفع.",
    ],
  },
  {
    id: "third-parties",
    number: 5,
    title: "Third parties",
    titleAr: "الأطراف الثالثة والمزودون",
    content: [
      "Some cookies are set by the providers we rely on to run the service — including Stripe (payments), Cloudflare and Vercel (hosting, security, delivery and cookieless performance measurement), Google Maps (maps), PostHog and Vercel Web Analytics (analytics) and Sentry (error monitoring). Each processes data under its own privacy terms; we only enable analytics providers where you have consented.",
    ],
    contentAr: [
      "يتم تعيين بعض الملفات بواسطة مزودي الخدمات المعتمدين لتشغيل المنصة — مثل Stripe للمدفوعات، وشبكات الاستضافة والأمان السحابية، وGoogle Maps للخرائط، وأدوات التحليل ومراقبة الأداء. يعالج كل مزود البيانات وفق شروط الخصوصية الخاصة به، ولا نفعل المزودين التحليليين إلا بعد موافقتك الصريحة.",
    ],
  },
  {
    id: "changes-and-contact",
    number: 6,
    title: "Changes and contact",
    titleAr: "التعديلات ووسائل التواصل",
    content: [
      'We will update this policy when our use of cookies changes; the "last updated" date above always reflects the current version.',
      "Questions about cookies or privacy? Contact us at support@oceanairtravels.com or call +971 4 584 0404. See also our Privacy Policy.",
    ],
    contentAr: [
      'نقوم بتحديث هذه السياسة عند حدوث أي تغيير في استخدامنا لملفات تعريف الارتباط؛ ويعكس تاريخ "آخر تحديث" في أعلى الصفحة الإصدار المعتمد دوماً.',
      "هل لديك أي استفسار حول ملفات تعريف الارتباط أو الخصوصية؟ يسعدنا تواصلك معنا عبر support@oceanairtravels.com أو الاتصال بالرقم +971 4 584 0404. يمكنك أيضاً مراجعة صفحة سياسة الخصوصية.",
    ],
  },
];

export default function CookiePolicyPage() {
  const { language } = useLanguage();
  const [activeSectionId, setActiveSectionId] = useState<string>("what-cookies-are");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;

      for (let i = COOKIE_SECTIONS.length - 1; i >= 0; i--) {
        const sec = COOKIE_SECTIONS[i];
        const el = document.getElementById(sec.id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSectionId(sec.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA]">
      <Navbar />

      <main className="flex-1 pt-24 sm:pt-28 pb-24">
        <div className="max-w-[1240px] mx-auto px-4 md:px-6 lg:px-10 space-y-12">
          {/* ==============================================================
              1. HERO SECTION (Pixel-Perfect from footercookies.png)
              ============================================================== */}
          <div className="space-y-4 max-w-3xl pt-4 border-b border-gray-200/70 pb-10">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-[#0097CA] block">
              {language === "ar" ? "سياسة ملفات تعريف الارتباط" : "COOKIE POLICY"}
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-bold text-black tracking-tight leading-[1.08]">
              {language === "ar"
                ? "ملفات تعريف الارتباط، بلغة واضحة."
                : "Cookies, in plain language."}
            </h1>

            <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed max-w-2xl">
              {language === "ar"
                ? "كيف تستخدم جوّ قطر ملفات تعريف الارتباط والتقنيات المشابهة، وما هو الغرض من كل منها، وكيف تظل متحكماً في بياناتك."
                : "How OceanAir uses cookies and similar technologies, what each one is for, and how you stay in control."}
            </p>

            <div className="pt-1 text-[11px] text-gray-400 font-medium">
              {language === "ar"
                ? "آخر تحديث · 1 يوليو 2026"
                : "Last updated · Jul 1, 2026"}
            </div>
          </div>

          {/* ==============================================================
              2. TWO-COLUMN LAYOUT (Table of Contents Left, Policy Right)
              ============================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-14 items-start">
            {/* LEFT COLUMN: STICKY TABLE OF CONTENTS */}
            <aside className="hidden lg:block sticky top-28 space-y-3">
              <span className="text-[10.5px] font-bold text-gray-400 uppercase tracking-[0.16em] block">
                {language === "ar" ? "في هذه الصفحة" : "ON THIS PAGE"}
              </span>

              <nav className="space-y-1 text-xs font-medium">
                {COOKIE_SECTIONS.map((sec) => {
                  const title =
                    language === "ar"
                      ? `${sec.number}. ${sec.titleAr}`
                      : `${sec.number}. ${sec.title}`;
                  const isActive = activeSectionId === sec.id;

                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => scrollToSection(sec.id)}
                      className={`block w-full text-start py-1.5 px-3 rounded-lg transition-colors cursor-pointer truncate ${
                        isActive
                          ? "bg-cyan-50/70 text-[#0097CA] font-bold border-s-2 border-[#0097CA]"
                          : "text-gray-600 hover:text-black hover:bg-gray-100/60"
                      }`}
                    >
                      {title}
                    </button>
                  );
                })}
              </nav>
            </aside>

            {/* RIGHT COLUMN: 6 MAIN SECTIONS */}
            <div className="space-y-12 max-w-3xl">
              {COOKIE_SECTIONS.map((sec) => {
                const heading =
                  language === "ar"
                    ? `${sec.number}. ${sec.titleAr}`
                    : `${sec.number}. ${sec.title}`;
                const paragraphs =
                  language === "ar" ? sec.contentAr : sec.content;

                return (
                  <section
                    key={sec.id}
                    id={sec.id}
                    className="scroll-mt-28 space-y-3.5 pb-2"
                  >
                    <h2 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
                      {heading}
                    </h2>

                    <div className="space-y-3 text-xs sm:text-[13px] text-gray-700 leading-relaxed font-normal">
                      {paragraphs.map((p, idx) => (
                        <p key={idx}>{p}</p>
                      ))}

                      {sec.id === "changes-and-contact" && (
                        <p className="pt-1">
                          <Link
                            href="/privacy"
                            className="font-semibold text-[#0097CA] hover:underline"
                          >
                            {language === "ar"
                              ? "الانتقال إلى صفحة سياسة الخصوصية ←"
                              : "View our Privacy Policy →"}
                          </Link>
                        </p>
                      )}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
