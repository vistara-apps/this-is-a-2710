import React, { useState } from 'react';
import { X, DollarSign, Loader2, AlertCircle } from 'lucide-react';
import TipButton from './TipButton';
import TransactionSummary from './TransactionSummary';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { calculateFeeBreakdown } from '../utils/fees';
import { formatUSDCAmount } from '../utils/transactions';

const TipModal = ({ 
  creator, 
  isOpen, 
  onClose, 
  onSuccess, 
  isAuthenticated,
  sendTip 
}) => {
  const { error, handleError, clearError } = useErrorHandler();
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [transaction, setTransaction] = useState(null);
  
  const predefinedAmounts = [5, 10, 25, 50];

  const handleAmountSelect = (value) => {
    setAmount(value);
    setCustomAmount('');
    clearError();
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setCustomAmount(value);
      setAmount(parseFloat(value) || 0);
      clearError();
    }
  };

  const handleTip = async () => {
    if (!isAuthenticated) {
      handleError(new Error('Please connect your wallet first'));
      return;
    }

    if (!amount || amount <= 0) {
      handleError(new Error('Please enter a valid tip amount'));
      return;
    }

    setLoading(true);
    
    try {
      // Send the tip using the provided sendTip function
      const result = await sendTip(creator.id, parseFloat(amount), message);
      
      // Set transaction details
      setTransaction(result);
      
      // Call success callback
      onSuccess({
        senderId: result.senderId,
        receiverId: creator.id,
        senderName: 'You',
        receiverName: creator.name,
        amount: parseFloat(amount),
        currency: 'USDC',
        message: message || `Tip for ${creator.name}`,
        transactionHash: result.txHash
      });
      
      // Reset form
      setAmount('');
      setCustomAmount('');
      setMessage('');
      
    } catch (error) {
      console.error('Tip failed:', error);
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate fee breakdown
  const { tipAmount, feeAmount, totalAmount, isFeeMaxed } = calculateFeeBreakdown(amount);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-heading text-textPrimary">Tip {creator.name}</h2>
          <button
            onClick={onClose}
            className="text-textSecondary hover:text-textPrimary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Error</p>
                <p className="text-sm">{error.message}</p>
              </div>
            </div>
          )}
          
          {/* Transaction Success */}
          {transaction ? (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-center">
                <p className="font-medium">Tip Sent Successfully!</p>
                <p className="text-sm">Your tip has been sent to {creator.name}.</p>
              </div>
              
              <TransactionSummary 
                amount={amount} 
                txHash={transaction.txHash} 
                recipient={creator.id}
              />
              
              <button
                onClick={onClose}
                className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              {/* Creator Info */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {creator.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-body font-semibold text-textPrimary">{creator.name}</h3>
                  <p className="text-caption">{creator.category}</p>
                </div>
              </div>

              {/* Amount Selection */}
              <div>
                <label className="block text-body font-medium text-textPrimary mb-3">
                  Tip Amount (USDC)
                </label>
                
                {/* Predefined Amounts */}
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {predefinedAmounts.map((value) => (
                    <button
                      key={value}
                      onClick={() => handleAmountSelect(value)}
                      className={`p-3 rounded-lg border text-center transition-all ${
                        amount === value
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-gray-200 hover:border-gray-300 text-textSecondary'
                      }`}
                    >
                      ${value}
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-textSecondary" />
                  <input
                    type="text"
                    placeholder="Custom amount"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-body"
                  />
                </div>
              </div>

              {/* Optional Message */}
              <div>
                <label className="block text-body font-medium text-textPrimary mb-2">
                  Message (Optional)
                </label>
                <textarea
                  placeholder="Add a message for the creator..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-body resize-none"
                />
              </div>

              {/* Fee Information */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-body text-textPrimary">Tip Amount:</span>
                  <span className="text-body font-semibold">{formatUSDCAmount(tipAmount)}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-caption text-textSecondary">
                    Platform Fee (0.5%):
                    {isFeeMaxed && <span className="ml-1 text-xs">(capped at $5)</span>}
                  </span>
                  <span className="text-caption">{formatUSDCAmount(feeAmount)}</span>
                </div>
                <hr className="my-2 border-blue-200" />
                <div className="flex justify-between items-center">
                  <span className="text-body font-semibold text-textPrimary">Total:</span>
                  <span className="text-body font-semibold text-primary">
                    {formatUSDCAmount(totalAmount)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border border-gray-200 text-textSecondary rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={loading}
                >
                  Cancel
                </button>
                <TipButton
                  onClick={handleTip}
                  disabled={!amount || amount <= 0 || !isAuthenticated || loading}
                  loading={loading}
                  className="flex-1"
                >
                  {loading ? 'Processing...' : `Tip ${formatUSDCAmount(amount || 0)}`}
                </TipButton>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TipModal;
