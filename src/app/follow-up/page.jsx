"use client";
import { useState, useEffect } from "react";
import { generateGeminiResponse } from "../../../configs/AImodel";
import { useRouter } from "next/navigation";

export default function FollowUpPage() {
  const router = useRouter();
  const [quizData, setQuizData] = useState(null);
  const [followUpContent, setFollowUpContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [contentGenerated, setContentGenerated] = useState(false);

  useEffect(() => {
    // Get quiz data from localStorage
    const storedData = localStorage.getItem('quizData');
    if (storedData) {
      const data = JSON.parse(storedData);
      setQuizData(data);
    } else {
      // Redirect back to quiz if no data found
      router.push('/assesment');
    }
  }, [router]);

  const generateFollowUpContent = async () => {
    if (!quizData) return;
    
    setLoading(true);
    try {
      const isAboveThreshold = quizData.score >= quizData.threshold;
      
      const prompt = isAboveThreshold 
        ? `The student scored ${quizData.score.toFixed(1)}% on a ${quizData.topic} quiz, which is above the ${quizData.threshold}% threshold. 

Please provide:
1. 4-5 ADVANCED topics related to ${quizData.topic} for further study
2. 4-5 HIGH-QUALITY learning resources (books, courses, websites, research papers)
3. 2-3 challenging project ideas or research questions

Format your response clearly with headings and brief descriptions for each item.`
        : `The student scored ${quizData.score.toFixed(1)}% on a ${quizData.topic} quiz, which is below the ${quizData.threshold}% threshold.

Please provide:
1. 4-5 FUNDAMENTAL concepts in ${quizData.topic} that need reinforcement
2. 4-5 BEGINNER-FRIENDLY learning resources (textbooks, online courses, videos, tutorials)
3. 2-3 simple practice exercises or study activities

Format your response clearly with headings and brief descriptions for each item.`;

      const result = await generateGeminiResponse(prompt);
      setFollowUpContent(result);
      setContentGenerated(true);
    } catch (err) {
      console.error("Error generating follow-up content:", err);
      setFollowUpContent("Sorry, there was an error generating personalized recommendations. Please try again.");
    }
    setLoading(false);
  };

  const goBackToQuiz = () => {
    localStorage.removeItem('quizData');
    router.push('/assesment');
  };

  const startNewQuiz = () => {
    localStorage.removeItem('quizData');
    router.push('/assesment');
  };

  if (!quizData) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Loading...</h1>
          <p className="text-gray-600">Getting your quiz results...</p>
        </div>
      </div>
    );
  }

  const isAboveThreshold = quizData.score >= quizData.threshold;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Personalized Learning Path
        </h1>
        
        {/* Quiz Summary */}
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-6 mb-8">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {quizData.topic} Quiz Results
            </h2>
            <div className="text-4xl font-bold mb-2 text-blue-600">
              {quizData.score.toFixed(1)}%
            </div>
            <div className={`inline-block px-4 py-2 rounded-full text-white font-medium ${
              isAboveThreshold ? 'bg-green-500' : 'bg-orange-500'
            }`}>
              {isAboveThreshold ? '🚀 Advanced Track' : '📚 Foundation Track'}
            </div>
          </div>
          
          <p className="text-center text-gray-700 text-lg">
            {isAboveThreshold 
              ? 'Excellent work! You\'ve demonstrated strong understanding and are ready for advanced concepts.'
              : 'Good effort! Let\'s strengthen your foundation with targeted learning resources.'
            }
          </p>
        </div>

        {/* Generate Content Section */}
        {!contentGenerated ? (
          <div className="text-center py-12">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {isAboveThreshold ? 'Ready for Advanced Learning?' : 'Need Some Extra Help?'}
              </h3>
              <p className="text-gray-600 mb-6">
                {isAboveThreshold 
                  ? 'Get personalized advanced topics and challenging resources to take your knowledge to the next level.'
                  : 'Get targeted learning resources and foundational concepts to improve your understanding.'
                }
              </p>
            </div>
            
            <button
              onClick={generateFollowUpContent}
              disabled={loading}
              className={`px-8 py-4 text-white rounded-lg font-medium transition-colors text-lg ${
                isAboveThreshold 
                  ? 'bg-green-500 hover:bg-green-600 disabled:bg-gray-400' 
                  : 'bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400'
              }`}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Generating Recommendations...
                </div>
              ) : (
                isAboveThreshold ? 'Get Advanced Resources' : 'Get Learning Help'
              )}
            </button>
          </div>
        ) : (
          /* Content Display */
          <div className="mb-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                {isAboveThreshold ? '🚀 Your Advanced Learning Path' : '📚 Your Foundation Building Plan'}
              </h3>
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {followUpContent}
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={goBackToQuiz}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            Back to Quiz Results
          </button>
          <button
            onClick={startNewQuiz}
            className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
          >
            Take New Quiz
          </button>
          {contentGenerated && (
            <button
              onClick={() => {
                setContentGenerated(false);
                setFollowUpContent("");
              }}
              className="px-6 py-3 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors"
            >
              Regenerate Content
            </button>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">💡 Study Tips:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {isAboveThreshold ? (
              <>
                <li>• Challenge yourself with research papers and advanced coursework</li>
                <li>• Join study groups or online communities for deeper discussions</li>
                <li>• Consider practical projects to apply your knowledge</li>
              </>
            ) : (
              <>
                <li>• Start with basic concepts before moving to complex topics</li>
                <li>• Practice regularly with simple exercises and examples</li>
                <li>• Don't hesitate to revisit fundamental principles</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
