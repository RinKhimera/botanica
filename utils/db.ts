import { PrismaClient } from "@prisma/client"

// Fonction pour créer une instance singleton du client Prisma
const prismaClientSingleton = () => {
  return new PrismaClient()
}

// Déclare une variable globale "prisma" dans l'espace de noms global
declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

// Initialise "prisma" avec l'instance singleton du client Prisma
const prisma = globalThis.prisma ?? prismaClientSingleton()
// Exporte l'instance "prisma" par défaut
export default prisma

// Si l'environnement n'est pas en production, affecte l'instance "prisma" à la variable globale "prisma"
if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma
