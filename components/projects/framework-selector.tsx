"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectType } from "@/app/projects/new/page";
import { Search } from "lucide-react";

// Define frameworks by project type
const frameworks = {
  web: {
    frontend: [
      { id: "next", name: "Next.js", description: "React framework for production", icon: "N" },
      { id: "react", name: "React", description: "JavaScript library for user interfaces", icon: "⚛️" },
      { id: "vue", name: "Vue.js", description: "Progressive JavaScript framework", icon: "V" },
      { id: "angular", name: "Angular", description: "Platform for building web applications", icon: "A" },
      { id: "svelte", name: "Svelte", description: "Cybernetically enhanced web apps", icon: "S" },
      { id: "astro", name: "Astro", description: "Static site build tool", icon: "🚀" },
      { id: "nuxt", name: "Nuxt.js", description: "Vue.js framework for production", icon: "N" },
      { id: "solid", name: "Solid.js", description: "Simple and performant reactivity", icon: "S" },
      { id: "qwik", name: "Qwik", description: "HTML-first framework", icon: "Q" }
    ],
    backend: [
      { id: "express", name: "Express", description: "Fast, unopinionated web framework for Node.js", icon: "E" },
      { id: "nestjs", name: "NestJS", description: "Progressive Node.js framework", icon: "N" },
      { id: "fastify", name: "Fastify", description: "Fast and low overhead web framework", icon: "F" },
      { id: "django", name: "Django", description: "Python web framework", icon: "D" },
      { id: "flask", name: "Flask", description: "Python micro web framework", icon: "F" },
      { id: "rails", name: "Ruby on Rails", description: "Ruby web application framework", icon: "R" },
      { id: "laravel", name: "Laravel", description: "PHP web application framework", icon: "L" },
      { id: "spring", name: "Spring Boot", description: "Java-based framework", icon: "S" }
    ]
  },
  mobile: [
    { id: "react-native", name: "React Native", description: "Build native apps using React", icon: "⚛️" },
    { id: "flutter", name: "Flutter", description: "Google's UI toolkit for mobile", icon: "F" },
    { id: "ionic", name: "Ionic", description: "Cross-platform mobile app development", icon: "I" },
    { id: "kotlin", name: "Kotlin Android", description: "Native Android development", icon: "K" },
    { id: "swift", name: "SwiftUI", description: "Native iOS app development", icon: "S" },
    { id: "capacitor", name: "Capacitor", description: "Cross-platform native runtime", icon: "C" },
    { id: "expo", name: "Expo", description: "React Native development platform", icon: "E" },
    { id: "nativescript", name: "NativeScript", description: "Native mobile development", icon: "N" }
  ],
  api: [
    { id: "express-api", name: "Express API", description: "RESTful API with Express.js", icon: "E" },
    { id: "fastapi", name: "FastAPI", description: "Modern Python API framework", icon: "F" },
    { id: "nestjs-api", name: "NestJS API", description: "TypeScript API framework", icon: "N" },
    { id: "graphql", name: "GraphQL API", description: "API with GraphQL", icon: "G" },
    { id: "django-rest", name: "Django REST", description: "Django REST framework", icon: "D" },
    { id: "spring-boot", name: "Spring Boot", description: "Java API framework", icon: "S" },
    { id: "laravel-api", name: "Laravel API", description: "PHP API framework", icon: "L" }
  ],
  cli: [
    { id: "node-cli", name: "Node.js CLI", description: "Command-line tool with Node.js", icon: "N" },
    { id: "python-cli", name: "Python CLI", description: "Command-line tool with Python", icon: "P" },
    { id: "go-cli", name: "Go CLI", description: "Command-line tool with Go", icon: "G" },
    { id: "rust-cli", name: "Rust CLI", description: "Command-line tool with Rust", icon: "R" },
    { id: "dotnet-cli", name: ".NET CLI", description: "Command-line tool with .NET", icon: "#" }
  ]
};

interface FrameworkSelectorProps {
  projectType: ProjectType;
  onSelect: (framework: string) => void;
  onBack: () => void;
}

export function FrameworkSelector({ projectType, onSelect, onBack }: FrameworkSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<string>(projectType === "web" ? "frontend" : "all");

  // Get frameworks based on project type
  const getFrameworksForTab = () => {
    if (projectType === "web") {
      return activeTab === "frontend" 
        ? frameworks.web.frontend 
        : frameworks.web.backend;
    } else {
      return frameworks[projectType];
    }
  };

  // Filter frameworks based on search term
  const filteredFrameworks = getFrameworksForTab().filter(framework => 
    framework.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    framework.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Render headline based on project type
  const getHeadline = () => {
    switch (projectType) {
      case "web":
        return `Choose Framework for your web application`;
      case "mobile":
        return `Choose Framework for your mobile application`;
      case "api":
        return `Choose Framework for your API`;
      case "cli":
        return `Choose Framework for your CLI tool`;
      default:
        return `Choose Framework`;
    }
  };

  return (
    <div className="w-full max-w-3xl">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Choose Framework</h2>
        <p className="text-muted-foreground">{getHeadline()}</p>
      </div>

      {/* Search input */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search frameworks..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tabs for web projects */}
      {projectType === "web" && (
        <Tabs defaultValue="frontend" className="mb-6" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 w-[400px] mx-auto">
            <TabsTrigger value="frontend">Frontend</TabsTrigger>
            <TabsTrigger value="backend">Backend</TabsTrigger>
          </TabsList>
        </Tabs>
      )}

      {/* Framework grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {filteredFrameworks.map((framework) => (
          <Button
            key={framework.id}
            variant="outline"
            className="h-28 flex flex-col items-center justify-center gap-2 hover:border-primary"
            onClick={() => onSelect(framework.name)}
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg font-bold text-primary">
              {framework.icon}
            </div>
            <div className="text-center">
              <div className="font-medium">{framework.name}</div>
              <div className="text-xs text-muted-foreground">{framework.description}</div>
            </div>
          </Button>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={() => onSelect(getFrameworksForTab()[0].name)}>
          Next
        </Button>
      </div>
    </div>
  );
} 