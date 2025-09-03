import React, { useState, useEffect } from 'react';
import { Coins, TrendingUp, Users, Heart } from 'lucide-react';
import AppShell from './components/AppShell';
import CreatorCard from './components/CreatorCard';
import TipButton from './components/TipButton';
import TipModal from './components/TipModal';
import CreatorProfile from './components/CreatorProfile';
import GoalProgress from './components/GoalProgress';
import TippedCreatorsShowcase from './components/TippedCreatorsShowcase';
import TipLeaderboard from './components/TipLeaderboard';
import RecentTipActivity from './components/RecentTipActivity';
import LoadingIndicator from './components/LoadingIndicator';
import ErrorBoundary from './components/ErrorBoundary';
import TransactionSummary from './components/TransactionSummary';
import { usePrivy } from './hooks/usePrivy';
import { useUser } from './hooks/useUser';
import { useCreator } from './hooks/useCreator';
import { useTip } from './hooks/useTip';
import { useNotification } from './contexts/NotificationContext';
import { formatUSDCAmount } from './utils/transactions';

function App() {
  const { isAuthenticated, address, login, logout } = usePrivy();
  const { isCreator, creatorProfile } = useUser();
  const { creators, featuredCreators } = useCreator();
  const { tips, recentTips, sendTip, getTipsForCreator } = useTip();
  const { showSuccess, showError } = useNotification();
  
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [showTipModal, setShowTipModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle tip success
  const handleTipSuccess = (tip) => {
    showSuccess(`Successfully tipped ${formatUSDCAmount(tip.amount)} to ${tip.receiverName}!`);
    setShowTipModal(false);
  };

  // Handle creator click
  const handleCreatorClick = (creator) => {
    setSelectedCreator(creator);
    setCurrentView('creator-profile');
  };

  // Handle tip click
  const handleTipClick = (creator) => {
    if (!isAuthenticated) {
      showError('Please connect your wallet to tip creators');
      return;
    }
    
    setSelectedCreator(creator);
    setShowTipModal(true);
  };

  // Calculate stats
  const totalTipsReceived = tips
    .filter(tip => isAuthenticated && tip.receiverId === address)
    .reduce((sum, tip) => sum + tip.amount, 0);

  const totalTipsSent = tips
    .filter(tip => isAuthenticated && tip.senderId === address)
    .reduce((sum, tip) => sum + tip.amount, 0);
    
  const creatorsTipped = isAuthenticated 
    ? new Set(tips.filter(tip => tip.senderId === address).map(tip => tip.receiverId)).size
    : 0;

  return (
    <ErrorBoundary>
      <AppShell
        currentView={currentView}
        onViewChange={setCurrentView}
        isAuthenticated={isAuthenticated}
        onLogin={login}
        onLogout={logout}
      >
        {isLoading && <LoadingIndicator fullScreen />}

        {currentView === 'dashboard' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-display text-textPrimary">Base Tipper</h1>
                <p className="text-caption">Tip creators on Base, effortlessly</p>
              </div>
              <div className="w-full sm:w-auto">
                {isAuthenticated ? (
                  <button
                    onClick={logout}
                    className="px-4 py-2 bg-surface border border-gray-200 rounded-lg text-textPrimary hover:bg-gray-50 transition-colors"
                  >
                    Disconnect Wallet
                  </button>
                ) : (
                  <button
                    onClick={login}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Connect Wallet
                  </button>
                )}
              </div>
            </div>

            {/* Stats Cards */}
            {isAuthenticated && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-surface p-4 rounded-lg shadow-card">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-md">
                      <Coins className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-caption">Tips Received</p>
                      <p className="text-heading">{formatUSDCAmount(totalTipsReceived)}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-surface p-4 rounded-lg shadow-card">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/10 rounded-md">
                      <TrendingUp className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-caption">Tips Sent</p>
                      <p className="text-heading">{formatUSDCAmount(totalTipsSent)}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-surface p-4 rounded-lg shadow-card">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/10 rounded-md">
                      <Users className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-caption">Creators Tipped</p>
                      <p className="text-heading">{creatorsTipped}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-surface p-4 rounded-lg shadow-card">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-pink-500/10 rounded-md">
                      <Heart className="w-5 h-5 text-pink-500" />
                    </div>
                    <div>
                      <p className="text-caption">Total Tips</p>
                      <p className="text-heading">{tips.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Featured Creators */}
                <div>
                  <h2 className="text-heading text-textPrimary mb-4">Featured Creators</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {featuredCreators.map((creator) => (
                      <CreatorCard
                        key={creator.id}
                        creator={creator}
                        variant="withGoal"
                        onClick={() => handleCreatorClick(creator)}
                        onTip={() => handleTipClick(creator)}
                        isAuthenticated={isAuthenticated}
                      />
                    ))}
                  </div>
                </div>

                {/* Recent Tip Activity */}
                <RecentTipActivity limit={5} />
              </div>
              
              {/* Right Column */}
              <div className="space-y-6">
                {/* Creator Showcase */}
                <TippedCreatorsShowcase 
                  limit={3} 
                  onCreatorClick={handleCreatorClick} 
                />
                
                {/* Top Tippers */}
                <TipLeaderboard limit={3} />
                
                {/* Your Creator Profile (if creator) */}
                {isAuthenticated && isCreator && creatorProfile && (
                  <div className="bg-surface rounded-lg shadow-card p-4">
                    <h3 className="text-heading text-textPrimary mb-3">Your Creator Profile</h3>
                    <GoalProgress 
                      goal={creatorProfile.tippingGoal} 
                      progress={creatorProfile.tippingGoalProgress}
                      description={creatorProfile.tippingGoalDescription}
                    />
                    <button
                      onClick={() => setCurrentView('creator-settings')}
                      className="w-full mt-3 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors"
                    >
                      Manage Creator Profile
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {currentView === 'creators' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h1 className="text-display text-textPrimary">All Creators</h1>
              <div className="w-full sm:w-auto">
                {isAuthenticated ? (
                  <button
                    onClick={logout}
                    className="px-4 py-2 bg-surface border border-gray-200 rounded-lg text-textPrimary hover:bg-gray-50 transition-colors"
                  >
                    Disconnect Wallet
                  </button>
                ) : (
                  <button
                    onClick={login}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Connect Wallet
                  </button>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {creators.map((creator) => (
                <CreatorCard
                  key={creator.id}
                  creator={creator}
                  variant="withGoal"
                  onClick={() => handleCreatorClick(creator)}
                  onTip={() => handleTipClick(creator)}
                  isAuthenticated={isAuthenticated}
                />
              ))}
            </div>
          </div>
        )}

        {currentView === 'creator-profile' && selectedCreator && (
          <CreatorProfile
            creator={selectedCreator}
            tips={getTipsForCreator(selectedCreator.id)}
            onBack={() => setCurrentView('dashboard')}
            onTip={() => handleTipClick(selectedCreator)}
            isAuthenticated={isAuthenticated}
          />
        )}

        {showTipModal && selectedCreator && (
          <TipModal
            creator={selectedCreator}
            isOpen={showTipModal}
            onClose={() => setShowTipModal(false)}
            onSuccess={handleTipSuccess}
            isAuthenticated={isAuthenticated}
            sendTip={sendTip}
          />
        )}
      </AppShell>
    </ErrorBoundary>
  );
}

export default App;
