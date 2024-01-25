"use server"

import prisma from "@/prisma/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { formSchema } from "./validation/formSchema"

export const findAllPlants = async () => await prisma.plant.findMany()

export const addPlant = async (values: z.infer<typeof formSchema>) => {
  await prisma.plant.create({
    data: {
      name: values.name,
      species: values.species,
      dateOfPurchase: values.dateOfPurchase,
      waterNeeds: values.waterNeeds,
      frequency: values.frequency,
    },
  })

  revalidatePath("/")
}
