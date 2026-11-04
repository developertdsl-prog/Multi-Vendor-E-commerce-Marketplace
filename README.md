# Multi-Vendor E-commerce Marketplace

A complete multi-vendor e-commerce marketplace built with React, Node.js, Express, MongoDB, and Tailwind CSS.

## Features

### Customers
- Register and log in
- Browse and search products
- Filter products by category and price range
- View product details
- Add products to shopping cart
- Manage cart (add/remove, quantity)
- Checkout and place orders
- View order history

### Vendors
- Register and create store profile
- Vendor approval workflow (pending/approved/rejected)
- Vendor dashboard with store information
- Add, edit, and delete products
- Manage vendor orders (update order status)
- Update store profile

### Admins
- Admin dashboard with statistics
- Manage users (view all users)
- Manage vendors (approve/reject vendor applications)
- View all orders
- Full system oversight

## Tech Stack

- **Frontend:** React 18, React Router DOM, Axios, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens), bcryptjs password hashing
- **Validation:** express-validator
- **Deployment:** Render, Docker-ready

## Project Structure

```
multi-vendor-marketplace/
├── server/                 # Backend API
│   ├── config/
│   │   └── db.js           # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── vendorController.js
│   │   ├── productController.js
│   │   └── orderController.js
│   ├── middleware/
│   │   └── auth.js         # JWT protect + role authorization
│   ├── models/
│   │   ├── User.js
│   │   ├── Vendor.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── vendor.js
│   │   ├── product.js
│   │   └── order.js
│   ├── seeders/
│   │   └── demoData.js     # Demo data seeder
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── client/                 # Frontend React app
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ProductList.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── AddProduct.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── OrderConfirmation.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── VendorRegister.jsx
│   │   │   ├── VendorDashboard.jsx
│   │   │   ├── StoreProfile.jsx
│   │   │   ├── VendorOrders.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminUsers.jsx
│   │   │   └── AdminVendors.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
├── Procfile                # Deployment config
├── render.yaml             # Render deployment config
├── .env.example
├── .env.production.example
├── .gitignore
├── API.md                  # API documentation
├── CONTRIBUTING.md         # Contribution guidelines
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB (local or MongoDB Atlas)

### Backend Setup

```bash
cd server
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

Backend runs on `http://localhost:5000`

### Frontend Setup

```bash
cd client
npm install
npm start
```

Frontend runs on `http://localhost:3000`

### Seed Demo Data

```bash
cd server
npm run seed
```

**Demo Accounts:**
| Role | Email | Password |
|------|-------|----------|
| Customer | customer@example.com | password123 |
| Vendor | vendor@example.com | password123 |
| Admin | admin@example.com | admin123 |

## Environment Variables

Create `.env` in the `server/` directory:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/multivendor_marketplace
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
```

## API Documentation

See [API.md](API.md) for complete API endpoint documentation.

## Deployment

### Render.com

1. Connect your GitHub repository to Render
2. Create a new Web Service pointing to the `server/` directory
3. Add environment variables (MONGO_URI, JWT_SECRET, JWT_EXPIRE)
4. Create a MongoDB database on Render
5. Deploy

See `render.yaml` for Render infrastructure-as-code configuration.

### Manual Deployment

```bash
# Build frontend
cd client && npm run build

# Start backend
cd server && npm start
```

## Git Workflow

- `main`: Stable release branch
- `develop`: Integration branch
- Feature branches: `feature/<name>` created from `develop`
- Never commit directly to `main`
- Open PRs targeting `develop`
- Use conventional commit messages

## Test Accounts

After seeding demo data, use these accounts to test:

- **Customer:** customer@example.com / password123
- **Vendor:** vendor@example.com / password123  
- **Admin:** admin@example.com / admin123

## License

MIT