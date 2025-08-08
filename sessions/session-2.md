# Session 2: Pointing Claude at Your Project

**Length:** 20 minutes  
**Goal:** Attendees will learn how to initialize Claude Code on an existing project and understand the basic file structure it creates.  
**Core Concepts:** Getting Started, Project Initialization, the `.claude-code` directory  

## Agenda

### 1. (2 min) Recap
Last time we saw *what* Claude Code can do. Today, we'll make it work on *your* projects.

### 2. (8 min) The "Index" Command: Giving Claude a Map

#### Walk through the simplest setup process
Since it's installed, this is likely a single command in the terminal:
```bash
claude-code init
```

#### What "indexing" means in simple terms
**Analogy:** "Claude is reading every page of the book (your project) and creating a detailed index and table of contents so it can find things instantly later."

#### What happens during indexing
- Claude analyzes your Laravel controllers, models, and routes
- It reads your Vue.js components and understands component relationships
- It maps out your database migrations and API endpoints
- It creates connections between frontend and backend functionality

### 3. (8 min) What's That `.claude-code` Folder?

#### Show the hidden `.claude-code` folder that gets created
```
your-laravel-vue-project/
├── app/
├── resources/
├── database/
├── .claude-code/          ← Claude's private notebook
│   ├── index/
│   ├── analysis/
│   └── cache/
└── ...
```

#### Explain its purpose simply
"This is Claude's private notebook. It's where it keeps its analysis, summaries, and memory of your project. You don't need to touch it, but it's good to know what it is. It's safe to delete if you want to start over."

#### What gets analyzed in a Laravel Vue.js project
- **Backend Analysis:** Controllers, Models, Middleware, Routes, Database schema
- **Frontend Analysis:** Vue.js components, State management, API calls, UI flows  
- **Integration Analysis:** How frontend components call backend APIs
- **File Relationships:** Which components use which controllers, data flow patterns

### 4. (2 min) Your Turn!
Give a simple "homework" assignment: "Before the next session, run `claude-code init` in a project folder you work with."

## Project-Specific Examples

### For Laravel Vue.js E-commerce Project
When you run `claude-code init` on a Laravel Vue.js e-commerce project, Claude will:

1. **Map the shopping flow:** Understand how product listing → cart → checkout works
2. **Connect frontend to backend:** Link Vue.js components to Laravel API endpoints  
3. **Analyze authentication:** Map user registration/login across both sides
4. **Understand data flow:** How product data moves from database → API → Vue.js components

### Sample Terminal Output
```bash
$ claude-code init
✓ Scanning project structure...
✓ Analyzing Laravel controllers and models...  
✓ Indexing Vue.js components and state...
✓ Mapping API routes and endpoints...
✓ Creating project knowledge base...

Project indexed successfully! 
- 47 PHP files analyzed
- 23 Vue.js components mapped  
- 15 API endpoints documented
- 8 database tables understood

You can now ask questions about your project!
```

## Practical Examples for Different Project Types

### Small Laravel Vue.js Todo App
```bash
✓ 12 PHP files analyzed
✓ 5 Vue.js components mapped
✓ 4 API endpoints documented  
✓ 2 database tables understood
```

### Full E-commerce Application  
```bash
✓ 89 PHP files analyzed
✓ 45 Vue.js components mapped
✓ 32 API endpoints documented
✓ 15 database tables understood
```

## Q&A Preparation

**"Will this slow my computer down?"**  
Answer: The initial indexing might take a few minutes for a large project, but after that, it's very lightweight. A typical Laravel Vue.js project takes 2-3 minutes to index initially.

**"What if the code changes?"**  
Answer: You can easily ask Claude to re-index to get the latest updates with `claude-code refresh` or it can automatically detect changes in some setups.

**"Does it work with our specific Laravel version?"**  
Answer: Yes! Claude Code works with Laravel 8, 9, 10, and 11. It understands modern Laravel features like API resources, form requests, and Eloquent relationships.

**"What about our Vue.js setup - we use Vuex/Pinia?"**  
Answer: Claude Code understands all popular Vue.js patterns including Vuex, Pinia, composition API, and modern Vue 3+ features.

**"Can it handle our database migrations and seeders?"**  
Answer: Absolutely. Claude reads and understands Laravel migrations, seeders, factories, and can explain your database schema and relationships.

## Live Demo Checklist

### Before the Session
- [ ] Have a clean Laravel Vue.js project ready
- [ ] Terminal/command prompt prepared
- [ ] Make sure `claude-code` command is available  
- [ ] Internet connection for any dependencies

### During Demo
1. **Show the before state:** `ls -la` (no `.claude-code` folder)
2. **Run the init command:** `claude-code init`
3. **Show the progress indicators and final output**
4. **Show the after state:** `ls -la` (`.claude-code` folder appears)
5. **Briefly peek inside `.claude-code` folder** (don't go deep, just show it exists)

### Test Commands to Try After Init
- `@claude what is this project about?`
- `@claude list the main features of this application`
- `@claude what database tables do we have?`

## Key Takeaways
- Initialization is a one-time setup that takes just minutes
- The `.claude-code` folder is Claude's knowledge base - safe to ignore day-to-day
- Once indexed, you can immediately start asking questions about your Laravel Vue.js project
- Re-indexing is simple when your code changes
- Works with any size project from simple todos to complex e-commerce platforms