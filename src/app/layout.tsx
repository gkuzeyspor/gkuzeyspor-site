import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gerçek Kuzey Spor Kulübü | Resmi Web Sitesi",
  description:
    "Gerçek Kuzey Spor Kulübü; disiplin, takım ruhu ve fair play anlayışıyla sporcuların gelişimini destekleyen amatör spor kulübüdür.",
  keywords: ["Gerçek Kuzey", "spor kulübü", "amatör spor", "futbol", "altyapı"],
  openGraph: {
    title: "Gerçek Kuzey Spor Kulübü",
    description:
      "Disiplin, takım ruhu ve fair play anlayışıyla sporun birleştirici gücünü yaşatıyoruz.",
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
