"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createSupabaseClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/auth/auth-provider";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";
import { generateAndStoreClientDocs } from "@/lib/project-docs";
import JSZip from "jszip";
import { saveAs } from "file-saver";

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
  const [isDownloading, setIsDownloading] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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

  /**
   * Downloads the project as a zip file
   */
  const downloadProject = async () => {
    if (!project) return;
    
    setIsDownloading(true);
    try {
      // Create a new JSZip instance
      const zip = new JSZip();
      
      // Create basic project structure
      const rootFolder = zip.folder(project.name);
      if (!rootFolder) throw new Error("Failed to create root folder");
      
      // Add README.md with project info
      rootFolder.file("README.md", `# ${project.name}\n\n${project.description || 'No description provided.'}\n\n## Project Information\n\n- Type: ${project.template_type}\n- Framework: ${project.framework || 'N/A'}\n- Created: ${formatDate(project.created_at)}`);
      
      // Add package.json with basic configuration
      const packageJson = {
        name: project.name,
        version: "0.1.0",
        private: true,
        description: project.description || "Generated project",
        scripts: {
          dev: "next dev",
          build: "next build",
          start: "next start",
          lint: "next lint"
        },
        dependencies: {
          "next": "^14.0.0",
          "react": "^18.2.0",
          "react-dom": "^18.2.0"
        },
        devDependencies: {
          "typescript": "^5.0.0",
          "@types/node": "^20.0.0",
          "@types/react": "^18.2.0",
          "@types/react-dom": "^18.2.0"
        }
      };
      
      rootFolder.file("package.json", JSON.stringify(packageJson, null, 2));
      
      // Add basic configuration files
      rootFolder.file("tsconfig.json", `{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}`);
      
      // Create folder structure
      const appFolder = rootFolder.folder("app");
      const componentsFolder = rootFolder.folder("components");
      const libFolder = rootFolder.folder("lib");
      const publicFolder = rootFolder.folder("public");
      
      // Add basic app files
      appFolder?.file("layout.tsx", `export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}`);
      
      appFolder?.file("page.tsx", `export default function Home() {
  return (
    <main>
      <h1>${project.name}</h1>
      <p>${project.description || 'Welcome to the project!'}</p>
    </main>
  )
}`);
      
      // Generate and download the zip
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, `${project.name}.zip`);
    } catch (err) {
      console.error("Error downloading project:", err);
      alert("Failed to download project. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  /**
   * Regenerates the project docs
   */
  const regenerateProject = async () => {
    if (!project) return;
    
    setIsRegenerating(true);
    try {
      // Create a simple project data object from what's available
      const projectData = {
        name: project.name,
        description: project.description || "No description provided",
        type: project.template_type || "unknown",
        framework: project.framework || "Next.js",
        selectedPackages: project.packages || [],
        template: project.template || "Basic"
      };
      
      // Regenerate the documents
      const success = generateAndStoreClientDocs(projectData);
      
      if (success) {
        alert("Project documentation regenerated successfully!");
      } else {
        throw new Error("Failed to regenerate project documentation");
      }
    } catch (err) {
      console.error("Error regenerating project:", err);
      alert("Failed to regenerate project. Please try again.");
    } finally {
      setIsRegenerating(false);
    }
  };

  /**
   * Deletes the project
   */
  const deleteProject = async () => {
    if (!project || !user) return;
    
    // Confirm deletion
    if (!confirm(`Are you sure you want to delete the project "${project.name}"? This action cannot be undone.`)) {
      return;
    }
    
    setIsDeleting(true);
    try {
      const supabase = createSupabaseClient();
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId)
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      // Navigate back to projects list
      router.push('/projects');
    } catch (err) {
      console.error("Error deleting project:", err);
      alert("Failed to delete project. Please try again.");
      setIsDeleting(false);
    }
  };

  /**
   * Navigates to the edit project settings page
   */
  const editProjectSettings = () => {
    router.push(`/projects/${projectId}/edit`);
  };

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
                  <Button 
                    className="flex items-center gap-2"
                    onClick={downloadProject}
                    disabled={isDownloading}
                  >
                    <Download className="h-4 w-4" />
                    <span>{isDownloading ? "Downloading..." : "Download"}</span>
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
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={regenerateProject}
                    disabled={isRegenerating}
                  >
                    <span className="mr-2">🔄</span>
                    <span>{isRegenerating ? "Regenerating..." : "Regenerate Project"}</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={editProjectSettings}
                  >
                    <span className="mr-2">✏️</span>
                    <span>Edit Project Settings</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-red-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50"
                    onClick={deleteProject}
                    disabled={isDeleting}
                  >
                    <span className="mr-2">🗑️</span>
                    <span>{isDeleting ? "Deleting..." : "Delete Project"}</span>
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