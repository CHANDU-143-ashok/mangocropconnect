import Broker from '../models/Broker.js';
import User from '../models/User.js';

// @desc    Get all brokers
// @route   GET /api/brokers
// @access  Public
export const getBrokers = async (req, res) => {
  try {
    const { region, specialty, verified, premium } = req.query;
    
    const filter = {};
    
    // Apply filters if provided
    if (region) filter.regions = { $regex: region, $options: 'i' };
    if (specialty) filter.specialties = { $regex: specialty, $options: 'i' };
    if (verified === 'true') filter.isVerified = true;
    if (premium === 'true') filter.isPremium = true;
    
    const brokers = await Broker.find(filter)
      .populate('user', 'name email phone')
      .sort({ isPremium: -1, isVerified: -1, createdAt: -1 });
    
    res.status(200).json(brokers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get broker by ID
// @route   GET /api/brokers/:id
// @access  Public
export const getBrokerById = async (req, res) => {
  try {
    const broker = await Broker.findById(req.params.id)
      .populate('user', 'name email phone');
    
    if (!broker) {
      return res.status(404).json({ message: 'Broker not found' });
    }
    
    res.status(200).json(broker);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create broker profile
// @route   POST /api/brokers
// @access  Private
export const createBrokerProfile = async (req, res) => {
  try {
    const {
      description, regions, specialties, experienceYears
    } = req.body;
    
    // Check if broker profile already exists
    const existingBroker = await Broker.findOne({ user: req.user._id });
    
    if (existingBroker) {
      return res.status(400).json({ message: 'Broker profile already exists' });
    }
    
    // Update user role to broker
    await User.findByIdAndUpdate(req.user._id, { role: 'broker' });
    
    // Create broker profile
    const broker = new Broker({
      user: req.user._id,
      description,
      regions,
      specialties,
      experienceYears,
      isVerified: false,
      isPremium: false
    });
    
    await broker.save();
    res.status(201).json(broker);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update broker profile
// @route   PUT /api/brokers/:id
// @access  Private (Own profile or Admin)
export const updateBrokerProfile = async (req, res) => {
  try {
    const broker = await Broker.findById(req.params.id);
    
    if (!broker) {
      return res.status(404).json({ message: 'Broker not found' });
    }
    
    // Check if user has permission to update
    if (
      req.user.role !== 'admin' && 
      broker.user.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: 'Not authorized to update this profile' });
    }
    
    const {
      description, regions, specialties, experienceYears
    } = req.body;
    
    if (description) broker.description = description;
    if (regions) broker.regions = regions;
    if (specialties) broker.specialties = specialties;
    if (experienceYears) broker.experienceYears = experienceYears;
    
    // Only admin can update verification and premium status
    if (req.user.role === 'admin') {
      if (req.body.isVerified !== undefined) broker.isVerified = req.body.isVerified;
      if (req.body.isPremium !== undefined) broker.isPremium = req.body.isPremium;
      if (req.body.subscriptionStart) broker.subscriptionStart = req.body.subscriptionStart;
      if (req.body.subscriptionEnd) broker.subscriptionEnd = req.body.subscriptionEnd;
    }
    
    await broker.save();
    res.status(200).json(broker);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete broker profile
// @route   DELETE /api/brokers/:id
// @access  Private (Own profile or Admin)
export const deleteBrokerProfile = async (req, res) => {
  try {
    const broker = await Broker.findById(req.params.id);
    
    if (!broker) {
      return res.status(404).json({ message: 'Broker not found' });
    }
    
    // Check if user has permission to delete
    if (
      req.user.role !== 'admin' && 
      broker.user.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: 'Not authorized to delete this profile' });
    }
    
    await Broker.findByIdAndDelete(req.params.id);
    
    // Update user role back to buyer if it's not an admin deleting
    if (req.user.role !== 'admin') {
      await User.findByIdAndUpdate(req.user._id, { role: 'buyer' });
    }
    
    res.status(200).json({ message: 'Broker profile successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify broker (admin only)
// @route   PUT /api/brokers/:id/verify
// @access  Private/Admin
export const verifyBroker = async (req, res) => {
  try {
    const broker = await Broker.findById(req.params.id);
    
    if (!broker) {
      return res.status(404).json({ message: 'Broker not found' });
    }
    
    broker.isVerified = !broker.isVerified;
    await broker.save();
    
    res.status(200).json({ message: `Broker ${broker.isVerified ? 'verified' : 'unverified'} successfully`, broker });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add broker rating
// @route   POST /api/brokers/:id/ratings
// @access  Private
export const addBrokerRating = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    const broker = await Broker.findById(req.params.id);
    
    if (!broker) {
      return res.status(404).json({ message: 'Broker not found' });
    }
    
    // Check if user already rated this broker
    const alreadyRated = broker.ratings.find(
      r => r.user.toString() === req.user._id.toString()
    );
    
    if (alreadyRated) {
      // Update existing rating
      broker.ratings = broker.ratings.map(r => 
        r.user.toString() === req.user._id.toString()
          ? { user: req.user._id, rating, comment, createdAt: Date.now() }
          : r
      );
    } else {
      // Add new rating
      broker.ratings.push({
        user: req.user._id,
        rating,
        comment,
        createdAt: Date.now()
      });
    }
    
    await broker.save();
    
    res.status(201).json({ message: 'Rating added successfully', broker });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};