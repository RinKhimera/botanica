import LogoutButton from "@/components/LogoutButton"
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
import { authOptions } from "@/utils/auth"
import { getServerSession } from "next-auth"
import Link from "next/link"

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <main>
      <div className="p-10">
        <h1>Hello from the index page, this is a public route</h1>
        {session ? (
          <div>
            <h1>you are logged in </h1>
            <LogoutButton />
          </div>
        ) : (
          <div>
            <h1>Pleae log in to see something special</h1>
            <Button asChild>
              <Link href="/auth">Login</Link>
            </Button>
          </div>
        )}
      </div>

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
