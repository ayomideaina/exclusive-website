import HeroSection from "./landing/components/HeroSection";
import CategoriesSection from "./landing/components/CategoriesSection";
import FlashSalesSection from "./landing/components/FlashSalesSection";
import BestSellingSection from "./landing/components/BestSellingSection";
import MusicBanner from "./landing/components/MusicBanner";
import ExploreProductsSection from "./landing/components/ExploreProductsSection";
import NewArrivalSection from "./landing/components/NewArrivalSection";
import FeatureSection from "./landing/components/FeatureSection";
import { getProducts, categories } from "@/data/mockData";

export const revalidate = 60;

export default async function Home() {
  const products = await getProducts();

  const flashSaleProducts = products.filter((p) => p.category === "flashSale");
  const bestSellingProducts = products.filter((p) => p.category === "bestSelling");
  const exploreProducts = products.filter((p) => p.category === "explore");

  return (
    <>
      <HeroSection />
      <FlashSalesSection products={flashSaleProducts} />
      <CategoriesSection categories={categories} />
      <BestSellingSection products={bestSellingProducts} />
      <MusicBanner />
      <ExploreProductsSection products={exploreProducts} />
      <NewArrivalSection />
      <FeatureSection />
    </>
  );
}
