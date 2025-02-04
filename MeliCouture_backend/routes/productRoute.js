import express from 'express';
import {addProduct,listProduct,updateProduct,deleteProduct,singleProduct}
from '../controllers/productController.js';
import userModel from '../models/userModel.js';
import upload from '../middleware/multer.js';

const productRouter = express.Router();


productRouter.post('/addProduct',upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addProduct);
productRouter.get('/listProduct',listProduct);
productRouter.post('/updateProduct',updateProduct);
productRouter.post('/deleteProduct',deleteProduct);
productRouter.post('/singleProduct',singleProduct);


export default productRouter;