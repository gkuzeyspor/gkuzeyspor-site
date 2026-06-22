import { getPlayers } from "@/lib/players";
import SmallCaps from "@/components/SmallCaps";

export const metadata = {
  title: "Sporcular | Gerçek Kuzey Spor Kulübü",
  description: "Gerçek Kuzey Spor Kulübü'ne lisanslı sporcuların listesi.",
};

export default async function SporcularPage() {
  const players = await getPlayers();

  return (
    <main className="min-h-screen bg-navy-dark pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6 md:px-14">
        <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-sky-light mb-3 text-center">
          Kulüp
        </p>
        <h1 className="font-cinzel font-bold text-white text-[28px] md:text-[42px] leading-tight tracking-[0.04em] mb-6 text-center">
          <SmallCaps>Sporcular</SmallCaps>
        </h1>
        <div className="w-14 h-0.5 bg-gradient-to-r from-sky-light to-transparent mx-auto mb-4" />
        <p className="font-worksans text-[13px] font-medium text-white/45 text-center mb-12">
          TFF İstanbul kayıtlarına göre lisanslı sporcu listesi · aylık güncellenir
        </p>

        {players.length === 0 ? (
          <p className="font-worksans text-[14px] text-white/60 text-center">
            Sporcu listesi şu anda yüklenemedi, lütfen daha sonra tekrar deneyin.
          </p>
        ) : (
          <div className="border border-white/8 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[480px]">
              <caption className="sr-only">Gerçek Kuzey Spor Kulübü lisanslı sporcu listesi</caption>
              <thead>
                <tr className="bg-white/[0.03] border-b-2 border-sky-light/20">
                  <th scope="col" className="font-worksans text-[11px] font-bold tracking-[0.1em] uppercase text-white/45 px-5 py-4">Adı Soyadı</th>
                  <th scope="col" className="font-worksans text-[11px] font-bold tracking-[0.1em] uppercase text-white/45 px-4 py-4 border-l border-white/8">Lisans No</th>
                  <th scope="col" className="font-worksans text-[11px] font-bold tracking-[0.1em] uppercase text-white/45 px-4 py-4 border-l border-white/8">D. Tarihi</th>
                </tr>
              </thead>
              <tbody>
                {players.map((p, i) => (
                  <tr
                    key={p.profileUrl}
                    className={`border-b border-white/5 last:border-0 hover:bg-white/[0.035] transition-colors duration-200 ${i % 2 === 1 ? "bg-white/[0.015]" : ""}`}
                  >
                    <td className="font-worksans text-[13px] font-semibold text-white/85 px-5 py-3">
                      <a
                        href={p.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-sky-light transition-colors duration-200"
                      >
                        {p.name}
                      </a>
                    </td>
                    <td className="font-worksans text-[13px] font-medium text-white/55 px-4 py-3 tabular-nums border-l border-white/5">{p.licenseNo}</td>
                    <td className="font-worksans text-[13px] font-medium text-white/55 px-4 py-3 tabular-nums border-l border-white/5">{p.birthDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-8 font-worksans text-[11px] font-medium text-white/35 text-center">
          Kaynak:{" "}
          <a
            href="https://tffistanbul.org/futbolcular?t=1151&n=&l="
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-sky-light transition-colors duration-200"
          >
            TFF İstanbul
          </a>
        </p>
      </div>
    </main>
  );
}
