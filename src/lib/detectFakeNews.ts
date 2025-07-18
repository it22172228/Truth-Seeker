
// This is a simple simulation of fake news detection logic
// In a real application, this would connect to an API or use ML models

interface DetectionResult {
  reliability: "reliable" | "unreliable" | "neutral";
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

export const detectFakeNews = async (
  content: string, 
  contentType: string
): Promise<DetectionResult> => {
  // In a real application, this would send the content to a backend API
  // that uses NLP and ML to analyze the content
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Detect language (simplified)
  const language = detectLanguage(content);
  
  // Generate a fake result for demonstration purposes
  // In a real app, this would be the actual analysis from an AI model
  const reliabilityScore = Math.floor(Math.random() * 100);
  const reliability = reliabilityScore >= 70 
    ? "reliable" 
    : reliabilityScore < 40 
      ? "unreliable" 
      : "neutral";
      
  return {
    reliability,
    reliabilityScore,
    sourceCredibility: Math.floor(Math.random() * 100),
    factualConsistency: Math.floor(Math.random() * 100),
    sentimentBias: Math.floor(Math.random() * 100),
    language,
    summary: generateFakeSummary(content, language),
    relatedFacts: generateFakeRelatedFacts(),
  };
};

const detectLanguage = (text: string): string => {
  // Simple language detection based on character sets
  // In a real app, use a proper language detection library
  if (/[\u0D80-\u0DFF]/.test(text)) return "si"; // Sinhala Unicode range
  if (/[\u0B80-\u0BFF]/.test(text)) return "ta"; // Tamil Unicode range
  return "en"; // Default to English
};

const generateFakeSummary = (text: string, lang: string): string => {
  // In a real app, this would be an actual summary generated by an NLP model
  
  // Simplified example summaries for each language
  const summaries = {
    en: [
      "This appears to be a news article about politics and economic developments.",
      "The content discusses recent social events in the country.",
      "This text contains claims about government policies and their impacts.",
    ],
    si: [
      "මෙය දේශපාලන සහ ආර්ථික වර්ධනයන් පිළිබඳ පුවත් ලිපියක් බව පෙනේ.",
      "අන්තර්ගතය රටේ මෑත කාලීන සමාජ සිදුවීම් ගැන සාකච්ඡා කරයි.",
      "මෙම පෙළ රජයේ ප්‍රතිපත්ති සහ ඒවායේ බලපෑම් පිළිබඳ කරුණු අඩංගු වේ.",
    ],
    ta: [
      "இது அரசியல் மற்றும் பொருளாதார வளர்ச்சிகள் பற்றிய செய்திக் கட்டுரையாக தெரிகிறது.",
      "உள்ளடக்கம் நாட்டின் சமீபத்திய சமூக நிகழ்வுகளைப் பற்றி விவாதிக்கிறது.",
      "இந்த உரை அரசாங்கக் கொள்கைகள் மற்றும் அவற்றின் தாக்கங்கள் பற்றிய கூற்றுகளைக் கொண்டுள்ளது.",
    ]
  };
  
  // Select a random summary in the detected language
  const langSummaries = summaries[lang] || summaries.en;
  return langSummaries[Math.floor(Math.random() * langSummaries.length)];
};

const generateFakeRelatedFacts = () => {
  // In a real app, these would be actual related facts found by fact-checking
  const allFacts = [
    { fact: "Similar claims were previously debunked in 2023.", verified: true },
    { fact: "Official government data contradicts these statements.", verified: true },
    { fact: "The quoted source has published reliable information in the past.", verified: false },
    { fact: "This narrative has been circulating on social media for weeks without verification.", verified: true },
    { fact: "Independent experts have confirmed parts of this information.", verified: false },
    { fact: "This story contains misleading statistics according to fact-checkers.", verified: true },
    { fact: "The images used in this news have been altered or taken out of context.", verified: true },
  ];
  
  // Randomly select 3-5 facts
  const numFacts = Math.floor(Math.random() * 3) + 3;
  const shuffled = [...allFacts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numFacts);
};
