"use server"

import { authOptions } from "@/utils/auth"
import prisma from "@/utils/db"
import { getServerSession } from "next-auth/next"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { formSchema } from "./validation/formSchema"

// Récupère toutes les plantes de la base de données à l'aide de Prisma
export const findAllPlants = async () => {
  try {
    // Récupérer toutes les plantes de la base de données, triées par watered (faux en premier) et ensuite par updatedAt (les plus récents d'abord)
    const plants = await prisma.plant.findMany({
      orderBy: [
        {
          watered: "asc", // Trier par le champ watered par ordre croissant (faux en premier)
        },
        {
          updatedAt: "desc", // Ensuite, trier par le champ updatedAt par ordre décroissant (les plus récents d'abord)
        },
      ],
    })

    return plants
  } catch (error) {
    console.error("Erreur lors de la récupération des plantes :", error)
    throw error // Relancer l'erreur pour la gérer à des niveaux supérieurs
  }
}

// Ajoute une plante à la base de données
export const addPlant = async (values: z.infer<typeof formSchema>) => {
  try {
    // Récupère la session serveur
    const session = await getServerSession(authOptions)
    // Récupère l'email de l'utilisateur à partir de la session
    const userEmail = session?.user?.email as string | undefined

    // Recherche l'utilisateur dans la base de données en utilisant son email
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail, // Condition de recherche : l'email de l'utilisateur
      },
      select: {
        id: true, // Sélectionne uniquement l'ID de l'utilisateur
      },
    })

    // Crée une nouvelle plante dans la base de données
    await prisma.plant.create({
      data: {
        name: values.name,
        species: values.species,
        dateOfPurchase: values.dateOfPurchase,
        waterNeeds: values.waterNeeds,
        frequency: values.frequency,
        watered: false, // Par défaut, la plante n'a pas été arrosée
        owner: {
          connect: {
            id: user?.id, // Connecte la plante à l'utilisateur en utilisant son ID
          },
        },
      },
    })

    // Re-valider la page pour refléter les changements
    revalidatePath("/")
    // Afficher un message de succès dans la console
    console.log("Plant created successfully.")
  } catch (error) {
    // En cas d'erreur, afficher l'erreur dans la console
    console.error("Error creating plant:", error)
  }
}

// Supprime une plante de la base de données
export const deletePlant = async (plantId: string) => {
  try {
    // Supprimer la plante de la base de données en fonction de son ID
    await prisma.plant.delete({
      where: {
        id: plantId, // Condition de suppression : l'ID de la plante à supprimer
      },
    })
    // Re-valider la page pour refléter les changements
    revalidatePath("/")
    // Afficher un message de succès dans la console
    console.log("Plant deleted successfully.")
  } catch (error) {
    // En cas d'erreur, afficher l'erreur dans la console
    console.error("Error deleting plant:", error)
  }
}
// Modifie le statut d'arrosage d'une plante dans la base de données
export const waterPlant = async (plantId: string) => {
  try {
    // Rechercher la plante dans la base de données grâce à son ID
    const plant = await prisma.plant.findUnique({
      where: {
        id: plantId,
      },
    })

    if (!plant) {
      throw new Error(`Plant with ID ${plantId} not found.`)
    }

    // Basculer le statut « watered » en fonction de son état précédent
    await prisma.plant.update({
      where: {
        id: plantId,
      },
      data: {
        watered: !plant.watered,
      },
    })
    revalidatePath("/")
    console.log(
      `Watered status of plant with ID ${plantId} toggled successfully.`
    )
  } catch (error) {
    console.error("Error toggling watered status:", error)
    throw error // Relancez l'erreur pour la gestion à des niveaux supérieurs
  }
}

// Calcule une nouvelle date au format ISO 8601 en fonction d'un nombre de jours
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

// Compare une date donnée et la date actuelle
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
