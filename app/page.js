import HeroSection from "./landing/components/HeroSection";
import CategoriesSection from "./landing/components/CategoriesSection";
import FlashSalesSection from "./landing/components/FlashSalesSection";
import BestSellingSection from "./landing/components/BestSellingSection";
import MusicBanner from "./landing/components/MusicBanner";
import ExploreProductsSection from "./landing/components/ExploreProductsSection";
import NewArrivalSection from "./landing/components/NewArrivalSection";
import FeatureSection from "./landing/components/FeatureSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FlashSalesSection />
      <CategoriesSection />
      <BestSellingSection />
      <MusicBanner />
      <ExploreProductsSection />
      <NewArrivalSection />
      <FeatureSection />
    </>
  );
}
