import Image from "next/image";

const quickLinks = [
  { href: "#hero",        label: "Anasayfa" },
  { href: "#hakkimizda", label: "Tarihçe" },
  { href: "#branslar",   label: "Branşlarımız" },
  { href: "#iletisim",   label: "İletişim" },
];

const socialLinks = [
  {
    label: "WhatsApp",
    href: "https://wa.me/905054024610",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-1.745-.872-2.888-1.557-4.036-3.53-.305-.524.305-.487.873-1.62.098-.198.05-.371-.05-.52-.099-.149-.669-1.611-.916-2.206-.241-.579-.487-.5-.67-.51-.173-.01-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.064 3.15 5.005 4.297 2.94 1.148 2.94.766 3.412.717.47-.05 1.758-.717 2.006-1.41.247-.694.247-1.288.173-1.41-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.946.555 3.832 1.604 5.464L2 22l4.706-1.65a9.913 9.913 0 0 0 5.333 1.55h.005c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.034-5.142-2.91-7.018A9.866 9.866 0 0 0 12.04 2zm0 18.155h-.004a8.222 8.222 0 0 1-4.193-1.15l-.3-.179-3.12 1.094 1.105-3.043-.196-.312a8.211 8.211 0 0 1-1.258-4.387c0-4.55 3.704-8.255 8.27-8.255 2.21 0 4.286.86 5.846 2.422a8.196 8.196 0 0 1 2.42 5.838c0 4.55-3.704 8.255-8.27 8.255z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.74 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.022 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.878h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.918 8.437-9.94z"/>
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com",
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy-deep border-t border-sky-light/10 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6 md:px-14">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Gerçek Kuzey Spor Kulübü"
                width={64}
                height={64}
                className="object-contain brightness-0 invert"
              />
              <div className="flex flex-col leading-tight">
                <span className="font-cinzel text-sm font-bold tracking-[0.13em] uppercase text-white">
                  Gerçek Kuzey
                </span>
                <span className="font-worksans text-[10px] font-semibold tracking-[0.3em] uppercase text-white/70">
                  Spor Kulübü
                </span>
              </div>
            </div>
            <p className="font-worksans text-[13px] font-medium text-white/65 leading-relaxed max-w-xs">
              Disiplin, takım ruhu ve fair play anlayışıyla sporun birleştirici gücünü yaşatıyoruz.
            </p>
          </div>

          <div>
            <h4 className="font-cinzel font-bold text-xs tracking-[0.2em] uppercase text-white/80 mb-5">
              Hızlı Erişim
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="font-worksans text-[13px] font-medium text-white/70 hover:text-sky-light transition-colors duration-200"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-cinzel font-bold text-xs tracking-[0.2em] uppercase text-white/80 mb-5">
              İletişim
            </h4>
            <ul className="space-y-3">
              <li className="font-worksans text-[13px] font-medium text-white/70">gkuzeyspor@hotmail.com</li>
              <li className="font-worksans text-[13px] font-medium text-white/70">+90 505 402 46 10</li>
              <li className="font-worksans text-[13px] font-medium text-white/70">Beşiktaş Çilekli Spor Tesisleri</li>
            </ul>
          </div>

          <div>
            <h4 className="font-cinzel font-bold text-xs tracking-[0.2em] uppercase text-white/80 mb-5">
              Web Tasarımı
            </h4>
            <ul className="space-y-3">
              <li className="font-worksans text-[13px] font-medium text-white/70">Arda Temelatan</li>
              <li className="font-worksans text-[13px] font-medium text-white/70">
                <a href="tel:+905303456195" className="hover:text-sky-light transition-colors duration-200">
                  +90 530 345 61 95
                </a>
              </li>
              <li className="font-worksans text-[13px] font-medium text-white/70">
                <a href="mailto:arda_temelatan@hotmail.com" className="hover:text-sky-light transition-colors duration-200">
                  arda_temelatan@hotmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/5 pt-7 flex flex-col sm:flex-row items-center justify-between gap-5">
          <p className="font-worksans text-[11px] font-medium tracking-[0.18em] text-white/70">
            © 2026 Gerçek Kuzey Spor Kulübü. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.04] border border-white/8 text-sky-light/80 hover:text-sky-light hover:bg-sky-light/[0.08] hover:border-sky-light/30 transition-colors duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
