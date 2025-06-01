import express from 'express';
import { 
  getBrokers,
  getBrokerById,
  createBrokerProfile,
  updateBrokerProfile,
  deleteBrokerProfile,
  verifyBroker,
  addBrokerRating
} from '../controllers/brokerController.js';
import { protect, admin, broker } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getBrokers);
router.get('/:id', getBrokerById);

// Protected routes
router.post('/', protect, createBrokerProfile);
router.put('/:id', protect, updateBrokerProfile);
router.delete('/:id', protect, deleteBrokerProfile);

// Admin routes
router.put('/:id/verify', protect, admin, verifyBroker);

// User routes (add rating)
router.post('/:id/ratings', protect, addBrokerRating);

export default router;