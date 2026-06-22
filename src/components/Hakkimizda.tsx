"use client";

import { useEffect, useRef } from "react";
import SmallCaps from "./SmallCaps";

const values = [
  {
    num: "01",
    title: "Takım Ruhu",
    desc: "Birlikte başarıya ulaşmak, birlikte büyümek.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    num: "02",
    title: "Disiplin",
    desc: "Düzenli antrenman ve sorumlu spor anlayışı.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="6"/>
        <circle cx="12" cy="12" r="2"/>
      </svg>
    ),
  },
  {
    num: "03",
    title: "Fair Play",
    desc: "Rakibe saygı, kurallara bağlılık, dürüst rekabet.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    num: "04",
    title: "Gelişim",
    desc: "Her sporcu için sürekli ilerleme ve potansiyel odaklı çalışma.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
];

export default function Hakkimizda() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("in"), i * 100);
            });
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="hakkimizda" ref={sectionRef} className="relative py-24 md:py-32 bg-navy-dark overflow-hidden">
      <div
        className="absolute inset-0 bg-cover"
        style={{ backgroundImage: "url(/tarihce-bg.jpg)", backgroundPosition: "center 85%" }}
      />
      <div className="absolute inset-0 bg-navy-dark/55" />
      <div className="relative max-w-6xl mx-auto px-6 md:px-14">

        <div className="mb-16">
          <p className="reveal text-[10px] font-bold tracking-[0.5em] uppercase text-sky-light mb-3">
            Tarihçe
          </p>
          <h2 className="reveal font-cinzel font-bold text-white text-[26px] md:text-[38px] leading-tight tracking-[0.04em] mb-4">
            <SmallCaps>Kulüp Tarihçemiz</SmallCaps>
          </h2>
          <div className="reveal w-14 h-0.5 bg-gradient-to-r from-sky-light to-transparent mb-10" />
          <div className="reveal max-w-2xl space-y-4 font-worksans font-medium text-white/75 text-[15px] leading-relaxed">
            <p>
              <strong className="text-sky-light font-semibold">Gerçek Kuzey Spor Kulübü</strong>,
              19 Mayıs 2011 tarihinde Cenk Temelatan tarafından İstanbul&apos;un 4. Levent semtinde
              kurulmuştur. Beşiktaş bölgesinde faaliyet gösteren kulübümüz, gençleri futbola
              kazandırmak ve sporu bir yaşam disiplini hâline getirmek amacıyla yola çıkmıştır.
            </p>
            <p>
              Kurulduğumuz günden bu yana yalnızca sahada mücadele eden sporcular yetiştirmeyi
              değil; aynı zamanda karakterli, saygılı, sorumluluk sahibi ve takım ruhunu
              benimseyen bireyler kazandırmayı hedefliyoruz. Bizim için futbol, sadece bir oyun
              değil; disiplinin, emeğin, dayanışmanın ve fair play anlayışının sahadaki
              karşılığıdır.
            </p>
            <p>
              Gerçek Kuzey Spor Kulübü olarak temel ilkelerimiz disiplin, saygı ve takım
              ruhudur. Her antrenmanda, her maçta ve her adımda bu değerleri yaşatmayı
              amaçlıyor; genç sporcularımızın hem sportif hem de kişisel gelişimlerine katkı
              sağlamayı önemsiyoruz.
            </p>
            <p>
              Bugün Beşiktaş&apos;ın yerel spor kültürüne katkı sunan kulübümüz, geleceğin
              sporcularını yetiştirmek için aynı inanç ve kararlılıkla yoluna devam etmektedir.
            </p>
          </div>
        </div>

        {/* Value cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {values.map((v, i) => (
            <div
              key={v.title}
              className={`reveal reveal-delay-${i + 1} group bg-navy-dark p-8
                hover:bg-navy-mid transition-colors duration-300 cursor-default`}
            >
              {/* Number */}
              <div className="text-[11px] font-bold tracking-[0.3em] text-sky-light/50 mb-6 font-cinzel">
                {v.num}
              </div>

              {/* Icon */}
              <div className="text-sky-light/70 mb-5 group-hover:text-sky-light transition-colors duration-300">
                {v.icon}
              </div>

              {/* Title */}
              <h3 className="font-cinzel font-bold text-white text-sm tracking-[0.08em] uppercase mb-3">
                {v.title}
              </h3>

              {/* Desc */}
              <p className="font-worksans font-medium text-white/65 text-[13px] leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                {v.desc}
              </p>

              {/* Bottom accent */}
              <div className="mt-6 w-0 h-px bg-sky-light group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
