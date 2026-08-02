import Link from "next/link";
import AppButton from "./components/AppButton";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <h1 className="mb-2 text-6xl font-bold text-primary">404</h1>
      <h2 className="mb-4 text-2xl font-semibold text-text-primary">Page not found</h2>
      <p className="mb-8 text-sm text-text-secondary">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/">
        <AppButton variant="outline">Back to Home</AppButton>
      </Link>
    </div>
  );
}
