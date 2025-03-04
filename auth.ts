import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "next-auth";
import { JWT } from "next-auth/jwt";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { access } from "fs";

//Custom varibale that uses the env variable
const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface JwtPayload {
  user_id: string;
  exp: number;
}

interface TokenType {
  accessToken?: string;
  refreshToken: string;
  error?: string;
  iat?: number; // Issued at
  exp?: number; // Expiration time
  userId?: string | number;
}
interface ExtendedToken extends JWT {
  accessToken?: string;
  refreshToken?: string;
  username?: string;
  id?: string;
  error?: string;
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

const refreshAccessToken = async (token: TokenType) => {
  try {
    const { data } = await axios.post(`${API_URL}/auth/jwt/refresh`, {
      refresh: token.refreshToken,
    });

    return {
      ...token,
      accessToken: data.access,
    };
  } catch (err) {
    console.log(err);
    return { ...token, error: "RefreshAccessTokenError" };
  }
};

const isTokenExpired = (token: TokenType) => {
  try {
    // 1. Decode the JWT token
    const decoded: JwtPayload = jwtDecode(token.accessToken as string);
    // 2. Compare expiration time with current time
    return decoded.exp * 1000 < Date.now();
  } catch (err) {
    console.log(err);
    // 3. If anything goes wrong, assume token is expired
    return true;
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
    async jwt({ token, user }: { token: ExtendedToken; user: User | null }) {
      // Add user data to token when first created
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.username = user.username;
        token.id = user.id;
      }

      // If access token is expired, refresh it
      if (
        token.accessToken &&
        token.refreshToken &&
        isTokenExpired({
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
        })
      ) {
        return await refreshAccessToken({
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
        });
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
