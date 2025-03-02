# Next.js Authentication System

A modern authentication system built with Next.js 15, featuring secure credential-based authentication, protected routes, and a clean user interface.

## Features

- 🔐 Secure credential-based authentication using NextAuth.js
- 🛡️ Protected route middleware
- 🎨 Modern UI with Tailwind CSS and Radix UI components
- ✨ Form validation using Zod and React Hook Form
- 🔄 Loading states and toast notifications
- 📱 Responsive design
- 🏗️ Type-safe development with TypeScript

## Tech Stack

- **Framework**: Next.js 15
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **State Management**: React Hooks
- **Notifications**: Sonner
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 20.x or later
- npm 11.x or later

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd authentication
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Usage

### Default Test Credentials

```
Email: test@example.com
Password: password1234
```

### Authentication Flow

1. Navigate to `/login`
2. Enter credentials
3. Upon successful authentication, you'll be redirected to `/me`
4. Protected routes are automatically guarded by middleware

### Protected Routes

- `/me/*` - Requires authentication
- `/login` - Redirects to `/me` if already authenticated

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication related pages
│   ├── (root)/            # Root pages
│   ├── me/                # Protected user pages
│   └── api/               # API routes
├── components/            # Reusable UI components
├── modules/              # Feature modules
│   ├── auth/             # Authentication module
│   └── me/               # User profile module
├── lib/                  # Utility functions
├── types/                # TypeScript types
└── middleware.ts         # Route protection middleware
```

## Development

### Key Files

- `auth.ts`: NextAuth configuration
- `middleware.ts`: Route protection logic
- `modules/auth/login/ui/LoginForm.tsx`: Login form component
- `types/auth/index.ts`: Authentication related types

### Form Validation

The login form includes validation for:

- Email (must be valid email format)
- Password (minimum 8 characters)

### Styling

The project uses Tailwind CSS for styling with custom components from Radix UI. The UI is fully responsive and includes loading states.

## License

This project is licensed under the MIT License.
