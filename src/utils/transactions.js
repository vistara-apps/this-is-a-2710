import { BASE_EXPLORER_URL } from '../constants/api';

/**
 * Format USDC amount with dollar sign and 2 decimal places
 * @param {number} amount - Amount in USDC
 * @returns {string} - Formatted amount string
 */
export const formatUSDCAmount = (amount) => {
  if (amount === undefined || amount === null) return '$0.00';
  
  // Format with 2 decimal places and dollar sign
  return `$${parseFloat(amount).toFixed(2)}`;
};

/**
 * Format timestamp to relative time (e.g., "2 hours ago")
 * @param {Date|string} timestamp - Timestamp to format
 * @returns {string} - Formatted relative time
 */
export const formatTimestamp = (timestamp) => {
  if (!timestamp) return '';
  
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  
  if (diffSec < 60) {
    return 'just now';
  } else if (diffMin < 60) {
    return `${diffMin} minute${diffMin !== 1 ? 's' : ''} ago`;
  } else if (diffHour < 24) {
    return `${diffHour} hour${diffHour !== 1 ? 's' : ''} ago`;
  } else if (diffDay < 7) {
    return `${diffDay} day${diffDay !== 1 ? 's' : ''} ago`;
  } else {
    return date.toLocaleDateString();
  }
};

/**
 * Format wallet address to shortened form (e.g., "0x1234...5678")
 * @param {string} address - Wallet address
 * @param {number} startChars - Number of characters to show at start
 * @param {number} endChars - Number of characters to show at end
 * @returns {string} - Formatted address
 */
export const formatAddress = (address, startChars = 6, endChars = 4) => {
  if (!address) return '';
  
  if (address.length <= startChars + endChars) {
    return address;
  }
  
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
};

/**
 * Get transaction explorer URL
 * @param {string} txHash - Transaction hash
 * @returns {string} - Explorer URL
 */
export const getTransactionExplorerUrl = (txHash) => {
  if (!txHash) return '';
  
  return `${BASE_EXPLORER_URL}/tx/${txHash}`;
};

/**
 * Get address explorer URL
 * @param {string} address - Wallet address
 * @returns {string} - Explorer URL
 */
export const getAddressExplorerUrl = (address) => {
  if (!address) return '';
  
  return `${BASE_EXPLORER_URL}/address/${address}`;
};

/**
 * Get token explorer URL
 * @param {string} tokenAddress - Token contract address
 * @returns {string} - Explorer URL
 */
export const getTokenExplorerUrl = (tokenAddress) => {
  if (!tokenAddress) return '';
  
  return `${BASE_EXPLORER_URL}/token/${tokenAddress}`;
};

