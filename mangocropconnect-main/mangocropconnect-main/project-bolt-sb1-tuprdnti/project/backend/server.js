import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Routes
import listingsRoutes from './routes/listingRoutes.js';
import authRoutes from './routes/authRoutes.js';
import brokersRoutes from './routes/brokerRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // Frontend dev server
  credentials: true
}));

// Static files for uploads
app.use('/uploads', express.static(join(__dirname, 'uploads')));

// API Routes
app.use('/api/listings', listingsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/brokers', brokersRoutes);
app.use('/api/admin', adminRoutes);

// In-memory data store (for demo purposes - would use MongoDB in production)
let users = [
  {
    _id: '1',
    name: 'Admin User',
    email: 'admin@mangocropconnect.com',
    password: '$2a$10$KHw9YAFGwJE5xmWiBJtZ4uA3YaVcKrAxM5hWdBXdmlRrb1bB0g2G.', // admin123 (hashed)
    phone: '9876543210',
    role: 'admin',
    createdAt: new Date()
  },
  {
    _id: '2',
    name: 'Ramesh Kumar',
    email: 'seller@mangocropconnect.com',
    password: '$2a$10$Tl6/U5D3UF1Z7G5Ov9kE0uyGkdvgtqEU7RW4QGkR4KxdE9TySTgJW', // seller123 (hashed)
    phone: '9876543211',
    role: 'seller',
    createdAt: new Date()
  }
];

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '../dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../dist/index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// MongoDB connection (commented out for demo purposes)
/*
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
*/

export default app;