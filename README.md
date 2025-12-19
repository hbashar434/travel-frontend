# Travel App - Mobile Frontend

React Native mobile application built with Expo.

## Tech Stack

- **React Native** (Expo)
- **TypeScript**
- **Expo Router** (File-based routing)
- **Tailwind CSS** (NativeWind)
- **React Hook Form** (Form management)
- **Zustand** (State Management)
- **Axios** (HTTP Client)
- **TanStack Query** (React Query)

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

3. Run on your device:

- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app on your physical device

## Project Structure

```
frontend/
├── app/              # Expo Router pages
│   ├── _layout.tsx   # Root layout
│   └── index.tsx     # Home screen
├── components/       # Reusable components
├── store/           # Zustand stores
├── services/        # API services (Axios)
├── hooks/           # Custom hooks
└── types/           # TypeScript types
```

## Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run on web
