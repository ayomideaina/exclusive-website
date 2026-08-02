"use client";

import Link from "next/link";
import AppButton from "../components/AppButton";

export default function Error({ error, reset }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20 text-center flex flex-col items-center gap-4">
      <h2 className="text-xl font-semibold text-text-primary">
        Something went wrong loading this product.
      </h2>
      <p className="text-sm text-text-muted max-w-md">
        {error?.message || "An unexpected error occurred. Please try again."}
      </p>
      <div className="flex gap-4 mt-2">
        <button
          onClick={() => reset()}
          className="px-6 py-2.5 bg-primary text-white rounded-sm text-sm font-medium hover:bg-primary-dark transition-colors"
        >
          Try Again
        </button>
        <Link href="/">
          <AppButton variant="outline">Back to Home</AppButton>
        </Link>
      </div>
    </div>
  );
}
