"use client"

import addToCart from '@/app/apis/addtocart'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import { useContext, useState } from 'react'
import { toast } from 'sonner'
import { CartContext } from '@/cartcontext/cartContext';

export default function AddtoCardButton({ productid }: { productid: string }) {
  const [loading, setLoading] = useState(false)
  const { handleUserCart } = useContext(CartContext)!
  const { data: session } = useSession()


  async function handleAddToCart() {
    setLoading(true)

    if (session) {
      const data = await addToCart(productid)
      if (data.status == "success") {
        toast.success(data.message, {
          position: "top-center"
        })
        console.log(data.message);
        setLoading(false)
        handleUserCart()
      } else {
        toast.error("Something went wrong", {
          position: "top-center"
        })
        console.log("error");
        
        
      }
      setLoading(false)
    } else {
      toast.error("You Must Login First", {
        position: "top-center"
      })

      setLoading(false)


    }







  }

  return (
    <>
      {loading ? <button id="loadingBtn" className="loading-btn flex justify-center bg-green-400 w-full flex-1" disabled>
        <span className="spinner"></span>
        loading
      </button> : <Button className='bg-green-400 w-full hover:bg-green-500 flex-1' onClick={handleAddToCart} > <i className="fa-solid fa-plus"></i> Add To Cart</Button>
      }
    </>
  )
}
