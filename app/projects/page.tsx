"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createSupabaseClient } from "@/lib/supabase/client";
// import { useAuth } from "@/components/auth/auth-provider";
// import { ProtectedRoute } from "@/components/auth/protected-route";
import { Download } from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
 * Projects page component
 * @returns Projects page component
 */
export default function ProjectsPage() {
  // const { user } = useAuth();
  const user = null; // Disable authentication
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloadingProjectId, setDownloadingProjectId] = useState<string | null>(null);
  const supabase = createSupabaseClient();

  useEffect(() => {
    async function fetchProjects() {
      // if (!user) return;

      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          // .eq('user_id', user.id) // Remove user filter
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProjects(data || []);
      } catch (err: any) {
        setError(err.message || "Failed to fetch projects");
        console.error("Error fetching projects:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, [user, supabase]);

  /**
   * Downloads the project as a zip file
   */
  const downloadProject = async (project: Project) => {
    setDownloadingProjectId(project.id);
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
      setDownloadingProjectId(null);
    }
  };

  const projectsToDisplay = projects.length > 0 ? projects : [];
  const hasNoProjects = projectsToDisplay.length === 0 && !isLoading;

  return (
    // <ProtectedRoute>
      <div className="container py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Projects</h1>
            <p className="text-muted-foreground">
              Manage your generated projects
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
            <Link href="/projects/new">
              <Button>Create New Project</Button>
            </Link>
          </div>
        </div>

        {error && (
          <div className="mt-6 p-4 border border-red-200 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="mt-8 flex justify-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <>
            {hasNoProjects && (
              <div className="mt-6 p-4 border border-yellow-200 bg-yellow-50 text-yellow-700 rounded-md">
                No projects found. Create your first project to get started!
              </div>
            )}
            
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projectsToDisplay.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{project.name}</CardTitle>
                      <span className="rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                        {project.template_type?.toUpperCase() || 'PROJECT'}
                      </span>
                    </div>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {project.framework && (
                      <div>
                        <p className="text-sm font-medium">Framework:</p>
                        <p className="text-sm text-muted-foreground">{project.framework}</p>
                      </div>
                    )}
                    {project.packages && project.packages.length > 0 && (
                      <div>
                        <p className="text-sm font-medium">Packages:</p>
                        <p className="text-sm text-muted-foreground">{project.packages.join(", ")}</p>
                      </div>
                    )}
                    {project.template && (
                      <div>
                        <p className="text-sm font-medium">Template:</p>
                        <p className="text-sm text-muted-foreground">{project.template}</p>
                      </div>
                    )}
                    <p className="text-sm text-muted-foreground">
                      Created on: {formatDate(project.created_at)}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/projects/${project.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => downloadProject(project)}
                      disabled={downloadingProjectId === project.id}
                      className="flex items-center gap-1"
                    >
                      {downloadingProjectId === project.id ? (
                        "Downloading..."
                      ) : (
                        <>
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    // </ProtectedRoute>
  );
} 