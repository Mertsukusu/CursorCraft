"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ProjectType } from "@/app/projects/new/page";
import { Search } from "lucide-react";

// Define packages by project type and framework
const packagesByType: Record<string, any> = {
  web: {
    // Frontend packages
    "Next.js": [
      { id: "tailwind", name: "Tailwind CSS", description: "Utility-first CSS framework" },
      { id: "shadcn", name: "shadcn/ui", description: "UI component library" },
      { id: "zustand", name: "Zustand", description: "State management" },
      { id: "react-query", name: "React Query", description: "Data fetching library" },
      { id: "next-auth", name: "NextAuth.js", description: "Authentication for Next.js" },
      { id: "framer-motion", name: "Framer Motion", description: "Animation library" },
      { id: "prisma", name: "Prisma", description: "ORM for TypeScript" },
      { id: "supabase", name: "Supabase", description: "Open source Firebase alternative" }
    ],
    "React": [
      { id: "tailwind", name: "Tailwind CSS", description: "Utility-first CSS framework" },
      { id: "shadcn", name: "shadcn/ui", description: "UI component library" },
      { id: "redux", name: "Redux Toolkit", description: "State management" },
      { id: "react-query", name: "React Query", description: "Data fetching library" },
      { id: "react-router", name: "React Router", description: "Routing library" },
      { id: "styled-components", name: "Styled Components", description: "CSS-in-JS library" },
      { id: "axios", name: "Axios", description: "HTTP client" }
    ],
    "Vue.js": [
      { id: "tailwind", name: "Tailwind CSS", description: "Utility-first CSS framework" },
      { id: "pinia", name: "Pinia", description: "State management" },
      { id: "vue-router", name: "Vue Router", description: "Routing library" },
      { id: "vue-query", name: "Vue Query", description: "Data fetching library" },
      { id: "axios", name: "Axios", description: "HTTP client" }
    ],
    // Backend packages
    "Express": [
      { id: "mongoose", name: "Mongoose", description: "MongoDB object modeling" },
      { id: "prisma", name: "Prisma", description: "ORM for TypeScript" },
      { id: "passport", name: "Passport", description: "Authentication middleware" },
      { id: "cors", name: "CORS", description: "Cross-origin resource sharing" },
      { id: "jwt", name: "JWT", description: "JSON Web Token implementation" },
      { id: "socket.io", name: "Socket.io", description: "Real-time communication" }
    ],
    "NestJS": [
      { id: "typeorm", name: "TypeORM", description: "ORM for TypeScript" },
      { id: "prisma", name: "Prisma", description: "ORM for TypeScript" },
      { id: "jwt", name: "JWT", description: "JSON Web Token implementation" },
      { id: "swagger", name: "Swagger", description: "API documentation" },
      { id: "graphql", name: "GraphQL", description: "GraphQL implementation" }
    ]
  },
  mobile: {
    "React Native": [
      { id: "redux", name: "Redux Toolkit", description: "State management" },
      { id: "react-navigation", name: "React Navigation", description: "Routing and navigation" },
      { id: "async-storage", name: "Async Storage", description: "Asynchronous storage system" },
      { id: "react-native-vector-icons", name: "Vector Icons", description: "Customizable icons" },
      { id: "react-native-reanimated", name: "Reanimated", description: "Animation library" }
    ],
    "Flutter": [
      { id: "provider", name: "Provider", description: "State management" },
      { id: "bloc", name: "BLoC", description: "Business logic component pattern" },
      { id: "dio", name: "Dio", description: "HTTP client" },
      { id: "flutter-icons", name: "Flutter Icons", description: "Icon library" }
    ]
  },
  api: {
    "Express API": [
      { id: "mongoose", name: "Mongoose", description: "MongoDB object modeling" },
      { id: "prisma", name: "Prisma", description: "ORM for TypeScript" },
      { id: "passport", name: "Passport", description: "Authentication middleware" },
      { id: "jwt", name: "JWT", description: "JSON Web Token implementation" },
      { id: "swagger", name: "Swagger", description: "API documentation" }
    ],
    "FastAPI": [
      { id: "sqlalchemy", name: "SQLAlchemy", description: "SQL toolkit and ORM" },
      { id: "pydantic", name: "Pydantic", description: "Data validation" },
      { id: "jwt", name: "PyJWT", description: "JSON Web Token implementation" },
      { id: "alembic", name: "Alembic", description: "Database migrations" }
    ]
  },
  cli: {
    "Node.js CLI": [
      { id: "commander", name: "Commander", description: "Command-line interface solution" },
      { id: "inquirer", name: "Inquirer", description: "Interactive command line prompts" },
      { id: "chalk", name: "Chalk", description: "Terminal string styling" },
      { id: "ora", name: "Ora", description: "Elegant terminal spinners" }
    ],
    "Python CLI": [
      { id: "click", name: "Click", description: "Command line interface creation kit" },
      { id: "rich", name: "Rich", description: "Rich text and formatting in the terminal" },
      { id: "typer", name: "Typer", description: "Build CLI applications" }
    ]
  }
};

// Get the default packages for a framework
const getDefaultPackages = (projectType: ProjectType, framework: string) => {
  // Find the packages for this framework
  const packagesForType = packagesByType[projectType];
  if (!packagesForType) return [];

  return packagesForType[framework] || [];
};

interface PackageSelectorProps {
  projectType: ProjectType;
  framework: string;
  onNext: (selectedPackages: string[]) => void;
  onBack: () => void;
}

interface PackageOption {
  id: string;
  name: string;
  description: string;
  category: "ui" | "state" | "api" | "testing" | "utility";
}

// Package options based on project type and framework
const getPackageOptions = (projectType: ProjectType, framework: string): PackageOption[] => {
  // Default packages available for most project types
  const defaultPackages: PackageOption[] = [
    {
      id: "axios",
      name: "axios",
      description: "Promise based HTTP client for the browser and Node.js",
      category: "api"
    },
    {
      id: "dayjs",
      name: "day.js",
      description: "Fast 2kB alternative to Moment.js with the same modern API",
      category: "utility"
    },
    {
      id: "lodash",
      name: "lodash",
      description: "A modern JavaScript utility library delivering modularity, performance & extras",
      category: "utility"
    },
    {
      id: "zod",
      name: "zod",
      description: "TypeScript-first schema validation with static type inference",
      category: "utility"
    }
  ];

  // Web-specific packages
  const webPackages: PackageOption[] = [
    {
      id: "tailwindcss",
      name: "Tailwind CSS",
      description: "A utility-first CSS framework for rapid UI development",
      category: "ui"
    },
    {
      id: "shadcn-ui",
      name: "shadcn/ui",
      description: "Re-usable UI components built with Radix UI and Tailwind CSS",
      category: "ui"
    },
    {
      id: "zustand",
      name: "zustand",
      description: "A small, fast and scalable bearbones state-management solution",
      category: "state"
    },
    {
      id: "tanstack-query",
      name: "TanStack Query",
      description: "Powerful asynchronous state management for data fetching",
      category: "api"
    },
    {
      id: "framer-motion",
      name: "Framer Motion",
      description: "A production-ready motion library for React",
      category: "ui"
    },
    {
      id: "react-hook-form",
      name: "React Hook Form",
      description: "Performant, flexible and extensible forms with easy-to-use validation",
      category: "ui"
    }
  ];

  // API-specific packages
  const apiPackages: PackageOption[] = [
    {
      id: "express",
      name: "Express",
      description: "Fast, unopinionated, minimalist web framework for Node.js",
      category: "api"
    },
    {
      id: "prisma",
      name: "Prisma",
      description: "Next-generation Node.js and TypeScript ORM",
      category: "api"
    },
    {
      id: "trpc",
      name: "tRPC",
      description: "End-to-end typesafe APIs made easy",
      category: "api"
    },
    {
      id: "swagger",
      name: "Swagger/OpenAPI",
      description: "API documentation and specification tools",
      category: "api"
    },
    {
      id: "jwt",
      name: "jsonwebtoken",
      description: "JSON Web Token implementation for Node.js",
      category: "utility"
    }
  ];

  // CLI-specific packages
  const cliPackages: PackageOption[] = [
    {
      id: "commander",
      name: "Commander",
      description: "The complete solution for Node.js command-line interfaces",
      category: "utility"
    },
    {
      id: "inquirer",
      name: "Inquirer",
      description: "A collection of common interactive command line user interfaces",
      category: "ui"
    },
    {
      id: "chalk",
      name: "Chalk",
      description: "Terminal string styling done right",
      category: "ui"
    },
    {
      id: "ora",
      name: "Ora",
      description: "Elegant terminal spinners",
      category: "ui"
    }
  ];

  // Testing packages (common across project types)
  const testingPackages: PackageOption[] = [
    {
      id: "jest",
      name: "Jest",
      description: "Delightful JavaScript Testing Framework with a focus on simplicity",
      category: "testing"
    },
    {
      id: "testing-library",
      name: "Testing Library",
      description: "Simple and complete testing utilities that encourage good testing practices",
      category: "testing"
    },
    {
      id: "cypress",
      name: "Cypress",
      description: "Fast, easy and reliable testing for anything that runs in a browser",
      category: "testing"
    }
  ];

  let packages: PackageOption[] = [...defaultPackages, ...testingPackages];

  switch (projectType) {
    case "web":
      packages = [...packages, ...webPackages];
      break;
    case "api":
      packages = [...packages, ...apiPackages];
      break;
    case "cli":
      packages = [...packages, ...cliPackages];
      break;
    case "mobile":
      // Add mobile-specific packages in a real implementation
      break;
  }

  // Framework-specific filtering could be added here

  return packages;
};

/**
 * Package selector component
 * @returns Package selector component
 */
export function PackageSelector({
  projectType,
  framework,
  onNext,
  onBack
}: PackageSelectorProps) {
  const packageOptions = getPackageOptions(projectType, framework);
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);

  const handlePackageToggle = (packageId: string, checked: boolean) => {
    if (checked) {
      setSelectedPackages([...selectedPackages, packageId]);
    } else {
      setSelectedPackages(selectedPackages.filter(id => id !== packageId));
    }
  };

  const handleContinue = () => {
    onNext(selectedPackages);
  };

  // Group packages by category
  const categories = {
    ui: packageOptions.filter((pkg: PackageOption) => pkg.category === "ui"),
    state: packageOptions.filter((pkg: PackageOption) => pkg.category === "state"),
    api: packageOptions.filter((pkg: PackageOption) => pkg.category === "api"),
    testing: packageOptions.filter((pkg: PackageOption) => pkg.category === "testing"),
    utility: packageOptions.filter((pkg: PackageOption) => pkg.category === "utility")
  };

  const categoryLabels = {
    ui: "UI Components",
    state: "State Management",
    api: "API & Data Fetching",
    testing: "Testing",
    utility: "Utilities"
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Select Packages</h2>
        <p className="text-muted-foreground">Choose packages for your {framework} project</p>
      </div>
      
      <div className="h-[400px] overflow-y-auto rounded-md border p-4">
        {(Object.keys(categories) as Array<keyof typeof categories>).map(category => (
          categories[category].length > 0 && (
            <div key={category} className="mb-6">
              <h3 className="text-lg font-semibold mb-3">
                {categoryLabels[category]}
              </h3>
              <div className="space-y-3">
                {categories[category].map((pkg: PackageOption) => (
                  <div key={pkg.id} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-accent">
                    <Checkbox 
                      id={pkg.id} 
                      checked={selectedPackages.includes(pkg.id)}
                      onCheckedChange={(checked) => handlePackageToggle(pkg.id, checked as boolean)}
                    />
                    <div>
                      <label 
                        htmlFor={pkg.id} 
                        className="text-sm font-medium leading-none cursor-pointer"
                      >
                        {pkg.name}
                      </label>
                      <p className="text-sm text-muted-foreground mt-1">
                        {pkg.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
      </div>
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleContinue}>
          {selectedPackages.length > 0 
            ? `Continue with ${selectedPackages.length} packages` 
            : "Continue without packages"
          }
        </Button>
      </div>
    </div>
  );
} 