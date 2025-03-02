import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
//User interface from next-auth that contains the user object
import { User } from "next-auth";

type Credentials = Partial<Record<"email" | "password", unknown>> | undefined;

//Mockup data - will be replaced with real data from the API
const authorize = async (credentials: Credentials): Promise<User | null> => {
  if (!credentials) return null;

  if (
    credentials.email === "test@example.com" &&
    credentials.password === "password1234"
  ) {
    return {
      id: "1",
      name: "Test User",
      email: credentials.email,
    };
  }
  return null;
};

//Main NextAuth Configuration
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    //Custom login provider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize,
    }),
  ],
  pages: {
    signIn: "/login", // Custom login page path
  },
  callbacks: {
    // JWT callback - runs when JWT is created/updated
    async jwt({ token, user }) {
      // Add user data to token when first created
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    // Session callback - makes token data available in client
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 2 * 60, // 2 minutes
  },
});
