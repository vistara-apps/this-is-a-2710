import React from 'react';

const ProgressBar = ({ 
  variant = 'green', 
  progress = 0, 
  showPercentage = false,
  className = ''
}) => {
  const variants = {
    green: "bg-accent",
    blue: "bg-primary",
    purple: "bg-purple-500"
  };

  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={`w-full ${className}`}>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div 
          className={`h-full ${variants[variant]} transition-all duration-300 ease-out rounded-full`}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
      {showPercentage && (
        <div className="flex justify-between mt-1">
          <span className="text-caption">{clampedProgress.toFixed(1)}% complete</span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;