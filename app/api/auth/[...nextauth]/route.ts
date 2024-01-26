import { authOptions } from "@/utils/auth"
import NextAuth from "next-auth/next"

// Initialise NextAuth avec les options d'authentification
const handler = NextAuth(authOptions)
// Exporte le gestionnaire NextAuth pour les requêtes GET et POST
export { handler as GET, handler as POST }
