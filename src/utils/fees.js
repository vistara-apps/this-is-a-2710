import { PLATFORM_FEE_PERCENTAGE, MAX_PLATFORM_FEE } from '../constants/contracts';

/**
 * Calculate platform fee for a tip
 * @param {number} amount - Tip amount in USDC
 * @returns {number} - Fee amount in USDC
 */
export const calculatePlatformFee = (amount) => {
  if (!amount || amount <= 0) return 0;
  
  const fee = amount * PLATFORM_FEE_PERCENTAGE;
  return Math.min(fee, MAX_PLATFORM_FEE);
};

/**
 * Calculate total amount including fee
 * @param {number} amount - Tip amount in USDC
 * @returns {number} - Total amount in USDC
 */
export const calculateTotalWithFee = (amount) => {
  if (!amount || amount <= 0) return 0;
  
  const fee = calculatePlatformFee(amount);
  return amount + fee;
};

/**
 * Format fee as percentage
 * @param {number} percentage - Fee percentage (e.g., 0.005 for 0.5%)
 * @returns {string} - Formatted percentage string
 */
export const formatFeePercentage = (percentage) => {
  return `${(percentage * 100).toFixed(1)}%`;
};

/**
 * Calculate fee breakdown
 * @param {number} amount - Tip amount in USDC
 * @returns {object} - Fee breakdown
 */
export const calculateFeeBreakdown = (amount) => {
  if (!amount || amount <= 0) {
    return {
      tipAmount: 0,
      feeAmount: 0,
      feePercentage: formatFeePercentage(PLATFORM_FEE_PERCENTAGE),
      totalAmount: 0,
      isFeeMaxed: false
    };
  }
  
  const feeAmount = calculatePlatformFee(amount);
  const totalAmount = amount + feeAmount;
  const isFeeMaxed = feeAmount >= MAX_PLATFORM_FEE;
  
  return {
    tipAmount: amount,
    feeAmount,
    feePercentage: formatFeePercentage(PLATFORM_FEE_PERCENTAGE),
    totalAmount,
    isFeeMaxed
  };
};

/**
 * Estimate gas cost in USD
 * @param {bigint} gasEstimate - Estimated gas
 * @param {bigint} gasPrice - Gas price in wei
 * @param {number} ethPriceUSD - ETH price in USD
 * @returns {number} - Estimated gas cost in USD
 */
export const estimateGasCostUSD = (gasEstimate, gasPrice, ethPriceUSD) => {
  if (!gasEstimate || !gasPrice || !ethPriceUSD) return 0;
  
  // Calculate gas cost in ETH
  const gasCostETH = Number(gasEstimate * gasPrice) / 1e18;
  
  // Convert to USD
  return gasCostETH * ethPriceUSD;
};

