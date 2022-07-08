import express from 'express'
import { getProducts, getProductById, deleteProduct } from '../controllers/productController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getProducts)//get all products
router.route('/:id').get(getProductById)//get product by id
router.route('/:id').delete(protect, admin, deleteProduct)//delete product

export default router