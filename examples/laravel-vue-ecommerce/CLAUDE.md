# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a full-stack e-commerce application built with Laravel 11 backend and Vue.js 3 frontend, designed for training demonstrations in the Claude Code educational series. The application is containerized using DDEV for consistent development environments.

## Architecture

**Dual Application Structure:**
- **Laravel Backend**: Main application with API endpoints, authentication, and business logic
- **Vue.js Admin Panel**: Separate frontend application (`backend/` directory) for administrative operations

**Key Technologies:**
- Laravel 11 with PHP 8.2
- Vue.js 3 with Vue Router and Vuex
- MariaDB 10.11 database
- Tailwind CSS for styling
- Vite for asset bundling (both Laravel and Vue.js)
- DDEV for containerized development

## Development Commands

**Environment Setup:**
```bash
ddev start                    # Start DDEV containers
ddev start-dev               # Start both Laravel and Vue.js dev servers
ddev stop-dev                # Stop development servers
```

**Database:**
```bash
ddev exec "php artisan migrate:fresh --seed"    # Reset database with sample data
ddev exec "php artisan migrate"                 # Run migrations
ddev exec "php artisan db:seed"                 # Seed database
```

**Laravel Commands:**
```bash
ddev exec "php artisan test"                    # Run PHPUnit tests
ddev exec "php artisan serve"                   # Start Laravel dev server
ddev exec "composer install"                    # Install PHP dependencies
ddev exec "php artisan tinker"                  # Laravel REPL
```

**Frontend Development:**
```bash
# Laravel frontend (main site)
npm run dev                  # Start Laravel Vite dev server (port 3001)
npm run build               # Build Laravel frontend assets

# Vue.js admin panel 
cd backend && npm run dev   # Start Vue.js dev server (port 3000)
cd backend && npm run build # Build Vue.js admin panel
```

## Application URLs

- **Main E-commerce Site**: `https://laravel-vue-ecommerce.ddev.site`
- **Vue.js Admin Panel**: `http://laravel-vue-ecommerce.ddev.site:3000`
- **Laravel Vite HMR**: `http://laravel-vue-ecommerce.ddev.site:3001`

**Admin Login Credentials:**
- Email: `admin@example.com`
- Password: `admin123`

## Code Structure

**Laravel Backend (`/`):**
- `app/Models/` - Eloquent models for e-commerce entities (Product, Order, Customer, etc.)
- `app/Http/Controllers/` - API controllers for frontend communication
- `routes/api.php` - API routes for the Vue.js admin panel
- `database/seeders/` - Database seeders with sample e-commerce data

**Vue.js Admin Panel (`backend/`):**
- `src/views/` - Admin interface pages (Products, Orders, Customers, Reports)
- `src/components/core/` - Reusable UI components
- `src/router/` - Vue Router configuration
- `src/store/` - Vuex state management

**Database Models Relationships:**
- Products belong to Categories with many-to-many relationship
- Orders have OrderItems linking to Products
- Customers have CustomerAddresses and Orders
- Products have ProductImages for gallery functionality

## Development Notes

**Custom DDEV Commands:**
- The `ddev start-dev` command simultaneously runs both Laravel Vite (port 3001) and Vue.js admin (port 3000) development servers
- Development server logs are available at `/tmp/laravel-vite.log` and `/tmp/vue-admin-vite.log`

**Dual Package Management:**
- Root `package.json` handles Laravel frontend dependencies
- `backend/package.json` handles Vue.js admin panel dependencies
- Both use Vite for development and building

**Authentication:**
- Laravel Sanctum for API authentication
- Vue.js admin uses token-based authentication
- Database seeded with admin user for testing