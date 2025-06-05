import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import NewsVerifierResult from "./NewsVerifierResult";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";
import { analyzeSentiment, getSourceCredibility } from "@/lib/sentimentAnalysis";

const NewsVerifier = () => {
  const { language } = useLanguage();
  const t = translations[language];
  
  const [newsContent, setNewsContent] = useState("");
  const [contentType, setContentType] = useState("newsArticle");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleVerify = async () => {
    if (!newsContent.trim()) return;
    
    setIsAnalyzing(true);
    
    try {
      // Perform sentiment analysis and source credibility check
      const sentimentResult = await analyzeSentiment(newsContent);
      const sourceResult = await getSourceCredibility("example source");
      
      // Simulate comprehensive analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Calculate overall reliability based on multiple factors
      const baseScore = Math.floor(Math.random() * 100);
      const sentimentPenalty = sentimentResult.manipulationScore > 50 ? 20 : 0;
      const sourcePenalty = sourceResult.score < 70 ? 15 : 0;
      
      const finalScore = Math.max(0, baseScore - sentimentPenalty - sourcePenalty);
      
      setResult({
        reliability: finalScore >= 70 ? "reliable" : finalScore < 40 ? "unreliable" : "neutral",
        reliabilityScore: finalScore,
        sourceCredibility: sourceResult.score,
        factualConsistency: Math.floor(Math.random() * 100),
        sentimentBias: sentimentResult.manipulationScore,
        language: detectLanguage(newsContent),
        summary: generateFakeSummary(newsContent),
        relatedFacts: generateFakeRelatedFacts(),
        sentimentAnalysis: sentimentResult,
        sourceAnalysis: sourceResult,
      });
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const detectLanguage = (text: string) => {
    if (/[\u0D80-\u0DFF]/.test(text)) return "si";
    if (/[\u0B80-\u0BFF]/.test(text)) return "ta";
    return "en";
  };

  const generateFakeSummary = (text: string) => {
    const languages = {
      en: "This appears to be a news article about current events with potential bias indicators detected.",
      si: "මෙය වර්තමාන සිදුවීම් පිළිබඳ පුවත් ලිපියක් බව පෙනේ, පක්ෂපාතී දර්ශක හඳුනාගත හැකිය.",
      ta: "இது நடப்பு நிகழ்வுகள் பற்றிய செய்திக் கட்டுரையாக தெரிகிறது, சாத்தியமான சார்பு குறிகாட்டிகள் கண்டறியப்பட்டுள்ளன."
    };
    
    const detectedLang = detectLanguage(text);
    return languages[detectedLang] || languages.en;
  };

  const generateFakeRelatedFacts = () => {
    return [
      { fact: "Similar claims were previously debunked in 2023.", verified: true },
      { fact: "Official sources contradict these statements.", verified: true },
      { fact: "This narrative contains emotional manipulation tactics.", verified: true },
    ];
  };

  const resetAnalysis = () => {
    setResult(null);
    setNewsContent("");
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>{t.factCheck}</CardTitle>
        <CardDescription>{t.checkNews}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="content">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="content">{t.contentType}</TabsTrigger>
            <TabsTrigger value="url">URL</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="space-y-4">
            {result ? (
              <NewsVerifierResult result={result} onReset={resetAnalysis} />
            ) : (
              <>
                <Textarea
                  placeholder={t.enterNews}
                  className="min-h-[150px]"
                  value={newsContent}
                  onChange={(e) => setNewsContent(e.target.value)}
                />
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">{t.contentType}</h4>
                  <RadioGroup 
                    defaultValue="newsArticle" 
                    value={contentType}
                    onValueChange={setContentType}
                    className="flex flex-wrap gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="newsArticle" id="newsArticle" />
                      <Label htmlFor="newsArticle">{t.newsArticle}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="socialMedia" id="socialMedia" />
                      <Label htmlFor="socialMedia">{t.socialMedia}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="messageForward" id="messageForward" />
                      <Label htmlFor="messageForward">{t.messageForward}</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                {newsContent.trim() && (
                  <Alert>
                    <AlertDescription className="flex gap-1 text-sm">
                      {detectLanguage(newsContent) === "en" ? (
                        <>Detected language: <span className="font-medium">English</span></>
                      ) : detectLanguage(newsContent) === "si" ? (
                        <>භාෂාව: <span className="font-medium sinhala">සිංහල</span></>
                      ) : (
                        <>மொழி: <span className="font-medium tamil">தமிழ்</span></>
                      )}
                    </AlertDescription>
                  </Alert>
                )}
              </>
            )}
          </TabsContent>
          
          <TabsContent value="url" className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="https://example.com/news/article"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button>{t.checkNow}</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      {!result && (
        <CardFooter className="flex justify-end">
          <Button 
            onClick={handleVerify}
            disabled={!newsContent.trim() || isAnalyzing}
            className="gap-2"
          >
            {isAnalyzing ? t.loading : t.analyzeContent}
            {isAnalyzing && (
              <div className="h-4 w-4 border-2 border-t-transparent rounded-full animate-spin"></div>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default NewsVerifier;
