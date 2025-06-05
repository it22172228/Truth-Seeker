
export interface SentimentResult {
  sentiment: "positive" | "negative" | "neutral";
  confidence: number;
  emotionalTriggers: string[];
  biasIndicators: string[];
  manipulationScore: number;
}

export const analyzeSentiment = async (text: string): Promise<SentimentResult> => {
  // Simulate sentiment analysis API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simple keyword-based analysis for demonstration
  const positiveWords = ["great", "amazing", "wonderful", "excellent", "fantastic"];
  const negativeWords = ["terrible", "awful", "horrible", "disaster", "crisis"];
  const emotionalTriggers = ["shocking", "unbelievable", "urgent", "breaking", "exclusive"];
  const biasWords = ["always", "never", "obviously", "clearly", "everyone knows"];
  
  const words = text.toLowerCase().split(/\s+/);
  
  const positiveCount = words.filter(word => positiveWords.includes(word)).length;
  const negativeCount = words.filter(word => negativeWords.includes(word)).length;
  const triggerCount = words.filter(word => emotionalTriggers.some(trigger => word.includes(trigger))).length;
  const biasCount = words.filter(word => biasWords.some(bias => word.includes(bias))).length;
  
  let sentiment: "positive" | "negative" | "neutral";
  if (positiveCount > negativeCount) {
    sentiment = "positive";
  } else if (negativeCount > positiveCount) {
    sentiment = "negative";
  } else {
    sentiment = "neutral";
  }
  
  const confidence = Math.min(90, Math.max(60, (Math.abs(positiveCount - negativeCount) + 1) * 20));
  const manipulationScore = Math.min(100, (triggerCount + biasCount) * 15);
  
  return {
    sentiment,
    confidence,
    emotionalTriggers: words.filter(word => emotionalTriggers.some(trigger => word.includes(trigger))),
    biasIndicators: words.filter(word => biasWords.some(bias => word.includes(bias))),
    manipulationScore
  };
};

export const getSourceCredibility = async (source: string): Promise<{
  rating: "high" | "medium" | "low";
  score: number;
  factors: string[];
}> => {
  // Simulate source verification API
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock source ratings database
  const sourceRatings: { [key: string]: { rating: "high" | "medium" | "low"; score: number; factors: string[] } } = {
    "bbc": { rating: "high", score: 90, factors: ["Established reputation", "Editorial standards", "Fact-checking process"] },
    "reuters": { rating: "high", score: 92, factors: ["International news agency", "Editorial guidelines", "Source verification"] },
    "cnn": { rating: "medium", score: 75, factors: ["Major network", "Some bias", "Generally factual"] },
    "unknown": { rating: "low", score: 30, factors: ["Unverified source", "No editorial standards", "Unknown reputation"] }
  };
  
  const normalizedSource = source.toLowerCase().replace(/\s+/g, "");
  return sourceRatings[normalizedSource] || sourceRatings["unknown"];
};
