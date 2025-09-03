import React from 'react';
import { Trophy, Medal, Award } from 'lucide-react';
import { useTip } from '../hooks/useTip';
import { formatUSDCAmount } from '../utils/transactions';

const TipLeaderboard = ({ 
  limit = 5,
  className = ''
}) => {
  const { topTippers, isLoading } = useTip();
  
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
  
  if (!topTippers || topTippers.length === 0) {
    return (
      <div className={`bg-surface rounded-lg shadow-card p-6 text-center ${className}`}>
        <p className="text-caption">No tippers yet. Be the first to tip a creator!</p>
      </div>
    );
  }
  
  // Icons for top 3 positions
  const rankIcons = [
    <Trophy key="1" className="w-5 h-5 text-yellow-500" />,
    <Medal key="2" className="w-5 h-5 text-gray-400" />,
    <Award key="3" className="w-5 h-5 text-amber-700" />
  ];
  
  return (
    <div className={`bg-surface rounded-lg shadow-card overflow-hidden ${className}`}>
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-heading text-textPrimary">Top Tippers</h3>
      </div>
      
      <div className="divide-y divide-gray-100">
        {topTippers.slice(0, limit).map((tipper, index) => (
          <div 
            key={tipper.id} 
            className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                {index < 3 ? (
                  rankIcons[index]
                ) : (
                  <span className="text-white font-semibold text-sm">
                    {index + 1}
                  </span>
                )}
              </div>
              <div>
                <p className="text-body font-medium">{tipper.name}</p>
                <p className="text-caption">{tipper.tipCount} tip{tipper.tipCount !== 1 ? 's' : ''}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-body font-semibold text-primary">{formatUSDCAmount(tipper.totalAmount)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TipLeaderboard;

