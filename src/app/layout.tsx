import type { Metadata } from "next";
import { Cinzel, Raleway, Work_Sans, Shadows_Into_Light, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "600", "700", "900"], variable: "--font-cinzel" });
const raleway = Raleway({ subsets: ["latin"], style: ["normal", "italic"], weight: ["300", "400", "500", "600", "700"], variable: "--font-raleway" });
const workSans = Work_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-worksans" });
const shadowsIntoLight = Shadows_Into_Light({ subsets: ["latin"], weight: "400", variable: "--font-shadows" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-inter" });

const SITE_URL = "https://www.gkuzeyspor.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Gerçek Kuzey Spor Kulübü | Resmi Web Sitesi",
  description:
    "Gerçek Kuzey Spor Kulübü; disiplin, takım ruhu ve fair play anlayışıyla sporcuların gelişimini destekleyen amatör spor kulübüdür.",
  keywords: ["Gerçek Kuzey", "spor kulübü", "amatör spor", "futbol", "altyapı"],
  openGraph: {
    title: "Gerçek Kuzey Spor Kulübü",
    description:
      "Disiplin, takım ruhu ve fair play anlayışıyla sporun birleştirici gücünü yaşatıyoruz.",
    url: SITE_URL,
    locale: "tr_TR",
    type: "website",
  },
};

const sportsClubJsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsClub",
  name: "Gerçek Kuzey Spor Kulübü",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    "Gerçek Kuzey Spor Kulübü; disiplin, takım ruhu ve fair play anlayışıyla sporcuların gelişimini destekleyen amatör spor kulübüdür.",
  sport: "Futbol",
  foundingDate: "2011",
  telephone: "+905054024610",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Uğur Mumcu Cd. No:2, 4. Levent",
    addressLocality: "Beşiktaş",
    postalCode: "34330",
    addressRegion: "İstanbul",
    addressCountry: "TR",
  },
  sameAs: ["https://www.instagram.com/gercekkuzeysporkulubu/"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="tr"
      className={`${cinzel.variable} ${raleway.variable} ${workSans.variable} ${shadowsIntoLight.variable} ${inter.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(sportsClubJsonLd) }}
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
