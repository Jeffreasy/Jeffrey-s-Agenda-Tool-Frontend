# Agenda Automator - React Frontend

Modern React application for managing Google Calendar automation rules.

## Technology Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **TypeScript** - Type-safe development
- **React Router** - Client-side routing
- **TanStack Query** - Server state management
- **Zustand** - Client state management
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

## Project Structure

```
react-app/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── ui/          # Base UI components (Button, Card, etc.)
│   │   ├── layout.tsx   # Main layout wrapper
│   │   ├── providers.tsx # Query client provider
│   │   ├── theme-provider.tsx # Dark mode support
│   │   └── theme-toggle.tsx   # Theme switcher
│   ├── pages/           # Route pages
│   │   ├── Home.tsx     # Landing page
│   │   ├── Login.tsx    # Authentication page
│   │   └── Dashboard.tsx # Main dashboard
│   ├── lib/             # Utilities and configurations
│   │   ├── api.ts       # API client and hooks
│   │   ├── store.ts     # Zustand store
│   │   └── utils.ts     # Helper functions
│   ├── types/           # TypeScript type definitions
│   │   └── backend.ts   # Backend API types
│   ├── hooks/           # Custom React hooks
│   ├── App.tsx          # Root component with routing
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── .env                 # Environment variables
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
# .env
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Key Features

### Routing
The application uses React Router for client-side routing:
- `/` - Home page with feature overview
- `/login` - Google OAuth login page
- `/dashboard` - Main dashboard with connected accounts

### State Management
- **TanStack Query** - Server state, caching, and data fetching
- **Zustand** - Global client state (user, accounts, rules)

### Theming
Supports light/dark mode with system preference detection. Theme persists in localStorage.

### API Integration
Centralized API client with automatic error handling:
- Axios for HTTP requests
- React Query hooks for data fetching
- Type-safe requests with TypeScript

## Migration from Next.js

This application was migrated from Next.js to React + Vite:

### Key Changes
1. **Routing**: Next.js App Router → React Router
2. **Environment**: `process.env.NEXT_PUBLIC_*` → `import.meta.env.VITE_*`
3. **Image handling**: `next/image` → standard `<img>` tags
4. **Link navigation**: `next/link` → `react-router-dom` `Link`
5. **Themes**: `next-themes` → custom theme provider
6. **Build tool**: Next.js → Vite

### Benefits
- Faster development server startup
- Simpler configuration
- More explicit routing
- Better TypeScript support
- Smaller bundle sizes

## Development Guidelines

### Component Structure
- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic to custom hooks
- Use TypeScript for type safety

### API Calls
Always use the provided hooks from `lib/api.ts`:
```typescript
const { data, isLoading, error } = useConnectedAccountsQuery(userId)
```

### Styling
- Use Tailwind utility classes
- Follow the design system in `tailwind.config.js`
- Use CSS variables for theming
- Keep custom CSS minimal

## Environment Variables

Required variables:
- `VITE_API_BASE_URL` - Backend API URL (default: http://localhost:8080/api/v1)

## Building for Production

```bash
npm run build
```

Builds the app for production to the `dist` folder. The build is optimized and ready for deployment.

## License

Private project
