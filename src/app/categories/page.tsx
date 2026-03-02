"use client"

import React, { useEffect, useState } from 'react'
import Resetnotif from '../_components/resetnoti/resetnotif'
import SmallNavBar from '../_components/smallNavBar/smallNavBar'
import { getAllCategories } from '../apis/catregoriesApi'
import Image from 'next/image';
import  Link  from 'next/link';
import CustomLoading from '../_components/customLoading/customLoading'

export default function Categories() {

  interface category {
    _id: string,
    name: string,
    image: string
  }

  const [categories, setCategories] = useState([])

  async function getCategories() {
    const data = await getAllCategories()
    setCategories(data)

    console.log(data);
  }
  useEffect(() => {
    function flag() {
      
      getCategories()
    }
    flag()
  }, [])


  return (
    <>
    {categories.length === 0 ? <CustomLoading/> : <div className="container w-[80%] mx-auto ">
        <h2 className="font-bold text-2xl mb-3">All Categories:</h2>
        <div className='flex  flex-wrap'>
          {categories.map((category : category) =>
            <div key={category._id} className='p-3 w-1/2 h-[223px] md:w-1/3 lg:w-[25%]'>
             <Link href={`/categories/${category._id}`}>
              <div key={category._id} className='w-full hover:border-green-500 hover:border-5 delay-100 cursor-pointer h-full border border-4 rounded border-green-400'>
                <Image className='w-full md:h-[160px] h-[calc(100%-23px)]' src={category.image} width={300} height={300} alt={category.name} />
                <h1 className='bg-green-400 py-1 text-white text-[10px] md:text-[16px] text-center m-0'>{category.name}</h1>
              </div>
             </Link>
            </div>
          )}

        </div>
      </div> }
     

    </>
  )
}
