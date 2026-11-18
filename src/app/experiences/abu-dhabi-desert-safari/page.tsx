import { ExperienceCollectionPage } from "@/components/ExperienceCollectionPage";

export const metadata = {
  title: "Abu Dhabi Desert Safari — Dune Bashing, Sandboarding & BBQ | GottQatar",
  description:
    "Curated Abu Dhabi desert experiences. Thrilling 4x4 dune drives, camel riding, sandboarding, and authentic Bedouin barbecue dinners under the stars.",
};

export default function AbuDhabiDesertSafariPage() {
  return (
    <ExperienceCollectionPage
      destinationName="Abu Dhabi"
      destinationNameAr="أبوظبي"
      collectionTitle="Abu Dhabi Desert Safari."
      collectionTitleAr="سفاري صحراء أبوظبي."
      collectionSubtitle="Golden dune driving, camel rides and Bedouin desert hospitality."
      collectionSubtitleAr="قيادة الكثبان الرملية الذهبية، وركوب الجمال، وكرم الضيافة البدوية في قلب الصحراء."
      heroImage="/images/exp_abu_dhabi_safari.jpg"
      toursCount={6}
      averageRating={4.9}
      lowestPrice={44.89}
    />
  );
}
