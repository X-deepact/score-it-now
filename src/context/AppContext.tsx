
import React, { createContext, useContext, ReactNode } from 'react';
import { useGames, useUser } from '../hooks/useApi';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Game, User, Prediction } from '../types/game';

interface AppContextType {
  games: Game[];
  user: User | null;
  gamesLoading: boolean;
  userLoading: boolean;
  selectedGame: Game | null;
  setSelectedGame: (game: Game | null) => void;
  activeTab: 'games' | 'profile';
  setActiveTab: (tab: 'games' | 'profile') => void;
  submitPrediction: (prediction: Omit<Prediction, 'result'>) => Promise<boolean>;
  refetchGames: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const { games, loading: gamesLoading, refetch: refetchGames } = useGames();
  const { user, loading: userLoading, submitPrediction } = useUser();
  
  // Use localStorage for persistent navigation state
  const [selectedGame, setSelectedGame] = useLocalStorage<Game | null>('selectedGame', null);
  const [activeTab, setActiveTab] = useLocalStorage<'games' | 'profile'>('activeTab', 'games');

  const value: AppContextType = {
    games,
    user,
    gamesLoading,
    userLoading,
    selectedGame,
    setSelectedGame,
    activeTab,
    setActiveTab,
    submitPrediction,
    refetchGames
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
