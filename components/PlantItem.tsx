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
import { addDaysToDate } from "@/lib/action"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

type PlantItemProps = {
  name: string
  species: string
  waterNeeds: number
  frequency: number
  dateOfPurchase: Date
  watered: boolean
}

const PlantItem = ({
  name,
  species,
  waterNeeds,
  frequency,
  dateOfPurchase,
  watered,
}: PlantItemProps) => {
  console.log(dateOfPurchase)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-between text-xl">
          <div>{name}</div>
          <div>
            {waterNeeds}L | {frequency} jours
          </div>
          <div></div>
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
            <span className="italic">{waterNeeds}</span>
          </div>
          <div>
            <span className="font-medium underline">
              Fréquence d&apos;arrosage
            </span>{" "}
            : <span className="italic">{frequency}</span>
          </div>
          <div>
            <span className="font-medium underline">Date d&apos;achat</span> :{" "}
            <span className="italic">
              {format(dateOfPurchase, "PP", { locale: fr })}
            </span>
          </div>
          <div>
            <span className="font-medium underline">Prochain arrosage</span> :{" "}
            <span className="italic">
              {format(addDaysToDate(dateOfPurchase, frequency), "PP", {
                locale: fr,
              })}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>

    // <Popover>
    //   <PopoverTrigger className="w-2/3">
    //     <Button variant={"ghost"} className="w-full justify-start text-xl">
    //       utton
    //     </Button>
    //   </PopoverTrigger>
    //   <PopoverContent>exe</PopoverContent>
    // </Popover>

    // <div className="">
    //   {name} | {species} | {waterNeeds} | {frequency}
    // </div>
  )
}

export default PlantItem
