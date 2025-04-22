# CursorCraft

Intelligent project scaffolding with curated prompts, templates, and automated documentation.

## Features

- **Project Scaffolding**: Easily create new projects with predefined templates
- **Curated Prompt Examples**: Get inspired with helpful prompt examples for various project types
- **Project Templates**: Choose from a variety of project templates to jumpstart your development
- **User Authentication**: Securely manage your projects with user accounts
- **Project Management**: Keep track of all your projects in one place
- **Automated Documentation**: Generate README files, PRDs, code style guides, and more
- **Contact Page**: Connect via LinkedIn, Email, or GitHub

## Tech Stack

- Next.js 15+
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Zustand for state management
- Supabase for authentication and database

## Pages

- **Home**: Overview of the platform features and supported technologies
- **Projects**: List and manage your projects
- **Templates**: Browse available project templates
- **Prompts**: Access curated prompt examples for AI development
- **Contact**: Connect with the developer through LinkedIn, Email, or GitHub

## Setup

1. Clone the repository:

```bash
git clone https://github.com/Mertsukusu/cursorcraft.git
cd cursorcraft
```

2. Install dependencies:

```bash
npm install
```

3. Configure Supabase:

   - Create a new project on [Supabase](https://supabase.com)
   - Get your project URL and anon key from the project settings
   - Copy the `.env.example` file to `.env.local` and fill in your Supabase credentials

```bash
cp .env.example .env.local
```

4. Configure the database:

   - Go to the SQL Editor in your Supabase dashboard
   - Run the SQL commands in `lib/supabase/schema.sql` to set up the required tables and policies

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- **app/**: Next.js App Router pages and layouts
- **components/**: Reusable UI components
- **lib/**: Utility functions and services
- **public/**: Static assets and favicon
- **styles/**: Global CSS styles
- **docs/**: Project documentation templates

## Documentation Generation

CursorCraft automatically generates various documentation for your projects:

- README.md
- Product Requirements Document (PRD)
- Code Style Guidelines
- Cursor AI Rules
- Progress Tracker

## Deployment

The project can be deployed on Vercel, Netlify, or any hosting platform that supports Next.js applications.

1. Set up environment variables for your production environment
2. Deploy using your preferred hosting platform

```bash
npm run build
```

## License

This project is proprietary and not available for redistribution without permission.
Copyright (c) 2024 Mert Sukusu

## Contact

- LinkedIn: [@mertsukusu](https://www.linkedin.com/in/mertsukusu/)
- Email: mertsukusu@gmail.com
- GitHub: [@Mertsukusu](https://github.com/Mertsukusu)

## Deployment

The project can be deployed on Vercel, Netlify, or any hosting platform that supports Next.js applications.

1. Set up environment variables for your production environment
2. Deploy using your preferred hosting platform

```bash
npm run build
```

## Website

The project is live at [https://www.cursor-craft.com/](https://www.cursor-craft.com/)

## License

This project is proprietary and not available for redistribution without permission.
Copyright (c) 2024 Mert Sukusu
