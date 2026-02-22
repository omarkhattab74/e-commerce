
'use client'

import { getServerSession } from 'next-auth'
import React, { useContext, useState } from 'react'
import { authOptions } from '../../../auth'
import Image from 'next/image';
import testImg from "../../../public/images/img2.jpg"
import { Button } from '@/components/ui/button';
import { CartContext } from '@/cartcontext/cartContext';
import { product } from '@/interfaces/product.interface';
import changeProductCount from '../apis/changeProductCount';
import { toast } from 'sonner';
import removeOneProduct from '../apis/removeOneProduct';
import removeUserCart from '../apis/removeUserCart';
import Link from 'next/link';
import { CartProduct } from './../../interfaces/cartInterface';


export default function Card() {
  const [spinid, setSpinid] = useState<string | null>(null)
  const [rLoadingid, setRloadingid] = useState<string | null>(null)
  const [remove, setRemove] = useState(false)

  const { data, cartid, cartnumber, setCartnumber, handleUserCart } = useContext(CartContext)!
  

  async function handleProductCount(productid: string, count: number) {
    setSpinid(productid)
    const res = await changeProductCount(productid, count)

    if (res.status === 'success') {
      handleUserCart()
      toast.success("Successfully Changed", {
        position: "top-center"
      })
      setSpinid(null)

    } else {
      toast.error("Something Went Wrong", {
        position: "top-center"
      })
      setSpinid(null)
    }

  }

  async function handelRemoveOneProduct(productid: string) {
    setRloadingid(productid)
    const response = await removeOneProduct(productid)

    if (response.status === "success") {
      handleUserCart()
      toast.success("Successfully Removed", {
        position: "top-center"
      })
      setRloadingid(null)
    } else {
      toast.error("Something Went Wrong", {
        position: "top-center"
      })
      setRloadingid(null)
    }
  }
  async function handelRemoveUserCart() {
    setRemove(true)
    const response = await removeUserCart()

    if (response.message === 'success') {
      handleUserCart()
      toast.success("Successfully Removed", {
        position: "top-center"
      })
        setRemove(false)
    } else {
      toast.error("Something Went Wrong", {
        position: "top-center"
      })
        setRemove(false)
    }
  }


  return (

    <>

      <div className="container w-[80%] mx-auto py-7">
        <h2 className='font-bold text-2xl'>Shopping Cart</h2>

        <div className='flex flex-wrap justify-between mt-10'>
          <div className='cartdetailes mb-10 w-full lg:w-[70%]'>
            <ul>
              {data?.products?.map((product: CartProduct) =>

                <li key={product._id} className='shadow bg-white p-5 rounded-2xl mb-3'>
                  <p className='w-fit ms-auto text-green-400'>{product.price} Egp</p>
                  <div className='flex flex-wrap items-center gap-7'>
                    <div className='image md:w-[200px] w-full'>
                      <Image src={product.product.imageCover} width={300} height={300} className='w-full' alt='test' />
                    </div>
                    <div className='w-full md:flex-1 text-center'>
                      <h2 className='font-bold'>{product.product.title}</h2>
                      <p className=''>{product.product.brand.name}</p>
                      <p className=''>{product.product.category.name}</p>

                      <div className='my-5 '>
                        <button disabled={spinid != null} onClick={() => handleProductCount(product.product.id, product.count - 1)} className='bg-gray-200 px-3 py-1 rounded cursor-pointer'>
                          {spinid === product.product.id ? <span className=" border border-solid border-gray-400 loader-spin me-1 "></span> : "-"}
                        </button>
                        <span className='mx-5 font-bold'>{product.count}</span>
                        <button disabled={spinid != null} onClick={() => handleProductCount(product.product.id , product.count + 1)} className='bg-gray-200 px-3 py-1 rounded cursor-pointer'>{spinid === product.product.id ? <span className=" border border-solid border-gray-400 loader-spin me-1 "></span> : "+"}</button>
                      </div>
                    </div>
                  </div>

                  <button disabled={rLoadingid != null} onClick={() => handelRemoveOneProduct(product.product.id)} className='text-red-500 flex items-center ms-auto  py-1 rounded cursor-pointer'>{product.product.id === rLoadingid ? <span className="loader-spin me-1 border-2 border-solid border-red-500 "></span> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>}
                    Remove</button>



                </li>
              )}

            </ul>


            <div className='flex justify-between px-7'>
              <Link href={"/products"}> <button className='flex items-center gap-1 cursor-pointer text-blue-700'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
                Contenue Shopping</button></Link>

              {cartnumber > 0 ? <button onClick={handelRemoveUserCart} className='flex items-center gap-1 cursor-pointer text-red-700'>
                {remove ?<span className="loader-spin me-1 border-2 border-solid border-red-500 "></span> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>}
               
                Clear Cart</button> : ""}


            </div>
          </div>

          <div className="checkOut bg-white p-5 w-full lg:w-[25%] h-fit rounded-2xl">
            <h2>Order Summery</h2>
            <p className='flex justify-between mt-5'>Total Items <span>{cartnumber}</span></p>
            <p className='flex justify-between my-5'>Total Price <span className='text-blue-700'>{data?.totalCartPrice} Egp</span></p>


               {cartnumber >0 && <Link href={"/payment"}>
              <Button className='w-full bg-green-400 hover:bg-green-500'>
                Checkout</Button></Link> } 
            


          </div>
        </div>


      </div>
    </>
  )
}
