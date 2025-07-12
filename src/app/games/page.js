'use client';

import { useState } from 'react';
import StatsHeader from '@/components/games/statsHeader';
import SubjectFilter from '@/components/games/subjectFilter';
import GameCard from '@/components/games/GameCard';
import { games } from '@/data/games';
import Header from '@/components/navbar/header';

export default function GamesPage() {
  const subjects = ["All", "Mathematics", "Science", "English", "History", "Geography"];
  const [selectedSubject, setSelectedSubject] = useState("All");
  
  const filteredGames = selectedSubject === "All" 
    ? games 
    : games.filter(game => game.subject === selectedSubject);

  return (
    <div className="min-h-screen bg-orange-25">

      <Header />
      <StatsHeader />
      
      <div className="pb-12">
        <SubjectFilter 
          subjects={subjects}
          selectedSubject={selectedSubject}
          onSubjectChange={setSelectedSubject}
        />
        
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              {selectedSubject === "All" ? "All Games" : `${selectedSubject} Games`}
              <span className="text-lg font-normal text-gray-600 ml-2">
                ({filteredGames.length} {filteredGames.length === 1 ? 'game' : 'games'})
              </span>
            </h2>
            <p className="text-gray-600 mt-2">
              No-tech classroom games designed for Maharashtra board students (Grades 6-8)
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}