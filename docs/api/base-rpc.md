# Base RPC Integration

## Overview

Base RPC is used in Base Tipper for blockchain interactions, including querying balances, sending transactions, and checking transaction status. It provides direct access to the Base network.

## Setup

### Installation

```bash
npm install viem ethers
```

### Configuration

The Base RPC client is configured in `src/services/baseRPC.js`:

```javascript
import { createPublicClient, http } from 'viem';
import { base } from 'wagmi/chains';
import { BASE_RPC_URL } from '../constants/contracts';

// Create a public client for Base network
const publicClient = createPublicClient({
  chain: base,
  transport: http(BASE_RPC_URL),
});
```

## USDC Balance

To get a user's USDC balance:

```javascript
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
```

## Transaction Details

To get details about a transaction:

```javascript
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
```

## Gas Estimation

To estimate gas for a USDC transfer:

```javascript
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
```

## Gas Price

To get the current gas price:

```javascript
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
```

## Error Handling

Errors from Base RPC are caught and handled in the application:

```javascript
try {
  const balance = await getUSDCBalance(address);
} catch (err) {
  console.error('Error getting USDC balance:', err);
  // Display error to user
}
```

## Further Reading

- [Base Documentation](https://docs.base.org/)
- [Base RPC Endpoints](https://docs.base.org/rpc)
- [Viem Documentation](https://viem.sh/)
- [Ethers Documentation](https://docs.ethers.org/)

