import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

//get all products, GET /api/products
const getProducts = asyncHandler(async (req, res) => {
    console.log(req.query.keyword)
    const keyword = req.query.keyword? {
        name:{
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}
    const products = await Product.find({...keyword})
    res.json(products)
})

//get a product, GET /api/products/:id
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

//delete a product, DELETE /api/products/:id, private admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        await product.remove()
        res.json({ message: "Product removed" })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

//add a product, POST /api/products, private admin
const addProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: "No name",
        price: 0,
        user: req.user._id,
        image: "/images/sample.jpg",
        brand: "No brand",
        category: "No category",
        countInStock: 0,
        numReviews: 0,
        description: "No description"
    })
    const addedProduct = await product.save()
    res.status(201).json(addedProduct)
})

//edit a product, POST /api/products, private admin
const editProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body
    const product = await Product.findById(req.params.id)
    if (product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const addedProduct = await product.save()
        res.json(addedProduct)
    } else {
        res.status(404)
        throw new Error("Product not found")
    }
})

//add review, POST /api/products/:id/reviews private
const addReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body
    const product = await Product.findById(req.params.id)
    if (product) {
        const isReviewed = product.reviews.find(el => el.user.toString() === req.user._id.toString())
        if (isReviewed) {
            res.status(400)
            throw new Error("Already reviewed")
        }
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }
        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, cur) => cur.rating+acc, 0)/product.reviews.length
        await product.save()
        res.status(201).json({message: "Review added"})
    } else {
        res.status(404)
        throw new Error("Product not found")
    }
})

export { getProducts, getProductById, deleteProduct, addProduct, editProduct, addReview }