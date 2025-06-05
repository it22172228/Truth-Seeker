
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Shield, Clock, MapPin } from "lucide-react";

const EmergencyAlerts = () => {
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    // Simulate real-time emergency alerts
    const mockAlerts = [
      {
        id: 1,
        type: "weather",
        title: "Flood Warning - Western Province",
        description: "Heavy rainfall expected. Avoid low-lying areas.",
        severity: "high",
        location: "Western Province",
        timestamp: "2025-06-05 14:30",
        verified: true,
        source: "Meteorology Department"
      },
      {
        id: 2,
        type: "health",
        title: "Health Advisory - Dengue Outbreak",
        description: "Increased dengue cases reported. Take preventive measures.",
        severity: "medium",
        location: "Colombo District",
        timestamp: "2025-06-05 10:15",
        verified: true,
        source: "Ministry of Health"
      },
      {
        id: 3,
        type: "security",
        title: "FAKE: Curfew Announcement",
        description: "No curfew has been declared. This is misinformation.",
        severity: "high",
        location: "Nationwide",
        timestamp: "2025-06-05 08:45",
        verified: false,
        source: "Fact-Check Team"
      }
    ];
    
    setAlerts(mockAlerts);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "weather": return "🌧️";
      case "health": return "🏥";
      case "security": return "🚨";
      default: return "⚠️";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Emergency & Crisis Alerts
        </CardTitle>
        <CardDescription>
          Real-time verification of emergency information and crisis alerts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <Alert key={alert.id} className={`border-l-4 ${
              alert.verified ? "border-l-green-500" : "border-l-red-500"
            }`}>
              <div className="flex items-start gap-3">
                <div className="text-2xl">{getTypeIcon(alert.type)}</div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-semibold">{alert.title}</h4>
                    <Badge className={`${getSeverityColor(alert.severity)} text-white`}>
                      {alert.severity.toUpperCase()}
                    </Badge>
                    <Badge variant={alert.verified ? "default" : "destructive"}>
                      {alert.verified ? "VERIFIED" : "FAKE"}
                    </Badge>
                  </div>
                  
                  <AlertDescription className="text-gray-700">
                    {alert.description}
                  </AlertDescription>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500 flex-wrap">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {alert.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {alert.timestamp}
                    </span>
                    <span className="flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      {alert.source}
                    </span>
                  </div>
                  
                  {!alert.verified && (
                    <div className="bg-red-50 p-3 rounded-lg">
                      <p className="text-red-800 text-sm font-medium">
                        ⚠️ This information has been flagged as false or misleading. 
                        Do not share or act on this information.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Alert>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Button variant="outline" size="sm">
            View All Emergency Alerts
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmergencyAlerts;
