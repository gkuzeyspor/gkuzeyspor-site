"use client";

import Image from "next/image";

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy-dark to-navy-mid" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_65%_at_50%_38%,rgba(13,59,122,0.45)_0%,transparent_68%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(5,13,26,0.9)_0%,transparent_55%)]" />

      <div className="relative z-10 text-center px-6 flex flex-col items-center">
        {/* Logo */}
        <div className="mb-8 md:mb-10 hero-logo-anim">
          <Image
            src="/logo.png"
            alt="Gerçek Kuzey Spor Kulübü"
            width={390}
            height={390}
            className="object-contain mx-auto w-[270px] sm:w-[330px] md:w-[390px] h-auto drop-shadow-2xl"
            priority
          />
        </div>

        <p className="hero-item-1 font-worksans text-[12px] font-bold tracking-[0.5em] uppercase text-sky-light mb-6 -translate-y-4">
          Türkiye &nbsp;·&nbsp; Amatör Spor Kulübü
        </p>

        <h1 className="hero-item-2 font-shadows font-bold text-white mb-3 text-[34px] sm:text-[44px] md:text-[60px] lg:text-[72px] leading-[1.1] tracking-[0.01em]">
          Gerçek{" "}
          <span className="relative inline-block">
            <span className="absolute -top-1 sm:-top-1.5 md:-top-2 left-0 -translate-x-1.5 text-[#d4af37] text-[14px] sm:text-[18px] md:text-[22px] leading-none">★</span>
            K
          </span>
          uzey
          <span className="block text-sky-light">Spor Kulübü</span>
        </h1>

        <div className="hero-item-3 w-20 h-px bg-gradient-to-r from-transparent via-sky-light to-transparent my-5" />

        <p className="hero-item-4 font-worksans font-medium text-sm md:text-base text-white/75 max-w-xl leading-relaxed mb-10">
          Disiplin, takım ruhu ve fair play anlayışıyla sporun birleştirici gücünü yaşatıyoruz.
        </p>

        <div className="hero-item-5 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => scrollTo("hakkimizda")}
            className="px-10 py-3.5 bg-sky-light text-navy-dark font-bold text-[11px] tracking-[0.28em] uppercase hover:brightness-110 transition-all duration-200"
          >
            Kulübü Tanı
          </button>
          <button
            onClick={() => scrollTo("iletisim")}
            className="px-10 py-3.5 border border-white/30 text-white/80 font-bold text-[11px] tracking-[0.28em] uppercase hover:border-sky-light hover:text-sky-light transition-colors duration-200"
          >
            İletişime Geç
          </button>
        </div>
      </div>

      <div className="hero-scroll absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1.5">
          <div className="w-0.5 h-1.5 bg-sky-light rounded scroll-dot-anim" />
        </div>
        <span className="text-[8px] tracking-[0.45em] text-white/25 uppercase">Kaydır</span>
      </div>
    </section>
  );
}
