import Link from "next/link";
import AppButton from "../../components/AppButton";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <h2 className="mb-4 text-2xl font-semibold">Product not found</h2>
      <p className="mb-8 text-sm text-text-secondary">
        The product you are looking for does not exist or may have been removed.
      </p>
      <Link href="/">
        <AppButton variant="outline">Back to home</AppButton>
      </Link>
    </div>
  );
}
