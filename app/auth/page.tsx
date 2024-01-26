import SignInWithEmail from "@/components/SignInWithEmail"
import SigninWithGithub from "@/components/SignInWithGithub"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { authOptions } from "@/utils/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function AuthRoute() {
  // Récupère la session serveur
  const session = await getServerSession(authOptions)

  // Redirige vers la page d'accueil si une session est présente
  if (session) {
    return redirect("/")
  }
  return (
    <div className="h-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <h1 className="text-center text-4xl font-semibold italic">
            Botanica!
          </h1>
          <CardTitle>Connectez-vous à votre compte.</CardTitle>
          <CardDescription>
            Transformez votre espace en un havre de verdure.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            {/* Composant de connexion par e-mail */}
            <SignInWithEmail />
            {/* Composant de connexion avec GitHub */}
            <SigninWithGithub />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
