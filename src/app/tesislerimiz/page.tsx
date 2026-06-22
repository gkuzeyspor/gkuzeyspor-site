import Link from "next/link";
import PhotoLightbox from "@/components/PhotoLightbox";
import SmallCaps from "@/components/SmallCaps";

const photos = [
  { src: "/tesislerimiz/cilekli-stad%C4%B1.jpg", alt: "Beşiktaş Çilekli Spor Tesisleri", width: 619, height: 413 },
  { src: "/tesislerimiz/1024px_cileklistadium_3.jpg", alt: "Beşiktaş Çilekli Spor Tesisleri saha görünümü", width: 1024, height: 674 },
  { src: "/tesislerimiz/601-33.jpg", alt: "Beşiktaş Çilekli Spor Tesisleri tribün", width: 1920, height: 1024 },
  { src: "/tesislerimiz/IMG-20260331-WA0007.jpg", alt: "Gerçek Kuzey Spor Kulübü tesis fotoğrafı", width: 2000, height: 1500 },
  { src: "/tesislerimiz/IMG-20260331-WA0008.jpg", alt: "Gerçek Kuzey Spor Kulübü tesis fotoğrafı", width: 2000, height: 1500 },
  { src: "/tesislerimiz/IMG-20260331-WA0011.jpg", alt: "Gerçek Kuzey Spor Kulübü tesis fotoğrafı", width: 2000, height: 1500 },
];

export default function TesislerimizPage() {
  return (
    <main className="min-h-screen bg-navy-dark pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6 md:px-14">
        <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-sky-light mb-3 text-center">
          Kulüp
        </p>
        <h1 className="font-cinzel font-bold text-white text-[28px] md:text-[42px] leading-tight tracking-[0.04em] mb-6 text-center">
          <SmallCaps>Tesislerimiz</SmallCaps>
        </h1>
        <div className="w-14 h-0.5 bg-gradient-to-r from-sky-light to-transparent mx-auto mb-12" />

        <PhotoLightbox photos={photos} />

        <div className="text-center mt-14">
          <Link
            href="/"
            className="inline-block px-10 py-3.5 border border-white/30 text-white/80 font-bold text-[11px] tracking-[0.28em] uppercase hover:border-sky-light hover:text-sky-light transition-colors duration-200"
          >
            Anasayfaya Dön
          </Link>
        </div>
      </div>
    </main>
  );
}
