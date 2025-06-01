import express from 'express';
import { 
  registerUser, 
  loginUser, 
  logoutUser, 
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser
} from '../controllers/authController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

// Protected routes
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// Admin routes
router.route('/')
  .get(protect, admin, getUsers);
  
router.route('/:id')
  .get(protect, admin, getUserById)
  .delete(protect, admin, deleteUser);

export default router;