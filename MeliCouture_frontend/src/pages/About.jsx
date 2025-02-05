import React, { useContext } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  const {shopName} = useContext(ShopContext)
  return (
    <div>
      <div className='text-2xl text-center p-5 pt-7 border-y-4   '>
          <Title text1 ={'ABOUT'} text2={'US'}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px] h-3/4 ' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <h2 className='italic font-bold text-gray-800 '>Who We Are</h2>
        <p>Welcome to <span className='font-bold underline'>{shopName}</span> , your go-to online destination for stylish, affordable, and high-quality clothing.
           Our mission is to help you express your unique style with pieces that combine comfort and elegance. 
           From casual everyday looks to special occasion outfits, we’ve got you covered.</p>
          <h2 className='italic font-bold text-gray-800  '>Our Vision</h2>
          <p>
           At <span className='font-bold underline '>{shopName}</span>, we believe fashion is more than just clothing—it’s a way to show who you are. 
           We’re dedicated to offering collections that are not only trendy but also inclusive, ensuring everyone can find something they love.
           Sustainability is at the heart of what we do,
           so we’re committed to offering eco-friendly options while keeping you stylish.
           </p>
           <b className='text-gray-800'>Our Mission</b>
           <p>Our mission is to empower individuals to feel confident and authentic in their own skin through fashion. 
              We strive to offer clothing that inspires creativity, promotes self-expression, and aligns with modern values like inclusivity and sustainability.</p>
        </div>
      </div>
      <div className='text-2xl text-center p-5 pt-7 border-y-4   '>
          <Title text1 ={'WHY'} text2={'US'}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20 my-10'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>High-Quality, Affordable Fashion:</b>
            <p>We’re passionate about providing premium-quality clothing at prices that don’t break the bank.
               Every piece is carefully crafted to ensure durability, comfort, and a perfect fit.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Inclusive and Trendy Collections:</b>
            <p>Fashion is for everyone, which is why we offer a wide range of styles, sizes, and designs to suit all body types and preferences.
               No matter your style, you’ll find something you love.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Sustainable and Responsible:</b>
            <p>We’re committed to protecting the planet. Our eco-friendly materials and ethical production processes ensure you can look good
               while feeling good about your impact on the world.</p>
          </div>
      </div>
      <NewsletterBox/>
    </div>
  )
}

export default About
