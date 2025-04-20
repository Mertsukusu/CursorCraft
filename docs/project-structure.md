# CursorCraft Project Structure

CursorCraft follows a structured directory layout to organize code and resources efficiently. This document provides an overview of the project's structure.

## Main Directories

- **app/**: Contains all Next.js App Router pages and layouts
- **components/**: Houses reusable React components
- **lib/**: Utility functions, custom hooks, and services
- **styles/**: Global CSS and styling utilities
- **public/**: Static assets like images, icons, and favicon
- **docs/**: Project documentation

## Detailed Structure

### app/

The `app/` directory follows Next.js App Router conventions:

- **app/layout.tsx**: Root layout component
- **app/page.tsx**: Home page component
- **app/templates/**: Templates-related pages
- **app/prompts/**: Prompts-related pages
- **app/projects/**: Project management pages
- **app/contact/**: Contact page with social links
- **app/api/**: API routes for server-side functionality

### components/

Components are organized by feature and type:

- **components/ui/**: UI components like buttons, cards, etc.
- **components/projects/**: Project-specific components
- **components/features/**: Feature-specific components
- **components/auth/**: Authentication-related components
- **components/theme-provider.tsx**: Theme provider for dark/light mode

### lib/

Utilities and services:

- **lib/utils.ts**: Common utility functions
- **lib/supabase/**: Supabase client and related utilities
- **lib/store/**: Zustand state management
- **lib/data/**: Static data and schemas
- **lib/services/**: Service functions like prompt generators
- **lib/project-docs.ts**: Project documentation generator

### public/

Static assets:

- **public/images/**: Images used throughout the application
- **public/favicon/**: Favicon and related icon files

### styles/

CSS-related files:

- **styles/globals.css**: Global Tailwind CSS imports and custom styles

## File Naming Conventions

- React components: PascalCase (e.g., `Button.tsx`)
- Utility functions: camelCase (e.g., `utils.ts`)
- CSS modules: kebab-case (e.g., `button-styles.module.css`)

## Adding New Features

When adding new features to CursorCraft:

1. Create necessary components in the `components/` directory
2. Add page components in the appropriate directory under `app/`
3. Add utility functions or services in `lib/` if needed
4. Update documentation in `docs/`

## Best Practices

- Keep components focused and reusable
- Prefer server components where possible
- Use TypeScript interfaces and types for better type safety
- Follow JSDoc conventions for documenting functions and components
