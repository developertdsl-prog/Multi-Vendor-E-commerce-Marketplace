# Multi-Vendor E-commerce Marketplace

A multi-vendor e-commerce marketplace built with React, Node.js, Express, MongoDB, and Tailwind CSS.

## Features

- Customer registration, login, and product browsing
- Vendor registration, store creation, and product management
- Admin dashboard for user, vendor, product, and order management
- Shopping cart with add/remove and quantity management
- Checkout and order management
- Role-based access control (customer, vendor, admin)
- JWT authentication with protected routes

## Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT, bcryptjs

## Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB

### Backend Setup

```bash
cd server
npm install
cp .env.example .env
# Configure your MongoDB URI and JWT secret in .env
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm start
```

## Project Structure

```
server/          # Backend API (Node.js + Express)
client/          # Frontend (React + Tailwind CSS)
```

## Git Workflow

- `main`: Stable release branch
- `develop`: Integration branch
- Feature branches: `feature/<name>` created from `develop`
- Never commit directly to `main`
- Open PRs targeting `develop`

## License

MIT