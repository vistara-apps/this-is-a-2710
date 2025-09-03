import { useState } from 'react';
import { usePrivy } from './usePrivy';
import { useErrorHandler } from './useErrorHandler';
import { useNotification } from '../contexts/NotificationContext';
import { USDC_CONTRACT_ADDRESS, USDC_ABI } from '../constants/contracts';

export function useTransactions() {
  const { writeContractAsync, address } = usePrivy();
  const { handleError, handleAsync } = useErrorHandler();
  const { showSuccess, showError } = useNotification();
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Send a tip to a creator
   * @param {string} creatorId - Creator's wallet address
   * @param {number} amount - Amount in USDC
   * @param {string} message - Optional message
   * @returns {Promise<object>} - Transaction result
   */
  const sendTip = async (creatorId, amount, message = '') => {
    if (!address) {
      throw new Error('Wallet not connected');
    }

    if (!creatorId) {
      throw new Error('Creator address is required');
    }

    if (!amount || amount <= 0) {
      throw new Error('Amount must be greater than 0');
    }

    setIsLoading(true);

    try {
      // Convert amount to smallest unit (6 decimals for USDC)
      const amountInSmallestUnit = BigInt(Math.floor(amount * 1000000));
      
      // Send USDC transaction
      const txHash = await writeContractAsync({
        address: USDC_CONTRACT_ADDRESS,
        abi: USDC_ABI,
        functionName: 'transfer',
        args: [creatorId, amountInSmallestUnit],
      });
      
      showSuccess(`Successfully sent ${amount} USDC to creator!`);
      
      return {
        txHash,
        senderId: address,
        receiverId: creatorId,
        amount,
        timestamp: new Date(),
        message
      };
    } catch (error) {
      const errorMessage = error.message || 'Failed to send tip';
      showError(errorMessage);
      handleError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendTip,
    isLoading
  };
}

