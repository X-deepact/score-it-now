
import React from 'react';
import { User } from '../types/game';
import { User as UserIcon, Trophy, DollarSign, TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface UserProfileProps {
  user: User;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const winRate = user.stats.wins + user.stats.losses > 0 
    ? (user.stats.wins / (user.stats.wins + user.stats.losses)) * 100 
    : 0;

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <UserIcon className="w-8 h-8" />
            </div>
            <div>
              <CardTitle className="text-2xl">{user.username}</CardTitle>
              <p className="text-blue-100">Sports Predictor</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5" />
            <span className="text-2xl font-bold">${user.balance}</span>
            <span className="text-blue-100">Available Balance</span>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-green-600">{user.stats.wins}</p>
                <p className="text-sm text-gray-600">Wins</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingDown className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-2xl font-bold text-red-600">{user.stats.losses}</p>
                <p className="text-sm text-gray-600">Losses</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold text-orange-600">{user.stats.pending}</p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold text-yellow-600">{winRate.toFixed(1)}%</p>
                <p className="text-sm text-gray-600">Win Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Prediction History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Predictions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {user.predictions.map((prediction, index) => (
              <div 
                key={index}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-semibold">Game {prediction.gameId}</p>
                  <p className="text-sm text-gray-600">Pick: {prediction.pick}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${prediction.amount}</p>
                  <span className={`text-sm px-2 py-1 rounded ${
                    prediction.result === 'win' 
                      ? 'bg-green-100 text-green-800'
                      : prediction.result === 'loss'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {prediction.result}
                    {prediction.payout && ` (+$${prediction.payout - prediction.amount})`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
