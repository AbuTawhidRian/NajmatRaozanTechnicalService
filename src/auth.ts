import NextAuth, { type DefaultSession } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
    } & DefaultSession["user"]
  }
}
import prisma from "./lib/prisma"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true, // Required for Docker: internal container hostname must be trusted
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // This is a placeholder for actual authentication logic
        if (!credentials?.email || !credentials?.password) return null;
        
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        });

        if (!user || !user.password) return null;

        const isValidPassword = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (isValidPassword) {
          return user;
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        if (token.role) {
          session.user.role = token.role as string;
        }
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allow NextAuth's own internal redirects (e.g. /api/auth/error, /api/auth/signout)
      if (url.startsWith(`${baseUrl}/api/auth`)) {
        return url;
      }
      // After a successful login, always go to the admin dashboard
      if (url.startsWith(baseUrl)) {
        return `${baseUrl}/admin`;
      }
      return `${baseUrl}/admin`;
    }
  }
})
