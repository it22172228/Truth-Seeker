
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Upload, AlertTriangle, Check, X } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";

const ImageVerifier = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setResult(null);
    }
  };

  const analyzeImage = async () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI image analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setResult({
      isAuthentic: Math.random() > 0.3,
      deepfakeScore: Math.floor(Math.random() * 100),
      reverseImageResults: [
        { source: "Getty Images", date: "2023-01-15", match: 95 },
        { source: "Reuters", date: "2023-01-15", match: 88 },
      ],
      metadata: {
        camera: "iPhone 14 Pro",
        location: "Colombo, Sri Lanka",
        timestamp: "2024-06-03 14:30:00",
        edited: Math.random() > 0.5
      }
    });
    
    setIsAnalyzing(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Image/Video Verification
        </CardTitle>
        <CardDescription>
          Upload images or videos to detect deepfakes and verify authenticity
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-medium">Click to upload media</p>
            <p className="text-sm text-gray-500">Supports images and videos up to 10MB</p>
          </label>
        </div>

        {selectedFile && (
          <div className="space-y-4">
            <Alert>
              <AlertDescription>
                Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </AlertDescription>
            </Alert>
            
            <Button onClick={analyzeImage} disabled={isAnalyzing} className="w-full">
              {isAnalyzing ? "Analyzing..." : "Verify Media"}
              {isAnalyzing && (
                <div className="ml-2 h-4 w-4 border-2 border-t-transparent rounded-full animate-spin"></div>
              )}
            </Button>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {result.isAuthentic ? (
                <Check className="h-5 w-5 text-green-500" />
              ) : (
                <X className="h-5 w-5 text-red-500" />
              )}
              <Badge variant={result.isAuthentic ? "default" : "destructive"}>
                {result.isAuthentic ? "Likely Authentic" : "Potentially Manipulated"}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Deepfake Detection Score</span>
                <span className={result.deepfakeScore > 70 ? "text-red-500" : "text-green-500"}>
                  {result.deepfakeScore}%
                </span>
              </div>
              <Progress value={result.deepfakeScore} className="h-2" />
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Reverse Image Search Results</h4>
              {result.reverseImageResults.map((match: any, index: number) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{match.source}</span>
                  <span>{match.match}% match</span>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Metadata Analysis</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Camera: {result.metadata.camera}</div>
                <div>Location: {result.metadata.location}</div>
                <div>Timestamp: {result.metadata.timestamp}</div>
                <div>Edited: {result.metadata.edited ? "Yes" : "No"}</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageVerifier;
