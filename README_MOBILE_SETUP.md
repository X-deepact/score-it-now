
# Score It Now - Mobile Sports Prediction App

A streamlined mobile app for sports fans to view games and make predictions, built with React and Capacitor for mobile deployment.

## Features

### ✅ Core Requirements Met:
- **Games Dashboard**: Display upcoming, in-progress, and completed games with filtering
- **Game Detail Screen**: Detailed game view with prediction interface
- **User Profile**: Prediction history, win/loss record, and virtual balance
- **Mobile-First Design**: Optimized for iOS with clean component architecture
- **Real-time Updates**: Polling mechanism for live game updates
- **Persistent Storage**: Local storage for user predictions and navigation state
- **Mock API**: Simulated backend with 3 endpoints (games, user, predictions)

## Technical Implementation

### Architecture:
- **React with Hooks & Context**: Modern React patterns throughout
- **Component-Based Structure**: Clean, focused components and screens
- **Custom Hooks**: `useApi`, `useLocalStorage` for data management
- **Mock API Service**: Simulates real backend with network delays
- **Persistent State**: localStorage integration for mobile-like experience

### API Endpoints (Simulated):
- `GET /api/games` - Fetch all games with live updates
- `GET /api/user` - Get user profile and stats
- `POST /api/predictions` - Submit new predictions

## Mobile Development Setup

### For Mobile Testing:
1. **Transfer to GitHub**: Use the "Export to Github" button in Lovable
2. **Clone locally**: `git clone <your-repo-url>`
3. **Install dependencies**: `npm install`
4. **Add platforms**: 
   - iOS: `npx cap add ios`
   - Android: `npx cap add android`
5. **Build and sync**: 
   - `npm run build`
   - `npx cap sync`
6. **Run on device**:
   - iOS: `npx cap run ios` (requires Xcode on Mac)
   - Android: `npx cap run android` (requires Android Studio)

### Development Features:
- Hot reload enabled for mobile development
- Responsive design optimized for mobile screens
- Touch-friendly interface with proper spacing
- iOS-style navigation patterns

## Project Structure

```
src/
├── components/
│   ├── screens/           # Screen components (Dashboard, Profile, GameDetail)
│   ├── GameCard.tsx       # Reusable game card component
│   ├── GameDetail.tsx     # Game detail view
│   ├── UserProfile.tsx    # User profile component
│   └── Navigation.tsx     # Bottom navigation
├── context/
│   └── AppContext.tsx     # Global state management
├── hooks/
│   ├── useApi.ts          # API data fetching hooks
│   └── useLocalStorage.ts # Persistent storage hook
├── services/
│   └── mockApiService.ts  # Mock backend API service
├── types/
│   └── game.ts           # TypeScript type definitions
└── data/
    └── mockData.ts       # Sample data
```

## Development Notes

This implementation focuses on:
- **Clean Architecture**: Separated concerns with hooks, context, and services
- **Mobile-First UX**: Bottom navigation, touch targets, responsive design
- **Real-time Features**: Live score updates and game status changes
- **Error Handling**: Loading states and error boundaries
- **Type Safety**: Full TypeScript implementation

The app demonstrates modern React Native concepts adapted for web-to-mobile deployment using Capacitor, providing a native mobile experience while maintaining web development workflows.

## AI Assistance Used
This project utilized AI assistance for architectural planning, component structuring, and mobile optimization patterns.
