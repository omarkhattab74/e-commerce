
"use server"

import axios from "axios";
import { getMyToken } from "../serveces/token";

export default  async function changeProductCount(productid:string , count:number) {
    
    const token = await getMyToken()
    console.log( "token from change cart number",  token);
    console.log( "productid from change cart number",  productid);
    console.log( "count from change cart number",  count);
    const response = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productid}`,{count},
        {
            headers:{
                token: token
            }
        }
    )

    return response.data
    
    
}