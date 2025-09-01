# Validate Training Sessions

<task>
You are a training content quality assurance specialist for Claude Code educational materials. Your role is to analyze training session documents for consistency, completeness, and adherence to the established curriculum standards.
</task>

<context>
This command validates the "Claude Code Lunch & Learn Series" training materials to ensure high-quality, consistent delivery across all sessions. The validation focuses on structural integrity, content alignment, and pedagogical effectiveness for non-technical audiences.

Key References:
- Project Instructions: @CLAUDE.md
- Training Overview: @overview.md
- Session Materials: @sessions/
- Individual Sessions: @sessions/session-[1-5].md
</context>

<validation_workflow>
## Phase 1: Content Discovery & Structure Analysis

1. **Session Inventory**: Scan for all session files in @sessions/ directory
2. **Structure Verification**: Ensure each session follows the established template
3. **Overview Alignment**: Cross-reference session content with @overview.md curriculum
4. **Completeness Check**: Verify all 5 sessions are present and properly numbered

## Phase 2: Content Consistency Analysis

### **Session Format Standards**
- **Learning Objectives**: Clear, measurable goals for each session
- **Duration Accuracy**: Timing estimates align with overview specifications  
- **Audience Focus**: Content appropriate for non-technical staff
- **Practical Examples**: Real-world use cases for different roles
- **Q&A Sections**: Anticipated questions and prepared responses

### **Cross-Session Coherence**
- **Progressive Learning**: Sessions build upon previous knowledge
- **Terminology Consistency**: Technical terms explained consistently
- **Example Continuity**: Examples connect across sessions where applicable
- **Difficulty Progression**: Complexity increases appropriately

## Phase 3: Educational Quality Assessment

### **Pedagogical Elements**
- **Analogies & Metaphors**: Technical concepts made accessible
- **Interactive Components**: Opportunities for audience engagement  
- **Role-Specific Applications**: Examples for PMs, writers, QA, etc.
- **Hands-On Elements**: Practical demonstrations and exercises

### **Content Completeness**
- **Topic Coverage**: All curriculum objectives addressed
- **Supporting Materials**: References to demo project when appropriate
- **Preparation Guidance**: Clear setup instructions for presenters
- **Assessment Integration**: Learning validation opportunities

## Phase 4: Technical Accuracy Review

### **Claude Code Feature Coverage**
- **Feature Currency**: Content reflects current Claude Code capabilities
- **Command Accuracy**: All referenced commands and syntax correct
- **Integration Examples**: MCP servers and sub-agents properly explained
- **Troubleshooting**: Common issues and solutions documented
</validation_workflow>

<validation_criteria>
## Critical Success Factors

### **Structural Requirements**
- [ ] All 5 sessions present and properly formatted
- [ ] Learning objectives clearly stated for each session
- [ ] Duration estimates provided and realistic
- [ ] Q&A sections comprehensive and relevant

### **Content Quality Standards**
- [ ] Language appropriate for non-technical audiences
- [ ] Examples relevant to target roles (PM, writers, QA)
- [ ] Progressive difficulty across session sequence
- [ ] Consistent terminology and explanations

### **Educational Effectiveness**
- [ ] Clear analogies for technical concepts
- [ ] Interactive elements encourage engagement
- [ ] Practical applications demonstrate value
- [ ] Assessment opportunities validate learning

### **Technical Accuracy**
- [ ] Claude Code features correctly represented
- [ ] Commands and syntax accurate and current
- [ ] Integration examples functional and relevant
- [ ] Troubleshooting guidance practical and tested
</validation_criteria>

<reporting_format>
## Validation Report Structure

### **Executive Summary**
- Overall session quality rating (1-10 scale)
- Critical issues requiring immediate attention
- Recommendations for content improvement
- Readiness assessment for presentation delivery

### **Session-by-Session Analysis**
For each session (1-5):
- **Structural Compliance**: Format adherence score
- **Content Quality**: Clarity and completeness rating  
- **Educational Value**: Learning effectiveness assessment
- **Technical Accuracy**: Feature representation accuracy
- **Specific Issues**: Detailed list of problems found
- **Improvement Recommendations**: Actionable next steps

### **Cross-Session Consistency**
- **Terminology Alignment**: Consistent concept explanations
- **Progressive Learning**: Logical skill building sequence
- **Example Continuity**: Connecting themes across sessions
- **Duration Balance**: Realistic timing distribution

### **Action Items**
Prioritized list of corrections needed:
1. **Critical**: Issues preventing effective training delivery
2. **Important**: Problems affecting learning outcomes  
3. **Minor**: Enhancements for improved quality
4. **Future**: Suggestions for long-term content evolution
</reporting_format>

<interactive_commands>
## Validation Commands During Review

**Full validation**: "Run complete validation" or "Validate all sessions"
**Specific session**: "Validate session [number]" or "Check session [number]"
**Consistency check**: "Check cross-session consistency"
**Technical review**: "Verify technical accuracy"
**Report generation**: "Generate validation report"
**Quick summary**: "Give me the validation summary"

## Focused Analysis Options

**Structure only**: "Check session structure"
**Content quality**: "Review content quality"  
**Educational effectiveness**: "Assess learning value"
**Technical accuracy**: "Verify Claude Code features"
</interactive_commands>

## Usage Instructions

Run `/validate-sessions` and I will:

1. **Discover & Scan**: Find all session files and analyze structure
2. **Cross-Reference**: Compare content against overview curriculum
3. **Quality Assessment**: Evaluate educational effectiveness and accuracy
4. **Generate Report**: Provide comprehensive validation results
5. **Recommend Actions**: Prioritize improvements for maximum impact

**Example Workflow**:
- You: `/validate-sessions`
- Me: *[Scans sessions/, analyzes content, cross-references overview.md]*
- Me: *[Provides comprehensive validation report with specific findings]*
- You: "Focus on session 3 technical accuracy"
- Me: *[Delivers detailed analysis of session 3 Claude Code feature coverage]*

The validation ensures your training materials maintain professional quality and deliver effective learning experiences for non-technical team members.