import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { useCreator } from './CreatorContext';
import { useUser } from './UserContext';
import { mockTips } from '../data/mockData';

// Create context
const TipContext = createContext(null);

export const TipProvider = ({ children }) => {
  const { sendTip: sendTransaction } = useTransactions();
  const { updateCreatorTippingProgress } = useCreator();
  const { address } = useUser();
  const [tips, setTips] = useState([]);
  const [recentTips, setRecentTips] = useState([]);
  const [topTippers, setTopTippers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize with mock data
  useEffect(() => {
    setIsLoading(true);
    
    // In a real app, this would fetch tips from an API
    // For now, we'll use the mock data
    setTips(mockTips);
    
    // Set recent tips (first 5)
    setRecentTips(mockTips.slice(0, 5));
    
    // Calculate top tippers
    const tipperMap = {};
    mockTips.forEach(tip => {
      if (!tipperMap[tip.senderId]) {
        tipperMap[tip.senderId] = {
          id: tip.senderId,
          name: tip.senderName,
          totalAmount: 0,
          tipCount: 0,
        };
      }
      
      tipperMap[tip.senderId].totalAmount += tip.amount;
      tipperMap[tip.senderId].tipCount += 1;
    });
    
    const tippers = Object.values(tipperMap);
    tippers.sort((a, b) => b.totalAmount - a.totalAmount);
    
    setTopTippers(tippers.slice(0, 5));
    
    setIsLoading(false);
  }, []);

  // Send a tip
  const sendTip = async (creatorId, amount, message = '') => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Get creator
      const creator = tips.find(tip => tip.receiverId === creatorId);
      if (!creator) {
        throw new Error('Creator not found');
      }
      
      // Send transaction
      const result = await sendTransaction(creatorId, amount, message);
      
      // Create tip record
      const newTip = {
        id: Date.now().toString(),
        senderId: address,
        receiverId: creatorId,
        senderName: 'You',
        receiverName: creator.receiverName,
        amount,
        currency: 'USDC',
        message: message || `Tip for ${creator.receiverName}`,
        timestamp: new Date(),
        transactionHash: result.txHash,
      };
      
      // Add to tips list
      setTips(prev => [newTip, ...prev]);
      
      // Update recent tips
      setRecentTips(prev => [newTip, ...prev].slice(0, 5));
      
      // Update creator tipping progress
      updateCreatorTippingProgress(creatorId, amount);
      
      // Update top tippers
      const updatedTopTippers = [...topTippers];
      const existingTipperIndex = updatedTopTippers.findIndex(tipper => tipper.id === address);
      
      if (existingTipperIndex >= 0) {
        updatedTopTippers[existingTipperIndex].totalAmount += amount;
        updatedTopTippers[existingTipperIndex].tipCount += 1;
      } else {
        updatedTopTippers.push({
          id: address,
          name: 'You',
          totalAmount: amount,
          tipCount: 1,
        });
      }
      
      updatedTopTippers.sort((a, b) => b.totalAmount - a.totalAmount);
      setTopTippers(updatedTopTippers.slice(0, 5));
      
      return newTip;
    } catch (err) {
      setError(err.message || 'Failed to send tip');
      console.error('Send tip error:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Get tips for a creator
  const getTipsForCreator = (creatorId) => {
    return tips.filter(tip => tip.receiverId === creatorId);
  };

  // Get tips sent by a user
  const getTipsSentByUser = (userId) => {
    return tips.filter(tip => tip.senderId === userId);
  };

  // Get tips received by a user
  const getTipsReceivedByUser = (userId) => {
    return tips.filter(tip => tip.receiverId === userId);
  };

  // Provide context value
  const contextValue = {
    tips,
    recentTips,
    topTippers,
    sendTip,
    getTipsForCreator,
    getTipsSentByUser,
    getTipsReceivedByUser,
    isLoading,
    error,
  };

  return (
    <TipContext.Provider value={contextValue}>
      {children}
    </TipContext.Provider>
  );
};

export const useTip = () => {
  const context = useContext(TipContext);
  if (!context) {
    throw new Error('useTip must be used within a TipProvider');
  }
  return context;
};

