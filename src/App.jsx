import React, { useState, useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import AppShell from './components/AppShell';
import CreatorCard from './components/CreatorCard';
import TipButton from './components/TipButton';
import ProgressBar from './components/ProgressBar';
import NotificationBanner from './components/NotificationBanner';
import TipModal from './components/TipModal';
import CreatorProfile from './components/CreatorProfile';
import { mockCreators, mockTips } from './data/mockData';
import { Coins, TrendingUp, Users, Heart } from 'lucide-react';

function App() {
  const { address, isConnected } = useAccount();
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [showTipModal, setShowTipModal] = useState(false);
  const [notification, setNotification] = useState(null);
  const [creators, setCreators] = useState(mockCreators);
  const [tips, setTips] = useState(mockTips);

  // Show notification for 3 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleTipSuccess = (tip) => {
    // Add new tip to the list
    const newTip = {
      ...tip,
      id: Date.now().toString(),
      timestamp: new Date(),
      transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`
    };
    
    setTips(prev => [newTip, ...prev]);
    
    // Update creator's goal progress
    setCreators(prev => prev.map(creator => {
      if (creator.id === tip.receiverId) {
        const newProgress = creator.tippingGoalProgress + tip.amount;
        return {
          ...creator,
          tippingGoalProgress: Math.min(newProgress, creator.tippingGoal || newProgress)
        };
      }
      return creator;
    }));

    setNotification({
      type: 'success',
      message: `Successfully tipped $${tip.amount} USDC to ${tip.receiverName}!`
    });
    
    setShowTipModal(false);
  };

  const handleCreatorClick = (creator) => {
    setSelectedCreator(creator);
    setCurrentView('creator-profile');
  };

  const handleTipClick = (creator) => {
    setSelectedCreator(creator);
    setShowTipModal(true);
  };

  const totalTipsReceived = tips
    .filter(tip => isConnected && tip.receiverId === address)
    .reduce((sum, tip) => sum + tip.amount, 0);

  const totalTipsSent = tips
    .filter(tip => isConnected && tip.senderId === address)
    .reduce((sum, tip) => sum + tip.amount, 0);

  const recentTips = tips.slice(0, 5);

  return (
    <AppShell
      currentView={currentView}
      onViewChange={setCurrentView}
      isConnected={isConnected}
    >
      {notification && (
        <NotificationBanner
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      {currentView === 'dashboard' && (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-display text-textPrimary">Base Tipper</h1>
              <p className="text-caption">Tip creators on Base, effortlessly</p>
            </div>
            <div className="w-full sm:w-auto">
              <ConnectButton />
            </div>
          </div>

          {/* Stats Cards */}
          {isConnected && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-surface p-4 rounded-lg shadow-card">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-md">
                    <Coins className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-caption">Tips Received</p>
                    <p className="text-heading">${totalTipsReceived.toFixed(2)}</p>
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
                    <p className="text-heading">${totalTipsSent.toFixed(2)}</p>
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
                    <p className="text-heading">{new Set(tips.filter(tip => tip.senderId === address).map(tip => tip.receiverId)).size}</p>
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

          {/* Featured Creators */}
          <div>
            <h2 className="text-heading text-textPrimary mb-4">Featured Creators</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {creators.slice(0, 6).map((creator) => (
                <CreatorCard
                  key={creator.id}
                  creator={creator}
                  variant="withGoal"
                  onClick={() => handleCreatorClick(creator)}
                  onTip={() => handleTipClick(creator)}
                  isConnected={isConnected}
                />
              ))}
            </div>
          </div>

          {/* Recent Tips */}
          <div>
            <h2 className="text-heading text-textPrimary mb-4">Recent Tips</h2>
            <div className="bg-surface rounded-lg shadow-card overflow-hidden">
              {recentTips.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {recentTips.map((tip) => (
                    <div key={tip.id} className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {tip.senderName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-body font-medium">{tip.senderName}</p>
                          <p className="text-caption">tipped {tip.receiverName}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-body font-semibold text-primary">${tip.amount} USDC</p>
                        <p className="text-caption">{tip.timestamp.toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-caption">No tips yet. Be the first to tip a creator!</p>
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
              <ConnectButton />
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
                isConnected={isConnected}
              />
            ))}
          </div>
        </div>
      )}

      {currentView === 'creator-profile' && selectedCreator && (
        <CreatorProfile
          creator={selectedCreator}
          tips={tips.filter(tip => tip.receiverId === selectedCreator.id)}
          onBack={() => setCurrentView('dashboard')}
          onTip={() => handleTipClick(selectedCreator)}
          isConnected={isConnected}
        />
      )}

      {showTipModal && selectedCreator && (
        <TipModal
          creator={selectedCreator}
          isOpen={showTipModal}
          onClose={() => setShowTipModal(false)}
          onSuccess={handleTipSuccess}
          isConnected={isConnected}
        />
      )}
    </AppShell>
  );
}

export default App;