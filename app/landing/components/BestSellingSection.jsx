import SectionHeader from "../../components/layout/SectionHeader";
import AppCard from "../../components/AppCard";
import AppButton from "../../components/AppButton";
import { bestSellingProducts } from "@/data/mockData";
import Link from "next/link";

export default function BestSellingSection() {
  return (
    <section className="container-app section">
      <SectionHeader
        eyebrow="This Month"
        title="Best Selling Products"
        action={
          <Link href="/shop">
            <AppButton variant="primary">View All</AppButton>
          </Link>
        }
      />
      <div className="product-grid">
        {bestSellingProducts.map((product) => (
          <AppCard key={product.id} variant="bestSelling" {...product} />
        ))}
      </div>
    </section>
  );
}
