
"use client"

import { CartContext } from '@/cartcontext/cartContext'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useContext } from 'react'

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    LogOutIcon,
} from "lucide-react"


export default function SmallNavBar() {

    const { cartnumber, cartid, data } = useContext(CartContext)!



    const { data: session } = useSession()
    function handleLogout() {
        signOut({
            redirect: true,
            callbackUrl: "/"
        })
    }


    return (
        <>
            <nav className='bg-gray-200 shadow-xl mb-5 lg:hidden '>
                <div className="container py-3 flex justify-between items-center  mx-auto md:w-[80%]">

                    <div>
                        <Link href={"/"}> <h2 className='text-2xl font-bold'> <i className="fa-solid fa-cart-arrow-down text-green-500"></i> FreshCart</h2> </Link>

                    </div>

                    <div>
                        <DropdownMenu >
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className='flex flex-col gap-2'>
                                {session && <h2 className='py-4  text-center bg-green-300 mb-2 rounded-2xl'> Welcome {session?.user.name}</h2>}

                                <Link href={"/"}>
                                    <DropdownMenuItem className='mt-4'>
                                        {/* <UserIcon /> */}
                                        Home
                                    </DropdownMenuItem>
                                </Link>

                                {session &&
                                    <Link href={"/cart"}>
                                        <DropdownMenuItem>
                                            {/* <CreditCardIcon /> */}
                                            Cart
                                        </DropdownMenuItem>
                                    </Link>}


                                {session &&
                                    <Link href={"/allorders"}>
                                        <DropdownMenuItem>
                                            {/* <SettingsIcon /> */}

                                            Orders
                                        </DropdownMenuItem>
                                    </Link>
                                }
                                {session &&
                                    <Link href={"/wishlist"}>
                                        <DropdownMenuItem>
                                            {/* <SettingsIcon /> */}

                                            Wishlist
                                        </DropdownMenuItem>
                                    </Link>
                                }

                                <Link href={"/products"}>
                                    <DropdownMenuItem>
                                        {/* <SettingsIcon /> */}

                                        Products
                                    </DropdownMenuItem>
                                </Link>

                                <Link href={"/categories"}>
                                    <DropdownMenuItem>
                                        {/* <SettingsIcon /> */}

                                        Categories
                                    </DropdownMenuItem>
                                </Link>

                                <Link href={"/brands"}>
                                    <DropdownMenuItem className='w-[300px]'>
                                        {/* <SettingsIcon /> */}

                                        Brands
                                    </DropdownMenuItem>
                                </Link>







                                <DropdownMenuSeparator />


                                {!session ? <>
                                    <div className='flex justify-between w-[70%] mx-auto items-center px-4 my-4'>
                                        <i className="fa-brands fa-facebook cursor-pointer"></i>
                                        <i className="fa-brands fa-instagram cursor-pointer"></i>
                                        <i className="fa-brands fa-youtube cursor-pointer"></i>
                                        <i className="fa-brands fa-tiktok cursor-pointer"></i>
                                        <i className="fa-brands fa-twitter cursor-pointer"></i>
                                        <i className="fa-brands fa-linkedin cursor-pointer"></i>
                                    </div>

                                    <Link href={"/login"}>
                                        <DropdownMenuItem className='w-[300px]'>
                                            {/* <SettingsIcon /> */}

                                            Login
                                        </DropdownMenuItem>
                                    </Link>
                                    <Link href={"/register"}>
                                        <DropdownMenuItem className='w-[300px]'>
                                            {/* <SettingsIcon /> */}

                                            Register
                                        </DropdownMenuItem>
                                    </Link>
                                </>


                                    : <span onClick={handleLogout} className='cursor-pointer'> <DropdownMenuItem variant="destructive">
                                        <LogOutIcon />
                                        log Out
                                    </DropdownMenuItem> </span>}



                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                </div>
            </nav>
        </>
    )
}
