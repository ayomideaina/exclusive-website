"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SectionHeader from "../../components/layout/SectionHeader";
import SectionNavArrows from "../../components/SelectionNavArrows";
import CountdownTimer from "../../components/CounterTimer";
import AppCard from "../../components/AppCard";
import AppButton from "../../components/AppButton";
import { flashSaleProducts } from "@/data/mockData";
import { addToCart } from "@/store/cartSlice";
import { addToWishlist } from "@/store/wishlistSlice";

export default function FlashSalesSection() {
  const [saleEndDate] = useState(() => new Date(Date.now() + 3 * 24 * 60 * 60 * 1000));
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
      <SectionHeader
        eyebrow="Today's"
        title="Flash Sales"
        titleAddon={<CountdownTimer targetDate={saleEndDate} />}
        action={<SectionNavArrows />}
      />

      <div className="product-grid">
        {flashSaleProducts.map((product) => (
          <AppCard
            key={product.id}
            variant="flashSale"
            {...product}
            isWishlisted={wishlistItems.some((item) => item.id === product.id)}
            onAddToCart={() => handleAddToCart(product)}
            onAddToWishlist={() => handleAddToWishlist(product)}
          />
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <AppButton variant="primary">View All Products</AppButton>
      </div>
    </section>
  );
}
