import React from 'react';
import { Heart, Loader2 } from 'lucide-react';

const TipButton = ({ 
  variant = 'default', 
  children, 
  onClick, 
  disabled = false,
  loading = false,
  className = ''
}) => {
  const baseClasses = "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    default: "bg-primary text-white hover:bg-primary/90 focus:ring-primary px-6 py-3 text-body",
    small: "bg-accent text-white hover:bg-accent/90 focus:ring-accent px-4 py-2 text-caption"
  };

  const disabledClasses = "opacity-50 cursor-not-allowed";

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseClasses} 
        ${variants[variant]} 
        ${disabled || loading ? disabledClasses : ''} 
        ${className}
      `}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Heart className="w-4 h-4" />
      )}
      {children}
    </button>
  );
};

export default TipButton;