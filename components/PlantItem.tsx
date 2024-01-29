import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { addDaysToDate, compareDate } from "@/lib/action"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import DeleteAndWaterButton from "./DeleteAndWaterButton"

// Définit le type des props du composant PlantItem
type PlantItemProps = {
  id: string
  name: string
  species: string
  waterNeeds: number
  frequency: number
  watered: boolean
  dateOfPurchase: Date
  updatedAt: Date
}

const PlantItem = ({
  id,
  name,
  species,
  waterNeeds,
  frequency,
  watered,
  dateOfPurchase,
  updatedAt,
}: PlantItemProps) => {
  const nextWateringDate = addDaysToDate(updatedAt, frequency)

  return (
    <div className="flex space-x-3 max-w-[700px]">
      {/* Popover pour voir les détails d'une plante */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="max-w-[450px] w-full justify-between text-xl"
          >
            <div>{name}</div>
            {watered ? (
              <Badge>Arrosé</Badge>
            ) : (
              <Badge variant="destructive">Besoin d&apos;arrosage</Badge>
            )}
          </Button>
        </DialogTrigger>

        <DialogContent>
          {/* En-tête du dialogue */}
          <DialogHeader>
            <DialogTitle className="text-2xl">{name}</DialogTitle>
            <DialogDescription>Informations additionnelles.</DialogDescription>
          </DialogHeader>

          {/* Corps du dialogue : détails de la plante */}
          <div>
            {/* Espèce de la plante */}
            <div>
              <span className="font-medium underline">Espèce</span> :{" "}
              <span className="italic">{species}</span>
            </div>

            {/* Besoin en eau de la plante */}
            <div>
              <span className="font-medium underline">Besoin en eau</span> :{" "}
              <span className="italic">{`${waterNeeds} litres`}</span>
            </div>

            {/* Fréquence d'arrosage de la plante */}
            <div>
              <span className="font-medium underline">
                Fréquence d&apos;arrosage
              </span>{" "}
              :{" "}
              <span className="italic">
                {frequency === 0 ? "Jamais" : `Tous les ${frequency} jours`}
              </span>
            </div>

            {/* Date d'achat de la plante */}
            <div>
              <span className="font-medium underline">Date d&apos;achat</span> :{" "}
              <span className="italic">
                {format(dateOfPurchase, "PP", { locale: fr })}
              </span>
            </div>

            {/* Dernier arrosage de la plante */}
            <div>
              <span className="font-medium underline">Dernier arrosage</span> :{" "}
              <span className="italic">
                {format(updatedAt, "PP", { locale: fr })}
              </span>
            </div>

            {/* Prochain arrosage de la plante */}
            <div>
              <span className="font-medium underline">Prochain arrosage</span> :{" "}
              <span className="italic">
                {frequency === 0
                  ? "Jamais"
                  : format(nextWateringDate, "PP", {
                      locale: fr,
                    })}
              </span>
            </div>

            {/* Besoin d'arrosage de la plante */}
            <div>
              <span className="font-medium underline">
                Besoin d&apos;arrosage
              </span>{" "}
              :{" "}
              <span className="italic">
                {watered && !compareDate(nextWateringDate) ? "Non" : "Oui"}
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/* Boutons de suppression et de modification du statut de la plante */}
      <DeleteAndWaterButton plantId={id} watered={watered} />
    </div>
  )
}

export default PlantItem
