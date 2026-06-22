---
name: Gerçek Kuzey Spor Kulübü
description: Resmi lacivert-beyaz amatör spor kulübü tanıtım sitesi
colors:
  navy-deep: "#050d1a"
  navy-dark: "#003381"
  navy-mid: "#1a2a4a"
  navy-light: "#0d3b7a"
  floodlight-cyan: "#00eaff"
  floodlight-cyan-light: "#98cef0"
  floodlight-cyan-dim: "#2e6da3"
  ink-white: "#ffffff"
typography:
  display:
    fontFamily: "var(--font-cinzel), serif"
    fontSize: "clamp(26px, 4vw, 38px)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.04em"
  hero-display:
    fontFamily: "var(--font-worksans), sans-serif"
    fontSize: "clamp(26px, 5vw, 58px)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "0.01em"
  body:
    fontFamily: "var(--font-raleway), sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "var(--font-worksans), sans-serif"
    fontSize: "10px"
    fontWeight: 700
    letterSpacing: "0.5em"
spacing:
  section-y: "96px"
  section-y-lg: "128px"
  container-x: "24px"
components:
  button-primary:
    backgroundColor: "{colors.floodlight-cyan}"
    textColor: "{colors.navy-dark}"
    padding: "14px 40px"
  button-primary-hover:
    backgroundColor: "{colors.floodlight-cyan-light}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "ink-white/80"
    padding: "14px 40px"
  input-field:
    backgroundColor: "white/3%"
    textColor: "{colors.ink-white}"
    padding: "12px 16px"
---

# Design System: Gerçek Kuzey Spor Kulübü

## 1. Overview

**Creative North Star: "The Night Pitch"**

Bir amatör futbol sahasının gece antrenmanı: koyu lacivert gökyüzü, flood-ışığı gibi parlayan tek bir cyan vurgu, ve disiplinli, sade çizgilerle çevrili bir alan. Sistem resmi ve güvenilir durmak zorunda; jenerik bir SaaS ürünü veya pazarlama ajansı sitesi gibi görünmemeli. Her şey lacivert zemin üzerine kurulu; Floodlight Cyan yalnızca dikkat çekmesi gereken yerde (etiketler, ince çizgi vurguları, CTA) yakılır, asla zemin rengi olarak kullanılmaz.

Yoğunluk düşük: bol boşluk, tek sütun akışı, kart ızgaraları sade ve eşit aralıklı. Hareket var ama gösterişsiz: scroll-reveal ile sahneye giriş, hover'da ince çizgi animasyonu. Sistem bunu reddeder: degrade metin, glassmorphism, "hero-metric" şablonu, gold/altın'ın baskın renk olması.

**Key Characteristics:**
- Tek baskın zemin: lacivert (4 tonlu derinlik skalası)
- Tek vurgu rengi: Floodlight Cyan, sade ve seyrek kullanılan
- Düz yüzeyler, gölge yerine ince çizgi/border ile ayrım
- Scroll-reveal ile sahneye giriş, abartısız geçiş süreleri (0.65s)

## 2. Colors

Sistem tek renk ailesi üzerine kurulu: lacivert derinlik skalası + tek cyan vurgu. Gri/nötr ton yok; beyazın opaklık varyantları (white/5, white/10, white/30, white/55...) nötr rolü üstleniyor.

### Primary
- **Floodlight Cyan** (#00eaff): Etiketler (eyebrow), ince çizgi vurguları, CTA buton zemini, hover durumları, form focus halkası. Sayfanın `≤10%`'inden azında kullanılır; nadirliği önemlidir.

### Neutral
- **Navy Deep** (#050d1a): En koyu zemin; hero arka planının taban katmanı, Branşlar bölümü zemini.
- **Navy Dark** (#003381): Gövde (body) zemin rengi; Hakkımızda ve İletişim bölümleri.
- **Navy Mid** (#1a2a4a): Hover zemin tonu (kartlarda).
- **Navy Light** (#0d3b7a): Hero radial-gradient katmanında ikincil derinlik.
- **Ink White** (#ffffff): Birincil metin rengi, her zaman opaklık varyantıyla kademelenir (100/80/65/55/50/40/30/25/10/5/3).

### Named Rules
**The Single Accent Rule.** Floodlight Cyan tek vurgu rengidir; sayfada ikinci bir renk ailesi (gold, kırmızı, yeşil vb.) yok. Vurgu her zaman ince çizgi, etiket veya CTA biçiminde gelir, asla geniş bir yüzey doldurmaz.

## 3. Typography

**Display Font:** Cinzel (serif, var(--font-cinzel))
**Hero Display Font:** Work Sans (var(--font-worksans))
**Body Font:** Raleway (var(--font-raleway))
**Label Font:** Work Sans, geniş harf aralığıyla (0.5em)

**Character:** Cinzel başlıklarda resmi/kurumsal ağırlık verir; Work Sans hero'da ve etiketlerde modern/net bir karşı ses sağlar; Raleway gövde metninde okunabilirliği taşır. Üç ailenin hepsi farklı bir rol üstlenir, rekabet etmez.

### Hierarchy
- **Hero Display** (800, clamp(26px,5vw,58px), 1.1): Sadece Hero başlığı "Gerçek Kuzey / Spor Kulübü".
- **Display** (700, clamp(26px,4vw,38px), 1.2, harf aralığı 0.04em, büyük harf): Bölüm başlıkları (Hakkımızda, Branşlarımız, İletişim).
- **Title** (700, 16-18px, büyük harf, 0.06em): Kart başlıkları (değer kartları, branş kartları).
- **Body** (400, 14-15px, 1.6): Paragraf metni; satır uzunluğu max ~65ch ile sınırlı.
- **Label** (700, 9-11px, 0.3-0.5em, büyük harf): Eyebrow etiketler, form label'ları, küçük meta bilgiler.

### Named Rules
**The Three-Voice Rule.** Cinzel başlık için, Work Sans hero ve etiket için, Raleway gövde için: hiçbir rol bir diğerinin yerini almaz.

## 4. Elevation

Sistem düz (flat): hiçbir bileşende `box-shadow` kullanılmaz (logo'daki `drop-shadow-2xl` istisnası hariç). Derinlik gölge ile değil, lacivert tonları arasındaki kontrastla ve ince (1px/0.5px) çizgi sınırlarıyla verilir.

### Named Rules
**The Flat-By-Default Rule.** Kartlar ve yüzeyler gölgesiz durur; hover durumunda zemin tonu değişir (navy-mid) veya ince bir cyan çizgi genişler, gölge eklenmez.

## 5. Components

### Buttons
- **Shape:** Köşe yarıçapı yok (radius 0); dikdörtgen, kesin hatlı.
- **Primary:** Floodlight Cyan zemin, navy-dark metin, `14px 40px` padding, 11px büyük harf etiket, 0.28em harf aralığı.
- **Hover:** Zemin Floodlight Cyan Light'a açılır (`bg-sky-light`), 200ms geçiş.
- **Ghost (Secondary):** Şeffaf zemin, `white/30` border, `white/80` metin; hover'da border ve metin Floodlight Cyan'a döner.

### Cards
- **Corner Style:** Radius yok.
- **Background:** Şeffaf veya navy-dark; hover'da navy-mid.
- **Shadow Strategy:** Yok (bkz. Elevation). Ayrım `border border-white/6` ile sağlanır.
- **Border:** `white/6` ince çizgi, kart üstünde hover'da genişleyen `bg-sky` 0.5px çizgi.
- **Internal Padding:** 40px (`p-10`) değer kartlarında, 32px (`p-8`) Hakkımızda kartlarında.

### Inputs / Fields
- **Style:** `white/3%` zemin, `white/10` border, radius yok, `12px 16px` padding.
- **Focus:** Border Floodlight Cyan/50'ye döner, zemin hafif cyan tonuna (`sky/4%`) geçer; glow yok.
- **Placeholder:** `white/25`.

### Navigation
- **Style:** Sabit (fixed) üst bar; scroll öncesi şeffaf, scroll sonrası `navy-deep/95` + blur + `sky/10` alt border.
- **Typography:** Work Sans/Cinzel karışımı, 11px büyük harf linkler, 0.22em harf aralığı.
- **Hover/Active:** Metin Floodlight Cyan'a döner, alt çizgi soldan sağa genişler (`after` elementi).
- **Mobile:** Tam ekran overlay menü, `navy-deep/98` + blur zemin, ortalanmış büyük linkler.

## 6. Do's and Don'ts

PRODUCT.md'nin anti-referansları doğrudan burada geçerlidir: "Jenerik AI/SaaS landing page görünümü: aşırı gradient, abartılı animasyon, hero-metric şablonları, gereksiz glassmorphism."

### Do:
- **Do** Floodlight Cyan'ı seyrek kullan: etiket, ince çizgi, CTA. Asla geniş zemin.
- **Do** kartlarda ve bölümlerde flat yüzey + ince border kullan, gölge ekleme.
- **Do** her animasyona `prefers-reduced-motion: reduce` karşılığı tanımla (globals.css'de mevcut).
- **Do** üç font ailesini (Cinzel/Work Sans/Raleway) rolüne göre ayrı tut.

### Don't:
- **Don't** gradient metin (`background-clip: text` + gradient) kullan.
- **Don't** glassmorphism'i süsleme amaçlı ekle; sadece mobil menü overlay'inde blur var, başka yerde yok.
- **Don't** "hero-metric" şablonunu (büyük rakam + küçük etiket + gradient vurgu) kullan.
- **Don't** gold/altın rengi geri getir; marka kimliği artık tek vurgu olarak Floodlight Cyan'da sabitlendi.
- **Don't** kart köşelerine radius ekle; sistem kesin hatlı (radius 0) kalmalı.
