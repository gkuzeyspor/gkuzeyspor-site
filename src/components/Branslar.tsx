"use client";

import { useEffect, useRef, useState } from "react";
import { BranchCard } from "./BranchCard";

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

const POSITIONS = ["front", "middle", "back"] as const;

export default function Branslar() {
  const sectionRef = useRef<HTMLElement>(null);
  const [order, setOrder] = useState([0, 1, 2]);

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

  const handleShuffle = () => {
    setOrder((prev) => [...prev.slice(1), prev[0]]);
  };

  return (
    <section id="branslar" ref={sectionRef} className="relative py-24 md:py-32 bg-navy-deep overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/spor%20dallar%C4%B1m%C4%B1z.jpeg)" }}
      />
      <div className="absolute inset-0 bg-navy-deep/55" />
      <div className="relative max-w-6xl mx-auto px-6 md:px-14">

        <div className="mb-14">
          <p className="reveal text-[10px] font-bold tracking-[0.5em] uppercase text-sky-light mb-3">
            Branşlarımız
          </p>
          <h2 className="reveal font-cinzel font-bold uppercase text-white text-[26px] md:text-[38px] leading-tight tracking-[0.04em] mb-4">
            Spor Dallarımız
          </h2>
          <div className="reveal w-14 h-0.5 bg-gradient-to-r from-sky-light to-transparent" />
        </div>

        <p className="reveal font-worksans text-[11px] font-medium tracking-[0.1em] text-white/35 mb-8 md:mb-0">
          Kartı sürükle, diğer branşları gör →
        </p>

        <div className="reveal relative h-[340px] sm:h-[360px] w-[300px] sm:w-[320px] mx-auto md:mx-0 md:ml-12 mt-6">
          {order.map((branchIndex, i) => (
            <BranchCard
              key={branches[branchIndex].title}
              branch={branches[branchIndex]}
              position={POSITIONS[i]}
              handleShuffle={handleShuffle}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
