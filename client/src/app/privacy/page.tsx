"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

interface PrivacySection {
  id: string;
  number: number;
  title: string;
  titleAr: string;
  content: string[];
  contentAr: string[];
}

const PRIVACY_SECTIONS: PrivacySection[] = [
  {
    id: "preamble",
    number: 1,
    title: "Preamble",
    titleAr: "مقدمة وتمهيد",
    content: [
      'This policy governs OceanAir Travels — also known as OceanAir Travel and Tourism LLC ("OceanAir") — registered in the Dubai Court and Department of Economy and Tourism under license number 647907, based in Dubai, UAE. It outlines how we collect, use, and protect personal data obtained through contracts and website usage.',
    ],
    contentAr: [
      'تحكم هذه السياسة شركة جوّ قطر / أوشن إير للسياحة والسفر ذ.م.م ("الشركة") — المسجلة لدى دائرة الاقتصاد والسياحة ومحاكم دبي بموجب ترخيص رقم 647907، ومقرها الرئيسي في دبي، الإمارات العربية المتحدة. توضح هذه الوثيقة التزامنا بجمع واستخدام وحماية البيانات الشخصية الناتجة عن التعاقدات وتصفح الموقع الإلكتروني.',
    ],
  },
  {
    id: "data-collection",
    number: 2,
    title: "Data collection",
    titleAr: "جمع البيانات الشخصية",
    content: [
      "OceanAir collects personal data through two channels: direct input from customers (including WhatsApp, Chat, and other Meta platforms), and interactions with our website and booking systems.",
      "Types of data collected include name, email, phone number (during contract initiation or fulfilment), and data from website visits such as IP address and browser information. Additional data may be collected from booking system usage — device information and location data — to personalise and improve our services.",
    ],
    contentAr: [
      "تجمع الشركة البيانات الشخصية عبر قناتين رئيسيتين: المدخلات المباشرة من العملاء (بما في ذلك تطبيق واتساب، المحادثات الفورية، ومنصات ميتا)، والتفاعل الرقمي مع موقعنا وأنظمة الحجز الإلكتروني.",
      "تشمل البيانات المجمعة: الاسم الكامل، البريد الإلكتروني، رقم الهاتف (أثناء إنشاء الحجز أو تنفيذه)، وبيانات تصفح الموقع مثل عنوان IP ومعلومات المتصفح. كما قد نجمع بيانات الجهاز والموقع الجغرافي لتحسين وتخصيص تجربة المستخدم.",
    ],
  },
  {
    id: "purposes-legal-bases",
    number: 3,
    title: "Purposes and legal bases",
    titleAr: "أغراض المعالجة والأسس القانونية",
    content: [
      "We process personal data on the following legal bases: booking, payment, fulfilment and customer service for a tour you have booked — performance of a contract; tax and accounting records — compliance with a legal obligation; fraud prevention, site security and error monitoring — our legitimate interests in running the service safely; support and CRM follow-up — our legitimate interest in customer relationship management (unless it is marketing, which requires consent); and analytics cookies — your consent in the EU, EEA and UK, and legitimate interest / notice with an opt-out in other regions.",
      "Any future marketing emails or advertising/retargeting would be based on your consent, and we would not enable them until a separate marketing consent option is live.",
      "We use cookies and similar technologies as detailed in our Cookie Policy. They support website functionality, prevent misuse, and — where you consent — help us understand and improve how the site is used.",
      "Social media plugins from Facebook, LinkedIn and similar platforms may transmit data to those servers subject to their own privacy policies.",
    ],
    contentAr: [
      "نعالج البيانات الشخصية وفق الأسس القانونية التالية: تنفيذ الحجز، والمدفوعات، وخدمة العملاء (تنفيذ العقد)؛ السجلات الضريبية والمحاسبية (الامتثال لالتزام قانوني)؛ مكافحة الاحتيال وأمان الموقع ومراقبة الأخطاء (المصلحة المشروعة في تشغيل آمن للخدمة)؛ إدارة علاقات العملاء والدعم الفني؛ وملفات تعريف الارتباط التحليلية بناءً على موافقتك الصريحة.",
      "أي رسائل بريد إلكتروني تسويقية أو إعلانات موجهة تخضع لموافقتك المسبقة والاختيارية، ويمكنك إلغاء الاشتراك بها في أي وقت.",
      "نستخدم ملفات تعريف الارتباط والتقنيات المشابهة لدعم وظائف الموقع الأساسية، ومنع إساءة الاستخدام، وفهم كيفية تفاعل المستخدمين لتطوير خدماتنا.",
      "قد تنقل الإضافات الاجتماعية لفيسبوك ولينكدإن بيانات إلى خوادمها الخاصة وفقاً لسياسات الخصوصية التابعة لها.",
    ],
  },
  {
    id: "whatsapp-api-integration",
    number: 4,
    title: "WhatsApp API integration",
    titleAr: "التكامل مع واجهة برمجة تطبيقات واتساب",
    content: [
      "Data collected through WhatsApp and other Meta platforms is managed in compliance with Meta's policies.",
      "Personal data from WhatsApp interactions may be shared with third parties (such as IT service providers or contractors) solely to manage customer interactions and improve service delivery.",
    ],
    contentAr: [
      "تتم إدارة البيانات المجمعة عبر تطبيق واتساب ومنصات ميتا بما يتوافق بدقة مع سياسات الخصوصية لشركة ميتا والقوانين المعمول بها.",
      "قد تتم مشاركة البيانات الناتجة عن محادثات واتساب مع موفري خدمات تكنولوجيا المعلومات المعتمدين حصرياً لإدارة خدمة العملاء وتسهيل تسليم الرحلات والتذاكر.",
    ],
  },
  {
    id: "international-data-transfers",
    number: 5,
    title: "International data transfers",
    titleAr: "نقل البيانات عبر الحدود الدولية",
    content: [
      "International data transfers (including data from WhatsApp) comply with relevant data protection regulations — GDPR for EU clients, UAE data protection laws otherwise.",
      "Transfers outside the EU/EEA are based on adequacy decisions, standard contractual clauses, or other legally recognised mechanisms.",
    ],
    contentAr: [
      "يتوافق نقل البيانات دولياً (بما في ذلك عبر منصة واتساب) مع اللوائح الدولية لحماية البيانات — اللائحة العامة لحماية البيانات (GDPR) لعملاء الاتحاد الأوروبي، وقوانين حماية البيانات الشخصية في دولة الإمارات لبقية المناطق.",
      "تستند عمليات نقل البيانات خارج المنطقة الاقتصادية الأوروبية إلى قرارات الملاءمة الرسمية أو البنود التعاقدية القياسية المعتمدة.",
    ],
  },
  {
    id: "data-security",
    number: 6,
    title: "Data security",
    titleAr: "أمن وحماية البيانات",
    content: [
      "We implement encryption, access controls, and regular security audits to protect personal data against unauthorised access, use, or disclosure.",
    ],
    contentAr: [
      "نطبق أعلى معايير التشفير الرقمي (256-bit SSL)، وضوابط الوصول المشددة، والتدقيق الأمني الدوري لحماية بياناتك الشخصية من أي وصول أو تعديل أو إفشاء غير مصرح به.",
    ],
  },
  {
    id: "cookies-and-tracking",
    number: 7,
    title: "Cookies and tracking",
    titleAr: "ملفات تعريف الارتباط والتتبع",
    content: [
      "Essential cookies (security, your session, your cart, and your saved cookie choice) are always active because the site cannot function without them. Analytics cookies, which help us understand how the site is used, run only with your consent.",
      'In the EU, EEA and UK we ask for your consent before any analytics cookies are set. In other regions analytics run by default and you can opt out at any time. You can review or change your choice whenever you like via the "Cookie settings" link in the footer of every page.',
      "Full details — including the specific tools we use and how long cookies last — are detailed in our policy.",
    ],
    contentAr: [
      "ملفات تعريف الارتباط الضرورية (الأمان، إدارة الجلسة، سلة الحجز، وتفضيلات الخصوصية) تظل مفعلة دائماً لأن الموقع لا يمكنه العمل بدونها. أما الملفات التحليلية فلا تعمل إلا بموافقتك الصريحة.",
      'في دول الاتحاد الأوروبي وبريطانيا، نطلب موافقتك المسبقة قبل تفعيل أي ملفات تحليلية. وفي باقي المناطق يمكنك إيقاف التتبع في أي وقت من خلال رابط "إعدادات الكوكيز" في أسفل كل صفحة.',
      "توضح سياستنا المدد الزمنية لبقاء ملفات الارتباط والأدوات المعتمدة لضمان الشفافية التامة.",
    ],
  },
  {
    id: "data-retention",
    number: 8,
    title: "Data retention",
    titleAr: "فترات الاحتفاظ بالبيانات",
    content: [
      "We keep personal data only for as long as it is needed for the purpose it was collected for, or for as long as we are legally required to keep it. When data is no longer needed, it is deleted or anonymised.",
      "Booking, invoice, payment and tax-related records: retained for 7 years from the end of the relevant tax/accounting period, to meet UAE tax and accounting obligations.",
      "Customer contact records: retained for 7 years where tied to a booking or invoice, otherwise up to 3 years from the last interaction.",
      "Support and contact-form inquiries: retained for up to 3 years after the inquiry is closed, unless a longer period is required.",
      "Analytics data: retained for up to 12 months.",
      "Cookie consent records: retained for up to 5 years to demonstrate compliance, or longer where needed to establish or defend a legal claim.",
    ],
    contentAr: [
      "نحتفظ بالبيانات الشخصية فقط للمدة اللازمة لتحقيق الأغراض التي جُمعت من أجلها، أو للمدد التي تفرضها القوانين واللوائح الرسمية، ثم يتم حذفها أو إخفاء هويتها بصورة نهائية وآمنة.",
      "سجلات الحجوزات، والفواتير، والمدفوعات والضرائب: يُحتفظ بها لمدة 7 سنوات للامتثال لمتطلبات القوانين الضريبية والمحاسبية في دولة الإمارات.",
      "بيانات التواصل المرتبطة بالحجوزات: يُحتفظ بها لمدة 7 سنوات، أو حتى 3 سنوات من آخر تفاعل للاستفسارات العامة.",
      "استفسارات الدعم الفني ونماذج الاتصال: يُحتفظ بها حتى 3 سنوات بعد إغلاق الطلب.",
      "البيانات الإحصائية والتحليلية: يُحتفظ بها لمدة لا تتجاوز 12 شهراً.",
      "سجلات الموافقة على ملفات تعريف الارتباط: يُحتفظ بها لمدة 5 سنوات لإثبات الامتثال القانوني.",
    ],
  },
  {
    id: "childrens-data",
    number: 9,
    title: "Children's data",
    titleAr: "بيانات الأطفال القُصّر",
    content: [
      "Our services are not directed to children as website users. Where a booking includes a child, the adult making the booking may provide limited child guest information needed to arrange the tour — for safety, ticketing, access, or legal requirements. The adult confirms they have the authority to provide that information.",
    ],
    contentAr: [
      "خدماتنا وموقعنا غير موجهين للأطفال كمستخدمين مستقلين. عند تضمين أطفال في الحجز، يقدم الشخص البالغ المسؤول البيانات الضرورية فقط (لإصدار التذاكر والتأمين والسلامة)، ويؤكد حيازته الصلاحية والوصاية القانونية لتقديم تلك البيانات.",
    ],
  },
  {
    id: "eu-representative",
    number: 10,
    title: "EU representative",
    titleAr: "الممثل المعتمد في الاتحاد الأوروبي",
    content: [
      "Where required under Article 27 GDPR for our processing of EU residents' data, OceanAir will appoint an EU representative and publish their name and EU address here. [EU representative: to be appointed — pending legal confirmation.]",
    ],
    contentAr: [
      "وفقاً للمادة 27 من اللائحة العامة لحماية البيانات (GDPR) عند معالجة بيانات المقيمين في الاتحاد الأوروبي، تعين الشركة ممثلاً قانونياً داخل الاتحاد الأوروبي وتعلن عن بياناته وعنوانه هنا فور اعتماد الإجراءات القانونية.",
    ],
  },
  {
    id: "your-rights",
    number: 11,
    title: "Your rights",
    titleAr: "حقوقك القانونية في بياناتك",
    content: [
      "Depending on where you live, you have rights over your personal data, including: the right to access the data we hold about you; to correct inaccurate data; to have it deleted; to restrict or object to processing; to data portability; and, where processing is based on consent, to withdraw that consent at any time.",
      'Where you have consented to analytics cookies, you can withdraw that consent at any time using the "Cookie settings" link in the footer — withdrawing is as easy as giving consent.',
      "If you are in the EU/EEA or UK, you may lodge a complaint with your local data protection supervisory authority — including the authority in the country where you live, work, or where you believe an infringement occurred. For Croatia, this is the Croatian Personal Data Protection Agency (AZOP). To exercise any of these rights, contact us using the details below; requests related to WhatsApp data can be made through the same channels.",
    ],
    contentAr: [
      "وفقاً لقوانين بلد إقامتك، يحق لك ممارسة حقوقك القانونية في بياناتك، ومنها: الحق في الوصول للبيانات، تصحيح الأخطاء، طلب الحذف النهائي، تقييد أو الاعتراض على المعالجة، ونقل البيانات، وسحب الموافقة في أي وقت.",
      'يمكنك إلغاء موافقتك على ملفات تعريف الارتباط التحليلية بسهولة في أي وقت عبر رابط "إعدادات الكوكيز" في أسفل الصفحة.',
      "إذا كنت مقيماً في الاتحاد الأوروبي أو بريطانيا، يحق لك تقديم شكوى لدى هيئة الرقابة وحماية البيانات المختصة في دولتك (مثل وكالة حماية البيانات الكرواتية AZOP). لممارسة أي من هذه الحقوق، يُرجى التواصل معنا عبر وسائل الاتصال الموضحة أدناه.",
    ],
  },
  {
    id: "updates-and-notifications",
    number: 12,
    title: "Updates and notifications",
    titleAr: "التحديثات والإشعارات",
    content: [
      'OceanAir will notify users of any material changes to this policy, particularly concerning data handling practices, cookies, or WhatsApp API integration. The "last updated" date above always reflects the current version.',
    ],
    contentAr: [
      'تخطر الشركة المستخدمين بأي تغييرات جوهرية تطرأ على هذه السياسة، لا سيما ما يتعلق بممارسات معالجة البيانات، ملفات الارتباط، أو تكامل واتساب. ويعكس تاريخ "آخر تحديث" في أعلى الصفحة الإصدار الساري والمعتمد دوماً.',
    ],
  },
  {
    id: "contact",
    number: 13,
    title: "Contact",
    titleAr: "التواصل ومسؤول حماية البيانات",
    content: [
      "For questions or concerns regarding privacy practices or data protection, or to exercise any of your rights, contact us at support@oceanairtravels.com or call +971 4 584 0404.",
    ],
    contentAr: [
      "لأي استفسارات أو ملاحظات تتعلق بممارسات الخصوصية وحماية البيانات، أو لممارسة أي من حقوقك القانونية، يسعدنا تواصلكم عبر البريد الإلكتروني: support@oceanairtravels.com أو الاتصال بنا على الرقم: +971 4 584 0404.",
    ],
  },
];

export default function PrivacyPage() {
  const { language } = useLanguage();
  const [activeSectionId, setActiveSectionId] = useState<string>("preamble");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;

      for (let i = PRIVACY_SECTIONS.length - 1; i >= 0; i--) {
        const sec = PRIVACY_SECTIONS[i];
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
              1. HERO SECTION (Pixel-Perfect from footerprivacy.png)
              ============================================================== */}
          <div className="space-y-4 max-w-3xl pt-4 border-b border-gray-200/70 pb-10">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-[#0097CA] block">
              {language === "ar" ? "سياسة الخصوصية" : "PRIVACY POLICY"}
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-bold text-black tracking-tight leading-[1.08]">
              {language === "ar"
                ? "كيف نتعامل مع بياناتك الشخصية."
                : "How we handle your data."}
            </h1>

            <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed max-w-2xl">
              {language === "ar"
                ? "تتوافق عملياتنا مع قوانين حماية البيانات المعمول بها، لضمان السرية، والمعالجة القانونية، والأمن الرقمي الكامل."
                : "Our operations are compliant with relevant data protection laws, ensuring confidentiality, lawful processing, and data security."}
            </p>

            <div className="pt-1 text-[11px] text-gray-400 font-medium">
              {language === "ar"
                ? "آخر تحديث · 1 يوليو 2026"
                : "Last updated · Jul 1, 2026"}
            </div>
          </div>

          {/* ==============================================================
              2. TWO-COLUMN LAYOUT (Table of Contents Left, Legal Right)
              ============================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-14 items-start">
            {/* LEFT COLUMN: STICKY TABLE OF CONTENTS */}
            <aside className="hidden lg:block sticky top-28 space-y-3">
              <span className="text-[10.5px] font-bold text-gray-400 uppercase tracking-[0.16em] block">
                {language === "ar" ? "في هذه الصفحة" : "ON THIS PAGE"}
              </span>

              <nav className="space-y-1 text-xs font-medium">
                {PRIVACY_SECTIONS.map((sec) => {
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

            {/* RIGHT COLUMN: 13 MAIN SECTIONS */}
            <div className="space-y-12 max-w-3xl">
              {PRIVACY_SECTIONS.map((sec) => {
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
