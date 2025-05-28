
import React from 'react';
import { AppProvider, useApp } from '../context/AppContext';
import GamesDashboardScreen from '../components/screens/GamesDashboardScreen';
import UserProfileScreen from '../components/screens/UserProfileScreen';
import GameDetailScreen from '../components/screens/GameDetailScreen';
import Navigation from '../components/Navigation';

const AppContent = () => {
  const { selectedGame, activeTab, setActiveTab } = useApp();

  // Show game detail screen if a game is selected
  if (selectedGame) {
    return <GameDetailScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {activeTab === 'games' ? (
        <GamesDashboardScreen />
      ) : (
        <UserProfileScreen />
      )}
      
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

const Index = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default Index;
