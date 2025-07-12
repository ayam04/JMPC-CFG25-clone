"use client";
import { useState, useEffect } from "react";
import { generateGeminiResponse } from "../../../configs/AImodel";
import jsPDF from 'jspdf';
import { useRouter } from "next/navigation";
import Header from "@/components/navbar/header";
// import Header from "@/components/Header";

// Complete syllabus data
const SYLLABUS_DATA = {
  "Class 6": {
    "Mathematics": [
      "Divisibility", "The Use of Letters in Place of Numbers", "Order of Operations and the Use of Brackets",
      "Point, Line, Plane", "Angles", "Pairs of Angles", "Indices", "Natural Numbers and Whole Numbers",
      "Decimal Fractions – Division", "Squares and Square Roots", "Ratio and Proportion", "Perimeter",
      "Profit and Loss", "Integers", "Equations in One Variable", "Algebraic Expressions", "Simple Interest",
      "Percentage", "Triangles", "Properties of Triangles", "Geometric Constructions", "Area", "Bar Graphs",
      "Volume", "Circle"
    ],
    "General Science": [
      "Our Natural Resources", "Diversity in Living Things and their Classification", "Disaster Management",
      "The Living World", "Substances in Daily Use", "Substances in the Surroundings – Their States and Properties",
      "Nutrition and Diet", "Our Skeletal System and the Skin", "Motion and Types of Motion",
      "Characteristics and Classification of Living Things", "Parts of Plants and their Structure",
      "Force and Types of Force", "Work and Energy", "Simple Machines", "Measurement & Estimates of Measurements",
      "Sound", "Methods of Separating Substances", "Organ Systems", "Our Environment",
      "Our Earth and its Special Features", "Social Environment"
    ]
  },
  "Class 7": {
    "Science": [
      "Natural Resources", "Water – A Natural Resource", "Food and Protection of Food", "Properties of Water",
      "Acids, Bases and Salts", "Control and Co-ordination", "Health and Disease", "Food and Nutrition",
      "Circulation of Blood", "Reproduction in Living Things", "The Organisation of Living Things",
      "Electric Charge", "Sound – Production of Sound", "Propagation of Sound", "Classification of Substances",
      "Transmission of Heat", "Effects of Heat", "Propagation of Light"
    ],
    "Mathematics": [
      "Indices", "Variation", "Averages", "Properties of Triangles", "Theorem of Pythagoras",
      "Construction of Triangles", "Equations in One Variable", "Product Of Algebraic Expressions",
      "Factors of Algebraic Expressions", "Quadrilaterals", "Types of Quadrilaterals",
      "Construction of Quadrilaterals", "Rational Numbers", "Operations on Rational Numbers",
      "Simple Interest", "Profit and Loss", "Area", "Identity", "Circle", "Congruence",
      "Volume and Surface Area", "Joint Bar Graphs"
    ]
  },
  "Class 8": {
    "Mathematics": [
      "Irrational and Real Numbers", "Square and Square Root", "Quadrilateral", "Parallel Lines",
      "Area", "The Circle", "The Circumference and Area Of A Circle", "Statistics", "Identities",
      "Variation and Proportion", "Equations in One Variable", "Indices", "Cubes and Cube Roots",
      "Construction of Quadrilaterals", "Arc of a Circle", "Compound Interest", "Polynomials",
      "Joint Bar Graphs", "Discount and Commission", "Volume and Surface Area", "Factors of polynomials",
      "Division of Polynomials"
    ],
    "General Science": [
      "Living World and Classification of Microbes", "Health and Diseases", "Force and Pressure",
      "Current Electricity and Magnetism", "Inside the Atom", "Composition of Matter", "Metals and Nonmetals",
      "Pollution", "Disaster Management", "Cell and Cell Organelles", "Human Body and Organ System",
      "Introduction to Acid and Base", "Chemical Change and Chemical Bond", "Measurement and Effects of Heat",
      "Sound", "Reflection of Light", "Man made Materials", "Ecosystems", "Life Cycle of Stars"
    ]
  }
};

const DIFFICULTY_LEVELS = ["Easy", "Medium", "Hard"];
const LANGUAGE_OPTIONS = [
  { value: "english", label: "English" },
  { value: "marathi", label: "मराठी (Marathi)" },
  { value: "both", label: "Both (English + मराठी)" }
];

export default function QuizPage() {
  const router = useRouter();
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quizGenerated, setQuizGenerated] = useState(false);
  
  // Speech-related state
  const [speechSupported, setSpeechSupported] = useState(true);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentSpeakingQuestion, setCurrentSpeakingQuestion] = useState(null);
  const [speechSettings, setSpeechSettings] = useState({
    rate: 0.8,
    pitch: 1.0,
    volume: 1.0,
    autoSpeak: false
  });

  // Initialize speech synthesis
  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setSpeechSupported(false);
      return;
    }

    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      console.log('Available voices:', availableVoices.map(v => `${v.name} - ${v.lang}`));
      
      // Filter for Marathi/Hindi voices
      const marathiVoices = availableVoices.filter(voice => 
        voice.lang.startsWith('mr') || 
        voice.lang.startsWith('hi') || 
        voice.name.toLowerCase().includes('marathi') ||
        voice.name.toLowerCase().includes('hindi') ||
        voice.lang.startsWith('en-IN') // Indian English voices often work well for Marathi
      );
      
      setVoices(marathiVoices);
      
      if (marathiVoices.length > 0) {
        // Prefer Marathi voices first, then Hindi, then Indian English
        const preferredVoice = marathiVoices.find(v => v.lang.startsWith('mr')) ||
                               marathiVoices.find(v => v.lang.startsWith('hi')) ||
                               marathiVoices[0];
        setSelectedVoice(preferredVoice);
      }
    };

    loadVoices();
    
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Speech functions
  const speakText = (text, language = 'mr-IN') => {
    if (!speechSupported || !text.trim()) return;

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    utterance.rate = speechSettings.rate;
    utterance.pitch = speechSettings.pitch;
    utterance.volume = speechSettings.volume;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentSpeakingQuestion(null);
    };
    utterance.onerror = (event) => {
      console.error('Speech error:', event);
      setIsSpeaking(false);
      setCurrentSpeakingQuestion(null);
    };

    speechSynthesis.speak(utterance);
  };

  const speakQuestion = (question, questionIndex) => {
    if (!speechSupported) {
      alert('Speech synthesis is not supported in this browser');
      return;
    }

    setCurrentSpeakingQuestion(questionIndex);
    
    let textToSpeak = '';
    
    // Determine what text to speak based on language selection
    if (selectedLanguage === 'marathi') {
      textToSpeak = `प्रश्न क्रमांक ${questionIndex + 1}. ${question.question}. `;
      textToSpeak += 'पर्याय: ';
      question.options.forEach((option, idx) => {
        textToSpeak += `${String.fromCharCode(2309 + idx)}. ${option}. `;
      });
    } else if (selectedLanguage === 'both' && question.marathiQuestion) {
      textToSpeak = `प्रश्न क्रमांक ${questionIndex + 1}. ${question.marathiQuestion}. `;
      textToSpeak += 'पर्याय: ';
      if (question.marathiOptions && question.marathiOptions.length > 0) {
        question.marathiOptions.forEach((option, idx) => {
          textToSpeak += `${String.fromCharCode(2309 + idx)}. ${option}. `;
        });
      } else {
        question.options.forEach((option, idx) => {
          textToSpeak += `${String.fromCharCode(2309 + idx)}. ${option}. `;
        });
      }
    } else {
      // For English, still try to speak in Marathi if possible
      textToSpeak = `प्रश्न क्रमांक ${questionIndex + 1}. ${question.question}. `;
      textToSpeak += 'पर्याय: ';
      question.options.forEach((option, idx) => {
        textToSpeak += `${String.fromCharCode(2309 + idx)}. ${option}. `;
      });
    }

    speakText(textToSpeak, 'mr-IN');
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
    setCurrentSpeakingQuestion(null);
  };

  const speakAllQuestions = () => {
    if (!speechSupported || questions.length === 0) return;

    let allText = selectedLanguage === 'marathi' ? 'संपूर्ण प्रश्नमंजुषा. ' : 'संपूर्ण प्रश्नमंजुषा. ';
    
    questions.forEach((question, index) => {
      if (selectedLanguage === 'marathi') {
        allText += `प्रश्न क्रमांक ${index + 1}. ${question.question}. `;
        allText += 'पर्याय: ';
        question.options.forEach((option, idx) => {
          allText += `${String.fromCharCode(2309 + idx)}. ${option}. `;
        });
      } else if (selectedLanguage === 'both' && question.marathiQuestion) {
        allText += `प्रश्न क्रमांक ${index + 1}. ${question.marathiQuestion}. `;
        allText += 'पर्याय: ';
        if (question.marathiOptions && question.marathiOptions.length > 0) {
          question.marathiOptions.forEach((option, idx) => {
            allText += `${String.fromCharCode(2309 + idx)}. ${option}. `;
          });
        }
      } else {
        allText += `प्रश्न क्रमांक ${index + 1}. ${question.question}. `;
        allText += 'पर्याय: ';
        question.options.forEach((option, idx) => {
          allText += `${String.fromCharCode(2309 + idx)}. ${option}. `;
        });
      }
      allText += ' ';
    });

    speakText(allText, 'mr-IN');
  };

  const generateQuiz = async () => {
    if (!selectedTopic || !selectedDifficulty || !selectedLanguage) {
      alert("Please select topic, difficulty level, and language");
      return;
    }
    
    setLoading(true);
    try {
      let languageInstruction = "";
      
      if (selectedLanguage === "marathi") {
        languageInstruction = `Generate the entire quiz in Marathi language (मराठी भाषेत). All questions and options should be in proper Marathi script with correct grammar and vocabulary. Use formal Marathi suitable for educational content. Ensure the Marathi text is clear and pronounceable for text-to-speech systems.`;
      } else if (selectedLanguage === "both") {
        languageInstruction = `Generate a bilingual quiz with each question in both English and Marathi. Format each question as follows:
        
English: [English question]
मराठी: [Marathi translation]

Options should also be in both languages for each option. Ensure Marathi translations are accurate and suitable for speech synthesis.`;
      } else {
        languageInstruction = "Generate the entire quiz in clear, proper English language suitable for educational purposes.";
      }

      const prompt = `${languageInstruction}

Generate a ${selectedDifficulty.toLowerCase()} level quiz on "${selectedTopic}" for ${selectedClass} students with exactly 10 multiple choice questions only. 

${selectedLanguage === "both" ? `
Format the response for bilingual content as follows:

1. English: [English Question text]
   मराठी: [Marathi Question text]
A) English: [English Option 1] | मराठी: [Marathi Option 1]
B) English: [English Option 2] | मराठी: [Marathi Option 2] 
C) English: [English Option 3] | मराठी: [Marathi Option 3]
D) English: [English Option 4] | मराठी: [Marathi Option 4]
CORRECT: A

` : `
Format the response as follows:

1. [Question text]
A) [Option 1]
B) [Option 2] 
C) [Option 3]
D) [Option 4]
CORRECT: A

`}

[Continue for questions 2-10]

Make the questions educational and appropriate for ${selectedClass} level. Focus only on multiple choice questions - no subjective questions. ${selectedLanguage === "marathi" || selectedLanguage === "both" ? "Ensure Marathi translations are accurate, grammatically correct, use appropriate educational terminology, and are suitable for text-to-speech pronunciation." : ""}`;

      const result = await generateGeminiResponse(prompt);
      parseQuizData(result);
      setQuizGenerated(true);
    } catch (err) {
      console.error("Error generating quiz:", err);
      alert("Error generating quiz. Please try again.");
    }
    setLoading(false);
  };

  const parseQuizData = (response) => {
    const lines = response.split('\n').filter(line => line.trim());
    const parsedQuestions = [];
    let currentQuestion = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      const questionMatch = line.match(/^(\d+)\.\s*(.+)/);
      if (questionMatch) {
        if (currentQuestion) {
          parsedQuestions.push(currentQuestion);
        }
        
        const questionNum = parseInt(questionMatch[1]);
        let questionText = questionMatch[2];
        
        let marathiQuestion = '';
        if (selectedLanguage === "both") {
          if (questionText.includes('English:')) {
            questionText = questionText.replace('English:', '').trim();
          }
          if (i + 1 < lines.length && lines[i + 1].includes('मराठी:')) {
            marathiQuestion = lines[i + 1].replace('मराठी:', '').trim();
            i++;
          }
        }
        
        currentQuestion = {
          id: questionNum,
          type: 'mcq',
          question: questionText,
          marathiQuestion: marathiQuestion,
          options: [],
          marathiOptions: [],
          correctAnswer: ''
        };
      }
      else if (currentQuestion && /^[A-D]\)/.test(line)) {
        let optionText = line.substring(2).trim();
        let marathiOption = '';
        
        if (selectedLanguage === "both" && optionText.includes('|')) {
          const parts = optionText.split('|');
          if (parts.length >= 2) {
            optionText = parts[0].replace('English:', '').trim();
            marathiOption = parts[1].replace('मराठी:', '').trim();
          }
        }
        
        currentQuestion.options.push(optionText);
        if (marathiOption) {
          currentQuestion.marathiOptions.push(marathiOption);
        }
      }
      else if (line.startsWith('CORRECT:')) {
        if (currentQuestion) {
          currentQuestion.correctAnswer = line.split(':')[1].trim();
        }
      }
    }
    
    if (currentQuestion) {
      parsedQuestions.push(currentQuestion);
    }

    if (parsedQuestions.length < 10) {
      const fallbackQuestions = createFallbackQuestions();
      setQuestions(fallbackQuestions);
    } else {
      setQuestions(parsedQuestions);
    }
  };

  const createFallbackQuestions = () => {
    const questions = [];
    
    for (let i = 1; i <= 10; i++) {
      const baseQuestion = {
        id: i,
        type: 'mcq',
        question: `Question ${i} about ${selectedTopic}?`,
        marathiQuestion: selectedLanguage === "both" || selectedLanguage === "marathi" ? `${selectedTopic} संबंधित प्रश्न ${i}?` : '',
        options: [
          `Option A for question ${i}`,
          `Option B for question ${i}`,
          `Option C for question ${i}`,
          `Option D for question ${i}`
        ],
        marathiOptions: selectedLanguage === "both" || selectedLanguage === "marathi" ? [
          `प्रश्न ${i} साठी पर्याय अ`,
          `प्रश्न ${i} साठी पर्याय ब`,
          `प्रश्न ${i} साठी पर्याय क`,
          `प्रश्न ${i} साठी पर्याय ड`
        ] : [],
        correctAnswer: 'A'
      };
      
      if (selectedLanguage === "marathi") {
        baseQuestion.question = baseQuestion.marathiQuestion;
        baseQuestion.options = baseQuestion.marathiOptions;
        baseQuestion.marathiQuestion = '';
        baseQuestion.marathiOptions = [];
      }
      
      questions.push(baseQuestion);
    }
    return questions;
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    let yPosition = 20;

    doc.setFont("helvetica");
    doc.setFontSize(16);
    
    const quizTitle = `Quiz: ${selectedTopic}`;
    doc.text(quizTitle, 20, yPosition);
    yPosition += 10;
    doc.setFontSize(12);
    
    const headerText = `Class: ${selectedClass} | Subject: ${selectedSubject} | Difficulty: ${selectedDifficulty}`;
    doc.text(headerText, 20, yPosition);
    yPosition += 20;

    questions.forEach((question, index) => {
      if (yPosition > pageHeight - 60) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(11);
      
      let questionText = `${index + 1}. ${question.question}`;
      
      const splitQuestion = doc.splitTextToSize(questionText, 170);
      doc.text(splitQuestion, 20, yPosition);
      yPosition += splitQuestion.length * 5 + 5;

      question.options.forEach((option, optIndex) => {
        let optionText = `${String.fromCharCode(65 + optIndex)}) ${option}`;
        
        const splitOption = doc.splitTextToSize(optionText, 160);
        doc.text(splitOption, 30, yPosition);
        yPosition += splitOption.length * 5 + 2;
      });
      
      yPosition += 10;
    });

    doc.addPage();
    yPosition = 20;
    doc.setFontSize(14);
    const answerKeyTitle = 'Answer Key';
    doc.text(answerKeyTitle, 20, yPosition);
    yPosition += 15;
    
    doc.setFontSize(11);
    questions.forEach((question, index) => {
      const answerText = `${index + 1}. ${question.correctAnswer}`;
      doc.text(answerText, 20, yPosition);
      yPosition += 8;
    });

    const filename = `${selectedTopic}_Quiz.pdf`;
    doc.save(filename);
  };

  const checkAnalytics = () => {
    const quizData = {
      topic: selectedTopic,
      class: selectedClass,
      subject: selectedSubject,
      difficulty: selectedDifficulty,
      language: selectedLanguage,
      questions: questions
    };
    localStorage.setItem('quizAnalytics', JSON.stringify(quizData));
    router.push('/analytics');
  };

  const resetQuiz = () => {
    stopSpeaking();
    setSelectedClass('');
    setSelectedSubject('');
    setSelectedTopic('');
    setSelectedDifficulty('');
    setSelectedLanguage('english');
    setQuestions([]);
    setQuizGenerated(false);
  };

  const getSubjects = () => {
    return selectedClass ? Object.keys(SYLLABUS_DATA[selectedClass] || {}) : [];
  };

  const getTopics = () => {
    return (selectedClass && selectedSubject) ? SYLLABUS_DATA[selectedClass][selectedSubject] || [] : [];
  };

  const getUIText = (englishText, marathiText) => {
    if (selectedLanguage === 'marathi') return marathiText;
    if (selectedLanguage === 'both') return `${englishText} / ${marathiText}`;
    return englishText;
  };

  return (
    <>
    <Header/>
    <div>
      {/* <Header /> */}

      <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
            {getUIText("Educational Quiz Generator", "शैक्षणिक प्रश्नमंजुषा जनरेटर")} 🎤
          </h1>
          
          {/* Speech Settings Panel */}
          {speechSupported && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 mb-6 border border-green-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                🗣️ {getUIText("Speech Settings", "आवाज सेटिंग्स")}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {voices.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {getUIText("Voice", "आवाज")}
                    </label>
                    <select
                      value={selectedVoice?.name || ''}
                      onChange={(e) => {
                        const voice = voices.find(v => v.name === e.target.value);
                        setSelectedVoice(voice);
                      }}
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                    >
                      {voices.map((voice, index) => (
                        <option key={index} value={voice.name}>
                          {voice.name} ({voice.lang})
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {getUIText("Speed", "वेग")}: {speechSettings.rate}
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={speechSettings.rate}
                    onChange={(e) => setSpeechSettings(prev => ({...prev, rate: parseFloat(e.target.value)}))}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {getUIText("Pitch", "स्वर")}: {speechSettings.pitch}
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={speechSettings.pitch}
                    onChange={(e) => setSpeechSettings(prev => ({...prev, pitch: parseFloat(e.target.value)}))}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {getUIText("Volume", "आवाज")}: {speechSettings.volume}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={speechSettings.volume}
                    onChange={(e) => setSpeechSettings(prev => ({...prev, volume: parseFloat(e.target.value)}))}
                    className="w-full"
                  />
                </div>
              </div>
              
              {voices.length === 0 && (
                <div className="mt-2 p-2 bg-yellow-100 border border-yellow-300 rounded text-sm text-yellow-800">
                  ⚠️ {getUIText("No Marathi voices detected. System will use default voice.", "कोणतेही मराठी आवाज आढळले नाहीत. सिस्टम डिफॉल्ट आवाज वापरेल.")}
                </div>
              )}
            </div>
          )}
          
          {!quizGenerated ? (
            <div className="space-y-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {getUIText("Class", "वर्ग")}
                  </label>
                  <select
                    value={selectedClass}
                    onChange={(e) => {
                      setSelectedClass(e.target.value);
                      setSelectedSubject('');
                      setSelectedTopic('');
                    }}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">{getUIText("Select Class", "वर्ग निवडा")}</option>
                    {Object.keys(SYLLABUS_DATA).map(cls => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {getUIText("Subject", "विषय")}
                  </label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => {
                      setSelectedSubject(e.target.value);
                      setSelectedTopic('');
                    }}
                    disabled={!selectedClass}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  >
                    <option value="">{getUIText("Select Subject", "विषय निवडा")}</option>
                    {getSubjects().map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {getUIText("Topic", "विषय")}
                  </label>
                  <select
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    disabled={!selectedSubject}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  >
                    <option value="">{getUIText("Select Topic", "विषय निवडा")}</option>
                    {getTopics().map(topic => (
                      <option key={topic} value={topic}>{topic}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {getUIText("Difficulty", "कठीणता")}
                  </label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">{getUIText("Select Difficulty", "कठीणता निवडा")}</option>
                    {DIFFICULTY_LEVELS.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {getUIText("Language", "भाषा")}
                  </label>
                  <select
                    value={selectedLanguage}
                    onChange={e => setSelectedLanguage(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {LANGUAGE_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 mt-8 justify-center">
                <button
                  onClick={generateQuiz}
                  disabled={loading || !selectedClass || !selectedSubject || !selectedTopic || !selectedDifficulty || !selectedLanguage}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold shadow hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {loading ? getUIText("Generating Quiz...", "प्रश्नमंजुषा तयार होत आहे...") : getUIText("Generate Quiz", "प्रश्नमंजुषा तयार करा")}
                </button>
                <button
                  onClick={resetQuiz}
                  className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-300 transition"
                >
                  {getUIText("Reset", "रीसेट करा")}
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-8">
              <div className="flex flex-wrap gap-4 mb-6 justify-center">
                <button
                  onClick={speakAllQuestions}
                  disabled={isSpeaking}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-green-600 disabled:opacity-50 transition"
                >
                  {getUIText("🔊 Read All", "🔊 सर्व वाचा")}
                </button>
                <button
                  onClick={stopSpeaking}
                  disabled={!isSpeaking}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-red-600 disabled:opacity-50 transition"
                >
                  {getUIText("⏹️ Stop Reading", "⏹️ वाचन थांबवा")}
                </button>
                <button
                  onClick={downloadPDF}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-yellow-600 transition"
                >
                  {getUIText("Download PDF", "PDF डाउनलोड करा")}
                </button>
                <button
                  onClick={checkAnalytics}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-600 transition"
                >
                  {getUIText("Check Analytics", "विश्लेषण पहा")}
                </button>
                <button
                  onClick={resetQuiz}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold shadow hover:bg-gray-300 transition"
                >
                  {getUIText("New Quiz", "नवीन प्रश्नमंजुषा")}
                </button>
              </div>

              <div className="space-y-8">
                {questions.map((question, index) => (
                  <div key={question.id} className="border rounded-lg p-6 bg-gray-50 shadow">
                    <h3 className="font-semibold text-lg mb-4 text-gray-800 flex items-center gap-2">
                      {index + 1}. {question.question}
                      <button
                        className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm"
                        onClick={() => speakText(question.question, selectedLanguage === "marathi" ? "mr-IN" : "en-US")}
                        title="Listen in selected language"
                      >
                        🔊 Listen
                      </button>
                    </h3>
                    {selectedLanguage === 'both' && question.marathiQuestion && (
                      <div className="text-blue-600 mt-2 flex items-center gap-2">
                        <span>मराठी: {question.marathiQuestion}</span>
                        <button
                          className="ml-2 px-2 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 text-sm"
                          onClick={() => speakText(question.marathiQuestion, "mr-IN")}
                          title="मराठीत ऐका"
                        >
                          🔊 ऐका
                        </button>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                      {[0,1,2,3].map(optIdx => (
                        <div key={optIdx} className="flex flex-col space-y-2 p-3 bg-white rounded border">
                          <div className="flex items-center space-x-3">
                            <span className="font-medium text-blue-600">{String.fromCharCode(65 + optIdx)})</span>
                            <span className="text-gray-700">{question.options[optIdx] || `Option ${String.fromCharCode(65 + optIdx)}`}</span>
                            <button
                              className="ml-2 px-2 py-1 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 text-xs"
                              onClick={() => speakText(question.options[optIdx], selectedLanguage === "marathi" ? "mr-IN" : "en-US")}
                              title="Listen"
                            >
                              🔊
                            </button>
                          </div>
                          {selectedLanguage === 'both' && question.marathiOptions && question.marathiOptions[optIdx] && (
                            <div className="flex items-center space-x-3 text-sm">
                              <span className="font-medium text-purple-600">{String.fromCharCode(65 + optIdx)})</span>
                              <span className="text-gray-600">{question.marathiOptions[optIdx]}</span>
                              <button
                                className="ml-2 px-2 py-1 bg-purple-50 text-purple-700 rounded hover:bg-purple-100 text-xs"
                                onClick={() => speakText(question.marathiOptions[optIdx], "mr-IN")}
                                title="मराठी ऐका"
                              >
                                🔊
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-sm text-green-600 font-medium">
                      {getUIText('Correct Answer: ', 'योग्य उत्तर: ')}{question.correctAnswer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}