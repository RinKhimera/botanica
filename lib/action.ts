"use server"

import { authOptions } from "@/utils/auth"
import prisma from "@/utils/db"
import { getServerSession } from "next-auth/next"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { formSchema } from "./validation/formSchema"

// Récupère toutes les plantes de la base de données à l'aide de Prisma
export const findAllPlants = async () => await prisma.plant.findMany()

//
export const addPlant = async (values: z.infer<typeof formSchema>) => {
  // Récupère la session serveur
  const session = await getServerSession(authOptions)
  // Récupère l'email de l'utilisateur à partir de la session
  const userEmail = session?.user?.email as string | undefined

  // Recherche l'utilisateur dans la base de données en utilisant son email
  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
    select: {
      id: true,
    },
  })

  try {
    {
      // Crée une nouvelle plante dans la base de données
      await prisma.plant.create({
        data: {
          name: values.name,
          species: values.species,
          dateOfPurchase: values.dateOfPurchase,
          waterNeeds: values.waterNeeds,
          frequency: values.frequency,
          watered: true,
          owner: {
            connect: {
              id: user?.id, // Connecte la plante à l'utilisateur
            },
          },
        },
      })
      revalidatePath("/")
    }
  } catch (error) {
    console.error("Error creating plant:", error)
  }
}

export const addDaysToDate = (dateString: Date, daysToAdd: number) => {
  // Convertit la chaîne de caractères en objet Date
  const date = new Date(dateString)
  // Ajoute le nombre de jours spécifié à la date
  date.setDate(date.getDate() + daysToAdd)

  // Récupère les composants de la date
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  const hours = String(date.getHours()).padStart(2, "0")
  const minutes = String(date.getMinutes()).padStart(2, "0")
  const seconds = String(date.getSeconds()).padStart(2, "0")

  // Retourne la nouvelle date au format ISO 8601
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`
}

export const compareDate = (givenDate: Date | string) => {
  // Obtient la date actuelle
  const currentDate = new Date()
  // Convertit la date donnée en objet Date
  const givenDateTime = new Date(givenDate)

  // Compare les timestamps des deux dates
  if (currentDate > givenDateTime) {
    // La date actuelle est plus récente que la date donnée
    return true
  } else {
    // La date actuelle est antérieure ou égale à la date donnée
    return false
  }
}
