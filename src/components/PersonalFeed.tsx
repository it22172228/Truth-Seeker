
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bookmark, Clock, Star } from "lucide-react";
import NewsCard from "./NewsCard";
import { useLanguage } from "@/hooks/useLanguage";

const PersonalFeed = () => {
  const { language } = useLanguage();
  const [savedArticles, setSavedArticles] = useState<any[]>([]);
  const [factCheckHistory, setFactCheckHistory] = useState<any[]>([]);

  useEffect(() => {
    // Load saved articles and history from localStorage
    const saved = JSON.parse(localStorage.getItem("saved-articles") || "[]");
    const history = JSON.parse(localStorage.getItem("fact-check-history") || "[]");
    setSavedArticles(saved);
    setFactCheckHistory(history);
  }, []);

  const sampleSavedArticles = [
    {
      id: 1,
      title: {
        en: "Verified: New Infrastructure Development Plan",
        si: "සත්‍යාපිත: නව යටිතල පහසුකම් සංවර්ධන සැලැස්ම",
        ta: "சரிபார்க்கப்பட்டது: புதிய உள்கட்டமைப்பு வளர்ச்சித் திட்டம்"
      },
      source: "Government Portal",
      date: "2025-06-04",
      content: {
        en: "Official announcement of infrastructure development with verified budget allocations.",
        si: "සත්‍යාපිත අයවැය වෙන්කිරීම් සහිත යටිතල පහසුකම් සංවර්ධනයේ නිල නිවේදනය.",
        ta: "சரிபார்க்கப்பட்ட பட்ஜெட் ஒதுக்கீடுகளுடன் உள்கட்டமைப்பு மேம்பாட்டின் அதிகாரப்பூர்வ அறிவிப்பு."
      },
      reliability: "reliable" as const,
      reliabilityScore: 92,
      category: "Politics",
      savedAt: "2025-06-04"
    }
  ];

  const sampleHistory = [
    {
      id: 1,
      content: "Economic recovery plan details",
      result: "reliable",
      score: 85,
      checkedAt: "2025-06-03 15:30"
    },
    {
      id: 2,
      content: "Celebrity donation claim",
      result: "unreliable",
      score: 25,
      checkedAt: "2025-06-03 10:15"
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bookmark className="h-5 w-5" />
            Saved Articles
          </CardTitle>
          <CardDescription>
            Your bookmarked verified news articles
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sampleSavedArticles.length > 0 ? (
            <div className="grid gap-4">
              {sampleSavedArticles.map((article) => (
                <NewsCard
                  key={article.id}
                  title={article.title[language]}
                  source={article.source}
                  date={article.date}
                  content={article.content[language]}
                  reliability={article.reliability}
                  reliabilityScore={article.reliabilityScore}
                  category={article.category}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">
              No saved articles yet. Bookmark articles to see them here.
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Fact-Check History
          </CardTitle>
          <CardDescription>
            Your recent fact-checking activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sampleHistory.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.content}</p>
                  <p className="text-xs text-gray-500">{item.checkedAt}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={
                    item.result === "reliable" ? "default" : 
                    item.result === "unreliable" ? "destructive" : "secondary"
                  }>
                    {item.score}%
                  </Badge>
                  <Star className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalFeed;
