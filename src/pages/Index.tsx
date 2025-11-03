
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import BusinessCardPreview from "@/components/BusinessCardPreview";
import ProfessionSelector from "@/components/ProfessionSelector";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <BusinessCardPreview />
        <ProfessionSelector />
      </main>
    </div>
  );
};

export default Index;
