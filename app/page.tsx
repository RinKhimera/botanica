import LogoutButton from "@/components/LogoutButton"
import PlantForm from "@/components/PlantForm"
import PlantList from "@/components/PlantList"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
      {!session ? (
        <div>
          <h1 className="text-3xl font-semibold">Bienvenue sur Botanica!</h1>
          <p>
            Veuillez vous connecter pour cultivez votre passion avec précision.
          </p>
          <Button asChild>
            <Link href="/auth">Login</Link>
          </Button>
        </div>
      ) : (
        <main>
          <div className="flex justify-between mt-2">
            <Avatar>
              <AvatarImage src={session.user?.image as string} alt="@shadcn" />
              <AvatarFallback>XO</AvatarFallback>
            </Avatar>
            <div className="text-end max-w-[200px] ">
              <h2>
                Bienvenue{" "}
                <span className="font-medium">{session.user?.name}</span>{" "}
              </h2>
              <h2 className="font-medium">{session.user?.email}</h2>
              <LogoutButton />
            </div>
          </div>

          <section>
            <h1 className="text-5xl font-bold italic mt-5">Botanica!</h1>
            <p className="font-medium my-1 text-lg">
              Une application pour des plantes plus vertes et des sourires plus
              grands.
            </p>

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
              </DialogContent>
            </Dialog>
          </section>

          <section>
            <h3 className="font-medium my-1 text-lg mt-4">
              Votre jardin intérieur
            </h3>
            <PlantList />
          </section>
        </main>
      )}
    </main>

    // <main>
    //   <div className="p-10">
    //     <h1>Hello from the index page, this is a public route</h1>
    //     {session ? (
    //       <div>
    //         <h1>you are logged in </h1>
    //         <LogoutButton />
    //       </div>
    //     ) : (
    //       <div>
    //         <h1>Pleae log in to see something special</h1>
    //         <Button asChild>
    //           <Link href="/auth">Login</Link>
    //         </Button>
    //       </div>
    //     )}
    //   </div>

    //   <h1>Botanica</h1>

    //   <div>
    //     <h3>Ajoutez une plante</h3>

    //     <Dialog>
    //       <DialogTrigger asChild>
    //         <Button variant="outline">Ajoutez une plante</Button>
    //       </DialogTrigger>
    //       <DialogContent className="sm:max-w-[600px]">
    //         <DialogHeader>
    //           <DialogTitle>Ajout de plantes</DialogTitle>
    //           <DialogDescription>
    //             Veuillez renseigner les informations suivantes
    //           </DialogDescription>
    //         </DialogHeader>

    //         <PlantForm />

    //         {/* <DialogFooter>
    //           <Button type="submit">Save changes</Button>
    //         </DialogFooter> */}
    //       </DialogContent>
    //     </Dialog>
    //   </div>

    //   <div>
    //     <h3>Mes plantes</h3>

    //     <PlantList />
    //   </div>
    // </main>
  )
}
