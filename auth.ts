import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "next-auth";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

//Custom varibale that uses the env variable
const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface JwtPayload {
  user_id: string;
}

const authorize = async (
  credentials: Partial<Record<"username" | "password", unknown>>
): Promise<User | null> => {
  if (!credentials?.username || !credentials?.password) return null;

  try {
    const { data } = await axios.post(`${API_URL}/auth/jwt/create`, {
      username: credentials.username.toString(),
      password: credentials.password.toString(),
    });

    //Decode the JWT token to extract some data from it
    const decodedToken = jwtDecode<JwtPayload>(data.access);

    return {
      username: credentials.username.toString(),
      id: decodedToken.user_id,
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
        token.username = user.username;
        token.id = user.id;
      }
      return token;
    },
    // Session callback - makes token data available in client
    async session({ session, token }) {
      if (token && session.user) {
        session.user.username = token.username as string;
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
