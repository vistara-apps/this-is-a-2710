import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingIndicator = ({ 
  size = 'medium', 
  text = 'Loading...', 
  fullScreen = false,
  className = ''
}) => {
  const sizes = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };
  
  const sizeClass = sizes[size] || sizes.medium;
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
        <div className="text-center">
          <Loader2 className={`${sizeClass} text-primary animate-spin mx-auto mb-2`} />
          {text && <p className="text-body text-textPrimary">{text}</p>}
        </div>
      </div>
    );
  }
  
  return (
    <div className={`flex items-center justify-center p-4 ${className}`}>
      <div className="text-center">
        <Loader2 className={`${sizeClass} text-primary animate-spin mx-auto mb-2`} />
        {text && <p className="text-body text-textPrimary">{text}</p>}
      </div>
    </div>
  );
};

export default LoadingIndicator;

