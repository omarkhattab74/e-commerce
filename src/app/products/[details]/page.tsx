import { getPrudectDetails } from '@/app/apis/productdetails';

import AddtoCardButton from './../../_components/addtocardbutton/addtoCardButton';

export default async function Details({ params }: {params: { details: string } }) {
  const { details } = await params

  const data = await getPrudectDetails(details)


  return (
    <>
      <div className="container  mx-auto flex flex-wrap items-center  mt-5">
        <div className='w-full md:w-1/4 p-5'>
          <img src={data.imageCover} alt="" />
        </div>
        <div className='w-full md:w-3/4 p-5'>
          <h1 className='font-bold text-2xl mb-2'>{data.title}</h1>
          <p>{data.description}</p>
          <h3>{data.category.name}</h3>
          <div className='flex justify-between w-full my-3'>
            <p>{data.price} EGP</p>
            <p ><i className="fa-solid fa-star text-yellow-500 me-1"></i>{data.ratingsAverage}</p>
          </div>
          <AddtoCardButton productid={data._id} />
        </div>
      </div>
    </>
  )
}
