import PlantForm from "@/components/PlantForm"
import PlantList from "@/components/PlantList"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function Home() {
  return (
    <main>
      <h1>Botanica</h1>

      <div>
        <h3>Ajoutez une plante</h3>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Ajoutez une plante</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Ajout de plantes</DialogTitle>
              <DialogDescription>
                Veuillez renseigner les informations suivantes
              </DialogDescription>
            </DialogHeader>

            <PlantForm />

            {/* <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter> */}
          </DialogContent>
        </Dialog>
      </div>

      <div>
        <h3>Mes plantes</h3>

        <PlantList />
      </div>
    </main>
  )
}
