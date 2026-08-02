"use client";

import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";
import { removeFromCart, updateQuantity } from "@/store/cartSlice";
import withAuth from "@/hocs/withAuth";

function Cart() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleUpdateQuantity = (id, quantity) => {
    const qty = Math.max(1, Number(quantity) || 1);
    dispatch(updateQuantity({ id, quantity: qty }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center gap-2 text-sm text-text-muted mb-10">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <span>/</span>
        <span className="text-text-primary">Cart</span>
      </div>

      <div className="border border-border-light rounded-sm mb-8 shadow-sm">
        <div className="hidden md:grid grid-cols-4 px-10 py-6 text-sm text-text-secondary">
          <span>Product</span>
          <span className="text-center">Price</span>
          <span className="text-center">Quantity</span>
          <span className="text-right">Subtotal</span>
        </div>

        {items.length === 0 ? (
          <div className="px-10 py-16 text-center text-text-muted border-t border-border-light">
            Your cart is empty.
          </div>
        ) : (
          items.map((item, index) => (
            <div
              key={item.id}
              className={`grid grid-cols-2 md:grid-cols-4 items-center gap-4 px-10 py-8 shadow-sm ${
                index === 0 ? "border-t border-border-light" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleRemove(item.id)}
                  aria-label={`Remove ${item.title}`}
                  className="w-5 h-5 flex items-center justify-center rounded-full bg-primary text-white shrink-0"
                >
                  <X className="w-3 h-3" />
                </button>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={56}
                  height={56}
                  className="w-14 h-14 object-contain shrink-0"
                />
                <span className="text-sm text-text-primary">{item.title}</span>
              </div>

              <span className="hidden md:block text-center text-sm text-primary">
                ${item.price}
              </span>

              <div className="flex justify-start md:justify-center">
                <QuantityStepper
                  value={item.quantity}
                  onChange={(qty) => handleUpdateQuantity(item.id, qty)}
                />
              </div>

              <span className="text-right text-sm text-primary">
                ${item.price * item.quantity}
              </span>
            </div>
          ))
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-16">
        <Link
          href="/"
          className="px-8 py-3 border border-border rounded-sm text-sm font-medium text-text-primary hover:border-primary hover:text-primary transition-colors"
        >
          Return To Shop
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row justify-between gap-10 items-start">
        <div className="flex gap-4 w-full max-w-md">
          <input
            placeholder="Coupon Code"
            className="flex-1 border border-border rounded-sm px-4 py-3 text-sm outline-none focus:border-primary"
          />
          <button className="px-8 py-3 bg-primary text-white rounded-sm text-sm font-medium hover:bg-primary-dark transition-colors shrink-0">
            Apply Coupon
          </button>
        </div>

        <div className="w-full max-w-md border border-border-light rounded-sm p-8">
          <h2 className="text-xl font-semibold mb-6">Cart Total</h2>

          <div className="flex justify-between py-4 border-b border-border-light text-sm">
            <span className="text-text-secondary">Subtotal:</span>
            <span className="text-text-primary">${subtotal}</span>
          </div>

          <div className="flex justify-between py-4 border-b border-border-light text-sm">
            <span className="text-text-secondary">Shipping:</span>
            <span className="text-text-primary">
              {shipping === 0 ? "Free" : `$${shipping}`}
            </span>
          </div>

          <div className="flex justify-between py-4 text-sm font-medium">
            <span>Total:</span>
            <span>${total}</span>
          </div>

          <button className="w-full mt-2 py-3 bg-primary text-white rounded-sm text-sm font-medium hover:bg-primary-dark transition-colors">
            Procees to checkout
          </button>
        </div>
      </div>
    </div>
  );
}

function QuantityStepper({ value, onChange }) {
  return (
    <div className="flex items-center border border-border rounded-sm w-24">
      <input
        type="text"
        value={String(value).padStart(2, "0")}
        onChange={(e) => onChange(e.target.value)}
        className="w-full text-center py-2 text-sm outline-none bg-transparent"
      />
      <div className="flex flex-col border-l border-border">
        <button
          onClick={() => onChange(value + 1)}
          aria-label="Increase quantity"
          className="px-2 text-xs leading-none py-1 hover:text-primary"
        >
          ▲
        </button>
        <button
          onClick={() => onChange(Math.max(1, value - 1))}
          aria-label="Decrease quantity"
          className="px-2 text-xs leading-none py-1 hover:text-primary border-t border-border"
        >
          ▼
        </button>
      </div>
    </div>
  );
}

export default withAuth(Cart);
