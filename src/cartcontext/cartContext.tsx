"use client"

import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react"
import { getUserCart } from "@/app/apis/getUserCart"
import { Cart, Cartdata } from "@/interfaces/cartInterface"
import { CartProduct } from './../interfaces/cartInterface';

/* ================= TYPES ================= */

interface Product {
  _id: string
  name: string
  price: number
  quantity: number
  imageCover?: string
}

// interface CartData {
//   products: Product[]
// }

interface CartContextType {
  data: Cartdata | null
  cartid: string | null
  cartnumber: number
  setCartnumber: Dispatch<SetStateAction<number>>
  handleUserCart: () => Promise<void>
}

/* ================= CONTEXT ================= */

export const CartContext = createContext<CartContextType | null>(null)

/* ================= PROVIDER ================= */

export default function CartContextProvider({
  children,
}: {
  children: ReactNode
}) {
  const [cartnumber, setCartnumber] = useState<number>(0)
  const [cartid, setCartid] = useState<string | null>(null)
  const [data, setData] = useState<Cartdata | null>(null)

  async function handleUserCart(): Promise<void> {
    try {
      const cart = await getUserCart()


      setCartnumber(cart?.numOfCartItems ?? 0)
      setCartid(cart?.cartId ?? null)
      setData(cart?.data ?? { products: [] })
    } catch (error) {
      console.error("Error fetching cart:", error)
    }
  }

  useEffect(() => {
    function flag() {
      
      handleUserCart()
    }
    flag()
  }, [])

  return (
    <CartContext.Provider
      value={{
        data,
        cartid,
        cartnumber,
        setCartnumber,
        handleUserCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}