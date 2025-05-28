
import React from 'react';
import { Home, User, Trophy } from 'lucide-react';

interface NavigationProps {
  activeTab: 'games' | 'profile';
  onTabChange: (tab: 'games' | 'profile') => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="max-w-md mx-auto flex justify-around">
        <button
          onClick={() => onTabChange('games')}
          className={`flex flex-col items-center space-y-1 p-3 rounded-lg transition-colors ${
            activeTab === 'games'
              ? 'text-blue-600 bg-blue-50'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs font-medium">Games</span>
        </button>

        <button
          onClick={() => onTabChange('profile')}
          className={`flex flex-col items-center space-y-1 p-3 rounded-lg transition-colors ${
            activeTab === 'profile'
              ? 'text-blue-600 bg-blue-50'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <User className="w-6 h-6" />
          <span className="text-xs font-medium">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default Navigation;
