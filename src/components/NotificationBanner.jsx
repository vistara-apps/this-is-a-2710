import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const NotificationBanner = ({ 
  type = 'info', 
  message, 
  onClose,
  duration = 5000,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(true);
  
  // Auto-close after duration
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) {
          onClose();
        }
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);
  
  // Handle close
  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };
  
  // If not visible, don't render
  if (!isVisible) {
    return null;
  }
  
  // Determine styles based on type
  const styles = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-700',
      icon: <CheckCircle className="w-5 h-5" />,
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-700',
      icon: <AlertCircle className="w-5 h-5" />,
    },
    warning: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-700',
      icon: <AlertTriangle className="w-5 h-5" />,
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-700',
      icon: <Info className="w-5 h-5" />,
    },
  };
  
  const { bg, border, text, icon } = styles[type] || styles.info;
  
  return (
    <div 
      className={`${bg} ${border} ${text} border rounded-lg p-4 shadow-md animate-slide-down ${className}`}
      role="alert"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-body">{message}</p>
        </div>
        <button 
          onClick={handleClose}
          className="ml-3 flex-shrink-0 text-gray-400 hover:text-gray-500"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default NotificationBanner;

