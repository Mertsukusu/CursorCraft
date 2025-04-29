"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

type TemplateType = "all" | "web" | "api" | "cli";

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

export default function TemplatesPage() {
  const [activeTab, setActiveTab] = useState<TemplateType>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  // Filter templates based on active tab and search term
  const filteredTemplates = templates.filter(template => {
    const matchesTab = activeTab === "all" || template.type === activeTab;
    const matchesSearch = 
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesTab && matchesSearch;
  });

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Project Templates</h1>
          <p className="text-muted-foreground">
            Ready-to-use templates for various project types
          </p>
        </div>
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>

      {/* Filter and search */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
        <Tabs defaultValue="all" className="w-full sm:w-auto" value={activeTab} onValueChange={(value) => setActiveTab(value as TemplateType)}>
          <TabsList className="grid grid-cols-4 w-full sm:w-[400px]">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="web">Web</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
            <TabsTrigger value="cli">CLI</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative w-full sm:w-[300px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search templates..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Templates grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="border rounded-lg overflow-hidden flex flex-col">
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-bold text-xl">{template.name}</h2>
                <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded uppercase">
                  {template.type}
                </span>
              </div>
              <p className="text-muted-foreground mb-4">{template.description}</p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {template.tags.map((tag, index) => (
                  <span key={index} className="text-xs bg-muted px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="border-t p-4 mt-auto bg-muted/40 flex justify-between">
              <Button variant="outline" size="sm" onClick={() => router.push(`/templates/preview/${template.id}`)}>
                Preview
              </Button>
              <Button 
                size="sm"
                onClick={() => {
                  // Store template info in localStorage for display on the prompts page
                  if (typeof window !== 'undefined') {
                    localStorage.setItem('selectedTemplate', JSON.stringify({
                      name: template.name,
                      description: template.description,
                      type: template.type,
                      tags: template.tags
                    }));
                  }
                  router.push('/prompts');
                }}
              >
                Use Template
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 