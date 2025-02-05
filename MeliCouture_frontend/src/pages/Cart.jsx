import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import CartTotal from "../components/CartTotal";

const Card = () => {
  const { currency, products, cartItems, updateQuantity,navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="pt-14">
        <div className="text-3xl font-bold mb-8 text-center">
          <Title text1={"CART"} />
        </div>

        <div className="bg-white rounded-lg shadow-lg">
          {cartData.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Your cart is empty
            </div>
          ) : (
            cartData.map((item, index) => {
              const productData = products.find(
                (product) => product._id === item._id
              );

              return (
                <div
                  key={index}
                  className="p-6 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex-shrink-0">
                      <img
                        className="w-24 h-24 object-cover rounded-md"
                        src={productData.image[0]}
                        alt={productData.name}
                      />
                    </div>

                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {productData.name}
                      </h3>
                      <div className="mt-2 flex items-center gap-4">
                        <span className="text-lg font-medium text-gray-900">
                          {currency} {productData.price}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium">
                          Size: {item.size}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <input
                        onChange={(e) =>
                          e.target.value === "" || e.target.value === "0"
                            ? null
                            : updateQuantity(
                                item._id,
                                item.size,
                                Number(e.target.value)
                              )
                        }
                        type="number"
                        min={1}
                        defaultValue={item.quantity}
                        className="w-16 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      <button
                        onClick={() => updateQuantity(item._id, item.size, 0)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <section className="relative py-20">
        <div className="max-w-[450px] w-full ml-auto bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="absolute -left-3 top-1/2 w-6 h-12 bg-gray-100 rounded-l-full" />
          <div className="absolute -right-3 top-1/2 w-6 h-12 bg-gray-100 rounded-r-full" />
          <div className="relative">
            <div className="absolute -top-14 right-0 text-4xl text-gray-100"></div>
            <CartTotal />

            <div className="w-full text-end">
              <button onClick={()=>navigate('/place-order')}
                className="group relative bg-black hover:bg-gray-900 text-white text-sm font-medium px-8 py-4 rounded-md 
    shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  PROCEED TO PAYMENT
                  <svg
                    className="w-4 h-4 transform transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 w-3 bg-white/10 skew-x-12 -translate-x-10 group-hover:translate-x-[32rem] transition-transform duration-700 ease-out" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Card;
