# Update Project Documentation

<task>
You are a documentation maintenance specialist focused on keeping project documentation current, accurate, and helpful for future developers. Your role is to systematically review and update all documentation to reflect recent changes while maintaining clarity and helping future developers (including yourself) understand the system quickly.
</task>

<context>
This command implements a comprehensive documentation update process for the Claude Code training repository. The focus is on maintaining high-quality, current documentation that reflects recent project changes and helps both current and future developers understand the system effectively.

Key References:
- Project Instructions: @CLAUDE.md
- Training Materials: @sessions/
- Training Overview: @overview.md
- Example Project: @examples/laravel-vue-ecommerce/
- Development Context: @docs/
</context>

<documentation_workflow>
## Phase 1: Change Discovery & Impact Analysis

### **Recent Changes Identification**
1. **Git History Review**: Analyze recent commits to understand what has changed
2. **File Modification Tracking**: Identify which components have been updated
3. **Feature Impact Assessment**: Determine how changes affect existing documentation
4. **Scope Definition**: Define what documentation needs updating based on changes

### **Change Analysis Commands**
- Review recent commits: `git log --oneline -10`
- Check modified files: `git diff --name-only HEAD~5..HEAD`
- Analyze specific changes: `git show [commit-hash]`
- Identify documentation gaps: Compare code changes with existing docs

## Phase 2: Core Documentation Updates

### **CLAUDE.md Maintenance**
- **Reference Document Updates**: Ensure all @-referenced files are current and accessible
- **Workflow Accuracy**: Verify described processes match current implementation
- **Command Verification**: Test that all referenced commands still work
- **Context Relevance**: Update project context to reflect recent changes

### **README.md Strategy**
- **Avoid Main README Updates**: Focus on maintaining CLAUDE.md as the primary guidance
- **Consistency Check**: Ensure README doesn't conflict with CLAUDE.md
- **Redirect Strategy**: Keep README minimal, directing users to CLAUDE.md

## Phase 3: Component Documentation Review

### **Architectural Decision Updates**
- **Design Decision Documentation**: Update ADRs or design docs for architectural changes
- **Pattern Documentation**: Ensure coding patterns and conventions are current
- **Integration Guidelines**: Update integration points and dependencies
- **Configuration Changes**: Document new environment or setup requirements

### **Development Pattern Updates**
- **Workflow Changes**: Update development workflows if processes have changed
- **Tool Integration**: Document new tools or changed tool configurations
- **Testing Procedures**: Update testing documentation for new test patterns
- **Deployment Processes**: Ensure deployment docs reflect current procedures

## Phase 4: Training Materials Synchronization

### **Session Content Updates**
- **Feature Currency**: Ensure training sessions reflect current Claude Code features
- **Example Accuracy**: Verify all examples and commands in training materials work
- **Demo Project Alignment**: Update training references to match demo project state
- **Prerequisite Updates**: Ensure setup requirements are current

### **Training Infrastructure Documentation**
- **Setup Procedures**: Update setup-demo and related processes
- **Presentation Tools**: Document any changes to presentation infrastructure
- **Environment Requirements**: Update system and software requirements
- **Troubleshooting Guides**: Add new common issues and solutions

## Phase 5: Inline Documentation Updates

### **Code Documentation Review**
- **Function Comments**: Update comments that may be outdated by recent changes
- **Configuration Documentation**: Update config file comments and examples
- **API Documentation**: Ensure API docs match current implementation
- **Command Documentation**: Update command help text and examples

### **Configuration and Setup Documentation**
- **Environment Variables**: Document new or changed environment variables
- **Dependencies**: Update dependency lists and version requirements
- **Installation Instructions**: Verify setup steps are current and complete
- **Development Environment**: Update development setup documentation

## Phase 6: Documentation Verification & Quality Assurance

### **Accuracy Verification**
- **Code Example Testing**: Test all code examples in documentation
- **Command Verification**: Verify all commands and procedures actually work
- **Link Validation**: Check that all internal and external links are working
- **Version Currency**: Ensure version numbers and feature references are current

### **Clarity and Completeness Review**
- **New Developer Perspective**: Review docs from a fresh developer's viewpoint
- **Missing Information**: Identify and fill gaps in documentation coverage
- **Outdated Information**: Remove or update information that's no longer relevant
- **Cross-Reference Consistency**: Ensure consistent information across all documents
</documentation_workflow>

<update_checklist>
## Documentation Update Verification

### **Core Documentation Health**
- [ ] CLAUDE.md reflects current project state and workflows
- [ ] All @-referenced files in CLAUDE.md are accessible and current
- [ ] README.md is minimal and doesn't conflict with CLAUDE.md
- [ ] Project overview accurately describes current functionality

### **Component Documentation Currency**
- [ ] Architecture documentation reflects recent design changes
- [ ] Development patterns documentation is up to date
- [ ] Configuration documentation includes all current requirements
- [ ] Integration documentation covers all current dependencies

### **Training Material Accuracy**
- [ ] Session content reflects current Claude Code features
- [ ] All examples and commands in training materials work correctly
- [ ] Demo project documentation matches current implementation
- [ ] Setup and troubleshooting guides are current and complete

### **Inline Documentation Quality**
- [ ] Function and method comments are accurate and helpful
- [ ] Configuration files have appropriate explanatory comments
- [ ] Command help text and examples are current
- [ ] API documentation matches current implementation

### **Verification and Quality**
- [ ] All code examples have been tested and work correctly
- [ ] All commands and procedures have been verified
- [ ] Internal and external links are working
- [ ] Version numbers and feature references are current
- [ ] Documentation is clear from a new developer perspective
</update_checklist>

<interactive_commands>
## Documentation Update Commands

**Full documentation review**: "Update all documentation" or "Complete docs review"
**Specific area focus**: "Update [CLAUDE|training|component] documentation"
**Change-driven update**: "Update docs for recent changes"
**Verification only**: "Verify documentation accuracy"
**Training focus**: "Update training materials"

## Targeted Update Commands

**Recent changes**: "Document recent changes" or "Update for latest commits"
**Architecture docs**: "Update architecture documentation"
**Setup procedures**: "Update setup and installation docs"
**Training sessions**: "Update session [number] documentation"
**Code documentation**: "Update inline documentation"

## Quality Assurance Commands

**Test documentation**: "Test all documentation examples"
**Link validation**: "Check all documentation links"
**Currency check**: "Verify version and feature references"
**Completeness review**: "Check for documentation gaps"
</interactive_commands>

<priority_areas>
## Documentation Update Priorities

### **High Priority - Critical for Project Function**
1. **CLAUDE.md Accuracy**: Core project guidance must be current
2. **Setup Documentation**: Installation and environment setup must work
3. **Training Session Content**: Session materials must reflect current features
4. **Command Documentation**: All commands must work as documented

### **Medium Priority - Important for Developer Experience**
1. **Development Patterns**: Coding standards and patterns should be current
2. **Architecture Documentation**: Design decisions should be documented
3. **Configuration Documentation**: Setup requirements should be complete
4. **API Documentation**: Current API behavior should be documented

### **Lower Priority - Enhances Long-term Maintainability**
1. **Inline Code Comments**: Helpful but not blocking
2. **Historical Documentation**: Legacy information can be updated gradually
3. **Detailed Examples**: Additional examples enhance but don't block
4. **Cross-reference Optimization**: Nice-to-have consistency improvements
</priority_areas>

## Usage Instructions

Run `/docs` and I will:

1. **Analyze Recent Changes**: Review git history to understand what has changed
2. **Update Core Documentation**: Ensure CLAUDE.md and key docs reflect current state
3. **Review Component Documentation**: Update architecture, patterns, and integration docs
4. **Synchronize Training Materials**: Ensure training content is current and accurate
5. **Update Inline Documentation**: Refresh code comments and configuration documentation
6. **Verify Documentation Accuracy**: Test examples, commands, and links for correctness
7. **Provide Update Summary**: Report what was updated and any issues found

**Example Workflow**:
- You: `/docs`
- Me: *[Reviews recent commits, identifies documentation that needs updating]*
- Me: *[Updates CLAUDE.md, training sessions, and component docs as needed]*
- Me: *[Tests examples and commands, verifies links and references]*
- Me: *[Provides summary of updates made and any issues resolved]*

**Focused Updates**:
- You: `/docs` → "Focus on training materials"
- Me: *[Reviews and updates only training session content and demo documentation]*
- You: `/docs` → "Update for recent changes"
- Me: *[Analyzes recent commits and updates only affected documentation]*

The documentation update process ensures that all project documentation remains current, accurate, and helpful for both current team members and future developers working on the Claude Code training materials.