
import { useState, useEffect } from 'react';
import { Game, User, Prediction } from '../types/game';
import { mockApiService } from '../services/mockApiService';

export const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGames = async () => {
    try {
      setLoading(true);
      const response = await mockApiService.getGames();
      setGames(response.games);
      setError(null);
    } catch (err) {
      setError('Failed to fetch games');
      console.error('Error fetching games:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
    
    // Poll for updates every 10 seconds
    const interval = setInterval(fetchGames, 10000);
    return () => clearInterval(interval);
  }, []);

  return { games, loading, error, refetch: fetchGames };
};

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await mockApiService.getUser();
        setUser(response.user);
      } catch (err) {
        console.error('Error fetching user:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const submitPrediction = async (prediction: Omit<Prediction, 'result'>) => {
    try {
      const response = await mockApiService.submitPrediction(prediction);
      if (response.success) {
        setUser(response.user);
      }
      return response.success;
    } catch (err) {
      console.error('Error submitting prediction:', err);
      return false;
    }
  };

  return { user, loading, submitPrediction };
};
