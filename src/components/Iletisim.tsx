"use client";

import { useState, useEffect, useRef, FormEvent } from "react";

const contactInfo = [
  { icon: "📍", label: "Adres",   value: "Adres bilgisi buraya gelecek" },
  { icon: "📞", label: "Telefon", value: "Telefon bilgisi buraya gelecek" },
  { icon: "📧", label: "E-Posta", value: "info@gercekkuzeysk.com" },
  { icon: "🏟️", label: "Tesis",   value: "Antrenman sahası / tesis bilgisi buraya gelecek" },
];

export default function Iletisim() {
  const [sent, setSent] = useState(false);
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      (e.target as HTMLFormElement).reset();
    }, 3500);
  };

  const inputClass =
    "w-full bg-white/[0.03] border border-white/10 px-4 py-3 text-white text-sm " +
    "placeholder:text-white/25 outline-none focus:border-gold/50 focus:bg-gold/[0.04] " +
    "transition-all duration-200";

  return (
    <section id="iletisim" ref={sectionRef} className="py-24 md:py-32 bg-navy-dark">
      <div className="max-w-6xl mx-auto px-6 md:px-14">

        {/* Header */}
        <div className="mb-14">
          <p className="reveal text-[10px] font-bold tracking-[0.5em] uppercase text-gold mb-3">
            İletişim
          </p>
          <h2 className="reveal font-cinzel font-bold uppercase text-white text-[26px] md:text-[38px] leading-tight tracking-[0.04em] mb-4">
            Bizimle İletişime Geç
          </h2>
          <div className="reveal w-14 h-0.5 bg-gradient-to-r from-gold to-transparent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">

          {/* Form */}
          <form onSubmit={handleSubmit} className="reveal space-y-5" noValidate>
            <div>
              <label className="block text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-2">
                Ad Soyad
              </label>
              <input
                type="text"
                placeholder="Adınızı ve soyadınızı girin"
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-2">
                E-Posta
              </label>
              <input
                type="email"
                placeholder="ornek@mail.com"
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-2">
                Mesaj
              </label>
              <textarea
                rows={5}
                placeholder="Mesajınızı buraya yazın…"
                required
                className={inputClass + " resize-y"}
              />
            </div>
            <button
              type="submit"
              className={`px-10 py-3.5 font-bold text-[11px] tracking-[0.3em] uppercase transition-all duration-200
                ${sent
                  ? "bg-green-700 text-white cursor-default"
                  : "bg-gold text-navy-dark hover:bg-gold-light"
                }`}
            >
              {sent ? "Gönderildi ✓" : "Gönder"}
            </button>
            <p className="text-[11px] text-white/30">* Bu form frontend-only demo amaçlıdır.</p>
          </form>

          {/* Info */}
          <div className="reveal reveal-delay-2 space-y-4">
            <p className="text-white/55 text-[14px] leading-relaxed mb-8">
              Kulübümüze üye olmak, etkinliklerimiz hakkında bilgi almak veya herhangi bir konuda
              destek için aşağıdaki bilgilerden bize ulaşabilirsiniz.
            </p>
            {contactInfo.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 p-4 border border-white/5 bg-white/[0.02]
                  hover:border-gold/20 hover:bg-gold/[0.04] transition-all duration-200"
              >
                <span className="text-xl mt-0.5 flex-shrink-0">{item.icon}</span>
                <div>
                  <div className="text-[9px] font-bold tracking-[0.35em] uppercase text-gold mb-1">
                    {item.label}
                  </div>
                  <div className="text-[13px] text-white/65 leading-snug">{item.value}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
