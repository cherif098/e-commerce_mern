import express from 'express'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'
import { stripeOrder,paypalOrder,allOrders,userOrders,updateStatus } from '../controllers/orderController.js'

const orderRouter = express.Router()

// admin features
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

// payment features :
orderRouter.post('/stripe',authUser,stripeOrder)
orderRouter.post('/paypal',authUser,paypalOrder)

// userFeatures
orderRouter.post('/userorders',authUser,userOrders)


export default orderRouter