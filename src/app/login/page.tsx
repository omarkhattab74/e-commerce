"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { signIn } from "next-auth/react";
import Link from "next/link"
import { useState } from "react"

const formSchema = z.object({
  email: z.email().nonempty("Email Is Required"),

  password: z.string().nonempty("Password Is Required")

})

export default function Login() {
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setLoading(true)
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl: "/"

    })

    if (res?.ok) {
      toast.success("Logged in successfully",
        {
          position: "top-center",
          duration: 3000
        }
      )
      setLoading(false)
      window.location.href = "/"
    } else {
      toast.error(res?.error, {
        position: "top-center",
        duration: 3000
      })
      setLoading(false)
    }

  }

  return (
    <div className="w-[50%] mx-auto shadow-2xl rounded-2xl my-10">
      <Card className="w-full p-7 ">
        <CardHeader>
          <h2 className="font-semibold text-2xl">Login Now :</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel >
                      Email :
                    </FieldLabel>
                    <Input
                      {...field}
                      type="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter Your Email"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

            </FieldGroup>
            <FieldGroup className="my-6">
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel >
                      Password :
                    </FieldLabel>
                    <Input
                      {...field}
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter Yoyr Password"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

            </FieldGroup>
            {loading ? <button id="loadingBtn" className="loading-btn flex justify-center bg-green-400 w-full flex-1" disabled>
              <span className="spinner"></span>
              loading
            </button> : <Button className="w-full bg-green-500 hover:bg-green-600">logIn</Button>
            }

          </form>

          <Link href={"/forgetpassword"}>
            <span className="text-red-700 text-center block mt-3 cursor-pointer">Forget Password</span>
          </Link>


          {/* <Resetnotif /> */}
        </CardContent>

      </Card>


    </div>

  )
}
