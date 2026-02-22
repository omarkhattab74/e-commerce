"use server"

import axios from "axios";
import { getMyToken } from "../serveces/token";

export default async function getUserWishlist() {
      const token = await getMyToken()

      if (token) {
        try {
      const response = await axios("https://ecommerce.routemisr.com/api/v1/wishlist",{
        headers:{
          token : token
        }
      })
    return response.data
      
    } catch (error) {
        return error
    }
      }
      

      
}