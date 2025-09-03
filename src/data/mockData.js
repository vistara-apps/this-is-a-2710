// Mock creators data
export const mockCreators = [
  {
    id: '0x1234567890123456789012345678901234567890',
    name: 'Alice',
    category: 'Artist',
    bio: 'Digital artist creating NFTs and illustrations',
    tippingGoal: 500,
    tippingGoalProgress: 325,
    tippingGoalDescription: 'Help me buy a new drawing tablet!',
    createdAt: new Date('2023-01-15')
  },
  {
    id: '0x2345678901234567890123456789012345678901',
    name: 'Bob',
    category: 'Developer',
    bio: 'Building open source tools for the Base ecosystem',
    tippingGoal: 1000,
    tippingGoalProgress: 750,
    tippingGoalDescription: 'Support my work on Base tools',
    createdAt: new Date('2023-02-20')
  },
  {
    id: '0x3456789012345678901234567890123456789012',
    name: 'Charlie',
    category: 'Writer',
    bio: 'Writing about crypto, DeFi, and the future of finance',
    tippingGoal: 300,
    tippingGoalProgress: 150,
    tippingGoalDescription: 'Help me publish my next article',
    createdAt: new Date('2023-03-10')
  },
  {
    id: '0x4567890123456789012345678901234567890123',
    name: 'Diana',
    category: 'Musician',
    bio: 'Creating music NFTs and audio experiences',
    tippingGoal: 800,
    tippingGoalProgress: 200,
    tippingGoalDescription: 'Fund my next album',
    createdAt: new Date('2023-04-05')
  },
  {
    id: '0x5678901234567890123456789012345678901234',
    name: 'Ethan',
    category: 'Educator',
    bio: 'Teaching blockchain development and crypto concepts',
    tippingGoal: 600,
    tippingGoalProgress: 450,
    tippingGoalDescription: 'Help me create more educational content',
    createdAt: new Date('2023-05-15')
  },
  {
    id: '0x6789012345678901234567890123456789012345',
    name: 'Fiona',
    category: 'Designer',
    bio: 'UI/UX designer for Web3 projects',
    tippingGoal: 400,
    tippingGoalProgress: 100,
    tippingGoalDescription: 'Support my design work',
    createdAt: new Date('2023-06-20')
  }
];

// Mock tips data
export const mockTips = [
  {
    id: '1',
    senderId: '0x9876543210987654321098765432109876543210',
    receiverId: '0x1234567890123456789012345678901234567890',
    senderName: 'User1',
    receiverName: 'Alice',
    amount: 50,
    currency: 'USDC',
    message: 'Love your work!',
    timestamp: new Date('2023-08-15T14:30:00'),
    transactionHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890'
  },
  {
    id: '2',
    senderId: '0x8765432109876543210987654321098765432109',
    receiverId: '0x2345678901234567890123456789012345678901',
    senderName: 'User2',
    receiverName: 'Bob',
    amount: 25,
    currency: 'USDC',
    message: 'Keep building!',
    timestamp: new Date('2023-08-16T10:15:00'),
    transactionHash: '0xbcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890a'
  },
  {
    id: '3',
    senderId: '0x7654321098765432109876543210987654321098',
    receiverId: '0x3456789012345678901234567890123456789012',
    senderName: 'User3',
    receiverName: 'Charlie',
    amount: 15,
    currency: 'USDC',
    message: 'Great article!',
    timestamp: new Date('2023-08-17T16:45:00'),
    transactionHash: '0xcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890ab'
  },
  {
    id: '4',
    senderId: '0x6543210987654321098765432109876543210987',
    receiverId: '0x1234567890123456789012345678901234567890',
    senderName: 'User4',
    receiverName: 'Alice',
    amount: 30,
    currency: 'USDC',
    message: 'Amazing art!',
    timestamp: new Date('2023-08-18T09:20:00'),
    transactionHash: '0xdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abc'
  },
  {
    id: '5',
    senderId: '0x5432109876543210987654321098765432109876',
    receiverId: '0x4567890123456789012345678901234567890123',
    senderName: 'User5',
    receiverName: 'Diana',
    amount: 40,
    currency: 'USDC',
    message: 'Your music is incredible!',
    timestamp: new Date('2023-08-19T13:10:00'),
    transactionHash: '0xef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcd'
  },
  {
    id: '6',
    senderId: '0x4321098765432109876543210987654321098765',
    receiverId: '0x5678901234567890123456789012345678901234',
    senderName: 'User6',
    receiverName: 'Ethan',
    amount: 20,
    currency: 'USDC',
    message: 'Thanks for the lessons!',
    timestamp: new Date('2023-08-20T11:30:00'),
    transactionHash: '0xf1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcde'
  },
  {
    id: '7',
    senderId: '0x3210987654321098765432109876543210987654',
    receiverId: '0x2345678901234567890123456789012345678901',
    senderName: 'User7',
    receiverName: 'Bob',
    amount: 35,
    currency: 'USDC',
    message: 'Your tools are so useful!',
    timestamp: new Date('2023-08-21T15:45:00'),
    transactionHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
  },
  {
    id: '8',
    senderId: '0x2109876543210987654321098765432109876543',
    receiverId: '0x6789012345678901234567890123456789012345',
    senderName: 'User8',
    receiverName: 'Fiona',
    amount: 45,
    currency: 'USDC',
    message: 'Beautiful designs!',
    timestamp: new Date('2023-08-22T08:15:00'),
    transactionHash: '0x234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1'
  },
  {
    id: '9',
    senderId: '0x1098765432109876543210987654321098765432',
    receiverId: '0x3456789012345678901234567890123456789012',
    senderName: 'User9',
    receiverName: 'Charlie',
    amount: 10,
    currency: 'USDC',
    message: 'Insightful writing!',
    timestamp: new Date('2023-08-23T12:30:00'),
    transactionHash: '0x34567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef12'
  },
  {
    id: '10',
    senderId: '0x0987654321098765432109876543210987654321',
    receiverId: '0x4567890123456789012345678901234567890123',
    senderName: 'User10',
    receiverName: 'Diana',
    amount: 55,
    currency: 'USDC',
    message: 'Can\'t wait for the new album!',
    timestamp: new Date('2023-08-24T14:00:00'),
    transactionHash: '0x4567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123'
  }
];

