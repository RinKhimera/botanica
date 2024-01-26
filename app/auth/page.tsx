import SignInWithEmail from "@/components/SignInWithEmail"
import SigninWithGithub from "@/components/SignInWithGithub"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authOptions } from "@/utils/auth"
import { Github } from "lucide-react"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function AuthRoute() {
  const session = await getServerSession(authOptions)

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
            <SignInWithEmail />

            <SigninWithGithub />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
