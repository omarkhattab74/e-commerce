"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import img1 from "../../../../public/images/slider-image-1.jpeg"
import img2 from "../../../../public/images/slider-image-2.jpeg"
import img3 from "../../../../public/images/slider-image-3.jpeg"
import Image from 'next/image';
import { Autoplay } from 'swiper/modules';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';


export default function Slider() {
    return (
        <>
            <div className='container mx-auto w-full flex flex-wrap  md:w-[80%]'>
                <div className=' w-full mb-3 md:w-3/4'>
                    <Swiper
                        spaceBetween={0}
                        slidesPerView={1}
                       modules={[Autoplay , Pagination ]}
                       autoplay={{delay:2000}}
                       pagination={{clickable:true}}
                         className="mySwiper"
                         
                    >
                        <SwiperSlide> <Image className='w-full object-center h-[300]' src={img1} alt='img1' /> </SwiperSlide>
                        <SwiperSlide> <Image className='w-full object-center h-[300]' src={img2} alt='img2' /> </SwiperSlide>
                        <SwiperSlide> <Image className='w-full object-center h-[300]' src={img3} alt='img3' /> </SwiperSlide>

                    </Swiper>
                </div>
                <div className='w-full flex justify-center md:block md:w-1/4'>
                <Image className='h-[150] md:w-full w-[45%] p-0 ' src={img2} alt='img2'/>
                <Image className='h-[150] md:w-full w-[45%] p-0 ' src={img3} alt='img3'/>
                </div>
            </div>
        </>
    )
}
