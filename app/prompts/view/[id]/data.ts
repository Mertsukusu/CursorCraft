export interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  template: string;
}

export const promptTemplates: Record<string, PromptTemplate> = {
  prd: {
    id: "prd",
    title: "Product Requirements Document",
    description: "A comprehensive template for defining product requirements, goals, and features.",
    template: `# Product Requirements Document (PRD)

## Product Overview
[Provide a brief description of the product, its purpose, and target audience]

## Business Requirements
- [Business requirement 1]
- [Business requirement 2]
- [Business requirement 3]

## User Requirements
- [User requirement 1]
- [User requirement 2]
- [User requirement 3]

## Functional Requirements
- [Detailed functionality 1]
- [Detailed functionality 2]
- [Detailed functionality 3]

## Non-Functional Requirements
### Performance
- [Performance requirement 1]
- [Performance requirement 2]

### Security
- [Security requirement 1]
- [Security requirement 2]

### Scalability
- [Scalability requirement 1]
- [Scalability requirement 2]

## User Interfaces
[Describe key screens/interfaces or link to design files]

## Project Timeline
- Phase 1: [Description] - [Date]
- Phase 2: [Description] - [Date]
- Phase 3: [Description] - [Date]

## Success Metrics
- [KPI 1]
- [KPI 2]
- [KPI 3]

## Appendix
[Any additional information, references, or resources]`,
  },
  codeStyle: {
    id: "codeStyle",
    title: "Code Style Guidelines",
    description: "Enforce consistent code formatting, naming conventions, and structure across your project.",
    template: `# Code Style Guidelines

## General Principles
- Write clean, readable, and maintainable code
- Follow the DRY (Don't Repeat Yourself) principle
- Keep functions and methods small and focused on a single responsibility
- Use meaningful names for variables, functions, and classes

## Naming Conventions
- **Variables**: Use camelCase (e.g., \`userName\`, \`itemCount\`)
- **Functions**: Use camelCase (e.g., \`calculateTotal\`, \`fetchUserData\`)
- **Classes**: Use PascalCase (e.g., \`UserProfile\`, \`PaymentProcessor\`)
- **Constants**: Use UPPER_SNAKE_CASE (e.g., \`MAX_RETRY_COUNT\`, \`API_BASE_URL\`)
- **File names**: Use kebab-case (e.g., \`user-profile.tsx\`, \`payment-processor.ts\`)

## Code Formatting
- Use 2 spaces for indentation
- Maximum line length: 100 characters
- Use semicolons at the end of statements
- Use single quotes for string literals
- Add trailing commas in arrays and objects

## TypeScript Guidelines
- Use explicit type annotations for function parameters and return types
- Prefer interfaces over type aliases for object types
- Use union types for values with a fixed set of possible values
- Use generics to create reusable components and functions

## React Component Structure
- Use functional components with hooks
- Keep components small and focused on a single responsibility
- Extract reusable UI elements into separate components
- Use JSX fragments to avoid unnecessary div wrappers

## Comments
- Write comments to explain "why" not "what"
- Use JSDoc comments for public APIs and exported functions
- Keep comments up-to-date with code changes

## Import Order
1. External libraries
2. Internal modules
3. Components
4. Utilities
5. Types
6. CSS/SCSS files

## Testing Guidelines
- Write tests for all major functionality
- Follow the AAA pattern (Arrange, Act, Assert)
- Test component behavior, not implementation details
- Aim for high test coverage but prioritize critical paths`,
  },
  cursorRules: {
    id: "cursorRules",
    title: "Cursor AI Rules",
    description: "Configuration rules to maximize Cursor AI's effectiveness for your specific project needs.",
    template: `# Cursor AI Configuration Rules

## Project Context
I'm working on [Project Name], a [brief description of your project]. The project uses [key technologies, frameworks, libraries] and follows [architectural style/pattern].

## When Generating Code
- Follow the project's established code style and conventions
- Use TypeScript with strict type checking
- Implement proper error handling for all asynchronous operations
- Add comprehensive JSDoc comments for public functions and components
- Create unit tests for all major functionality
- Consider performance implications, especially for UI components

## For Code Reviews
- Look for potential security vulnerabilities
- Check for proper error handling
- Ensure consistent naming conventions
- Verify type safety
- Identify potential performance bottlenecks
- Suggest optimizations and improvements

## When Refactoring
- Maintain the same functionality and behavior
- Improve code readability and maintainability
- Extract reusable logic into shared utilities
- Apply appropriate design patterns
- Ensure backward compatibility

## For Documentation
- Use Markdown format
- Include a clear summary of purpose and functionality
- Document all parameters, return values, and exceptions
- Provide usage examples
- Add links to related resources and components

## Project-Specific Guidelines
- [Any specific rules or preferences for your project]
- [Custom patterns or approaches you want to enforce]
- [Specific libraries or utilities to prefer]

## Don't
- Generate code that uses deprecated APIs or methods
- Create complex, hard-to-understand solutions
- Introduce unnecessary dependencies
- Ignore error handling
- Use any instead of proper types`,
  },
  progressTracker: {
    id: "progressTracker",
    title: "Progress Tracker",
    description: "Track development milestones, tasks, and overall project progress.",
    template: `# Project Progress Tracker

## Project: [Project Name]
## Start Date: [Start Date]
## Target Completion: [Target Date]

## Milestones

### 1. Project Setup and Planning
- [x] Define project requirements and scope
- [x] Set up project repository
- [x] Configure development environment
- [ ] Create project structure
- [ ] Set up CI/CD pipeline

### 2. Core Features Development
- [ ] Feature 1: [Description]
  - [ ] Subtask 1.1
  - [ ] Subtask 1.2
  - [ ] Subtask 1.3
- [ ] Feature 2: [Description]
  - [ ] Subtask 2.1
  - [ ] Subtask 2.2
- [ ] Feature 3: [Description]
  - [ ] Subtask 3.1
  - [ ] Subtask 3.2

### 3. UI/UX Implementation
- [ ] Design system setup
- [ ] Component library implementation
- [ ] Page layouts and navigation
- [ ] Responsive design implementation
- [ ] Accessibility compliance

### 4. Testing
- [ ] Unit tests for core functionality
- [ ] Integration tests
- [ ] End-to-end tests
- [ ] Performance testing
- [ ] Accessibility testing

### 5. Documentation
- [ ] API documentation
- [ ] Component documentation
- [ ] User guides
- [ ] Deployment instructions

### 6. Deployment
- [ ] Staging environment setup
- [ ] Production environment setup
- [ ] Database migrations
- [ ] Performance optimization
- [ ] Final QA

## Current Sprint: [Sprint Number/Name]
- [ ] Task 1: [Owner] - [Status]
- [ ] Task 2: [Owner] - [Status]
- [ ] Task 3: [Owner] - [Status]

## Blockers/Issues
- [Description of blocker/issue] - [Status] - [Owner]

## Notes
- [Any additional information, decisions, or changes]`,
  },
};

export function getPromptTemplate(id: string): PromptTemplate | undefined {
  return promptTemplates[id];
} 