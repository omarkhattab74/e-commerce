"use client"

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import Image from 'next/image';
import { Autoplay } from 'swiper/modules';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { category } from '@/interfaces/category.interface';

export default function Catslider({category}:{category:category[]}) {
    
    return (
        <>
            <Swiper
                spaceBetween={10}
                slidesPerView={3}
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 2000 }}
                pagination={{ clickable: true }}
                className="mySwiper"

            >

                {category?.map((cat:category)=>{
                    return <SwiperSlide key={cat._id}> <Image className='w-full object-center h-[300]' src={cat.image} width={200} height={200} alt='vgbh' /> </SwiperSlide>
                })}


            </Swiper>
        </>
    )
}
