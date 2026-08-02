"use client";

import Link from "next/link";
import AppButton from "./components/AppButton";

export default function Error({ error, reset }) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center gap-4">
      <h2 className="text-2xl font-semibold text-text-primary">
        Something went wrong.
      </h2>
      <p className="text-sm text-text-secondary">
        {error?.message || "An unexpected error occurred while loading this page."}
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
