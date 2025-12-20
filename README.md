# Travel App Frontend

A comprehensive React Native mobile application built with Expo, TypeScript, and modern best practices.

## 🚀 Tech Stack

- **React Native** (Expo SDK 54)
- **TypeScript**
- **Expo Router** (File-based routing)
- **NativeWind** (Tailwind CSS for React Native)
- **React Hook Form** (Form management)
- **Zustand** (State management)
- **Axios** (HTTP client)
- **TanStack Query** (React Query for data fetching)
- **Expo SecureStore** (Secure token storage)

## 📁 Project Structure

```
frontend/
├── app/                    # Expo Router app directory
│   ├── (auth)/            # Authentication screens
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── (tabs)/            # Main app screens (tab navigation)
│   │   ├── index.tsx      # Packages list
│   │   ├── bookings.tsx   # User bookings
│   │   ├── profile.tsx    # User profile
│   │   ├── admin.tsx     # Admin dashboard
│   │   ├── package/      # Package detail
│   │   └── admin/        # Admin screens
│   │       ├── packages/  # Package management
│   │       └── bookings/ # Booking management
│   └── _layout.tsx       # Root layout
├── components/           # Reusable UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   └── LoadingSpinner.tsx
├── hooks/                # Custom React hooks
│   ├── useAuth.ts
│   ├── usePackages.ts
│   ├── useBookings.ts
│   └── useUser.ts
├── services/            # API services
│   └── api.ts
├── store/                # Zustand stores
│   └── useStore.ts
├── types/                # TypeScript types
│   └── index.ts
├── utils/                # Utility functions
│   └── cn.ts
└── constants/            # App constants
    └── config.ts
```

## 🔐 Authentication Flow

1. **Login/Register**: Users can register or login with email and password
2. **Token Storage**: JWT tokens are securely stored using Expo SecureStore
3. **Auto Login**: App checks for stored tokens on startup
4. **Protected Routes**: Routes are protected based on authentication status
5. **Role-Based Access**: Admin routes are protected by role check

## 👤 User Features

### Packages

- Browse all tour packages
- Search packages
- View package details with images
- See pricing, duration, inclusions/exclusions
- Book packages (authenticated users only)

### Bookings

- View personal booking history
- See booking status (pending, confirmed, cancelled, completed)
- View booking details

### Profile

- View personal information
- Update name and password
- View role (user/admin)

## 🧑‍💼 Admin Features

### Package Management

- Create new tour packages
- Edit existing packages
- Delete packages
- Upload package images
- Set package status (active/inactive)
- Mark packages as featured

### Booking Management

- View all bookings
- Update booking status
- Filter and manage bookings

## 🛠️ Setup & Installation

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Configure Environment**
   Create a `.env` file:

   ```
   EXPO_PUBLIC_API_URL=http://localhost:3000
   ```

3. **Start Development Server**

   ```bash
   npm start
   ```

4. **Run on Platform**
   - Press `w` for web
   - Press `a` for Android
   - Press `i` for iOS

## 📱 Key Features

### State Management

- **Zustand**: Global auth state management
- **React Query**: Server state and caching
- **Local State**: Component-level state with useState

### API Integration

- Axios interceptors for automatic token injection
- Error handling and token refresh logic
- FormData support for file uploads

### Navigation

- File-based routing with Expo Router
- Protected routes with authentication checks
- Tab navigation for main app
- Stack navigation for nested screens

### UI/UX

- Consistent design system with Tailwind CSS
- Loading states and error handling
- Pull-to-refresh functionality
- Responsive layouts

## 🔒 Security

- JWT tokens stored securely with Expo SecureStore
- Automatic token injection in API requests
- Protected routes with role-based access control
- Token expiration handling

## 📝 Code Standards

- **TypeScript**: Full type safety
- **Component Structure**: Reusable, composable components
- **API Layer**: Centralized API service with hooks
- **Error Handling**: Consistent error handling patterns
- **Code Organization**: Feature-based folder structure

## 🚀 Building for Production

1. **Build for Android**

   ```bash
   eas build --platform android
   ```

2. **Build for iOS**
   ```bash
   eas build --platform ios
   ```

## 📄 License

This project is part of the Travel App application.
