# API Documentation

## Authentication
- `POST /api/login` - Login with email/password
- `POST /api/logout` - Logout (auth required)
- `GET /api/user` - Get current user (auth required)

All endpoints below require `auth:sanctum` + `admin` middleware.

## Products
- `GET /api/products` - List products
- `POST /api/products` - Create product
- `GET /api/products/{id}` - Get product
- `PUT/PATCH /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

## Categories
- `GET /api/categories` - List categories
- `POST /api/categories` - Create category
- `PUT/PATCH /api/categories/{id}` - Update category
- `DELETE /api/categories/{id}` - Delete category
- `GET /api/categories/tree` - Get as tree structure

## Orders
- `GET /api/orders` - List orders
- `GET /api/orders/{id}` - View order details
- `GET /api/orders/statuses` - Get order statuses
- `POST /api/orders/change-status/{order}/{status}` - Change order status

## Customers
- `GET /api/customers` - List customers
- `POST /api/customers` - Create customer
- `GET /api/customers/{id}` - Get customer
- `PUT/PATCH /api/customers/{id}` - Update customer
- `DELETE /api/customers/{id}` - Delete customer
- `GET /api/countries` - List countries

## Users (Admin)
- `GET /api/users` - List admin users
- `POST /api/users` - Create admin user
- `GET /api/users/{id}` - Get admin user
- `PUT/PATCH /api/users/{id}` - Update admin user
- `DELETE /api/users/{id}` - Delete admin user

## Dashboard
- `GET /api/dashboard/customers-count` - Active customers count
- `GET /api/dashboard/products-count` - Active products count
- `GET /api/dashboard/orders-count` - Paid orders count
- `GET /api/dashboard/income-amount` - Total income
- `GET /api/dashboard/orders-by-country` - Orders grouped by country
- `GET /api/dashboard/latest-customers` - Recent customers
- `GET /api/dashboard/latest-orders` - Recent orders

## Reports
- `GET /api/report/orders` - Orders report data
- `GET /api/report/customers` - Customers report data