"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { getPromptTemplate, PromptTemplate } from "./data";
import Link from "next/link";
import { ArrowLeft, Copy, Download } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function PromptViewPage() {
  const params = useParams();
  const router = useRouter();
  const [prompt, setPrompt] = useState<PromptTemplate | null>(null);
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    if (params.id) {
      const id = Array.isArray(params.id) ? params.id[0] : params.id;
      const template = getPromptTemplate(id);
      
      if (template) {
        setPrompt(template);
      } else {
        router.push("/prompts");
      }
    }
  }, [params.id, router]);
  
  const copyToClipboard = () => {
    if (prompt) {
      navigator.clipboard.writeText(prompt.template);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  const downloadAsMarkdown = () => {
    if (prompt) {
      const blob = new Blob([prompt.template], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${prompt.title.toLowerCase().replace(/\s+/g, "-")}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };
  
  if (!prompt) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Link href="/prompts" className="flex items-center text-sm text-gray-500 hover:text-gray-700">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Prompts
        </Link>
      </div>
      
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <h1 className="text-2xl font-bold">{prompt.title}</h1>
          <p className="text-gray-500">{prompt.description}</p>
        </CardHeader>
        <CardContent className="border-t pt-4">
          <div className="prose max-w-none">
            <ReactMarkdown>{prompt.template}</ReactMarkdown>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={copyToClipboard}>
            {copied ? "Copied!" : "Copy Template"}
            <Copy className="h-4 w-4 ml-2" />
          </Button>
          <Button variant="outline" size="sm" onClick={downloadAsMarkdown}>
            Download as Markdown
            <Download className="h-4 w-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 