import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import authServices from "@/services/auth.services";
import { JWTExtended, SessionExtended, UserExtended } from "@/types/Auth";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined,
      ): Promise<any | null> {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const response = await authServices.login({
          email,
          password,
        });

        console.log("AuthServices: ", response);

        const token = response?.data?.result?.token;
        const user = response?.data?.result?.user;

        if (token?.accessToken && user && response?.data?.status === 200) {
          user.accessToken = token.accessToken;
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWTExtended;
      user: UserExtended | null;
    }) {
      if (user) {
        token.user = user;
      }

      return token;
    },
    async session({
      session,
      token,
    }: {
      session: SessionExtended;
      token: JWTExtended;
    }) {
      session.user = token.user;
      session.accessToken = token.user?.accessToken;
      session.refreshToken = token.user?.refreshToken;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
