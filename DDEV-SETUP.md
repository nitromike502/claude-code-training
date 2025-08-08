# DDEV Setup for Laravel Vue.js E-commerce Training

This document provides instructions for setting up the Laravel Vue.js e-commerce example project using DDEV for Claude Code training sessions.

## Prerequisites

- **DDEV installed**: Ensure DDEV v1.20+ is installed on your system
- **Docker**: DDEV requires Docker Desktop (Windows/Mac) or Docker Engine (Linux)
- **Git**: For cloning the repository (already done in this training setup)

## Project Structure

The Laravel Vue.js e-commerce project has two main components:
- **Laravel Backend + Frontend**: Main e-commerce site with Blade templates and Vue.js components
- **Vue.js Admin Panel**: Separate SPA admin interface in `/backend` folder

## Quick Start

### 1. Start the DDEV Environment

```bash
cd examples/laravel-vue-ecommerce
ddev start
```

**First-time setup includes:**
- ✅ Composer install
- ✅ NPM install (both main app and admin panel)
- ✅ Environment file creation
- ✅ Laravel key generation
- ✅ Database migration and seeding
- ✅ Storage symlink creation

### 2. Start Development Servers

```bash
ddev start-dev
```

This starts both:
- Laravel Vite server (port 3001)
- Vue.js admin panel Vite server (port 3000)

### 3. Access the Applications

| Application | URL | Purpose |
|------------|-----|---------|
| **Main E-commerce Site** | https://laravel-vue-ecommerce.ddev.site | Customer-facing e-commerce |
| **Laravel Vite (HMR)** | https://laravel-vue-ecommerce.ddev.site:3002 | Hot module reloading for Laravel frontend |
| **Vue.js Admin Panel** | https://laravel-vue-ecommerce.ddev.site:3003 | Admin interface |
| **Database (External)** | host: 127.0.0.1, port: `ddev describe` | Database access |
| **Mailpit** | https://laravel-vue-ecommerce.ddev.site:8026 | Email testing |

### 4. Default Login Credentials

#### Admin Panel Login
```
Email: admin@example.com
Password: admin123
```

#### Customer Accounts
```
Email: user1@example.com
Password: useruser1

Email: user2@example.com  
Password: useruser2
```

## DDEV Commands for Training

### Basic Operations
```bash
# Start the environment
ddev start

# Stop the environment
ddev stop

# SSH into the web container
ddev ssh

# Access database
ddev mysql

# View project info
ddev describe

# View logs
ddev logs
```

### Development Commands
```bash
# Start both development servers
ddev start-dev

# Stop development servers  
ddev stop-dev

# Install dependencies
ddev composer install
ddev npm install

# Run Laravel commands
ddev artisan migrate
ddev artisan tinker

# Access database
ddev mysql
ddev mysql -uroot -proot
```

### Useful Training Commands
```bash
# Reset database to clean state
ddev artisan migrate:fresh --seed

# Generate dummy data
ddev artisan db:seed

# Clear Laravel cache
ddev artisan cache:clear
ddev artisan config:clear

# View Laravel logs
ddev logs -f web
```

## File Structure for Claude Code Training

### Key Laravel Backend Files:
```
app/Http/Controllers/
├── ProductController.php      # Product management
├── CartController.php         # Shopping cart logic  
├── CheckoutController.php     # Checkout process
└── Api/
    ├── ProductController.php  # API endpoints
    └── OrderController.php    # Order management

app/Models/
├── Product.php               # Product model
├── Order.php                 # Order model
└── Customer.php              # Customer model

resources/views/              # Blade templates
resources/js/                 # Laravel frontend assets
routes/
├── web.php                   # Web routes
└── api.php                   # API routes
```

### Key Vue.js Admin Files:
```
backend/src/
├── App.vue                   # Main admin app
├── components/               # Reusable components
├── views/
│   ├── Dashboard.vue         # Admin dashboard
│   ├── Products/            # Product management
│   ├── Orders/              # Order management
│   └── Customers/           # Customer management
├── store/                    # Vuex state management
└── router/                   # Vue Router configuration
```

## Claude Code Demo Scenarios

### Session 1 - Introduction
**Demo Commands:**
```bash
ddev ssh
@claude what does the ProductController do in this e-commerce site?
@claude summarize the shopping cart functionality
@claude where is the customer registration handled?
```

### Session 2 - Project Setup  
**Show DDEV setup process:**
1. `ddev describe` - Show project overview
2. `ddev ssh` - Access the container
3. `claude-code init` - Initialize Claude Code (if installed in container)

### Session 3 - Sub-agents
**Demo file explanations:**
```bash
@claude @explain app/Http/Controllers/ProductController.php --level=simple
@claude @explain backend/src/views/Products/Products.vue --level=simple  
@claude @find "Invalid payment method"
```

### Session 4 - Documentation
**Generate docs:**
```bash
@claude @docu resources/js/components/ShoppingCart.vue > cart-docs.md
@claude @docu app/Http/Controllers/CheckoutController.php --style=user-guide
```

### Session 5 - MCP Servers
**Show project complexity:**
- Multiple codebases (Laravel + Vue.js)
- Different tech stacks in one project
- API connections between frontend and backend

## Troubleshooting

### Common Issues

**Port Conflicts:**
```bash
ddev stop
ddev start
```

**Database Issues:**
```bash
ddev restart
ddev artisan migrate:fresh --seed
```

**NPM/Node Issues:**
```bash
ddev ssh
npm install
# or
ddev stop-dev
ddev start-dev
```

**Clear All Caches:**
```bash
ddev artisan cache:clear
ddev artisan config:clear
ddev artisan route:clear
ddev artisan view:clear
```

### Reset to Clean State
```bash
ddev stop
ddev start
ddev artisan migrate:fresh --seed
ddev start-dev
```

## Training Tips

### For Presenters:
1. **Pre-session**: Run `ddev start` and `ddev start-dev` before training
2. **Have backup**: Keep `ddev restart` ready if issues arise  
3. **Show URLs**: Display the different application URLs clearly
4. **Demo data**: Use seeded data for consistent examples

### For Participants:
1. **Access method**: All applications accessible via HTTPS URLs
2. **No local setup**: Everything runs in containers
3. **Persistent data**: Database persists between starts/stops
4. **Easy reset**: Simple commands to reset to clean state

## Advanced Configuration

### Accessing from Network
To access from other devices on the network:
```bash
ddev config --bind-all-interfaces
ddev start
```

### Custom Environment Variables
Edit `.ddev/config.local.yaml`:
```yaml
web_environment:
  - CUSTOM_VAR=value
  - DEBUG=true
```

### Database Access from Host
```bash
# Get database connection details
ddev describe

# Example connection:
# Host: 127.0.0.1
# Port: (varies, shown in ddev describe)
# User: root
# Password: root
# Database: db
```

This DDEV setup provides a complete, isolated development environment perfect for Claude Code training demonstrations!