# Vue.js Components

## Layouts
- `AppLayout` - Main authenticated layout with sidebar/navbar
- `GuestLayout` - Unauthenticated pages (login/register)

## Core Components
- `Navbar` - Top navigation bar
- `Sidebar` - Left navigation menu
- `Toast` - Notification system
- `Spinner` - Loading indicator
- `CustomInput` - Standardized form input
- `ImagePreview` - Product image display

## Charts (`components/core/Charts/`)
- `Bar` - Bar chart for analytics
- `Line` - Line chart for trends  
- `Doughnut` - Pie chart for distributions

## Tables
- `TableHeaderCell` - Sortable table headers
- Individual table components in each view directory

## Main Views

### Products
- `Products` - Product list view
- `ProductsTable` - Product data table
- `ProductForm` - Create/edit product form

### Orders
- `Orders` - Order list view
- `OrdersTable` - Order data table
- `OrderView` - Order detail view
- `OrderStatus` - Status indicator component

### Customers
- `Customers` - Customer list view
- `CustomersTable` - Customer data table
- `CustomerView` - Customer detail view

### Categories
- `Categories` - Category list view
- `CategoriesTable` - Category data table
- `CategoryModal` - Create/edit category modal

### Users
- `Users` - Admin user list view
- `UsersTable` - Admin user data table
- `UserModal` - Create/edit user modal

### Reports
- `Report` - Base report layout
- `OrdersReport` - Orders analytics
- `CustomersReport` - Customer analytics

### Auth
- `Login` - Login form
- `ResetPassword` - Password reset form
- `RequestPassword` - Request password reset

## State Management
- Vuex store in `src/store/`
- Modules for auth, products, orders, customers
- Actions handle API calls
- Mutations update state
- Getters provide computed data