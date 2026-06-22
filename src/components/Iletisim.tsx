"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import SmallCaps from "./SmallCaps";

const contactInfo = [
  { icon: "📍", label: "Adres",   value: "Beşiktaş, İstanbul" },
  { icon: "📞", label: "Telefon", value: "+90 505 402 46 10 — Cenk Temelatan" },
  { icon: "📞", label: "Telefon", value: "+90 532 320 58 51 — Enes Umut Serhuş" },
  { icon: "📧", label: "E-Posta", value: "gkuzeyspor@hotmail.com" },
  { icon: "🏟️", label: "Tesis",   value: "Beşiktaş Çilekli Spor Tesisleri" },
];

export default function Iletisim() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      message: data.get("message"),
      website: data.get("website"),
    };

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(result.error || "Mesaj gönderilemedi, lütfen tekrar deneyin.");
        return;
      }

      setStatus("sent");
      form.reset();
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setErrorMsg("Bağlantı hatası, lütfen tekrar deneyin.");
    }
  };

  const inputClass =
    "w-full bg-white/[0.03] border border-white/10 px-4 py-3 text-white text-sm " +
    "placeholder:text-white/25 outline-none focus:border-sky-light/50 focus:bg-sky-light/[0.04] " +
    "transition-all duration-200";

  return (
    <section id="iletisim" ref={sectionRef} className="py-24 md:py-32 bg-navy-dark">
      <div className="max-w-6xl mx-auto px-6 md:px-14">

        {/* Header */}
        <div className="mb-14">
          <p className="reveal text-[10px] font-bold tracking-[0.5em] uppercase text-sky-light mb-3">
            İletişim
          </p>
          <h2 className="reveal font-cinzel font-bold text-white text-[26px] md:text-[38px] leading-tight tracking-[0.04em] mb-4">
            <SmallCaps>Bizimle İletişime Geçin</SmallCaps>
          </h2>
          <div className="reveal w-14 h-0.5 bg-gradient-to-r from-sky-light to-transparent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">

          {/* Form */}
          <form onSubmit={handleSubmit} className="reveal space-y-5">
            <div>
              <label htmlFor="contact-name" className="block text-[10px] font-bold tracking-[0.3em] uppercase text-sky-light mb-2">
                Ad Soyad
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                placeholder="Adınızı ve soyadınızı girin"
                required
                minLength={2}
                maxLength={100}
                autoComplete="name"
                disabled={status === "sending"}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-[10px] font-bold tracking-[0.3em] uppercase text-sky-light mb-2">
                E-Posta
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                placeholder="ornek@mail.com"
                required
                maxLength={254}
                autoComplete="email"
                disabled={status === "sending"}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-[10px] font-bold tracking-[0.3em] uppercase text-sky-light mb-2">
                Mesaj
              </label>
              <textarea
                id="contact-message"
                rows={5}
                name="message"
                placeholder="Mesajınızı buraya yazın…"
                required
                minLength={10}
                maxLength={5000}
                disabled={status === "sending"}
                className={inputClass + " resize-y"}
              />
            </div>
            <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
              <label htmlFor="contact-website">Web sitesi</label>
              <input
                id="contact-website"
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              className={`px-10 py-3.5 font-bold text-[11px] tracking-[0.3em] uppercase transition-all duration-200
                ${status === "sent"
                  ? "bg-green-700 text-white cursor-default"
                  : status === "sending"
                  ? "bg-sky-light/50 text-navy-dark cursor-wait"
                  : "bg-sky-light text-navy-dark hover:brightness-110"
                }`}
            >
              {status === "sent" ? "Gönderildi ✓" : status === "sending" ? "Gönderiliyor…" : "Gönder"}
            </button>
            {status === "error" && (
              <p className="font-worksans text-[12px] font-medium text-red-400">{errorMsg}</p>
            )}
          </form>

          {/* Info */}
          <div className="reveal reveal-delay-2 space-y-4">
            <p className="font-worksans font-medium text-white/75 text-[14px] leading-relaxed mb-8">
              Kulübümüze üye olmak, etkinliklerimiz hakkında bilgi almak veya herhangi bir konuda
              destek için aşağıdaki bilgilerden bize ulaşabilirsiniz.
            </p>
            {contactInfo.map((item) => (
              <div
                key={item.value}
                className="flex items-start gap-4 p-4 border border-white/5 bg-white/[0.02]
                  hover:border-sky-light/20 hover:bg-sky-light/[0.04] transition-all duration-200"
              >
                <span className="text-xl mt-0.5 flex-shrink-0">{item.icon}</span>
                <div>
                  <div className="text-[9px] font-bold tracking-[0.35em] uppercase text-sky-light mb-1">
                    {item.label}
                  </div>
                  <div className="font-worksans font-medium text-[13px] text-white/85 leading-snug">{item.value}</div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Map */}
        <div className="reveal reveal-delay-3 mt-14 border border-white/6 grayscale-[0.3] hover:grayscale-0 transition-all duration-500">
          <iframe
            src="https://www.google.com/maps?q=Beşiktaş+Çilekli+Spor+Tesisleri,+İstanbul&output=embed"
            width="100%"
            height="340"
            style={{ border: 0, display: "block" }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            title="Gerçek Kuzey Spor Kulübü Konumu"
          />
        </div>

      </div>
    </section>
  );
}
