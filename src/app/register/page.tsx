"use client"

import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod'
import { registerType, schema } from '@/schema/registerschema'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useState } from "react"


export default function Register() {
    const [loading, setLoading] = useState(false)
  

  const router = useRouter()


  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""


    },
    resolver: zodResolver(schema)
  })

  const { handleSubmit } = form

  async function handleForm(data: registerType) {
    setLoading(true)

    try {
      const response = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", data)
      router.push("/login")
      toast.success(response.data.message, { position: "top-center" })
          setLoading(false)
    } catch (error) {
      toast.error("Something went wrong", { position: "top-center" })

    }
      setLoading(false)
  }


  return (
    <>
      <div className='w-1/2 mx-auto shadow-2xl my-10 p-4 rounded-2xl'>
        <h2 className='font-semibold text-2xl my-4'>Register Now :</h2>
        <form onSubmit={handleSubmit(handleForm)}>
          <FieldGroup className='my-5'>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className='' >
                    Name
                  </FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Your Name"
                    // autoComplete="off"
                    type='text'
                  />
                  {fieldState.invalid && fieldState.isTouched && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

          </FieldGroup>
          <FieldGroup className='my-5'>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel >
                    Email
                  </FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Your Name"
                    // autoComplete="off"
                    type='email'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

          </FieldGroup>
          <FieldGroup className='my-5'>
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel >
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Your Name"
                    // autoComplete="off"
                    type='password'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

          </FieldGroup>
          <FieldGroup className='my-5'>
            <Controller
              name="rePassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel >
                    Repassword
                  </FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Your Name"
                    // autoComplete="off"
                    type='password'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

          </FieldGroup>
          <FieldGroup className='my-5'>
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel >
                    Phone
                  </FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Your Name"
                    // autoComplete="off"
                    type='tel'
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
          </button> : <Button className="w-full bg-green-500 hover:bg-green-600">Register</Button>
          }      </form>
      </div>
    </>
  )
}
