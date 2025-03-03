import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "next-auth";
import axios from "axios";

type Credentials =
  | Partial<Record<"username" | "password", unknown>>
  | undefined;

const API_URL = process.env.NEXT_PUBLIC_API_URL;

//Mockup data - will be replaced with real data from the API
const authorize = async (credentials: Credentials): Promise<User | null> => {
  if (!credentials) return null;

  try {
    const { data } = await axios.post(`${API_URL}/auth/jwt/create`, {
      username: credentials.username,
      password: credentials.password,
    });
    return {
      accessToken: data.access,
      refreshToken: data.refresh,
    };
  } catch (err) {
    console.log(err);
    return null;
  }
};

//Main NextAuth Configuration
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    //Custom login provider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "username" },
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
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    // Session callback - makes token data available in client
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 2 * 60, // 2 minutes
  },
});
