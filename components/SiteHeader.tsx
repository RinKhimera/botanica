"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { Button } from "./ui/button"

const AuthButton = () => {
  const { data: session } = useSession()

  if (session) {
    return (
      <>
        {session.user?.name} <br />
        <Button onClick={() => signOut()}>Sign out</Button>
      </>
    )
  }

  return (
    <>
      Not signed in <br />
      <Button onClick={() => signIn()}>Sign in</Button>
    </>
  )
}

const SiteHeader = () => {
  return (
    <div>
      <AuthButton />
    </div>
  )
}

export default SiteHeader
