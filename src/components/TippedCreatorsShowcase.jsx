import React from 'react';
import { useTip } from '../hooks/useTip';
import { formatUSDCAmount, formatTimestamp } from '../utils/transactions';

const TippedCreatorsShowcase = ({ 
  limit = 5,
  onCreatorClick,
  className = ''
}) => {
  const { recentTips, isLoading } = useTip();
  
  if (isLoading) {
    return (
      <div className={`bg-surface rounded-lg shadow-card p-4 ${className}`}>
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="rounded-full bg-gray-200 h-10 w-10"></div>
                <div className="flex-1 space-y-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  if (!recentTips || recentTips.length === 0) {
    return (
      <div className={`bg-surface rounded-lg shadow-card p-6 text-center ${className}`}>
        <p className="text-caption">No tips yet. Be the first to tip a creator!</p>
      </div>
    );
  }
  
  return (
    <div className={`bg-surface rounded-lg shadow-card overflow-hidden ${className}`}>
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-heading text-textPrimary">Recently Tipped Creators</h3>
      </div>
      
      <div className="divide-y divide-gray-100">
        {recentTips.slice(0, limit).map((tip) => (
          <div 
            key={tip.id} 
            className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => onCreatorClick && onCreatorClick(tip.receiverId)}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {tip.receiverName.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-body font-medium">{tip.receiverName}</p>
                <p className="text-caption">{formatTimestamp(tip.timestamp)}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-body font-semibold text-primary">{formatUSDCAmount(tip.amount)}</p>
              <p className="text-caption">from {tip.senderName}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TippedCreatorsShowcase;

