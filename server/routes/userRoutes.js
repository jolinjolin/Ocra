import express from 'express'
import { authUser, getUserProfile, addUser, editUserProfile, getUsers, deleteUser, getUserById, editUser } from '../controllers/userController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/login', authUser)//authenticate user
router.route('/profile').get(protect, getUserProfile).put(protect, editUserProfile)//get and edit user profile
router.route('/').post(addUser)//add a user
router.route('/').get(protect, admin, getUsers)//get all users
router.route('/:id').delete(protect, admin, deleteUser)//delete user
router.route('/:id').get(protect, admin, getUserById)//get user by id
router.route('/:id').put(protect, admin, editUser)//edit user

export default router