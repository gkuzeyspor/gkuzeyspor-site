"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const links = [
  { href: "#hero",        label: "Anasayfa" },
  { href: "#hakkimizda", label: "Hakkımızda" },
  { href: "#branslar",   label: "Branşlarımız" },
  { href: "#iletisim",   label: "İletişim" },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 55);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-300
          ${scrolled
            ? "bg-navy-deep/95 backdrop-blur-md border-b border-gold/10 py-3 px-6 md:px-14"
            : "bg-transparent py-4 px-6 md:px-14"
          }`}
      >
        {/* Logo + brand */}
        <a
          href="#hero"
          onClick={(e) => handleLink(e, "#hero")}
          className="flex items-center gap-3"
          aria-label="Gerçek Kuzey Spor Kulübü - Anasayfa"
        >
          <Image
            src="/logo.jpg"
            alt="Gerçek Kuzey Spor Kulübü"
            width={44}
            height={44}
            className="object-contain mix-blend-multiply"
            priority
          />
          <div className="flex flex-col leading-tight">
            <span
              className="font-cinzel text-[13px] font-bold tracking-[0.14em] uppercase text-gold"
            >
              Gerçek Kuzey
            </span>
            <span className="text-[9px] font-medium tracking-[0.32em] uppercase text-white/40">
              Spor Kulübü
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-9 list-none">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => handleLink(e, l.href)}
                className="relative text-[11px] font-bold tracking-[0.22em] uppercase text-white/60
                  hover:text-gold transition-colors duration-200
                  after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-px after:w-0
                  after:bg-gold after:transition-all after:duration-300 hover:after:w-full pb-1"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(true)}
          aria-label="Menüyü aç"
        >
          <span className="block w-6 h-0.5 bg-gold" />
          <span className="block w-6 h-0.5 bg-gold" />
          <span className="block w-6 h-0.5 bg-gold" />
        </button>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-navy-deep/98 backdrop-blur-md flex flex-col items-center justify-center gap-10">
          <button
            className="absolute top-6 right-6 text-gold text-3xl leading-none"
            onClick={() => setMenuOpen(false)}
            aria-label="Menüyü kapat"
          >
            ✕
          </button>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleLink(e, l.href)}
              className="font-cinzel text-xl font-semibold tracking-[0.2em] uppercase text-white/70 hover:text-gold transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
