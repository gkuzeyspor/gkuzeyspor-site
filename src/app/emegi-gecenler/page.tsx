import Link from "next/link";
import SmallCaps from "@/components/SmallCaps";

const staff = [
  { role: "Teknik Direktör", name: "Caner KAYA", period: "2011", active: false },
  { role: "Teknik Direktör", name: "Süleyman AKGÜL", period: "2011-2012", active: false },
  { role: "Yardımcı Antrenör", name: "Sercan TERZİOĞLU", period: "2013-2014", active: false },
  { role: "Yardımcı Antrenör", name: "Cengiz SİRKAN", period: "2013-2014", active: false },
  { role: "Teknik Direktör", name: "Mehmet ARAS", period: "2016-Halen", active: true },
  { role: "Yardımcı Antrenör", name: "Abdurrahman GÖZDERESİ", period: "2015-2016", active: false },
  { role: "Yardımcı Antrenör", name: "Erdem DERELİ", period: "2016-2020", active: false },
  { role: "Yardımcı Antrenör", name: "Enes Umut SERHUŞ", period: "2021-Halen", active: true },
];

export default function EmegiGecenlerPage() {
  return (
    <main className="min-h-screen bg-navy-dark pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6 md:px-14">
        <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-sky-light mb-3 text-center">
          Kulüp
        </p>
        <h1 className="font-cinzel font-bold text-white text-[28px] md:text-[42px] leading-tight tracking-[0.04em] mb-6 text-center">
          <SmallCaps>Emeği Geçenler</SmallCaps>
        </h1>
        <div className="w-14 h-0.5 bg-gradient-to-r from-sky-light to-transparent mx-auto mb-12" />

        <ul className="space-y-4">
          {staff.map((person) => (
            <li
              key={`${person.name}-${person.period}`}
              className={`font-worksans text-[14px] leading-relaxed border-l-2 pl-4
                ${person.active ? "border-sky-light text-white font-bold" : "border-white/15 text-white/70 font-medium"}`}
            >
              {person.role} {person.name} — ({person.period})
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
