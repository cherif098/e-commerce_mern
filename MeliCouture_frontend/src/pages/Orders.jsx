import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
const Orders = () => {
  const { products, currency } = useContext(ShopContext);

  return (
    <div className="border-t pt-16">
      <div className="text-xl">
        <Title text1={"MY "} text2={"ORDERS"} />
      </div>

      <div>
        {products.slice(1, 4).map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            {/* Conteneur global */}
            <div className="flex items-start gap-4 text-sm">
              {/* Image */}
              <img className="w-16 sm:w-20" src={item.image[0]} alt="" />

              {/* Conteneur pour les informations */}
              <div className="flex flex-col">
                {/* Nom */}
                <p className="sm:text-base font-medium">{item.name}</p>

                {/* Informations complémentaires */}
                <div className="flex flex-col gap-1 mt-2 text-base text-gray-700">
                  <p className="text-lg">
                    {currency} {item.price}
                  </p>
                  <p>Quantity: 1</p>
                  <p>Size: M</p>
                  <p>
                    Date: <span className="text-gray-400">6/12/2024</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
            <div className="flex items-center gap-2">
              <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
              <p className="text-sm md:text-base">Ready to be Delivery </p>
            </div>
            <button className="border px-4 py-2 text-sm font-medium rounded-sm">Track Your Order</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
