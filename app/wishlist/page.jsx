"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import AppCard from "../components/AppCard";
import AppButton from "../components/AppButton";
import { removeFromWishlist, addToWishlist } from "@/store/wishlistSlice";
import { addToCart } from "@/store/cartSlice";
import { exploreProducts } from "@/data/mockData";
import withAuth from "@/hocs/withAuth";

function Wishlist() {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
  };

  const handleAddToCart = (item) => {
    dispatch(
      addToCart({
        id: item.id,
        title: item.title,
        image: item.image,
        price: item.price,
      })
    );
  };

  const handleMoveAllToBag = () => {
    wishlistItems.forEach((item) => handleAddToCart(item));
  };

  const handleAddExploreToCart = (product) => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
      })
    );
  };

  const handleAddExploreToWishlist = (product) => {
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
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-lg font-medium">Wishlist ({wishlistItems.length})</h1>
        {wishlistItems.length > 0 && (
          <AppButton variant="outline" size="sm" onClick={handleMoveAllToBag}>
            Move All To Bag
          </AppButton>
        )}
      </div>

      {wishlistItems.length === 0 ? (
        <p className="text-text-muted mb-16">Your wishlist is empty.</p>
      ) : (
        <div className="product-grid mb-16">
          {wishlistItems.map((item) => (
            <AppCard
              key={item.id}
              variant="wishlist"
              {...item}
              onRemove={() => handleRemove(item.id)}
              onAddToCart={() => handleAddToCart(item)}
            />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <span className="w-3 h-8 bg-primary rounded-sm" />
          <h2 className="text-lg font-medium">Just For You</h2>
        </div>
        <Link href="/shop">
          <AppButton variant="outline" size="sm">
            See All
          </AppButton>
        </Link>
      </div>

      <div className="product-grid">
        {exploreProducts.slice(0, 4).map((product) => (
          <AppCard
            key={product.id}
            variant="flashSale"
            {...product}
            isWishlisted={wishlistItems.some((item) => item.id === product.id)}
            onAddToCart={() => handleAddExploreToCart(product)}
            onAddToWishlist={() => handleAddExploreToWishlist(product)}
          />
        ))}
      </div>
    </div>
  );
}

export default withAuth(Wishlist);
