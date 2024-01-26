import prisma from "@/utils/db"
import { PrismaAdapter } from "@auth/prisma-adapter"
import type { NextAuthOptions } from "next-auth"
import type { Adapter } from "next-auth/adapters"
import EmailProvider from "next-auth/providers/email"
import GithubProvider from "next-auth/providers/github"

// Définit les options d'authentification pour NextAuth
export const authOptions = {
  // Utilise PrismaAdapter comme adaptateur pour stocker les données d'authentification
  adapter: PrismaAdapter(prisma) as Adapter,
  // Définit les fournisseurs d'authentification disponibles
  providers: [
    // Fournisseur d'authentification par e-mail
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),

    // Fournisseur d'authentification GitHub
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
} satisfies NextAuthOptions
