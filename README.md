# Client Order Management System

## 📸 Application Screenshots

### Database Architecture

#### Database Schema Diagram
![Database Schema](./screenshots/database-schema.png)
*Complete PostgreSQL database schema showing all tables, relationships, foreign keys, and the soft-delete pattern implementation*

### Authentication & User Interface

#### Login Page
![Login Page](./screenshots/login-page.png)
*Clean and modern login interface with email/password authentication, remember me option, and responsive design*

#### Registration Page
![Registration Page](./screenshots/registration-page.png)
*User-friendly registration form with real-time validation, password strength indicator, and terms acceptance*

### Core Management Modules

#### Dashboard
![Dashboard](./screenshots/dashboard-page.png)
*Comprehensive overview with system statistics, user profile information, and role-specific data visualization*

#### Clients Management
![Clients Page](./screenshots/clients-page.png)
*Complete client management interface with search functionality, active/inactive status, and quick actions*

#### Products Management
![Products Page](./screenshots/products-page.png)
*Advanced product inventory system with stock tracking, SKU management, and inventory value calculations*

#### Product Form
![Product Form](./screenshots/product-form.png)
*Intuitive product creation/editing modal with validation for name, SKU, description, price, and stock quantity*

### Order Processing

#### Orders List
![Orders Page](./screenshots/orders-page.png)
*Comprehensive order summary view with client information, product count, total amounts, and comment preview*

#### Create Order Form
![Order Form](./screenshots/order-placing-form.png)
*Advanced order creation interface with multi-product selection, real-time price calculation, and multiple payment method support*

---

## Table of Contents
1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Features](#features)
4. [Technology Stack](#technology-stack)
5. [Setup Instructions](#setup-instructions)
6. [Database Schema](#database-schema)
7. [API Endpoints](#api-endpoints)
8. [Frontend Structure](#frontend-structure)
9. [Security & Authentication](#security--authentication)
10. [User Guide](#user-guide)

---

> **📝 Note:** All screenshots showcase the actual application interface. The UI is built with React, Ant Design, and Tailwind CSS for a modern, responsive experience across all devices.

---

## Overview

A full-stack web application for managing clients, products, orders, and comments with role-based access control. The system supports multi-user collaboration with Admin, Manager, and User roles.

### Key Capabilities
- User authentication with JWT tokens
- Role-based access control (RBAC)
- Client management
- Product inventory management
- Order creation with multiple products and payments
- Order comments system with edit/delete permissions
- Real-time dashboard statistics

---

## Architecture

### System Architecture
```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Frontend      │────▶│    Backend      │────▶│   PostgreSQL    │
│   (React)       │◀────│   (Express)     │◀────│   Database      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Tech Stack Overview
- **Frontend**: React 19, Redux Toolkit, Ant Design, Tailwind CSS
- **Backend**: Node.js, Express.js 5
- **Database**: PostgreSQL 18
- **Authentication**: JWT (Access + Refresh tokens)
- **Build Tool**: Vite with Rolldown

---

## Features

### 1. Authentication System
- User registration with validation
- Login with email/password
- JWT-based authentication (access + refresh tokens)
- Persistent sessions with localStorage
- Protected routes

### 2. User Management
- Three role types: Admin, Manager, User
- Admin: Full system access
- Manager: Product, client, order, comment management
- User: View dashboard and orders

### 3. Dashboard
- User profile information
- System statistics (products, clients, orders, users)
- Role-specific data visibility

### 4. Product Management
- CRUD operations for products
- Fields: name, SKU, description, price, stock
- Inventory value tracking
- Low stock alerts
- Search and filter functionality

### 5. Client Management
- CRUD operations for clients
- Fields: name, email, address, contact
- Active/inactive status
- Search functionality

### 6. Order Management
- Multi-product order creation
- Client selection
- Real-time price calculation
- Multiple payment methods (Cash, Card, UPI)
- Payment tracking with remaining balance
- Order comments system

### 7. Comments System
- Add comments to orders
- Edit own comments (or any if admin)
- Delete own comments only
- Real-time comment updates
- Creator attribution

---

## Technology Stack

### Backend Dependencies
```json
{
  "express": "^5.1.0",
  "pg": "^8.16.3",
  "bcryptjs": "^3.0.3",
  "jsonwebtoken": "^9.0.2",
  "express-validator": "^7.3.0",
  "helmet": "^8.1.0",
  "cors": "^2.8.5",
  "dotenv": "^17.2.3",
  "morgan": "^1.10.1",
  "cookie-parser": "^1.4.7"
}
```

### Frontend Dependencies
```json
{
  "react": "^19.1.1",
  "react-dom": "^19.1.1",
  "react-router-dom": "^7.9.5",
  "@reduxjs/toolkit": "^2.10.1",
  "react-redux": "^9.2.0",
  "antd": "^5.28.0",
  "axios": "^1.13.2",
  "tailwindcss": "^4.1.17"
}
```

---

## Setup Instructions

### Prerequisites
- Node.js (v20.19.0 or v22.12.0+)
- PostgreSQL 18
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create `.env` file**
```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/cms_db

# JWT Secrets
ACCESS_TOKEN_SECRET=your_access_token_secret_here
REFRESH_TOKEN_SECRET=your_refresh_token_secret_here

# Token Expiry
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d

# Server
PORT=5000
NODE_ENV=development
```

4. **Setup Database**
```bash
# Create database
createdb cms_db

# Import schema
psql cms_db < database.sql
```

5. **Start server**
```bash
# Development
npm run dev

# Production
npm start
```

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create `.env` file**
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

4. **Start development server**
```bash
npm run dev
```

5. **Access application**
```
http://localhost:5173
```

### Default Login Credentials
```
Email: alice@example.com
Password: password123

Email: bob@example.com
Password: password123
```

---

## Database Schema

### Core Tables

#### 1. sys_users
```sql
- id (PK)
- name
- email (unique)
- password (hashed)
- is_active
- created_date
- updated_date
- is_deleted
```

#### 2. sys_roles
```sql
- id (PK)
- title
- description
- is_active
- created_date
```

#### 3. sys_user_roles
```sql
- id (PK)
- user_id (FK)
- role_id (FK)
```

#### 4. clients
```sql
- id (PK)
- name
- email
- address
- contact
- is_active
- created_date
```

#### 5. products
```sql
- id (PK)
- name
- description
- price
- stock
- is_active
- created_date
```

#### 6. orders
```sql
- id (PK)
- client_id (FK)
- overall_price
- is_active
- created_date
```

#### 7. order_transactions
```sql
- id (PK)
- order_id (FK)
- product_id (FK)
- product_quantity
- unit_price
- total_price
```

#### 8. order_comments
```sql
- id (PK)
- order_id (FK)
- comments
- created_by (FK)
- created_date
```

#### 9. order_payments
```sql
- id (PK)
- order_id (FK)
- payment_mode
- amount
- created_date
```

#### 10. sys_refresh_tokens
```sql
- id (PK)
- user_id (FK)
- token
- expires_at
- revoked
```

### Database Views

#### view_orders_summary
Aggregates order data with client info, product count, and latest comment.

#### vw_user_with_roles
Joins users with their assigned roles for authentication.

---

## API Endpoints

### Authentication Endpoints

#### POST /api/auth/register
Register new user
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### POST /api/auth/login
Login user
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### POST /api/auth/refresh
Refresh access token
```json
{
  "refreshToken": "your_refresh_token"
}
```

#### POST /api/auth/logout
Logout user
```json
{
  "refreshToken": "your_refresh_token"
}
```

### Product Endpoints
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Auth required)
- `PUT /api/products/:id` - Update product (Auth required)
- `DELETE /api/products/:id` - Delete product (Auth required)

### Client Endpoints
- `GET /api/clients` - List all clients
- `GET /api/clients/:id` - Get single client
- `POST /api/clients` - Create client (Auth required)
- `PUT /api/clients/:id` - Update client (Auth required)
- `DELETE /api/clients/:id` - Delete client (Auth required)

### Order Endpoints
- `GET /api/orders/summary` - Get orders summary
- `POST /api/orders` - Create order (Auth required)

#### Create Order Request
```json
{
  "client_id": 1,
  "products": [
    {
      "product_id": 1,
      "quantity": 2
    }
  ],
  "comment": "Urgent delivery",
  "payments": [
    {
      "payment_mode": "Cash",
      "amount": 1000
    }
  ],
  "created_by": 1
}
```

### Comment Endpoints
- `GET /api/order-comments` - List all comments
- `POST /api/order-comments` - Add comment (Auth required)
- `PUT /api/order-comments/:id` - Update comment (Auth required)
- `DELETE /api/order-comments/:id` - Delete comment (Auth required)

### User Endpoints
- `GET /api/users` - List users (Auth required)
- `GET /api/users/:id` - Get user (Auth required)
- `POST /api/users` - Create user (Auth required)
- `PUT /api/users/:id` - Update user (Auth required)
- `DELETE /api/users/:id` - Delete user (Auth required)

---

## Frontend Structure

### Page Components

#### 1. Login (`/login`)
- Email/password authentication
- Form validation
- Remember me functionality
- Redirect to dashboard on success

#### 2. Register (`/register`)
- User registration form
- Password confirmation
- Terms acceptance
- Email validation

#### 3. Dashboard (`/dashboard`)
- User profile display
- System statistics
- Role-specific views

#### 4. Products (`/products`)
- Product listing table
- Add/edit product modal
- Search and filter
- Stock management
- Inventory statistics

#### 5. Clients (`/clients`)
- Client listing table
- Add/edit client modal
- Search functionality
- Active/inactive status

#### 6. Orders (`/orders`)
- Order summary view
- Create order modal
- Product selection
- Payment tracking
- Comments modal

### Key Components

#### MainLayout
- Sidebar navigation
- Top header with user dropdown
- Protected route wrapper

#### Sidebar
- Role-based menu items
- Collapsed/expanded states
- Active route highlighting

#### OrderForm
- Multi-product selection
- Quantity management
- Price calculation
- Payment tracking
- Stock validation

#### OrderComments
- Comment list
- Add/edit/delete operations
- Permission-based actions

---

## Security & Authentication

### JWT Token Flow
1. User logs in with credentials
2. Backend validates and returns access + refresh token
3. Access token stored in localStorage
4. Access token sent with each API request via Authorization header
5. Refresh token used to obtain new access token when expired

### Password Security
- Passwords hashed using bcrypt (salt rounds: 10)
- Never stored in plain text
- Minimum 6 characters required

### Authorization Middleware
```javascript
// Protects routes requiring authentication
authenticate(req, res, next)
```

### Role-Based Access
- Admin: Full access to all features
- Manager: Cannot access user management
- User: Limited to dashboard and order viewing

### Security Headers
- Helmet.js for security headers
- CORS configuration
- Cookie parser for token handling

---

## User Guide

### Getting Started

1. **Register Account**
   - Navigate to registration page
   - Fill in name, email, password
   - Accept terms and conditions

2. **Login**
   - Enter email and password
   - Click "Sign In"
   - Redirected to dashboard

### Managing Products

1. **Add Product**
   - Click "Add New Product"
   - Fill in: name, SKU, description, price, stock
   - Click "Create Product"

2. **Edit Product**
   - Click "Edit" button on product row
   - Modify fields
   - Click "Update Product"

3. **Delete Product**
   - Click "Delete" button
   - Confirm deletion

### Managing Clients

1. **Add Client**
   - Click "Add Client"
   - Enter client details
   - Submit form

2. **Search Clients**
   - Use search box to filter by name/email

### Creating Orders

1. **Start New Order**
   - Click "Create Order"
   - Select client from dropdown

2. **Add Products**
   - Select product from dropdown
   - Enter quantity
   - Click "Add"
   - Repeat for multiple products

3. **Manage Quantities**
   - Adjust quantities in table using number inputs
   - Remove products with delete button

4. **Add Payments**
   - Click "Add payment line"
   - Select payment mode (Cash/Card/UPI/Other)
   - Enter amount
   - Add multiple payment methods if needed

5. **Add Comment** (Optional)
   - Enter order notes in comment field

6. **Submit Order**
   - Verify totals match
   - Click "Submit Order"

### Managing Comments

1. **View Comments**
   - Click "Comments" button on order
   - View all comments for that order

2. **Add Comment**
   - Type in text area
   - Click "Add Comment"

3. **Edit Comment**
   - Click edit icon (only own comments or if admin)
   - Modify text
   - Click "Save"

4. **Delete Comment**
   - Click delete icon (only own comments)
   - Confirm deletion

---

## Troubleshooting

### Common Issues

**Issue: Cannot login**
- Check credentials are correct
- Verify backend is running
- Check DATABASE_URL in backend .env

**Issue: Token expired**
- Logout and login again
- Check token expiry settings in .env

**Issue: Database connection failed**
- Verify PostgreSQL is running
- Check DATABASE_URL format
- Ensure database exists

**Issue: Products not loading**
- Check backend logs for errors
- Verify authentication token
- Check CORS configuration

### Development Tips

1. **Enable detailed logging**
```javascript
// backend/src/index.js
app.use(morgan('dev'));
```

2. **Check Redux state**
```javascript
// In browser console
console.log(store.getState());
```

3. **Inspect API calls**
- Open browser DevTools → Network tab
- Filter by XHR/Fetch
- Inspect request/response

---

## Future Enhancements

- [ ] Email notifications for orders
- [ ] PDF invoice generation
- [ ] Advanced reporting and analytics
- [ ] File upload for product images
- [ ] Export data to CSV/Excel
- [ ] Order status workflow
- [ ] Client portal
- [ ] Mobile responsive improvements
- [ ] Real-time updates with WebSockets
- [ ] Multi-currency support

---

## License

This project is for educational purposes.

## Support

For issues or questions, please contact the development team.