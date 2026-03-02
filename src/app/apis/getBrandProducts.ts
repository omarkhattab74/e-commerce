import axios from "axios";

export default async function getBrandProducts(brandId :string) {
    try {
        const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`,{
            params:{
                brand:brandId
            }
        })
        // console.log(response);
        return response.data
        
    } catch (error) {
        return error
    }
}