import React, { createContext, useContext, useState, useCallback } from 'react';
import NotificationBanner from '../components/NotificationBanner';

// Create context
const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  
  // Add a notification
  const addNotification = useCallback((type, message, duration = 5000) => {
    const id = Date.now().toString();
    
    const notification = {
      id,
      type,
      message,
      duration
    };
    
    setNotifications(prev => [...prev, notification]);
    
    // Auto-remove after duration
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }
    
    return id;
  }, []);
  
  // Remove a notification
  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);
  
  // Show success notification
  const showSuccess = useCallback((message, duration = 5000) => {
    return addNotification('success', message, duration);
  }, [addNotification]);
  
  // Show error notification
  const showError = useCallback((message, duration = 5000) => {
    return addNotification('error', message, duration);
  }, [addNotification]);
  
  // Show info notification
  const showInfo = useCallback((message, duration = 5000) => {
    return addNotification('info', message, duration);
  }, [addNotification]);
  
  // Show warning notification
  const showWarning = useCallback((message, duration = 5000) => {
    return addNotification('warning', message, duration);
  }, [addNotification]);
  
  // Provide context value
  const contextValue = {
    notifications,
    addNotification,
    removeNotification,
    showSuccess,
    showError,
    showInfo,
    showWarning
  };
  
  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      
      {/* Render notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(notification => (
          <NotificationBanner
            key={notification.id}
            type={notification.type}
            message={notification.message}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

