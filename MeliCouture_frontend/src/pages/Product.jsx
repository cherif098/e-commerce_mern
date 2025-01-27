import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets, products } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const {productId} = useParams();
  const {products,currency,addToCart} = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size,setSize] = useState("");

  const fetchProductData = async () => {
    products.map((item)=>{
      if(item._id === productId){
        setProductData(item);
        setImage(item.image[0])
        return null;
      }
    })
  }

  useEffect(()=>{
    fetchProductData();
  },[productId,products])
  
  return productData ? (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-all duration-500 ease-in-out'>
      <div className='flex flex-col sm:flex-row gap-12 mb-16'>
        {/* Image Section */}
        <div className='flex-1 flex flex-col-reverse sm:flex-row gap-4'>
          {/* Thumbnails */}
          <div className='flex sm:flex-col overflow-x-auto scrollbar-hide sm:w-24 gap-3'>
            {productData.image.map((item,index) => (
              <div
                key={index}
                onClick={() => setImage(item)}
                className={`flex-shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 
                  ${image === item ? 'border-black' : 'border-transparent'} 
                  transition-all duration-200 hover:border-gray-400`}
              >
                <img src={item} className='w-20 h-20 object-cover' alt="" />
              </div>
            ))}
          </div>
          {/* Main Image */}
          <div className='flex-1 rounded-2xl overflow-hidden bg-gray-50'>
            <img src={image} className='w-full h-[500px] object-cover object-center' alt="" />
          </div>
        </div>

        {/* Product Info */}
        <div className='flex-1 flex flex-col'>
          {/* Product Header */}
          <div className='mb-8'>
            <h1 className='text-3xl font-semibold mb-4'>{productData.name}</h1>
            <div className='flex items-center gap-1 mb-4'>
              {[...Array(4)].map((_, i) => (
                <img key={i} src={assets.star_icon} alt="" className="w-5 h-5" />
              ))}
              <img src={assets.star_dull_icon} alt="" className="w-5 h-5" />
              <span className='ml-2 text-gray-600'>(300 reviews)</span>
            </div>
            <p className='text-4xl font-bold'>{currency}{productData.price}</p>
          </div>

          {/* Description */}
          <p className='text-gray-600 leading-relaxed mb-8'>{productData.description}</p>

          {/* Size Selector */}
          <div className='mb-8'>
            <h3 className='text-lg font-medium mb-4'>Select Size</h3>
            <div className='flex flex-wrap gap-3'>
              {productData.sizes.map((item,index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`px-6 py-3 rounded-lg transition-all duration-200
                    ${item === size 
                      ? 'bg-black text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button onClick={()=>addToCart(productData._id,size)} className='w-full sm:w-auto px-8 py-4 bg-black text-white rounded-lg
            hover:bg-gray-900 transition-colors duration-200 font-medium text-lg mb-8'>
            Add to Cart
          </button>

          {/* Features */}
          <div className='grid grid-cols-3 gap-4 p-6 bg-gray-50 rounded-lg'>
            <div className='text-center'>
              <p className='font-medium'>Original</p>
              <p className='text-sm text-gray-600'>100% Authentic</p>
            </div>
            <div className='text-center border-x border-gray-200'>
              <p className='font-medium'>Guarantee</p>
              <p className='text-sm text-gray-600'>100% Warranty</p>
            </div>
            <div className='text-center'>
              <p className='font-medium'>Shipping</p>
              <p className='text-sm text-gray-600'>Free Delivery</p>
            </div>
          </div>
        </div>
      </div>

      {/* Description & Reviews */}
      <div className='mb-16'>
        <div className='flex border-b'>
          <button className='px-8 py-4 font-medium border-b-2 border-black'>Description</button>
          <button className='px-8 py-4 text-gray-500 hover:text-gray-700'>Reviews (300)</button>
        </div>
        <div className='py-8 text-gray-600 leading-relaxed'>
          <p className='mb-4'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit laboriosam reprehenderit tenetur porro, 
            quas voluptatum voluptatibus. Ducimus non provident dolorum voluptas, optio cumque cum, 
            corrupti accusamus amet quod at temporibus!
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit laboriosam reprehenderit tenetur
          </p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product