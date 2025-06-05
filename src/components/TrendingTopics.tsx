
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";

const TrendingTopics = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const topics = [
    {
      name: {
        en: "Election Results",
        si: "මැතිවරණ ප්‍රතිඵල",
        ta: "தேர்தல் முடிவுகள்"
      },
      count: 245,
      factChecked: 67,
    },
    {
      name: {
        en: "Economic Crisis",
        si: "ආර්ථික අර්බුදය",
        ta: "பொருளாதார நெருக்கடி"
      },
      count: 187,
      factChecked: 54,
    },
    {
      name: {
        en: "Flood Warning",
        si: "ගංවතුර අනතුරු ඇඟවීම",
        ta: "வெள்ள எச்சரிக்கை"
      },
      count: 156,
      factChecked: 89,
    },
    {
      name: {
        en: "COVID-19 Updates",
        si: "COVID-19 යාවත්කාලීන",
        ta: "COVID-19 புதுப்பிப்புகள்"
      },
      count: 134,
      factChecked: 72,
    },
    {
      name: {
        en: "Fuel Prices",
        si: "ඉන්ධන මිල",
        ta: "எரிபொருள் விலைகள்"
      },
      count: 122,
      factChecked: 43,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.trendingTopics}</CardTitle>
        <CardDescription className="text-sm">{t.factCheckedNews}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {topics.map((topic, index) => (
            <li key={index} className="flex items-center justify-between">
              <div className={`flex items-center gap-2 ${language === 'si' ? 'sinhala' : language === 'ta' ? 'tamil' : ''}`}>
                <span className="text-sm font-medium">{topic.name[language]}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {topic.count} <span className="sr-only">articles</span>
                </Badge>
                <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
                  {topic.factChecked} <span className="sr-only">fact checked</span>
                </Badge>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default TrendingTopics;
