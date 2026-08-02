"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import Button from "../../components/AppButton";
import CountdownTimer from "../../components/CounterTimer";
import speaker from "@/assets/images/speaker.jpg";

export default function MusicBanner() {
  const [endDate] = useState(() => new Date(Date.now() + 5 * 24 * 60 * 60 * 1000));

  return (
    <section className="container-app py-10">
      <div className="relative bg-black rounded overflow-hidden flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-10 gap-8">
        <div className="flex flex-col gap-6 text-white max-w-md">
          <span className="text-secondary text-sm font-medium">Categories</span>
          <h2 className="text-3xl md:text-4xl font-semibold">Enhance Your Music Experience</h2>
          <CountdownTimer targetDate={endDate} variant="circle" />
          <Link href="/shop">
            <Button variant="secondary" className="w-fit">
              Buy Now!
            </Button>
          </Link>
        </div>
        <Image
          src={speaker}
          alt="JBL Boombox speaker"
          className="max-h-64 object-contain"
        />
      </div>
    </section>
  );
}
