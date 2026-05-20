"use client";

import { useEffect, useRef } from "react";

const branches = [
  {
    icon: "⚽",
    name: "Futbol",
    desc: "Takım disiplini, kondisyon ve oyun bilgisi odaklı futbol çalışmaları.",
    detail: "Haftalık antrenmanlar · Lig müsabakaları",
  },
  {
    icon: "🧑‍🤝‍🧑",
    name: "Altyapı Takımları",
    desc: "Genç sporcuların fiziksel, teknik ve mental gelişimini destekleyen altyapı programları.",
    detail: "U8 – U18 · Yaş grupları",
  },
  {
    icon: "🏋️",
    name: "Bireysel Gelişim",
    desc: "Sporcuların eksik yönlerini geliştirmeye yönelik özel çalışma programları.",
    detail: "Kişiye özel antrenman · Kondisyon",
  },
];

export default function Branslar() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("in"), i * 120);
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
    <section
      id="branslar"
      ref={sectionRef}
      className="py-24 md:py-32 bg-navy-deep"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-14">

        {/* Header */}
        <div className="mb-14">
          <p className="reveal text-[10px] font-bold tracking-[0.5em] uppercase text-gold mb-3">
            Branşlarımız
          </p>
          <h2 className="reveal font-cinzel font-bold uppercase text-white text-[26px] md:text-[38px] leading-tight tracking-[0.04em] mb-4">
            Spor Dallarımız
          </h2>
          <div className="reveal w-14 h-0.5 bg-gradient-to-r from-gold to-transparent" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {branches.map((b, i) => (
            <div
              key={b.name}
              className={`reveal reveal-delay-${i + 1}
                relative p-8 border border-white/6 bg-white/[0.022]
                hover:border-gold/35 hover:bg-gold/[0.04]
                transition-all duration-350 group`}
            >
              {/* Top accent line on hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="text-4xl mb-5">{b.icon}</div>

              <h3 className="font-cinzel font-bold text-white text-base tracking-[0.08em] uppercase mb-3">
                {b.name}
              </h3>

              <p className="text-white/55 text-[13px] leading-relaxed mb-4">{b.desc}</p>

              <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                <div className="w-1.5 h-1.5 rounded-full bg-gold/70" />
                <span className="text-[11px] text-white/35 tracking-wide">{b.detail}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
