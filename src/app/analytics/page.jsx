"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AnalyticsPage() {
  const router = useRouter();
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedSolutions, setExpandedSolutions] = useState({});

  useEffect(() => {
    const data = localStorage.getItem('quizAnalytics');
    if (data) {
      setQuizData(JSON.parse(data));
    }
    setLoading(false);
  }, []);

  const toggleSolution = (questionId) => {
    setExpandedSolutions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const getDetailedSolution = (question) => {
    // Generate detailed solution based on the question and correct answer
    const correctOption = question.options[question.correctAnswer.charCodeAt(0) - 65];
    
    return {
      explanation: `The correct answer is option ${question.correctAnswer}: "${correctOption}". This is because it directly addresses the core concept being tested in this question.`,
      stepByStep: [
        "Identify the key concept being tested in the question",
        "Analyze each option carefully",
        `Option ${question.correctAnswer} is correct because it aligns with the fundamental principles`,
        "Eliminate incorrect options by identifying their flaws",
        "Confirm the answer by cross-referencing with learned concepts"
      ],
      whyOthersWrong: question.options.map((option, index) => {
        const optionLetter = String.fromCharCode(65 + index);
        if (optionLetter === question.correctAnswer) return null;
        return {
          option: optionLetter,
          text: option,
          reason: `This option is incorrect because it doesn't fully address the question's requirements or contains conceptual errors.`
        };
      }).filter(Boolean),
      keyPoints: [
        "Understanding the fundamental concept is crucial",
        "Always read all options before selecting",
        "Look for keywords that indicate the correct approach",
        "Practice similar questions to reinforce learning"
      ],
      relatedTopics: [`Advanced ${quizData?.topic}`, `Applications of ${quizData?.topic}`, `${quizData?.topic} in real life`]
    };
  };

  const getRemedyFeedback = (question, correctAnswer) => {
    const remedies = {
      'A': {
        weakness: "Conceptual understanding of fundamental principles",
        remedy: `Review the basic concepts of ${quizData?.topic}. Focus on understanding the core definitions and principles.`,
        preparation: "Study textbook chapters, practice conceptual questions, and use visual aids to understand the topic better."
      },
      'B': {
        weakness: "Application of theoretical knowledge to practical scenarios",
        remedy: `Practice applying ${quizData?.topic} concepts to real-world problems and scenarios.`,
        preparation: "Solve more application-based problems, work on case studies, and practice examples from daily life."
      },
      'C': {
        weakness: "Detailed knowledge and specific facts",
        remedy: `Focus on memorizing important facts, formulas, and specific details related to ${quizData?.topic}.`,
        preparation: "Create flashcards, practice recall exercises, and review detailed notes regularly."
      },
      'D': {
        weakness: "Analysis and critical thinking skills",
        remedy: `Develop analytical thinking skills by breaking down complex problems into smaller parts in ${quizData?.topic}.`,
        preparation: "Practice analytical questions, work on problem-solving techniques, and engage in critical thinking exercises."
      }
    };

    return remedies[correctAnswer] || remedies['A'];
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const goBack = () => {
    router.push('/assesment');
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">No Quiz Data Found</h1>
          <p className="text-gray-600 mb-6">Please generate a quiz first to view analytics.</p>
          <button
            onClick={goBack}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            Go Back to Quiz Generator
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Quiz Analytics</h1>
          <button
            onClick={goBack}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
          >
            ← Back to Quiz
          </button>
        </div>

        {/* Quiz Summary */}
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Quiz Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <p className="text-sm text-gray-500">Topic</p>
              <p className="font-bold text-lg text-gray-800">{quizData.topic}</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="text-sm text-gray-500">Class</p>
              <p className="font-bold text-lg text-gray-800">{quizData.class}</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="text-sm text-gray-500">Subject</p>
              <p className="font-bold text-lg text-gray-800">{quizData.subject}</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="text-sm text-gray-500">Difficulty</p>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(quizData.difficulty)}`}>
                {quizData.difficulty}
              </span>
            </div>
          </div>
        </div>

        {/* Question Analysis */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Question Analysis & Detailed Solutions</h2>
          
          {quizData.questions.map((question, index) => {
            const feedback = getRemedyFeedback(question, question.correctAnswer);
            const solution = getDetailedSolution(question);
            const isExpanded = expandedSolutions[question.id];
            
            return (
              <div key={question.id} className="border rounded-lg p-6 bg-gray-50">
                <div className="mb-4">
                  <h3 className="font-semibold text-lg mb-3 text-gray-800">
                    Question {index + 1}: {question.question}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    {['A', 'B', 'C', 'D'].map((option, optIndex) => (
                      <div 
                        key={option} 
                        className={`flex items-center space-x-3 p-3 rounded border ${
                          option === question.correctAnswer 
                            ? 'bg-green-100 border-green-300' 
                            : 'bg-white border-gray-200'
                        }`}
                      >
                        <span className={`font-medium ${
                          option === question.correctAnswer ? 'text-green-700' : 'text-blue-600'
                        }`}>
                          {option})
                        </span>
                        <span className="text-gray-700">
                          {question.options[optIndex] || `Option ${option}`}
                        </span>
                        {option === question.correctAnswer && (
                          <span className="text-green-600 font-bold">✓ Correct</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detailed Solution Section */}
                <div className="bg-white rounded-lg p-5 border-l-4 border-purple-500 mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-bold text-gray-800">🎯 Detailed Solution</h4>
                    <button
                      onClick={() => toggleSolution(question.id)}
                      className="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600 transition-colors"
                    >
                      {isExpanded ? 'Hide Solution' : 'Show Solution'}
                    </button>
                  </div>
                  
                  {isExpanded && (
                    <div className="space-y-4">
                      {/* Main Explanation */}
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h5 className="font-semibold text-green-800 mb-2">✅ Explanation</h5>
                        <p className="text-green-700 text-sm">{solution.explanation}</p>
                      </div>

                      {/* Step by Step Solution */}
                      {/* <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h5 className="font-semibold text-blue-800 mb-2">📝 Step-by-Step Solution</h5>
                        <ol className="text-blue-700 text-sm space-y-1">
                          {solution.stepByStep.map((step, stepIndex) => (
                            <li key={stepIndex} className="flex items-start">
                              <span className="font-bold mr-2">{stepIndex + 1}.</span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div> */}

                      {/* Why Other Options Are Wrong */}
                      {/* <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                        <h5 className="font-semibold text-red-800 mb-2">❌ Why Other Options Are Incorrect</h5>
                        <div className="space-y-2">
                          {solution.whyOthersWrong.map((wrongOption, wrongIndex) => (
                            <div key={wrongIndex} className="text-red-700 text-sm">
                              <span className="font-medium">Option {wrongOption.option}:</span> {wrongOption.reason}
                            </div>
                          ))}
                        </div>
                      </div> */}

                      {/* Key Learning Points */}
                      {/* <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <h5 className="font-semibold text-yellow-800 mb-2">💡 Key Learning Points</h5>
                        <ul className="text-yellow-700 text-sm space-y-1">
                          {solution.keyPoints.map((point, pointIndex) => (
                            <li key={pointIndex}>• {point}</li>
                          ))}
                        </ul>
                      </div> */}

                      {/* Related Topics */}
                      <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                        <h5 className="font-semibold text-indigo-800 mb-2">🔗 Related Topics to Study</h5>
                        <div className="flex flex-wrap gap-2">
                          {solution.relatedTopics.map((topic, topicIndex) => (
                            <span key={topicIndex} className="px-2 py-1 bg-indigo-200 text-indigo-800 rounded text-xs">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Learning Support Section */}
                <div className="bg-white rounded-lg p-5 border-l-4 border-blue-500">
                  <h4 className="font-bold text-gray-800 mb-3">📚 Learning Support</h4>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                      <h5 className="font-semibold text-red-800 mb-2">⚠️ Common Weakness</h5>
                      <p className="text-red-700 text-sm">{feedback.weakness}</p>
                    </div>
                    
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <h5 className="font-semibold text-yellow-800 mb-2">💡 Remedy Suggestion</h5>
                      <p className="text-yellow-700 text-sm">{feedback.remedy}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Overall Study Recommendations */}
        <div className="mt-8 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">📈 Overall Study Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-3">🎓 For Strong Performance</h3>
              <ul className="text-gray-700 text-sm space-y-2">
                <li>• Review all {quizData.questions.length} questions thoroughly</li>
                <li>• Study the detailed solutions provided for each question</li>
                <li>• Focus on understanding concepts rather than memorizing</li>
                <li>• Practice additional questions from the same topic</li>
                <li>• Teach the concept to someone else to reinforce learning</li>
              </ul>
            </div>
            
            <div className="bg-white p-5 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-3">📚 Next Steps</h3>
              <ul className="text-gray-700 text-sm space-y-2">
                <li>• Take another quiz on the same topic after studying</li>
                <li>• Explore related topics in {quizData.subject}</li>
                <li>• Practice the step-by-step approaches shown in solutions</li>
                <li>• Join study groups or online forums for discussion</li>
                <li>• Consult your teacher for personalized guidance</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mt-8">
          <button
            onClick={() => {
              // Expand all solutions before printing
              const allExpanded = {};
              quizData.questions.forEach(q => {
                allExpanded[q.id] = true;
              });
              setExpandedSolutions(allExpanded);
              setTimeout(() => window.print(), 500);
            }}
            className="px-6 py-3 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors"
          >
            🖨️ Print Complete Analytics
          </button>
          
          <button
            onClick={() => {
              const analyticsData = {
                ...quizData,
                timestamp: new Date().toISOString(),
                recommendations: "Complete analytics with detailed solutions generated"
              };
              const blob = new Blob([JSON.stringify(analyticsData, null, 2)], {type: 'application/json'});
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `${quizData.topic}_analytics_detailed.json`;
              a.click();
            }}
            className="px-6 py-3 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600 transition-colors"
          >
            ⬇️ Download Analytics (JSON)
          </button>

          <button
            onClick={() => {
              const expandAll = {};
              quizData.questions.forEach(q => {
                expandAll[q.id] = true;
              });
              setExpandedSolutions(expandAll);
            }}
            className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
          >
            📖 Show All Solutions
          </button>

          <button
            onClick={() => setExpandedSolutions({})}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
          >
            🔒 Hide All Solutions
          </button>
        </div>
      </div>
    </div>
  );
}