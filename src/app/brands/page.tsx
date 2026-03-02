"use client"

import React, { useEffect, useState } from 'react'
import getAllBrands from '../apis/getAllBrands'
import Link from 'next/link'
import Image from 'next/image'
import CustomLoading from '../_components/customLoading/customLoading'

export default  function Brands() {

  interface brand {
    _id : string,
    name : string,
    image : string
  }

  const [brands,setBrands] = useState([])

 async function getBrands() {
    const brands = await getAllBrands()
    console.log("from brands", brands);
    setBrands(brands.data)
  
  }

  useEffect(()=>{
    function flag() {
      
      getBrands()
    }

    flag()
  },[])


  return (
    <>
    {brands.length === 0 ? <CustomLoading/> :   <div className="container w-[80%] mx-auto ">
        <h2 className="font-bold text-2xl mb-3">All Brands:</h2>
        <div className='flex  flex-wrap'>
          {brands.map((brand :brand) =>
            <div key={brand._id} className='p-3 w-1/2 h-[223px] md:w-1/3 lg:w-[25%]'>
             <Link href={`/brands/${brand._id}`}>
              <div key={brand._id} className='w-full hover:border-green-500 hover:border-5 delay-100 cursor-pointer h-full border border-4 rounded border-green-400'>
                <Image className='w-full md:h-[160px] h-[calc(100%-23px)]' src={brand.image} width={300} height={300} alt={brand.name} />
                <h1 className='bg-green-400 py-1 text-white text-[10px] md:text-[16px] text-center m-0'>{brand.name}</h1>
              </div>
             </Link>
            </div>
          )}

        </div>
      </div>}

     

     
    

    </>
  )
}
