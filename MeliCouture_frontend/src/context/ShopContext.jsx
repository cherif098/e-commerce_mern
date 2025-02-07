import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  console.log("Backend URL from env:", import.meta.env.VITE_BACKEND_URL);
  const currency = "$";
  const shopName= "Melli Couture";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products,setProducts] = useState([])
  const navigate = useNavigate();


  const addToCart = (itemId, size) => {
    // Add item to cart when we select any prodcut

    if (!size) {
      toast.error("Select Prouct size");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
  };

  const getCartCount = () => {
    // Get the  number of items in the cart

    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          error;
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;
    setCartItems(cartData);
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {
          error;
        }
      }
    }
    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/listProduct`);
      console.log("API response:", response);
  
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        console.log("Full API response on failure:", response);
        toast.error("Failed to fetch products: " + (response.data.message || "No error message provided"));
      }
    } catch (error) {
      if (error.response) {
        toast.error("API error: " + (error.response.data.message || error.response.statusText));
      } else if (error.request) {
        toast.error("No response received from the server.");
      } else {
        toast.error("Request setup error: " + error.message);
      }
    }
  };

  useEffect(()=>{
    getProductsData()
  },[])



  const value = {
    products,
    currency,
    shopName,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
