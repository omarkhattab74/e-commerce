"use client"
import React from 'react'
import  errorimg  from "../../public/images/error.svg";
import Image from 'next/image';


export default function Error() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <Image src={errorimg} alt='error'></Image>
    </div>
  )
}
