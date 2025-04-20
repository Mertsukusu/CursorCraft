/**
 * Static prompt templates for the "View Prompt" functionality
 */

export const staticPrompts = {
  prd: `You are an expert product manager tasked with creating a detailed Product Requirements Document (PRD) for [project_name].

# [project_name] - Product Requirements Document

## Project Overview
[Provide a high-level overview of the project here]

## Project Context
Platform: [platform]
Framework: [framework]
Dependencies: [dependencies]

## Document Sections

### 1. Executive Summary
Write a concise overview that includes:
- Product vision and goals
- Target audience
- Key value propositions
- Success metrics and KPIs
- Project timeline overview

### 2. Problem Statement
Describe:
- Current pain points and challenges
- Market opportunity
- User needs and feedback
- Business impact and goals
- Competitive analysis

### 3. Product Requirements
Define detailed functional and non-functional requirements:
- User stories and use cases
- Feature specifications
- Technical requirements
- Performance criteria
- Compatibility requirements
- Security considerations

### 4. User Experience
Detail the user experience including:
- User personas
- User flows
- Information architecture
- Wireframes or mockups descriptions
- Interaction patterns

### 5. Technical Architecture
Outline the high-level technical approach:
- System components
- Data models
- Integration points
- Deployment strategy
- Scalability considerations

### 6. Development Roadmap
Create a phased approach:
- Feature prioritization
- Release milestones
- Resource requirements
- Dependencies and constraints

### 7. Success Metrics
Define how success will be measured:
- Key performance indicators
- Analytics implementation
- User feedback mechanisms
- Business metrics

### 8. Appendix
Include additional information:
- Research findings
- Competitive analysis details
- Technical specifications
- Open questions and considerations`,

  codeStyle: `You are a senior developer establishing comprehensive coding standards for the [project_name] project. Create detailed code style guidelines that the team should follow.

# [project_name] - Code Style Guidelines

## General Principles
- Maintain consistency across the codebase
- Prioritize readability and maintainability
- Follow the principle of least surprise
- Write self-documenting code
- Use meaningful naming conventions

## Formatting
- Indentation: Use 2 spaces (not tabs)
- Line length: Maximum 100 characters
- Whitespace: Use consistent spacing around operators and after commas
- Braces: Opening braces on the same line as the statement
- Comments: Use // for single-line comments and /** */ for multi-line documentation

## Naming Conventions
- Use camelCase for variables and functions
- Use PascalCase for classes and interfaces
- Use ALL_CAPS for constants
- Prefix private properties with underscore (_property)
- Use descriptive, meaningful names that convey intent

## TypeScript Guidelines
- Use explicit type annotations for function parameters and return types
- Prefer interfaces over type aliases for object shapes
- Use union types for variables that can have multiple types
- Leverage TypeScript's utility types when appropriate
- Use generics to create reusable components

## Directory Structure
- Organize code by feature rather than by type
- Keep related files close to each other
- Use consistent file naming conventions
- Separate concerns appropriately
- Maintain a clean import structure

## Testing Standards
- Write tests for all functionality
- Use descriptive test names that explain what is being tested
- Follow the Arrange-Act-Assert pattern
- Mock external dependencies appropriately
- Maintain test isolation

## Framework-Specific Guidelines
[Include specific guidelines for the chosen framework]

## Version Control
- Write clear, concise commit messages
- Reference issue numbers in commit messages
- Keep commits focused and atomic
- Use feature branches for new development
- Review code before merging

## Documentation
- Document all public APIs
- Include examples in documentation
- Keep documentation up-to-date with code changes
- Document complex algorithms and business logic
- Use JSDoc for inline documentation

## Error Handling
- Handle errors at the appropriate level
- Use custom error types for domain-specific errors
- Provide informative error messages
- Avoid swallowing exceptions
- Log errors appropriately

This document serves as a living guide and should be updated as the team's practices evolve.`,

  cursorRules: `# [project_name]

# Overall Goal:
# Create a [platform] application named [project_name] that follows best practices and modern development standards.

# Core Technologies:
# Use [framework], TypeScript, and other appropriate technologies.

# Project Structure:
# Follow a standard structure appropriate for the selected technology stack.
# Create appropriate directories for components, pages, services, utilities, etc.
# Use clean architecture principles where applicable.

# Coding Standards & Quality:
# Use TypeScript with strict type checking.
# Use ESLint for linting with appropriate rules.
# Implement proper error handling throughout the application.
# Follow the DRY (Don't Repeat Yourself) principle.
# Use proper naming conventions for variables, functions, and components.
# Include appropriate comments and documentation.

# Testing:
# Write unit tests for critical functionality.
# Use appropriate testing libraries for the selected framework.
# Maintain good test coverage.

# Security:
# Implement proper authentication and authorization.
# Follow security best practices for the selected technologies.
# Sanitize inputs and validate data appropriately.

# Performance:
# Optimize for performance where necessary.
# Use appropriate data structures and algorithms.
# Follow best practices for rendering and state management.

# Accessibility:
# Ensure the application is accessible to all users.
# Follow WCAG 2.1 guidelines.
# Use semantic HTML.

# Responsiveness:
# Ensure the application is responsive and works well on various devices.
# Implement mobile-first design where appropriate.

# Customization:
# Structure the codebase modularly to allow for future customization.`,

  progressTracker: `# [project_name] - Project Progress Tracker

## Project Overview
[project_description]

## Project Timeline

### Phase 1: Project Setup and Planning (Weeks 1-2)
- [ ] Define project requirements and objectives
- [ ] Set up development environment
- [ ] Initialize repository and project structure
- [ ] Create initial documentation
- [ ] Define project architecture
- [ ] Set up CI/CD pipeline

### Phase 2: Core Feature Development (Weeks 3-6)
- [ ] Implement authentication system
- [ ] Create base UI components
- [ ] Develop core functionality
- [ ] Set up database schema and models
- [ ] Implement API endpoints
- [ ] Create initial test suite

### Phase 3: Advanced Features (Weeks 7-10)
- [ ] Implement advanced functionality
- [ ] Enhance user interface
- [ ] Optimize performance
- [ ] Expand test coverage
- [ ] Implement feedback mechanism
- [ ] Add analytics tracking

### Phase 4: Testing and Refinement (Weeks 11-12)
- [ ] Conduct comprehensive testing
- [ ] Fix identified bugs and issues
- [ ] Optimize for performance
- [ ] Conduct security audit
- [ ] Implement user feedback
- [ ] Prepare for deployment

### Phase 5: Deployment and Launch (Weeks 13-14)
- [ ] Prepare production environment
- [ ] Perform final QA testing
- [ ] Create deployment documentation
- [ ] Set up monitoring systems
- [ ] Deploy to production
- [ ] Conduct post-launch review

## Key Milestones
1. **Project Kickoff**: Week 1
2. **Architecture Approval**: Week 2
3. **Core Features Complete**: Week 6
4. **All Features Implemented**: Week 10
5. **Testing Complete**: Week 12
6. **Product Launch**: Week 14

## Team Members
- Project Manager
- Frontend Developer(s)
- Backend Developer(s)
- UI/UX Designer
- QA Engineer

## Risk Management
- Identify potential risks and mitigation strategies
- Define contingency plans for key risk areas
- Establish regular review cycles for risk assessment

## Progress Tracking
- Weekly team meetings
- Bi-weekly stakeholder updates
- Monthly progress reviews
- Continuous integration metrics
- Bug tracking and resolution metrics

This document should be reviewed and updated regularly throughout the project lifecycle.`
}; 