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
import axios from "axios"
import { useRouter } from "next/navigation"



const formSchema = z.object({
    resetCode: z.string().nonempty("Enter Reset Code")

})

export default function Forgetpassword() {

  const [loading, setLoading] = useState(false)
    const route = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            resetCode: "",
        },
    })


    async function onSubmit(data: z.infer<typeof formSchema>) {
        setLoading(true)
       try {
         const response = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",data)
          setLoading(false)
       route.push("/newpassword")

       } catch (error) {
         toast.error("Invalid Code" , {
                position:"top-center"
              })
              setLoading(false)
       }
       
    }



    return (
        <div className="md:w-[50%] w-full mx-auto shadow-2xl rounded-2xl my-10">
             <Card className="w-full p-7 ">
               <CardHeader>
                 <h2 className="font-semibold text-2xl">Verify Reset Code :</h2>
                 <p>We Sent Reset Code To Your Email</p>
               </CardHeader>
               <CardContent>
                 <form onSubmit={form.handleSubmit(onSubmit)}>
                   <FieldGroup className="my-5">
                     <Controller
                       name="resetCode"
                       control={form.control}
                       render={({ field, fieldState }) => (
                         <Field data-invalid={fieldState.invalid}>
                           <FieldLabel >
                            Enter Your Verification Code :
                           </FieldLabel>
                           <Input
                             {...field}
                           type="text"
                           inputMode="numeric"
                           maxLength={6}
                        //    pattern="/d*"
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
                       
                       <p>Your Password Reset Code Is Valid For 10 Minutes </p>
       
               </CardContent>
       
             </Card>
       
       
             </div>
    )
}
