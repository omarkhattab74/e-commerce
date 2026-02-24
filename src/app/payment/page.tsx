"use client"
import React, { useContext } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { Button } from "@/components/ui/button"

import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
    FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group"
import payCash from '../apis/payCash'
import { CartContext} from '@/cartcontext/cartContext'
import paymentVisa from '../apis/visaPayment'
import { useRouter } from 'next/navigation'


const formSchema = z.object({
    details: z.string().min(3, "adress detailes must be at least 3 characters.").max(10, "Adress detailes must be at most 10 characters."),

    phone: z.string().regex(/^01[0-2,5]{1}\d{8}$/, "Invalid egyptian number"),
    city: z.string().min(3, "City must be at least 3 characters.").max(10, "City must be at most 10 characters."),

    plan: z.string().min(1, "You must select a payment methodto continue."),
})

export default function Payment() {

  

    const router = useRouter()

    const { cartid, handleUserCart } = useContext(CartContext)!


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            details: "",
            phone: "",
            city: "",
            plan: ""
        },
    })



    async function onSubmit(data: z.infer<typeof formSchema>) {

        if (data.plan === `Cash`) {

            const resault = await payCash(cartid!, data)
            if (resault.status === 'success') {
                toast.success("success", {
                    position: "top-center"
                })

                handleUserCart()
                router.push("/allorders")


            } else {
                toast.error("Something went wrong", {
                    position: "top-center"
                })
            }
        } else {
            const visaData = {
                shippingAddress: {
                    details: data.details,
                    phone: data.phone,
                    city: data.city,
                }
            }
            const res = await paymentVisa(cartid!, visaData)


             if (res.status === 'success') {
                toast.success("success", {
                    position: "top-center"
                })

                handleUserCart()
                window.open(res.session.url,"_self")

            } else {
                toast.error("Something went wrong", {
                    position: "top-center"
                })
            }

        }




    }

    const plans = [
        {
            id: "Cash",
            title: "Cash",
        },
        {
            id: "Payonline",
            title: "Payonline (Visa)",

        },

    ] as const

    return (
        <div className='container w-[80%] mx-auto py-7'>
            <h2 className='text-center text-5xl font-semibold'>Payment</h2>

            <form id="form-rhf-input" className=' bg-white shadow-xl rounded-2xl p-7 my-10 lg:w-[60%] lg:mx-auto' onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup className='mb-3'>
                    <Controller
                        name="details"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-input-username">
                                    Adress :
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="form-rhf-input-username"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter Your Detailed Adress"

                                />

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>
                <FieldGroup className='mb-3'>
                    <Controller
                        name="phone"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-input-username">
                                    Phone :
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="form-rhf-input-username"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter Your Phone Number"
                                />

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>
                <FieldGroup>
                    <Controller
                        name="city"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-input-username">
                                    City :
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="form-rhf-input-username"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter Your City"
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
                        name="plan"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <FieldSet data-invalid={fieldState.invalid}>
                                <FieldLegend>Payment Method</FieldLegend>

                                <RadioGroup
                                    name={field.name}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    aria-invalid={fieldState.invalid}
                                >
                                    {plans.map((plan) => (
                                        <FieldLabel
                                            key={plan.id}
                                            htmlFor={`form-rhf-radiogroup-${plan.id}`}
                                        >
                                            <Field
                                                orientation="horizontal"
                                                data-invalid={fieldState.invalid}
                                            >
                                                <FieldContent>
                                                    <FieldTitle>{plan.title}</FieldTitle>

                                                </FieldContent>
                                                <RadioGroupItem
                                                    value={plan.id}
                                                    id={`form-rhf-radiogroup-${plan.id}`}
                                                    aria-invalid={fieldState.invalid}
                                                />
                                            </Field>
                                        </FieldLabel>
                                    ))}
                                </RadioGroup>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </FieldSet>
                        )}
                    />
                </FieldGroup>


                <Button type="submit" form="form-rhf-input" className='w-full bg-green-400 hover:bg-green-500'>
                    Pay Now
                </Button>
            </form>

        </div>
    )
}
