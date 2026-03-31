# 🛍️ WEARÉ — Full-Stack Fashion E-Commerce Platform

> *Everyday Elevated*

A feature-rich, full-stack fashion e-commerce web application built with the **MERN** stack (MongoDB, Express, React, Node.js). It covers Men, Women, and Kids clothing categories, and includes a modern, responsive storefront for customers alongside a dedicated admin dashboard for store management.

---

## 🚀 Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| MongoDB + Mongoose | Database & ODM |
| JSON Web Tokens (JWT) | Authentication & authorization |
| bcryptjs | Password hashing |
| dotenv | Environment variable management |
| cors | Cross-origin resource sharing |
| nodemon | Development auto-restart |

### Frontend
| Technology | Purpose |
|---|---|
| React 19 + TypeScript | UI framework |
| Vite | Build tool & dev server |
| Redux Toolkit | Global state management |
| React Router DOM v7 | Client-side routing |
| Tailwind CSS v4 | Utility-first styling |
| Axios | HTTP client |
| jwt-decode | JWT parsing on the client |

---

## ✨ Features

### 🛍️ Customer-Facing Features

#### Authentication & User Accounts
- **User Registration** — Create a new account with name, email, and password
- **User Login / Logout** — JWT-based authentication with token storage
- **Profile Management** — View and update name, email, and password
- **Protected Routes** — Route guards that redirect unauthenticated users to login

#### Product Browsing
- **Home Page** — Hero section, Featured Products, Best Sellers, New Arrivals, and Testimonials sections
- **Product Filtering** — Filter products by category and tags via query parameters
- **Product Details Page** — Full product info including images, price, brand, stock status, size selection, and description
- **New Arrivals / Best Sellers / Featured** — Tag-based product sections on the home page

#### Shopping Cart
- **Add to Cart** — Add products with selected size and quantity
- **Cart Management** — Update quantities and remove items
- **Cart Persistence** — Cart state managed via Redux (persisted in browser session)
- **Cart Summary** — Live price calculation with item count badge in the header

#### Wishlist
- **Add / Remove Items** — Toggle products to/from a personal wishlist
- **Wishlist Page** — Dedicated page listing all saved items with quick add-to-cart

#### Checkout & Orders
- **Checkout Form** — Collect shipping address (address, city, postal code, country) and payment method selection
- **Payment Page** — Process payment and record payment result details
- **Order Creation** — Place an order with all items, shipping info, and pricing breakdown (items, tax, shipping, total)
- **Order Success Page** — Confirmation screen after a successful order
- **My Orders** — View personal order history in the user profile
- **Order Details Page** — Full breakdown of a single order including items, shipping address, payment status, and delivery status

---

### 🔧 Admin Features

> Admin access is controlled via the `isAdmin` flag. Use the `makeAdmin.js` script to promote a user.

#### Admin Dashboard
- **Overview Dashboard** (`/admin`) — High-level store summary

#### Product Management (`/admin/products`)
- List all products
- Create new product (seeded with default sample values)
- Update existing product (name, price, description, image, brand, category, stock)
- Delete a product

#### Order Management (`/admin/orders`)
- List all orders across all users
- View individual order details
- **Mark as Paid** — Update order payment status with payment result metadata
- **Mark as Delivered** — Update order delivery status with timestamp

#### User Management (`/admin/users`)
- List all registered users
- View individual user by ID
- Update user info and admin privileges
- Delete a user

---

## 📁 Project Structure

```
e-commerce/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── userController.js     # Auth, profile, admin user CRUD
│   │   ├── productController.js  # Product CRUD + filtering
│   │   └── orderController.js    # Order lifecycle management
│   ├── data/                     # Seed data (products, users)
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT protect + admin guard
│   ├── models/
│   │   ├── userModel.js          # User schema (name, email, password, isAdmin)
│   │   ├── Product.js            # Product schema
│   │   └── Order.js              # Order schema with shipping, payment & delivery
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── productRoutes.js
│   │   └── orderRoutes.js
│   ├── utils/
│   │   └── generateToken.js      # JWT token generator
│   ├── makeAdmin.js              # Script to promote a user to admin
│   ├── seeder.js                 # Database seeder / destroyer
│   └── server.js                 # Express app entry point
│
└── frontend/
    └── src/
        ├── components/
        │   ├── Header.tsx            # Navbar with cart badge, auth links, admin link
        │   ├── HeroSection.tsx
        │   ├── FeaturedProducts.tsx
        │   ├── BestSellers.tsx
        │   ├── NewArrivals.tsx
        │   ├── ProductCard.tsx
        │   ├── Testimonials.tsx
        │   ├── SectionTitle.tsx
        │   ├── SizeBox.tsx
        │   ├── ProtectedRoute.tsx    # Auth guard component
        │   └── AdminRoute.tsx        # Admin guard component
        ├── pages/
        │   ├── Home.tsx
        │   ├── Login.tsx
        │   ├── Signup.tsx
        │   ├── ProductDetails.tsx
        │   ├── Cart.tsx
        │   ├── WishList.tsx
        │   ├── Checkout.tsx
        │   ├── Payment.tsx
        │   ├── OrderSuccess.tsx
        │   ├── OrderDetails.tsx
        │   ├── Profile.tsx
        │   └── admin/
        │       ├── AdminDashboard.tsx
        │       ├── ProductList.tsx
        │       ├── OrderList.tsx
        │       └── UserList.tsx
        ├── store/
        │   ├── store.ts
        │   ├── authSlice.ts
        │   ├── cartSlice.ts
        │   ├── orderSlice.ts
        │   └── wishListSlice.ts
        └── services/               # Axios API service modules
```

---

## ⚙️ Getting Started

### Prerequisites
- **Node.js** v18+
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/e-commerce.git
cd e-commerce
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

#### Seed the Database

```bash
# Import sample data
npm run data:import

# Destroy all data
npm run data:destroy
```

#### Start the Backend Server

```bash
# Development (with nodemon)
npm run dev

# Production
npm start
```

The API will be available at `http://localhost:5000`.

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`.

---

### 4. Create an Admin User

After seeding or registering a user, promote them to admin:

```bash
cd backend
node makeAdmin.js user@example.com
```

---

## 🔌 API Endpoints

### Users — `/api/users`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/` | Public | Register a new user |
| `POST` | `/login` | Public | Login and get token |
| `POST` | `/logout` | Private | Logout |
| `GET` | `/profile` | Private | Get own profile |
| `PUT` | `/profile` | Private | Update own profile |
| `GET` | `/` | Admin | Get all users |
| `GET` | `/:id` | Admin | Get user by ID |
| `PUT` | `/:id` | Admin | Update user |
| `DELETE` | `/:id` | Admin | Delete user |

### Products — `/api/products`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/` | Public | Get all products (supports `?tag=` and `?category=` filters) |
| `GET` | `/:id` | Public | Get single product |
| `POST` | `/` | Admin | Create product |
| `PUT` | `/:id` | Admin | Update product |
| `DELETE` | `/:id` | Admin | Delete product |

### Orders — `/api/orders`
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/` | Private | Place a new order |
| `GET` | `/mine` | Private | Get logged-in user's orders |
| `GET` | `/:id` | Private | Get order by ID |
| `PUT` | `/:id/pay` | Private | Mark order as paid |
| `PUT` | `/:id/deliver` | Admin | Mark order as delivered |
| `GET` | `/` | Admin | Get all orders |

---

## 🔐 Authentication

- Passwords are hashed with **bcryptjs** before storage
- Login returns a signed **JWT** token
- Protected routes use the `authMiddleware` to verify the Bearer token on every request
- Admin-only routes additionally verify the `isAdmin` flag on the user

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
