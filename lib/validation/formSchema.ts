import * as z from "zod"

export const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, {
      message: "Le nom de la plante doit comporter au moins 2 caractères.",
    })
    .max(30, {
      message:
        "Le nom de la plante ne doit pas comporter plus de 30 caractères.",
    }),

  species: z
    .string()
    .trim()
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

  waterNeeds: z.coerce
    .number({
      invalid_type_error: "La valeur doit être comprise entre 0 et 5.",
    })
    .nonnegative({
      message: "La valeur doit être non-négative.",
    })
    .lte(5, {
      message: "La valeur doit être comprise entre 0 et 5.",
    }),

  frequency: z.coerce
    .number({
      invalid_type_error: "La sélection est nulle.",
    })
    .nonnegative({
      message: "La valeur doit être non-négative.",
    }),
})
