const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');

const demoUsers = [
  {
    name: 'John Customer',
    email: 'customer@example.com',
    password: 'password123',
    role: 'customer',
  },
  {
    name: 'Jane Vendor',
    email: 'vendor@example.com',
    password: 'password123',
    role: 'vendor',
  },
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
  },
];

const demoProducts = [
  {
    name: 'Wireless Headphones',
    description: 'Premium noise-canceling wireless headphones with 30-hour battery life.',
    category: 'Electronics',
    price: 89.99,
    stock: 50,
  },
  {
    name: 'Cotton T-Shirt',
    description: '100% organic cotton t-shirt in multiple colors.',
    category: 'Clothing',
    price: 24.99,
    stock: 100,
  },
  {
    name: 'Coffee Maker',
    description: 'Programmable drip coffee maker with thermal carafe.',
    category: 'Home & Kitchen',
    price: 79.99,
    stock: 25,
  },
  {
    name: 'Running Shoes',
    description: 'Lightweight running shoes with cushioned sole for daily training.',
    category: 'Sports',
    price: 119.99,
    stock: 40,
  },
  {
    name: 'Smart Watch',
    description: 'Fitness tracker with heart rate monitoring and GPS.',
    category: 'Electronics',
    price: 199.99,
    stock: 30,
  },
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await User.deleteMany();
    await Product.deleteMany();

    const createdUsers = await User.insertMany(demoUsers);

    const vendorUser = createdUsers.find((u) => u.role === 'vendor');

    const productsWithVendor = demoProducts.map((p) => ({
      ...p,
      vendor: vendorUser._id,
    }));

    await Product.insertMany(productsWithVendor);

    console.log('Demo data seeded successfully!');
    console.log('Test accounts:');
    console.log('  Customer: customer@example.com / password123');
    console.log('  Vendor:   vendor@example.com / password123');
    console.log('  Admin:    admin@example.com / admin123');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
};

seedData();
