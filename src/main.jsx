import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { PrivyProvider } from './contexts/PrivyContext';
import { UserProvider } from './contexts/UserContext';
import { CreatorProvider } from './contexts/CreatorContext';
import { TipProvider } from './contexts/TipContext';
import { NotificationProvider } from './contexts/NotificationContext';
import App from './App.jsx';
import './index.css';

// Create a client for React Query
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <PrivyProvider>
        <UserProvider>
          <CreatorProvider>
            <TipProvider>
              <NotificationProvider>
                <App />
              </NotificationProvider>
            </TipProvider>
          </CreatorProvider>
        </UserProvider>
      </PrivyProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
