"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import {
  Phone,
  Mail,
  MapPin,
  Check,
  ExternalLink
} from "lucide-react";

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.972.53 1.761.815 2.796.816h.005c3.18 0 5.767-2.587 5.769-5.766.001-1.543-.599-2.993-1.69-4.085-1.09-1.092-2.54-1.692-4.084-1.692zm9.969 5.766c-.003 5.485-4.464 9.946-9.969 9.946-1.745 0-3.376-.454-4.81-1.246l-5.221 1.368 1.393-5.088c-.878-1.493-1.341-3.21-1.341-4.98 0-5.485 4.463-9.946 9.97-9.946 2.662 0 5.166 1.036 7.049 2.919 1.882 1.882 2.926 4.385 2.929 7.047z" />
    </svg>
  );
}

// 4 Channel Cards matching "How to reach us"
const REACH_CHANNELS = [
  {
    id: "sales",
    title: "Sales — Tours & activities",
    titleAr: "المبيعات — الجولات والأنشطة",
    phone: "+971 55 4030 943",
    email: "sales@oceanairtravels.com",
    whatsapp: "+971 55 4030 943",
    whatsappUrl: "https://wa.me/971554030943",
    note: "Available 24/7. WhatsApp and WeChat supported.",
    noteAr: "متاح 24/7. ندعم واتساب ووي تشات.",
  },
  {
    id: "existing-bookings",
    title: "Existing bookings",
    titleAr: "الحجوزات الحالية",
    phones: ["+971 4 358 2500", "+971 4 584 0404"],
    email: "support@oceanairtravels.com",
    whatsapp: "+971 55 4030 943",
    whatsappUrl: "https://wa.me/971554030943",
    note: "Available 24/7 on WhatsApp.",
    noteAr: "متاح 24/7 على واتساب.",
  },
  {
    id: "corporate",
    title: "Corporate Events, Conferences & Group Gatherings",
    titleAr: "فعاليات الشركات والمؤتمرات والمجموعات",
    phone: "+971 55 4030 943",
    email: "events@oceanairtravels.com",
    note: "For company tours, conferences, and group events.",
    noteAr: "لجولات الشركات، والمؤتمرات، والفعاليات الجماعية.",
  },
  {
    id: "jetski",
    title: "OceanAir Jet Ski",
    titleAr: "أنشطة جت سكي والرياضات البحرية",
    phone: "+971 55 4030 943",
    note: "Fishing Harbour, Jumeirah 1, Dubai.",
    noteAr: "مرفأ الصيد، جميرا 1، دبي.",
  },
];

// 5 Office Cards matching "Our offices"
const OFFICES = [
  {
    id: "dubai",
    type: "MAIN OFFICE",
    typeAr: "المكتب الرئيسي",
    city: "Dubai",
    cityAr: "دبي",
    addressLines: [
      "OceanAir",
      "3rd floor, AAAID building",
      "Al Rowaiyah Second — Academic City",
      "Dubai, UAE",
    ],
    addressLinesAr: [
      "أوشن إير (جوّ قطر)",
      "الطابق الثالث، مبنى الهيئة العربية للاستثمار والإنماء الزراعي",
      "الروية الثانية — المدينة الأكاديمية",
      "دبي، الإمارات العربية المتحدة",
    ],
    contactInfo: "+971 55 4030 943",
  },
  {
    id: "cairo",
    type: "BRANCH OFFICE",
    typeAr: "فرع معتمد",
    city: "Cairo",
    cityAr: "القاهرة",
    addressLines: [
      "Building #4A, Khaled Ben Waleed Street",
      "3rd floor, Sheraton Al Matar",
      "Al Nozha, Cairo, Egypt",
    ],
    addressLinesAr: [
      "عمارة 4A، شارع خالد بن الوليد",
      "الطابق الثالث، مساكن شيراتون المطار",
      "النزهة، القاهرة، مصر",
    ],
    contactInfo: "+20 120 119 0500",
    hours: "07:00 – 22:00 · 24/7 on phone",
    hoursAr: "07:00 – 22:00 · خدمة هاتفية 24/7",
  },
  {
    id: "doha",
    type: "BRANCH OFFICE",
    typeAr: "فرع معتمد",
    city: "Doha",
    cityAr: "الدوحة",
    addressLines: [
      "OceanAir Travels WLL",
      "Office 25, Building 20, Khalidiya Street",
      "Najma, Street 940, Zone 26",
      "Doha, Qatar",
    ],
    addressLinesAr: [
      "شركة أوشن إير / جوّ قطر للسياحة ذ.م.م",
      "مكتب 25، مبنى 20، شارع الخالدية",
      "النجمة، شارع 940، منطقة 26",
      "الدوحة، دولة قطر",
    ],
    contactInfo: "+974 5079 5511",
    hours: "Available 24/7",
    hoursAr: "متاح على مدار الساعة 24/7",
  },
  {
    id: "kochi",
    type: "BRANCH OFFICE",
    typeAr: "فرع معتمد",
    city: "Kochi",
    cityAr: "كوتشي",
    addressLines: [
      "OceanAir Travels",
      "First Floor, Parekkattu Plaza",
      "Karikkamuri Cross Road, Ernakulam South",
      "Kochi 682011, Kerala, India",
    ],
    addressLinesAr: [
      "أوشن إير ترافلز",
      "الطابق الأول، باريكاتو بلازا",
      "طريق كاريكاموري المتقاطع، جنوب إرناكولام",
      "كوتشي 682011، كيرلا، الهند",
    ],
    hours: "09:00 – 18:00",
    hoursAr: "09:00 – 18:00 بتوقيت الهند",
  },
  {
    id: "muscat",
    type: "BRANCH OFFICE",
    typeAr: "فرع معتمد",
    city: "Muscat",
    cityAr: "مسقط",
    addressLines: [
      "OceanAir Travel & Tourism LLC",
      "CR 1341001, P.O. Box 190",
      "Postal Code 223, Ruwi",
      "Muscat, Oman",
    ],
    addressLinesAr: [
      "أوشن إير للسفر والسياحة ش.م.م",
      "سجل تجاري 1341001، ص.ب 190",
      "الرمز البريدي 223، روي",
      "مسقط، سلطنة عُمان",
    ],
    contactInfo: "+968 2470 1199",
  },
];

export default function ContactUsPage() {
  const { language } = useLanguage();

  // Form State
  const [reason, setReason] = useState("Book a single-day experience");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName && email && message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA]">
      <Navbar />

      <main className="flex-1 pt-24 sm:pt-28 pb-20">
        <div className="max-w-[1240px] mx-auto px-4 md:px-6 lg:px-10 space-y-16">
          {/* ==============================================================
              1. HERO SECTION (Pixel-Perfect from contactusfooter.png)
              ============================================================== */}
          <div className="space-y-3 max-w-3xl pt-4">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-[#0097CA] block">
              {language === "ar" ? "اتصل بنا" : "CONTACT US"}
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-bold text-black tracking-tight leading-[1.1]">
              {language === "ar" ? "تحدث مع شخص حقيقي." : "Talk to a real person."}
            </h1>

            <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed max-w-2xl">
              {language === "ar"
                ? "فريقنا يجيب خلال ساعات، طوال أيام الأسبوع. واتساب هو الأسرع للتواصل معنا — ولكن البريد الإلكتروني والهاتف متاحان دائماً."
                : "Our team replies within hours, every day of the week. WhatsApp is the fastest way to reach us — but email and phone work too."}
            </p>
          </div>

          {/* ==============================================================
              2. SECTION: HOW TO REACH US (4 Channel Cards)
              ============================================================== */}
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
                {language === "ar" ? "كيفية التواصل معنا" : "How to reach us"}
              </h2>
              <p className="text-xs text-gray-500">
                {language === "ar"
                  ? "اختر القناة التي تطابق احتياجك — بهذه الطريقة يتولى فريقنا خدمتك بشكل أسرع."
                  : "Pick the channel that matches what you need — our team routes faster that way."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {REACH_CHANNELS.map((ch) => {
                const title = language === "ar" && ch.titleAr ? ch.titleAr : ch.title;
                const note = language === "ar" && ch.noteAr ? ch.noteAr : ch.note;

                return (
                  <div
                    key={ch.id}
                    className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-5"
                  >
                    <div className="space-y-4">
                      <h3 className="text-base sm:text-[17px] font-bold text-black">
                        {title}
                      </h3>

                      <div className="space-y-2.5 text-xs text-gray-700">
                        {/* Single phone */}
                        {ch.phone && (
                          <div className="flex items-center gap-2.5">
                            <Phone className="w-4 h-4 text-gray-500 shrink-0" />
                            <a
                              href={`tel:${ch.phone.replace(/[^0-9+]/g, "")}`}
                              className="font-medium hover:text-[#0097CA] transition-colors"
                            >
                              {ch.phone}
                            </a>
                          </div>
                        )}

                        {/* Multiple phones */}
                        {ch.phones && (
                          <div className="space-y-1.5">
                            {ch.phones.map((p) => (
                              <div key={p} className="flex items-center gap-2.5">
                                <Phone className="w-4 h-4 text-gray-500 shrink-0" />
                                <a
                                  href={`tel:${p.replace(/[^0-9+]/g, "")}`}
                                  className="font-medium hover:text-[#0097CA] transition-colors"
                                >
                                  {p}
                                </a>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Email */}
                        {ch.email && (
                          <div className="flex items-center gap-2.5">
                            <Mail className="w-4 h-4 text-gray-500 shrink-0" />
                            <a
                              href={`mailto:${ch.email}`}
                              className="font-medium hover:text-[#0097CA] transition-colors"
                            >
                              {ch.email}
                            </a>
                          </div>
                        )}

                        {/* WhatsApp */}
                        {ch.whatsapp && (
                          <div className="flex items-center gap-2.5">
                            <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0" />
                            <a
                              href={ch.whatsappUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="font-medium text-[#0097CA] hover:underline transition-colors flex items-center gap-1"
                            >
                              <span>WhatsApp</span>
                              <ExternalLink className="w-3 h-3 text-gray-400" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Note Footer */}
                    <div className="pt-3 border-t border-gray-100">
                      <p className="text-[11.5px] text-gray-500">{note}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ==============================================================
              3. SECTION: OUR OFFICES (5 Office Cards)
              ============================================================== */}
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
                {language === "ar" ? "مكاتبنا" : "Our offices"}
              </h2>
              <p className="text-xs text-gray-500">
                {language === "ar"
                  ? "خمسة مكاتب رئيسية وفرعية في الإمارات، مصر، قطر، الهند، وعُمان."
                  : "Five offices across the UAE, Egypt, Qatar, India, and Oman."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {OFFICES.map((office) => {
                const typeText =
                  language === "ar" && office.typeAr ? office.typeAr : office.type;
                const cityName =
                  language === "ar" && office.cityAr ? office.cityAr : office.city;
                const addressLines =
                  language === "ar" && office.addressLinesAr
                    ? office.addressLinesAr
                    : office.addressLines;
                const hoursText =
                  language === "ar" && office.hoursAr ? office.hoursAr : office.hours;

                return (
                  <div
                    key={office.id}
                    className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3.5">
                      {/* Badge & City */}
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-cyan-50 text-[#0097CA] flex items-center justify-center shrink-0">
                          <MapPin className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400 block">
                            {typeText}
                          </span>
                          <h3 className="text-base font-bold text-black leading-tight">
                            {cityName}
                          </h3>
                        </div>
                      </div>

                      {/* Address Lines */}
                      <div className="space-y-1 text-xs text-gray-600 leading-relaxed ps-1">
                        {addressLines.map((line, idx) => (
                          <p key={idx}>{line}</p>
                        ))}
                      </div>
                    </div>

                    {/* Contact & Hours Footer */}
                    <div className="pt-3 border-t border-gray-100 space-y-1 text-xs text-gray-700 font-medium">
                      {office.contactInfo && (
                        <p className="text-black">{office.contactInfo}</p>
                      )}
                      {hoursText && (
                        <p className="text-[11.5px] text-gray-500 font-normal">
                          {hoursText}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ==============================================================
              4. SECTION: SEND US A MESSAGE (Contact Form)
              ============================================================== */}
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
                {language === "ar" ? "أرسل لنا رسالة" : "Send us a message"}
              </h2>
              <p className="text-xs text-gray-500">
                {language === "ar"
                  ? "أولاً، حدد سبب تواصلك — لنتمكن من توجيهك إلى الشخص المناسب فوراً."
                  : "First, pick your reason — that way we route you to the right person faster."}
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 md:p-10 shadow-xs max-w-3xl">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center shadow-xs">
                    <Check className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-black">
                    {language === "ar" ? "تم استلام رسالتك بنجاح!" : "Message received!"}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                    {language === "ar"
                      ? "شكراً لتواصلك معنا. سيتصل بك أحد أعضاء فريقنا خلال ساعات قليلة عبر البريد الإلكتروني أو الهاتف."
                      : "Thank you for getting in touch. A specialist from our team will reply within hours via email or phone."}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setMessage("");
                    }}
                    className="mt-4 px-6 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-xs font-bold text-black transition-colors cursor-pointer"
                  >
                    {language === "ar" ? "إرسال رسالة أخرى" : "Send another message"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Dropdown: I want to... */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700 block">
                      {language === "ar" ? "أرغب في..." : "I want to..."}
                    </label>
                    <select
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50/50 hover:bg-white text-xs font-medium text-black focus:outline-hidden focus:border-[#0097CA] transition-colors cursor-pointer"
                    >
                      <option value="Book a single-day experience">
                        {language === "ar"
                          ? "حجز تجربة أو جولة ليوم واحد"
                          : "Book a single-day experience"}
                      </option>
                      <option value="Ask about multi-day tours">
                        {language === "ar"
                          ? "الاستفسار عن رحلات متعددة الأيام"
                          : "Ask about multi-day tours"}
                      </option>
                      <option value="Manage an existing booking">
                        {language === "ar"
                          ? "إدارة أو تعديل حجز قائم"
                          : "Manage an existing booking"}
                      </option>
                      <option value="Corporate or group gathering">
                        {language === "ar"
                          ? "تنظيم فعالية لشركة أو تجمع عائلي/مجموعة"
                          : "Corporate or group gathering"}
                      </option>
                      <option value="Partnership or media inquiry">
                        {language === "ar"
                          ? "استفسار شراكة أو إعلام"
                          : "Partnership or media inquiry"}
                      </option>
                      <option value="Other inquiry">
                        {language === "ar" ? "استفسار عام آخر" : "Other inquiry"}
                      </option>
                    </select>
                  </div>

                  {/* Two Column: First name & Last name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-700 block">
                        {language === "ar" ? "الاسم الأول" : "First name"}
                      </label>
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder={language === "ar" ? "مثال: محمد" : "First name"}
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white text-xs text-black placeholder-gray-400 focus:outline-hidden focus:border-[#0097CA] transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-700 block">
                        {language === "ar" ? "اسم العائلة" : "Last name"}
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder={language === "ar" ? "مثال: آل ثاني" : "Last name"}
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white text-xs text-black placeholder-gray-400 focus:outline-hidden focus:border-[#0097CA] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Field: Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700 block">
                      {language === "ar" ? "البريد الإلكتروني" : "Email"}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={language === "ar" ? "your@email.com" : "your@email.com"}
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white text-xs text-black placeholder-gray-400 focus:outline-hidden focus:border-[#0097CA] transition-colors"
                    />
                  </div>

                  {/* Field: Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700 block">
                      {language === "ar"
                        ? "رقم الهاتف (الافتراضي +971 أو +974)"
                        : "Phone (UAE default +971)"}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+971 5x xxx xxxx"
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white text-xs text-black placeholder-gray-400 focus:outline-hidden focus:border-[#0097CA] transition-colors"
                    />
                  </div>

                  {/* Field: What can we help with? */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700 block">
                      {language === "ar" ? "كيف يمكننا مساعدتك؟" : "What can we help with?"}
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={
                        language === "ar"
                          ? "أخبرنا بتفاصيل رحلتك، التواريخ المرغوبة، أو أي متطلبات خاصة..."
                          : "Tell us how we can help..."
                      }
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white text-xs text-black placeholder-gray-400 focus:outline-hidden focus:border-[#0097CA] transition-colors resize-y leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-8 py-3 rounded-full bg-[#0097CA] hover:bg-[#0083B0] text-white text-xs font-bold transition-all shadow-sm hover:shadow-md cursor-pointer inline-flex items-center gap-2"
                    >
                      <span>{language === "ar" ? "إرسال الرسالة" : "Send message"}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
