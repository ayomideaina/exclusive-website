import Image from "next/image";
import SideImage from "@/assets/images/SideImage.jpg";

export default function AuthLayout({ children }) {
  return (
    <div className="container-app grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-12 md:py-20">
      <div className="hidden lg:block rounded overflow-hidden max-h-150">
        <Image
          src={SideImage}
          alt="Shopping cart illustration"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full max-w-sm mx-auto">{children}</div>
    </div>
  );
}
