import React, { useContext, useEffect, useState } from 'react'
import {ShopContext} from '../context/ShopContext.jsx'
import Title from '../components/Title'
import ProductItem from './ProductItem.jsx';

const BestSeller = () => {
    const {products}=useContext(ShopContext);
    const [bestSeller, setBestSeller]= useState([]);

    useEffect(() => {
        if (products.length > 0) 
        {
            const bestProducts = products.filter(item => item.bestseller).slice(0, 5);
            setBestSeller(bestProducts);
        }
    }, [products])

    return (
        <div className='my-10'>
            <div className='text-center text-3x1 py-8'>
                <Title text1={"BEST"} text2={"SELLERS"}/>
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero nesciunt ipsum dolore veniam. Eius, excepturi corporis, tempore soluta dolorum qui vel reprehenderit enim fuga consectetur, incidunt deserunt molestiae dolor. Enim?
                </p>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {bestSeller.map((item,index)=>(
                    <ProductItem key={index} id={item.id} name={item.name}
                                     image={item.image} price={item.price}/>
                ))}
            </div>
        </div>
    )
}

export default BestSeller