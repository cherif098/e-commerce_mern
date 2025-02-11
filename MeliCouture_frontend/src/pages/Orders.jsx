import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from 'axios';
import { toast } from "react-toastify";

const Orders = () => {
  const { backendUrl, token, currency, navigate } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadOrderData = async () => {
    setIsLoading(true);
    try {
      if (!token) {
        navigate('/login');
        return;
      }
      const response = await axios.post(`${backendUrl}/api/order/userorders`, {}, { headers: { token } });
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  if (isLoading) {
    return <div className="text-center py-8">Loading orders...</div>;
  }

  if (orderData.length === 0) {
    return <div className="text-center py-8">No orders found.</div>;
  }

  return (
    <div className="border-t pt-16">
      <div className="text-xl">
        <Title text1={"MY "} text2={"ORDERS"} />
      </div>

      <div>
        {orderData.map((item, index) => (
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
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                  <p>
                    Date: <span className="text-gray-400">{new Date(item.date).toLocaleDateString()}</span>
                  </p>
                  <p>
                    Payment <span className="text-gray-400">{item.paymentMethod}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>
              <button onClick={loadOrderData} className="border px-4 py-2 text-sm font-medium rounded-sm">Track Your Order</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;