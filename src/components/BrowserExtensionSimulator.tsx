
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Globe, Shield, AlertCircle } from "lucide-react";

const BrowserExtensionSimulator = () => {
  const [url, setUrl] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<any>(null);

  const simulateQuickCheck = async () => {
    if (!url) return;
    
    setIsChecking(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate analysis result
    setResult({
      url,
      domain: new URL(url).hostname,
      trustScore: Math.floor(Math.random() * 100),
      sourceRating: Math.random() > 0.5 ? "trusted" : "questionable",
      contentFlags: {
        clickbait: Math.random() > 0.7,
        biased: Math.random() > 0.6,
        misleading: Math.random() > 0.8
      },
      recommendations: [
        "Cross-check with other sources",
        "Verify author credentials",
        "Check publication date"
      ]
    });
    
    setIsChecking(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Quick Website Checker
        </CardTitle>
        <CardDescription>
          Simulates a browser extension for instant website credibility checking
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="https://example.com/news-article"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1"
          />
          <Button 
            onClick={simulateQuickCheck}
            disabled={!url || isChecking}
          >
            {isChecking ? "Checking..." : "Quick Check"}
          </Button>
        </div>

        {result && (
          <div className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{result.domain}</h4>
                <p className="text-xs text-gray-500">{result.url}</p>
              </div>
              <Badge variant={result.sourceRating === "trusted" ? "default" : "destructive"}>
                {result.sourceRating}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Trust Score</span>
                <span className={result.trustScore > 70 ? "text-green-600" : result.trustScore > 40 ? "text-yellow-600" : "text-red-600"}>
                  {result.trustScore}/100
                </span>
              </div>
              <Progress value={result.trustScore} className="h-2" />
            </div>

            <div className="space-y-2">
              <h5 className="text-sm font-medium">Content Analysis</h5>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className={`p-2 rounded text-center ${result.contentFlags.clickbait ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}>
                  Clickbait: {result.contentFlags.clickbait ? "Yes" : "No"}
                </div>
                <div className={`p-2 rounded text-center ${result.contentFlags.biased ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}>
                  Biased: {result.contentFlags.biased ? "Yes" : "No"}
                </div>
                <div className={`p-2 rounded text-center ${result.contentFlags.misleading ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}>
                  Misleading: {result.contentFlags.misleading ? "Yes" : "No"}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="text-sm font-medium flex items-center gap-1">
                <Shield className="h-4 w-4" />
                Recommendations
              </h5>
              <ul className="text-xs space-y-1">
                {result.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="flex items-center gap-1">
                    <AlertCircle className="h-3 w-3 text-blue-500" />
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="text-xs text-gray-500 p-3 bg-gray-50 rounded">
          💡 This simulates a browser extension that would provide instant credibility checks as you browse the web.
        </div>
      </CardContent>
    </Card>
  );
};

export default BrowserExtensionSimulator;
