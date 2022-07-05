import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'

//authenticate user and get tokern, POST /api/users/login
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error("Invalid email or password")
    }
})

//display user profile, GET /api/users/profile, private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})

//edit user profile, GET /api/users/profile, private
const editUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
        }
        const saveUser = await user.save()
        res.json({
            _id: saveUser._id,
            name: saveUser.name,
            email: saveUser.email,
            isAdmin: saveUser.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})

//add a user, POST /api/users
const addUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const userExist = await User.findOne({ email: email })
    if (userExist) {
        res.status(400)
        throw new Error("User already exist")
    } else {
        const user = await User.create({
            name,
            email,
            password
        })
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            })
        } else {
            res.status(400)
            throw new Error("Invalid user data")
        }
    }
})
export { authUser, getUserProfile, editUserProfile, addUser }