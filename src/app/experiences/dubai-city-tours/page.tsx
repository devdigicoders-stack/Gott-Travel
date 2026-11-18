import { ExperienceCollectionPage } from "@/components/ExperienceCollectionPage";

export const metadata = {
  title: "Dubai City Tours — Burj Khalifa, Creek Souks & Blue Mosque | GottQatar",
  description:
    "Curated Dubai sightseeing tours. Explore old Al Fahidi heritage quarters, modern skyline icons, Dubai Frame, and traditional abra rides across the creek.",
};

export default function DubaiCityToursPage() {
  return (
    <ExperienceCollectionPage
      destinationName="Dubai"
      destinationNameAr="دبي"
      collectionTitle="Dubai City Tours."
      collectionTitleAr="جولات مدينة دبي."
      collectionSubtitle="Modern skyline marvels, historic creek abra rides and vibrant souks."
      collectionSubtitleAr="روائع العمارة الحديثة، وجولات العبرة التراثية في خور دبي، وأسواق الذهب والتوابل العريقة."
      heroImage="/images/exp_alfahidi_walking.jpg"
      toursCount={8}
      averageRating={4.8}
      lowestPrice={18.02}
    />
  );
}
