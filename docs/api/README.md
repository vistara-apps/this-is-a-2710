# Base Tipper API Documentation

This documentation provides details about the APIs used in the Base Tipper application.

## Table of Contents

1. [Privy Integration](./privy.md)
2. [Base RPC Integration](./base-rpc.md)
3. [Airstack Integration](./airstack.md)

## Overview

Base Tipper integrates with several external APIs to provide its functionality:

- **Privy**: For wallet connection, authentication, and transaction handling
- **Base RPC**: For blockchain interactions and USDC transfers
- **Airstack**: For fetching user profile data from Farcaster and other social platforms

Each API serves a specific purpose in the application and is documented in detail in its respective section.

## Getting Started

To use these APIs in your development environment, you'll need to set up the following environment variables:

```
VITE_PRIVY_APP_ID=your-privy-app-id
VITE_AIRSTACK_API_KEY=your-airstack-api-key
```

You can create a `.env` file in the root of your project with these variables.

## Authentication

- **Privy**: Authentication is handled through the Privy SDK, which provides methods for connecting wallets and managing user sessions.
- **Base RPC**: No explicit authentication is required for basic RPC operations, but you may need to use a provider like Alchemy or QuickNode for better reliability.
- **Airstack**: Authentication is done via an API key that is included in the request headers.

## Error Handling

All API integrations include comprehensive error handling to ensure a smooth user experience. Errors are caught and displayed to the user in a friendly manner, with appropriate recovery options where possible.

## Rate Limiting

Be aware of rate limits for each API:

- **Privy**: Refer to Privy's documentation for rate limiting details.
- **Base RPC**: Public RPC endpoints may have rate limits. Consider using a dedicated provider for production.
- **Airstack**: Has rate limits based on your subscription tier.

## Further Reading

For more detailed information about each API, refer to the specific documentation files linked in the Table of Contents.

