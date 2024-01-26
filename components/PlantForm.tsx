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
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const PlantForm = () => {
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      addPlant(values)
      form.reset()
    } catch (error) {
      console.log(error)
    }
    // console.log(values)
    // console.log(JSON.stringify(values.dateOfPurchase))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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

        <FormField
          control={form.control}
          name="frequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fréquence d&apos;arrosage</FormLabel>
              <Select
                onValueChange={field.onChange}
                // defaultValue={field.value}
              >
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

        <Button type="submit">Ajoutez</Button>
      </form>
    </Form>
  )
}

export default PlantForm
