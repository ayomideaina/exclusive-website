"use client";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import SectionHeader from "../../components/layout/SectionHeader";
import SectionNavArrows from "../../components/SelectionNavArrows";
import AppCard from "../../components/AppCard";
import AppButton from "../../components/AppButton";
import { addToCart } from "@/store/cartSlice";
import { addToWishlist } from "@/store/wishlistSlice";

export default function ExploreProductsSection({ products }) {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
      })
    );
  };

  const handleAddToWishlist = (product) => {
    dispatch(
      addToWishlist({
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        oldPrice: product.oldPrice,
        discount: product.discount,
      })
    );
  };

  return (
    <section className="container-app section">
      <SectionHeader eyebrow="Our Products" title="Explore Our Products" action={<SectionNavArrows />} />

      <div className="product-grid">
        {products.map((product) => (
          <AppCard
            key={product.id}
            variant="explore"
            {...product}
            isWishlisted={wishlistItems.some((item) => item.id === product.id)}
            onAddToCart={() => handleAddToCart(product)}
            onAddToWishlist={() => handleAddToWishlist(product)}
          />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Link href="/shop">
          <AppButton variant="primary">View All Products</AppButton>
        </Link>
      </div>
    </section>
  );
}
