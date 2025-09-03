# Commit and Push Changes

Create a conventional commit with all current changes and push to the remote repository.

## Steps

1. Run `git status` to see all changes
2. Run `git diff` to review the changes
3. Analyze the changes and determine the appropriate conventional commit type from the list below
4. Stage all changes with `git add -A`
5. Create a conventional commit with a descriptive message
6. Push to the current branch with `git push`

Remember: This project follows Conventional Commits specification. Do NOT add co-authors to the commit message.

## Best Practices for Commits

- **Verify before committing**: Ensure code is linted, builds correctly, and documentation is updated
- **Atomic commits**: Each commit should contain related changes that serve a single purpose
- **Split large changes**: If changes touch multiple concerns, split them into separate commits
- **Imperative mood**: Use imperative mood ("Fix", "Add", "Update" not "Fixed", "Added", "Updated")  
- **Concise first line**: Keep the first line under 72 characters
- **Reference functionality**: Focus on specific functionality, not implementation details
- **Optional longer description**: Add detailed explanation on subsequent lines if needed
- **Standard commit types**: While not required in the main format, you can reference these types:
    - ✨ `feat`: New feature
    - 🐛 `fix`: Bug fix
    - 📝 `docs`: Documentation
    - 💄 `style`: Formatting/style
    - ♻️ `refactor`: Code refactoring
    - ⚡️ `perf`: Performance improvements
    - ✅ `test`: Tests
    - 🔧 `chore`: Tooling, configuration
    - 🚀 `ci`: CI/CD improvements
    - 🗑️ `revert`: Reverting changes
    - 🧪 `test`: Add a failing test
    - 🚨 `fix`: Fix compiler/linter warnings
    - 🔒️ `fix`: Fix security issues
    - 👥 `chore`: Add or update contributors
    - 🚚 `refactor`: Move or rename resources
    - 🏗️ `refactor`: Make architectural changes
    - 🔀 `chore`: Merge branches
    - 📦️ `chore`: Add or update compiled files or packages
    - ➕ `chore`: Add a dependency
    - ➖ `chore`: Remove a dependency
    - 🌱 `chore`: Add or update seed files
    - 🧑‍💻 `chore`: Improve developer experience
    - 🧵 `feat`: Add or update code related to multithreading or concurrency
    - 🔍️ `feat`: Improve SEO
    - 🏷️ `feat`: Add or update types
    - 💬 `feat`: Add or update text and literals
    - 🌐 `feat`: Internationalization and localization
    - 👔 `feat`: Add or update business logic
    - 📱 `feat`: Work on responsive design
    - 🚸 `feat`: Improve user experience / usability
    - 🩹 `fix`: Simple fix for a non-critical issue
    - 🥅 `fix`: Catch errors
    - 👽️ `fix`: Update code due to external API changes
    - 🔥 `fix`: Remove code or files
    - 🎨 `style`: Improve structure/format of the code
    - 🚑️ `fix`: Critical hotfix
    - 🎉 `chore`: Begin a project
    - 🔖 `chore`: Release/Version tags
    - 🚧 `wip`: Work in progress
    - 💚 `fix`: Fix CI build
    - 📌 `chore`: Pin dependencies to specific versions
    - 👷 `ci`: Add or update CI build system
    - 📈 `feat`: Add or update analytics or tracking code
    - ✏️ `fix`: Fix typos
    - ⏪️ `revert`: Revert changes
    - 📄 `chore`: Add or update license
    - 💥 `feat`: Introduce breaking changes
    - 🍱 `assets`: Add or update assets
    - ♿️ `feat`: Improve accessibility
    - 💡 `docs`: Add or update comments in source code
    - 🗃️ `db`: Perform database related changes
    - 🔊 `feat`: Add or update logs
    - 🔇 `fix`: Remove logs
    - 🤡 `test`: Mock things
    - 🥚 `feat`: Add or update an easter egg
    - 🙈 `chore`: Add or update .gitignore file
    - 📸 `test`: Add or update snapshots
    - ⚗️ `experiment`: Perform experiments
    - 🚩 `feat`: Add, update, or remove feature flags
    - 💫 `ui`: Add or update animations and transitions
    - ⚰️ `refactor`: Remove dead code
    - 🦺 `feat`: Add or update code related to validation
    - ✈️ `feat`: Improve offline support

## Guidelines for Splitting Commits

When analyzing the diff, consider splitting commits based on these criteria:

1. **Different concerns**: Changes to unrelated parts of the codebase
2. **Different types of changes**: Mixing features, fixes, refactoring, etc.
3. **File patterns**: Changes to different types of files (e.g., source code vs documentation)
4. **Logical grouping**: Changes that would be easier to understand or review separately
5. **Size**: Very large changes that would be clearer if broken down

## Examples

Good commit messages:
- Add user authentication system
- Fix memory leak in rendering process
- Update API documentation with new endpoints
- Refactor error handling logic in parser
- Resolve linter warnings in component files
- Improve developer tooling setup process
- Implement business logic for transaction validation
- Fix styling inconsistency in header
- Patch critical security vulnerability in auth flow
- Reorganize component structure for better readability
- Remove deprecated legacy code
- Add input validation for user registration form
- Fix failing CI pipeline tests
- Implement analytics tracking for user engagement
- Strengthen authentication password requirements
- Improve form accessibility for screen readers

Example of splitting commits:
- First commit: Add new version type definitions
- Second commit: Update documentation for new versions
- Third commit: Update package.json dependencies
- Fourth commit: Add type definitions for new API endpoints
- Fifth commit: Improve concurrency handling in worker threads
- Sixth commit: Resolve linting issues in new code
- Seventh commit: Add unit tests for new version features
- Eighth commit: Update dependencies with security vulnerabilities

## Command Options

- `--no-verify`: Skip running the pre-commit checks (lint, build, etc.)

## Additional Notes for Project

- Code style must pass PHP CodeSniffer checks (`composer cs-check`) before committing
- Use atomic commits that serve a single purpose
- Focus commit messages on functionality changes, not technical implementation details
