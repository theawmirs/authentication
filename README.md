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
- **Authentication**: NextAuth.js v5
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **State Management**: React Hooks
- **Notifications**: Sonner
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 20.x or later (required for Next.js 15)
- npm 11.x or later (project uses npm@11.1.0)

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Required for NextAuth.js (generate using `openssl rand -base64 32`)
AUTH_SECRET="your-secret-key"

# API URL for backend services
NEXT_PUBLIC_API_URL="your-api-url"
```

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/authentication.git
cd authentication
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

   - Copy `.env.local.example` to `.env.local`
   - Update the variables with your values

4. Run the development server:

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

1. Register:

   - Navigate to `/register`
   - Create an account with email and password
   - Automatic login after successful registration

2. Login:

   - Navigate to `/login`
   - Enter credentials
   - Upon successful authentication, you'll be redirected to `/me`

3. Protected Routes:
   - All authenticated routes are automatically guarded by middleware
   - Unauthenticated users are redirected to login

### Protected Routes

- `/me/*` - Requires authentication
- `/login` and `/register` - Redirects to `/me` if already authenticated

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

- `auth.ts`: NextAuth.js v5 configuration
- `middleware.ts`: Route protection logic
- `modules/auth/login/ui/LoginForm.tsx`: Login form component
- `modules/auth/register/ui/RegisterForm.tsx`: Registration form component
- `types/auth/index.ts`: Authentication related types

### Form Validation

Both login and registration forms include validation for:

- Email (must be valid email format)
- Password (minimum 8 characters)

### Styling

The project uses Tailwind CSS for styling with custom components from Radix UI. The UI is fully responsive and includes loading states and toast notifications for user feedback.

## License

This project is licensed under the MIT License.
