"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { Button } from "@/components/ui/button";
import { CopyIcon, CheckIcon } from "lucide-react";

const promptTemplates = {
  "product-requirements": {
    title: "Product Requirements Document",
    content: `# Product Requirements Document (PRD)

## 1. Introduction
- **Product Name**: [Product Name]
- **Date**: [Current Date]
- **Version**: 1.0
- **Prepared by**: [Your Name]

## 2. Product Overview
[Brief description of the product, its purpose, and target audience]

## 3. Problem Statement
[Clear articulation of the problem this product solves]

## 4. Product Objectives
- [Objective 1]
- [Objective 2]
- [Objective 3]

## 5. User Stories
### User Type 1
- As a [user type], I want to [action] so that [benefit]
- As a [user type], I want to [action] so that [benefit]

### User Type 2
- As a [user type], I want to [action] so that [benefit]
- As a [user type], I want to [action] so that [benefit]

## 6. Requirements
### Functional Requirements
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

### Non-Functional Requirements
- Performance: [Details]
- Security: [Details]
- Usability: [Details]
- Compatibility: [Details]
- Scalability: [Details]

## 7. Technical Requirements
- Frontend: [Technologies]
- Backend: [Technologies]
- Database: [Technologies]
- Deployment: [Technologies]

## 8. Design and User Experience
[Brief description of design principles and UX goals]

## 9. Milestones and Timeline
- [Milestone 1]: [Date]
- [Milestone 2]: [Date]
- [Milestone 3]: [Date]

## 10. Success Metrics
- [Metric 1]
- [Metric 2]
- [Metric 3]

## 11. Future Considerations
[Features or improvements planned for future versions]

## 12. Appendix
[Any additional information, diagrams, or references]`
  },
  "code-style": {
    title: "Code Style Guidelines",
    content: `# Code Style Guidelines

## General Principles
- Write clean, readable, and maintainable code
- Follow the DRY (Don't Repeat Yourself) principle
- Aim for simplicity and clarity over cleverness
- Comment your code appropriately, but prefer self-documenting code
- Consistent naming conventions throughout the codebase

## Naming Conventions

### Variables
- Use meaningful, descriptive names
- camelCase for variables in JavaScript/TypeScript
- snake_case for variables in Python
- Avoid single-letter variables except for counters or coordinates

### Functions
- Use verb phrases that describe what the function does
- camelCase for function names in JavaScript/TypeScript
- snake_case for function names in Python
- Keep functions small and focused on a single task

### Classes
- Use PascalCase for class names
- Class names should be nouns
- Use descriptive names that reflect the class's responsibility

### Constants
- Use UPPER_SNAKE_CASE for constants
- Define constants at the top of files or in dedicated constants files

## Formatting

### Indentation
- Use 2 spaces for JavaScript/TypeScript
- Use 4 spaces for Python
- Be consistent with indentation throughout files

### Line Length
- Maximum 80-100 characters per line
- Break long lines at logical points

### Spacing
- Use spaces around operators
- One space after commas
- No space after function names in function calls
- One space after keywords like if, for, while

## Language-Specific Guidelines

### JavaScript/TypeScript
- Use const and let instead of var
- Use template literals instead of string concatenation
- Use arrow functions for anonymous functions
- Use async/await over Promises when possible
- Use destructuring assignment when appropriate
- Use spread operator (...) instead of Object.assign()

### React
- Component names should be PascalCase
- One component per file
- Use functional components with hooks over class components
- Use named exports for components
- Keep components small and focused

### CSS/SCSS
- Use kebab-case for CSS class names
- Use a consistent methodology (BEM, SMACSS, etc.)
- Organize properties alphabetically or by type
- Use variables for repeated values (colors, spacing, etc.)

## Documentation

### Comments
- Use JSDoc-style comments for functions and classes
- Comment complex logic or non-obvious solutions
- Avoid commented-out code in production
- Keep comments up-to-date with code changes

### README
- Include clear installation and setup instructions
- Document available scripts/commands
- Provide basic usage examples
- List dependencies and requirements

## Testing
- Write tests for all new features
- Maintain high test coverage
- Use descriptive test names that explain what they're testing
- Follow the Arrange-Act-Assert pattern
- Keep tests independent and isolated

## Version Control
- Write clear, descriptive commit messages
- Use present tense in commit messages
- Reference issue numbers in commit messages
- Make small, focused commits
- Pull/merge request descriptions should explain the change and why it's needed

## Code Review
- Review code for clarity, correctness, and consistency
- Focus on the code, not the person
- Provide constructive feedback
- Suggest improvements, not just point out problems
- Check for security vulnerabilities and performance issues

## Linting and Formatting
- Use ESLint for JavaScript/TypeScript
- Use Prettier for automatic formatting
- Run linters as part of CI/CD pipeline
- Fix linting errors before merging code

Remember, these guidelines are meant to help, not hinder. The primary goal is readable, maintainable code that the whole team can work with effectively.`
  },
  "cursor-rules": {
    title: "Cursor AI Rules",
    content: `# Cursor AI Rules Configuration

## General Configuration

\`\`\`json
{
  "modelName": "gpt-4",
  "temperature": 0.7,
  "maxTokens": 8000,
  "topP": 1,
  "frequencyPenalty": 0,
  "presencePenalty": 0
}
\`\`\`

## Project Context

\`\`\`
# CursorCraft Project

This is a web application for intelligent project scaffolding, providing curated prompt examples, 
project templates, and automated documentation.

## Core Technologies
- Next.js version 15+
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Zustand for state management
- Supabase for backend
\`\`\`

## Coding Standards

\`\`\`
1. Follow TypeScript best practices with strict type checking
2. Use functional components with hooks for React
3. Implement proper error handling and loading states
4. Apply responsive design principles
5. Write comprehensive JSDoc comments
6. Ensure accessibility compliance
7. Apply performance optimizations where needed
\`\`\`

## Custom Instructions

\`\`\`
When assisting with code:
1. Consider the project architecture and maintain consistency
2. Suggest modern and efficient approaches
3. Provide thorough explanations of complex logic
4. Include relevant imports and dependencies
5. Consider security best practices
6. Optimize for performance
7. Ensure backward compatibility
8. Follow established naming conventions
9. Create reusable components when appropriate
10. Consider error states and edge cases
\`\`\`

## Use Cases

1. **Code Generation**: Generate well-structured, type-safe code components, pages, and utilities
2. **Debugging**: Identify issues and suggest fixes in problematic code
3. **Refactoring**: Improve code quality without changing functionality
4. **Documentation**: Create comprehensive comments and explanations
5. **Best Practices**: Suggest improvements aligned with modern development standards
6. **Architecture**: Provide guidance on structuring complex features

## Example Instructions

\`\`\`
"Create a responsive dashboard component that displays project statistics"
"Help me implement authentication with Supabase"
"Refactor this state management to use Zustand"
"Add proper error handling to this API call"
"Create a data fetching hook with loading and error states"
"Implement dark mode support for this component"
\`\`\`

## Customization

Feel free to adjust these rules based on your project's specific needs. You can:
1. Adjust the model parameters for different types of tasks
2. Update the project context as your application evolves
3. Modify the coding standards to match your team's preferences
4. Add or remove custom instructions based on your experience
5. Expand use cases with specific examples relevant to your project`
  },
  "progress-tracker": {
    title: "Progress Tracker",
    content: `# Project Progress Tracker

## Project Information
- **Project Name**: [Project Name]
- **Start Date**: [Start Date]
- **Target Completion Date**: [Target Date]
- **Project Manager**: [Name]
- **Team Members**: [Names]

## Project Phases

### Phase 1: Planning & Requirements (Week 1-2)

| Task | Status | Assignee | Due Date | Notes |
|------|--------|----------|----------|-------|
| Define project scope | ⬜ Not Started / 🟡 In Progress / ✅ Complete | | | |
| Gather requirements | ⬜ Not Started / 🟡 In Progress / ✅ Complete | | | |
| Create user stories | ⬜ Not Started / 🟡 In Progress / ✅ Complete | | | |
| Define architecture | ⬜ Not Started / 🟡 In Progress / ✅ Complete | | | |
| Set up project repository | ⬜ Not Started / 🟡 In Progress / ✅ Complete | | | |
| Create project board | ⬜ Not Started / 🟡 In Progress / ✅ Complete | | | |

**Milestone**: Project plan approved
**Status**: ⬜ Not Started / 🟡 In Progress / ✅ Complete

### Phase 2: Design (Week 3-4)

| Task | Status | Assignee | Due Date | Notes |
|------|--------|----------|----------|-------|
| Create wireframes | ⬜ Not Started / 🟡 In Progress / ✅ Complete | | | |
| Design UI components | ⬜ Not Started / 🟡 In Progress / ✅ Complete | | | |
| Design database schema | ⬜ Not Started / 🟡 In Progress / ✅ Complete | | | |
| Define API endpoints | ⬜ Not Started / 🟡 In Progress / ✅ Complete | | | |
| Review and approve designs | ⬜ Not Started / 🟡 In Progress / ✅ Complete | | | |

**Milestone**: Design approved
**Status**: ⬜ Not Started / 🟡 In Progress / ✅ Complete

### Phase 3: Development (Week 5-8)

| Task | Status | Assignee | Due Date | Notes |
|------|--------|----------|----------|-------|
| Set up development environment | ⬜ Not Started / 🟡 In Progress / ✅ Complete | | | |
| Implement core functionality | ⬜ Not Started / 🟡 In Progress / ✅ Complete | | | |
| Develop frontend components | ⬜ Not Started / 🟡 In Progress / ✅ Complete | | | |
| Build API endpoints | ⬜ Not Started / 🟡 In Progress / ✅ Complete | | | |
| Implement authentication | ⬜ Not Started / 🟡 In Progress / ✅ Complete | | | |
| Connect frontend to backend | ⬜ Not Started / 🟡 In Progress / ✅ Complete | | | |
| Code review | ⬜ Not Started / 🟡 In Progress / ✅ Complete | | | |

**Milestone**: Core functionality implemented
**Status**: ⬜ Not Started / 🟡 In Progress / ✅ Complete

### Phase 4: Testing (Week 9-10)

| Task | Status | Assignee | Due Date | Notes |
|------|--------|----------|----------|-------|
| Write unit tests | ⬜ Not Started / 🟡 In Progress / ✅ Complete | | | |
| Perform integration testing | ⬜ Not Started / 🟡 In Progress / ✅ Complete | | | |
| Conduct user acceptance testing | ⬜ Not Started / 🟡 In Progress / ✅ Complete | | | |
| Fix bugs and issues | ⬜ Not Started / 🟡 In Progress / ✅ Complete | | | |
| Performance testing | ⬜ Not Started / 🟡 In Progress / ✅ Complete | | | |

**Milestone**: Testing completed
**Status**: ⬜ Not Started / 🟡 In Progress / ✅ Complete

### Phase 5: Deployment & Launch (Week 11-12)

| Task | Status | Assignee | Due Date | Notes |
|------|--------|----------|----------|-------|
| Set up production environment | ⬜ Not Started / 🟡 In Progress / ✅ Complete | | | |
| Deploy application | ⬜ Not Started / 🟡 In Progress / ✅ Complete | | | |
| Monitor for issues | ⬜ Not Started / 🟡 In Progress / ✅ Complete | | | |
| Create documentation | ⬜ Not Started / 🟡 In Progress / ✅ Complete | | | |
| User training (if applicable) | ⬜ Not Started / 🟡 In Progress / ✅ Complete | | | |

**Milestone**: Application launched
**Status**: ⬜ Not Started / 🟡 In Progress / ✅ Complete

## Progress Summary

| Phase | Completion % | Status | Notes |
|-------|-------------|--------|-------|
| Planning & Requirements | 0% | ⬜ Not Started | |
| Design | 0% | ⬜ Not Started | |
| Development | 0% | ⬜ Not Started | |
| Testing | 0% | ⬜ Not Started | |
| Deployment & Launch | 0% | ⬜ Not Started | |
| Overall Project | 0% | ⬜ Not Started | |

## Risks and Issues

| Description | Impact | Mitigation Strategy | Status |
|-------------|--------|---------------------|--------|
| | | | |
| | | | |
| | | | |

## Weekly Status Updates

### Week 1 (Date: MM/DD/YYYY)
**Accomplishments**:
- 
- 
- 

**Challenges**:
- 
- 

**Next Steps**:
- 
- 

### Week 2 (Date: MM/DD/YYYY)
**Accomplishments**:
- 
- 
- 

**Challenges**:
- 
- 

**Next Steps**:
- 
- 

## Notes and Action Items
- 
- 
- `
  }
};

export default function PromptPage() {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);
  
  // Check if the id exists in our templates
  const promptData = promptTemplates[id as keyof typeof promptTemplates];
  
  if (!promptData) {
    return (
      <div className="container py-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Prompt Not Found</h1>
        <p className="mb-6">The requested prompt template could not be found.</p>
        <Button asChild>
          <Link href="/prompts">Return to All Prompts</Link>
        </Button>
      </div>
    );
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(promptData.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ProtectedRoute>
      <div className="container py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">{promptData.title}</h1>
          <Button asChild variant="outline">
            <Link href="/prompts">Back to Prompts</Link>
          </Button>
        </div>

        <div className="bg-muted p-2 rounded-t-md flex justify-between items-center">
          <span className="text-sm font-medium ml-2">Prompt Template</span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={copyToClipboard} 
            className="h-8 gap-1"
          >
            {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>
        
        <div className="border border-border rounded-b-md bg-card p-6 mb-8">
          <pre className="whitespace-pre-wrap text-sm font-mono">{promptData.content}</pre>
        </div>

        <div className="flex justify-center">
          <Button onClick={copyToClipboard} className="gap-2">
            {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
            {copied ? "Copied to Clipboard!" : "Copy Prompt to Clipboard"}
          </Button>
        </div>
      </div>
    </ProtectedRoute>
  );
} 