# Alternative Example Projects for Claude Code Training

This document contains alternative projects that could be used for Claude Code training sessions if we need different examples or want to show variety.

## Current Primary Example

### 🎯 **thecodeholic/laravel-vue-ecommerce** (Currently Used)
- **Location**: `./examples/laravel-vue-ecommerce/`
- **GitHub**: https://github.com/thecodeholic/laravel-vue-ecommerce
- **Tech Stack**: Laravel 11 + Vue.js 3 + MariaDB + Vite
- **Features**: Complete e-commerce with cart, checkout, user accounts, admin panel
- **Development**: DDEV containerized environment with hot reloading
- **Access URLs**: 
  - Frontend: `http://laravel-vue-ecommerce.ddev.site`
  - Admin: `http://laravel-vue-ecommerce.ddev.site:3000`
  - Login: `admin@example.com` / `admin123`
- **Why Chosen**: Educational focus, real-world complexity, fully functional
- **Best For**: All training sessions - comprehensive yet understandable
- **Setup**: See `examples/laravel-vue-ecommerce/SETUP.md` for details

## Laravel Vue E-commerce Alternatives

### **Jordan-Bianco/Ecommerce** 
- **GitHub**: https://github.com/Jordan-Bianco/Ecommerce
- **Tech Stack**: Laravel 9 + Vue 3 + Inertia.js + Stripe payments
- **Special Features**: 
  - Built using TDD (Test-Driven Development)
  - Modern framework versions
  - Payment integration with Stripe
- **Best For**: Sessions 3-4 when showing advanced features
- **Complexity**: Intermediate
- **Last Updated**: 2024

### **DevAmirul/Laravel-Vue-SPA-Ecommerce**
- **GitHub**: https://github.com/DevAmirul/Laravel-Vue-SPA-Ecommerce
- **Tech Stack**: Laravel SPA + Vue.js + REST API
- **Special Features**: 
  - Multiple authentication levels (admin/editor/user)
  - Admin panel integration
  - Complete REST API
- **Best For**: Session 5 (MCP Servers) - shows enterprise complexity
- **Complexity**: Advanced
- **Good For**: Demonstrating role-based access and complex workflows

### **bagisto/bagisto** (Enterprise Level)
- **GitHub**: https://github.com/bagisto/bagisto
- **Tech Stack**: Laravel + Vue.js (Enterprise Framework)
- **Special Features**: 
  - Full e-commerce framework (not just example)
  - Multi-vendor marketplace support
  - Extensive plugin ecosystem
- **Best For**: Advanced demonstrations, real-world complexity examples
- **Complexity**: Enterprise
- **Note**: Might be too complex for basic training but good for "real-world" examples

### **shawndl/LaraCommerce**
- **GitHub**: https://github.com/shawndl/LaraCommerce
- **Tech Stack**: Laravel + Vue.js
- **Special Features**: 
  - Free e-commerce template
  - Clean, simple implementation
- **Best For**: Sessions 1-2 for simpler demonstrations
- **Complexity**: Beginner

## Laravel Vue Todo Applications

### **jasco-b/laravel-vue-todo** (Recommended Simple Example)
- **GitHub**: https://github.com/jasco-b/laravel-vue-todo
- **Tech Stack**: Laravel + Vue.js + JWT Authentication
- **Special Features**: 
  - JWT auth system
  - Complete API endpoints (login, logout, profile)
  - Test coverage included
- **Best For**: Session 2 (project initialization) - simpler than e-commerce
- **Complexity**: Beginner to Intermediate

### **aalhommada/Laravel-vue-todolist**
- **GitHub**: https://github.com/aalhommada/Laravel-vue-todolist
- **Tech Stack**: Laravel 8 + Vue 3
- **Special Features**: 
  - Modern framework versions
  - Clean API separation
- **Best For**: Quick demos, modern stack examples
- **Complexity**: Beginner

### **abbasali/laravel-vue-todolist**
- **GitHub**: https://github.com/abbasali/laravel-vue-todolist
- **Tech Stack**: Laravel + Vue.js
- **Special Features**: 
  - Tutorial-focused
  - Educational approach
- **Best For**: Learning-focused sessions
- **Complexity**: Beginner

## Laravel React Alternatives (Previous Research)

### **easylearningbd/react-ecommerce-with-laravel**
- **GitHub**: https://github.com/easylearningbd/react-ecommerce-with-laravel
- **Tech Stack**: Laravel + React + Laravel Sanctum
- **Special Features**: 
  - Laravel Sanctum authentication
  - Admin dashboard
  - Updated May 2024
- **Best For**: If we need React examples instead of Vue
- **Complexity**: Intermediate

### **nabidam/laravel-react-todo**
- **GitHub**: https://github.com/nabidam/laravel-react-todo
- **Tech Stack**: Laravel + React
- **Special Features**: Simple implementation
- **Best For**: Basic React + Laravel demonstrations
- **Complexity**: Beginner

## Selection Criteria for Training Projects

### Ideal Training Project Characteristics:
1. **Relatable Features**: E-commerce (shopping cart, checkout) vs abstract concepts
2. **Full-Stack**: Shows both backend and frontend clearly
3. **Beginner-Friendly**: Good documentation, clear code structure
4. **Recently Updated**: Active maintenance, modern framework versions
5. **Educational Focus**: Created for learning, not just production use
6. **Appropriate Complexity**: Complex enough to be realistic, simple enough to understand

### When to Use Different Projects:

#### **Session 1** (Introduction)
- Primary: laravel-vue-ecommerce (familiar e-commerce concepts)
- Alternative: laravel-vue-todo (for simpler intro if audience prefers)

#### **Session 2** (Project Setup)  
- Primary: laravel-vue-ecommerce (show real project structure)
- Alternative: laravel-vue-todo (less overwhelming for first-time setup)

#### **Session 3** (Sub-agents)
- Primary: laravel-vue-ecommerce (rich variety of components to explain)
- Alternative: Jordan-Bianco/Ecommerce (modern patterns, TDD examples)

#### **Session 4** (Documentation)
- Primary: laravel-vue-ecommerce (complex enough for good docs)
- Alternative: Any project with substantial business logic

#### **Session 5** (MCP Servers)
- Primary: laravel-vue-ecommerce (good baseline)
- Alternative: DevAmirul/Laravel-Vue-SPA-Ecommerce (enterprise complexity)

## Quick Setup Commands

### For Primary Project (DDEV - Recommended):
```bash
cd examples/laravel-vue-ecommerce
ddev start                    # Start containers
ddev start-dev               # Start development servers
# Access at URLs listed above
```

### For Primary Project (Manual Setup):
```bash
cd examples/laravel-vue-ecommerce  
composer install
npm install
cd backend && npm install && cd ..
cp .env.example .env
php artisan key:generate
php artisan migrate:fresh --seed
npm run dev                  # Terminal 1
cd backend && npm run dev    # Terminal 2  
```

### To Add Additional Examples:
```bash
# If we need the React version
git clone https://github.com/easylearningbd/react-ecommerce-with-laravel.git examples/laravel-react-ecommerce

# If we need a simple todo app  
git clone https://github.com/jasco-b/laravel-vue-todo.git examples/laravel-vue-todo

# If we need enterprise complexity
git clone https://github.com/DevAmirul/Laravel-Vue-SPA-Ecommerce.git examples/laravel-vue-spa-ecommerce
```