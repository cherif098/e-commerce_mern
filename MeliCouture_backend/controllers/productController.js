import {v2 as cloudinary} from "cloudinary"
import productModel from '../models/productModel.js'

// function for adding a new product 

const addProduct = async (req, res) => {
    try {
        const {name, description, price, category, subcategory, sizes , bestseller} = req.body;

        // checkif files are uploaded
        if (!req.files) {
            return res.status(400).json({
                success: false,
                message: "Aucune image n'a été uploadée"
            });
        }

        const image1 =req.files.image1 && req.files.image1[0]
        const image2 =req.files.image2 && req.files.image2[0]
        const image3 =req.files.image3 && req.files.image3[0]
        const image4 =req.files.image4 && req.files.image4[0]

        const images = [image1,image2,image3,image4].filter((item)=>item !==undefined)

        let imagesUrl = await Promise.all(
            images.map(async(item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            category,
            price:Number(price),
            subcategory,
            bestseller:bestseller === "true" ? true : false,
            sizes:JSON.parse(sizes),
            image:imagesUrl,
            date:Date.now()
        }
        console.log(productData)
        const product = new productModel(productData)
        await product.save()
        res.json({success:true,message:"product added succesfully"})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


// function for list product

const listProduct = async (req, res) => {
    
}


// function for update product
const updateProduct = async (req, res) => {
    
}

// function to delete product
const deleteProduct = async (req, res) => {
    
}


// function for single product info
const singleProduct = async (req, res) => {
    
}


export {
    addProduct,
    listProduct,
    updateProduct,
    deleteProduct,
    singleProduct
}