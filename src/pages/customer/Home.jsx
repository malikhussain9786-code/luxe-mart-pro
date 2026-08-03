import HeroBanner from "../../components/home/HeroBanner.jsx";
import CategoryGrid from "../../components/home/CategoryGrid.jsx";
import StatsSection from "../../components/home/StatsSection.jsx";
import FeaturedProducts from "../../components/home/FeaturedProducts.jsx";
import PromoBanner from "../../components/home/PromoBanner.jsx";
import BrandStrip from "../../components/home/BrandStrip.jsx";
import ReviewsSection from "../../components/home/ReviewsSection.jsx";
import Newsletter from "../../components/home/Newsletter.jsx";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <CategoryGrid />
      <StatsSection />
      <FeaturedProducts />
      <PromoBanner />
      <BrandStrip />
      <ReviewsSection />
      <Newsletter />
    </div>
  );
}
