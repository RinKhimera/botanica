"use client"

import { deletePlant } from "@/lib/action"
import { Button } from "./ui/button"

type DeleteAndWaterButtonProps = {
  plantId: string // Specify the type of plantId as string
}

const DeleteAndWaterButton = ({ plantId }: DeleteAndWaterButtonProps) => {
  const handleDeletePlant = async () => {
    await deletePlant(plantId)
  }
  return (
    <div>
      <Button onClick={handleDeletePlant}>Supprimer</Button>
      <Button onClick={() => {}}>Arroser</Button>
    </div>
  )
}

export default DeleteAndWaterButton
