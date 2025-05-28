
import React, { useState, useEffect } from 'react';
import { Game, User } from '../types/game';
import { mockGames, mockUser } from '../data/mockData';
import GameCard from '../components/GameCard';
import GameDetail from '../components/GameDetail';
import UserProfile from '../components/UserProfile';
import Navigation from '../components/Navigation';
import { Button } from '@/components/ui/button';
import { Filter, RefreshCw } from 'lucide-react';

const Index = () => {
  const [games, setGames] = useState<Game[]>(mockGames);
  const [user, setUser] = useState<User>(mockUser);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [activeTab, setActiveTab] = useState<'games' | 'profile'>('games');
  const [filter, setFilter] = useState<'all' | 'scheduled' | 'inProgress' | 'final'>('all');

  // Simulate real-time updates for in-progress games
  useEffect(() => {
    const interval = setInterval(() => {
      setGames(prevGames => 
        prevGames.map(game => {
          if (game.status === 'inProgress') {
            // Randomly update scores
            const homeScoreChange = Math.random() > 0.7 ? (Math.random() > 0.5 ? 2 : 3) : 0;
            const awayScoreChange = Math.random() > 0.7 ? (Math.random() > 0.5 ? 2 : 3) : 0;
            
            return {
              ...game,
              homeTeam: {
                ...game.homeTeam,
                score: (game.homeTeam.score || 0) + homeScoreChange
              },
              awayTeam: {
                ...game.awayTeam,
                score: (game.awayTeam.score || 0) + awayScoreChange
              }
            };
          }
          return game;
        })
      );
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleGameClick = (game: Game) => {
    setSelectedGame(game);
  };

  const handleBack = () => {
    setSelectedGame(null);
  };

  const handlePrediction = (gameId: string, pick: string, amount: number) => {
    const newPrediction = {
      gameId,
      pick,
      amount,
      result: 'pending' as const
    };

    setUser(prevUser => ({
      ...prevUser,
      balance: prevUser.balance - amount,
      predictions: [...prevUser.predictions, newPrediction],
      stats: {
        ...prevUser.stats,
        pending: prevUser.stats.pending + 1
      }
    }));

    setSelectedGame(null);
  };

  const filteredGames = filter === 'all' 
    ? games 
    : games.filter(game => game.status === filter);

  const refreshGames = () => {
    // Simulate refresh
    console.log('Refreshing games...');
  };

  if (selectedGame) {
    return (
      <GameDetail
        game={selectedGame}
        user={user}
        onBack={handleBack}
        onPrediction={handlePrediction}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {activeTab === 'games' ? (
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
              onClick={refreshGames}
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
      ) : (
        <div className="max-w-md mx-auto p-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
            <p className="text-gray-600">Your prediction stats</p>
          </div>
          <UserProfile user={user} />
        </div>
      )}

      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
