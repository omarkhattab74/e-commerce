export async function getAllCategories() {
const response = await fetch("https://ecommerce.routemisr.com/api/v1/categories",{method:"get"})

const {data} = await response.json()
return data

}


