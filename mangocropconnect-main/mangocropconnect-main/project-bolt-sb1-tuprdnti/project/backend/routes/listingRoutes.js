import express from 'express';
import { 
  getListings, 
  getListingById, 
  createListing, 
  updateListing, 
  deleteListing,
  approveListing,
  rejectListing,
  toggleFeatured
} from '../controllers/listingController.js';
import { protect, admin, seller } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getListings);
router.get('/:id', getListingById);

// Seller routes
router.post('/', protect, upload.array('images', 5), createListing);
router.put('/:id', protect, upload.array('images', 5), updateListing);
router.delete('/:id', protect, deleteListing);

// Admin routes
router.put('/:id/approve', protect, admin, approveListing);
router.put('/:id/reject', protect, admin, rejectListing);
router.put('/:id/feature', protect, admin, toggleFeatured);

export default router;