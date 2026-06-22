import Hero        from "@/components/Hero";
import Hakkimizda  from "@/components/Hakkimizda";
import Branslar    from "@/components/Branslar";
import PuanDurumu  from "@/components/PuanDurumu";
import Iletisim    from "@/components/Iletisim";
import HashScrollCleaner from "@/components/HashScrollCleaner";

export default function Home() {
  return (
    <main>
      <HashScrollCleaner />
      <Hero />
      <Hakkimizda />
      <Branslar />
      <PuanDurumu />
      <Iletisim />
    </main>
  );
}
