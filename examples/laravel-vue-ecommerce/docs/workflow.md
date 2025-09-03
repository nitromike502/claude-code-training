# Development Workflow

## Quick Start
```bash
ddev start                    # Start containers
ddev start-dev               # Start dev servers
```

## Common Tasks

### Database
```bash
ddev exec "php artisan migrate:fresh --seed"  # Reset with sample data
ddev exec "php artisan migrate"               # Run migrations only
```

### Testing
```bash
ddev exec "php artisan test"                  # Run Laravel tests
ddev exec "php artisan test --filter=Api"    # Test specific group
```

### Asset Building
```bash
# Laravel assets
npm run build                 # Production build
npm run dev                   # Development with HMR

# Vue.js admin panel  
cd backend && npm run build   # Production build
cd backend && npm run dev     # Development with HMR
```

## Development Servers

### Manual Start
```bash
# Laravel Vite (port 3001)
npm run dev

# Vue.js Admin (port 3000) 
cd backend && npm run dev
```

### Access Points
- Main site: `https://laravel-vue-ecommerce.ddev.site`
- Admin panel: `http://laravel-vue-ecommerce.ddev.site:3000`
- HMR servers: `:3000` and `:3001`

## Admin Access
- Email: `admin@example.com`
- Password: `admin123`

## File Structure
```
/                    # Laravel backend
├── app/Models/      # Database models
├── app/Http/Controllers/Api/  # API endpoints
├── routes/api.php   # API routes
├── database/seeders/  # Sample data
└── package.json     # Laravel frontend deps

backend/             # Vue.js admin panel
├── src/views/       # Admin pages
├── src/components/  # UI components  
├── src/router/      # Vue routing
├── src/store/       # Vuex state
└── package.json     # Vue.js dependencies
```

## Debugging
```bash
# View logs
ddev logs
tail -f /tmp/laravel-vite.log    # Laravel dev server
tail -f /tmp/vue-admin-vite.log  # Vue.js dev server

# Database access
ddev exec mysql -u db -p db      # MySQL shell
```