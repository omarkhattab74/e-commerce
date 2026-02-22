"use client"

import CartContextprovider from '@/cartcontext/cartContext'
import WishlistContextprovider from '@/wishlistContext/wishlistContext'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

export default function MySessionProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SessionProvider>
        <CartContextprovider>
          <WishlistContextprovider>

            {children}
          </WishlistContextprovider>

        </CartContextprovider>
      </SessionProvider>

    </>
  )
}
