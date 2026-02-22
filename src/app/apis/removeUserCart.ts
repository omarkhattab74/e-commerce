"use server"

import { waitForDebugger } from "inspector"
import { getMyToken } from "../serveces/token"
import axios from "axios"
import { getToken } from 'next-auth/jwt';

export default async function removeUserCart() {
    const token =await getMyToken()

    const response = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart",{
        headers:{
            token :token
        }
    })
    return response.data
}