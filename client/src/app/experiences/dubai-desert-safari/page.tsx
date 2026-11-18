import { ExperienceCollectionPage } from "@/components/ExperienceCollectionPage";

export const metadata = {
  title: "Dubai Desert Safari — Dune Bashing, Camel Rides & Luxury Camps | GottQatar",
  description:
    "Curated Dubai desert safaris since 2010. Experience red dune quad biking, camel caravans, stargazing, and 5-star Bedouin dining at Al Khayma Camp.",
};

export default function DubaiDesertSafariPage() {
  return (
    <ExperienceCollectionPage
      destinationName="Dubai"
      destinationNameAr="دبي"
      collectionTitle="Dubai Desert Safari."
      collectionTitleAr="سفاري صحراء دبي."
      collectionSubtitle="Dune bashing, camel rides and desert camps across Dubai."
      collectionSubtitleAr="قيادة الكثبان الرملية وركوب الجمال والمخيمات الصحراوية التراثية في دبي."
      heroImage="/brand/hero/home-hero.jpg"
      toursCount={10}
      averageRating={4.8}
      lowestPrice={31.62}
    />
  );
}
