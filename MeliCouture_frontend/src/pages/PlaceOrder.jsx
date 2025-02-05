import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';

const PlaceOrder = () => {
  const [method, setMethod] = useState('paypal');
  const { navigate } = useContext(ShopContext);

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-8 py-8 lg:py-16 min-h-[80vh] border-t">
        {/* Delivery Details Section */}
        <div className="flex-1 max-w-xl relative border-2 border-gray-200 rounded-xl p-8 pt-4">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white px-4">
            <Title text1="DELIVERY" text2="DETAILS" />
          </div>
          
          <div className="space-y-6 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="group">
                <input 
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black 
                    focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white" 
                  placeholder="First name" 
                  type="text" 
                />
              </div>
              <div className="group">
                <input 
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black 
                    focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white" 
                  placeholder="Last name" 
                  type="text" 
                />
              </div>
            </div>

            {['Email', 'Street'].map((placeholder) => (
              <input 
                key={placeholder}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black 
                  focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white" 
                placeholder={placeholder} 
                type={placeholder.toLowerCase() === 'email' ? 'email' : 'text'} 
              />
            ))}

            <div className="grid grid-cols-2 gap-4">
              <input 
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black 
                  focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white" 
                placeholder="City" 
                type="text" 
              />
              <input 
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black 
                  focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white" 
                placeholder="State" 
                type="text" 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input 
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black 
                  focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white" 
                placeholder="Postal Address" 
                type="number" 
              />
              <input 
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black 
                  focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white" 
                placeholder="Country" 
                type="text" 
              />
            </div>

            <input 
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black 
                focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white" 
              placeholder="Phone" 
              type="tel" 
            />
          </div>
        </div>

        {/* Payment Section */}
        <div className="lg:w-[400px] space-y-8">
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
            <CartTotal />
          </div>

          <div className="space-y-6">
            <Title text1="PAYMENT" text2="METHOD" />
            
            <div className="space-y-3">
              {[
                { id: 'stripe', logo: assets.stripe_logo },
                { id: 'paypal', logo: assets.razorpay_logo }
              ].map(({ id, logo }) => (
                <div
                  key={id}
                  onClick={() => setMethod(id)}
                  className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer 
                    hover:border-black transition-colors duration-200"
                >
                  <div 
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                      ${method === id ? 'border-black' : 'border-gray-300'}`}
                  >
                    {method === id && (
                      <div className="w-3 h-3 rounded-full bg-black" />
                    )}
                  </div>
                  <img className="h-6" src={logo} alt={`${id} logo`} />
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate('/orders')}
              className="w-full bg-black text-white py-4 rounded-lg font-medium
                hover:bg-gray-900 transform hover:-translate-y-0.5 transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;