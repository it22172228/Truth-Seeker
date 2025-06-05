
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import NewsVerifier from "./NewsVerifier";
import ImageVerifier from "./ImageVerifier";
import CommunityReporting from "./CommunityReporting";
import PersonalFeed from "./PersonalFeed";
import EducationalMode from "./EducationalMode";
import EmergencyAlerts from "./EmergencyAlerts";
import BrowserExtensionSimulator from "./BrowserExtensionSimulator";
import { 
  FileText, 
  Image, 
  Users, 
  BookOpen, 
  AlertTriangle, 
  Globe, 
  Bookmark,
  BarChart3
} from "lucide-react";

const FeatureDashboard = () => {
  const [activeTab, setActiveTab] = useState("text-verify");

  const features = [
    {
      id: "text-verify",
      label: "Text Verification",
      icon: FileText,
      component: <NewsVerifier />,
      description: "Advanced AI-powered text fact-checking with sentiment analysis"
    },
    {
      id: "media-verify", 
      label: "Media Verification",
      icon: Image,
      component: <ImageVerifier />,
      description: "Deepfake detection and reverse image search"
    },
    {
      id: "community",
      label: "Community Reports",
      icon: Users,
      component: <CommunityReporting />,
      description: "Crowdsourced misinformation reporting and tracking"
    },
    {
      id: "personal",
      label: "Personal Feed", 
      icon: Bookmark,
      component: <PersonalFeed />,
      description: "Your saved articles and fact-check history"
    },
    {
      id: "education",
      label: "Learn Mode",
      icon: BookOpen,
      component: <EducationalMode />,
      description: "Interactive lessons to identify fake news"
    },
    {
      id: "emergency",
      label: "Emergency Alerts",
      icon: AlertTriangle,
      component: <EmergencyAlerts />,
      description: "Real-time crisis information verification"
    },
    {
      id: "extension",
      label: "Quick Checker",
      icon: Globe,
      component: <BrowserExtensionSimulator />,
      description: "Instant website credibility checking"
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">Truth Seeker Professional</h2>
        <p className="text-gray-600">Comprehensive AI-powered misinformation detection and verification platform</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 lg:grid-cols-7 mb-6">
          {features.map((feature) => (
            <TabsTrigger 
              key={feature.id} 
              value={feature.id}
              className="flex flex-col items-center gap-1 p-3 h-auto text-xs"
            >
              <feature.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{feature.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {features.map((feature) => (
          <TabsContent key={feature.id} value={feature.id} className="mt-6">
            <Card className="mb-4">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <feature.icon className="h-5 w-5" />
                  {feature.label}
                  <Badge variant="secondary">BETA</Badge>
                </CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
            
            <div className="space-y-6">
              {feature.component}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">🚀 Professional Features Available</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-blue-500" />
            <span>Advanced Analytics Dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-green-500" />
            <span>Browser Extension Integration</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-purple-500" />
            <span>WhatsApp/Telegram Bot</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <span>Real-time Monitoring</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-orange-500" />
            <span>API Access</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-teal-500" />
            <span>Educational Resources</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureDashboard;
