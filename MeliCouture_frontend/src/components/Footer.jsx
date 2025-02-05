import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { Facebook, Twitter, Instagram } from 'lucide-react'

const Footer = () => {
  const links = {
    company: ['Home', 'About Us', 'Delivery', 'Privacy Policy'],
    contact: ['+1 123-456-7890', 'Contact@melicouture.com']
  }

  const socialIcons = [
    { Icon: Facebook, href: '#' },
    { Icon: Twitter, href: '#' },
    { Icon: Instagram, href: '#' }
  ]

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr] gap-14"
        >
          <div>
            <img src={assets.logo} className="w-36 mb-6 hover:opacity-90 transition-opacity" alt="Melly Couture" />
            <p className="text-gray-600 leading-relaxed max-w-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae quia tempore error sequi. 
              Ad quia tenetur quis, quod accusamus dolorum id ullam voluptas error quas neque numquam ipsa.
            </p>
            <div className="flex gap-4 mt-6">
              {socialIcons.map(({ Icon, href }) => (
                <a 
                  key={Icon.name} 
                  href={href} 
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <Icon size={20} className="text-gray-600" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-6 text-gray-900">Melly Couture</h3>
            <ul className="space-y-3">
              {links.company.map(link => (
                <li key={link}>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-6 text-gray-900">Keep in touch!</h3>
            <ul className="space-y-3">
              {links.contact.map(info => (
                <li key={info} className="text-gray-600 hover:text-gray-900 transition-colors">
                  {info}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <button className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                Newsletter
              </button>
            </div>
          </div>
        </motion.div>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600">
            Copyright © {new Date().getFullYear()} MeliCouture.com - All rights reserved
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer