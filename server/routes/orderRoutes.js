import express from 'express'
import { addOrderItems, getMyOrders, getOrderById, updateOrderPaymentStatus } from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/myorders').get(protect, getMyOrders)//get user orders, this need to be above /:id
router.route('/').post(protect, addOrderItems)//create new order
router.route('/:id').get(protect, getOrderById)//get order
router.route('/:id/pay').put(protect, updateOrderPaymentStatus)//update order payment status

export default router