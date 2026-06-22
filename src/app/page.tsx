import Hero        from "@/components/Hero";
import Hakkimizda  from "@/components/Hakkimizda";
import Branslar    from "@/components/Branslar";
import PuanDurumu  from "@/components/PuanDurumu";
import Iletisim    from "@/components/Iletisim";

export default function Home() {
  return (
    <main>
      <Hero />
      <Hakkimizda />
      <Branslar />
      <PuanDurumu />
      <Iletisim />
    </main>
  );
}
