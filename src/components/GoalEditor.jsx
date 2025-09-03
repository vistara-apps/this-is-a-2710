import React, { useState } from 'react';
import { Target, DollarSign, X } from 'lucide-react';
import { useUser } from '../hooks/useUser';

const GoalEditor = ({ 
  initialGoal = 0, 
  initialDescription = '', 
  onSave, 
  onCancel 
}) => {
  const { setTippingGoal } = useUser();
  const [goal, setGoal] = useState(initialGoal);
  const [description, setDescription] = useState(initialDescription);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGoalChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setGoal(value === '' ? '' : parseFloat(value));
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      setError(null);
      
      if (!goal || goal <= 0) {
        throw new Error('Please enter a valid goal amount');
      }
      
      // Save the goal
      await setTippingGoal(goal, description);
      
      // Call the onSave callback
      if (onSave) {
        onSave({ goal, description });
      }
    } catch (err) {
      setError(err.message || 'Failed to save tipping goal');
      console.error('Save tipping goal error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-surface rounded-lg p-6 shadow-card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-heading text-textPrimary flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Set Tipping Goal
        </h3>
        <button
          onClick={onCancel}
          className="text-textSecondary hover:text-textPrimary transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-body font-medium text-textPrimary mb-2">
            Goal Amount (USDC)
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-textSecondary" />
            <input
              type="text"
              value={goal}
              onChange={handleGoalChange}
              placeholder="Enter goal amount"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-body"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-body font-medium text-textPrimary mb-2">
            Goal Description
          </label>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            placeholder="What are you raising tips for? (e.g., 'New camera for better content')"
            rows={3}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-body resize-none"
          />
        </div>
        
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-6 py-3 border border-gray-200 text-textSecondary rounded-lg hover:bg-gray-50 transition-colors"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                <span>Saving...</span>
              </>
            ) : (
              <span>Save Goal</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GoalEditor;

