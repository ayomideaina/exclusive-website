"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Eye, Trash2 } from "lucide-react";
import AppButton from "./AppButton";
import Toggle from "./Toggle";

export default function AppCard({
  variant = "bestSelling",
  id,
  image,
  title,
  price,
  oldPrice,
  rating = 0,
  reviewCount = 0,
  discount,
  isNew = false,
  colors = [],
  isWishlisted = false,
  onAddToWishlist,
  onQuickView,
  onRemove,
  onAddToCart,
  icon: Icon,
  label,
  isActive = false,
  onClick,
}) {
  if (variant === "category") {
    return (
      <button
        onClick={onClick}
        className={[
          "flex flex-col items-center justify-center gap-3",
          "w-full aspect-square rounded border transition-colors",
          isActive
            ? "bg-primary text-white border-primary"
            : "bg-white text-text-primary border-border hover:border-primary hover:text-primary",
        ].join(" ")}
      >
        {Icon && <Icon className="w-8 h-8" />}
        <span className="text-sm">{label}</span>
      </button>
    );
  }

  const showCartBarAlways = variant === "wishlist";
  const showCartBarOnHover = variant === "flashSale";
  const detailHref = id ? `/products/${id}` : undefined;

  return (
    <div className="group relative flex flex-col gap-3 rounded p-4 min-w-0">
      <div className="relative bg-white rounded overflow-hidden">
        {variant === "flashSale" && discount && (
          <span className="absolute top-2 left-2 z-10 bg-primary text-white text-xs px-2 py-1 rounded">
            {discount}
          </span>
        )}
        {variant === "wishlist" && discount && (
          <span className="absolute top-2 left-2 z-10 bg-primary text-white text-xs px-2 py-1 rounded">
            {discount}
          </span>
        )}
        {variant === "explore" && isNew && (
          <span className="absolute top-2 left-2 z-10 bg-secondary text-black text-xs px-2 py-1 rounded">
            NEW
          </span>
        )}

        <div className="absolute top-2 right-2 z-10 flex flex-col gap-2">
          {variant === "wishlist" ? (
            <button
              onClick={onRemove}
              aria-label="Remove from wishlist"
              className="w-7 h-7 flex items-center justify-center rounded-full bg-white shadow-card"
            >
              <Trash2 className="w-4 h-4 text-text-primary" />
            </button>
          ) : (
            <>
              <Toggle
                initialOn={isWishlisted}
                render={(on, toggle) => (
                  <button
                    onClick={() => {
                      toggle();
                      onAddToWishlist?.();
                    }}
                    aria-label="Add to wishlist"
                    className="w-7 h-7 flex items-center justify-center rounded-full bg-white shadow-card"
                  >
                    <Heart className={`w-4 h-4 ${on ? "fill-primary text-primary" : "text-text-primary"}`} />
                  </button>
                )}
              />
              <button
                onClick={onQuickView}
                aria-label="Quick view"
                className="w-7 h-7 flex items-center justify-center rounded-full bg-white shadow-card"
              >
                <Eye className="w-4 h-4 text-text-primary" />
              </button>
            </>
          )}
        </div>

        {detailHref ? (
          <Link href={detailHref}>
            <Image
              src={image}
              alt={title}
              className="w-full h-40 object-contain"
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            />
          </Link>
        ) : (
          <Image
            src={image}
            alt={title}
            className="w-full h-40 object-contain"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          />
        )}

        {(showCartBarOnHover || showCartBarAlways) && (
          <AppButton
            variant="dark"
            fullWidth
            onClick={onAddToCart}
            className={`absolute bottom-0 left-0 rounded-none transition-opacity ${
              showCartBarAlways ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
          >
            Add To Cart
          </AppButton>
        )}
      </div>

      <div className="flex flex-col gap-1">
        {detailHref ? (
          <Link href={detailHref} className="text-sm text-text-primary hover:text-primary">
            {title}
          </Link>
        ) : (
          <h3 className="text-sm text-text-primary">{title}</h3>
        )}

        <div className="flex items-center gap-2">
          <span className="text-primary font-medium">${price}</span>
          {oldPrice && (
            <span className="text-text-muted line-through text-sm">${oldPrice}</span>
          )}
        </div>

        {variant === "explore" && colors.length > 0 ? (
          <div className="flex gap-1">
            {colors.map((hex) => (
              <span
                key={hex}
                className="w-4 h-4 rounded-full border border-border-light"
                style={{ backgroundColor: hex }}
              />
            ))}
          </div>
        ) : (
          variant !== "wishlist" && (
            <div className="flex items-center gap-1 text-sm">
              <span className="text-rating">
                {"★".repeat(Math.round(rating))}
                {"☆".repeat(5 - Math.round(rating))}
              </span>
              <span className="text-text-muted">({reviewCount})</span>
            </div>
          )
        )}
      </div>
    </div>
  );
}
