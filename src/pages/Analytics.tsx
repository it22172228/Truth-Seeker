
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/lib/translations";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const Analytics = () => {
  const { language } = useLanguage();
  const t = translations[language];

  // Mock data - in real app, this would come from Supabase
  const weeklyData = [
    { day: "Mon", verified: 45, fake: 12 },
    { day: "Tue", verified: 52, fake: 8 },
    { day: "Wed", verified: 38, fake: 15 },
    { day: "Thu", verified: 61, fake: 10 },
    { day: "Fri", verified: 55, fake: 18 },
    { day: "Sat", verified: 42, fake: 6 },
    { day: "Sun", verified: 48, fake: 11 },
  ];

  const languageStats = [
    { name: "English", value: 45, color: "#0088FE" },
    { name: "සිංහල", value: 35, color: "#00C49F" },
    { name: "தமிழ்", value: 20, color: "#FFBB28" },
  ];

  const totalChecks = 1247;
  const accuracyRate = 94.2;
  const fakeNewsDetected = 156;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Track fake news detection performance and usage statistics
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Checks</CardTitle>
                <Badge variant="secondary">{totalChecks.toLocaleString()}</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalChecks.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Accuracy Rate</CardTitle>
                <Badge className="bg-reliable">{accuracyRate}%</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{accuracyRate}%</div>
                <Progress value={accuracyRate} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fake News Detected</CardTitle>
                <Badge className="bg-unreliable">{fakeNewsDetected}</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{fakeNewsDetected}</div>
                <p className="text-xs text-muted-foreground">-8% from last week</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Detection Trends</CardTitle>
                <CardDescription>
                  Verified vs fake news detection over the past week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Bar dataKey="verified" fill="#007bff" name="Verified" />
                    <Bar dataKey="fake" fill="#ff5252" name="Fake" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Language Distribution</CardTitle>
                <CardDescription>
                  News verification requests by language
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={languageStats}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {languageStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Detection Activity</CardTitle>
              <CardDescription>
                Latest news verification results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { time: "2 minutes ago", content: "Political news article verified", status: "reliable", language: "en" },
                  { time: "5 minutes ago", content: "Social media post flagged as fake", status: "unreliable", language: "si" },
                  { time: "12 minutes ago", content: "News report needs further verification", status: "neutral", language: "ta" },
                  { time: "18 minutes ago", content: "Economic update verified", status: "reliable", language: "en" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.content}</p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline">{item.language.toUpperCase()}</Badge>
                      <Badge 
                        className={`${
                          item.status === "reliable" 
                            ? "bg-reliable" 
                            : item.status === "unreliable" 
                              ? "bg-unreliable" 
                              : "bg-neutral"
                        } text-white`}
                      >
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Analytics;
