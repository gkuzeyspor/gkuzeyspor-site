import Link from "next/link";
import SmallCaps from "./SmallCaps";

export default function PlaceholderPage({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <main className="min-h-screen flex items-center bg-navy-dark pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6 md:px-14 text-center">
        <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-sky-light mb-3">
          {eyebrow}
        </p>
        <h1 className="font-cinzel font-bold text-white text-[28px] md:text-[42px] leading-tight tracking-[0.04em] mb-6">
          <SmallCaps>{title}</SmallCaps>
        </h1>
        <div className="w-14 h-0.5 bg-gradient-to-r from-sky-light to-transparent mx-auto mb-8" />
        <p className="font-worksans font-medium text-white/70 text-[15px] leading-relaxed mb-10">
          {description}
        </p>
        <Link
          href="/"
          className="inline-block px-10 py-3.5 border border-white/30 text-white/80 font-bold text-[11px] tracking-[0.28em] uppercase hover:border-sky-light hover:text-sky-light transition-colors duration-200"
        >
          Anasayfaya Dön
        </Link>
      </div>
    </main>
  );
}
