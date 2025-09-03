# Airstack API Integration

## Overview

Airstack is used in Base Tipper for fetching user profile data, including Farcaster profiles and on-chain data. It provides rich social and blockchain data to enhance the user experience.

## Setup

### Installation

```bash
npm install @airstack/airstack-react
```

### Configuration

The Airstack client is configured in `src/services/airstack.js`:

```javascript
import { init, fetchQuery } from '@airstack/airstack-react';
import { AIRSTACK_API_KEY } from '../constants/api';

// Initialize Airstack
init(AIRSTACK_API_KEY);
```

## Fetching Farcaster Profiles

To fetch a user's Farcaster profile:

```javascript
/**
 * Fetch Farcaster profile by FID
 * @param {string} fid - Farcaster ID
 * @returns {Promise<object>} - Farcaster profile data
 */
export const fetchFarcasterProfile = async (fid) => {
  const query = `
    query GetFarcasterProfile {
      Socials(
        input: {
          filter: {
            dappName: { _eq: farcaster },
            userId: { _eq: "${fid}" }
          }
        }
      ) {
        Social {
          profileName
          profileDisplayName
          profileImage
          profileBio
          userAssociatedAddresses
          followerCount
          followingCount
        }
      }
    }
  `;

  try {
    const { data, error } = await fetchQuery(query);
    
    if (error) {
      throw new Error(error.message);
    }
    
    if (!data || !data.Socials || !data.Socials.Social || data.Socials.Social.length === 0) {
      throw new Error('Farcaster profile not found');
    }
    
    return data.Socials.Social[0];
  } catch (error) {
    console.error('Error fetching Farcaster profile:', error);
    throw new Error('Failed to fetch Farcaster profile');
  }
};
```

## Fetching Wallet Profiles

To fetch profiles associated with a wallet address:

```javascript
/**
 * Fetch profiles associated with a wallet address
 * @param {string} address - Wallet address
 * @returns {Promise<object>} - Associated profiles
 */
export const fetchWalletProfiles = async (address) => {
  const query = `
    query GetWalletProfiles {
      Socials(
        input: {
          filter: {
            userAssociatedAddresses: { _eq: "${address}" }
          }
        }
      ) {
        Social {
          dappName
          profileName
          profileDisplayName
          profileImage
          profileBio
          userAssociatedAddresses
        }
      }
    }
  `;

  try {
    const { data, error } = await fetchQuery(query);
    
    if (error) {
      throw new Error(error.message);
    }
    
    if (!data || !data.Socials || !data.Socials.Social || data.Socials.Social.length === 0) {
      return [];
    }
    
    return data.Socials.Social;
  } catch (error) {
    console.error('Error fetching wallet profiles:', error);
    throw new Error('Failed to fetch wallet profiles');
  }
};
```

## Fetching Token Balances

To fetch a user's token balances:

```javascript
/**
 * Fetch token balances for a wallet address
 * @param {string} address - Wallet address
 * @returns {Promise<array>} - Token balances
 */
export const fetchTokenBalances = async (address) => {
  const query = `
    query GetTokenBalances {
      TokenBalances(
        input: {
          filter: {
            owner: { _eq: "${address}" },
            tokenType: { _in: [ERC20] }
          },
          blockchain: base
        }
      ) {
        TokenBalance {
          token {
            name
            symbol
            decimals
            address
            logo {
              small
            }
          }
          amount
          formattedAmount
        }
      }
    }
  `;

  try {
    const { data, error } = await fetchQuery(query);
    
    if (error) {
      throw new Error(error.message);
    }
    
    if (!data || !data.TokenBalances || !data.TokenBalances.TokenBalance) {
      return [];
    }
    
    return data.TokenBalances.TokenBalance;
  } catch (error) {
    console.error('Error fetching token balances:', error);
    throw new Error('Failed to fetch token balances');
  }
};
```

## Fetching NFTs

To fetch a user's NFTs:

```javascript
/**
 * Fetch NFTs for a wallet address
 * @param {string} address - Wallet address
 * @returns {Promise<array>} - NFTs
 */
export const fetchNFTs = async (address) => {
  const query = `
    query GetNFTs {
      TokenBalances(
        input: {
          filter: {
            owner: { _eq: "${address}" },
            tokenType: { _in: [ERC721, ERC1155] }
          },
          blockchain: base
        }
      ) {
        TokenBalance {
          token {
            name
            symbol
            address
            tokenNfts {
              tokenId
              contentValue {
                image {
                  small
                }
              }
            }
          }
          amount
        }
      }
    }
  `;

  try {
    const { data, error } = await fetchQuery(query);
    
    if (error) {
      throw new Error(error.message);
    }
    
    if (!data || !data.TokenBalances || !data.TokenBalances.TokenBalance) {
      return [];
    }
    
    return data.TokenBalances.TokenBalance;
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    throw new Error('Failed to fetch NFTs');
  }
};
```

## Error Handling

Errors from Airstack are caught and handled in the application:

```javascript
try {
  const profile = await fetchFarcasterProfile(fid);
} catch (err) {
  console.error('Error fetching Farcaster profile:', err);
  // Display error to user
}
```

## Further Reading

- [Airstack Documentation](https://docs.airstack.xyz/)
- [Airstack GraphQL API](https://docs.airstack.xyz/api-reference/overview)
- [Airstack React SDK](https://docs.airstack.xyz/airstack-sdk-and-apis/airstack-react-sdk)

