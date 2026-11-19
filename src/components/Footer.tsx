"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Send, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

function InstagramIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

function FacebookIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

function YoutubeIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z"/>
    </svg>
  );
}

function LinkedinIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z"/>
    </svg>
  );
}

export function Footer() {
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#051C2C] text-white pt-16 pb-10 border-t border-white/10">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-10 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_1fr] gap-10 lg:gap-14">
          {/* Left Column: Brand & Newsletter Subscription */}
          <div className="space-y-5">
            <Link href="/" className="inline-block group">
              <div className="relative h-12 sm:h-14 md:h-16 w-48 sm:w-56 md:w-64">
                <Image
                  src="/brand/logo-blue.png"
                  alt="GottQatar"
                  fill
                  className="object-contain object-left rtl:object-right brightness-0 invert transition-transform duration-300 scale-[1.3] sm:scale-[1.4] md:scale-[1.5] origin-left rtl:origin-right group-hover:scale-[1.55]"
                />
              </div>
            </Link>

            <h3 className="text-[19px] sm:text-[22px] font-bold text-white tracking-tight leading-snug">
              {language === "ar"
                ? "جاهز للتخطيط لرحلتك القادمة؟"
                : "Ready to plan your next trip?"}
            </h3>

            <p className="text-xs sm:text-[13px] text-white/70 max-w-md leading-relaxed">
              {language === "ar"
                ? "تجارب جديدة، وأدلة وجهات سياحية، ووصول مبكر لأفضل المواعيد — مباشرة إلى بريدك الإلكتروني."
                : "New experiences, destination guides, and early access to limited slots — straight to your inbox."}
            </p>

            <form onSubmit={handleSubscribe} className="flex max-w-md gap-2 pt-1">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={language === "ar" ? "بريدك الإلكتروني" : "your@email.com"}
                  required
                  suppressHydrationWarning
                  className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-2.5 text-xs text-white placeholder-white/50 focus:outline-hidden focus:border-[#0097CA] transition-colors"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-[#0097CA] hover:bg-[#0085B2] text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer whitespace-nowrap"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>{language === "ar" ? "تم الاشتراك" : "Subscribed"}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 rtl:rotate-180" />
                    <span>{language === "ar" ? "اشترك" : "Subscribe"}</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column 1: Explore */}
          <div className="space-y-3.5">
            <h4 className="text-[11px] font-bold text-white/50 uppercase tracking-[0.16em]">
              {language === "ar" ? "استكشف" : "EXPLORE"}
            </h4>
            <ul className="space-y-2.5 text-[13px] text-white/80">
              <li>
                <Link href="/" className="hover:text-cyan-300 transition-colors">
                  {language === "ar" ? "الرئيسية" : "Home"}
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="hover:text-cyan-300 transition-colors">
                  {language === "ar" ? "تجارب سياحية" : "Experiences"}
                </Link>
              </li>
              <li>
                <Link href="/multiday" className="hover:text-cyan-300 transition-colors">
                  {language === "ar" ? "رحلات متعددة الأيام" : "Multi-day tours"}
                </Link>
              </li>
              <li>
                <Link href="/#destinations" className="hover:text-cyan-300 transition-colors">
                  {language === "ar" ? "المدونة السياحية" : "Blog"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Column 2: Support & Policies */}
          <div className="space-y-3.5">
            <h4 className="text-[11px] font-bold text-white/50 uppercase tracking-[0.16em]">
              {language === "ar" ? "الدعم والمساعدة" : "SUPPORT"}
            </h4>
            <ul className="space-y-2 text-[13px] text-white/80">
              <li>
                <Link href="/about" className="hover:text-cyan-300 transition-colors">
                  {language === "ar" ? "من نحن" : "About us"}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-300 transition-colors">
                  {language === "ar" ? "اتصل بنا" : "Contact"}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-cyan-300 transition-colors">
                  {language === "ar" ? "الأسئلة الشائعة" : "FAQ"}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-cyan-300 transition-colors">
                  {language === "ar" ? "الشروط والأحكام" : "Terms"}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-cyan-300 transition-colors">
                  {language === "ar" ? "سياسة الخصوصية" : "Privacy"}
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-cyan-300 transition-colors">
                  {language === "ar" ? "سياسة ملفات تعريف الارتباط" : "Cookie policy"}
                </Link>
              </li>
              <li>
                <Link href="/cookies#your-choices" className="hover:text-cyan-300 transition-colors">
                  {language === "ar" ? "إعدادات الكوكيز" : "Cookie settings"}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            © 2010-2026 GottQatar LLC. {language === "ar" ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors text-white/70"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors text-white/70"
            >
              <FacebookIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors text-white/70 font-bold text-[10px]"
            >
              TT
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors text-white/70"
            >
              <YoutubeIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors text-white/70"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
