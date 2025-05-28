
import React, { useState } from 'react';
import { Game, User } from '../types/game';
import { ArrowLeft, Trophy, TrendingUp, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface GameDetailProps {
  game: Game;
  user: User;
  onBack: () => void;
  onPrediction: (gameId: string, pick: string, amount: number) => void;
}

const GameDetail: React.FC<GameDetailProps> = ({ game, user, onBack, onPrediction }) => {
  const [selectedPick, setSelectedPick] = useState<string>('');
  const [betAmount, setBetAmount] = useState<number>(0);
  const { toast } = useToast();

  const handlePrediction = () => {
    if (!selectedPick) {
      toast({
        title: "Select a pick",
        description: "Please choose a team before placing your prediction.",
        variant: "destructive"
      });
      return;
    }

    if (betAmount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid bet amount.",
        variant: "destructive"
      });
      return;
    }

    if (betAmount > user.balance) {
      toast({
        title: "Insufficient balance",
        description: "You don't have enough balance for this bet.",
        variant: "destructive"
      });
      return;
    }

    onPrediction(game.id, selectedPick, betAmount);
    toast({
      title: "Prediction placed!",
      description: `You've placed $${betAmount} on ${selectedPick}`,
    });
  };

  const getStatusDisplay = () => {
    switch (game.status) {
      case 'scheduled':
        return {
          text: `Starts at ${new Date(game.startTime!).toLocaleString()}`,
          className: 'text-blue-600'
        };
      case 'inProgress':
        return {
          text: `${game.period} Quarter - ${game.clock}`,
          className: 'text-green-600 font-semibold'
        };
      case 'final':
        return {
          text: 'Game Final',
          className: 'text-gray-600'
        };
      default:
        return { text: '', className: '' };
    }
  };

  const status = getStatusDisplay();
  const canPlaceBet = game.status === 'scheduled';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Game Details</h1>
        </div>

        {/* Game Status */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="text-center mb-6">
            <p className={`text-lg ${status.className}`}>{status.text}</p>
          </div>

          {/* Teams */}
          <div className="space-y-6">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">{game.awayTeam.abbreviation}</span>
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">{game.awayTeam.name}</p>
                  <p className="text-gray-600">{game.awayTeam.record}</p>
                </div>
              </div>
              {game.awayTeam.score !== undefined && (
                <span className="text-4xl font-bold text-gray-900">{game.awayTeam.score}</span>
              )}
            </div>

            <div className="text-center text-gray-400 font-semibold">VS</div>

            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">{game.homeTeam.abbreviation}</span>
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">{game.homeTeam.name}</p>
                  <p className="text-gray-600">{game.homeTeam.record}</p>
                </div>
              </div>
              {game.homeTeam.score !== undefined && (
                <span className="text-4xl font-bold text-gray-900">{game.homeTeam.score}</span>
              )}
            </div>
          </div>

          {/* Odds */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-center space-x-2 text-blue-800">
              <TrendingUp className="w-5 h-5" />
              <span className="font-semibold">
                Spread: {game.odds.spread} (Favorite: {game.odds.favorite})
              </span>
            </div>
          </div>
        </div>

        {/* Prediction Interface */}
        {canPlaceBet && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
              Place Your Prediction
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pick Winner
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant={selectedPick === game.awayTeam.abbreviation ? "default" : "outline"}
                    onClick={() => setSelectedPick(game.awayTeam.abbreviation)}
                    className="p-4 h-auto"
                  >
                    <div className="text-center">
                      <p className="font-bold">{game.awayTeam.abbreviation}</p>
                      <p className="text-sm">{game.awayTeam.name}</p>
                    </div>
                  </Button>
                  <Button
                    variant={selectedPick === game.homeTeam.abbreviation ? "default" : "outline"}
                    onClick={() => setSelectedPick(game.homeTeam.abbreviation)}
                    className="p-4 h-auto"
                  >
                    <div className="text-center">
                      <p className="font-bold">{game.homeTeam.abbreviation}</p>
                      <p className="text-sm">{game.homeTeam.name}</p>
                    </div>
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bet Amount
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="number"
                    value={betAmount || ''}
                    onChange={(e) => setBetAmount(Number(e.target.value))}
                    placeholder="Enter amount"
                    className="pl-10"
                    max={user.balance}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Available balance: ${user.balance}
                </p>
              </div>

              <Button 
                onClick={handlePrediction}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                disabled={!selectedPick || betAmount <= 0}
              >
                Place Prediction
              </Button>
            </div>
          </div>
        )}

        {!canPlaceBet && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <p className="text-yellow-800 text-center">
              {game.status === 'inProgress' 
                ? 'Game is in progress - no new predictions allowed'
                : 'Game has ended - predictions are closed'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameDetail;
