
"use server"

import axios from "axios";
import { getMyToken } from "../serveces/token";

export async function getUserCart() {
    const token = await getMyToken()

    if (token) {
        const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
            headers: {
                token: token
            }
        })

        return data
    }



}