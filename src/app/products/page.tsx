"use client"

import React, { useContext, useEffect, useState } from 'react'
import { getAllProducts } from '../apis/allProductApi'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'
import Image from 'next/image'
import { product } from './../../interfaces/product.interface';
import AddtoCardButton from '../_components/addtocardbutton/addtoCardButton'
import WishlistButton from '../_components/addToWishList/wishlistButton'
import { wishContext } from '@/wishlistContext/wishlistContext'
import { data } from '@/interfaces/wishlistInterface'
import CustomLoading from './../_components/customLoading/customLoading';


export default function Products() {
  const { wish }= useContext(wishContext)!

  const [products, setProducts] = useState([])

  async function getproducts() {
    const res = await getAllProducts()
    setProducts(res)
  }



  useEffect(() => {
      function flag() {
        getproducts()
      }
    
      flag()
  }, [])





  return (
    <>
    {products.length ===0 ?<CustomLoading/> :  <div className='flex flex-wrap container mx-auto md:w-[80%]'>
        {products?.map((product: product) => {
          return <div key={product.id} className='w-full p-2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5'>
            <Card className='px-3'>
              <Link href={`/products/${product.id}`}>
                <CardHeader>
                  <CardTitle><Image src={product.imageCover} alt="image" width={400} height={400} /></CardTitle>
                  <CardDescription>{product.category.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className='line-clamp-1 font-bold'>{product.title}</p>
                </CardContent>
                <CardFooter>
                  <div className='flex justify-between w-full'>
                    <p>{product.price} EGP</p>
                    <p ><i className="fa-solid fa-star text-yellow-500 me-1"></i>{product.ratingsAverage}</p>
                  </div>
                </CardFooter>
              </Link>

              <div className='flex items-center gap-2'>

                <AddtoCardButton productid={product._id} />

                {wish?.data?.find((item :data) => item._id === product._id) ? <i className="fa-solid fa-heart text-red-700 text-2xl cursor-pointer"></i> : <WishlistButton productid={product._id} />}
              </div>
            </Card>

          </div>
        })}
      </div>}
    
     
    </>
  )
}
