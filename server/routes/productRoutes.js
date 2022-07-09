import express from 'express'
import { getProducts, getProductById, deleteProduct, addProduct, editProduct, addReview } from '../controllers/productController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getProducts)//get all products
router.route('/').post(protect, admin, addProduct)//add product
router.route('/:id').get(getProductById)//get product by id
router.route('/:id').delete(protect, admin, deleteProduct)//delete product
router.route('/:id').put(protect, admin, editProduct)//edit product
router.route('/:id/reviews').post(protect, addReview)//edit product

export default router