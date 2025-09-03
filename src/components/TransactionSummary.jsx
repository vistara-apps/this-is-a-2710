import React from 'react';
import { ExternalLink } from 'lucide-react';
import { calculateFeeBreakdown } from '../utils/fees';
import { formatUSDCAmount, getTransactionExplorerUrl } from '../utils/transactions';

const TransactionSummary = ({ 
  amount, 
  txHash, 
  recipient,
  className = ''
}) => {
  const { tipAmount, feeAmount, feePercentage, totalAmount, isFeeMaxed } = calculateFeeBreakdown(amount);
  
  return (
    <div className={`bg-surface rounded-lg shadow-card overflow-hidden ${className}`}>
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-heading text-textPrimary">Transaction Summary</h3>
      </div>
      
      <div className="p-4 space-y-4">
        {/* Amounts */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-body text-textPrimary">Tip Amount:</span>
            <span className="text-body font-semibold">{formatUSDCAmount(tipAmount)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-caption text-textSecondary">
              Platform Fee ({feePercentage}):
              {isFeeMaxed && <span className="ml-1 text-xs">(capped at $5)</span>}
            </span>
            <span className="text-caption">{formatUSDCAmount(feeAmount)}</span>
          </div>
          
          <hr className="my-2 border-gray-100" />
          
          <div className="flex justify-between items-center">
            <span className="text-body font-semibold text-textPrimary">Total:</span>
            <span className="text-body font-semibold text-primary">{formatUSDCAmount(totalAmount)}</span>
          </div>
        </div>
        
        {/* Transaction Details */}
        {txHash && (
          <div className="pt-2">
            <h4 className="text-body font-medium text-textPrimary mb-2">Transaction Details</h4>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="text-caption text-textSecondary">Transaction Hash:</span>
                <a 
                  href={getTransactionExplorerUrl(txHash)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-caption text-primary hover:underline flex items-center gap-1"
                >
                  {`${txHash.substring(0, 8)}...${txHash.substring(txHash.length - 6)}`}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              
              {recipient && (
                <div className="flex justify-between items-center">
                  <span className="text-caption text-textSecondary">Recipient:</span>
                  <span className="text-caption">
                    {`${recipient.substring(0, 8)}...${recipient.substring(recipient.length - 6)}`}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionSummary;

