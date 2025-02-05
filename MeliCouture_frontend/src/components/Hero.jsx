import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <div className="max-w-7xl mx-auto overflow-hidden">
      <div className="flex flex-col sm:flex-row min-h-[80vh] bg-gradient-to-br from-slate-50 to-white">
        <div className="w-full sm:w-1/2 flex items-center justify-center p-8 sm:p-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[#414141]"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[2px] bg-[#414141]" />
              <p className="font-medium tracking-wider text-sm md:text-base">
                OUR BESTSELLERS
              </p>
            </div>

            <h1 className="prata-regular text-5xl sm:text-6xl lg:text-7xl mb-8 leading-tight">
              Latest 
              <span className="block mt-2 text-slate-600">
                Arrivals
              </span>
            </h1>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-4 hover:gap-6 transition-all duration-300"
            >
              <span className="font-semibold tracking-wide">
                SHOP NOW
              </span>
              <div className="w-12 h-[1px] bg-[#414141] group-hover:w-16 transition-all" />
            </motion.button>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full sm:w-1/2 relative overflow-hidden p-6"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src={assets.hero_img} 
              alt="Latest Collection"
              className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Hero