"use server"

import axios from "axios"
import { getMyToken } from "../serveces/token"

export default async function removeOneProduct(productid:string) {
    const token = await getMyToken()

    const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productid}`,{
        headers:{
            token:token
        }

        
    })

    return response.data
}

