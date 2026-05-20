import Image from "next/image";

const quickLinks = [
  { href: "#hero",        label: "Anasayfa" },
  { href: "#hakkimizda", label: "Hakkımızda" },
  { href: "#branslar",   label: "Branşlarımız" },
  { href: "#iletisim",   label: "İletişim" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-deep border-t border-gold/10 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6 md:px-14">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.jpg"
                alt="Gerçek Kuzey Spor Kulübü"
                width={48}
                height={48}
                className="object-contain opacity-80"
              />
              <div className="flex flex-col leading-tight">
                <span className="font-cinzel text-sm font-bold tracking-[0.13em] uppercase text-white/80">
                  Gerçek Kuzey
                </span>
                <span className="text-[9px] tracking-[0.3em] uppercase text-white/35">
                  Spor Kulübü
                </span>
              </div>
            </div>
            <p className="text-[13px] text-white/40 leading-relaxed max-w-xs">
              Disiplin, takım ruhu ve fair play anlayışıyla sporun birleştirici gücünü yaşatıyoruz.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-cinzel font-bold text-xs tracking-[0.2em] uppercase text-white/60 mb-5">
              Hızlı Erişim
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-[13px] text-white/40 hover:text-gold transition-colors duration-200"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-cinzel font-bold text-xs tracking-[0.2em] uppercase text-white/60 mb-5">
              İletişim
            </h4>
            <ul className="space-y-3">
              <li className="text-[13px] text-white/40">info@gercekkuzeysk.com</li>
              <li className="text-[13px] text-white/40">Telefon bilgisi buraya gelecek</li>
              <li className="text-[13px] text-white/40">Tesis bilgisi buraya gelecek</li>
            </ul>
          </div>

        </div>

        {/* Divider + copyright */}
        <div className="border-t border-white/5 pt-7 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] tracking-[0.18em] text-white/25">
            © 2026 Gerçek Kuzey Spor Kulübü. Tüm hakları saklıdır.
          </p>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        </div>

      </div>
    </footer>
  );
}
