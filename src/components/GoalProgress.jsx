import React from 'react';
import ProgressBar from './ProgressBar';
import { formatUSDCAmount } from '../utils/transactions';

const GoalProgress = ({ 
  goal, 
  progress, 
  description, 
  className = '',
  showDetails = true
}) => {
  // Calculate percentage
  const percentage = goal > 0 ? Math.min(Math.round((progress / goal) * 100), 100) : 0;
  
  // Determine status
  const isComplete = percentage >= 100;
  
  return (
    <div className={`bg-surface rounded-lg p-4 shadow-card ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-body font-semibold text-textPrimary">Tipping Goal</h3>
        <span className="text-caption font-medium">
          {isComplete ? (
            <span className="text-green-500">Completed!</span>
          ) : (
            <span>{percentage}% Complete</span>
          )}
        </span>
      </div>
      
      {description && (
        <p className="text-caption mb-3">{description}</p>
      )}
      
      <ProgressBar 
        value={percentage} 
        variant={isComplete ? 'green' : 'default'} 
      />
      
      {showDetails && (
        <div className="flex justify-between items-center mt-2">
          <span className="text-caption">
            {formatUSDCAmount(progress)} raised
          </span>
          <span className="text-caption">
            Goal: {formatUSDCAmount(goal)}
          </span>
        </div>
      )}
    </div>
  );
};

export default GoalProgress;

