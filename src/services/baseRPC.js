import { createPublicClient, http, parseEther, formatEther } from 'viem';
import { base } from 'wagmi/chains';
import { USDC_CONTRACT_ADDRESS, BASE_RPC_URL } from '../constants/contracts';
import { USDC_ABI } from '../constants/abis';

// Create a public client for Base network
const publicClient = createPublicClient({
  chain: base,
  transport: http(BASE_RPC_URL),
});

/**
 * Get USDC balance for an address
 * @param {string} address - Wallet address
 * @returns {Promise<number>} - USDC balance in decimal format
 */
export const getUSDCBalance = async (address) => {
  try {
    const balance = await publicClient.readContract({
      address: USDC_CONTRACT_ADDRESS,
      abi: USDC_ABI,
      functionName: 'balanceOf',
      args: [address],
    });
    
    // USDC has 6 decimals
    return Number(balance) / 1000000;
  } catch (error) {
    console.error('Error getting USDC balance:', error);
    throw new Error('Failed to get USDC balance');
  }
};

/**
 * Get transaction details
 * @param {string} txHash - Transaction hash
 * @returns {Promise<object>} - Transaction details
 */
export const getTransactionDetails = async (txHash) => {
  try {
    const tx = await publicClient.getTransaction({
      hash: txHash,
    });
    
    const receipt = await publicClient.getTransactionReceipt({
      hash: txHash,
    });
    
    return {
      hash: tx.hash,
      from: tx.from,
      to: tx.to,
      value: formatEther(tx.value),
      status: receipt.status,
      blockNumber: receipt.blockNumber,
      gasUsed: receipt.gasUsed,
      effectiveGasPrice: receipt.effectiveGasPrice,
      timestamp: new Date(), // This would ideally come from the block timestamp
    };
  } catch (error) {
    console.error('Error getting transaction details:', error);
    throw new Error('Failed to get transaction details');
  }
};

/**
 * Estimate gas for a USDC transfer
 * @param {string} from - Sender address
 * @param {string} to - Recipient address
 * @param {number} amount - Amount in USDC
 * @returns {Promise<bigint>} - Estimated gas
 */
export const estimateGasForUSDCTransfer = async (from, to, amount) => {
  try {
    // Convert amount to smallest unit (6 decimals for USDC)
    const amountInSmallestUnit = BigInt(Math.floor(amount * 1000000));
    
    const gasEstimate = await publicClient.estimateContractGas({
      address: USDC_CONTRACT_ADDRESS,
      abi: USDC_ABI,
      functionName: 'transfer',
      args: [to, amountInSmallestUnit],
      account: from,
    });
    
    return gasEstimate;
  } catch (error) {
    console.error('Error estimating gas:', error);
    throw new Error('Failed to estimate gas');
  }
};

/**
 * Get current gas price
 * @returns {Promise<bigint>} - Current gas price in wei
 */
export const getCurrentGasPrice = async () => {
  try {
    const gasPrice = await publicClient.getGasPrice();
    return gasPrice;
  } catch (error) {
    console.error('Error getting gas price:', error);
    throw new Error('Failed to get gas price');
  }
};

export default {
  getUSDCBalance,
  getTransactionDetails,
  estimateGasForUSDCTransfer,
  getCurrentGasPrice,
};

