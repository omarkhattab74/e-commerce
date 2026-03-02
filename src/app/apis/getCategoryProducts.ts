import axios from "axios";




export default async function getCategoryProducts(catId :string) {
    try {
        const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`, {
            params: {
                category: catId
            }

        })
        
        return response.data
    } catch (error) {
        return error
    }
}