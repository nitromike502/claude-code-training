# Session 5: Meet the Sub-Agents (Claude Code's "Modes")

**Length:** 20 minutes  
**Goal:** Attendees will understand the key sub-agents and know when to use `@explain`, `@docu`, and `@find` to get better, more focused results.  
**Core Concepts:** Sub-Agents  

## Agenda

### 1. (2 min) Intro: Using the Right Tool for the Job
"You can ask Claude general questions, but you get superpowers when you talk to its specialists. These are called Sub-Agents."

Think of it like calling different departments in a company:
- General inquiries → Main reception  
- Technical explanations → Engineering department (`@explain`)
- Documentation needs → Technical writing team (`@docu`)  
- Finding specific code → IT support (`@find`)

### 2. (5 min) The Translator: `@explain`

#### Purpose
To translate code or technical concepts into plain English.

#### Use Case for Non-Devs
A Project Manager gets a link to a code file from a developer. They can use `@explain` to get a summary without having to ask the developer and interrupt them.

#### Laravel Vue.js E-commerce Examples
```bash
# Understanding backend logic
claude-code @explain app/Http/Controllers/ProductController.php --level=simple

# Understanding frontend components  
claude-code @explain backend/src/views/Products.vue --level=simple

# Understanding database relationships
claude-code @explain app/Models/Order.php --level=business
```

#### Sample Output for ProductController
```
The ProductController handles all product-related operations for the e-commerce site:

🛍️ **What it does:**
- Shows product listings to customers
- Handles product search and filtering  
- Manages product details pages
- Controls inventory checking

🔧 **Key functions:**
- index() - Gets all products for the main shop page
- show() - Gets details for a specific product
- search() - Finds products based on customer searches
- checkStock() - Verifies if items are available

This controller connects your product database to what customers see on the website.
```

#### Different Levels Available
- `--level=simple` - For non-technical stakeholders
- `--level=business` - Focus on business logic and user impact  
- `--level=technical` - For developers (default)

### 3. (5 min) The Librarian: `@docu`

#### Purpose
To create documentation from code.

#### Use Case for Non-Devs  
A Technical Writer needs to write the user manual for a new feature. They can use `@docu` to generate a first draft of the technical description.

#### Laravel Vue.js E-commerce Examples
```bash
# Document the checkout process
claude-code @docu backend/src/views/Checkout.vue --style=user-guide

# Document API endpoints for integrations
claude-code @docu routes/api.php --style=api-reference

# Document the entire shopping cart feature
claude-code @docu app/Http/Controllers/CartController.php backend/src/components/ShoppingCart.vue --style=feature-overview
```

#### Sample Output for Checkout Component
```markdown
# Checkout Process Documentation

## Overview
The checkout component handles the final step of the customer purchase journey.

## User Flow
1. Customer reviews their cart items
2. Enters shipping address
3. Selects payment method  
4. Confirms order details
5. Completes purchase

## Features
- **Address validation** - Ensures shipping details are complete
- **Payment processing** - Secure payment via Stripe/PayPal
- **Order confirmation** - Email receipt and order tracking
- **Inventory check** - Final verification items are still available

## Error Handling
- Invalid addresses show helpful error messages
- Payment failures redirect to retry page
- Out of stock items are removed with notification
```

### 4. (5 min) The Detective: `@find`

#### Purpose
To locate specific pieces of functionality across your entire codebase.

#### Use Case for Non-Devs
A QA Tester is trying to find where an error message like "Invalid payment method" is generated so they can write a better bug report.

#### Laravel Vue.js E-commerce Examples
```bash
# Find error messages
claude-code @find "Invalid payment method"

# Find where email notifications are sent
claude-code @find "order confirmation email"

# Find authentication-related code
claude-code @find "user registration" --type=function

# Find database queries for specific features
claude-code @find "product search" --include-sql
```

#### Sample Output for Payment Error
```
Found "Invalid payment method" in 3 locations:

📍 **Backend Validation**
   File: app/Http/Requests/CheckoutRequest.php:45
   Context: Validates payment method selection
   
📍 **Frontend Error Display**  
   File: backend/src/views/PaymentForm.vue:78
   Context: Shows error message to user
   
📍 **API Response**
   File: app/Http/Controllers/PaymentController.php:112
   Context: Returns error when payment method fails validation

💡 **For QA Testing:** Test invalid payment scenarios at checkout step 3
```

### 5. (3 min) Wrap-up
Recap the three main sub-agents and their roles. Emphasize that using them is the key to getting great results.

**Quick Reference Card:**
- `@explain` - "What does this code do?" (in plain English)
- `@docu` - "Create documentation for this feature"  
- `@find` - "Where is this functionality located?"

## Role-Specific Workflows

### Project Manager Workflow
1. Developer mentions working on "cart abandonment feature"
2. PM uses: `@explain app/Http/Controllers/CartController.php --level=business`
3. PM gets business context to update project timeline
4. PM uses: `@find "cart abandonment" --type=feature` to see full scope

### QA Tester Workflow  
1. Bug report: "Checkout fails with cryptic error"
2. QA uses: `@find "checkout" --type=error` to locate error handling
3. QA uses: `@explain backend/src/views/Checkout.vue --level=simple` to understand flow
4. QA writes detailed bug report with exact file locations

### Technical Writer Workflow
1. Need to document new product search feature
2. Writer uses: `@find "product search" --type=feature` to find all related code
3. Writer uses: `@docu` on each component to generate initial drafts
4. Writer combines outputs into comprehensive user documentation

## Advanced Tips

### Combining Sub-Agents
```bash
# First find the feature
claude-code @find "user registration"

# Then explain specific files found
claude-code @explain app/Http/Controllers/Auth/RegisterController.php --level=simple

# Finally document the complete process  
claude-code @docu app/Http/Controllers/Auth/RegisterController.php backend/src/views/Register.vue --style=user-guide
```

## Q&A Preparation

**"Are there other sub-agents?"**  
Answer: Yes, there are more advanced ones like `@test` and `@refactor` that developers use, but these three are your main toolkit for understanding and documenting projects.

**"Can I use multiple sub-agents together?"**  
Answer: Absolutely! A common workflow is `@find` → `@explain` → `@docu` to locate, understand, then document features.

**"What if the sub-agent doesn't find what I'm looking for?"**  
Answer: Try different search terms, or ask a general question first to get oriented, then use the specific sub-agent.

**"Do these work with both Laravel and Vue.js code?"**  
Answer: Yes! All sub-agents understand both backend PHP and frontend JavaScript, and can explain how they work together.

## Key Takeaways
- Sub-agents are specialized tools for specific tasks
- `@explain` translates technical code into business language  
- `@docu` creates professional documentation from code
- `@find` locates functionality across your entire Laravel Vue.js application
- Using the right sub-agent gets you better, more focused results
- These tools work seamlessly across full-stack applications