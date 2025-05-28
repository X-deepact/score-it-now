
import React from 'react';
import { useApp } from '../../context/AppContext';
import UserProfile from '../UserProfile';
import { Loader } from 'lucide-react';

const UserProfileScreen = () => {
  const { user, userLoading } = useApp();

  if (userLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600">Your prediction stats</p>
      </div>
      <UserProfile user={user} />
    </div>
  );
};

export default UserProfileScreen;
