"use client";

import { useState } from "react";
import Link from "next/link";
import { ProjectGenerator } from "@/components/projects/project-generator";
// import { ProtectedRoute } from "@/components/auth/protected-route";
import { FrameworkSelector } from "@/components/projects/framework-selector";
import { PackageSelector } from "@/components/projects/package-selector";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { createSupabaseClient } from "@/lib/supabase/client";
// import { useAuth } from "@/components/auth/auth-provider";
import { generateAndStoreClientDocs } from "@/lib/project-docs";

export type ProjectType = "web" | "api" | "cli" | "mobile";
export type ProjectStep = "basics" | "platform" | "framework" | "packages" | "template" | "generate";

export interface ProjectData {
  name: string;
  description: string;
  type: ProjectType;
  framework: string;
  selectedPackages: string[];
  template: string;
}

/**
 * Loader component for project generator
 */
function LoadingProjectGenerator() {
  return (
    <div className="w-full max-w-2xl border rounded-lg p-6 animate-pulse">
      <div className="h-7 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
      <div className="space-y-4">
        <div className="h-10 bg-gray-200 rounded w-full"></div>
        <div className="h-24 bg-gray-200 rounded w-full"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>
      <div className="flex justify-end mt-6">
        <div className="h-9 bg-gray-200 rounded w-24"></div>
      </div>
    </div>
  );
}

/**
 * New project page component
 * @returns New project page component
 */
export default function NewProjectPage() {
  const [currentStep, setCurrentStep] = useState<ProjectStep>("basics");
  const [projectType, setProjectType] = useState<ProjectType>("web");
  const [selectedFramework, setSelectedFramework] = useState<string>("");
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("Basic Starter");
  const [projectData, setProjectData] = useState({
    name: "",
    description: ""
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  // const { user } = useAuth();
  const user = null; // Disable authentication

  const handleNext = () => {
    const steps: ProjectStep[] = ["basics", "platform", "framework", "packages", "template", "generate"];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const steps: ProjectStep[] = ["basics", "platform", "framework", "packages", "template", "generate"];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  // Handle basics data update from the first step
  const updateBasics = (name: string, description: string) => {
    setProjectData({
      ...projectData,
      name,
      description
    });
    handleNext();
  };

  // Handle platform selection
  const selectPlatform = (type: ProjectType) => {
    setProjectType(type);
    handleNext();
  };

  // Handle framework selection
  const selectFramework = (framework: string) => {
    setSelectedFramework(framework);
    handleNext();
  };

  // Handle package selection
  const selectPackages = (packages: string[]) => {
    setSelectedPackages(packages);
    handleNext();
  };

  // Handle template selection
  const selectTemplate = (template: string) => {
    setSelectedTemplate(template);
    handleNext();
  };

  // Generate the project and documentation files
  const generateProject = async () => {
    // if (!user) {
    //   setError("You must be logged in to create a project");
    //   return;
    // }

    setIsGenerating(true);
    setError(null);

    try {
      // Create complete project data object
      const completeProjectData: ProjectData = {
        name: projectData.name,
        description: projectData.description || "No description provided",
        type: projectType,
        framework: selectedFramework,
        selectedPackages: selectedPackages,
        template: selectedTemplate
      };

      // Generate project documentation first
      const docsGenerated = generateAndStoreClientDocs(completeProjectData);
      if (!docsGenerated) {
        console.warn("Warning: Documentation may not have been properly generated");
      }

      // Then save to Supabase after documents are generated
      const supabase = createSupabaseClient();
      
      // Insert basic data structure matching the database schema
      // Omit fields that might not exist in the database schema
      const { error: dbError } = await supabase
        .from('projects')
        .insert({
          name: projectData.name,
          description: projectData.description || "No description provided",
          template_type: projectType,
          // Only include framework if available in schema
          // framework: selectedFramework,
          // packages: selectedPackages,
          // template: selectedTemplate,
          user_id: null, // No authentication required
          created_at: new Date().toISOString()
        });

      if (dbError) {
        console.error("Supabase error:", dbError);
        throw new Error(dbError.message || "Database error occurred");
      }

      // Redirect only after everything is successful
      router.push("/projects");
    } catch (err: any) {
      console.error("Project generation error:", err);
      setError(typeof err === 'string' ? err : (err.message || "Failed to create project"));
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    // <ProtectedRoute>
      <div className="container py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Create New Project</h1>
            <p className="text-muted-foreground">
              Generate a new project with best practices
            </p>
          </div>
          <Link
            href="/projects"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Back to Projects
          </Link>
        </div>

        {/* Progress steps */}
        <div className="mb-10">
          <div className="flex items-center justify-center space-x-2">
            {["Project Basics", "Platform", "Framework", "Packages", "Template"].map((step, index) => (
              <div key={index} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  ["basics", "platform", "framework", "packages", "template"][index] === currentStep
                    ? "border-primary bg-primary text-primary-foreground"
                    : ["basics", "platform", "framework", "packages", "template"].indexOf(currentStep) > index
                    ? "border-primary bg-primary/20 text-primary"
                    : "border-muted-foreground/30 text-muted-foreground"
                }`}>
                  <span className="text-sm font-medium">{index + 1}</span>
                </div>
                {index < 4 && (
                  <div className={`w-10 h-1 ${
                    ["basics", "platform", "framework", "packages", "template"].indexOf(currentStep) > index
                    ? "bg-primary" : "bg-muted-foreground/30"
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          {currentStep === "basics" && (
            <ProjectGenerator 
              onProjectBasics={updateBasics}
              projectType={projectType} 
            />
          )}
          
          {currentStep === "platform" && (
            <div className="w-full max-w-2xl">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Select Platform</h2>
                <p className="text-muted-foreground">Choose the platform for your project</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <Button 
                  variant={projectType === "web" ? "default" : "outline"} 
                  size="lg"
                  className="h-32 flex flex-col items-center justify-center gap-2"
                  onClick={() => selectPlatform("web")}
                >
                  <span className="text-2xl">🌐</span>
                  <span className="font-medium">Web</span>
                </Button>
                
                <Button 
                  variant={projectType === "mobile" ? "default" : "outline"} 
                  size="lg"
                  className="h-32 flex flex-col items-center justify-center gap-2"
                  onClick={() => selectPlatform("mobile")}
                >
                  <span className="text-2xl">📱</span>
                  <span className="font-medium">Mobile</span>
                </Button>
                
                <Button 
                  variant={projectType === "api" ? "default" : "outline"} 
                  size="lg"
                  className="h-32 flex flex-col items-center justify-center gap-2"
                  onClick={() => selectPlatform("api")}
                >
                  <span className="text-2xl">⚙️</span>
                  <span className="font-medium">API</span>
                </Button>
                
                <Button 
                  variant={projectType === "cli" ? "default" : "outline"} 
                  size="lg"
                  className="h-32 flex flex-col items-center justify-center gap-2"
                  onClick={() => selectPlatform("cli")}
                >
                  <span className="text-2xl">💻</span>
                  <span className="font-medium">CLI</span>
                </Button>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={handleNext}>
                  Next
                </Button>
              </div>
            </div>
          )}
          
          {currentStep === "framework" && (
            <FrameworkSelector
              projectType={projectType}
              onSelect={selectFramework}
              onBack={handleBack}
            />
          )}
          
          {currentStep === "packages" && (
            <PackageSelector
              projectType={projectType}
              framework={selectedFramework}
              onNext={(packages: string[]) => selectPackages(packages)}
              onBack={handleBack}
            />
          )}
          
          {currentStep === "template" && (
            <div className="w-full max-w-2xl">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Select Template</h2>
                <p className="text-muted-foreground">Choose a starter template for your project</p>
              </div>
              
              {/* Template selection will go here */}
              <div className="grid grid-cols-1 gap-4 mb-8">
                <Button 
                  variant={selectedTemplate === "Basic Starter" ? "default" : "outline"}
                  size="lg"
                  className="h-20 justify-start px-4"
                  onClick={() => selectTemplate("Basic Starter")}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">📄</span>
                    <div className="text-left">
                      <div className="font-medium">Basic Starter</div>
                      <div className="text-sm text-muted-foreground">A simple starter template with minimal setup</div>
                    </div>
                  </div>
                </Button>
                
                <Button 
                  variant={selectedTemplate === "Full-Featured" ? "default" : "outline"}
                  size="lg"
                  className="h-20 justify-start px-4"
                  onClick={() => selectTemplate("Full-Featured")}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">🚀</span>
                    <div className="text-left">
                      <div className="font-medium">Full-Featured</div>
                      <div className="text-sm text-muted-foreground">Complete setup with authentication and database</div>
                    </div>
                  </div>
                </Button>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={handleNext}>
                  Next
                </Button>
              </div>
            </div>
          )}
          
          {currentStep === "generate" && (
            <div className="w-full max-w-2xl">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Project Summary</h2>
                <p className="text-muted-foreground">Review your project configuration</p>
              </div>
              
              {error && (
                <div className="p-3 mb-4 text-sm bg-red-100 border border-red-200 text-red-600 rounded-md">
                  {error}
                </div>
              )}
              
              <div className="border rounded-lg p-6 space-y-4 mb-8">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Project Name</h3>
                  <p className="text-lg">{projectData.name}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                  <p>{projectData.description || "No description provided"}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Platform</h3>
                  <p className="capitalize">{projectType}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Framework</h3>
                  <p>{selectedFramework}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Packages</h3>
                  <p>{selectedPackages.length > 0 ? selectedPackages.join(", ") : "None selected"}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Template</h3>
                  <p>{selectedTemplate}</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Generated Documentation</h3>
                <div className="space-y-3">
                  <div className="flex items-center p-3 border rounded-lg">
                    <div className="mr-3 text-2xl">📝</div>
                    <div>
                      <h4 className="font-medium">Product Requirements Document</h4>
                      <p className="text-sm text-muted-foreground">Detailed specifications for {projectData.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 border rounded-lg">
                    <div className="mr-3 text-2xl">🔍</div>
                    <div>
                      <h4 className="font-medium">Code Style Guidelines</h4>
                      <p className="text-sm text-muted-foreground">Coding standards for {selectedFramework}</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 border rounded-lg">
                    <div className="mr-3 text-2xl">🤖</div>
                    <div>
                      <h4 className="font-medium">Cursor AI Rules</h4>
                      <p className="text-sm text-muted-foreground">AI assistant configuration for your project</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 border rounded-lg">
                    <div className="mr-3 text-2xl">📊</div>
                    <div>
                      <h4 className="font-medium">Progress Tracker</h4>
                      <p className="text-sm text-muted-foreground">Project timeline and milestone tracking</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={handleBack} disabled={isGenerating}>
                  Back
                </Button>
                <Button onClick={generateProject} disabled={isGenerating}>
                  {isGenerating ? "Generating..." : "Generate Project"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    // </ProtectedRoute>
  );
} 