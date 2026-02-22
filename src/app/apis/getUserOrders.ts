import axios from "axios";
import { getMyToken } from "../serveces/token";
import { jwtDecode } from "jwt-decode";

export default async function getUserOrders() {

    interface myid {
        id:string
    }

    const token = await getMyToken()

    if (token) {
           const myId : myid  =  jwtDecode(token)
           
    const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${myId.id}`)

    return response.data
    }
 
    
}