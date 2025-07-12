import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Play } from 'lucide-react';
import Link from 'next/link';

const GameCard = ({ game }) => {
  return (
    <Link href={`/games/${game.id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-orange-100 cursor-pointer">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-25 rounded-t-lg">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                {game.id}
              </div>
              {game.hasVideo && (
                <div className="flex items-center gap-1 text-orange-600">
                  <Play className="w-4 h-4" />
                  <span className="text-xs">Demo Video</span>
                </div>
              )}
            </div>
          </div>
          <CardTitle className="text-xl text-orange-800">{game.title}</CardTitle>
          <div className="flex flex-wrap gap-2 mt-3">
            <Badge variant="secondary" className="bg-orange-100 text-orange-700">
              {game.grade}
            </Badge>
            <Badge variant="secondary" className="bg-orange-200 text-orange-800">
              {game.subject}
            </Badge>
            <Badge variant="secondary" className="bg-orange-50 text-orange-600 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {game.duration}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-600 mb-4 text-sm leading-relaxed">{game.description}</p>
          
          <div className="mb-4">
            <h4 className="font-semibold text-orange-700 mb-2 flex items-center gap-2">
              <Users className="w-4 h-4" />
              How to Play:
            </h4>
            <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
              {game.howToPlay.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>

          <div className="bg-orange-50 border-l-4 border-orange-400 p-3 rounded-r-lg">
            <h4 className="font-semibold text-orange-800 mb-1">Materials:</h4>
            <p className="text-sm text-orange-700">{game.materials}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default GameCard;