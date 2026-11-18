import { ExperienceCollectionPage } from "@/components/ExperienceCollectionPage";

export const metadata = {
  title: "Doha Desert Safari — Khor Al Adaid Inland Sea & Camel Rides | GottQatar",
  description:
    "Curated Qatar desert safaris since 2010. Handcrafted excursions to Khor Al Adaid (Inland Sea), roller coaster dune bashing, and luxury Bedouin coastal camps.",
};

export default function DohaDesertSafariPage() {
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
