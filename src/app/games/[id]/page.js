'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Volume2, Play, Pause, Video, BookOpen, X } from 'lucide-react';
import Link from 'next/link';
import { games } from '@/data/games';

export default function GameDetailsPage() {
  const params = useParams();
  const gameId = parseInt(params.id);
  const game = games.find(g => g.id === gameId);

  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewMode, setViewMode] = useState('steps'); // 'steps' or 'video'
  const [showVideoModal, setShowVideoModal] = useState(false);

  if (!game) {
    return (
      <div className="min-h-screen bg-orange-25 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Game not found</h1>
          <Link href="/">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              Back to Games
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const steps = [
    {
      title: "Game Overview",
      content: game.description,
      marathi: `हा गेम ${game.subject} विषयासाठी आहे. ${game.description}`
    },
    {
      title: "Materials Needed",
      content: game.materials,
      marathi: `या गेमसाठी आवश्यक साहित्य: ${game.materials}`
    },
    ...game.howToPlay.map((step, index) => ({
      title: `Step ${index + 1}`,
      content: step,
      marathi: `पायरी ${index + 1}: ${step}`
    })),
    {
      title: "Ready to Play!",
      content: "You're all set! Have fun playing the game.",
      marathi: "तुम्ही तयार आहात! गेम खेळण्यात मजा करा!"
    }
  ];

  // Sample video URL - replace with actual tutorial video URLs
  const tutorialVideoUrl = `https://www.youtube.com/embed/5YPSfaEGTQ0?rel=0&modestbranding=1&autoplay=0`;

  // Function to get game route based on game ID
  const getGameRoute = (gameId) => {
    const gameRoutes = {
      1: '/math-lightning-round',
      5: '/science-charades', 
      13: '/country-identifier-challenge'
    };
    return gameRoutes[gameId] || `/games/${gameId}/play`;
  };

  const handleVoiceover = async (text) => {
    if ('speechSynthesis' in window) {
      setIsPlaying(true);
      
      // Stop any current speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Try to set Marathi voice if available
      const voices = window.speechSynthesis.getVoices();
      const marathiVoice = voices.find(voice => 
        voice.lang.includes('mr') || voice.lang.includes('hi')
      );
      
      if (marathiVoice) {
        utterance.voice = marathiVoice;
      }
      
      utterance.lang = 'mr-IN'; // Marathi language code
      utterance.rate = 0.8;
      utterance.pitch = 1;
      
      utterance.onend = () => {
        setIsPlaying(false);
      };
      
      utterance.onerror = () => {
        setIsPlaying(false);
        console.log('Speech synthesis error');
      };
      
      window.speechSynthesis.speak(utterance);
    } else {
      console.log('Speech synthesis not supported');
    }
  };

  const stopVoiceover = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      stopVoiceover();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      stopVoiceover();
    }
  };

  // Load voices when component mounts
  useEffect(() => {
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };
    
    if ('speechSynthesis' in window) {
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      stopVoiceover();
    };
  }, []);

  const VideoModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">Tutorial Video - {game.title}</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowVideoModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        <div className="aspect-video">
          <iframe
            src={tutorialVideoUrl}
            className="w-full h-full"
            allowFullScreen
            title={`${game.title} Tutorial`}
            frameBorder="0"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-orange-25">
      {/* Header */}
      <div className="bg-orange-500 p-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/games" className="inline-flex items-center gap-2 text-white hover:text-orange-100 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Games
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">{game.title}</h1>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-white text-orange-700">
              {game.grade}
            </Badge>
            <Badge variant="secondary" className="bg-orange-200 text-orange-800">
              {game.subject}
            </Badge>
            <Badge variant="secondary" className="bg-orange-100 text-orange-600">
              {game.duration}
            </Badge>
          </div>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="max-w-4xl mx-auto p-6 pb-4">
        <div className="flex gap-2 mb-6">
          <Button
            variant={viewMode === 'steps' ? 'default' : 'outline'}
            onClick={() => setViewMode('steps')}
            className={viewMode === 'steps' 
              ? 'bg-orange-500 hover:bg-orange-600 text-white' 
              : 'border-orange-300 text-orange-600 hover:bg-orange-100'
            }
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Step-by-Step Guide
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowVideoModal(true)}
            className="border-orange-300 text-orange-600 hover:bg-orange-100"
          >
            <Video className="w-4 h-4 mr-2" />
            Watch Tutorial Video
          </Button>
        </div>
      </div>

      {/* Main Content - Steps View */}
      {viewMode === 'steps' && (
        <div className="max-w-4xl mx-auto px-6 pb-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Step {currentStep + 1} of {steps.length}
              </h2>
              <div className="text-sm text-gray-600">
                Progress: {Math.round(((currentStep + 1) / steps.length) * 100)}%
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-orange-100 rounded-full h-2">
              <div 
                className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Step Card */}
          <Card className="mb-6 border-orange-200">
            <CardHeader className="bg-orange-50">
              <CardTitle className="text-orange-800 flex items-center justify-between">
                {steps[currentStep].title}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => isPlaying ? stopVoiceover() : handleVoiceover(steps[currentStep].marathi)}
                    className="border-orange-300 text-orange-600 hover:bg-orange-100"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    {isPlaying ? 'Stop' : 'Play'} Marathi
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700 leading-relaxed text-lg">
                {steps[currentStep].content}
              </p>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="border-orange-300 text-orange-600 hover:bg-orange-100 disabled:opacity-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <Button
              onClick={nextStep}
              disabled={currentStep === steps.length - 1}
              className="bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Completion Message */}
          {currentStep === steps.length - 1 && (
            <div className="mt-6 text-center">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <p className="text-green-800 font-medium">
                  🎉 You've completed all the steps! Ready to start the game?
                </p>
              </div>
              
              {/* Play Game Button - Only show for codeable games */}
              {game.isCodeable && (
                <Link href={getGameRoute(gameId)}>
                  <Button 
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 text-lg"
                    size="lg"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Play Game Now!
                  </Button>
                </Link>
              )}
              
              {/* For non-codeable games, show instructions */}
              {!game.isCodeable && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <p className="text-blue-800 font-medium">
                    This is a physical classroom game. Gather your materials and start playing with your students!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Video Modal */}
      {showVideoModal && <VideoModal />}
    </div>
  );
}