# Database Schema

## Core Tables

### Products
- `id`, `title`, `slug`, `description`, `price`, `quantity`, `published`
- `created_by`, `updated_by`, `created_at`, `updated_at`, `deleted_at`
- Relationships: belongsToMany(categories), hasMany(images, orderItems, cartItems)

### Categories  
- `id`, `name`, `slug`, `parent_id`
- Tree structure with parent-child relationships
- Relationships: hasMany(children), belongsTo(parent), belongsToMany(products)

### Orders
- `id`, `total_price`, `status`, `session_id`
- `created_by`, `updated_by`, `created_at`, `updated_at`
- Relationships: hasMany(items), hasOne(details), hasMany(payments)

### Order Items
- `id`, `order_id`, `product_id`, `quantity`, `unit_price`
- Links orders to products with quantities
- Relationships: belongsTo(order, product)

### Order Details
- `id`, `order_id`, `first_name`, `last_name`, `phone`, `email`
- `address1`, `address2`, `city`, `state`, `zipcode`, `country_code`
- Shipping/billing information per order

### Customers
- `id`, `first_name`, `last_name`, `phone`, `email`, `email_verified_at`
- `created_at`, `updated_at`
- Relationships: hasMany(addresses, orders)

### Customer Addresses
- `id`, `customer_id`, `type`, `address1`, `address2`
- `city`, `state`, `zipcode`, `country_code`
- Multiple addresses per customer (billing/shipping)

### Payments
- `id`, `order_id`, `amount`, `status`, `type`
- `session_id`, `created_by`, `updated_by`
- Payment processing records

## Junction Tables

### Product Categories
- `id`, `product_id`, `category_id`
- Many-to-many relationship between products and categories

### Product Images  
- `id`, `product_id`, `path`, `url`, `mime`, `size`
- `position`, `created_at`, `updated_at`
- Multiple images per product with ordering

## System Tables

### Users
- `id`, `name`, `email`, `password`, `is_admin`
- Admin user accounts for backend management

### Countries
- `code`, `name`, `states` (JSON)
- Reference data for addresses

### Cart Items
- `id`, `customer_id`, `product_id`, `quantity`
- Shopping cart persistence (if logged in)

## Key Relationships
- Products ↔ Categories (many-to-many)
- Orders → Order Items → Products (one-to-many → many-to-one)
- Customers → Orders (one-to-many)
- Orders → Payments (one-to-many)