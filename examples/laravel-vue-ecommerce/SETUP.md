# Laravel Vue.js E-commerce - Development Setup

This document provides setup instructions and troubleshooting for the Laravel + Vue.js e-commerce demonstration project.

## Quick Start

```bash
cd examples/laravel-vue-ecommerce
ddev start
ddev start-dev
```

**Access URLs:**
- **Frontend**: `http://laravel-vue-ecommerce.ddev.site`
- **Admin Panel**: `http://laravel-vue-ecommerce.ddev.site:3000`
- **Admin Login**: `admin@example.com` / `admin123`

## Architecture Overview

This project consists of:

### Backend (Laravel 11)
- **Framework**: Laravel 11 with PHP 8.2
- **Database**: MariaDB 10.11
- **API**: RESTful API endpoints for admin operations
- **Frontend Integration**: Blade templates with Vite integration
- **Port**: Standard DDEV ports (80/443)

### Admin Panel (Vue.js 3)
- **Framework**: Vue.js 3 with Vite build system  
- **UI**: Tailwind CSS with Vue components
- **Router**: Vue Router for SPA navigation
- **State**: Vuex for centralized state management
- **Port**: 3000 (mapped to external access)

### Development Servers
- **Laravel Vite**: Port 3001 (assets for main app)
- **Vue.js Admin**: Port 3000 (standalone admin SPA)

## DDEV Configuration

### Custom Commands
- `ddev start-dev` - Start both Vite development servers
- `ddev stop-dev` - Stop all development servers
- `ddev describe` - View all service URLs and ports

### Port Mappings
```yaml
web_extra_exposed_ports:
  - name: vite-laravel
    container_port: 3001
    http_port: 3001
    https_port: 3002
  - name: vite-admin  
    container_port: 3000
    http_port: 3000
    https_port: 3003
```

### Post-Start Hooks
- Installs Composer dependencies
- Installs NPM dependencies (both root and backend/)
- Generates Laravel application key
- Creates storage symlink
- Preserves custom .env configuration

## Database Setup

### Initial Migration & Seeding
```bash
ddev exec "php artisan migrate:fresh --seed"
```

This creates:
- All necessary database tables
- Admin user: `admin@example.com` / `admin123`
- Countries data for checkout functionality

### Available Seeders
- `AdminUserSeeder` - Creates admin user account
- `CountrySeeder` - Populates countries/states data
- `ProductSeeder` - Sample products (optional)

## Development Workflow

### Starting Development
1. `ddev start` - Start containers and services
2. `ddev start-dev` - Start Vite servers for hot reloading
3. Access frontend and admin panel via URLs above

### Making Changes
- **Laravel**: Changes reflect immediately with Vite HMR
- **Vue.js Admin**: Hot reloading on port 3000
- **Database**: Use Laravel migrations and seeders

### Stopping Development  
1. `ddev stop-dev` - Stop Vite servers
2. `ddev stop` - Stop all containers (optional)

## Troubleshooting

### Common Issues

#### Port Conflicts
**Problem**: Vite servers fail to start or show "Port already in use"
**Solution**: 
```bash
ddev restart  # Clean restart
ddev start-dev
```

#### Database Connection Errors
**Problem**: "Connection refused" or database errors
**Solution**: Verify .env file has correct DDEV database settings:
```env
DB_HOST=db
DB_DATABASE=db  
DB_USERNAME=db
DB_PASSWORD=db
```

#### Admin Panel Shows 404/Bad Gateway
**Problem**: Admin panel not accessible
**Solution**:
1. Check Vite server is running: `ddev exec "ss -tlnp | grep 3000"`
2. Restart dev servers: `ddev stop-dev && ddev start-dev`
3. Verify port mapping in `ddev describe`

#### Asset Loading Issues
**Problem**: CSS/JS assets not loading properly
**Solution**:
1. Clear Laravel cache: `ddev exec "php artisan cache:clear"`
2. Restart Vite servers: `ddev start-dev`
3. Check Vite configuration has correct host binding

### Debugging Commands

```bash
# Check running processes
ddev exec "ps aux | grep -E 'vite|npm'"

# View Vite server logs  
ddev exec "tail -f /tmp/laravel-vite.log"
ddev exec "tail -f /tmp/vue-admin-vite.log"

# Check port bindings
ddev exec "ss -tlnp | grep -E '3000|3001'"

# Laravel debugging
ddev exec "php artisan route:list"
ddev exec "php artisan tinker"
```

## Configuration Files

### Key Configuration Files
- `.ddev/config.local.yaml` - DDEV project configuration
- `vite.config.js` - Laravel Vite configuration  
- `backend/vite.config.js` - Vue.js admin Vite configuration
- `.env` - Laravel environment configuration

### Vite Configuration Notes
Both Vite servers are configured with:
- `host: '0.0.0.0'` - Allow external connections
- `strictPort: true` - Prevent automatic port changes  
- `usePolling: true` - File watching in containers
- Fixed port assignments to prevent conflicts

## Training Use Cases

This project demonstrates real-world scenarios for Claude Code training:

### For Project Managers
- Multi-service application architecture
- Development environment setup and management
- Database migrations and version control
- Development workflow coordination

### For Technical Writers
- API documentation (Laravel routes)
- Setup and installation procedures  
- Configuration management
- Troubleshooting guides

### For QA Testers
- Test environment setup
- Database seeding for test data
- Multi-application testing scenarios
- Development vs. production configurations