# Session 1: What is Claude Code & Getting Started

**Length:** 32-37 minutes (focused on essentials with enterprise trust and security)  
**Goal:** Attendees will understand Claude Code's purpose, feel confident about security/privacy, and be able to successfully set up and start using it with their own projects.  
**Core Concepts:** Overview, Enterprise Trust, Project Setup, Interface Essentials, Core Features, Practical Applications

## Agenda

### 1. (2 min) Introduction: The "Black Box" Problem
Start by acknowledging the common challenge: for non-developers, a project's codebase can feel like an intimidating, inaccessible "black box."

### 2. (3 min) What is Claude Code? Your Personal Project Translator
- Explain Claude Code not as a "coding" tool, but as an **AI assistant that has read and understood the entire project.**
- **Analogy:** It's like having a friendly junior developer sitting next to you, ready to answer questions, summarize complex parts, and write notes for you.

### 3. (4 min) Enterprise Trust & Security
Addressing the questions you're probably thinking: "Is this safe? What can it see? How does this work in our company?"

#### What Claude Code Can See
- **Project files only:** Claude reads files in your specified project folder - nothing else on your computer
- **No personal access:** Cannot see your emails, personal documents, browser history, or other applications
- **Read-only by default:** Won't modify any files unless you explicitly ask and confirm each change
- **Your control:** Only analyzes what you choose, when you choose

#### Data Security for Professional Use
- **Enterprise-grade security:** Built by Anthropic with professional security standards
- **No permanent storage:** Your code conversations aren't permanently stored on external servers
- **Session-based privacy:** Each conversation is independent and temporary
- **IT-friendly:** Most enterprise IT teams approve Claude Code for code analysis tasks

#### What This Means for You
- **Safe to explore:** You can ask questions and explore projects without risk
- **Transparent process:** You see exactly what Claude analyzes and when
- **Professional confidence:** Built for business use with appropriate security measures
- **Team collaboration:** Safe to discuss projects and share insights with colleagues

### 4. (3 min) Project Setup Fundamentals
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

#### Setting Realistic Expectations (2 min)
**Claude Code Works Best With:**
- Projects with clear structure and documentation
- Code files in common languages (Python, JavaScript, PHP, Java, etc.)
- Projects with README files, comments, or existing documentation
- Well-organized folder structures with logical naming

**May Need Patience With:**
- Very large projects (10,000+ files) - first launch can take 1-2 minutes
- Projects with unusual or proprietary frameworks - may need more specific questions
- Legacy codebases with minimal documentation - still helpful, but requires more exploration

**Timeline for Value:**
- **Day 1:** Basic project understanding and navigation
- **Week 1:** Comfortable asking questions and getting useful answers
- **Month 1:** Integrated into your regular workflow for project insights and documentation

### 5. (8 min) Complete Setup Walkthrough
Step-by-step guide to connecting Claude Code with your project for the first time.

#### Step 1: Navigate to Your Project (2 min)
**For Windows Users:**
- Open **Command Prompt** or **PowerShell** (search for it in Start menu)
- Type `cd` followed by your project path: `cd C:\path\to\your\project`
- **Example:** `cd C:\Users\YourName\Documents\MyProject`
- Press Enter - you should see your project path in the prompt


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


### 6. (3 min) Claude Code Interface Essentials
Quick tips to make your Claude Code experience smoother:

#### Useful Claude Code Features
- **Continue previous session:** `claude -c` (resume where you left off)
- **Navigate your history:** Up/Down arrow keys to find previous questions
- **Longer questions:** Use `\` + Enter for multi-line input or paste longer content
- **Edit your last question:** Double-press Escape to modify what you just asked
- **Just ask naturally:** No special syntax needed - talk to Claude like a colleague

### 7. (4 min) What You Can Ask Claude Code
Here's what you can do with Claude Code - we'll see these in action during our demo:

#### Built-in Commands (1 min)
Commands that start with `/` give you special functionality:
- **`/help`** - Get assistance anytime
- **`/config`** - Customize Claude's behavior  
- **`/clear`** - Start fresh while keeping your session
- **`/doctor`** - Check your Claude Code setup and diagnose issues
- **`/context`** - View or manage your current context and memory
- **`/add-dir`** - Add additional directories to your project scope
- **`/compact`** - Reduce conversation size by summarizing older messages
- **`/resume`** - Continue a previous conversation session
- **`/status`** - Show current session and project status information

#### Example Questions You Can Ask (3 min)
**Project Understanding:**
- `"Give me an overview of this project"`
- `"What are the key components of this application?"`
- `"How is this project organized?"`

**Documentation & Communication:**
- `"Help me write a user guide for this feature"`
- `"Explain this error message in simple terms"`
- `"What should I know about this new feature for our demo?"`

**Analysis & Planning:**
- `"What user workflows should we document?"`
- `"What are the main features customers interact with?"`
- `"What areas of this project need clearer explanations?"`

### 8. (3 min) Three Things You Can Do Today

#### Get Project Oriented (1 min)
- `"Give me an overview of this project"`
- `"What are the main user-facing features?"`
- `"How is this application organized?"`

#### Understand User Workflows (1 min)
- `"Walk me through the user registration process"`
- `"What happens when a customer places an order?"`
- `"How do users reset their passwords?"`

#### Plan Documentation Priorities (1 min)
- `"What user workflows should we document first?"`
- `"What parts of this system are most confusing for new users?"`
- `"What areas need clearer explanations for stakeholders?"`

### 9. (2 min) Wrap-up & What's Next
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
