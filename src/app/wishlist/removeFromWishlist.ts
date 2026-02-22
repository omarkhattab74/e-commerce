"use server"

import axios from "axios";
import { getMyToken } from "../serveces/token";

export default async function removeFromWishlist(productid:string) {
      const token = await getMyToken()
      try {
      const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productid}`,{
        headers:{
          token : token
        }
      })
    return response.data
      console.log( "wishlist page" ,  response);
      
    } catch (error) {
        return error
        console.log("wishlist page" ,  error);
    }
}