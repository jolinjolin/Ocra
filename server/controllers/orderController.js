import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler'

//create new order, POST /api/orders, private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body
    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error("No order items")
        return
    } else {
        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})

//get order by id, GET /api/orders/:id, private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error("Order not found")
    }
})

//update order payment status, GET /api/orders/:id/pay, private
const updateOrderPaymentStatus = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error("Order not found")
    }
})

//update order delivery status, GET /api/orders/:id/delivered, private
const updateOrderDeliverStatus = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error("Order not found")
    }
})

//get user orders , GET /api/orders/myorders, private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    res.json(orders)
})

//get all orders , GET /api/orders/myorders, private admin
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name')
    res.json(orders)
})

export { addOrderItems, getOrderById, updateOrderPaymentStatus, updateOrderDeliverStatus, getMyOrders, getOrders }