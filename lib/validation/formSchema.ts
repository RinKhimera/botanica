import * as z from "zod"

export const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Le nom de la plante doit comporter au moins 2 caractères.",
    })
    .max(30, {
      message:
        "Le nom de la plante ne doit pas comporter plus de 30 caractères.",
    }),
  species: z
    .string()
    .min(2, {
      message: "Le nom de l'espèce doit comporter au moins 2 caractères.",
    })
    .max(50, {
      message:
        "Le nom de l'espèce ne doit pas comporter plus de 50 caractères.",
    }),
  dateOfPurchase: z.date({
    required_error: "Une date d'achat est requise.",
  }),
})
