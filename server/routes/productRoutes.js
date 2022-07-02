import express from 'express'
import { getProducts, getProductById } from '../controllers/productController.js'

const router = express.Router()

router.route('/').get(getProducts)//get all products
router.route('/:id').get(getProductById)//get product by id

export default router