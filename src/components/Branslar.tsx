"use client";

import { useEffect, useRef } from "react";

const branches = [
  {
    title: "Futbol",
    desc: "Takım disiplini, kondisyon ve oyun bilgisi odaklı futbol çalışmaları.",
    detail: "Haftalık antrenmanlar · Lig müsabakaları",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 2a10 10 0 0 1 6.88 2.77L12 12 5.12 4.77A10 10 0 0 1 12 2z"/>
        <path d="M2.05 13h5.45l3-5 3 5h5.45"/>
        <path d="M20.88 17.23L15.5 14l-3.5 6-3.5-6-5.38 3.23"/>
      </svg>
    ),
  },
  {
    title: "Altyapı Takımları",
    desc: "Genç sporcuların fiziksel, teknik ve mental gelişimini destekleyen altyapı programları.",
    detail: "U8 – U18 · Yaş grupları",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    title: "Bireysel Gelişim",
    desc: "Sporcuların eksik yönlerini geliştirmeye yönelik özel çalışma programları.",
    detail: "Kişiye özel antrenman · Kondisyon",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/>
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
        <polyline points="22 7 17 2"/>
      </svg>
    ),
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
    <section id="branslar" ref={sectionRef} className="py-24 md:py-32 bg-navy-deep">
      <div className="max-w-6xl mx-auto px-6 md:px-14">

        <div className="mb-14">
          <p className="reveal text-[10px] font-bold tracking-[0.5em] uppercase text-gold mb-3">
            Branşlarımız
          </p>
          <h2 className="reveal font-cinzel font-bold uppercase text-white text-[26px] md:text-[38px] leading-tight tracking-[0.04em] mb-4">
            Spor Dallarımız
          </h2>
          <div className="reveal w-14 h-0.5 bg-gradient-to-r from-gold to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/6">
          {branches.map((b, i) => (
            <div
              key={b.title}
              className={`reveal reveal-delay-${i + 1} group relative p-10
                border-b md:border-b-0 md:border-r border-white/6 last:border-0
                hover:bg-white/[0.03] transition-colors duration-300 cursor-default`}
            >
              {/* Top accent */}
              <div className="absolute top-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-500" />

              {/* Icon */}
              <div className="text-gold/60 mb-8 group-hover:text-gold transition-colors duration-300">
                {b.icon}
              </div>

              {/* Title */}
              <h3 className="font-cinzel font-bold text-white text-base tracking-[0.06em] uppercase mb-3">
                {b.title}
              </h3>

              {/* Desc */}
              <p className="text-white/50 text-[13px] leading-relaxed mb-6">{b.desc}</p>

              {/* Detail */}
              <div className="flex items-center gap-2">
                <div className="w-4 h-px bg-gold/50" />
                <span className="text-[11px] text-white/30 tracking-wide font-medium">{b.detail}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
