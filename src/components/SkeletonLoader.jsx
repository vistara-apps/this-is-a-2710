import React from 'react';

const SkeletonLoader = ({ 
  type = 'text', 
  lines = 1, 
  width = 'full',
  height,
  className = '',
  rounded = 'md'
}) => {
  const widthClasses = {
    full: 'w-full',
    '3/4': 'w-3/4',
    '1/2': 'w-1/2',
    '1/3': 'w-1/3',
    '1/4': 'w-1/4'
  };
  
  const heightClasses = {
    sm: 'h-3',
    md: 'h-4',
    lg: 'h-6',
    xl: 'h-8',
    '2xl': 'h-10'
  };
  
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded',
    lg: 'rounded-lg',
    full: 'rounded-full'
  };
  
  const widthClass = widthClasses[width] || widthClasses.full;
  const heightClass = height ? (heightClasses[height] || height) : heightClasses.md;
  const roundedClass = roundedClasses[rounded] || roundedClasses.md;
  
  if (type === 'avatar') {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className={`bg-gray-200 ${heightClass} ${widthClass} rounded-full`}></div>
      </div>
    );
  }
  
  if (type === 'card') {
    return (
      <div className={`animate-pulse bg-surface p-4 rounded-lg shadow-card ${className}`}>
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
        <div className="mt-4 flex justify-between">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    );
  }
  
  if (type === 'list') {
    return (
      <div className={`animate-pulse ${className}`}>
        {[...Array(lines)].map((_, i) => (
          <div key={i} className="flex items-center space-x-3 py-3">
            <div className="rounded-full bg-gray-200 h-10 w-10"></div>
            <div className="flex-1 space-y-1">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
        ))}
      </div>
    );
  }
  
  // Default text skeleton
  return (
    <div className={`animate-pulse ${className}`}>
      {[...Array(lines)].map((_, i) => (
        <div 
          key={i} 
          className={`bg-gray-200 ${heightClass} ${widthClass} ${roundedClass} ${i < lines - 1 ? 'mb-2' : ''}`}
        ></div>
      ))}
    </div>
  );
};

export default SkeletonLoader;

