import React from 'react';
import { MapPin, Target, Heart } from 'lucide-react';
import TipButton from './TipButton';
import ProgressBar from './ProgressBar';

const CreatorCard = ({ creator, variant = 'default', onClick, onTip, isConnected }) => {
  const progressPercentage = creator.tippingGoal 
    ? Math.min((creator.tippingGoalProgress / creator.tippingGoal) * 100, 100) 
    : 0;

  return (
    <div 
      className="bg-surface rounded-lg shadow-card p-6 hover:shadow-lg transition-shadow cursor-pointer animate-fade-in"
      onClick={onClick}
    >
      {/* Creator Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-lg">
            {creator.name.charAt(0)}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-heading text-textPrimary">{creator.name}</h3>
          <p className="text-caption flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {creator.category}
          </p>
        </div>
        <div className="flex items-center gap-1 text-pink-500">
          <Heart className="w-4 h-4 fill-current" />
          <span className="text-caption">{creator.followers}</span>
        </div>
      </div>

      {/* Bio */}
      <p className="text-body text-textSecondary mb-4 line-clamp-2">{creator.bio}</p>

      {/* Tipping Goal */}
      {variant === 'withGoal' && creator.tippingGoal && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-accent" />
            <span className="text-caption font-medium">Current Goal</span>
          </div>
          <p className="text-body text-textPrimary mb-2">{creator.tippingGoalDescription}</p>
          <ProgressBar 
            variant="green" 
            progress={progressPercentage}
            showPercentage={true}
          />
          <div className="flex justify-between mt-1">
            <span className="text-caption">${creator.tippingGoalProgress.toFixed(2)} raised</span>
            <span className="text-caption">${creator.tippingGoal.toFixed(2)} goal</span>
          </div>
        </div>
      )}

      {/* Action Button */}
      <div className="flex gap-2">
        <TipButton
          variant="default"
          onClick={(e) => {
            e.stopPropagation();
            onTip();
          }}
          disabled={!isConnected}
          className="flex-1"
        >
          {isConnected ? 'Tip Creator' : 'Connect Wallet to Tip'}
        </TipButton>
      </div>
    </div>
  );
};

export default CreatorCard;