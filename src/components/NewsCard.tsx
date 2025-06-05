
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";

interface NewsCardProps {
  title: string;
  source: string;
  date: string;
  content: string;
  reliability: "reliable" | "unreliable" | "neutral";
  reliabilityScore: number;
  category?: string;
}

const NewsCard = ({
  title,
  source,
  date,
  content,
  reliability,
  reliabilityScore,
  category,
}: NewsCardProps) => {
  const { language } = useLanguage();
  const t = translations[language];

  const getReliabilityColor = () => {
    if (reliability === "reliable") return "bg-reliable";
    if (reliability === "unreliable") return "bg-unreliable";
    return "bg-neutral";
  };

  const getReliabilityText = () => {
    if (reliability === "reliable") return t.reliable;
    if (reliability === "unreliable") return t.unreliable;
    return t.neutral;
  };

  const getProgressColor = () => {
    if (reliabilityScore >= 70) return "bg-reliable";
    if (reliabilityScore < 40) return "bg-unreliable";
    return "bg-neutral";
  };

  return (
    <Card className="news-card overflow-hidden transition-all hover:shadow-md">
      <div className={`h-1.5 w-full ${getReliabilityColor()}`}></div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold line-clamp-2">{title}</CardTitle>
          <Badge variant="outline" className="ml-2 whitespace-nowrap">
            {category || "News"}
          </Badge>
        </div>
        <CardDescription className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span>{source}</span>
          <span>•</span>
          <span>{date}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm line-clamp-3 mb-4">{content}</p>
        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span>{t.reliability}</span>
            <span className={`font-medium ${
              reliability === "reliable" 
                ? "text-reliable" 
                : reliability === "unreliable" 
                  ? "text-unreliable" 
                  : "text-neutral"
            }`}>
              {getReliabilityText()}
            </span>
          </div>
          <Progress 
            value={reliabilityScore} 
            max={100} 
            className={`h-2 ${getProgressColor()}`} 
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          {t.viewDetails}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewsCard;
