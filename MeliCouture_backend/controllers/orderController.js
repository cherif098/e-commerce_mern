import { response } from "express"
import orderModel from "../models/orderModel.js"

// order stripe
const stripeOrder = async ()=>{

}

// order paypal
const paypalOrder = async ()=>{

}
// orders data for the admin 

const allOrders = async ()=>{
    try {
        const orders = await orderModel.find({})
        response.json({success:true,orders})
    } catch (error) {
        console.log(error)
        response.json({success:false,message:error.message})
    }
}

// getting users data from the frontend 

const userOrders = async ()=>{
    try {
        const {userId} = requestAnimationFrame.body
        const orders = await orderModel.find({userId})
        response.json({success :true, orders})
    } catch (error) {
        console.log(error)
        response.json({success:false,message:error.message})
    }
}

// update order status by the admin
const updateStatus = async ()=>{

}

export {stripeOrder,paypalOrder,allOrders,userOrders,updateStatus}