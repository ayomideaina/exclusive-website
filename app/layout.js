import { Poppins } from "next/font/google";
import "./globals.css";
// import AppHeader from "./components/layout/AppHeader";
import AppFooter from "./components/layout/AppFooter";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "Exclusive Website",
  description: "An e-commerce website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="flex min-h-screen flex-col font-[var(--font-poppins)] antialiased">
        {/* <Header /> */}

        <main className="flex-1">{children}</main>

        <AppFooter />
      </body>
    </html>
  );
}
