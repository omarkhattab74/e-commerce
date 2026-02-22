"use server"

import axios from "axios"
import { getMyToken } from "../serveces/token"

export default async function addToWishlist(productid:string) {
    const token = await getMyToken()
   try {
     const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
        productId : productid
    },{
        headers:{
            token:token
        }
    })
    return response.data
   } catch (error) {
    return error
   }
}