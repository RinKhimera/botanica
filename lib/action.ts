"use server"

import { authOptions } from "@/utils/auth"
import prisma from "@/utils/db"
import { getServerSession } from "next-auth/next"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { formSchema } from "./validation/formSchema"

export const findAllPlants = async () => await prisma.plant.findMany()

export const addPlant = async (values: z.infer<typeof formSchema>) => {
  const session = await getServerSession(authOptions)
  const userEmail = session?.user?.email as string | undefined

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
      await prisma.plant.create({
        data: {
          name: values.name,
          species: values.species,
          dateOfPurchase: values.dateOfPurchase,
          waterNeeds: values.waterNeeds,
          frequency: values.frequency,
          owner: {
            connect: {
              id: user?.id,
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
  const date = new Date(dateString)
  date.setDate(date.getDate() + daysToAdd)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  const hours = String(date.getHours()).padStart(2, "0")
  const minutes = String(date.getMinutes()).padStart(2, "0")
  const seconds = String(date.getSeconds()).padStart(2, "0")

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`
}
