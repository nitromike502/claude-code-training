# Sync Example Projects

<task>
You are a project synchronization specialist focused on maintaining consistency between the training project examples and their deployed counterparts. Your role is to ensure one-way synchronization from the source examples directory to the separate repository, maintaining file integrity while avoiding unnecessary duplication of generated content.
</task>

<context>
This command handles synchronization of the dev-session-1 example project from the training repository to the dedicated claude-code-subagents repository. The sync ensures that development work on examples remains consistent across environments without interference between the main training repo and the working code repository.

Key References:
- Project Instructions: @CLAUDE.md
- Source Directory: @examples/dev-session-1/
- Target Repository: /home/training/claude-code-subagents/
- Session Materials: @sessions/dev-session-1/
</context>

<sync_workflow>
## Phase 1: Pre-Sync Analysis & Verification

### **Environment Assessment**
1. **Source Verification**: Confirm source directory exists and contains current content
2. **Target Verification**: Ensure destination directory is accessible and is a git repository
3. **Permission Check**: Verify write permissions to destination directory
4. **Change Detection**: Identify files that have been modified since last sync

### **Exclusion Pattern Definition**
Define files and directories to exclude from sync:
- `node_modules/` - Generated dependencies, should be installed separately
- `.git/` - Git history should remain independent
- `*.log` - Temporary log files
- `dist/` or `build/` - Generated build artifacts
- `.env.local` - Environment-specific configuration

## Phase 2: Content Analysis & Preparation

### **File Categorization**
- **Core Files**: Source code, configuration, documentation
- **Generated Content**: Dependencies, build artifacts, temporary files
- **Environment Specific**: Local configurations, personal settings
- **Repository Metadata**: Git configuration, IDE settings

### **Sync Strategy Planning**
- **Preserve Existing**: Maintain destination repository's git history
- **Overwrite Strategy**: Replace source files completely for consistency
- **Selective Update**: Only sync files that have changed since last operation
- **Backup Strategy**: Capture current state before sync for recovery

## Phase 3: File Synchronization Execution

### **Core Content Sync**
```bash
# Sync essential project files
rsync -av --delete --exclude-from=.syncignore examples/dev-session-1/ /home/training/claude-code-subagents/
```

### **Exclusion Management**
Use comprehensive exclusion patterns:
- `--exclude=node_modules/`
- `--exclude=.git/`
- `--exclude=*.log`
- `--exclude=.env.local`
- `--exclude=dist/`
- `--exclude=build/`
- `--exclude=.DS_Store`

### **Permission Preservation**
- Maintain executable permissions for scripts
- Preserve directory permissions for proper access
- Handle symbolic links appropriately
- Respect file ownership where possible

## Phase 4: Post-Sync Verification & Cleanup

### **Content Verification**
- **File Count Validation**: Ensure expected number of files synced
- **Size Comparison**: Verify reasonable size differences
- **Key File Verification**: Confirm critical files are present and current
- **Structure Integrity**: Ensure directory structure is preserved

### **Dependency Management**
- **Package Installation**: Run npm install in destination if needed
- **Configuration Update**: Update any environment-specific configs
- **Permissions Check**: Verify script executability
- **Git Status**: Check git status in destination for untracked changes

## Phase 5: Sync Report & Documentation

### **Synchronization Summary**
- Files added, modified, and removed
- Size and timestamp comparisons
- Any errors or warnings encountered
- Success/failure status with details

### **Recommended Next Steps**
- Dependency installation commands if needed
- Configuration updates required
- Git operations to commit synced changes
- Testing procedures to verify functionality
</sync_workflow>

<exclusion_patterns>
## Files and Directories to Exclude

### **Generated Content (Always Exclude)**
- `node_modules/` - Package dependencies
- `dist/` - Build output
- `build/` - Compiled assets
- `.next/` - Next.js build cache
- `.cache/` - Various caching directories

### **Environment Specific (Always Exclude)**
- `.env.local` - Local environment variables
- `.env.*.local` - Environment-specific configs
- `*.log` - Log files
- `.DS_Store` - macOS metadata
- `Thumbs.db` - Windows metadata

### **Repository Metadata (Always Exclude)**
- `.git/` - Git repository data
- `.svn/` - SVN repository data
- `.hg/` - Mercurial repository data

### **Development Tools (Conditional)**
- `.vscode/` - VS Code settings (exclude user-specific)
- `.idea/` - IntelliJ settings (exclude user-specific)
- `*.swp`, `*.swo` - Vim temporary files
- `.tmp/` - Temporary directories

### **Optional Exclusions (Configuration Dependent)**
- `docs/` - May contain deployment-specific documentation
- `tests/coverage/` - Generated test coverage reports
- `*.backup` - Backup files
- `*.orig` - Merge conflict backup files
</exclusion_patterns>

<verification_checklist>
## Pre-Sync Verification

### **Source Readiness**
- [ ] Source directory exists and contains expected content
- [ ] Recent changes have been committed or saved appropriately
- [ ] No active development processes are modifying source files
- [ ] Source directory structure is as expected

### **Destination Preparation**
- [ ] Destination directory is accessible
- [ ] Destination is a valid git repository
- [ ] Current work in destination is committed or backed up
- [ ] Write permissions are available for sync operation

## Post-Sync Verification

### **Content Accuracy**
- [ ] Expected files are present in destination
- [ ] File sizes and timestamps are reasonable
- [ ] Directory structure matches source (excluding exclusions)
- [ ] No unexpected files or directories created

### **Functional Readiness**
- [ ] Key configuration files are present and valid
- [ ] Executable permissions preserved for scripts
- [ ] Package.json and dependency files are current
- [ ] Documentation files are synchronized

### **Repository Health**
- [ ] Git repository integrity maintained
- [ ] No unintended files added to git tracking
- [ ] Sync operation doesn't corrupt existing git history
- [ ] Working directory clean or has expected changes only
</verification_checklist>

<interactive_commands>
## Sync Operation Commands

**Full sync**: "Run complete sync" or "Sync everything"
**Dry run**: "Preview sync changes" or "Dry run sync"
**Selective sync**: "Sync only [file type/directory]"
**Force sync**: "Force complete sync" or "Overwrite everything"
**Status check**: "Check sync status" or "Compare directories"

## Verification Commands

**Pre-sync check**: "Verify sync readiness" or "Check before sync"
**Post-sync verify**: "Verify sync results" or "Check sync success"
**Directory compare**: "Compare source and destination"
**Git status check**: "Check git status after sync"

## Troubleshooting Commands

**Fix permissions**: "Fix file permissions" or "Correct access issues"
**Clean destination**: "Clean destination before sync"
**Backup current**: "Backup destination before sync"
**Restore backup**: "Restore from backup"
</interactive_commands>

<sync_safety>
## Safety Mechanisms

### **Pre-Sync Backup**
- Create timestamped backup of destination directory
- Store backup in safe location outside sync path
- Document backup location and timestamp
- Provide restore procedure if sync fails

### **Incremental Sync Options**
- **Full Sync**: Complete replacement of destination content
- **Modified Only**: Sync only files changed since last operation
- **New Files Only**: Add new files without replacing existing
- **Interactive Sync**: Prompt for conflicts or overwrites

### **Rollback Capabilities**
- Maintain sync operation log for troubleshooting
- Store file checksums for integrity verification
- Document changes made during sync operation
- Provide clear rollback procedure if issues occur

### **Error Handling**
- Graceful handling of permission errors
- Clear error messages with suggested solutions
- Partial sync recovery for interrupted operations
- Verification of critical file sync before completion
</sync_safety>

## Usage Instructions

Run `/sync-examples` and I will:

1. **Analyze Source & Destination**: Verify both directories and assess sync requirements
2. **Plan Sync Operation**: Determine what files need syncing and apply exclusion rules
3. **Execute Synchronization**: Perform one-way sync from examples to target repository
4. **Verify Results**: Confirm sync completed successfully and files are correct
5. **Provide Recommendations**: Suggest next steps like dependency installation or testing
6. **Document Changes**: Report what was synced and any issues encountered

**Example Workflow**:
- You: `/sync-examples`
- Me: *[Analyzes directories, plans sync with exclusions]*
- Me: *[Executes rsync with appropriate options and exclusions]*
- Me: *[Verifies sync results and provides summary of changes]*
- You: "Install dependencies in destination"
- Me: *[Runs npm install in destination directory]*

**Safety-First Approach**:
- You: `/sync-examples` → "Dry run first"
- Me: *[Shows what would be synced without making changes]*
- You: "Looks good, proceed with sync"
- Me: *[Creates backup, executes sync, verifies results]*

**Selective Sync Options**:
- You: `/sync-examples` → "Sync only documentation"
- Me: *[Syncs only .md files and documentation directories]*
- You: `/sync-examples` → "Sync code files only"
- Me: *[Syncs source code excluding documentation and config]*

The sync operation ensures your example project remains consistent across environments while maintaining the independence and integrity of both the training repository and the working code repository.