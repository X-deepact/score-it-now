
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import GameCard from '../GameCard';
import { Button } from '@/components/ui/button';
import { RefreshCw, Loader } from 'lucide-react';

const GamesDashboardScreen = () => {
  const { games, gamesLoading, refetchGames, setSelectedGame } = useApp();
  const [filter, setFilter] = useState<'all' | 'scheduled' | 'inProgress' | 'final'>('all');

  const filteredGames = filter === 'all' 
    ? games 
    : games.filter(game => game.status === filter);

  const handleGameClick = (game: any) => {
    setSelectedGame(game);
  };

  if (gamesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Score It Now</h1>
          <p className="text-gray-600">Make your predictions</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={refetchGames}
          className="flex items-center space-x-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh</span>
        </Button>
      </div>

      {/* Filter Buttons */}
      <div className="flex space-x-2 mb-6 overflow-x-auto">
        {[
          { key: 'all', label: 'All Games' },
          { key: 'scheduled', label: 'Upcoming' },
          { key: 'inProgress', label: 'Live' },
          { key: 'final', label: 'Completed' }
        ].map(({ key, label }) => (
          <Button
            key={key}
            variant={filter === key ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(key as any)}
            className="whitespace-nowrap"
          >
            {label}
          </Button>
        ))}
      </div>

      {/* Games List */}
      <div className="space-y-4">
        {filteredGames.map(game => (
          <GameCard
            key={game.id}
            game={game}
            onClick={handleGameClick}
          />
        ))}
        {filteredGames.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No games found for this filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GamesDashboardScreen;
