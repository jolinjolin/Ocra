import express from 'express'
import { addOrderItems, getOrderById } from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, addOrderItems)//create new order
router.route('/:id').get(protect, getOrderById)//create new order

export default router