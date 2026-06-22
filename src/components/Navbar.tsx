"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { href: "#hero",        label: "Anasayfa" },
  { href: "#hakkimizda", label: "Tarihçe" },
  { href: "#branslar",   label: "Branşlarımız" },
  { href: "#iletisim",   label: "İletişim" },
];

const albumLinks = [
  { href: "/album/fotograf", label: "Fotoğraf" },
  { href: "/album/video",    label: "Video" },
];

const programLinks = [
  { href: "/program/antrenman", label: "Antrenman" },
  { href: "/program/mac",       label: "Maç" },
];

function NavDropdown({
  label,
  items,
  open,
  setOpen,
  scrolled,
}: {
  label: string;
  items: { href: string; label: string }[];
  open: boolean;
  setOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
  scrolled: boolean;
}) {
  return (
    <li
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`relative flex items-center gap-1.5 font-inter text-[13.5px] font-bold tracking-[0.03em] transition-colors duration-200
          ${scrolled ? "text-navy-dark/70 hover:text-navy-dark" : "text-white/60 hover:text-sky-light"}`}
      >
        {label}
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full pt-3 min-w-[160px] max-w-[260px]">
          <div className="bg-white border border-navy-dark/10 py-2">
            {items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block px-5 py-2.5 font-inter text-[13.5px] font-bold tracking-[0.02em] text-navy-dark/80 hover:text-navy-dark hover:bg-navy-dark/[0.04] transition-colors duration-150"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </li>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [albumOpen, setAlbumOpen] = useState(false);
  const [programOpen, setProgramOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 55);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMenuOpen(false);
    if (!isHome) return; // let the browser navigate to "/" + hash normally
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-300
          ${scrolled
            ? "bg-[#bfe3f7] backdrop-blur-md border-b border-navy-dark/10 py-3 px-6 md:px-14"
            : "bg-transparent py-4 px-6 md:px-14"
          }`}
      >
        <a
          href={isHome ? "#hero" : "/#hero"}
          onClick={(e) => handleLink(e, "#hero")}
          className="flex items-center gap-3 flex-shrink-0"
          aria-label="Gerçek Kuzey Spor Kulübü - Anasayfa"
        >
          <Image
            src="/logo.png"
            alt="Gerçek Kuzey Spor Kulübü"
            width={44}
            height={44}
            className="object-contain"
            priority
          />
          <div className="flex flex-col leading-tight">
            <span className={`font-cinzel text-[14px] font-bold tracking-[0.14em] uppercase transition-colors duration-300 ${scrolled ? "text-navy-dark" : "text-sky-light"}`}>
              Gerçek Kuzey
            </span>
            <span className={`font-worksans text-[10px] font-semibold tracking-[0.32em] uppercase transition-colors duration-300 ${scrolled ? "text-navy-dark/60" : "text-white/70"}`}>
              Spor Kulübü
            </span>
          </div>
        </a>

        <ul className="hidden md:flex items-center gap-6 list-none">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={isHome ? l.href : `/${l.href}`}
                onClick={(e) => handleLink(e, l.href)}
                className={`relative font-inter text-[13.5px] font-bold tracking-[0.03em] transition-colors duration-200
                  after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-px after:w-0
                  after:transition-all after:duration-300 hover:after:w-full pb-1
                  ${scrolled
                    ? "text-navy-dark/70 hover:text-navy-dark after:bg-navy-dark"
                    : "text-white/60 hover:text-sky-light after:bg-sky-light"
                  }`}
              >
                {l.label}
              </a>
            </li>
          ))}

          <NavDropdown label="Program" items={programLinks} open={programOpen} setOpen={setProgramOpen} scrolled={scrolled} />
          <NavDropdown label="Albüm" items={albumLinks} open={albumOpen} setOpen={setAlbumOpen} scrolled={scrolled} />

          <li>
            <a
              href="/yas-kategorileri"
              className={`font-inter text-[13.5px] font-bold tracking-[0.03em] transition-colors duration-200
                ${scrolled ? "text-navy-dark/70 hover:text-navy-dark" : "text-white/60 hover:text-sky-light"}`}
            >
              Yaş Kategorileri
            </a>
          </li>
          <li>
            <a
              href="/tesislerimiz"
              className={`font-inter text-[13.5px] font-bold tracking-[0.03em] transition-colors duration-200
                ${scrolled ? "text-navy-dark/70 hover:text-navy-dark" : "text-white/60 hover:text-sky-light"}`}
            >
              Tesislerimiz
            </a>
          </li>
          <li>
            <a
              href="/emegi-gecenler"
              className={`font-inter text-[13.5px] font-bold tracking-[0.03em] transition-colors duration-200
                ${scrolled ? "text-navy-dark/70 hover:text-navy-dark" : "text-white/60 hover:text-sky-light"}`}
            >
              Emeği Geçenler
            </a>
          </li>
          <li>
            <a
              href="/basarilarimiz"
              className={`font-inter text-[13.5px] font-bold tracking-[0.03em] transition-colors duration-200
                ${scrolled ? "text-navy-dark/70 hover:text-navy-dark" : "text-white/60 hover:text-sky-light"}`}
            >
              Başarılarımız
            </a>
          </li>
          <li>
            <a
              href="/sporcular"
              className={`font-inter text-[13.5px] font-bold tracking-[0.03em] transition-colors duration-200
                ${scrolled ? "text-navy-dark/70 hover:text-navy-dark" : "text-white/60 hover:text-sky-light"}`}
            >
              Sporcular
            </a>
          </li>
        </ul>

        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(true)}
          aria-label="Menüyü aç"
        >
          <span className={`block w-6 h-0.5 transition-colors duration-300 ${scrolled ? "bg-navy-dark" : "bg-sky-light"}`} />
          <span className={`block w-6 h-0.5 transition-colors duration-300 ${scrolled ? "bg-navy-dark" : "bg-sky-light"}`} />
          <span className={`block w-6 h-0.5 transition-colors duration-300 ${scrolled ? "bg-navy-dark" : "bg-sky-light"}`} />
        </button>
      </nav>

      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobil menü"
          className="fixed inset-0 z-[60] overflow-y-auto bg-navy-deep/98 backdrop-blur-md flex flex-col items-center justify-start gap-8 px-6 py-20"
        >
          <button
            className="absolute top-6 right-6 text-sky-light text-3xl leading-none"
            onClick={() => setMenuOpen(false)}
            aria-label="Menüyü kapat"
          >
            ✕
          </button>
          {links.map((l) => (
            <a
              key={l.href}
              href={isHome ? l.href : `/${l.href}`}
              onClick={(e) => handleLink(e, l.href)}
              className="font-inter text-xl font-bold tracking-[0.03em] text-white/70 hover:text-sky-light transition-colors"
            >
              {l.label}
            </a>
          ))}

          {[
            { label: "Program", items: programLinks },
            { label: "Albüm", items: albumLinks },
          ].map((group) => (
            <div key={group.label} className="flex flex-col items-center gap-4">
              <span className="font-inter text-xl font-bold tracking-[0.03em] text-white/30">
                {group.label}
              </span>
              <div className="flex flex-col items-center gap-3">
                {group.items.map((a) => (
                  <a
                    key={a.label}
                    href={a.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-inter text-base font-bold tracking-[0.03em] text-white/70 hover:text-sky-light transition-colors"
                  >
                    {a.label}
                  </a>
                ))}
              </div>
            </div>
          ))}

          <a
            href="/yas-kategorileri"
            onClick={() => setMenuOpen(false)}
            className="font-inter text-xl font-bold tracking-[0.03em] text-white/70 hover:text-sky-light transition-colors"
          >
            Yaş Kategorileri
          </a>

          <a
            href="/tesislerimiz"
            onClick={() => setMenuOpen(false)}
            className="font-inter text-xl font-bold tracking-[0.03em] text-white/70 hover:text-sky-light transition-colors"
          >
            Tesislerimiz
          </a>

          <a
            href="/emegi-gecenler"
            onClick={() => setMenuOpen(false)}
            className="font-inter text-xl font-bold tracking-[0.03em] text-white/70 hover:text-sky-light transition-colors"
          >
            Emeği Geçenler
          </a>

          <a
            href="/basarilarimiz"
            onClick={() => setMenuOpen(false)}
            className="font-inter text-xl font-bold tracking-[0.03em] text-white/70 hover:text-sky-light transition-colors"
          >
            Başarılarımız
          </a>

          <a
            href="/sporcular"
            onClick={() => setMenuOpen(false)}
            className="font-inter text-xl font-bold tracking-[0.03em] text-white/70 hover:text-sky-light transition-colors"
          >
            Sporcular
          </a>
        </div>
      )}
    </>
  );
}
