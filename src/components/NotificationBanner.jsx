import React from 'react';
import { CheckCircle, Info, X } from 'lucide-react';

const NotificationBanner = ({ type = 'info', message, onClose }) => {
  const variants = {
    success: {
      bg: 'bg-green-50 border-green-200',
      text: 'text-green-800',
      icon: CheckCircle,
      iconColor: 'text-green-500'
    },
    info: {
      bg: 'bg-blue-50 border-blue-200',
      text: 'text-blue-800',
      icon: Info,
      iconColor: 'text-blue-500'
    }
  };

  const variant = variants[type];
  const Icon = variant.icon;

  return (
    <div className={`${variant.bg} border rounded-lg p-4 mb-6 animate-slide-up`}>
      <div className="flex items-center gap-3">
        <Icon className={`w-5 h-5 ${variant.iconColor} flex-shrink-0`} />
        <p className={`${variant.text} text-body flex-1`}>{message}</p>
        {onClose && (
          <button
            onClick={onClose}
            className={`${variant.text} hover:opacity-70 transition-opacity`}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default NotificationBanner;