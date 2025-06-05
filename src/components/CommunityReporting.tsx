
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Flag, Users, TrendingUp } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";

const CommunityReporting = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [reportContent, setReportContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const communityReports = [
    {
      id: 1,
      content: "False claim about election results circulating on WhatsApp",
      reports: 127,
      status: "verified-false",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      content: "Misleading health advice about COVID-19 treatments",
      reports: 89,
      status: "under-review",
      timestamp: "5 hours ago"
    },
    {
      id: 3,
      content: "Doctored image of government announcement",
      reports: 156,
      status: "verified-false",
      timestamp: "1 day ago"
    }
  ];

  const handleSubmitReport = async () => {
    if (!reportContent.trim()) return;
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setReportContent("");
    
    // Show success message
    console.log("Report submitted successfully");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified-false": return "bg-red-500";
      case "verified-true": return "bg-green-500";
      case "under-review": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flag className="h-5 w-5" />
            Report Suspicious Content
          </CardTitle>
          <CardDescription>
            Help the community by reporting potentially false or misleading information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste the suspicious content or describe what you found..."
            value={reportContent}
            onChange={(e) => setReportContent(e.target.value)}
            className="min-h-[100px]"
          />
          <Button 
            onClick={handleSubmitReport}
            disabled={!reportContent.trim() || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Community Reports
          </CardTitle>
          <CardDescription>
            Recent reports from the community that need verification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {communityReports.map((report) => (
              <div key={report.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <p className="text-sm flex-1">{report.content}</p>
                  <Badge className={`ml-2 ${getStatusColor(report.status)} text-white`}>
                    {report.status.replace("-", " ")}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {report.reports} reports
                  </span>
                  <span>{report.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunityReporting;
