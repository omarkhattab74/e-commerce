
"use client"

import getUserWishlist from '@/app/apis/getUserWishlist'
import { Wishlist } from '@/interfaces/wishlistInterface'
import React, { createContext, useEffect, useState } from 'react'

interface WishlistContextType {
  wish: Wishlist | null;
  setWish: (wish: Wishlist | null) => void;
}

export const wishContext = createContext<WishlistContextType | null>(null)
export default  function WishlistContextprovider({children}:{children:React.ReactNode}) {
    const [wish,setWish] = useState<Wishlist |null>(null)

   async function getWish() {
        const wishlist = await getUserWishlist()
        
        setWish(wishlist)
    }

    useEffect(()=>{
        getWish()
    },[])

    
  return (
    <wishContext.Provider value={{wish, setWish}}>
      {children}
    </wishContext.Provider>
  )
}
