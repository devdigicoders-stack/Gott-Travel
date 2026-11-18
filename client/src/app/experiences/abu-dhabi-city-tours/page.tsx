import { ExperienceCollectionPage } from "@/components/ExperienceCollectionPage";

export const metadata = {
  title: "Abu Dhabi City Tours — Sheikh Zayed Mosque & Louvre Abu Dhabi | GottQatar",
  description:
    "Curated cultural and sightseeing tours of Abu Dhabi. Discover the majestic Sheikh Zayed Grand Mosque, Louvre Abu Dhabi, and presidential palace Qasr Al Watan.",
};

export default function AbuDhabiCityToursPage() {
  return (
    <ExperienceCollectionPage
      destinationName="Abu Dhabi"
      destinationNameAr="أبوظبي"
      collectionTitle="Abu Dhabi City Tours."
      collectionTitleAr="جولات مدينة أبوظبي."
      collectionSubtitle="Sheikh Zayed Grand Mosque, Louvre Abu Dhabi and cultural palaces."
      collectionSubtitleAr="جامع الشيخ زايد الكبير المهيب، ومتحف اللوفر أبوظبي، والقصور الثقافية والتراثية."
      heroImage="/images/dest_abu_dhabi.jpg"
      toursCount={8}
      averageRating={4.8}
      lowestPrice={22.72}
    />
  );
}
