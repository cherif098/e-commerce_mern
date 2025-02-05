import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products,search ,showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category , setCategory] = useState([]);
  const [subCategory,setSubCategory] = useState([]);
  const [sortType,setSortType] = useState('relevant');

  // afficher les produits par catégorie
  const toggleCategory = (e) =>{
    if (category.includes(e.target.value)) {
      setCategory(prev=> prev.filter(item=> item!== e.target.value))
    }else{
      setCategory(prev=>[...prev,e.target.value])
    }
  }

  // afficher les produits par sous-categorie
  const toggleSubCategory = (e) =>{ 
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev=> prev.filter(item=> item!== e.target.value))
    }else{
      setSubCategory(prev=>[...prev,e.target.value])
    }
  }

  // fonction pour filtrer les produits
  const applyFilter = () => {

    // creer une copie de products
    let productsCopy = products.slice();

    if (showSearch && search){
      productsCopy = productsCopy.filter(item=> item.name.toLowerCase().includes(search.toLowerCase()))
    }

    // applique le filtre
    if (category.length > 0 ) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0 ) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy)
  }


  // fonction pour trier les produits par prix
  const sortProduct = () => {
    // Créer une nouvelle copie profonde des produits filtrés
    let filteredProductsCopy = [...filterProducts];
  
    switch (sortType) {
      case 'low-high': 
        setFilterProducts([...filteredProductsCopy].sort((a,b) => a.price - b.price));
        break;
      case 'high-low':
        setFilterProducts([...filteredProductsCopy].sort((a,b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  }

  // fonction pour afficher les produits
  useEffect(()=>{
    applyFilter();
  },[category,subCategory,search,showSearch])

  // fonction pour appler la fonction de tri par prix
  useEffect(()=>{
    sortProduct();
  },[sortType])

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* filter options*/}
      <div className="min-w-60">
        <p onClick={()=>setShowFilter(!showFilter)} className="my-2 text-x1 flex items-center cursor-pointer gap-2">
          Filters
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90':'' }`} src={assets.dropdown_icon} alt="" />
        </p>
        {/* Category filter */}

        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block `}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700 ">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Men"} onChange={toggleCategory} />
              Men
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Women"} onChange={toggleCategory} />
              Women
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Kids"} onChange={toggleCategory} />
              Kids
            </p>
          </div>
        </div>
        {/* SubCategory filter */}
        <div
          className={`border border-gray-300 pl-5 py-3  ${
            showFilter ? "" : "hidden"
          } sm:block `}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700 ">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Topwear"} onChange={toggleSubCategory} />
              Top Wear
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Bottomwear"} onChange={toggleSubCategory} />
              Bottom Wear
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={"Winterwear"} onChange={toggleSubCategory} />
              Winter Wear
            </p>
          </div>
        </div>
      </div>

      {/*----------------Right Side -------------------------*/ }

      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2x1 mb-4">
          <Title text1={'ALL'} text2={'COLLECTIONS'} />

          {/* Product Sort */}

          <select onChange={(e)=> setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
            <option value="relavent"> Sort by : Relevant</option>
            <option value="low-high">Sort by : Low to high</option>
            <option value="high-low"> Sort by : High to low</option>
          </select>
        </div>

        {/*---------------------------- Map Products------------------*/ }

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {
              filterProducts.map((item,index)=>(
                <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
              ))
            }
          </div>
      </div>
    </div>
  );
};

export default Collection;
