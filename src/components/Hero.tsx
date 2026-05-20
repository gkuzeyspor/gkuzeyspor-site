"use client";

import Image from "next/image";

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy-dark to-navy-mid" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,168,76,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.6) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Radial glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_65%_at_50%_38%,rgba(13,59,122,0.45)_0%,transparent_68%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(5,13,26,0.9)_0%,transparent_55%)]" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 flex flex-col items-center">
        {/* Logo */}
        <div className="mb-8 md:mb-10 hero-logo-anim">
          <Image
            src="/logo.jpg"
            alt="Gerçek Kuzey Spor Kulübü"
            width={260}
            height={260}
            className="object-contain drop-shadow-2xl mx-auto w-[180px] sm:w-[220px] md:w-[260px]"
            priority
          />
        </div>

        {/* Eyebrow */}
        <p className="hero-item-1 text-[10px] font-bold tracking-[0.5em] uppercase text-gold mb-4">
          Türkiye &nbsp;·&nbsp; Amatör Spor Kulübü
        </p>

        {/* Title */}
        <h1 className="hero-item-2 font-cinzel font-black uppercase text-white mb-3 text-[28px] sm:text-[36px] md:text-[52px] lg:text-[64px] leading-[1.05] tracking-[0.05em]">
          Gerçek Kuzey
          <span className="block text-gold">Spor Kulübü</span>
        </h1>

        {/* Divider */}
        <div className="hero-item-3 w-20 h-px bg-gradient-to-r from-transparent via-gold to-transparent my-5" />

        {/* Subtitle */}
        <p className="hero-item-4 text-sm md:text-base font-light text-white/60 max-w-xl leading-relaxed mb-10">
          Disiplin, takım ruhu ve fair play anlayışıyla sporun birleştirici gücünü yaşatıyoruz.
        </p>

        {/* CTA buttons */}
        <div className="hero-item-5 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => scrollTo("hakkimizda")}
            className="px-10 py-3.5 bg-gold text-navy-dark font-bold text-[11px] tracking-[0.28em] uppercase hover:bg-gold-light transition-colors duration-200"
          >
            Kulübü Tanı
          </button>
          <button
            onClick={() => scrollTo("iletisim")}
            className="px-10 py-3.5 border border-white/30 text-white/80 font-bold text-[11px] tracking-[0.28em] uppercase hover:border-gold hover:text-gold transition-colors duration-200"
          >
            İletişime Geç
          </button>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero-scroll absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1.5">
          <div className="w-0.5 h-1.5 bg-gold rounded scroll-dot-anim" />
        </div>
        <span className="text-[8px] tracking-[0.45em] text-white/25 uppercase">Kaydır</span>
      </div>
    </section>
  );
}
