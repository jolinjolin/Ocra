import express from 'express'
import { addOrderItems, getOrderById, updateOrderPaymentStatus } from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, addOrderItems)//create new order
router.route('/:id').get(protect, getOrderById)//get order
router.route('/:id/pay').put(protect, updateOrderPaymentStatus)//update order payment status

export default router