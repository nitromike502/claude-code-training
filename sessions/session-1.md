# Session 1: What is Claude Code & Getting Started

**Length:** 35-40 minutes (expanded to include comprehensive setup)  
**Goal:** Attendees will understand Claude Code's purpose and be able to successfully set up and start using it with their own projects.  
**Core Concepts:** Overview, Project Setup, Getting Started, Core Features, Practical Applications

## Agenda

### 1. (2 min) Introduction: The "Black Box" Problem
Start by acknowledging the common challenge: for non-developers, a project's codebase can feel like an intimidating, inaccessible "black box."

### 2. (3 min) What is Claude Code? Your Personal Project Translator
- Explain Claude Code not as a "coding" tool, but as an **AI assistant that has read and understood the entire project.**
- **Analogy:** It's like having a friendly junior developer sitting next to you, ready to answer questions, summarize complex parts, and write notes for you.

### 3. (3 min) Project Setup Fundamentals
Let's get Claude Code working with your specific project - it's easier than you think!

#### What Claude Code Needs to Work
- **A project folder:** Any folder containing code files (doesn't need to be perfect or complete)
- **File access:** Claude needs to read your project files to understand the structure
- **Terminal access:** A way to type commands (we'll show you exactly how)
- **Internet connection:** Claude Code connects to AI services to provide insights

#### Understanding Your Project Structure
- **What counts as a project?** Any folder with code files, documentation, or configuration
- **Common project types:** Web applications, mobile apps, data analysis scripts, documentation sites
- **Project indicators:** Files like `package.json`, `requirements.txt`, `README.md`, or folders like `src/`, `app/`
- **Don't worry about complexity:** Claude Code works with everything from simple scripts to enterprise applications

#### Pre-Setup Checklist (30 seconds)
- **Locate your project:** Find the main folder containing your project files
- **Note the path:** Remember where your project folder is located on your computer
- **Check permissions:** Ensure you can open and read files in the project folder
- **Have Claude Code installed:** Your IT team or developer should have provided access

### 4. (8 min) Complete Setup Walkthrough
Step-by-step guide to connecting Claude Code with your project for the first time.

#### Step 1: Navigate to Your Project (2 min)
**For Windows Users:**
- Open **Command Prompt** or **PowerShell** (search for it in Start menu)
- Type `cd` followed by your project path: `cd C:\path\to\your\project`
- **Example:** `cd C:\Users\YourName\Documents\MyProject`
- Press Enter - you should see your project path in the prompt

**For Mac Users:**
- Open **Terminal** (find it in Applications > Utilities)
- Type `cd` followed by your project path: `cd /path/to/your/project`
- **Example:** `cd /Users/YourName/Documents/MyProject`
- Press Enter - you should see your project path in the prompt

**Alternative: Drag and Drop Method**
- Open Terminal/Command Prompt
- Type `cd ` (with a space after cd)
- Drag your project folder from Finder/File Explorer into the terminal
- Press Enter

#### Step 2: First Claude Code Launch (3 min)
**The Moment of Truth:**
- Simply type: `claude`
- Press Enter
- **What happens next:** Claude Code will:
  - Scan your project files (this may take 10-30 seconds)
  - Build understanding of your project structure
  - Present you with a friendly greeting and prompt

**First-Time Experience:**
- **Initial scan:** "Reading project files..." (be patient, this is normal)
- **Success indicator:** You'll see a prompt like `Claude Code > ` 
- **Ready to use:** When you see the prompt, Claude has understood your project

**What Claude Code Discovers:**
- **File structure:** All directories, files, and organization
- **Technology stack:** Programming languages, frameworks, libraries
- **Project purpose:** Based on README files, comments, and code patterns
- **Dependencies:** External libraries and services your project uses

#### Step 3: Verify Everything Works (3 min)
**Test with Simple Questions:**
- `"Give me an overview of this project"`
- `"What programming languages are used here?"`
- `"What are the main components of this application?"`

**Success Indicators:**
- **Detailed responses:** Claude provides specific information about your project
- **Accurate technology identification:** Correctly identifies your programming languages
- **Structure understanding:** Can explain how your project is organized
- **Contextual answers:** Responses make sense for your specific project

**If Something's Wrong:**
- **Generic responses:** Claude might not be reading your project correctly
- **"I don't see any files" message:** Navigation or permission issue  
- **Error messages:** Check your project path and file permissions

#### Troubleshooting Common Setup Issues (Quick Reference)
**Problem: "Command 'claude' not found"**
- **Solution:** Claude Code not installed - contact your IT team or developer
- **Workaround:** Ask your technical team to install Claude Code for you

**Problem: "Permission denied" or "Access denied"**
- **Cause:** Your user account can't read the project files
- **Solution:** Ask your IT team to check file permissions for the project folder
- **Quick test:** Can you open and view files in the project folder normally?

**Problem: Claude gives very generic answers**
- **Cause:** You might not be in the right directory
- **Solution:** Double-check you're in your project folder with `pwd` (Mac) or `cd` (Windows)
- **Test:** Look for project-specific files in your current directory

**Problem: "No project files found"**
- **Cause:** Empty folder or Claude can't see your files
- **Solution:** Verify your project folder contains code files (.js, .py, .php, etc.)
- **Check:** Use `ls` (Mac) or `dir` (Windows) to list files in current directory

**Problem: Claude takes too long to start**
- **Cause:** Large project with many files
- **Normal behavior:** First run can take 30-60 seconds for big projects
- **Be patient:** Subsequent runs will be much faster

### 5. (7 min) Getting Started Essentials
Now that Claude Code is connected to your project, let's learn how to use it effectively!

#### CLI Basics: It's Just Like Having a Conversation
- **What is CLI?** Think of it as texting with an AI assistant that knows your project
- **No scary commands:** Just type `claude` and start asking questions in plain English
- **Navigation:** Use arrow keys to recall previous questions (like message history)
- **Analogy:** Like chatting with a knowledgeable coworker who's read all your project files

#### Advanced Starting Options
- **Simple start:** `claude` (opens interactive mode)
- **Quick question:** `claude "explain this project"` (ask and exit)
- **Continue conversation:** `claude -c` (resume previous session)
- **Choose model:** `claude --model sonnet` (select specific AI model)

#### Understanding Interactive Mode
- **Conversational:** Ask follow-up questions naturally
- **Memory:** Claude remembers your conversation within each session
- **Multiline input:** Use `\` + Enter for longer questions or paste in content
- **Quick shortcuts:** 
  - Up/Down arrows: Browse previous questions
  - `/help`: Get assistance anytime
  - `Ctrl+L`: Clear screen but keep conversation
  - Double-press Escape: Edit your previous message

### 6. (8 min) Core Features You'll Use Daily
Now that you're set up, here's what you can do with Claude Code every day.

#### Built-in Slash Commands: Your Power Tools
Commands that start with `/` give you special functionality:
- **`/help`** - Get assistance anytime you're stuck
- **`/config`** - Customize Claude's behavior for your needs
- **`/clear`** - Start fresh while keeping your session
- **`/terminal-setup`** - Optimize your terminal experience
- **Analogy:** Like right-clicking in Microsoft Word to access special menus

#### Ask Questions in Plain English
**Examples for non-technical users:**
- `"Give me an overview of this project"`
- `"What does the user login process look like?"`
- `"Explain this error message in simple terms"`
- No special syntax needed - just ask naturally like you're talking to a colleague

#### Understanding Project Structure
**Examples:**
- `"What are the key components of this application?"`
- `"Show me the main data models"`
- `"How is this project organized?"`
- Perfect for getting oriented in a new project or understanding scope

#### Documentation Support
**Examples:**
- `"Find functions that need better documentation"`
- `"Help me write a user guide for this feature"`
- `"Summarize recent changes for a project update"`
- Great for creating clear documentation that bridges technical and business teams

#### Getting Context for Meetings
**Examples:**
- `"Summarize what changed in the authentication system"`
- `"Explain the impact of these database changes"`
- `"What should I know about this new feature for our demo?"`
- Helps you stay informed and contribute meaningfully to technical discussions

### 7. (5 min) Three Things You Can Do Today

#### Thinking About Document Structure for Your Project
**What Claude helps you consider:**
- `"What documentation does this project need?"`
- `"How should I organize our user guides and technical specs?"`
- `"What's missing from our current documentation?"`
- **Business value:** Ensures your project is accessible to all team members and stakeholders

#### Keeping Documentation Current
**Examples:**
- `"Check if our API documentation matches the current code"`
- `"Update the user guide to reflect recent changes"`
- `"Flag outdated references in our project docs"`
- **Business value:** Prevents confusion and reduces support requests

#### Managing References Within Documents
**Examples:**
- `"Find all places where we mention the login process"`
- `"Update links to moved files in our documentation"`
- `"Ensure our troubleshooting guide references current error messages"`
- **Business value:** Maintains accurate, trustworthy documentation

### 8. (2 min) Wrap-up & What's Next
Recap the key benefit: Claude Code makes projects transparent and accessible to everyone, while helping maintain high-quality documentation. In the next session, we'll dive deeper into project setup and initialization with real examples.

## Role-Specific Quick Wins

### Project Manager
- **Use Case:** Get project scope insights without interrupting developers
- **Example:** `"What major components would be affected by adding a loyalty program?"`
- **Value:** Make informed decisions about timelines and resource allocation

### QA Tester  
- **Use Case:** Write more effective bug reports with specific context
- **Example:** `"Where are payment validation errors handled?"`
- **Value:** Help developers locate and fix issues faster

### Technical Writer
- **Use Case:** Understand complex workflows to create accurate documentation
- **Example:** `"Walk me through the complete user registration process"`
- **Value:** Create documentation that matches how the system actually works

## Q&A Preparation

**"Is this going to change my files?"**  
Answer: Not unless you explicitly ask it to and confirm. Claude Code is primarily for reading and understanding, not modifying.

**"Is it watching me work?"**  
Answer: No, it's a tool you actively use. It only analyzes the code when you ask it to.

**"Will this work with our Laravel projects?"**  
Answer: Yes! Claude Code works excellently with Laravel backend code, Vue.js frontend components, and full-stack applications.

**"Can it handle Vue.js components and PHP controllers equally well?"**  
Answer: Absolutely. Claude Code understands the relationships between your Laravel API endpoints and Vue.js components that consume them.

**"What about database migrations and frontend state management?"**  
Answer: Claude Code can explain database schema changes, migration files, Vuex/Pinia state management, and how data flows through your entire application stack.

## Live Demo Setup

### Recommended Project: Laravel Vue.js E-commerce
Use the included example project: `examples/laravel-vue-ecommerce/`
- **Why this project:** Real-world e-commerce features that non-technical attendees can relate to
- **Demo environment:** Fully functional with sample data

### Demo Flow: Complete Setup & Real Value in 15 Minutes

#### 0. Pre-Demo Setup Verification (2 min)
- **Presenter preparation:** Ensure example project is accessible
- **Environment check:** Verify Claude Code works in demo environment
- **Audience setup:** Have attendees identify their own project folders (optional)
- **Expectations:** "You'll see the complete process from zero to productive use"

#### 1. Live Project Setup (5 min)
**Show the Complete Process:**
- **Navigate to project:** Demonstrate `cd` command with drag-and-drop method
- **First launch:** Type `claude` and show the project scanning process
- **Explain what's happening:** "Claude is reading and understanding all project files"
- **Success confirmation:** Show the prompt and explain ready-to-use indicators

**Setup Narration:**
- "This is exactly what you'll do with your own projects"
- "Notice how Claude scans the files - this happens once per project"
- "The prompt appearing means Claude has understood your project structure"
- "Now I can ask questions about this specific e-commerce application"

#### 2. Project Understanding (3 min)
- **First question:** `"Give me an overview of this e-commerce project"`
- **Follow-up:** `"What technologies are being used here?"`
- **Show memory:** Reference previous answer in next question

#### 3. Understanding Project Structure (3 min)
- `"What are the main features of this application?"`
- `"How is customer data organized?"`
- `"What payment methods are supported?"`

#### 4. Documentation Support (2 min)  
- `"Help me write a user guide for the checkout process"`
- `"What should I document about the admin panel?"`
- `"Explain the order management workflow"`

#### 5. Getting Context for Business Discussions (2 min)
- `"What would be involved in adding a loyalty program?"`
- `"How complex would it be to add new payment methods?"`
- `"What reporting features are currently available?"`

### Pro Demo Tips
- **Show the complete journey:** Start with terminal navigation, end with productive use
- **Narrate the setup process:** Explain each step as you do it
- **Address common fears:** "See how easy this is?" "No complex installation needed"
- **Demonstrate conversation flow:** Use arrow keys, show command history
- **Include setup troubleshooting:** Show what to do if something goes wrong
- **Connect to their projects:** "This is exactly what you'll do with your own code"
- **Emphasize the magic moment:** When Claude gives its first project-specific answer

## Key Takeaways
- **Simple Setup:** Claude Code requires no complex installation - just navigate to your project and type `claude`
- **Immediate Project Understanding:** Claude automatically reads and comprehends your entire codebase
- **Accessibility:** Makes any project readable and understandable to non-technical team members
- **Practical Troubleshooting:** Common setup issues have simple solutions
- **Immediate Value:** Start getting insights from day one with natural language questions
- **Documentation Support:** Helps plan, create, and maintain project documentation
- **Better Collaboration:** Enables informed participation in technical discussions without interrupting developers
- **No Technical Skills Required:** If you can navigate to a folder and ask a question, you can use Claude Code