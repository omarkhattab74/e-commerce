"use client"


import * as React from "react"
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
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from 'react'




const formSchema = z.object({
    email: z.email().nonempty("Email Is Required"),

})

export default function Forgetpassword() {

  const [loading, setLoading] = useState(false)

    const route = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })


    async function onSubmit(data: z.infer<typeof formSchema>) {
        setLoading(true)
       try {
         const response = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",data)
        setLoading(false)
       route.push("/resetcodepage")

       } catch (error) {
              toast.error("There is no user registered with this email address", {
                position: "top-center"
              })
              setLoading(false)
        
       }
       
    }



    return (
        <div className="w-[50%] mx-auto shadow-2xl rounded-2xl my-10">
             <Card className="w-full p-7 ">
               <CardHeader>
                 <h2 className="font-semibold text-2xl">Forget password :</h2>
                 <p>We will send Reset code your email</p>
               </CardHeader>
               <CardContent>
                 <form onSubmit={form.handleSubmit(onSubmit)}>
                   <FieldGroup className="my-5">
                     <Controller
                       name="email"
                       control={form.control}
                       render={({ field, fieldState }) => (
                         <Field data-invalid={fieldState.invalid}>
                           <FieldLabel >
                            Enter Your Email :
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
                   
                       {loading ? <button id="loadingBtn" className="loading-btn flex justify-center bg-green-400 w-full" disabled>
                                     <span className="spinner"></span>
                                     loading
                                   </button> : <Button className="w-full bg-green-500 hover:bg-green-600 ">Send</Button>
                                   }
                 </form>
       
       
               </CardContent>
       
             </Card>
       
       
             </div>
    )
}
