import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { addDaysToDate, compareDate } from "@/lib/action"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

type PlantItemProps = {
  name: string
  species: string
  waterNeeds: number
  frequency: number
  watered: boolean
  dateOfPurchase: Date
  updatedAt: Date
}

const PlantItem = ({
  name,
  species,
  waterNeeds,
  frequency,
  watered,
  dateOfPurchase,
  updatedAt,
}: PlantItemProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="max-w-[500px] w-full justify-between text-xl"
        >
          <div>{name}</div>
          <div className="w-[120px] text-start">
            {waterNeeds}L | {frequency} jours
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">{name}</DialogTitle>
          <DialogDescription>Informations additionnelles.</DialogDescription>
        </DialogHeader>
        <div>
          <div>
            <span className="font-medium underline">Espèce</span> :{" "}
            <span className="italic">{species}</span>
          </div>
          <div>
            <span className="font-medium underline">Besoin en eau</span> :{" "}
            <span className="italic">{`${waterNeeds} litres`}</span>
          </div>
          <div>
            <span className="font-medium underline">
              Fréquence d&apos;arrosage
            </span>{" "}
            :{" "}
            <span className="italic">
              {frequency === 0 ? "Jamais" : `Tous les ${frequency} jours`}
            </span>
          </div>
          <div>
            <span className="font-medium underline">Date d&apos;achat</span> :{" "}
            <span className="italic">
              {format(dateOfPurchase, "PP", { locale: fr })}
            </span>
          </div>
          <div>
            <span className="font-medium underline">Dernier arrosage</span> :{" "}
            <span className="italic">
              {format(updatedAt, "PP", { locale: fr })}
            </span>
          </div>
          <div>
            <span className="font-medium underline">Prochain arrosage</span> :{" "}
            <span className="italic">
              {frequency === 0
                ? "Jamais"
                : format(addDaysToDate(updatedAt, frequency), "PP", {
                    locale: fr,
                  })}
            </span>
          </div>
          <div>
            <span className="font-medium underline">
              Besoin d&apos;arrosage
            </span>{" "}
            :{" "}
            {/* <span className="italic">{watered === false ? "Oui" : "Non"}</span> */}
            <span className="italic">
              {compareDate(addDaysToDate(updatedAt, frequency)) ? "Oui" : "Non"}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PlantItem
