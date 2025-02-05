import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

const PolicyCard = ({ icon, title, description }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="flex-1 p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="bg-gray-50 w-20 h-20 mx-auto mb-6 rounded-xl flex items-center justify-center"
    >
      <img src={icon} className="w-12" alt={title} />
    </motion.div>
    <h3 className="text-lg font-semibold mb-3 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
)

const OurPolicy = () => {
  const policies = [
    {
      icon: assets.exchange_icon,
      title: "Easy Exchange Policy",
      description: "Hassle-free exchange process with no questions asked."
    },
    {
      icon: assets.quality_icon,
      title: "30 Days Return Policy",
      description: "Full refund within 30 days if you're not completely satisfied."
    },
    {
      icon: assets.support_img,
      title: "24/7 Premium Support",
      description: "Our dedicated team is here to help you anytime, anywhere."
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Us</h2>
        <div className="w-20 h-1 bg-gray-800 mx-auto"></div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {policies.map((policy, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <PolicyCard {...policy} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default OurPolicy