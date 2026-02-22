"use server"

import axios from "axios"
import { getMyToken } from "../serveces/token"


export interface visaData {
  shippingAddress: ShippingAddress
}

export interface ShippingAddress {
  details: string
  phone: string
  city: string
}


export default async function paymentVisa(cartId :string, data:visaData) {
    const token = await getMyToken()

    try {
        const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,data
            ,{
            headers:{
                token : token
            }
        })
        return response.data
    } catch (error) {
        return error
    }

}