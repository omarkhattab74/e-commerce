"use client"

import * as React from "react"
import { useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { signIn } from "next-auth/react";
import Resetnotif from './../_components/resetnoti/resetnotif';
import { useRouter } from "next/navigation"
import axios from "axios"

const formSchema = z.object({
  email: z.email().nonempty("Email Is Required"),

  newPassword: z.string().nonempty("New Password Is Required").min(8, "weak password")

})

export default function Newpassword() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      newPassword: "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setLoading(true)
    try {
      const response = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, { data })

      setLoading(false)
    } catch (error) {
      toast.error("Sometging Went Wrong", {
        position: "top-center"
      })
      setLoading(false)

    }


  }

  return (
    <div className="md:w-[50%] w-full mx-auto shadow-2xl rounded-2xl my-10">
      <Card className="w-full p-7 ">
        <CardHeader>
          <h2 className="font-semibold text-2xl">Reset Password :</h2>
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
                name="newPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel >
                      New Password :
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
            {loading ? <button id="loadingBtn" className="loading-btn flex justify-center bg-green-400 w-full" disabled>
              <span className="spinner"></span>
              loading
            </button> : <Button className="w-full bg-green-500 hover:bg-green-600 ">SET PASSWORD</Button>
            }
          </form>
        </CardContent>

      </Card>


    </div>

  )
}
