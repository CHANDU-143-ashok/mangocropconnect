import Listing from '../models/Listing.js';

// Get all listings (with filters)
export const getListings = async (req, res) => {
  try {
    const { 
      variety, location, minQuantity, maxQuantity, 
      harvestDateFrom, harvestDateTo, status, featured 
    } = req.query;
    
    const filter = {};
    
    // Apply filters if provided
    if (variety) filter.variety = variety;
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (minQuantity) filter.quantity = { $gte: parseInt(minQuantity) };
    if (maxQuantity) filter.quantity = { ...filter.quantity, $lte: parseInt(maxQuantity) };
    
    if (harvestDateFrom || harvestDateTo) {
      filter.harvestDate = {};
      if (harvestDateFrom) filter.harvestDate.$gte = new Date(harvestDateFrom);
      if (harvestDateTo) filter.harvestDate.$lte = new Date(harvestDateTo);
    }
    
    // Only admins can see all statuses
    if (req.user && req.user.role === 'admin') {
      if (status) filter.status = status;
    } else {
      // Regular users can only see approved listings
      filter.status = 'approved';
    }
    
    if (featured === 'true') filter.featured = true;

    const listings = await Listing.find(filter)
      .sort({ featured: -1, createdAt: -1 })
      .limit(100);
    
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single listing by ID
export const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    
    // Only admins can see non-approved listings
    if (listing.status !== 'approved' && (!req.user || req.user.role !== 'admin')) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    
    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new listing
export const createListing = async (req, res) => {
  try {
    const {
      variety, quantity, location, harvestDate, 
      sellerName, sellerPhone, description, 
      farmingMethod, qualityGrade, priceRange
    } = req.body;
    
    // Create listing
    const listing = new Listing({
      variety,
      quantity,
      location,
      harvestDate,
      sellerName,
      sellerPhone,
      description,
      farmingMethod,
      qualityGrade,
      priceRange,
      status: 'pending', // All new listings start as pending
      featured: false,
    });
    
    // If authenticated seller, link to user
    if (req.user && req.user.role === 'seller') {
      listing.seller = req.user._id;
    }
    
    // Handle image uploads if any
    if (req.files && req.files.length > 0) {
      listing.images = req.files.map(file => `/uploads/${file.filename}`);
    }
    
    await listing.save();
    res.status(201).json(listing);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update listing (admin or owner only)
export const updateListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    
    // Check if user has permission to update
    if (
      !req.user ||
      (req.user.role !== 'admin' && 
       (!listing.seller || listing.seller.toString() !== req.user._id.toString()))
    ) {
      return res.status(403).json({ message: 'Not authorized to update this listing' });
    }
    
    // Update fields
    const {
      variety, quantity, location, harvestDate, 
      sellerName, sellerPhone, description,
      farmingMethod, qualityGrade, priceRange, featured
    } = req.body;
    
    if (variety) listing.variety = variety;
    if (quantity) listing.quantity = quantity;
    if (location) listing.location = location;
    if (harvestDate) listing.harvestDate = harvestDate;
    if (sellerName) listing.sellerName = sellerName;
    if (sellerPhone) listing.sellerPhone = sellerPhone;
    if (description) listing.description = description;
    if (farmingMethod) listing.farmingMethod = farmingMethod;
    if (qualityGrade) listing.qualityGrade = qualityGrade;
    if (priceRange) listing.priceRange = priceRange;
    
    // Only admin can change featured status
    if (featured !== undefined && req.user.role === 'admin') {
      listing.featured = featured;
    }
    
    // Handle image uploads if any
    if (req.files && req.files.length > 0) {
      listing.images = req.files.map(file => `/uploads/${file.filename}`);
    }
    
    await listing.save();
    res.status(200).json(listing);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete listing (admin or owner only)
export const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    
    // Check if user has permission to delete
    if (
      !req.user ||
      (req.user.role !== 'admin' && 
       (!listing.seller || listing.seller.toString() !== req.user._id.toString()))
    ) {
      return res.status(403).json({ message: 'Not authorized to delete this listing' });
    }
    
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Listing successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Approve a listing
export const approveListing = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can approve listings' });
    }
    
    const listing = await Listing.findById(req.params.id);
    
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    
    listing.status = 'approved';
    await listing.save();
    
    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Reject a listing
export const rejectListing = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can reject listings' });
    }
    
    const listing = await Listing.findById(req.params.id);
    
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    
    listing.status = 'rejected';
    await listing.save();
    
    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Toggle featured status
export const toggleFeatured = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can change featured status' });
    }
    
    const listing = await Listing.findById(req.params.id);
    
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    
    listing.featured = !listing.featured;
    await listing.save();
    
    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};