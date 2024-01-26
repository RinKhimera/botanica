"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

const FormSchema = z.object({
  email: z.string().email(),
})

export default function SignInForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const signInResult = await signIn("email", {
      email: data.email,
      callbackUrl: `${window.location.origin}`,
      // redirect: false,
    })

    if (!signInResult?.ok) {
      return toast("Well this did not work...", {
        description: "Something went wrong, please try again",
        action: {
          label: "Dismiss",
          onClick: () => console.log("Dismiss"),
        },
      })
    }

    return toast("Check your email", {
      description: "A magic link has been sent to you",
      action: {
        label: "OK",
        onClick: () => console.log("OK"),
      },
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-4 w-full" disabled>
          Login with Email
        </Button>
      </form>
    </Form>

    // <form action={SignInWithEmail}>
    //   <div className="flex flex-col gap-y-2">
    //     <Label>Email</Label>
    //     <Input
    //       onChange={(e) => setEmail(e.target.value)}
    //       name="email"
    //       type="email"
    //       placeholder="name@example.com"
    //     />
    //   </div>

    // <Button type="submit" className="mt-4 w-full">
    //   Login with Email
    // </Button>
    // </form>
  )
}
