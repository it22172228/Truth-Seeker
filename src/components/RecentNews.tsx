
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";
import NewsCard from "./NewsCard";

const RecentNews = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const news = [
    {
      id: 1,
      title: {
        en: "Government Announces New Economic Recovery Plan",
        si: "ආණ්ඩුව නව ආර්ථික ප්‍රකෘතිමත් කිරීමේ සැලැස්ම ප්‍රකාශයට පත් කරයි",
        ta: "அரசாங்கம் புதிய பொருளாதார மீட்புத் திட்டத்தை அறிவிக்கிறது"
      },
      source: "Lanka News",
      date: "2025-06-03",
      content: {
        en: "The government today announced a comprehensive economic recovery plan aimed at stabilizing the economy and reducing inflation over the next 12 months.",
        si: "රජය අද සම්පූර්ණ ආර්ථික ප්‍රකෘතිමත් කිරීමේ සැලැස්මක් ප්‍රකාශයට පත් කළේ, ඊළඟ මාස 12 තුළ ආර්ථිකය ස්ථාවර කිරීමටත්, උද්ධමනය අඩු කිරීමටත් අරමුණු කර ගනිමිනි.",
        ta: "அரசாங்கம் இன்று பொருளாதாரத்தை நிலைப்படுத்துவதற்கும், அடுத்த 12 மாதங்களில் பணவீக்கத்தைக் குறைப்பதற்கும் இலக்கு வைத்து விரிவான பொருளாதார மீட்பு திட்டத்தை அறிவித்தது."
      },
      reliability: "reliable",
      reliabilityScore: 85,
      category: "Economy"
    },
    {
      id: 2,
      title: {
        en: "Major Power Outage Affects Central Province",
        si: "මධ්‍යම පළාතට බලපාන ප්‍රධාන විදුලි බිඳ වැටීමක්",
        ta: "மத்திய மாகாணத்தை பாதிக்கும் பெரிய மின்வெட்டு"
      },
      source: "Daily Mirror",
      date: "2025-06-04",
      content: {
        en: "A major power outage has affected several districts in the Central Province following damage to a main transmission line. Engineers are working to restore power.",
        si: "ප්‍රධාන සම්ප්‍රේෂණ මාර්ගයකට සිදුවූ හානියකින් පසුව මධ්‍යම පළාතේ දිස්ත්‍රික්ක කිහිපයකට ප්‍රධාන විදුලි බිඳ වැටීමක් බලපා ඇත. ඉංජිනේරුවන් විදුලිය යථා තත්ත්වයට පත් කිරීමට කටයුතු කරමින් සිටිති.",
        ta: "ஒரு முக்கிய அனுப்புதல் கோட்டிற்கு சேதம் ஏற்பட்டதையடுத்து, மத்திய மாகாணத்தின் பல மாவட்டங்களில் பெரிய மின் துண்டிப்பு ஏற்பட்டுள்ளது. பொறியியலாளர்கள் மின்சாரத்தை மீட்டெடுக்க பணியாற்றி வருகின்றனர்."
      },
      reliability: "neutral",
      reliabilityScore: 60,
      category: "Infrastructure"
    },
    {
      id: 3,
      title: {
        en: "Famous Celebrity Reportedly Donated 50 Million to Charity",
        si: "ප්‍රසිද්ධ සුපිරි තරුවක් පුණ්‍යායතනයකට මිලියන 50ක් පරිත්‍යාග කළ බවට වාර්තා වේ",
        ta: "பிரபல நட்சத்திரம் தொண்டு நிறுவனத்திற்கு 50 மில்லியன் நன்கொடை அளித்ததாக தகவல்"
      },
      source: "Celebrity Gossip",
      date: "2025-06-02",
      content: {
        en: "According to social media reports, a famous Sri Lankan celebrity has donated 50 million rupees to a local charity. However, no official confirmation has been released.",
        si: "සමාජ මාධ්‍ය වාර්තා අනුව, ප්‍රසිද්ධ ශ්‍රී ලාංකික සුපිරි තරුවක් දේශීය පුණ්‍යායතනයකට රුපියල් මිලියන 50ක් පරිත්‍යාග කර ඇත. කෙසේ වෙතත්, නිල තහවුරු කිරීමක් නිකුත් කර නොමැත.",
        ta: "சமூக ஊடக அறிக்கைகளின்படி, பிரபல இலங்கை நட்சத்திரம் ஒரு உள்ளூர் தொண்டு நிறுவனத்திற்கு 50 மில்லியன் ரூபாய் நன்கொடை அளித்துள்ளார். இருப்பினும், அதிகாரப்பூர்வ உறுதிப்படுத்தல் எதுவும் வெளியிடப்படவில்லை."
      },
      reliability: "unreliable",
      reliabilityScore: 30,
      category: "Entertainment"
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{t.recentNews}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <NewsCard
            key={item.id}
            title={item.title[language]}
            source={item.source}
            date={item.date}
            content={item.content[language]}
            reliability={item.reliability as "reliable" | "unreliable" | "neutral"}
            reliabilityScore={item.reliabilityScore}
            category={item.category}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentNews;
