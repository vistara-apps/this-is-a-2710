import { useState, useCallback } from 'react';

export function useErrorHandler() {
  const [error, setError] = useState(null);
  
  // Clear the error
  const clearError = useCallback(() => {
    setError(null);
  }, []);
  
  // Handle an error
  const handleError = useCallback((err) => {
    console.error('Error caught by useErrorHandler:', err);
    
    // Extract error message
    const errorMessage = err?.message || 'An unexpected error occurred';
    
    // Set the error
    setError({
      message: errorMessage,
      timestamp: new Date(),
      originalError: err
    });
    
    // Return the error for chaining
    return err;
  }, []);
  
  // Handle an async operation with error handling
  const handleAsync = useCallback(async (asyncFn, errorMessage = 'Operation failed') => {
    try {
      clearError();
      return await asyncFn();
    } catch (err) {
      // Add custom error message if provided
      const enhancedError = new Error(err?.message || errorMessage);
      enhancedError.originalError = err;
      
      handleError(enhancedError);
      throw enhancedError;
    }
  }, [clearError, handleError]);
  
  return {
    error,
    setError,
    clearError,
    handleError,
    handleAsync,
    hasError: !!error
  };
}

