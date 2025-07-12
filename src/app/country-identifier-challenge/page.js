'use client';

import { useState } from 'react';
import { MapPin, Flag, Users, Trophy, RefreshCw, Play, Home, Mountain, DollarSign } from 'lucide-react';

export default function CountryIdentifierChallenge() {
  const [currentGame, setCurrentGame] = useState(null);
  const [currentClue, setCurrentClue] = useState(0);
  const [score, setScore] = useState(0);
  const [gameMode, setGameMode] = useState('countries');
  const [isGameActive, setIsGameActive] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [guess, setGuess] = useState('');
  const [roundScore, setRoundScore] = useState(0);
  const [totalRounds, setTotalRounds] = useState(0);

  const gameData = {
    countries: [
      {
        name: 'Japan',
        capital: 'Tokyo',
        flag: '🇯🇵',
        clues: [
          { icon: <Mountain className="w-4 h-4" />, text: "This island nation is famous for Mount Fuji and cherry blossoms", type: "Cultural" },
          { icon: <DollarSign className="w-4 h-4" />, text: "Known for advanced technology, anime, and bullet trains", type: "Economic" },
          { icon: <MapPin className="w-4 h-4" />, text: "Located in East Asia, consists of 4 main islands", type: "Geographic" },
          { icon: <Users className="w-4 h-4" />, text: "Population of 125 million, famous for sushi and martial arts", type: "Cultural" },
          { icon: <Flag className="w-4 h-4" />, text: "The Land of the Rising Sun", type: "Historical" }
        ],
        coordinates: { lat: 36.2048, lng: 138.2529 }
      },
      {
        name: 'Brazil',
        capital: 'Brasília',
        flag: '🇧🇷',
        clues: [
          { icon: <Mountain className="w-4 h-4" />, text: "Home to the Amazon rainforest and Christ the Redeemer statue", type: "Geographic" },
          { icon: <DollarSign className="w-4 h-4" />, text: "Largest economy in South America, known for coffee production", type: "Economic" },
          { icon: <MapPin className="w-4 h-4" />, text: "Borders every South American country except Chile and Ecuador", type: "Geographic" },
          { icon: <Users className="w-4 h-4" />, text: "Portuguese-speaking nation famous for Carnival and football", type: "Cultural" },
          { icon: <Flag className="w-4 h-4" />, text: "Green and yellow flag with a blue circle", type: "Visual" }
        ],
        coordinates: { lat: -14.2350, lng: -51.9253 }
      },
      {
        name: 'Egypt',
        capital: 'Cairo',
        flag: '🇪🇬',
        clues: [
          { icon: <Mountain className="w-4 h-4" />, text: "Ancient civilization known for pyramids and the Sphinx", type: "Historical" },
          { icon: <MapPin className="w-4 h-4" />, text: "The Nile River flows through this country", type: "Geographic" },
          { icon: <DollarSign className="w-4 h-4" />, text: "Suez Canal is a major source of income", type: "Economic" },
          { icon: <Users className="w-4 h-4" />, text: "Arabic-speaking nation in North Africa", type: "Cultural" },
          { icon: <Flag className="w-4 h-4" />, text: "Birthplace of hieroglyphics and mummies", type: "Historical" }
        ],
        coordinates: { lat: 26.8206, lng: 30.8025 }
      },
      {
        name: 'Australia',
        capital: 'Canberra',
        flag: '🇦🇺',
        clues: [
          { icon: <Mountain className="w-4 h-4" />, text: "Home to unique animals like kangaroos and koalas", type: "Geographic" },
          { icon: <MapPin className="w-4 h-4" />, text: "The smallest continent and largest island", type: "Geographic" },
          { icon: <DollarSign className="w-4 h-4" />, text: "Rich in natural resources, especially mining", type: "Economic" },
          { icon: <Users className="w-4 h-4" />, text: "English-speaking nation with Aboriginal heritage", type: "Cultural" },
          { icon: <Flag className="w-4 h-4" />, text: "Flag features the Southern Cross constellation", type: "Visual" }
        ],
        coordinates: { lat: -25.2744, lng: 133.7751 }
      },
      {
        name: 'Norway',
        capital: 'Oslo',
        flag: '🇳🇴',
        clues: [
          { icon: <Mountain className="w-4 h-4" />, text: "Famous for fjords and the Northern Lights (Aurora Borealis)", type: "Geographic" },
          { icon: <DollarSign className="w-4 h-4" />, text: "Oil-rich nation with one of the world's largest sovereign wealth funds", type: "Economic" },
          { icon: <MapPin className="w-4 h-4" />, text: "Scandinavian country with a long coastline", type: "Geographic" },
          { icon: <Users className="w-4 h-4" />, text: "Vikings originated from this region", type: "Historical" },
          { icon: <Flag className="w-4 h-4" />, text: "Red flag with blue and white Nordic cross", type: "Visual" }
        ],
        coordinates: { lat: 60.4720, lng: 8.4689 }
      }
    ]
  };

  const startNewGame = () => {
    const countries = gameData[gameMode];
    const randomCountry = countries[Math.floor(Math.random() * countries.length)];
    setCurrentGame(randomCountry);
    setCurrentClue(0);
    setIsGameActive(true);
    setShowAnswer(false);
    setGuess('');
    setRoundScore(0);
  };

  const handleGuess = () => {
    if (!guess.trim()) return;
    
    const isCorrect = guess.toLowerCase().trim() === currentGame.name.toLowerCase() || 
                     guess.toLowerCase().trim() === currentGame.capital.toLowerCase();
    
    if (isCorrect) {
      const points = 5 - currentClue;
      setScore(score + points);
      setRoundScore(points);
      setShowAnswer(true);
      setTotalRounds(totalRounds + 1);
    } else if (currentClue < 4) {
      setCurrentClue(currentClue + 1);
      setGuess('');
    } else {
      setShowAnswer(true);
      setTotalRounds(totalRounds + 1);
    }
  };

  const nextRound = () => {
    startNewGame();
  };

  const resetGame = () => {
    setScore(0);
    setTotalRounds(0);
    setIsGameActive(false);
    setCurrentGame(null);
  };

  const getClueTypeColor = (type) => {
    switch(type) {
      case 'Geographic': return 'bg-blue-100 text-blue-800';
      case 'Cultural': return 'bg-purple-100 text-purple-800';
      case 'Economic': return 'bg-green-100 text-green-800';
      case 'Historical': return 'bg-orange-100 text-orange-800';
      case 'Visual': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isGameActive) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
              <MapPin className="w-10 h-10 text-blue-600" />
              Country Identifier Challenge
            </h1>
            <p className="text-gray-600 text-lg">Progressive clue-based geography game</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">How to Play</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 rounded-full p-2">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Progressive Clues</h3>
                    <p className="text-gray-600">Get 5 clues about a country, one at a time</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-2">
                    <span className="text-green-600 font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Scoring System</h3>
                    <p className="text-gray-600">Earlier guesses earn more points (5,4,3,2,1)</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 rounded-full p-2">
                    <span className="text-purple-600 font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Multiple Clue Types</h3>
                    <p className="text-gray-600">Geographic, cultural, economic, and historical hints</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-orange-100 rounded-full p-2">
                    <span className="text-orange-600 font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Guess Anytime</h3>
                    <p className="text-gray-600">Submit your answer after any clue</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Game Mode</h3>
              <select 
                value={gameMode} 
                onChange={(e) => setGameMode(e.target.value)}
                className="px-4 py-2 border rounded-lg text-lg"
              >
                <option value="countries">Countries & Capitals</option>
              </select>
            </div>
            
            {score > 0 && (
              <div className="mb-6 p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg">
                <div className="flex justify-center items-center gap-8">
                  <div className="text-center">
                    <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-800">{score}</div>
                    <div className="text-gray-600">Total Score</div>
                  </div>
                  <div className="text-center">
                    <Flag className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-800">{totalRounds}</div>
                    <div className="text-gray-600">Rounds Played</div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              <button
                onClick={startNewGame}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-3 mx-auto"
              >
                <Play className="w-6 h-6" />
                Start New Round
              </button>
              
              {score > 0 && (
                <button
                  onClick={resetGame}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2 mx-auto"
                >
                  <RefreshCw className="w-5 h-5" />
                  Reset Game
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">Country Identifier Challenge</h1>
                <p className="opacity-90">Clue {currentClue + 1} of 5</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{score}</div>
                <div className="opacity-90">Score</div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-gray-200 h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-500"
              style={{ width: `${((currentClue + 1) / 5) * 100}%` }}
            />
          </div>

          {!showAnswer ? (
            <div className="p-8">
              {/* Points Available */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full">
                  <Trophy className="w-5 h-5" />
                  <span className="font-semibold">{5 - currentClue} points available</span>
                </div>
              </div>

              {/* Current Clues */}
              <div className="space-y-4 mb-8">
                {currentGame.clues.slice(0, currentClue + 1).map((clue, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
                    <div className="flex items-center gap-3 mb-2">
                      {clue.icon}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getClueTypeColor(clue.type)}`}>
                        {clue.type}
                      </span>
                      <span className="text-gray-500 text-sm">Clue {index + 1}</span>
                    </div>
                    <p className="text-gray-800 font-medium">{clue.text}</p>
                  </div>
                ))}
              </div>

              {/* Guess Input */}
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Your Guess (Country or Capital):
                  </label>
                  <input
                    type="text"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleGuess()}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="Enter country name or capital city..."
                  />
                </div>
                
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={handleGuess}
                    disabled={!guess.trim()}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Submit Guess
                  </button>
                  
                  {currentClue < 4 && (
                    <button
                      onClick={() => setCurrentClue(currentClue + 1)}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Next Clue
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center">
              {/* Answer Reveal */}
              <div className="mb-8">
                <div className="text-6xl mb-4">{currentGame.flag}</div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{currentGame.name}</h2>
                <p className="text-xl text-gray-600">Capital: {currentGame.capital}</p>
              </div>

              {/* Score for this round */}
              {roundScore > 0 ? (
                <div className="bg-green-100 border border-green-300 rounded-lg p-6 mb-6">
                  <div className="text-green-800">
                    <Trophy className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-2xl font-bold">Correct! +{roundScore} points</div>
                    <div>You guessed it after {currentClue + 1} clue{currentClue > 0 ? 's' : ''}!</div>
                  </div>
                </div>
              ) : (
                <div className="bg-orange-100 border border-orange-300 rounded-lg p-6 mb-6">
                  <div className="text-orange-800">
                    <div className="text-xl font-bold">Good try!</div>
                    <div>The answer was {currentGame.name} (Capital: {currentGame.capital})</div>
                  </div>
                </div>
              )}

              {/* All clues revealed */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="font-bold text-gray-800 mb-4">All Clues:</h3>
                <div className="space-y-2 text-left">
                  {currentGame.clues.map((clue, index) => (
                    <div key={index} className="flex items-center gap-3 p-2">
                      {clue.icon}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getClueTypeColor(clue.type)}`}>
                        {clue.type}
                      </span>
                      <span className="text-gray-700">{clue.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={nextRound}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Next Round
                </button>
                <button
                  onClick={() => setIsGameActive(false)}
                  className="bg-gray-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-600 transition-colors flex items-center gap-2"
                >
                  <Home className="w-5 h-5" />
                  Main Menu
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};