 
import Slider from "./_components/slider/slider";
import { getAllCategories } from "./apis/catregoriesApi";
import Catslider from "./_components/slider/catslider";
import Products from "./products/page";


export default async function Home() {

  const category =await getAllCategories()
  

  return <>
  <Slider/>
  <div className="container w-[80%] my-7 mx-auto">

  <Catslider category={category}/>
  </div>

  <Products/>

  
  </>
    
  
}
