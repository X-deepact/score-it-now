
import React from 'react';
import { useApp } from '../../context/AppContext';
import GameDetail from '../GameDetail';

const GameDetailScreen = () => {
  const { selectedGame, user, setSelectedGame, submitPrediction } = useApp();

  if (!selectedGame || !user) {
    return null;
  }

  const handleBack = () => {
    setSelectedGame(null);
  };

  const handlePrediction = async (gameId: string, pick: string, amount: number) => {
    const success = await submitPrediction({ gameId, pick, amount });
    if (success) {
      setSelectedGame(null);
    }
  };

  return (
    <GameDetail
      game={selectedGame}
      user={user}
      onBack={handleBack}
      onPrediction={handlePrediction}
    />
  );
};

export default GameDetailScreen;
