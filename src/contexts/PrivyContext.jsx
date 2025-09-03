import React, { createContext, useContext, useState, useEffect } from 'react';
import { PrivyAuthProvider } from '@privy-io/react-auth';
import { PrivyWagmiConnector } from '@privy-io/wagmi-connector';
import { createConfig, configureChains } from 'wagmi';
import { base } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { PRIVY_APP_ID } from '../constants/api';

// Create context
const PrivyContext = createContext(null);

export const PrivyProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Wagmi configuration
  const { chains, provider, webSocketProvider } = configureChains(
    [base],
    [publicProvider()]
  );
  
  const wagmiConfig = createConfig({
    autoConnect: true,
    provider,
    webSocketProvider,
  });

  // Handle login state change
  const handleLoginStateChange = (loginState) => {
    setIsAuthenticated(loginState.authenticated);
    setIsLoading(false);
  };

  // Handle user change
  const handleUserChange = (user) => {
    setUser(user);
    
    // Get wallet address
    if (user?.wallet?.address) {
      setAddress(user.wallet.address);
    } else {
      setAddress(null);
    }
  };

  // Login
  const login = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // In a real app, this would call the Privy login method
      // For now, we'll simulate a successful login
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setIsAuthenticated(true);
      setUser({
        id: 'simulated-user-id',
        wallet: {
          address: '0x' + Math.random().toString(16).substring(2, 42),
        },
      });
    } catch (err) {
      setError(err.message || 'Failed to login');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // In a real app, this would call the Privy logout method
      // For now, we'll simulate a successful logout
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setIsAuthenticated(false);
      setUser(null);
      setAddress(null);
    } catch (err) {
      setError(err.message || 'Failed to logout');
      console.error('Logout error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Write contract
  const writeContractAsync = async ({ address, abi, functionName, args }) => {
    try {
      // In a real app, this would call the Privy/wagmi writeContract method
      // For now, we'll simulate a successful transaction
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return '0x' + Math.random().toString(16).substring(2, 66);
    } catch (err) {
      console.error('Write contract error:', err);
      throw err;
    }
  };

  // Provide context value
  const contextValue = {
    isAuthenticated,
    user,
    address,
    isLoading,
    error,
    login,
    logout,
    writeContractAsync,
  };

  return (
    <PrivyContext.Provider value={contextValue}>
      {children}
    </PrivyContext.Provider>
  );
};

export const usePrivy = () => {
  const context = useContext(PrivyContext);
  if (!context) {
    throw new Error('usePrivy must be used within a PrivyProvider');
  }
  return context;
};
