import SessionProvider from "@/components/SessionProvider"
import SiteHeader from "@/components/SiteHeader"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { getServerSession } from "next-auth/next"
import { Inter as FontSans } from "next/font/google"
import "./globals.css"
// const inter = Inter({ subsets: ["latin"] })

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Botanica!",
  description: "An app for greener plants and bigger smiles",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession()

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("bg-background font-sans antialiased", fontSans.variable)}
      >
        <main className="mx-auto max-w-5xl px-3">
          {children}
          <Toaster />
        </main>
      </body>
    </html>
  )
}
