import express from 'express'
import { authUser, getUserProfile, addUser, editUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/login', authUser)//authenticate user
router.route('/profile').get(protect, getUserProfile).put(protect, editUserProfile)//get and edit user profile
router.route('/').post(addUser)//add a user

export default router