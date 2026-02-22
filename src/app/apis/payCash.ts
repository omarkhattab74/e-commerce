

import axios from "axios";
import { getMyToken } from "../serveces/token";
import { ErrorsToShowInBrowserMessage } from "next/dist/server/dev/hot-reloader-types";

interface data{
   
        details: string,
        phone: string,
        city: string,
        
}

export default async function payCash(cartid:string , data :data) {
    const token = await getMyToken()
    
    const response =  await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartid}`,
        {
            shippingAddress:{data}
        },
        {
            headers:{
                token : token
            }
        }
    )

    return response.data
}