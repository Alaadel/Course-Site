import NavHeader from "@/components/NavHeader";
import MostPopularSection from "@/components/MostPopularSection";
import NewestSection from "@/components/NewestSection";

export default function Home() {
  return (
    <>
      <h1>Home Page</h1>

      <NavHeader />

      <MostPopularSection />
      <NewestSection />
    </>
  );
}
