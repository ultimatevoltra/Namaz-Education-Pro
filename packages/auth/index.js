import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@namaz/db';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const resolvedSecret =
  process.env.NEXTAUTH_SECRET ||
  crypto.randomBytes(32).toString('base64');

const providers = [
  CredentialsProvider({
    name: 'Credentials',
    credentials: {
      email: { label: 'Email', type: 'email' },
      password: { label: 'Password', type: 'password' }
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        throw new Error('Invalid credentials');
      }
      const user = await prisma.user.findUnique({
        where: { email: credentials.email }
      });
      if (!user || !user.password) {
        throw new Error('User not found');
      }
      const isPasswordValid = await bcrypt.compare(
        credentials.password,
        user.password
      );
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }
      return { id: user.id, email: user.email, name: user.name, image: user.image };
    }
  })
];

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  providers,
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.id;
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
    error: '/auth/error'
  },
  session: { strategy: 'jwt', maxAge: 30 * 24 * 60 * 60 },
  secret: resolvedSecret
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
