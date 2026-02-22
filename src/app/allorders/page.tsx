import React from 'react'
import  Image  from 'next/image';
import testImg from "../../../public/images/img2.jpg"
import getUserOrders from '../apis/getUserOrders';
import { singleOrder } from '@/interfaces/ordersinterface';


export default async function Allorders() {

     const data = await getUserOrders()


    return (
        <div className=' p-7'>
            <h2 className='text-2xl font-bold'>My orders :</h2>

            {data?.map((order :singleOrder)=>
                <div key={order._id} className=' shadow-xl border-b-5 border-green-500 my-10'>
                  <div className='flex justify-between my-7 bg-white items-center p-6 rounded'>
                <div>
                    <p className='font-bold'>Order ID :</p>
                    <span>{order.id}</span>
                </div>
                <div>
                    <p className='font-bold'>Created At :</p>
                    <span>{order.createdAt.slice(0,10)}</span>
                </div>
                <div className='text-center'>
                    <p className='font-bold mb-2'>Status :</p>
                    <span className='me-5 bg-orange-200 p-1.5 rounded'>{order.isPaid?"paid" :"Unpaid"}</span>
                    <span className=' bg-blue-200 p-1.5 rounded'> {order.isDelivered ? "Done"   :"Proccessing"}</span>
                </div>
            </div>
            <h1 className='text-2xl font-bold px-7 mb-7'>Items :</h1>


                    {order.cartItems.map((item)=>
                     <div key={item._id} className='flex justify-between my-7 p-7'>
                <div className="left flex gap-5 w-[70%] flex-wrap">
                    <div className='w-1/4'>
                    <Image src={item.product.imageCover} alt="test" width={100} height={100} className='w-full' />
                    </div>
                    <div>
                        <h2>{item.product.title}</h2>
                        <p>{item.product.brand.name}</p>
                        <p>{item.product.category.name}</p>
                        <p>{item.count}</p>

                    </div>
                </div>
                <div className='w-[25%] text-end'>
                    <p>{item.price} Egp</p>
                </div>
            </div>
                    )}


           

            <div className='flex justify-between flex-wrap bg-white items-center p-6 rounded'>
                <div className='lg:w-[48%] w-full my-3'>
                    <h2 className='font-bold'>Payment Summary :</h2>
                    <p className=' my-2 flex justify-between items-center'>payment method  <span>{order.paymentMethodType}</span></p>
                    <p className=' my-2 flex justify-between items-center'>shipping price <span>{order.shippingPrice} Egp</span></p>
                    <p className=' my-2 flex justify-between items-center'>tax price <span>{order.taxPrice} Egp</span></p>
                    <p className=' my-2  font-bold flex justify-between items-center'>Total <span>{order.totalOrderPrice} Egp</span></p>
                </div>
                <div className='lg:w-[48%] w-full my-3'>
                    <h2 className='font-bold'>Shipping Adress :</h2>
                    <p className='my-3'>Name : <span>{order.user.name}</span></p>
                    <p className='my-3'>Email : <span>{order.user.email}</span></p>
                    <p className='my-3'>Phone : <span>{order.user.phone}</span></p>
                    <p className='my-3'>City : <span>cairo</span></p>
                </div>
            </div>
                
                </div>
            )}


          
        </div>
    )
}
