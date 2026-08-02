import Link from "next/link";
import Image from "next/image";
import SectionHeader from "../../components/layout/SectionHeader";
import playstationImg from "@/assets/images/playstation.png";
import hatImg from "@/assets/images/hat.jpg";
import MPspeakersImg from "@/assets/images/MPspeakers.png";

import perfumeImg from "@/assets/images/perfume.png";

export default function NewArrivalSection() {
  return (
    <section className="container-app section">
      <SectionHeader eyebrow="Featured" title="New Arrival" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/products/playstation-5"
          className="relative rounded overflow-hidden bg-black flex items-end p-8 min-h-80"
        >
          <Image
            src={playstationImg}
            alt="PlayStation 5"
            fill
            className="object-cover opacity-80"
          />
          <div className="relative text-white">
            <h3 className="text-xl font-semibold">PlayStation 5</h3>
            <p className="text-sm text-gray-300">
              Black and White version of the PS5 coming out on sale.
            </p>
            <span className="underline text-sm">Shop Now</span>
          </div>
        </Link>

        <div className="grid grid-rows-[2fr_1fr] gap-4">
          <Link
            href="/category/womens"
            className="relative rounded overflow-hidden bg-black flex items-end p-8 min-h-45"
          >
            <Image
              src={hatImg}
              alt="Women's Collections"
              fill
              className="object-cover opacity-80"
            />
            <div className="relative text-white">
              <h3 className="text-xl font-semibold">Women&apos;s Collections</h3>
              <p className="text-sm text-gray-300">
                Featured woman collections that give you another vibe.
              </p>
              <span className="underline text-sm">Shop Now</span>
            </div>
          </Link>

          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/product/speakers"
              className="relative rounded overflow-hidden bg-black flex items-end p-6 min-h-35"
            >
              <Image
                src={MPspeakersImg}
                alt="MPspeakers"
                fill
                className="object-cover opacity-80"
              />
              <div className="relative text-white">
                <h3 className="text-sm font-semibold">Speakers</h3>
                <span className="underline text-xs">Shop Now</span>
              </div>
            </Link>

            <Link
              href="/product/perfume"
              className="relative rounded overflow-hidden bg-black flex items-end p-6 min-h-35"
            >
              <Image
                src={perfumeImg}
                alt="Perfume"
                fill
                className="object-cover opacity-80"
              />
              <div className="relative text-white">
                <h3 className="text-sm font-semibold">Perfume</h3>
                <span className="underline text-xs">Shop Now</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
