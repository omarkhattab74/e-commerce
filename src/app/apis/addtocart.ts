
"use server"
import axios from "axios";
import { getMyToken } from "../serveces/token";

export default async function addToCart(productid: string) {

    const token = await getMyToken()
    
    

    const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", {
        productId: productid
    },
        {
            headers: {
                token: token
            }
        })

        return data
        

}