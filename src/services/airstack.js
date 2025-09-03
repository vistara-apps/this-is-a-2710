import axios from 'axios';

// Airstack API endpoint
const AIRSTACK_API_URL = 'https://api.airstack.xyz/gql';

// Airstack API key (should be in environment variables in production)
const AIRSTACK_API_KEY = import.meta.env.VITE_AIRSTACK_API_KEY || 'your-airstack-api-key';

// Create Airstack client
const airstackClient = axios.create({
  baseURL: AIRSTACK_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': AIRSTACK_API_KEY,
  },
});

/**
 * Execute a GraphQL query against Airstack API
 * @param {string} query - GraphQL query
 * @param {object} variables - Query variables
 * @returns {Promise<object>} - Query result
 */
const executeQuery = async (query, variables = {}) => {
  try {
    const response = await airstackClient.post('', {
      query,
      variables,
    });
    
    if (response.data.errors) {
      throw new Error(response.data.errors[0].message);
    }
    
    return response.data.data;
  } catch (error) {
    console.error('Airstack API error:', error);
    throw new Error('Failed to fetch data from Airstack');
  }
};

/**
 * Get Farcaster profile by wallet address
 * @param {string} address - Wallet address
 * @returns {Promise<object>} - Farcaster profile
 */
export const getFarcasterProfileByAddress = async (address) => {
  const query = `
    query GetFarcasterProfile($address: Address!) {
      Socials(
        input: {
          filter: {
            identity: {_eq: $address},
            dappName: {_eq: farcaster}
          },
          blockchain: ethereum
        }
      ) {
        Social {
          profileName
          profileDisplayName
          profileImage
          profileBio
          profileUrl
          userAssociatedAddresses
          followerCount
          followingCount
        }
      }
    }
  `;
  
  const result = await executeQuery(query, { address });
  
  if (!result.Socials || !result.Socials.Social || result.Socials.Social.length === 0) {
    return null;
  }
  
  return result.Socials.Social[0];
};

/**
 * Get wallet profile data
 * @param {string} address - Wallet address
 * @returns {Promise<object>} - Wallet profile data
 */
export const getWalletProfile = async (address) => {
  const query = `
    query GetWalletProfile($address: Address!) {
      Wallet(input: {identity: $address, blockchain: base}) {
        addresses
        domains {
          name
          isPrimary
        }
        primaryDomain {
          name
        }
        socials {
          dappName
          profileName
          profileDisplayName
          profileImage
        }
        tokenBalances {
          tokenAddress
          amount
          tokenType
          token {
            name
            symbol
          }
        }
      }
    }
  `;
  
  const result = await executeQuery(query, { address });
  
  if (!result.Wallet) {
    return null;
  }
  
  return result.Wallet;
};

/**
 * Search for profiles by name
 * @param {string} name - Name to search for
 * @returns {Promise<Array>} - List of matching profiles
 */
export const searchProfiles = async (name) => {
  const query = `
    query SearchProfiles($name: String!) {
      Socials(
        input: {
          filter: {
            or: [
              {profileName: {_regex: $name}},
              {profileDisplayName: {_regex: $name}}
            ],
            dappName: {_in: [farcaster, lens]}
          },
          blockchain: ethereum,
          limit: 10
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
  
  const result = await executeQuery(query, { name: `.*${name}.*` });
  
  if (!result.Socials || !result.Socials.Social) {
    return [];
  }
  
  return result.Socials.Social;
};

export default {
  getFarcasterProfileByAddress,
  getWalletProfile,
  searchProfiles,
};

