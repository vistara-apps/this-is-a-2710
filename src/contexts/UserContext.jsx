import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePrivy } from '../hooks/usePrivy';
import { useProfiles } from '../hooks/useProfiles';

// Create context
const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const { isAuthenticated, address, user: privyUser } = usePrivy();
  const { fetchProfilesByAddress } = useProfiles();
  
  const [user, setUser] = useState(null);
  const [isCreator, setIsCreator] = useState(false);
  const [creatorProfile, setCreatorProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize user data when authenticated
  useEffect(() => {
    const initUser = async () => {
      if (isAuthenticated && address) {
        setIsLoading(true);
        
        try {
          // In a real app, this would fetch user data from an API
          // For now, we'll create a simulated user
          const userData = {
            id: address,
            address,
            name: `User ${address.substring(0, 6)}`,
            isCreator: Math.random() > 0.5, // 50% chance of being a creator
            createdAt: new Date(),
          };
          
          setUser(userData);
          setIsCreator(userData.isCreator);
          
          // If user is a creator, create a creator profile
          if (userData.isCreator) {
            const creatorData = {
              userId: address,
              bio: 'This is a simulated creator profile',
              tippingGoal: Math.floor(Math.random() * 1000) + 100,
              tippingGoalProgress: Math.floor(Math.random() * 100),
              tippingGoalDescription: 'Help me create more content!',
              createdAt: new Date(),
            };
            
            setCreatorProfile(creatorData);
          }
        } catch (err) {
          setError(err.message || 'Failed to initialize user');
          console.error('Init user error:', err);
        } finally {
          setIsLoading(false);
        }
      } else {
        // Reset user data when not authenticated
        setUser(null);
        setIsCreator(false);
        setCreatorProfile(null);
      }
    };
    
    initUser();
  }, [isAuthenticated, address]);

  // Become a creator
  const becomeCreator = async () => {
    if (!isAuthenticated) {
      throw new Error('You must be logged in to become a creator');
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would call an API to create a creator profile
      // For now, we'll simulate a successful creator profile creation
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const creatorData = {
        userId: address,
        bio: '',
        tippingGoal: 0,
        tippingGoalProgress: 0,
        tippingGoalDescription: '',
        createdAt: new Date(),
      };
      
      setIsCreator(true);
      setCreatorProfile(creatorData);
      
      return creatorData;
    } catch (err) {
      setError(err.message || 'Failed to become a creator');
      console.error('Become creator error:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Update creator profile
  const updateCreatorProfile = async (profileData) => {
    if (!isAuthenticated) {
      throw new Error('You must be logged in to update your profile');
    }
    
    if (!isCreator) {
      throw new Error('You must be a creator to update your profile');
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would call an API to update the creator profile
      // For now, we'll simulate a successful profile update
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedProfile = {
        ...creatorProfile,
        ...profileData,
      };
      
      setCreatorProfile(updatedProfile);
      
      return updatedProfile;
    } catch (err) {
      setError(err.message || 'Failed to update profile');
      console.error('Update profile error:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Set tipping goal
  const setTippingGoal = async (goal, description = '') => {
    if (!isAuthenticated) {
      throw new Error('You must be logged in to set a tipping goal');
    }
    
    if (!isCreator) {
      throw new Error('You must be a creator to set a tipping goal');
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would call an API to update the tipping goal
      // For now, we'll simulate a successful goal update
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedProfile = {
        ...creatorProfile,
        tippingGoal: goal,
        tippingGoalDescription: description,
      };
      
      setCreatorProfile(updatedProfile);
      
      return updatedProfile;
    } catch (err) {
      setError(err.message || 'Failed to set tipping goal');
      console.error('Set tipping goal error:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Provide context value
  const contextValue = {
    user,
    isCreator,
    creatorProfile,
    isLoading,
    error,
    address,
    becomeCreator,
    updateCreatorProfile,
    setTippingGoal,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

