import Link from "next/link";
import Image from "next/image";
import aboutImg from "@/assets/images/about.png";
import FeatureSection from "../landing/components/FeatureSection";

export default function About() {
  return (
    <div className="container-app section">
        <div className="flex items-center gap-2 text-sm text-text-muted mb-10">
            <Link href="/" className="hover:text-primary">
            Home
            </Link>
            <span>/</span>
            <span className="text-text-primary">About</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="flex flex-col gap-6">
                <h1 className="text-4xl font-semibold">Our Story</h1>
                <p className="text-sm text-text-secondary leading-relaxed">
                    Launched in 2015, Exclusive is South Asia&apos;s premier online
                    shopping marketplace with an active presence in Bangladesh.
                    Supported by a wide range of tailored marketing, data and service
                    solutions, Exclusive has 10,500 sellers and 300 brands and serves 3
                    millions customers across the region.
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">
                    Exclusive has more than 1 million products to offer, growing at a
                    very fast rate. Exclusive offers a diverse assortment in categories
                    ranging from consumer.
                </p>
            </div>

            <div className="rounded overflow-hidden bg-primary/10">
                <Image
                    src={aboutImg}
                    alt="Two customers shopping with Exclusive bags"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
        <FeatureSection/>
    </div>
  );
}
