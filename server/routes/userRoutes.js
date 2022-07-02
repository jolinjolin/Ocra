import express from 'express'
import { authUser, getUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/login', authUser)//authenticate user
router.route('/profile').get(protect, getUserProfile)//get user profile

export default router