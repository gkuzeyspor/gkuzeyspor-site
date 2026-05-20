import Navbar      from "@/components/Navbar";
import Hero        from "@/components/Hero";
import Hakkimizda  from "@/components/Hakkimizda";
import Branslar    from "@/components/Branslar";
import Iletisim    from "@/components/Iletisim";
import Footer      from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Hakkimizda />
        <Branslar />
        <Iletisim />
      </main>
      <Footer />
    </>
  );
}
