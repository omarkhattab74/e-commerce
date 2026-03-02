"use client"
import AddtoCardButton from "@/app/_components/addtocardbutton/addtoCardButton";
import WishlistButton from "@/app/_components/addToWishList/wishlistButton";
import CustomLoading from "@/app/_components/customLoading/customLoading";
import getCategoryProducts from "@/app/apis/getCategoryProducts";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { product } from "@/interfaces/product.interface";
import { data } from "@/interfaces/wishlistInterface";
import { wishContext } from "@/wishlistContext/wishlistContext";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function Categoryproducts({ params } :{params :{categoryProducts : string}}) {
    const [catProducts, setCatProducts] = useState<product [] | null>(null)
    const [prodNumber, setProdNumber] = useState(null)
    const { wish } = useContext(wishContext)!



    async function getCategoryProductss() {
        const { categoryProducts } = await params
        console.log(categoryProducts);

        const data = await getCategoryProducts(categoryProducts)
        setProdNumber(data?.results)
        setCatProducts(data?.data)
        console.log("from aaaaaa", data);
    }

    useEffect(() => {
        function flag() {
            
            getCategoryProductss()
        }
        flag()
    }, [])








    return (
        <>
            {!catProducts ? <CustomLoading/> :  <div className="container w-[80%] mx-auto">
                <h2 className="font-bold text-2xl mb-3">{catProducts[0]?.category.name}</h2>
                {prodNumber === 0 ? <div className='h-[calc(100vh-110px)] flex justify-center items-center'>
                    <p className="text-center">No Items Found Here. browse other categories to discover more products</p>
                </div> : <div className="flex flex-wrap">
                    {catProducts?.map((product :product) =>
                        <div key={product.id} className='w-full p-2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5'>
                            <Card className='px-3'>
                                <Link href={`/products/${product.id}`}>
                                    <CardHeader>
                                        <CardTitle><Image className="" src={product.imageCover} alt="image" width={400} height={400} /></CardTitle>
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

                                    {wish?.data?.find((item: data) => item._id === product._id) ? <i className="fa-solid fa-heart text-red-700 text-2xl cursor-pointer"></i> : <WishlistButton productid={product._id} />}
                                </div>
                            </Card>

                        </div>
                    )}

                </div>}

            </div>}

           

        </>
    )
}
