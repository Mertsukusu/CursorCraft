"use client";

import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const templates = [
  {
    id: "nextjs-app",
    name: "Next.js TypeScript App",
    description: "A full-featured Next.js application with TypeScript, Tailwind CSS, and more.",
    type: "web",
    tags: ["next.js", "typescript", "tailwind"]
  },
  {
    id: "express-api",
    name: "Express API",
    description: "RESTful API built with Express.js, TypeScript, and MongoDB integration.",
    type: "api",
    tags: ["express", "typescript", "mongodb", "rest-api"]
  },
  {
    id: "react-vite-app",
    name: "React Vite App",
    description: "Modern React application using Vite for blazing fast development.",
    type: "web",
    tags: ["react", "vite", "typescript", "modern"]
  },
  {
    id: "nextjs-blog",
    name: "Next.js Blog",
    description: "Blog platform built with Next.js, MDX for content, and TailwindCSS.",
    type: "web",
    tags: ["next.js", "mdx", "blog", "content"]
  },
  {
    id: "node-cli-tool",
    name: "Node CLI Tool",
    description: "Command-line interface tool built with Node.js and TypeScript.",
    type: "cli",
    tags: ["node.js", "cli", "typescript", "commander"]
  },
  {
    id: "fastapi-backend",
    name: "FastAPI Backend",
    description: "High-performance API with FastAPI, Python, and PostgreSQL integration.",
    type: "api",
    tags: ["python", "fastapi", "postgresql", "async"]
  }
];

function getProjectStructure(template: any) {
  return `
${template.name}/
├── README.md
├── package.json
├── tsconfig.json
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── ...
├── components/
│   └── ...
├── lib/
│   └── ...
└── public/
    └── ...
`;
}

function getDocumentation(template: any) {
  return `# Product Requirements Document (PRD)\n\n${template.description}\n\n## Technologies\n${template.tags.map((tag: string) => `- ${tag}`).join("\n")}\n\n---\n\n# Code Style Guidelines\n\n- Use best practices for ${template.tags.join(", ")}\n\n---\n\n# Cursor AI Rules\n\n- Use AI to assist with ${template.name} development.\n\n---\n\n# Progress Tracker\n\n- Project setup\n- Feature development\n- Testing\n- Deployment\n`;
}

export default function TemplatePreviewPage() {
  const params = useParams();
  const router = useRouter();
  const template = templates.find(t => t.id === params.id);

  if (!template) {
    return <div className="container py-10">Template not found.</div>;
  }

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">{template.name} Preview</h1>
        <Button variant="outline" asChild>
          <Link href="/templates">Back to Templates</Link>
        </Button>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Project Structure</h2>
        <pre className="bg-muted rounded-lg p-4 font-mono text-sm whitespace-pre">{getProjectStructure(template)}</pre>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Project Documentation</h2>
        <pre className="bg-muted rounded-lg p-4 font-mono text-sm whitespace-pre">{getDocumentation(template)}</pre>
      </div>
    </div>
  );
} 