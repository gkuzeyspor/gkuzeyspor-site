import Link from "next/link";
import SmallCaps from "@/components/SmallCaps";

export const metadata = {
  title: "Başarılarımız | Gerçek Kuzey Spor Kulübü",
  description:
    "Gerçek Kuzey Spor Kulübü'nün yıllar içindeki lig şampiyonlukları ve başarıları.",
};

const achievements = [
  { period: "2013-2014", title: "U-14 Ligi Şampiyonu" },
  { period: "2015-2016", title: "U-16 Ligi Şampiyonu" },
  { period: "2019-2020", title: "U-15/B Ligi Şampiyonu" },
];

export default function BasarilarimizPage() {
  return (
    <main className="min-h-screen bg-navy-dark pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6 md:px-14">
        <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-sky-light mb-3 text-center">
          Kulüp
        </p>
        <h1 className="font-cinzel font-bold text-white text-[28px] md:text-[42px] leading-tight tracking-[0.04em] mb-6 text-center">
          <SmallCaps>Başarılarımız</SmallCaps>
        </h1>
        <div className="w-14 h-0.5 bg-gradient-to-r from-sky-light to-transparent mx-auto mb-12" />

        <ul className="space-y-4">
          {achievements.map((item) => (
            <li
              key={item.period}
              className="font-worksans text-[14px] leading-relaxed text-white/80 font-medium border-l-2 border-sky-light/40 pl-4"
            >
              {item.period} <span className="text-sky-light font-bold">{item.title} 🏆</span>
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
