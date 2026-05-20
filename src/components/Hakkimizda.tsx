"use client";

import { useEffect, useRef } from "react";

const values = [
  {
    icon: "🤝",
    title: "Takım Ruhu",
    desc: "Birlikte başarıya ulaşmak, birlikte büyümek.",
  },
  {
    icon: "🎯",
    title: "Disiplin",
    desc: "Düzenli antrenman ve sorumlu spor anlayışı.",
  },
  {
    icon: "⚖️",
    title: "Fair Play",
    desc: "Rakibe saygı, kurallara bağlılık, dürüst rekabet.",
  },
  {
    icon: "📈",
    title: "Gelişim",
    desc: "Her sporcu için sürekli ilerleme ve potansiyel odaklı çalışma.",
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
    <section id="hakkimizda" ref={sectionRef} className="py-24 md:py-32 bg-navy-dark">
      <div className="max-w-6xl mx-auto px-6 md:px-14">

        {/* Header */}
        <div className="mb-14">
          <p className="reveal text-[10px] font-bold tracking-[0.5em] uppercase text-gold mb-3">
            Hakkımızda
          </p>
          <h2 className="reveal font-cinzel font-bold uppercase text-white text-[26px] md:text-[38px] leading-tight tracking-[0.04em] mb-4">
            Kulüp Kimliğimiz
          </h2>
          <div className="reveal w-14 h-0.5 bg-gradient-to-r from-gold to-transparent mb-8" />
          <div className="reveal max-w-2xl space-y-4 text-white/60 text-[15px] leading-relaxed">
            <p>
              <strong className="text-gold font-semibold">Gerçek Kuzey Spor Kulübü</strong>,
              genç sporcuların gelişimini destekleyen, disiplinli çalışma kültürünü ve takım ruhunu
              merkeze alan bir amatör spor kulübüdür.
            </p>
            <p>
              Amacımız, sporcularımıza yalnızca sportif başarı değil; saygı, sorumluluk,
              mücadele ve fair play bilinci kazandırmaktır.
            </p>
            <p>
              19 Mayıs 2011&apos;den bu yana Türk spor camiasında yerini sağlamlaştıran kulübümüz,
              her yaştan ve her seviyeden sporcuya kapılarını açmaya devam etmektedir.
            </p>
          </div>
        </div>

        {/* Value cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v, i) => (
            <div
              key={v.title}
              className={`reveal reveal-delay-${i + 1} group
                p-6 border border-white/6 bg-white/[0.025]
                hover:border-gold/30 hover:bg-gold/[0.04]
                transition-all duration-300`}
            >
              <div className="text-3xl mb-4">{v.icon}</div>
              <h3 className="font-cinzel font-bold text-white text-sm tracking-[0.08em] uppercase mb-2">
                {v.title}
              </h3>
              <p className="text-white/50 text-[13px] leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
