"use client";

import Link from "next/link";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { Button } from "@/components/ui/button";

const promptTemplates = [
  {
    id: "product-requirements",
    title: "Product Requirements Document",
    description: "Click to view and use a professional product requirements document template",
    icon: "📝"
  },
  {
    id: "code-style",
    title: "Code Style Guidelines",
    description: "Click to explore comprehensive coding standards and guidelines template",
    icon: "🔍"
  },
  {
    id: "cursor-rules",
    title: "Cursor AI Rules",
    description: "Click to see AI assistant configuration template and customize rules",
    icon: "🤖"
  },
  {
    id: "progress-tracker",
    title: "Progress Tracker",
    description: "Click to use project timeline and milestone tracking template",
    icon: "📊"
  }
];

export default function PromptsPage() {
  return (
    <ProtectedRoute>
      <div className="container py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Prompts for Cursor AI</h1>
          <p className="text-muted-foreground mt-2">
            Use these prompts to help you build your project
          </p>
        
        </div>
        

        <div className="max-w-3xl mx-auto">
          {promptTemplates.map((prompt) => (
            <div key={prompt.id} className="mb-4 border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="text-3xl">{prompt.icon}</div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{prompt.title}</h2>
                  <p className="text-muted-foreground mt-1">{prompt.description}</p>
                </div>
                <Link 
                  href={`/prompts/${prompt.id}`}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  View Prompt
                </Link>
              </div>
              
            </div>
          ))}
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
        </Link>
        </div>
        
      </div>
    </ProtectedRoute>
  );
} 