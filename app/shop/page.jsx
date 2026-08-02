"use client";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import AppCard from "../components/AppCard";
import { products } from "@/data/mockData";
import { addToCart } from "@/store/cartSlice";
import { addToWishlist } from "@/store/wishlistSlice";

export default function Shop() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
      }),
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
      }),
    );
  };

  return (
    <div className="container-app section">
      <div className="flex items-center gap-2 text-sm text-text-muted mb-10">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <span>/</span>
        <span className="text-text-primary">Shop</span>
      </div>
      <h1 className="text-3xl font-semibold mb-10">All Products</h1>

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
    </div>
  );
}
