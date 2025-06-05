
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";

interface Result {
  reliability: string;
  reliabilityScore: number;
  sourceCredibility: number;
  factualConsistency: number;
  sentimentBias: number;
  language: string;
  summary: string;
  relatedFacts: {
    fact: string;
    verified: boolean;
  }[];
}

interface NewsVerifierResultProps {
  result: Result;
  onReset: () => void;
}

const NewsVerifierResult = ({ result, onReset }: NewsVerifierResultProps) => {
  const { language } = useLanguage();
  const t = translations[language];
  
  const getReliabilityColor = () => {
    if (result.reliability === "reliable") return "bg-reliable";
    if (result.reliability === "unreliable") return "bg-unreliable";
    return "bg-neutral";
  };

  const getReliabilityText = () => {
    if (result.reliability === "reliable") return t.reliable;
    if (result.reliability === "unreliable") return t.unreliable;
    return t.neutral;
  };
  
  const getScoreLabel = (score: number) => {
    if (score >= 70) return t.high;
    if (score >= 40) return t.medium;
    return t.low;
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-reliable";
    if (score < 40) return "text-unreliable";
    return "text-neutral";
  };
  
  const getProgressColor = (score: number) => {
    if (score >= 70) return "bg-reliable";
    if (score < 40) return "bg-unreliable";
    return "bg-neutral";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="ghost" size="sm" onClick={onReset} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          {t.checkNews}
        </Button>
        <Badge 
          className={`${
            result.reliability === "reliable" 
              ? "bg-reliable hover:bg-reliable/90" 
              : result.reliability === "unreliable" 
                ? "bg-unreliable hover:bg-unreliable/90" 
                : "bg-neutral hover:bg-neutral/90"
          } text-white`}
        >
          {getReliabilityText()}
        </Badge>
      </div>
      
      <div className={`${language === 'si' ? 'sinhala' : language === 'ta' ? 'tamil' : ''}`}>
        <h3 className="text-lg font-medium mb-1">{t.summary}</h3>
        <p className="text-sm text-muted-foreground mb-6">{result.summary}</p>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{t.analysis}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">{t.reliability}</span>
              <span className={`text-sm font-medium ${getScoreColor(result.reliabilityScore)}`}>
                {getScoreLabel(result.reliabilityScore)}
              </span>
            </div>
            <Progress value={result.reliabilityScore} max={100} className={`h-2 ${getProgressColor(result.reliabilityScore)}`} />
          </Card>
          
          <Card className="p-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">{t.sourceCredibility}</span>
              <span className={`text-sm font-medium ${getScoreColor(result.sourceCredibility)}`}>
                {getScoreLabel(result.sourceCredibility)}
              </span>
            </div>
            <Progress value={result.sourceCredibility} max={100} className={`h-2 ${getProgressColor(result.sourceCredibility)}`} />
          </Card>
          
          <Card className="p-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">{t.factualConsistency}</span>
              <span className={`text-sm font-medium ${getScoreColor(result.factualConsistency)}`}>
                {getScoreLabel(result.factualConsistency)}
              </span>
            </div>
            <Progress value={result.factualConsistency} max={100} className={`h-2 ${getProgressColor(result.factualConsistency)}`} />
          </Card>
          
          <Card className="p-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">{t.sentimentBias}</span>
              <span className={`text-sm font-medium ${getScoreColor(result.sentimentBias)}`}>
                {getScoreLabel(result.sentimentBias)}
              </span>
            </div>
            <Progress value={result.sentimentBias} max={100} className={`h-2 ${getProgressColor(result.sentimentBias)}`} />
          </Card>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-3">Related Facts</h3>
        <ul className="space-y-2">
          {result.relatedFacts.map((fact, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className={`mt-1 flex-shrink-0 w-4 h-4 rounded-full ${fact.verified ? 'bg-reliable' : 'bg-neutral'}`}></span>
              <span className="text-sm">{fact.fact}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NewsVerifierResult;
