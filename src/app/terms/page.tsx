"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

interface TermSection {
  id: string;
  number: number;
  title: string;
  titleAr: string;
  content: string[];
  contentAr: string[];
  subsections?: {
    subtitle?: string;
    subtitleAr?: string;
    points?: string[];
    pointsAr?: string[];
  };
}

const TERMS_SECTIONS: TermSection[] = [
  {
    id: "general",
    number: 1,
    title: "General",
    titleAr: "أحكام عامة",
    content: [
      "All terms below are general and apply to every product on oceanairtravels.com unless something different is stated on the product page.",
      'A Customer must include every name on the booking form intending to travel with us. A Product is any service sold by OceanAir Travel & Tourism LLC ("OceanAir").',
      "All customers will be deemed to have read, understood and accepted these conditions. A contract between you and OceanAir exists once we have confirmed your booking in writing and issued a confirmation.",
      "The person signing the booking form warrants they have full authority on behalf of everyone named on it. The contract is subject to UAE law and the exclusive jurisdiction of UAE courts. No employee may alter these terms unless authorised in writing by the CEO.",
    ],
    contentAr: [
      "تسري جميع الشروط والأحكام أدناه على كافة المنتجات والتجارب المتاحة عبر الموقع، ما لم يُنص على خلاف ذلك صراحة في صفحة التجربة.",
      'يجب على العميل تضمين أسماء جميع المسافرين الراغبين بالسفر معنا في استمارة الحجز. ويُقصد بالمنتج أي خدمة تقدمها شركة جوّ قطر / أوشن إير للسياحة والسفر ذ.م.م ("الشركة").',
      "يُعتبر جميع العملاء قد قرأوا هذه الشروط وفهموها ووافقوا عليها دون قيد أو شرط. ينشأ العقد القانوني الملزم بينك وبين الشركة بمجرد تأكيد الحجز كتابياً وإصدار قسيمة التأكيد الرسمية.",
      "يقر ويضمن الشخص الذي يتمم الحجز بأن لديه كامل الأهلية والصلاحية القانونية نيابة عن جميع المسافرين المذكورين. يخضع هذا العقد لقوانين دولة الإمارات العربية المتحدة والاختصاص القضائي الحصري لمحاكمها.",
    ],
  },
  {
    id: "how-website-operates",
    number: 2,
    title: "How the website operates",
    titleAr: "آلية عمل الموقع والخدمات",
    content: [
      "Section A — Tours, activities, transfers and ground-handling services (excluding hotels and flight tickets) are operated through online systems with live availability, prices, and payments.",
      "Section B — Holiday packages including hotels and flight tickets are operated via offline inquiry (email, call, WhatsApp, or live chat). Availability, prices, and payments are subject to change.",
    ],
    contentAr: [
      "القسم (أ) — الجولات، والأنشطة، وخدمات النقل والاستقبال الأرضي (باستثناء الفنادق وتذاكر الطيران) تتم إدارتها عبر النظام الإلكتروني المباشر مع أسعار وتوافر فوري.",
      "القسم (ب) — باقات العطلات المشتملة على إقامة فندقية وتذاكر طيران تتم عبر الاستفسار المباشر (البريد الإلكتروني، الاتصال، الواتساب، أو المحادثة الفورية)، وتخضع الأسعار والتوافر للتحديث المستمر.",
    ],
  },
  {
    id: "who-operates-website",
    number: 3,
    title: "Who operates this website",
    titleAr: "الجهة المشغلة للموقع",
    content: [
      "The website (software, text, images, videos, services, products) is provided by:",
      "1005, 10th Floor, Sobha Sapphire Building — Al Khaleej Al Tejari 2 St, Business Bay, Dubai, UAE.",
      "Contact: support@oceanairtravels.com · +971 55 403 0943.",
    ],
    contentAr: [
      "يتم تشغيل هذا الموقع الإلكتروني (البرمجيات، المحتوى، الصور، الفيديوهات والخدمات) بواسطة:",
      "مكتب 1005، الطابق العاشر، مبنى شوبا سافاير — شارع الخليج التجاري 2، الخليج التجاري، دبي، الإمارات العربية المتحدة.",
      "للتواصل وخدمة العملاء: support@oceanairtravels.com · +971 55 403 0943.",
    ],
  },
  {
    id: "fares-arrangements",
    number: 4,
    title: "Fares & arrangements",
    titleAr: "الأسعار وترتيبات السفر",
    content: [
      "Some airfares and land arrangements must be paid in full at booking and carry a 100% non-refund on cancellation. In such cases you will be notified at booking. Arrangements are confirmed only when you receive our email confirmation.",
      "Before a booking is confirmed, OceanAir may amend the product price for circumstances outside our control — government actions, transport cost increases (including fuel), changes in dues/taxes/fees, admission fee increases, hotel rate or availability changes. Advertised prices may vary slightly with seasonal changes and exchange rates. Payments accepted via bank transfer, Visa, or Mastercard.",
      "Advertised prices are shown exclusive of a 5% UAE government tax (VAT). This tax is added on top of the price and itemised as a separate 'Gov Tax (5%)' line in your order summary before payment; the total you confirm at checkout is the amount charged.",
    ],
    contentAr: [
      "تتطلب بعض تذاكر الطيران والترتيبات الأرضية السداد الكامل عند الحجز وتخضع لسياسة عدم الاسترداد بنسبة 100% عند الإلغاء، ويتم إخطار العميل بذلك صراحة. لا تصبح الترتيبات مؤكدة إلا بعد استلام قسيمة التأكيد الرسمية عبر البريد الإلكتروني.",
      "قبل تأكيد الحجز، يحق للشركة تعديل الأسعار للظروف الخارجة عن إرادتنا مثل القرارات الحكومية، ارتفاع تكاليف الوقود والنقل، الرسوم والضرائب، أو تعديلات أسعار الفنادق والمعالم. نقبل الدفع عبر التحويل البنكي، وبطاقات فيزا وماستركارد.",
      "تُعرض الأسعار المعلنة غير شاملة لضريبة القيمة المضافة الحكومية بنسبة 5%، وتتم إضافتها وتفصيلها كبند منفصل في ملخص الطلب قبل الدفع؛ والمبلغ الإجمالي المؤكد في شاشة الدفع هو ما يتم تحصيله فعلياً.",
    ],
  },
  {
    id: "payment",
    number: 5,
    title: "Payment",
    titleAr: "طرق وسياسات الدفع",
    content: [
      "Your card is charged at booking. If the provider does not accept your booking, the charge is reversed.",
      "We use Stripe and MamoPay as payment partners — Visa, Mastercard, American Express, Discover, Diners Club, Google Pay, Apple Pay, and major Chinese payment methods are all supported.",
      "Option 1 — Tours / activities / ground handling (online product). 50% at booking if confirmation is immediate. Balance paid on pickup to the OceanAir representative. 'Cash on pickup' may be elected; the total is collected on pickup.",
      "Option 2 — Holidays & tour packages excluding flight tickets. 50% at booking to issue the e-voucher; balance (the remaining 50%) due 7 days before travel.",
      "Option 3 — Holidays & tour packages including flight tickets. Reservation confirmed on full payment due at booking. 20% deposit required within 24 hours of confirmation; balance due 28 days before departure.",
    ],
    contentAr: [
      "يتم تحصيل الرسوم من بطاقتك الائتمانية عند الحجز، وفي حال تعذر قبول الحجز من قِبل المزود يتم إلغاء الرسوم وإعادتها فوراً إلى حسابك.",
      "نعتمد بوابات دفع دولية مشفرة (Stripe و MamoPay) تدعم بطاقات فيزا، ماستركارد، أمريكان إكسبريس، ديسكفر، داينرز كلوب، آبل باي، وجوجل باي.",
      "الخيار 1 — الجولات والأنشطة اليومية والنقل: دفع 50% عند الحجز الفوري، وسداد المبلغ المتبقي لمندوب الشركة عند الاستقبال. كما يمكن اختيار 'الدفع نقداً عند الاستقبال' ليتم تحصيل الإجمالي كاملاً عند الحضور.",
      "الخيار 2 — باقات العطلات دون تذاكر طيران: دفع 50% لإصدار القسيمة الإلكترونية، وسداد الـ 50% المتبقية قبل 7 أيام من موعد السفر.",
      "الخيار 3 — باقات العطلات الشاملة لتذاكر الطيران: يتأكد الحجز بالسداد الكامل عند الحجز، مع إمكانية دفع عربون 20% خلال 24 ساعة وسداد الرصيد المتبقي قبل 28 يوماً من المغادرة.",
    ],
  },
  {
    id: "online-payment-requirements",
    number: 6,
    title: "Online payment requirements",
    titleAr: "متطلبات الدفع الإلكتروني والامتثال",
    content: [
      "OceanAir does not deal with or provide services to OFAC-sanctioned countries, in compliance with UAE law.",
      "Online payments are supported in AED (UAE Dirhams) and USD (US Dollars). For card transactions, customer identification must match the card used.",
      "If you book one of our products through a third-party provider (e.g. booking.com), all inquiries and communications must go to that provider — not OceanAir. We are not responsible for issues arising from third-party transactions. Disputes are adjudicated under UAE law.",
    ],
    contentAr: [
      "تلتزم الشركة بالقوانين والأنظمة المعمول بها في دولة الإمارات العربية المتحدة ولا تتعامل أو تقدم أي خدمات للدول الخاضعة لعقوبات مكتب مراقبة الأصول الأجنبية (OFAC).",
      "تدعم المدفوعات الإلكترونية الدرهم الإماراتي والدولار الأمريكي واليورو، ويجب أن تتطابق بيانات الهوية الرسمية للعميل مع بيانات البطاقة المستخدمة في المعاملة.",
      "عند حجز أي من منتجاتنا عبر منصات وسيطة كطرف ثالث (مثل Booking.com)، يجب توجيه كافة الاستفسارات للمنصة الحاجزة. تخضع جميع النزاعات لقوانين دولة الإمارات.",
    ],
  },
  {
    id: "tourism-dirham",
    number: 7,
    title: "Tourism Dirham",
    titleAr: "رسم درهم السياحة",
    content: [
      "Dubai: Per Dubai Government Council Resolution No. 2 of 2014, hotels, hotel apartments, and resorts in Dubai apply the Tourism Dirham fee structure (in force since March 31, 2014).",
      "Ras Al Khaimah: Hotels, apartments, and resorts in Ras Al Khaimah apply the Tourism Dirham fee structure.",
      "The Tourism Dirham is charged to guests at hotel checkout.",
    ],
    contentAr: [
      "دبي: وفقاً لقرار المجلس التنفيذي لحكومة دبي رقم (2) لسنة 2014، تطبق جميع الفنادق والشقق الفندقية والمنتجعات رسم 'درهم السياحة' الإلزامي.",
      "رأس الخيمة: تطبق المنشآت الفندقية والشقق السياحية في إمارة رأس الخيمة رسم درهم السياحة المعتمد محلياً.",
      "يتم تحصيل رسم درهم السياحة مباشرة من الضيوف والنزلاء عند المغادرة وتسجيل الخروج من الفندق.",
    ],
  },
  {
    id: "changes-to-terms",
    number: 8,
    title: "Changes to these terms",
    titleAr: "تعديل الشروط والأحكام",
    content: [
      "These terms may change without prior notice. The terms valid at the time of each booking apply. You have no claim that future bookings be completed under existing conditions.",
    ],
    contentAr: [
      "تخضع هذه الشروط والأحكام للتحديث والتعديل في أي وقت دون إشعار مسبق. وتسري الشروط الصالحة والمعلنة وقت إتمام كل حجز على تلك المعاملة المحددة.",
    ],
  },
  {
    id: "cancellation-policy",
    number: 9,
    title: "Cancellation policy",
    titleAr: "سياسة الإلغاء والقوة القاهرة",
    content: [
      "OceanAir reserves the right to cancel any confirmed booking. We will not cancel a Guaranteed Departure product except under force majeure — war, threat of war, riot, civil strife, industrial dispute, terrorist activity, natural or nuclear disaster, fire, adverse weather, flight cancellation, or other circumstances outside our control.",
      "Compensation is not available if OceanAir is forced to cancel due to force majeure. If we cannot provide the tour booked, all payments received (less insurance premiums) are returned, or an alternative date or tour of comparable standard is offered.",
      "If you cancel an activity, the cancellation policy on your OceanAir voucher is authoritative — read it carefully.",
      "If no policy is stated on the voucher or product page, the defaults are: up to 4 days before activity — full refund. 3 days, day before, or no-show — no refund.",
      "OceanAir or its supplier may cancel without adherence to the cancellation period if weather, government action, or other unforeseeable circumstances endanger or substantially impede the activity.",
    ],
    contentAr: [
      "تحتفظ الشركة بحق إلغاء أي حجز مؤكد، ولن يتم إلغاء رحلات المغادرة المضمونة إلا في حالات القوة القاهرة الاستثنائية مثل الكوارث الطبيعية، سوء الأحوال الجوية الشديد، أو القرارات الحكومية الإلزامية.",
      "في حالات الإلغاء الناتج عن القوة القاهرة، يُعاد كامل المبلغ المدفوع (مخصوماً منه أقساط التأمين إن وجدت) أو يُعرض موعد بديل أو رحلة ذات مستوى مماثل دون تعويضات إضافية.",
      "في حال إلغاء النشاط من قِبل العميل، فإن سياسة الإلغاء الموضحة على قسيمة الحجز هي المعتمدة والملزمة قانوناً.",
      "إذا لم تُحدد سياسة خاصة على القسيمة، تسري السياسة الافتراضية: استرداد كامل حتى 4 أيام قبل النشاط. الإلغاء قبل 3 أيام أو في اليوم السابق أو عدم الحضور لا يمنح أي حق في الاسترداد.",
      "يحق للشركة أو المزود المعتمد إلغاء النشاط دون التقيد بفترة الإخطار إذا كان الطقس أو الظروف الطارئة تهدد سلامة المشاركين.",
    ],
  },
  {
    id: "exclusion",
    number: 10,
    title: "Exclusion",
    titleAr: "الاستبعاد وعدم الأهلية",
    content: [
      "OceanAir may refuse admittance or exclude you from any activity if you do not meet the eligibility requirements, if your participation puts you or others at risk, or if you interfere with the proper conduct of the activity. In these cases, the price paid is not refunded.",
      "This is done excluding any compensation for damages or other claims under any legal basis — applies to all cancellation policies.",
    ],
    contentAr: [
      "يحق للشركة رفض قبول أو استبعاد أي عميل من النشاط إذا لم يستوفِ شروط الأهلية والسن، أو إذا كان اشتراكه يعرض سلامته أو سلامة الآخرين للخطر، أو يتسبب في تعطيل سير الرحلة، دون أي التزام برد المبلغ المدفوع.",
      "يتم هذا الاستبعاد دون أي تعويض عن الأضرار أو أي مطالبات قانونية أخرى، ويسري ذلك على كافة سياسات الإلغاء.",
    ],
  },
  {
    id: "health-insurance",
    number: 11,
    title: "Health insurance",
    titleAr: "التأمين الصحي والسلامة",
    content: [
      "We strongly advise comprehensive health insurance before participating in any activity. Some of our offerings may qualify as extreme sports — adequate coverage is crucial for safety and financial protection.",
    ],
    contentAr: [
      "ننصح جميع عملائنا وضيوفنا بشدة بالحصول على وثيقة تأمين صحي وسياحي شاملة تغطي الأنشطة الخارجية والرياضات الصحراوية والبحرية لضمان الحماية الشخصية والمالية الكاملة.",
    ],
  },
  {
    id: "other-conditions",
    number: 12,
    title: "Other conditions",
    titleAr: "شروط وحدود المسؤولية",
    content: [
      "To the maximum extent permitted by law, OceanAir accepts no responsibility for any damage, loss, accident, sickness, injury, or death arising out of activities or in connection with your contract with us and/or the activity operator.",
      "You are advised to have comprehensive travel and health insurance. All personal effects are at your sole risk during activities. You take responsibility for ensuring you are physically and mentally capable of participating in the chosen activity.",
    ],
    contentAr: [
      "إلى أقصى حد يسمح به القانون، لا تتحمل الشركة أي مسؤولية عن أي أضرار مادية، أو فقدان للمقتنيات الشخصية، أو حوادث أو إصابات تنشأ أثناء ممارسة الأنشطة أو ترتبط بالتعاقد مع مشغلي الأنشطة.",
      "يتحمل العميل كامل المسؤولية عن متعلقاته الشخصية طوال فترة الرحلة، كما يقر بمسؤوليته عن ملاءمته الصحية والبدنية والنفسية للمشاركة في النشاط المختار.",
    ],
  },
  {
    id: "amendments-cancellations-clients",
    number: 13,
    title: "Amendments and cancellations by clients",
    titleAr: "التعديل والإلغاء من قِبل العميل",
    content: [
      "At booking, provide full, correct names as they appear on your passport. Changes to the original booking are subject to availability if full payment has been received and/or a voucher has been issued.",
      "Refunds against any purchase made through this website are returned to the original payment method.",
      "Clients wishing to cancel must inform OceanAir in writing, signed by the lead passenger. Cancellation takes effect on the date the request is received.",
      "Cancellation charges:",
      "· Up to 14 days before departure — AED 500 per person",
      "· 7 to 2 days (48 hours) before — 50% (minimum AED 500 per person)",
      "· 1 day before — 100%",
    ],
    contentAr: [
      "يجب تقديم الأسماء الكاملة والصحيحة تماماً كما تظهر في جواز السفر عند إتمام الحجز. يخضع أي طلب تعديل لمدى التوافر والرسوم المطبقة.",
      "تُعاد أي مبالغ مستردة حصرياً إلى نفس وسيلة الدفع والبطاقة التي استخدمت في الشراء الأصلي.",
      "يجب على العميل الراغب في الإلغاء إخطار الشركة خطياً بطلب موقع من المسافر الرئيسي، ويبدأ سريان الإلغاء من تاريخ استلام الإشعار الرسمي.",
      "رسوم الإلغاء للباقات الخاصة:",
      "· حتى 14 يوماً قبل موعد المغادرة — 500 درهم إماراتي للشخص الواحد",
      "· من 7 أيام إلى يومين (48 ساعة) قبل المغادرة — 50% من إجمالي المبلغ (بحد أدنى 500 درهم للشخص)",
      "· قبل يوم واحد أو عدم الحضور — 100% من إجمالي قيمة الحجز دون استرداد",
    ],
  },
  {
    id: "refund-policy",
    number: 14,
    title: "Refund policy",
    titleAr: "سياسة الاسترداد المالي",
    content: [
      "Refunds are issued within 30 working days, credited to the card used. If the card payment is made before the booked service is not honoured or revoked, this is considered a booking cancellation and cancellation fees apply. Further claims for damages are reserved.",
      "No refund is given for air tickets or partially used services. Once a booking is confirmed, amendments must be advised by the lead passenger and incur the cost of the amended service plus an administration fee of AED 250. No requested change can be guaranteed.",
      "If any party member cannot travel due to death, injury, serious illness (self, close relative, or friend), redundancy, or jury service, it may be possible to transfer the booking to another suitable person or to a similar date/tour, subject to written notice confirmed by OceanAir.",
      "OceanAir does not pay fees charged by your bank for processing credited amounts. Once hotel reservations are confirmed, OceanAir may substitute hotels with others of a similar category. Hotels may close facilities for operational reasons without prior notice.",
    ],
    contentAr: [
      "تتم معالجة مبالغ الاسترداد خلال 30 يوم عمل وتودع في حساب البطاقة المستخدمة. لا تتحمل الشركة أي رسوم إضافية قد تفرضها البنوك لمعالجة المبالغ المودعة.",
      "لا يتم استرداد أي مبالغ لتذاكر الطيران الصادرة أو الخدمات المستخدمة جزئياً. وأي تعديل بعد التأكيد يستوجب رسوماً إدارية قدرها 250 درهماً إماراتياً بالإضافة لفروق الأسعار.",
      "في حال تعذر سفر أحد أفراد المجموعة لظروف قاهرة ومثبتة رسمياً (مثل الوفاة أو الإصابة البليغة)، يمكن تحويل الحجز لشخص آخر مناسب أو نقله لموعد بديل بعد موافقة الشركة الخطية.",
      "تحتفظ الشركة بحق استبدال الفنادق المحجوزة بفنادق أخرى من نفس الفئة والدرجة عند الضرورة التشغيلية.",
    ],
  },
];

export default function TermsPage() {
  const { language } = useLanguage();
  const [activeSectionId, setActiveSectionId] = useState<string>("general");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;

      for (let i = TERMS_SECTIONS.length - 1; i >= 0; i--) {
        const sec = TERMS_SECTIONS[i];
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
              1. HERO SECTION (Pixel-Perfect from footerterms.png)
              ============================================================== */}
          <div className="space-y-4 max-w-3xl pt-4 border-b border-gray-200/70 pb-10">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] text-[#0097CA] block">
              {language === "ar" ? "الشروط والأحكام" : "TERMS & CONDITIONS"}
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-bold text-black tracking-tight leading-[1.08]">
              {language === "ar"
                ? "البنود والشروط، بلغة واضحة وبسيطة."
                : "The fine print, in plain language."}
            </h1>

            <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed max-w-2xl">
              {language === "ar"
                ? "كيف تعمل الحجوزات، والمدفوعات، والإلغاء، والاسترداد عند الحجز مع جوّ قطر للسياحة والسفر."
                : "How bookings, payments, cancellations, and refunds work when you book with OceanAir Travels & Tourism LLC."}
            </p>

            <div className="pt-1 text-[11px] text-gray-400 font-medium">
              {language === "ar"
                ? "آخر تحديث · 22 فبراير 2026"
                : "Last updated · Feb 22, 2026"}
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
                {TERMS_SECTIONS.map((sec) => {
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

            {/* RIGHT COLUMN: 14 MAIN SECTIONS */}
            <div className="space-y-12 max-w-3xl">
              {TERMS_SECTIONS.map((sec) => {
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
