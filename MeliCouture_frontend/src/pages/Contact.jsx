import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
          <img  className='w-full md:max-w-[450px]' src={assets.contact_img} alt="" />
          <div className='flex flex-col justify-center items-start gap-6'>
            <p className='font-semibold text-xl text-gray-700'> Our store </p>
            <p className='text-gray-500'>12345 peace-street, Montreal, Canada </p>
            <p className='text-gray-500'>Tel : (438) 654-0000 <br /> Email: admin@MelliCouture.com </p>
            <p className=' italic font-semibold text-gray-600 '>Careers at MeliCouture</p>
            <button className="bg-black hover:bg-black-700 text-white font-bold py-2 px-4 rounded-full">
              Explore Jobs
            </button>          
          </div>
      </div>
      <NewsletterBox/>
    </div>
  )
}

export default Contact
