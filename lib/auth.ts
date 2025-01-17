import { prisma } from "@/prisma/src";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import CredentialProvider from "next-auth/providers/credentials";

interface RateLimiter {
  timestamps: Date[];
}
const userRateLimits = new Map<string, RateLimiter>();

export const rateLimit = (
  userId: string,
  rateLimitCount: number,
  rateLimitInterval: number
): boolean => {
  const now = new Date();
  const userLimiter = userRateLimits.get(userId) ?? { timestamps: [] };

  userLimiter.timestamps = userLimiter.timestamps.filter(
    (timestamp) => now.getTime() - timestamp.getTime() < rateLimitInterval
  );

  if (userLimiter.timestamps.length >= rateLimitCount) {
    return false; // Rate limit exceeded
  }

  userLimiter.timestamps.push(now);
  userRateLimits.set(userId, userLimiter);
  return true;
};

export const auth: any = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        if (!credentials.email || !credentials.password) {
          throw new Error("Missing credentials");
        }

        const user: any = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          throw new Error("User not found");
        }

        const rateLimitCount = 5; // Max 5 login attempts
        const rateLimitInterval = 60000; // Per minute (60,000 ms)

        if (!rateLimit(credentials.email, rateLimitCount, rateLimitInterval)) {
          throw new Error("Too many login attempts. Please try again later.");
        }

        const isCorrectPassword = compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid Passoword");
        }

        return user;
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
