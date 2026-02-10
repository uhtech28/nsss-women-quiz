import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "International Day of Women and Girls in Science Quiz| NSS BIT Jaipur",
  description: "QR based quiz platform for International Day of Women and Girls in Science",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} relative`}>

        {/* 🏵️ NSS LOGO (GLOBAL – ALL SCREENS) */}
        <div className="fixed top-2 right-1 z-50">
          <img
            src="/nss.jpg"
            alt="NSS Logo"
            className="
              h-15 w-auto
              opacity-100
              drop-shadow-lg
              transition-opacity
              hover:opacity-100
            "
          />
        </div>

        {children}
      </body>
    </html>
  );
}
