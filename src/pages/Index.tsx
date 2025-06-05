
import { LanguageProvider } from "@/hooks/useLanguage";
import Header from "@/components/Header";
import FeatureDashboard from "@/components/FeatureDashboard";
import TrendingTopics from "@/components/TrendingTopics";
import RecentNews from "@/components/RecentNews";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Truth Seeker Lanka Lens
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            AI-powered multilingual fake news detection for English, Sinhala, and Tamil
          </p>
        </div>

        <div className="space-y-12">
          <FeatureDashboard />
          <TrendingTopics />
          <RecentNews />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
