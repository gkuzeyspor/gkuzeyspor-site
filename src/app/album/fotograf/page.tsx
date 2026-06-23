import Link from "next/link";
import PhotoLightbox from "@/components/PhotoLightbox";
import SmallCaps from "@/components/SmallCaps";

export const metadata = {
  title: "Fotoğraf Galerisi | Gerçek Kuzey Spor Kulübü",
  description: "Gerçek Kuzey Spor Kulübü'nden antrenman ve maç fotoğrafları.",
};

const photos = [
  { src: "/album/fotograf/foto-1.jpeg", alt: "Gerçek Kuzey Spor Kulübü", width: 3551, height: 2154 },
  { src: "/album/fotograf/foto-2.jpeg", alt: "Gerçek Kuzey Spor Kulübü", width: 4032, height: 3024 },
  { src: "/album/fotograf/foto-3.jpeg", alt: "Gerçek Kuzey Spor Kulübü", width: 3341, height: 2157 },
  { src: "/album/fotograf/foto-4.jpeg", alt: "Gerçek Kuzey Spor Kulübü", width: 2839, height: 1902 },
  { src: "/album/fotograf/foto-5.jpeg", alt: "Gerçek Kuzey Spor Kulübü", width: 2419, height: 1857 },
  { src: "/album/fotograf/foto-6.jpeg", alt: "Gerçek Kuzey Spor Kulübü", width: 2724, height: 2165 },
  { src: "/album/fotograf/foto-7.jpeg", alt: "Gerçek Kuzey Spor Kulübü", width: 991, height: 738 },
  { src: "/album/fotograf/foto-8.jpeg", alt: "Gerçek Kuzey Spor Kulübü", width: 2048, height: 1536 },
  { src: "/album/fotograf/foto-9.jpeg", alt: "Gerçek Kuzey Spor Kulübü", width: 2048, height: 921 },
  { src: "/album/fotograf/foto-10.jpeg", alt: "Gerçek Kuzey Spor Kulübü", width: 4032, height: 3024 },
  { src: "/album/fotograf/foto-11.jpeg", alt: "Gerçek Kuzey Spor Kulübü", width: 4032, height: 3024 },
  { src: "/album/fotograf/foto-12.jpeg", alt: "Gerçek Kuzey Spor Kulübü", width: 4032, height: 3024 },
  { src: "/album/fotograf/foto-13.jpeg", alt: "Gerçek Kuzey Spor Kulübü", width: 2531, height: 2224 },
];

export default function FotografPage() {
  return (
    <main className="min-h-screen bg-navy-dark pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6 md:px-14">
        <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-sky-light mb-3 text-center">
          Albüm
        </p>
        <h1 className="font-cinzel font-bold text-white text-[28px] md:text-[42px] leading-tight tracking-[0.04em] mb-6 text-center">
          <SmallCaps>Fotoğraf Galerisi</SmallCaps>
        </h1>
        <div className="w-14 h-0.5 bg-gradient-to-r from-sky-light to-transparent mx-auto mb-12" />

        {photos.length > 0 ? (
          <PhotoLightbox photos={photos} />
        ) : (
          <p className="font-worksans text-[14px] text-white/60 text-center">
            Kulüp fotoğrafları yakında bu sayfada yayınlanacaktır.
          </p>
        )}

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
