import React from 'react';
import { ArrowLeft, MapPin, Target, Calendar, ExternalLink } from 'lucide-react';
import TipButton from './TipButton';
import ProgressBar from './ProgressBar';

const CreatorProfile = ({ creator, tips, onBack, onTip, isConnected }) => {
  const totalTipsReceived = tips.reduce((sum, tip) => sum + tip.amount, 0);
  const recentTips = tips.slice(0, 10);
  
  const progressPercentage = creator.tippingGoal 
    ? Math.min((creator.tippingGoalProgress / creator.tippingGoal) * 100, 100) 
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-textSecondary" />
        </button>
        <h1 className="text-display text-textPrimary">Creator Profile</h1>
      </div>

      {/* Creator Header */}
      <div className="bg-surface rounded-xl shadow-card p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-3xl">
              {creator.name.charAt(0)}
            </span>
          </div>
          
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-display text-textPrimary mb-2">{creator.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-caption">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {creator.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Joined {creator.joinedDate || 'Recently'}
                </span>
                <span>{creator.followers} followers</span>
              </div>
            </div>
            
            <p className="text-body text-textSecondary max-w-2xl">{creator.bio}</p>
            
            <div className="flex flex-wrap gap-3">
              <TipButton
                onClick={onTip}
                disabled={!isConnected}
              >
                {isConnected ? 'Tip Creator' : 'Connect Wallet to Tip'}
              </TipButton>
              
              {creator.externalLink && (
                <button className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 text-textSecondary rounded-lg hover:bg-gray-50 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  Visit Website
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface p-6 rounded-lg shadow-card">
          <h3 className="text-heading text-textPrimary mb-2">Total Tips Received</h3>
          <p className="text-display text-primary">${totalTipsReceived.toFixed(2)}</p>
          <p className="text-caption">From {tips.length} tips</p>
        </div>
        
        <div className="bg-surface p-6 rounded-lg shadow-card">
          <h3 className="text-heading text-textPrimary mb-2">Unique Tippers</h3>
          <p className="text-display text-accent">{new Set(tips.map(tip => tip.senderId)).size}</p>
          <p className="text-caption">People who tipped</p>
        </div>
        
        <div className="bg-surface p-6 rounded-lg shadow-card">
          <h3 className="text-heading text-textPrimary mb-2">Average Tip</h3>
          <p className="text-display text-purple-500">
            ${tips.length > 0 ? (totalTipsReceived / tips.length).toFixed(2) : '0.00'}
          </p>
          <p className="text-caption">Per tip</p>
        </div>
      </div>

      {/* Current Goal */}
      {creator.tippingGoal && (
        <div className="bg-surface rounded-lg shadow-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-accent" />
            <h2 className="text-heading text-textPrimary">Current Goal</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-body font-semibold text-textPrimary mb-2">
                {creator.tippingGoalDescription}
              </h3>
              <p className="text-caption text-textSecondary mb-4">
                Help {creator.name} reach their goal and support their next project!
              </p>
            </div>
            
            <ProgressBar 
              variant="green" 
              progress={progressPercentage}
              showPercentage={true}
            />
            
            <div className="flex justify-between">
              <span className="text-body font-semibold">${creator.tippingGoalProgress.toFixed(2)} raised</span>
              <span className="text-caption">${creator.tippingGoal.toFixed(2)} goal</span>
            </div>
          </div>
        </div>
      )}

      {/* Recent Tips */}
      <div className="bg-surface rounded-lg shadow-card">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-heading text-textPrimary">Recent Tips</h2>
        </div>
        
        {recentTips.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {recentTips.map((tip) => (
              <div key={tip.id} className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {tip.senderName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-body font-medium">{tip.senderName}</p>
                    <p className="text-caption">{tip.timestamp.toLocaleDateString()}</p>
                    {tip.message && (
                      <p className="text-caption text-textSecondary mt-1 italic">"{tip.message}"</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-body font-semibold text-primary">${tip.amount} USDC</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-caption">No tips received yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorProfile;