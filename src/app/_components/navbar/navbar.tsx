
"use client"

import { CartContext } from '@/cartcontext/cartContext'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import  { useContext } from 'react'

export default function Navbar() {

  const { cartnumber , cartid, data } = useContext(CartContext)!
  
  const { data: session } = useSession()
  function handleLogout() {
    signOut({
      redirect: true,
      callbackUrl: "/"
    })
  }


  return (
    <>
      <nav className='bg-gray-200 shadow-xl mb-5 hidden lg:block'>
        <div className="container py-3 flex justify-between items-center  mx-auto md:w-[80%]">
              <h2 className='text-2xl font-bold'><Link href={"/"}><i className="fa-solid fa-cart-arrow-down text-green-500"></i> FreshCart</Link></h2>
          <div className="left">
            <ul className='flex gap-3 items-center'>
              <li><Link href={"/"}>Home</Link></li>
              {session && <li className='relative'>
                <Link href={"/cart"}>

                  {  cartnumber > 0 && <span className='w-4 h-4 flex justify-center items-center bg-green-600 rounded-full text-[10px] text-white absolute top-[-10px] right-[-10px]'>{cartnumber}</span>}



                  Cart</Link>

              </li>}
              {session && <li>
                <Link href={"/allorders"}>

                
                  Orders</Link>

              </li>}
              {session && <li>
                <Link href={"/wishlist"}>

                
                  Wishlist</Link>

              </li>}

              <li><Link href={"/products"}>Products</Link></li>
              <li><Link href={"/categories"}>Categories</Link></li>
              <li><Link href={"/brands"}>Brands</Link></li>
            </ul>
          </div>

          <div className="right">
            <ul className='flex gap-3 items-center'>
              {!session ? <><li><i className="fa-brands fa-facebook"></i></li>
                <li><i className="fa-brands fa-instagram"></i></li>
                <li><i className="fa-brands fa-youtube"></i></li>
                <li><i className="fa-brands fa-tiktok"></i></li>
                <li><i className="fa-brands fa-twitter"></i></li>
                <li><i className="fa-brands fa-linkedin"></i></li>
                <li><Link href={"/login"}>logIn</Link></li>
                <li><Link href={"/register"}>Register</Link></li>
              </> : <> <li> <span onClick={handleLogout} className='cursor-pointer bg-red-500 p-2 hover:bg-red-600 text-white rounded-xl'>logOut</span></li>

                <li className='bg-green-500 text-white p-2 rounded-xl'> {session?.user.name}</li></>}


            </ul>
          </div>

        </div>
      </nav>
    </>
  )
}
