"use client"

import { deletePlant, waterPlant } from "@/lib/action"
import { Droplets, Undo2, XCircle } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "./ui/button"

type DeleteAndWaterButtonProps = {
  plantId: string
  watered: boolean
}

const DeleteAndWaterButton = ({
  plantId,
  watered,
}: DeleteAndWaterButtonProps) => {
  const [submitting, setSubmitting] = useState(false)

  const handleDeletePlant = async () => {
    setSubmitting(true)
    await deletePlant(plantId)
    toast("Plante Supprimée !", {
      description: "Une plante a été supprimé correctement",
      action: {
        label: "OK",
        onClick: () => console.log("OK"),
      },
    })
    setSubmitting(false)
  }

  const handleWaterPlant = async () => {
    setSubmitting(true)
    await waterPlant(plantId)
    toast("Statut modifié !", {
      description: "Le statut de la plante a été mis à jour",
      action: {
        label: "OK",
        onClick: () => console.log("OK"),
      },
    })
    setSubmitting(false)
  }

  return (
    <div className="flex gap-2">
      <Button
        className="hover:bg-destructive hover:text-primary-foreground"
        onClick={handleDeletePlant}
        variant={"outline"}
        size={"icon"}
        disabled={submitting}
      >
        <XCircle />
      </Button>
      {watered ? (
        <Button
          onClick={handleWaterPlant}
          variant={"outline"}
          size={"icon"}
          disabled={submitting}
        >
          <Undo2 />
        </Button>
      ) : (
        <Button
          className="hover:bg-blue-500 hover:text-primary-foreground"
          onClick={handleWaterPlant}
          variant={"outline"}
          size={"icon"}
          disabled={submitting}
        >
          <Droplets />
        </Button>
      )}
    </div>
  )
}

export default DeleteAndWaterButton
