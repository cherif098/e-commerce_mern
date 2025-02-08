import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

export const List = ({token}) => {
  const [list, setList] = useState([]);

  // affihcer toute la liste des produits
  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/listProduct`);
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // fonction pour supprimer un produit
  const removeProduct = async (id)=>{
    try {
      const response = await axios.post(`${backendUrl}/api/product/deleteProduct`,{id},{headers:{token}})
      if(response.data.success){
        toast.success(response.data.message)
        await fetchList();
      }else{
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }



  // pour lancer la fonction des le debut
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2">All Products</p>

      {/**     les titres du tableau      */}
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/** list de produits */}

        {
          list.map((item,index)=>(
            <div className="grid grid-col-[1fr_3fr_1_fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border  " key={index}>
              <img className="w-12" src={item.image[0]} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency} {item.price}</p>
              <img src={assets.bin_icon} alt="Delete" className="cursor-pointer w-6 " onClick={() => removeProduct(item._id)} />            </div>
          ))
        }
      </div>
    </>
  );
};
