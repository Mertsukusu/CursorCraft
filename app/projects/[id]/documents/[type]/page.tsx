"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createSupabaseClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/auth/auth-provider";
import { saveAs } from "file-saver";

interface ProjectData {
  id: string;
  name: string;
  description: string;
  template_type: string;
  framework: string;
  packages: string[];
  template: string;
}

/**
 * Project document viewer page
 * @returns Project document viewer page component
 */
export default function ProjectDocumentPage() {
  const params = useParams();
  const projectId = params.id as string;
  const documentType = params.type as string;
  const router = useRouter();
  const { user } = useAuth();
  
  const [project, setProject] = useState<ProjectData | null>(null);
  const [documentContent, setDocumentContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Map document type to title and key
  const documentMap: Record<string, { title: string, key: string }> = {
    "prd": { title: "Product Requirements Document", key: "_prd" },
    "code-style": { title: "Code Style Guidelines", key: "_code_style" },
    "cursor-rules": { title: "Cursor AI Rules", key: "_cursor_rules" },
    "progress": { title: "Progress Tracker", key: "_progress_tracker" }
  };

  useEffect(() => {
    async function fetchProjectAndDocument() {
      if (!user) return;
      
      try {
        setIsLoading(true);
        // Fetch project data from Supabase
        const supabase = createSupabaseClient();
        const { data, error: projectError } = await supabase
          .from('projects')
          .select('*')
          .eq('id', projectId)
          .eq('user_id', user.id)
          .single();

        if (projectError) throw projectError;
        if (!data) {
          throw new Error("Project not found");
        }

        setProject(data);

        // Get document content from localStorage
        const docKey = documentMap[documentType]?.key;
        if (!docKey) {
          throw new Error("Invalid document type");
        }

        // Try to get the document from localStorage
        try {
          const storedDoc = localStorage.getItem(`${data.name}${docKey}`);
          if (storedDoc) {
            setDocumentContent(storedDoc);
          } else {
            // Check if we should regenerate the document
            try {
              // Create a simple project data object from what's available
              const projectData = {
                name: data.name,
                description: data.description || "No description provided",
                type: data.template_type || "unknown",
                framework: data.framework || "Next.js", // Default to Next.js
                selectedPackages: data.packages || [],
                template: data.template || "Basic"
              };

              // Try to regenerate the documents
              const { generateAndStoreClientDocs } = await import('@/lib/project-docs');
              generateAndStoreClientDocs(projectData);
              
              // Try to get the document again
              const regeneratedDoc = localStorage.getItem(`${data.name}${docKey}`);
              if (regeneratedDoc) {
                setDocumentContent(regeneratedDoc);
              } else {
                setDocumentContent(`# Document Not Found\n\nThe ${documentMap[documentType]?.title || "document"} for project "${data.name}" could not be found or regenerated.`);
                setError("Document not found in local storage");
              }
            } catch (regenerationError) {
              console.error("Error regenerating document:", regenerationError);
              setDocumentContent(`# Document Not Found\n\nThe ${documentMap[documentType]?.title || "document"} for project "${data.name}" could not be found. This may happen if:\n\n- The document was not generated properly\n- The browser's localStorage was cleared\n- You're viewing this project from a different browser or device\n\nPlease try regenerating the project to recreate the documentation.`);
              setError("Document not found in local storage");
            }
          }
        } catch (storageError) {
          console.error("localStorage error:", storageError);
          setError("Error accessing local storage");
          setDocumentContent("# Storage Error\n\nThere was an error accessing the document in your browser's local storage.");
        }
      } catch (err: any) {
        console.error("Error fetching project document:", err);
        setError(err.message || "Failed to load document");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjectAndDocument();
  }, [projectId, documentType, user]);

  // Function to convert markdown to HTML (simple version)
  const markdownToHtml = (markdown: string): string => {
    if (!markdown) {
      return '<div class="text-center py-10 text-gray-500">No content available</div>';
    }
    
    // This is a very simplified markdown parser
    // In a real application, you would use a library like marked.js or remark
    let html = markdown
      // Replace headings
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^#### (.*$)/gm, '<h4>$1</h4>')
      // Replace bold text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Replace italic text
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Replace code blocks
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
      // Replace inline code
      .replace(/`(.*?)`/g, '<code>$1</code>')
      // Replace lists
      .replace(/^- (.*$)/gm, '<li>$1</li>')
      // Replace paragraphs
      .replace(/\n\n/g, '</p><p>')
      // Handle tables (very basic)
      .replace(/\|.*\|/g, function(match) {
        if (match.indexOf('---') > -1) {
          return '';
        }
        return '<tr>' + match.split('|').filter(Boolean).map(cell => `<td>${cell.trim()}</td>`).join('') + '</tr>';
      });

    // Wrap in a container
    html = `<div class="markdown">${html}</div>`;
    return html;
  };

  const documentTitle = documentMap[documentType]?.title || "Document";

  const handleDownloadMd = () => {
    let filename = "Document.md";
    switch (documentType) {
      case "prd":
        filename = "PRD.md";
        break;
      case "code-style":
        filename = "CodeStyle.md";
        break;
      case "cursor-rules":
        filename = ".cursorrules";
        break;
      case "progress":
        filename = "ProgressTracker.md";
        break;
      default:
        filename = `${documentTitle.replace(/\s+/g, "_")}.md`;
    }
    const blob = new Blob([documentContent], { type: "text/markdown;charset=utf-8" });
    saveAs(blob, filename);
  };

  const handleCopy = async () => {
    if (documentContent) {
      await navigator.clipboard.writeText(documentContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <ProtectedRoute>
      <div className="container py-10">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" asChild>
            <Link href={`/projects/${projectId}`}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              {documentTitle}
              <Button variant="outline" size="sm" onClick={handleDownloadMd}>
                Download as .md
              </Button>
              <Button variant="outline" size="sm" onClick={handleCopy}>
                {copied ? "Copied!" : "Copy"}
              </Button>
            </h1>
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
          <div>
            <div className="p-4 mb-6 border border-red-200 bg-red-50 text-red-700 rounded-md">
              {error}
            </div>
            {documentContent && (
              <div className="border rounded-lg p-8 markdown-content prose prose-slate max-w-none">
                <div dangerouslySetInnerHTML={{ __html: markdownToHtml(documentContent) }} />
              </div>
            )}
          </div>
        ) : (
          <div className="border rounded-lg p-8 markdown-content prose prose-slate max-w-none">
            <div dangerouslySetInnerHTML={{ __html: markdownToHtml(documentContent) }} />
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
} 