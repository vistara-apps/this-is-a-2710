# Base Tipper

A Base MiniApp allowing users to easily tip creators using USDC on the Base network, with optional tipping goals and recognition features.

![Base Tipper Screenshot](./screenshot.png)

## Features

- **USDC Tipping**: Send tips in USDC directly to a creator's Base wallet address within the Base MiniApp frame.
- **Tipping Goals & Progress**: Creators can set specific tipping goals and display their progress towards that goal.
- **Tipped Creators Showcase**: Display a list of recently tipped creators or top tippers on a creator's profile.

## Tech Stack

- **Frontend**: React, TailwindCSS, Vite
- **Authentication**: Privy for wallet connection and authentication
- **Blockchain**: Base network, USDC token
- **Data Fetching**: Airstack for user profile data

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Base wallet (for testing)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/vistara-apps/base-tipper.git
   cd base-tipper
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   VITE_PRIVY_APP_ID=your-privy-app-id
   VITE_AIRSTACK_API_KEY=your-airstack-api-key
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
base-tipper/
├── docs/                # Documentation
│   └── api/             # API documentation
├── public/              # Public assets
├── src/                 # Source code
│   ├── components/      # React components
│   ├── contexts/        # React context providers
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API services
│   ├── utils/           # Utility functions
│   ├── constants/       # Constants and configuration
│   ├── data/            # Mock data
│   ├── App.jsx          # Main App component
│   └── main.jsx         # Entry point
├── .env                 # Environment variables
├── package.json         # Dependencies and scripts
└── README.md            # Project documentation
```

## API Documentation

For detailed API documentation, see the [API docs](./docs/api/README.md).

## Business Model

Base Tipper uses a micro-transaction business model with a 0.5% transaction fee on each tip, capped at $5. This model aligns with the 'fast MRR' goal for solo builders, leveraging the direct value exchange of tipping.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Privy](https://privy.io/) for wallet authentication
- [Base](https://base.org/) for the blockchain infrastructure
- [Airstack](https://airstack.xyz/) for social data integration

