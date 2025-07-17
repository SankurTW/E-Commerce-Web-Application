# 🛒 E-Commerce Web Application

A full-stack e-commerce platform built with modern web technologies, featuring a complete product catalog, shopping cart functionality, and secure user authentication system.

## Features

### Core E-Commerce Features
- **Product Catalog**: Browse products with categories, filters, and search functionality
- **Shopping Cart**: Add/remove items, update quantities, and calculate totals
- **User Authentication**: Secure registration, login, and user profile management
- **Order Management**: Place orders, view order history, and track order status
- **Payment Integration**: Secure checkout process with payment gateway integration
- **Inventory Management**: Real-time stock tracking and availability updates

### Frontend Features
- **Responsive Design**: Mobile-first approach with Bootstrap framework
- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Product Gallery**: Image carousel and zoom functionality
- **Search & Filter**: Advanced product search with multiple filter options
- **User Dashboard**: Personal account management and order history

### 🔧 Backend Features
- **RESTful API**: Well-structured API endpoints for all operations
- **Database Integration**: PostgreSQL for robust data management
- **Authentication**: JWT-based secure authentication system
- **Data Validation**: Input validation and sanitization
- **Error Handling**: Comprehensive error handling and logging

## 🛠️ Technologies Used

### Frontend
- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with Flexbox and Grid
- **JavaScript (ES6+)** - Interactive functionality
- **React.js** - Component-based UI development
- **Bootstrap** - Responsive design framework

### Backend
- **Node.js** - Server-side JavaScript runtime
- **Express.js** - Web application framework
- **PostgreSQL** - Relational database management
- **JWT** - JSON Web Token authentication
- **bcrypt** - Password hashing

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SankurTW/ecommerce-web.git
   cd ecommerce-web
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   npm install
   
   # Install frontend dependencies
   cd client
   npm install
   cd ..
   ```

3. **Database Setup**
   ```bash
   # Create PostgreSQL database
   createdb ecommerce_db
   
   # Run database migrations
   npm run db:migrate
   
   # Seed initial data (optional)
   npm run db:seed
   ```

4. **Environment Configuration**
   ```bash
   # Create .env file in root directory
   cp .env.example .env
   
   # Update environment variables
   DATABASE_URL=postgresql://username:password@localhost:5432/ecommerce_db
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

5. **Start the application**
   ```bash
   # Start backend server
   npm run server
   
   # Start frontend (in new terminal)
   npm run client
   
   # Or start both concurrently
   npm run dev
   ```

## Project Structure

```
ecommerce-web/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom hooks
│   │   ├── services/       # API services
│   │   └── utils/          # Utility functions
│   └── package.json
├── server/                 # Express backend
│   ├── controllers/        # Route controllers
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── config/            # Configuration files
│   └── utils/             # Utility functions
├── database/              # Database files
│   ├── migrations/        # Database migrations
│   └── seeds/             # Seed data
├── .env.example           # Environment variables template
├── package.json           # Root package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/search?q=query` - Search products

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item quantity
- `DELETE /api/cart/remove/:id` - Remove item from cart

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/status` - Update order status

## Key Features Demo

### Product Catalog
- Browse products with pagination
- Category-based filtering
- Real-time search functionality
- Product details with image gallery

### Shopping Cart
- Add products to cart
- Update quantities
- Remove items
- Calculate totals with tax

### User Authentication
- Secure user registration
- Login with email/password
- Protected routes
- User profile management

### Order Management
- Complete checkout process
- Order confirmation
- Order history tracking
- Status updates

## 🔐 Security Features

- **Password Hashing**: bcrypt for secure password storage
- **JWT Authentication**: Token-based authentication
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Prevention**: Parameterized queries
- **XSS Protection**: Input sanitization

## 🚀 Performance Optimizations

- **Code Splitting**: React lazy loading for optimal bundle size
- **Image Optimization**: Compressed images with lazy loading
- **Caching**: Browser caching for static assets
- **Database Indexing**: Optimized database queries
- **Responsive Images**: Different image sizes for different devices

## 🧪 Testing

```bash
# Run backend tests
npm run test:server

# Run frontend tests
npm run test:client

# Run all tests
npm test

# Run tests with coverage
npm run test:coverage
```

**Sankur Kundu**
- Email: sankur.kundu.tw@gmail.com
- LinkedIn: [linkedin.com/in/sankur-kundu](https://www.linkedin.com/in/sankur-kundu/)
