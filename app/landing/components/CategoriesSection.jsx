"use client";

import { useState } from "react";
import { Smartphone, Monitor, Watch, Camera, Headphones, Gamepad2 } from "lucide-react";
import SectionHeader from "../../components/layout/SectionHeader";
import SectionNavArrows from "../../components/SelectionNavArrows";
import AppCard from "../../components/AppCard";

const iconMap = { Smartphone, Monitor, Watch, Camera, Headphones, Gamepad2 };

export default function CategoriesSection({ categories }) {
  const [activeLabel, setActiveLabel] = useState("Camera");

  return (
    <section className="container-app section">
      <SectionHeader eyebrow="Categories" title="Browse By Category" action={<SectionNavArrows />} />
      <div className="category-grid">
        {categories.map((category) => (
          <AppCard
            key={category.label}
            variant="category"
            label={category.label}
            icon={iconMap[category.icon]}
            isActive={activeLabel === category.label}
            onClick={() => setActiveLabel(category.label)}
          />
        ))}
      </div>
    </section>
  );
}
