
"use client"

import addToWishlist from '@/app/apis/addToWishlist'
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import { toast } from 'sonner';

export default function WishlistButton({ productid }: { productid: string }) {
    const [status, setStatus] = useState(false)
    const [loading, setLoading] = useState(false)
        const { data: session } = useSession()
    

    async function handleAddToWishlist() {
        setLoading(true)

        if (session) {
             const res = await addToWishlist(productid)

        if (res.status === "success") {
            toast.success(res.message, {
                position: "top-center"
            })
            setStatus(true)
            setLoading(false)
        } else {
            setLoading(false)

        }
        }else{
            toast.error("You Must Login First",{
                position:"top-center"
            })
            setLoading(false)
        }
       

    }

    return (
        <div>
            {!status ? loading ? <span className="loader-spin me-1 border-3 w-5 h-5  border-solid border-red-500 "></span> : <i onClick={handleAddToWishlist} className="fa-regular fa-heart text-2xl cursor-pointer"></i>
                : <i className="fa-solid fa-heart text-red-700 text-2xl cursor-pointer"></i>
            }
        </div>
    )
}
