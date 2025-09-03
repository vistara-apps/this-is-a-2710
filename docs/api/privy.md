# Privy API Integration

## Overview

Privy is used in Base Tipper for wallet connection, authentication, and transaction handling. It provides a seamless user experience for connecting wallets and sending transactions on the Base network.

## Setup

### Installation

```bash
npm install @privy-io/react-auth @privy-io/wagmi-connector
```

### Configuration

The Privy provider is configured in `src/contexts/PrivyContext.jsx`:

```jsx
const PRIVY_APP_ID = import.meta.env.VITE_PRIVY_APP_ID || 'clxyz-placeholder-id';

// Wagmi configuration
const wagmiConfig = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
});

// Privy configuration
<PrivyAuthProvider
  appId={PRIVY_APP_ID}
  onLoginStateChange={handleLoginStateChange}
  onUserChange={handleUserChange}
  wagmiConfig={wagmiConfig}
  config={{
    appearance: {
      theme: 'light',
      accentColor: 'hsl(240 70% 60%)',
      logo: 'https://your-logo-url.com/logo.png',
    },
    loginMethods: ['email', 'wallet', 'farcaster'],
    embeddedWallets: {
      createOnLogin: 'users-without-wallets',
      noPromptOnSignature: false,
    },
    supportedChains: [base],
  }}
>
  {/* App content */}
</PrivyAuthProvider>
```

## Authentication Flow

1. **User Initiates Login**: User clicks the "Connect Wallet" button, which calls the `login()` method from the `usePrivy` hook.
2. **Privy Modal**: Privy displays a modal with various login options (email, wallet, Farcaster).
3. **User Authenticates**: User selects a login method and completes the authentication process.
4. **Login State Change**: The `onLoginStateChange` callback is triggered, updating the application state.
5. **User Data**: The `onUserChange` callback is triggered, providing access to the user's data, including wallet address.

## Wallet Connection

The `usePrivy` hook provides methods for connecting and managing wallets:

```jsx
const { isAuthenticated, address, login, logout } = usePrivy();

// Connect wallet
const handleConnect = () => {
  login();
};

// Disconnect wallet
const handleDisconnect = () => {
  logout();
};
```

## Transaction Handling

Privy integrates with wagmi to handle transactions:

```jsx
const { writeContractAsync } = useWriteContract();

// Send USDC transaction
const sendTip = async (recipientAddress, amountUSDC) => {
  // Convert amount to smallest unit (6 decimals for USDC)
  const amount = BigInt(Math.floor(amountUSDC * 1000000));
  
  // Send USDC transaction
  const txHash = await writeContractAsync({
    address: USDC_CONTRACT_ADDRESS,
    abi: USDC_ABI,
    functionName: 'transfer',
    args: [recipientAddress, amount],
  });
  
  return txHash;
};
```

## Error Handling

Errors from Privy are caught and handled in the application:

```jsx
try {
  await login();
} catch (err) {
  console.error('Login error:', err);
  // Display error to user
}
```

## User Data

Privy provides access to user data, including wallet address and linked accounts:

```jsx
const { user } = usePrivy();

// Get user's wallet address
const walletAddress = user?.wallet?.address;

// Get user's linked accounts
const linkedAccounts = user?.linkedAccounts;
```

## Further Reading

- [Privy Documentation](https://docs.privy.io/)
- [Privy React Auth](https://docs.privy.io/guide/frontend/react)
- [Privy Wagmi Connector](https://docs.privy.io/guide/frontend/web3/wagmi)

