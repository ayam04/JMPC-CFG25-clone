'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Trophy, Users, Clock, Target } from 'lucide-react';

// Math problems database organized by difficulty
const mathProblems = {
  easy: [
    { question: "15 + 27 = ?", answer: 42 },
    { question: "8 × 9 = ?", answer: 72 },
    { question: "100 - 37 = ?", answer: 63 },
    { question: "144 ÷ 12 = ?", answer: 12 },
    { question: "25 + 48 = ?", answer: 73 },
    { question: "7 × 6 = ?", answer: 42 },
    { question: "85 - 29 = ?", answer: 56 },
    { question: "96 ÷ 8 = ?", answer: 12 },
    { question: "34 + 56 = ?", answer: 90 },
    { question: "12 × 5 = ?", answer: 60 }
  ],
  medium: [
    { question: "15² = ?", answer: 225 },
    { question: "√64 = ?", answer: 8 },
    { question: "3/4 + 1/4 = ?", answer: 1 },
    { question: "25% of 80 = ?", answer: 20 },
    { question: "2³ × 5 = ?", answer: 40 },
    { question: "7² - 9 = ?", answer: 40 },
    { question: "√100 + 5 = ?", answer: 15 },
    { question: "2/3 of 21 = ?", answer: 14 },
    { question: "30% of 50 = ?", answer: 15 },
    { question: "4³ ÷ 8 = ?", answer: 8 }
  ],
  hard: [
    { question: "If x + 12 = 25, then x = ?", answer: 13 },
    { question: "Area of circle with radius 5 (use π = 3.14)", answer: 78.5 },
    { question: "LCM of 12 and 18 = ?", answer: 36 },
    { question: "3x + 7 = 22, find x", answer: 5 },
    { question: "HCF of 24 and 36 = ?", answer: 12 },
    { question: "If 2y - 5 = 15, then y = ?", answer: 10 },
    { question: "Volume of cube with side 4 cm", answer: 64 },
    { question: "5a + 3 = 28, find a", answer: 5 },
    { question: "Perimeter of rectangle: length 8, width 5", answer: 26 },
    { question: "If 3b - 4 = 17, then b = ?", answer: 7 }
  ]
};

export default function MathLightningGame() {
  const [gameState, setGameState] = useState('setup'); // setup, playing, paused, finished
  const [teams, setTeams] = useState([
    { id: 1, name: 'Team Red', score: 0, color: 'bg-red-500' },
    { id: 2, name: 'Team Blue', score: 0, color: 'bg-blue-500' },
    { id: 3, name: 'Team Green', score: 0, color: 'bg-green-500' },
    { id: 4, name: 'Team Yellow', score: 0, color: 'bg-yellow-500' }
  ]);
  const [currentProblem, setCurrentProblem] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [round, setRound] = useState(1);
  const [showAnswer, setShowAnswer] = useState(false);
  const [usedProblems, setUsedProblems] = useState({ easy: [], medium: [], hard: [] });
  const [totalRounds] = useState(15);

  // Timer effect
  useEffect(() => {
    let timer;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      setShowAnswer(true);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, gameState]);

  const getDifficulty = () => {
    if (round <= 5) return 'easy';
    if (round <= 10) return 'medium';
    return 'hard';
  };

  const getRandomProblem = (difficulty) => {
    const availableProblems = mathProblems[difficulty].filter(
      (_, index) => !usedProblems[difficulty].includes(index)
    );
    
    if (availableProblems.length === 0) {
      // Reset if all problems used
      setUsedProblems(prev => ({ ...prev, [difficulty]: [] }));
      return mathProblems[difficulty][Math.floor(Math.random() * mathProblems[difficulty].length)];
    }
    
    const randomIndex = Math.floor(Math.random() * availableProblems.length);
    const selectedProblem = availableProblems[randomIndex];
    const originalIndex = mathProblems[difficulty].indexOf(selectedProblem);
    
    setUsedProblems(prev => ({
      ...prev,
      [difficulty]: [...prev[difficulty], originalIndex]
    }));
    
    return selectedProblem;
  };

  const startGame = () => {
    const difficulty = getDifficulty();
    const problem = getRandomProblem(difficulty);
    setCurrentProblem(problem);
    setGameState('playing');
    setTimeLeft(30);
    setShowAnswer(false);
  };

  const nextRound = () => {
    if (round >= totalRounds) {
      setGameState('finished');
      return;
    }
    
    setRound(round + 1);
    const difficulty = getDifficulty();
    const problem = getRandomProblem(difficulty);
    setCurrentProblem(problem);
    setTimeLeft(30);
    setShowAnswer(false);
    setGameState('playing');
  };

  const awardPoints = (teamId, points) => {
    setTeams(teams.map(team => 
      team.id === teamId ? { ...team, score: team.score + points } : team
    ));
  };

  const resetGame = () => {
    setGameState('setup');
    setTeams(teams.map(team => ({ ...team, score: 0 })));
    setRound(1);
    setCurrentProblem(null);
    setTimeLeft(30);
    setShowAnswer(false);
    setUsedProblems({ easy: [], medium: [], hard: [] });
  };

  const pauseGame = () => {
    setGameState(gameState === 'playing' ? 'paused' : 'playing');
  };

  const getPointsForPosition = (position) => {
    switch(position) {
      case 1: return getDifficulty() === 'easy' ? 3 : getDifficulty() === 'medium' ? 4 : 5;
      case 2: return 1;
      default: return 0;
    }
  };

  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);

  if (gameState === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-white mb-4">Math Lightning Round</h1>
            <p className="text-xl text-blue-100">Fast-paced math competition for Grade 6-8</p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <Users className="mr-3 text-blue-600" />
              Team Setup
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {teams.map((team, index) => (
                <div key={team.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className={`w-8 h-8 rounded-full ${team.color}`}></div>
                  <input
                    type="text"
                    value={team.name}
                    onChange={(e) => setTeams(teams.map(t => 
                      t.id === team.id ? { ...t, name: e.target.value } : t
                    ))}
                    className="flex-1 text-lg font-semibold bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                  />
                </div>
              ))}
            </div>

            <div className="bg-blue-50 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">How to Play:</h3>
              <ul className="text-blue-700 space-y-2">
                <li>• Rounds 1-5: Easy problems (3 points for 1st, 1 point for 2nd)</li>
                <li>• Rounds 6-10: Medium problems (4 points for 1st, 1 point for 2nd)</li>
                <li>• Rounds 11-15: Hard problems (5 points for 1st, 1 point for 2nd)</li>
                <li>• Each team has 30 seconds to solve each problem</li>
                <li>• Use mini whiteboards to show your answers</li>
              </ul>
            </div>

            <button
              onClick={startGame}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white text-xl font-bold py-4 rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center"
            >
              <Play className="mr-3" size={24} />
              Start Game!
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'finished') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 p-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <Trophy className="mx-auto text-yellow-500 mb-6" size={80} />
            <h1 className="text-5xl font-bold text-gray-800 mb-6">Game Complete!</h1>
            
            <div className="space-y-4 mb-8">
              {sortedTeams.map((team, index) => (
                <div key={team.id} className={`flex items-center justify-between p-4 rounded-xl ${
                  index === 0 ? 'bg-yellow-100 border-2 border-yellow-400' : 'bg-gray-100'
                }`}>
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl font-bold text-gray-600">#{index + 1}</span>
                    <div className={`w-6 h-6 rounded-full ${team.color}`}></div>
                    <span className="text-xl font-semibold">{team.name}</span>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">{team.score} pts</span>
                </div>
              ))}
            </div>

            <button
              onClick={resetGame}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-bold py-4 px-8 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center mx-auto"
            >
              <RotateCcw className="mr-3" />
              Play Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Target className="text-purple-600" size={24} />
                <span className="text-xl font-bold">Round {round}/{totalRounds}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="text-blue-600" size={24} />
                <span className={`text-xl font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-gray-700'}`}>
                  {timeLeft}s
                </span>
              </div>
              <div className="px-3 py-1 bg-gray-200 rounded-full">
                <span className="text-sm font-semibold text-gray-700">
                  {getDifficulty().toUpperCase()}
                </span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={pauseGame}
                className="bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-600 transition-colors flex items-center"
              >
                {gameState === 'playing' ? <Pause size={20} /> : <Play size={20} />}
              </button>
              <button
                onClick={resetGame}
                className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition-colors flex items-center"
              >
                <RotateCcw size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Problem Display */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
              {currentProblem && (
                <>
                  <div className="mb-8">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Problem {round}</h2>
                    <div className="text-6xl font-bold text-purple-600 mb-6">
                      {currentProblem.question}
                    </div>
                    
                    {showAnswer && (
                      <div className="bg-green-100 rounded-2xl p-6 mb-6">
                        <h3 className="text-2xl font-semibold text-green-800 mb-2">Answer:</h3>
                        <div className="text-4xl font-bold text-green-600">
                          {currentProblem.answer}
                        </div>
                      </div>
                    )}
                  </div>

                  {gameState === 'playing' && !showAnswer && (
                    <div className="space-y-4">
                      <div className="text-xl text-gray-600">
                        Teams, show your answers now!
                      </div>
                      <button
                        onClick={() => setShowAnswer(true)}
                        className="bg-orange-500 text-white font-semibold py-2 px-6 rounded-xl hover:bg-orange-600 transition-colors"
                      >
                        All Teams Ready - Show Answer
                      </button>
                    </div>
                  )}

                  {showAnswer && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-gray-700">Award Points:</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {teams.map(team => (
                          <div key={team.id} className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <div className={`w-4 h-4 rounded-full ${team.color}`}></div>
                              <span className="font-semibold">{team.name}</span>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => awardPoints(team.id, getPointsForPosition(1))}
                                className="bg-gold bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-yellow-600 transition-colors"
                              >
                                1st ({getPointsForPosition(1)}pts)
                              </button>
                              <button
                                onClick={() => awardPoints(team.id, getPointsForPosition(2))}
                                className="bg-gray-400 text-white px-3 py-1 rounded-lg text-sm hover:bg-gray-500 transition-colors"
                              >
                                2nd (1pt)
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <button
                        onClick={nextRound}
                        className="mt-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg font-bold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                      >
                        Next Round →
                      </button>
                    </div>
                  )}
                </>
              )}

              {gameState === 'paused' && (
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-600 mb-4">Game Paused</h2>
                  <button
                    onClick={pauseGame}
                    className="bg-green-500 text-white text-xl font-bold py-3 px-6 rounded-xl hover:bg-green-600 transition-colors flex items-center mx-auto"
                  >
                    <Play className="mr-2" />
                    Resume
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Scoreboard */}
          <div className="bg-white rounded-3xl shadow-2xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Trophy className="mr-3 text-yellow-500" />
              Scoreboard
            </h2>
            
            <div className="space-y-4">
              {sortedTeams.map((team, index) => (
                <div key={team.id} className={`p-4 rounded-xl border-2 ${
                  index === 0 ? 'bg-yellow-50 border-yellow-300' : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-bold text-gray-600">#{index + 1}</span>
                      <div className={`w-4 h-4 rounded-full ${team.color}`}></div>
                      <span className="font-semibold">{team.name}</span>
                    </div>
                    <span className="text-xl font-bold text-blue-600">{team.score}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <h3 className="font-semibold text-blue-800 mb-2">Points System:</h3>
              <div className="text-sm text-blue-700 space-y-1">
                <div>Easy: 1st = 3pts, 2nd = 1pt</div>
                <div>Medium: 1st = 4pts, 2nd = 1pt</div>
                <div>Hard: 1st = 5pts, 2nd = 1pt</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}