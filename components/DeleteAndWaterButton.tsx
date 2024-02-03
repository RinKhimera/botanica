"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deletePlant, waterPlant } from "@/lib/action"
import { Droplets, Undo2, XCircle } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "./ui/button"

// Définition du type des propriétés du composant
type DeleteAndWaterButtonProps = {
  plantId: string
  watered: boolean
}

const DeleteAndWaterButton = ({
  plantId,
  watered,
}: DeleteAndWaterButtonProps) => {
  // Déclaration d'un état local pour gérer la soumission des actions
  const [submitting, setSubmitting] = useState(false)

  // Fonction pour gérer la suppression de la plante
  const handleDeletePlant = async () => {
    // Met à jour l'état de soumission
    setSubmitting(true)
    try {
      // Appelle la fonction de suppression de plante avec l'ID de la plante
      await deletePlant(plantId)
      toast("Plante Supprimée !", {
        description: "Une plante a été supprimée correctement.",
        action: {
          label: "OK",
          onClick: () => console.log("OK"),
        },
      })
    } catch (error) {
      // Gère les erreurs en affichant un message toast
      console.log(error)
      toast("Oops!", {
        description: "Une erreur s'est produite. Veuillez réessayer plus tard.",
        action: {
          label: "OK",
          onClick: () => console.log("Error"),
        },
      })
    } finally {
      // Rétablit l'état de soumission une fois la soumission terminée
      setSubmitting(false)
    }
  }

  // Fonction pour gérer l'arrosage de la plante
  const handleWaterPlant = async () => {
    // Met à jour l'état de soumission
    setSubmitting(true)
    try {
      // Appelle la fonction d'arrosage de plante avec l'ID de la plante
      await waterPlant(plantId)
      // Affiche une notification pour indiquer que le statut a été modifié
      toast("Statut modifié !", {
        description: "Le statut de la plante a été mis à jour.",
        action: {
          label: "OK",
          onClick: () => console.log("OK"),
        },
      })
    } catch (error) {
      // Gère les erreurs en affichant un message toast
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
    <div className="flex gap-2">
      {/* Bouton de suppression de la plante */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            className="hover:bg-destructive hover:text-primary-foreground"
            variant={"outline"}
            size={"icon"}
            disabled={submitting} // Désactive le bouton pendant la soumission
          >
            <XCircle />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous absolument sûr(e) ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Elle supprimera définitivement
              votre plante.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePlant}>
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bouton d'arrosage de la plante */}
      {watered ? (
        <Button
          onClick={handleWaterPlant}
          variant={"outline"}
          size={"icon"}
          disabled={submitting} // Désactive le bouton pendant la soumission
        >
          <Undo2 />
        </Button>
      ) : (
        <Button
          className="hover:bg-blue-500 hover:text-primary-foreground"
          onClick={handleWaterPlant}
          variant={"outline"}
          size={"icon"}
          disabled={submitting} // Désactive le bouton pendant la soumission
        >
          <Droplets />
        </Button>
      )}
    </div>
  )
}

export default DeleteAndWaterButton
