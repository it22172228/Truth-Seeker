
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, CheckCircle, XCircle, Lightbulb } from "lucide-react";

const EducationalMode = () => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const lessons = [
    {
      title: "Identifying Fake Headlines",
      content: "Look for sensational language, ALL CAPS, and emotional trigger words.",
      example: "SHOCKING: Government SECRETLY Plans to Control Everything!",
      question: "What makes this headline suspicious?",
      options: [
        "Uses emotional language and ALL CAPS",
        "Contains specific facts and sources",
        "Written in professional tone",
        "Includes verified quotes"
      ],
      correct: 0,
      explanation: "Fake news often uses sensational language, ALL CAPS, and emotional triggers to grab attention without providing factual content."
    },
    {
      title: "Checking Sources",
      content: "Always verify the source of information. Look for author credentials and publication reputation.",
      example: "According to anonymous sources close to the matter...",
      question: "Why is this source citation problematic?",
      options: [
        "It provides too much detail",
        "Anonymous sources can't be verified",
        "It's from a government official",
        "It includes direct quotes"
      ],
      correct: 1,
      explanation: "Anonymous sources make it impossible to verify the credibility of the information or check if the source actually exists."
    },
    {
      title: "Reverse Image Searching",
      content: "Images can be taken out of context or digitally manipulated. Always verify visual content.",
      example: "A photo showing crowds at an event might be from a different time or place.",
      question: "What should you do when you see a suspicious image?",
      options: [
        "Share it immediately if it looks real",
        "Use reverse image search to find the original",
        "Trust it if it's on social media",
        "Ignore the image completely"
      ],
      correct: 1,
      explanation: "Reverse image search helps you find the original source and context of an image, revealing if it's been misused."
    }
  ];

  const handleAnswer = (selectedIndex: number) => {
    if (answered) return;
    
    setAnswered(true);
    if (selectedIndex === lessons[currentLesson].correct) {
      setScore(score + 1);
    }
  };

  const nextLesson = () => {
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
      setAnswered(false);
    }
  };

  const resetLessons = () => {
    setCurrentLesson(0);
    setScore(0);
    setAnswered(false);
  };

  const lesson = lessons[currentLesson];
  const progress = ((currentLesson + (answered ? 1 : 0)) / lessons.length) * 100;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Learn to Spot Fake News
        </CardTitle>
        <CardDescription>
          Interactive lessons to help you identify misinformation
        </CardDescription>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress: Lesson {currentLesson + 1} of {lessons.length}</span>
            <span>Score: {score}/{lessons.length}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">{lesson.title}</h3>
          <p className="text-gray-600 mb-4">{lesson.content}</p>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-800">Example:</p>
                <p className="text-yellow-700 italic">"{lesson.example}"</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3">{lesson.question}</h4>
          <div className="space-y-2">
            {lesson.options.map((option, index) => (
              <Button
                key={index}
                variant={
                  answered 
                    ? index === lesson.correct 
                      ? "default" 
                      : "outline"
                    : "outline"
                }
                className={`w-full text-left justify-start ${
                  answered && index === lesson.correct 
                    ? "bg-green-100 border-green-500 text-green-800" 
                    : answered && index !== lesson.correct 
                      ? "bg-red-50 border-red-200" 
                      : ""
                }`}
                onClick={() => handleAnswer(index)}
                disabled={answered}
              >
                <div className="flex items-center gap-2">
                  {answered && index === lesson.correct && <CheckCircle className="h-4 w-4" />}
                  {answered && index !== lesson.correct && <XCircle className="h-4 w-4" />}
                  {option}
                </div>
              </Button>
            ))}
          </div>
        </div>

        {answered && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800">
              <strong>Explanation:</strong> {lesson.explanation}
            </p>
          </div>
        )}

        <div className="flex justify-between">
          <Button variant="outline" onClick={resetLessons}>
            Restart Course
          </Button>
          {answered && (
            <Button 
              onClick={nextLesson}
              disabled={currentLesson >= lessons.length - 1}
            >
              {currentLesson >= lessons.length - 1 ? "Course Complete!" : "Next Lesson"}
            </Button>
          )}
        </div>

        {currentLesson >= lessons.length - 1 && answered && (
          <div className="text-center">
            <Badge variant="default" className="text-lg px-4 py-2">
              Final Score: {score}/{lessons.length}
            </Badge>
            <p className="mt-2 text-gray-600">
              {score === lessons.length 
                ? "Perfect! You're ready to spot fake news!" 
                : score >= lessons.length * 0.7 
                  ? "Great job! Keep practicing to improve further." 
                  : "Keep learning! Review the lessons to improve your skills."}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EducationalMode;
