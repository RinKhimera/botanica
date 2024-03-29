"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { addPlant } from "@/lib/action"
import { cn } from "@/lib/utils"
import { formSchema } from "@/lib/validation/formSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { CalendarIcon, Loader2 } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

const PlantForm = () => {
  // État local pour gérer l'état de soumission du formulaire
  const [submitting, setSubmitting] = useState(false)

  // Initialise le formulaire avec useForm et utilise le résolveur zodResolver avec le schéma Zod
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      species: "",
      dateOfPurchase: undefined,
      waterNeeds: undefined,
      frequency: undefined,
    },
  })

  // Fonction de soumission du formulaire
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Met à jour l'état de soumission pour indiquer que la soumission est en cours
    setSubmitting(true)
    try {
      // Appelle la fonction addPlant avec les valeurs du formulaire
      await addPlant(values)
      // Affiche une notification pour indiquer que la plante a été ajoutée avec succès
      toast("Plante créée !", {
        description: "Une plante a été ajoutée avec succès.",
        action: {
          label: "OK",
          onClick: () => console.log("OK"),
        },
      })
    } catch (error) {
      // Gère les erreurs en les affichant dans la console
      console.log(error)
      toast("Oops!", {
        description: "Une erreur s'est produite. Veuillez réessayer plus tard.",
        action: {
          label: "OK",
          onClick: () => console.log("OK"),
        },
      })
    } finally {
      // Rétablit l'état de soumission une fois la soumission terminée
      setSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      {/* Formulaire avec React Hook Form */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {/* Champ de saisie pour le nom de la plante */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="Tournesol" {...field} />
              </FormControl>
              <FormDescription>Le nom de votre plante.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Champ de saisie pour l'espèce de la plante */}
        <FormField
          control={form.control}
          name="species"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Espèce</FormLabel>
              <FormControl>
                <Input placeholder="Helianthus" {...field} />
              </FormControl>
              <FormDescription>
                La catégorie botanique à laquelle votre plante est affiliée.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Champ de saisie pour la date d'achat de la plante */}
        <FormField
          control={form.control}
          name="dateOfPurchase"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date d&apos;achat</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PP", { locale: fr })
                      ) : (
                        <span>Choisir une date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                La date d&apos;achat de la plante.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Champ de saisie pour les besoins en eau de la plante */}
        <FormField
          control={form.control}
          name="waterNeeds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Besoin en eau</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Entrez une valeur comprise entre 0 et 5"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Définissez le besoin en litre eau de la plante.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Champ de saisie pour la fréquence d'arrosage de la plante */}
        <FormField
          control={form.control}
          name="frequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fréquence d&apos;arrosage</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisissez une fréquence d'arrosage." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">Quotidien</SelectItem>
                  <SelectItem value="2">Tous les deux jours</SelectItem>
                  <SelectItem value="3">Tous les trois jours</SelectItem>
                  <SelectItem value="7">Hebdomadaire</SelectItem>
                  <SelectItem value="15">Bimensuel</SelectItem>
                  <SelectItem value="30">Mensuel</SelectItem>
                  <SelectItem value="90">Trimestriel</SelectItem>
                  <SelectItem value="0">Jamais</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Déterminez à quelle fréquence la plante doit être arrosée.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Bouton de soumission du formulaire */}
        {submitting ? (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Patientez svp
          </Button>
        ) : (
          <Button type="submit">Ajouter</Button>
        )}
      </form>
    </Form>
  )
}

export default PlantForm
