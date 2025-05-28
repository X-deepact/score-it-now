
import React from 'react';
import { Game } from '../types/game';
import { Clock, TrendingUp } from 'lucide-react';

interface GameCardProps {
  game: Game;
  onClick: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onClick }) => {
  const getStatusDisplay = () => {
    switch (game.status) {
      case 'scheduled':
        return {
          text: new Date(game.startTime!).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          className: 'bg-blue-100 text-blue-800'
        };
      case 'inProgress':
        return {
          text: `${game.period} ${game.clock}`,
          className: 'bg-green-100 text-green-800 animate-pulse'
        };
      case 'final':
        return {
          text: 'Final',
          className: 'bg-gray-100 text-gray-800'
        };
      default:
        return { text: '', className: '' };
    }
  };

  const status = getStatusDisplay();

  return (
    <div 
      className="bg-white rounded-xl shadow-lg p-6 cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-xl border border-gray-100"
      onClick={() => onClick(game)}
    >
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${status.className}`}>
          {status.text}
        </span>
        <div className="flex items-center text-sm text-gray-500">
          <TrendingUp className="w-4 h-4 mr-1" />
          Spread: {game.odds.spread}
        </div>
      </div>

      <div className="space-y-4">
        {/* Away Team */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">{game.awayTeam.abbreviation}</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900">{game.awayTeam.name}</p>
              <p className="text-sm text-gray-500">{game.awayTeam.record}</p>
            </div>
          </div>
          {game.awayTeam.score !== undefined && (
            <span className="text-2xl font-bold text-gray-900">{game.awayTeam.score}</span>
          )}
        </div>

        {/* Home Team */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">{game.homeTeam.abbreviation}</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900">{game.homeTeam.name}</p>
              <p className="text-sm text-gray-500">{game.homeTeam.record}</p>
            </div>
          </div>
          {game.homeTeam.score !== undefined && (
            <span className="text-2xl font-bold text-gray-900">{game.homeTeam.score}</span>
          )}
        </div>
      </div>

      {game.odds.favorite && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            Favorite: <span className="font-semibold">{game.odds.favorite}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default GameCard;
