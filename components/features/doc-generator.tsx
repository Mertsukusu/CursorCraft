"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { generateAllPrompts } from "@/lib/services/prompt-generator";
import { PlatformType, FrameworkType } from "@/lib/store/useWizardStore";

interface DocGeneratorProps {
  projectName: string;
  projectDescription: string;
  platform: PlatformType | null;
  framework: FrameworkType | null;
  packages: string[];
}

export function DocGenerator({ 
  projectName, 
  projectDescription, 
  platform, 
  framework, 
  packages 
}: DocGeneratorProps) {
  const [activeTab, setActiveTab] = useState("readme");
  const [copied, setCopied] = useState(false);
  
  // Generate all prompts
  const prompts = generateAllPrompts(
    projectName,
    projectDescription,
    platform,
    framework,
    packages
  );
  
  const handleCopy = async () => {
    if (prompts[activeTab as keyof typeof prompts]) {
      await navigator.clipboard.writeText(prompts[activeTab as keyof typeof prompts]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Documentation Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="readme">README</TabsTrigger>
            <TabsTrigger value="prd">PRD</TabsTrigger>
            <TabsTrigger value="codeStyle">Code Style</TabsTrigger>
            <TabsTrigger value="cursorRules">Cursor Rules</TabsTrigger>
            <TabsTrigger value="progressTracker">Tracker</TabsTrigger>
          </TabsList>
          
          <TabsContent value="readme">
            <Textarea 
              className="min-h-[500px] font-mono text-sm"
              value={prompts.readme}
              readOnly
            />
          </TabsContent>
          
          <TabsContent value="prd">
            <Textarea 
              className="min-h-[500px] font-mono text-sm"
              value={prompts.prd}
              readOnly
            />
          </TabsContent>
          
          <TabsContent value="codeStyle">
            <Textarea 
              className="min-h-[500px] font-mono text-sm"
              value={prompts.codeStyle}
              readOnly
            />
          </TabsContent>
          
          <TabsContent value="cursorRules">
            <Textarea 
              className="min-h-[500px] font-mono text-sm"
              value={prompts.cursorRules}
              readOnly
            />
          </TabsContent>
          
          <TabsContent value="progressTracker">
            <Textarea 
              className="min-h-[500px] font-mono text-sm"
              value={prompts.progressTracker}
              readOnly
            />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button onClick={handleCopy}>
          {copied ? "Copied!" : "Copy to Clipboard"}
        </Button>
      </CardFooter>
    </Card>
  );
} 