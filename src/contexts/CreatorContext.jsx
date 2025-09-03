import React, { createContext, useContext, useState, useEffect } from 'react';
import { useProfiles } from '../hooks/useProfiles';
import { mockCreators } from '../data/mockData';

// Create context
const CreatorContext = createContext(null);

export const CreatorProvider = ({ children }) => {
  const { fetchProfile } = useProfiles();
  const [creators, setCreators] = useState([]);
  const [featuredCreators, setFeaturedCreators] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize with mock data
  useEffect(() => {
    setIsLoading(true);
    
    // In a real app, this would fetch creators from an API
    // For now, we'll use the mock data
    setCreators(mockCreators);
    
    // Set featured creators (first 3)
    setFeaturedCreators(mockCreators.slice(0, 3));
    
    setIsLoading(false);
  }, []);

  // Get creator by ID
  const getCreatorById = (creatorId) => {
    return creators.find(creator => creator.id === creatorId);
  };

  // Get creator by wallet address
  const getCreatorByAddress = (address) => {
    return creators.find(creator => creator.id === address);
  };

  // Update creator tipping goal progress
  const updateCreatorTippingProgress = (creatorId, amount) => {
    setCreators(prev => prev.map(creator => {
      if (creator.id === creatorId) {
        const newProgress = creator.tippingGoalProgress + amount;
        return {
          ...creator,
          tippingGoalProgress: Math.min(newProgress, creator.tippingGoal || newProgress)
        };
      }
      return creator;
    }));
  };

  // Add a new creator
  const addCreator = (creatorData) => {
    const newCreator = {
      id: creatorData.id || creatorData.userId || Date.now().toString(),
      ...creatorData,
    };
    
    setCreators(prev => [...prev, newCreator]);
    
    return newCreator;
  };

  // Update creator data
  const updateCreator = (creatorId, creatorData) => {
    setCreators(prev => prev.map(creator => {
      if (creator.id === creatorId) {
        return {
          ...creator,
          ...creatorData,
        };
      }
      return creator;
    }));
  };

  // Provide context value
  const contextValue = {
    creators,
    featuredCreators,
    getCreatorById,
    getCreatorByAddress,
    updateCreatorTippingProgress,
    addCreator,
    updateCreator,
    isLoading,
    error,
  };

  return (
    <CreatorContext.Provider value={contextValue}>
      {children}
    </CreatorContext.Provider>
  );
};

export const useCreator = () => {
  const context = useContext(CreatorContext);
  if (!context) {
    throw new Error('useCreator must be used within a CreatorProvider');
  }
  return context;
};

