import Link from "next/link";
import SmallCaps from "@/components/SmallCaps";

const categories = [
  { period: "2016 ve 2017 Doğumlular", title: "U-11" },
  { period: "2015 Doğumlular", title: "U-12" },
  { period: "2014 Doğumlular", title: "U-13" },
];

export default function YasKategorileriPage() {
  return (
    <main className="min-h-screen bg-navy-dark pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6 md:px-14">
        <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-sky-light mb-3 text-center">
          Kulüp
        </p>
        <h1 className="font-cinzel font-bold text-white text-[28px] md:text-[42px] leading-tight tracking-[0.04em] mb-6 text-center">
          <SmallCaps>Yaş Kategorileri</SmallCaps>
        </h1>
        <div className="w-14 h-0.5 bg-gradient-to-r from-sky-light to-transparent mx-auto mb-12" />

        <ul className="space-y-4">
          {categories.map((item) => (
            <li
              key={item.title}
              className="font-worksans text-[14px] leading-relaxed text-white/80 font-medium border-l-2 border-sky-light/40 pl-4"
            >
              <span className="text-sky-light font-bold">{item.title}</span> ({item.period})
            </li>
          ))}
        </ul>

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
