
import axios from "axios";

export default async function getAllBrands() {
    try {
        const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
        // console.log(  "from brands",response);
        return data
        
    } catch (error) {
        console.log(error);
        // return error
    }
}