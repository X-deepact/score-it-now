
import { Game, User, Prediction } from '../types/game';
import { mockGames, mockUser } from '../data/mockData';

// Simulate API endpoints
class MockApiService {
  private games: Game[] = mockGames;
  private user: User = mockUser;

  // GET /api/games
  async getGames(): Promise<{ games: Game[] }> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simulate live game updates
    this.games = this.games.map(game => {
      if (game.status === 'inProgress') {
        const homeScoreChange = Math.random() > 0.8 ? (Math.random() > 0.5 ? 2 : 3) : 0;
        const awayScoreChange = Math.random() > 0.8 ? (Math.random() > 0.5 ? 2 : 3) : 0;
        
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
    });

    return { games: this.games };
  }

  // GET /api/user
  async getUser(): Promise<{ user: User }> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { user: this.user };
  }

  // POST /api/predictions
  async submitPrediction(prediction: Omit<Prediction, 'result'>): Promise<{ success: boolean; user: User }> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const newPrediction: Prediction = {
      ...prediction,
      result: 'pending'
    };

    this.user = {
      ...this.user,
      balance: this.user.balance - prediction.amount,
      predictions: [...this.user.predictions, newPrediction],
      stats: {
        ...this.user.stats,
        pending: this.user.stats.pending + 1
      }
    };

    return { success: true, user: this.user };
  }

  // GET /api/game/:id
  async getGame(gameId: string): Promise<{ game: Game | null }> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const game = this.games.find(g => g.id === gameId);
    return { game: game || null };
  }
}

export const mockApiService = new MockApiService();
