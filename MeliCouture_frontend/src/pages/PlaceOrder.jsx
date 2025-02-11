import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from 'axios';
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("paypal");
  const [isLoading, setIsLoading] = useState(false);
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    postalcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Validation des champs
    const isFormValid = Object.values(formData).every((value) => value.trim() !== "");
    if (!isFormValid) {
      toast.error("Please fill all required fields");
      setIsLoading(false);
      return;
    }

    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = products.find((product) => product._id === items);
            if (itemInfo) {
              const clonedItem = structuredClone(itemInfo);
              clonedItem.size = item;
              clonedItem.quantity = cartItems[items][item];
              orderItems.push(clonedItem);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case "paypal":
          const response = await axios.post(`${backendUrl}/api/order/paypal`, orderData, { headers: { token } });
          if (response.data && response.data.success) {
            setCartItems({});
            navigate('/orders');
          } else {
            toast.error(response.data?.message || "Payment failed");
          }
          break;
        default:
          toast.error("Invalid payment method");
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="container mx-auto px-4">
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
                  required
                  onChange={onChangeHandler}
                  name="firstName"
                  value={formData.firstName}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black 
                    focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white"
                  placeholder="First name"
                  type="text"
                />
              </div>
              <div className="group">
                <input
                  required
                  onChange={onChangeHandler}
                  name="lastName"
                  value={formData.lastName}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black 
                    focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white"
                  placeholder="Last name"
                  type="text"
                />
              </div>
            </div>
            {["Email", "Street"].map((field) => (
              <input
                required
                key={field}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black 
                focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white"
                placeholder={field}
                type={field.toLowerCase() === "email" ? "email" : "text"}
                onChange={onChangeHandler} // Ajouter onChange
                name={field.toLowerCase()} // Ajouter name (en minuscules pour correspondre à formData)
                value={formData[field.toLowerCase()]} // Ajouter value
              />
            ))}

            <div className="grid grid-cols-2 gap-4">
              <input
                required
                onChange={onChangeHandler}
                name="city"
                value={formData.city}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black 
                  focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white"
                placeholder="City"
                type="text"
              />
              <input
                required
                onChange={onChangeHandler}
                name="state"
                value={formData.state}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black 
                  focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white"
                placeholder="State"
                type="text"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                required
                onChange={onChangeHandler}
                name="postalcode"
                value={formData.postalcode}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black 
                           focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white"
                placeholder="Postal Address"
                type="number"
              />
              <input
                required
                onChange={onChangeHandler}
                name="country"
                value={formData.country}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-black 
                          focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white"
                placeholder="Country"
                type="text"
              />
            </div>

            <input
              required
              onChange={onChangeHandler}
              name="phone"
              value={formData.phone}
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
                { id: "stripe", logo: assets.stripe_logo },
                { id: "paypal", logo: assets.razorpay_logo },
              ].map(({ id, logo }) => (
                <div
                  key={id}
                  onClick={() => setMethod(id)}
                  className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer 
                    hover:border-black transition-colors duration-200"
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                      ${method === id ? "border-black" : "border-gray-300"}`}
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
              type="submit"
              className="w-full bg-black text-white py-4 rounded-lg font-medium
                hover:bg-gray-900 transform hover:-translate-y-0.5 transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;