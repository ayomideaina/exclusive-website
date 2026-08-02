"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { Heart, Truck, RotateCcw } from "lucide-react";
import AppButton from "./AppButton";
import AppCard from "./AppCard";
import { addToCart } from "@/store/cartSlice";
import { addToWishlist } from "@/store/wishlistSlice";

export default function ProductDetailClient({ product, relatedProducts }) {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0]);
  const [activeImage, setActiveImage] = useState(0);

  const gallery = product.images?.length > 0 ? product.images : [product.image];

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        quantity,
      })
    );
  };

  const handleAddToWishlist = () => {
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

  const handleAddRelatedToCart = (related) => {
    dispatch(
      addToCart({
        id: related.id,
        title: related.title,
        image: related.image,
        price: related.price,
      })
    );
  };

  const handleAddRelatedToWishlist = (related) => {
    dispatch(
      addToWishlist({
        id: related.id,
        title: related.title,
        image: related.image,
        price: related.price,
        oldPrice: related.oldPrice,
        discount: related.discount,
      })
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-text-muted mb-10">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <span>/</span>
        <span className="hover:text-primary">{product.productCategory || "Shop"}</span>
        <span>/</span>
        <span className="text-text-primary">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[100px_1fr_1fr] gap-6 mb-16">
        <div className="flex md:flex-col gap-4 order-2 md:order-1">
          {gallery.map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`bg-background-light rounded p-2 border ${
                activeImage === index ? "border-primary" : "border-transparent"
              }`}
            >
              <Image
                src={img}
                alt={`${product.title} ${index + 1}`}
                width={100}
                height={80}
                className="w-full h-20 object-contain"
              />
            </button>
          ))}
        </div>

        <div className="bg-background-light rounded flex items-center justify-center p-10 order-1 md:order-2">
          <Image
            src={gallery[activeImage]}
            alt={product.title}
            width={400}
            height={384}
            className="max-h-96 object-contain"
          />
        </div>

        <div className="order-3">
          <h1 className="text-2xl font-semibold mb-2">{product.title}</h1>

          <div className="flex items-center gap-3 mb-4 text-sm">
            <span className="text-rating">
              {"★".repeat(Math.round(product.rating || 0))}
              {"☆".repeat(5 - Math.round(product.rating || 0))}
            </span>
            <span className="text-text-muted">({product.reviewCount} Reviews)</span>
            <span className="text-text-muted">|</span>
            <span className="text-success">In Stock</span>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-xl font-medium">${product.price}</span>
            {product.oldPrice && (
              <span className="text-text-muted line-through text-sm">${product.oldPrice}</span>
            )}
          </div>

          <p className="text-sm text-text-secondary border-b border-border-light pb-6 mb-6">
            {product.description}
          </p>

          {product.colors?.length > 0 && (
            <div className="mb-6">
              <span className="text-sm text-text-secondary block mb-2">Colours:</span>
              <div className="flex gap-2">
                {product.colors.map((hex) => (
                  <button
                    key={hex}
                    onClick={() => setSelectedColor(hex)}
                    aria-label={`Select color ${hex}`}
                    className={`w-6 h-6 rounded-full border-2 ${
                      selectedColor === hex ? "border-primary" : "border-transparent"
                    }`}
                    style={{ backgroundColor: hex }}
                  />
                ))}
              </div>
            </div>
          )}

          {product.sizes?.length > 0 && (
            <div className="mb-8">
              <span className="text-sm text-text-secondary block mb-2">Size:</span>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 text-sm rounded border ${
                      selectedSize === size
                        ? "bg-primary text-white border-primary"
                        : "border-border text-text-primary hover:border-primary"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-border rounded">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="px-4 py-2 hover:text-primary"
              >
                −
              </button>
              <span className="px-4 text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="px-4 py-2 hover:text-primary bg-primary text-white rounded-r"
              >
                +
              </button>
            </div>

            <AppButton variant="primary" size="md" onClick={handleAddToCart}>
              Buy Now
            </AppButton>

            <button
              onClick={handleAddToWishlist}
              aria-label="Add to wishlist"
              className="w-11 h-11 flex items-center justify-center rounded border border-border hover:border-primary shrink-0"
            >
              <Heart
                className={`w-5 h-5 ${
                  isWishlisted ? "fill-primary text-primary" : "text-text-primary"
                }`}
              />
            </button>
          </div>

          <div className="border border-border-light rounded">
            <div className="flex items-start gap-4 p-5 border-b border-border-light">
              <Truck className="w-6 h-6 shrink-0 mt-1" />
              <div>
                <p className="text-sm font-medium">Free Delivery</p>
                <p className="text-xs text-text-muted underline">
                  Enter your postal code for Delivery Availability
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5">
              <RotateCcw className="w-6 h-6 shrink-0 mt-1" />
              <div>
                <p className="text-sm font-medium">Return Delivery</p>
                <p className="text-xs text-text-muted">
                  Free 30 Days Delivery Returns. <span className="underline">Details</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div>
          <div className="flex items-center gap-4 mb-8">
            <span className="w-3 h-8 bg-primary rounded-sm" />
            <h2 className="text-lg font-medium">Related Item</h2>
          </div>

          <div className="product-grid">
            {relatedProducts.map((related) => (
              <AppCard
                key={related.id}
                variant="flashSale"
                {...related}
                isWishlisted={wishlistItems.some((item) => item.id === related.id)}
                onAddToCart={() => handleAddRelatedToCart(related)}
                onAddToWishlist={() => handleAddRelatedToWishlist(related)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
