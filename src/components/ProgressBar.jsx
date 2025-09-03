import React from 'react';

const ProgressBar = ({ 
  value = 0, 
  max = 100, 
  height = 'md',
  variant = 'default',
  showLabel = false,
  className = ''
}) => {
  // Calculate percentage
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);
  
  // Height classes
  const heightClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-4',
    xl: 'h-6'
  };
  
  // Variant classes
  const variantClasses = {
    default: 'bg-primary',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500',
    gray: 'bg-gray-500'
  };
  
  const heightClass = heightClasses[height] || heightClasses.md;
  const variantClass = variantClasses[variant] || variantClasses.default;
  
  return (
    <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${heightClass} ${className}`}>
      <div 
        className={`${variantClass} rounded-full transition-all duration-500 ease-out`}
        style={{ width: `${percentage}%` }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        {showLabel && (
          <span className="text-xs text-white px-2">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;

