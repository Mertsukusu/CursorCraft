"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createSupabaseClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/auth/auth-provider";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  template_type: "web" | "api" | "cli" | "mobile";
  framework: string;
  packages: string[];
  template: string;
  created_at: string;
}

/**
 * Function to format date
 * @param dateString - Date string to format
 * @returns Formatted date string
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

/**
 * Project detail page component
 * @returns Project detail page component
 */
export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id as string;
  const router = useRouter();
  const { user } = useAuth();
  
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProject() {
      if (!user) return;
      
      try {
        const supabase = createSupabaseClient();
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', projectId)
          .eq('user_id', user.id)
          .single();

        if (error) throw error;
        if (!data) {
          throw new Error("Project not found");
        }
        
        setProject(data);
      } catch (err: any) {
        console.error("Error fetching project:", err);
        setError(err.message || "Failed to load project");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProject();
  }, [projectId, user]);

  return (
    <ProtectedRoute>
      <div className="container py-10">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" asChild>
            <Link href="/projects">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Project Details</h1>
            {project && (
              <p className="text-muted-foreground">
                {project.name}
              </p>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : error ? (
          <div className="p-4 border border-red-200 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        ) : project ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="border rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Project Information</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
                    <p className="text-lg">{project.name}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                    <p>{project.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Project Type</h3>
                    <p className="capitalize">{project.template_type || "Unknown"}</p>
                  </div>
                  
                  {project.framework && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Framework</h3>
                      <p>{project.framework}</p>
                    </div>
                  )}
                  
                  {project.template && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Template</h3>
                      <p>{project.template}</p>
                    </div>
                  )}
                  
                  {project.packages && project.packages.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Packages</h3>
                      <p>{project.packages.join(", ")}</p>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Created</h3>
                    <p>{formatDate(project.created_at)}</p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Project Code</h2>
                  <Button className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </Button>
                </div>
                <p className="text-muted-foreground mb-4">
                  Your project has been generated with the following structure:
                </p>
                <div className="bg-muted rounded-lg p-4 font-mono text-sm whitespace-pre">
                  {`${project.name}/
├── README.md
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── ...
├── components/
│   ├── ui/
│   └── ...
├── lib/
│   └── ...
└── public/
    └── ...`}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Project Documentation</h2>
                <div className="space-y-3">
                  <Link 
                    href={`/projects/${project.id}/documents/prd`}
                    className="flex items-center justify-between p-3 border rounded-lg hover:border-primary transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">📝</span>
                      <span>Product Requirements</span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </Link>
                  
                  <Link 
                    href={`/projects/${project.id}/documents/code-style`}
                    className="flex items-center justify-between p-3 border rounded-lg hover:border-primary transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🔍</span>
                      <span>Code Style Guidelines</span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </Link>
                  
                  <Link 
                    href={`/projects/${project.id}/documents/cursor-rules`}
                    className="flex items-center justify-between p-3 border rounded-lg hover:border-primary transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🤖</span>
                      <span>Cursor AI Rules</span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </Link>
                  
                  <Link 
                    href={`/projects/${project.id}/documents/progress`}
                    className="flex items-center justify-between p-3 border rounded-lg hover:border-primary transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">📊</span>
                      <span>Progress Tracker</span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </Link>
                </div>
              </div>

              <div className="border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Actions</h2>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <span className="mr-2">🔄</span>
                    <span>Regenerate Project</span>
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <span className="mr-2">✏️</span>
                    <span>Edit Project Settings</span>
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50">
                    <span className="mr-2">🗑️</span>
                    <span>Delete Project</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </ProtectedRoute>
  );
} 