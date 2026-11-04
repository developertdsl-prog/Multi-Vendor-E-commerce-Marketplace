# API Documentation

## Base URL
`http://localhost:5000/api`

## Authentication

### Register User
**POST** `/auth/register`

Register a new customer or vendor account.

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "customer"
}
```

**Response:**
```json
{
  "_id": "...",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "customer",
  "token": "jwt_token"
}
```

### Login User
**POST** `/auth/login`

**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Profile
**GET** `/auth/me`
**Headers:** `Authorization: Bearer <token>`

---

## Products

### List Products
**GET** `/products`

**Query params:** `keyword`, `category`, `minPrice`, `maxPrice`, `page`

### Get Product
**GET** `/products/:id`

### Create Product (Vendor)
**POST** `/products`
**Headers:** `Authorization: Bearer <token>`
**Body:**
```json
{
  "name": "Product Name",
  "description": "Product description",
  "category": "Electronics",
  "price": 99.99,
  "stock": 10
}
```

### Update Product (Vendor)
**PUT** `/products/:id`

### Delete Product (Vendor)
**DELETE** `/products/:id`

### Get Categories
**GET** `/products/categories`

---

## Vendors

### Register Vendor
**POST** `/vendors/register`
**Headers:** `Authorization: Bearer <token>` (User must have vendor role)

### Get Vendor Profile
**GET** `/vendors/profile`

### Update Vendor Profile
**PUT** `/vendors/profile`

### Get All Vendors (Admin)
**GET** `/vendors`

### Approve/Reject Vendor (Admin)
**PUT** `/vendors/:id/approve`
**Body:** `{ "approvalStatus": "approved" | "rejected" }`

---

## Orders

### Create Order
**POST** `/orders`
**Headers:** `Authorization: Bearer <token>`

### Get My Orders
**GET** `/orders/myorders`

### Get Vendor Orders
**GET** `/orders/vendor`

### Get All Orders (Admin)
**GET** `/orders`

### Get Order by ID
**GET** `/orders/:id`

### Update Order Status (Vendor/Admin)
**PUT** `/orders/:id/status`
**Body:** `{ "status": "pending|processing|shipped|delivered|cancelled" }`

### Mark Order as Paid
**PUT** `/orders/:id/pay`

---

## Roles

- **customer**: Browse products, add to cart, place orders
- **vendor**: Register store, manage products, manage vendor orders
- **admin**: Manage users, vendors, products, all orders

---

## Error Responses

All errors return:
```json
{
  "message": "Error description"
}
```

Status codes: 400 (bad request), 401 (unauthorized), 403 (forbidden), 404 (not found), 500 (server error)