export async function getPrudectDetails(details:string) {
     const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${details}` ,{method:"get"})

  const {data} = await response.json()
return data
}