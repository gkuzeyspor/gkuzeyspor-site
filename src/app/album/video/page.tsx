import Link from "next/link";
import VideoLightbox from "@/components/VideoLightbox";
import SmallCaps from "@/components/SmallCaps";

export const metadata = {
  title: "Video Galerisi | Gerçek Kuzey Spor Kulübü",
  description: "Gerçek Kuzey Spor Kulübü tanıtım ve maç videoları.",
};

const videos = [
  { src: "/album/tanitim.mp4", caption: "Gerçek Kuzey Spor Kulübü" },
];

export default function VideoPage() {
  return (
    <main className="min-h-screen bg-navy-dark pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6 md:px-14">
        <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-sky-light mb-3 text-center">
          Albüm
        </p>
        <h1 className="font-cinzel font-bold text-white text-[28px] md:text-[42px] leading-tight tracking-[0.04em] mb-6 text-center">
          <SmallCaps>Video Galerisi</SmallCaps>
        </h1>
        <div className="w-14 h-0.5 bg-gradient-to-r from-sky-light to-transparent mx-auto mb-12" />

        {videos.length > 0 ? (
          <VideoLightbox videos={videos} />
        ) : (
          <p className="font-worksans text-[14px] text-white/60 text-center">
            Kulüp videoları yakında bu sayfada yayınlanacaktır.
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
