import React from 'react';
import { Heart, ExternalLink } from 'lucide-react';
import { useTip } from '../hooks/useTip';
import { formatUSDCAmount, formatTimestamp, getTransactionExplorerUrl } from '../utils/transactions';

const RecentTipActivity = ({ 
  limit = 5,
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
        <p className="text-caption">No tip activity yet. Be the first to tip a creator!</p>
      </div>
    );
  }
  
  return (
    <div className={`bg-surface rounded-lg shadow-card overflow-hidden ${className}`}>
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-heading text-textPrimary">Recent Tip Activity</h3>
      </div>
      
      <div className="divide-y divide-gray-100">
        {recentTips.slice(0, limit).map((tip) => (
          <div key={tip.id} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-pink-500" />
                <span className="text-body font-medium">
                  <span className="font-semibold">{tip.senderName}</span> tipped <span className="font-semibold">{tip.receiverName}</span>
                </span>
              </div>
              <span className="text-caption">{formatTimestamp(tip.timestamp)}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <p className="text-caption">
                {tip.message ? `"${tip.message}"` : 'No message'}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-body font-semibold text-primary">{formatUSDCAmount(tip.amount)}</span>
                {tip.transactionHash && (
                  <a 
                    href={getTransactionExplorerUrl(tip.transactionHash)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-textSecondary hover:text-primary transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTipActivity;

