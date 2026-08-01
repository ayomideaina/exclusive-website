import { Truck, Headset, ShieldCheck } from "lucide-react";

const features = [
  { icon: Truck, title: "FREE AND FAST DELIVERY", description: "Free delivery for all orders over $140" },
  { icon: Headset, title: "24/7 CUSTOMER SERVICE", description: "Friendly 24/7 customer support" },
  { icon: ShieldCheck, title: "MONEY BACK GUARANTEE", description: "We return money within 30 days" },
];

export default function FeaturesSection() {
  return (
    <section className="container-app py-10">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
        {features.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex flex-col items-center text-center gap-3">
            <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center border-8 border-gray-300">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-text-secondary">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
