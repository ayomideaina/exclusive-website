"use client";

import { Send } from "lucide-react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGooglePlay, FaApple } from "react-icons/fa";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import qrCodeImg from "@/assets/images/qrcode.jpg";

const accountLinks = [
  { label: "My Account", href: "/account" },
  { label: "Login / Register", href: "/login" },
  { label: "Cart", href: "/cart" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Shop", href: "/shop" },
];

const quickLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms Of Use", href: "/terms-of-use" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white ">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-10 px-12 py-16">
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Exclusive</h3>
          <p className="text-sm">Subscribe</p>
          <p className="text-sm text-gray-400">Get 10% off your first order</p>
          <div className="flex items-center border border-white rounded px-3 py-2 w-full max-w-55">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="bg-transparent text-sm outline-none flex-1 placeholder:text-gray-400"
            />
            <button aria-label="Subscribe">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Support</h3>
          <p className="text-sm text-gray-400">111 Bijoy sarani, Dhaka, DH 1515, Bangladesh</p>
          <p className="text-sm text-gray-400">exclusive@gmail.com</p>
          <p className="text-sm text-gray-400">+88015-88888-9999</p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Account</h3>
          {accountLinks.map(({ label, href }) => (
            <Link key={label} href={href} className="text-sm text-gray-400 hover:text-white">
              {label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Quick Link</h3>
          {quickLinks.map(({ label, href }) => (
            <Link key={label} href={href} className="text-sm text-gray-400 hover:text-white">
              {label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Download App</h3>
          <p className="text-xs text-gray-400">Save $3 with App New User Only</p>
          <div className="flex gap-3">
            <div className="w-20 h-20 bg-white p-1 rounded shrink-0">
              <Image
                src={qrCodeImg}
                alt="QR code to download the app"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col gap-2">
              <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-gray-600 rounded px-3 py-1.5 hover:border-white transition-colors">
                <FaGooglePlay className="w-4 h-4" />
                <span className="flex flex-col leading-tight">
                  <span className="text-[9px] text-gray-400">GET IT ON</span>
                  <span className="text-xs font-medium">Google Play</span>
                </span>
              </a>
              <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-gray-600 rounded px-3 py-1.5 hover:border-white transition-colors">
                <FaApple className="w-4 h-4" />
                <span className="flex flex-col leading-tight">
                  <span className="text-[9px] text-gray-400">Download on the</span>
                  <span className="text-xs font-medium">App Store</span>
                </span>
              </a>
            </div>
          </div>
          <div className="flex gap-4 pt-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter className="w-4 h-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 text-center text-sm text-gray-500 py-4">
        © Copyright Rimel {currentYear}. All right reserved
      </div>
    </footer>
  );
}
