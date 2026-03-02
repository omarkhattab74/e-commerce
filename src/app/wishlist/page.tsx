"use client"

import React, { useContext, useEffect, useState } from 'react'
import { getMyToken } from '../serveces/token'
import axios from 'axios'
import getUserWishlist from '../apis/getUserWishlist'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'
import AddtoCardButton from '../_components/addtocardbutton/addtoCardButton'
import Image from 'next/image'
import { Button } from '@/components/ui/button';
import removeFromWishlist from './removeFromWishlist'
import { toast } from 'sonner'
import { wishContext } from '@/wishlistContext/wishlistContext'
import { string } from 'zod'
import { Wishlist } from '@/interfaces/wishlistInterface'
import CustomLoading from '../_components/customLoading/customLoading'

export default function Washlist() {
  const [data, setData] = useState<Wishlist | null>(null)
  const [removeLoadingId, setremoveLoadingId] = useState<string | null>(null)

  async function handlegetUserWashlist() {
    const res = await getUserWishlist()
    setData(res)

  }

  async function handleremoveFromWishlist(productid: string) {
    setremoveLoadingId(productid)
    const res = await removeFromWishlist(productid)
    if (res.status === "success") {
      toast.success(res.message, {
        position: "top-center"
      })
      setremoveLoadingId(null)
      handlegetUserWashlist()
    } else {
      toast.error("Something went wrong", {
        position: "top-center"
      })
      setremoveLoadingId(null)
    }

  }

  useEffect(() => {
    function flag() {
      
      handlegetUserWashlist()
    }

    flag()
  }, [])

  return (

    <>
    {!data ? <CustomLoading/> : <div className='container w-[80%] mx-auto my-10'>

        <h1 className='text-2xl font-bold mb-7'>Wishlist :</h1>

        <div className='flex flex-wrap'>

          {data?.data?.map((product) =>
            <div key={product.id} className='w-full  p-2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5'>
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


                <AddtoCardButton productid={product._id} />
                {removeLoadingId === product._id ? <button id="loadingBtn" className="loading-btn flex justify-center bg-red-600 w-full flex-1" disabled>
                  <span className="spinner"></span>
                  loading
                </button> : <Button onClick={() => handleremoveFromWishlist(product._id)} className='bg-red-500 hover:bg-red-600 delay-100'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg> Remove</Button>}

              </Card>

            </div>

          )}
        </div>

      </div>}

     

    </>

  )
}
