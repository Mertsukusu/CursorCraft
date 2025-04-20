import { PlatformType } from "@/lib/store/useWizardStore";

export interface Framework {
  id: string;
  name: string;
  description: string;
  category: string;
  logo: string;
}

export interface Platform {
  id: PlatformType;
  name: string;
  description: string;
  icon: string;
  frameworks: Framework[];
}

export interface PackageOption {
  id: string;
  name: string;
  description: string;
  platforms: PlatformType[];
  frameworks?: string[];
  category: string;
}

export const platforms: Platform[] = [
  {
    id: "web",
    name: "Web Application",
    description: "Build for browsers with responsive design",
    icon: "globe",
    frameworks: [
      {
        id: "next",
        name: "Next.js",
        description: "React framework for production",
        category: "Frontend",
        logo: "logo-nextjs.svg"
      },
      {
        id: "react",
        name: "React",
        description: "JavaScript library for user interfaces",
        category: "Frontend",
        logo: "logo-react.svg"
      },
      {
        id: "vue",
        name: "Vue.js",
        description: "Progressive JavaScript framework",
        category: "Frontend",
        logo: "logo-vue.svg"
      },
      {
        id: "angular",
        name: "Angular",
        description: "Platform for building web applications",
        category: "Frontend",
        logo: "logo-angular.svg"
      },
      {
        id: "svelte",
        name: "Svelte",
        description: "Cybernetically enhanced web apps",
        category: "Frontend",
        logo: "logo-svelte.svg"
      },
      {
        id: "node",
        name: "Node.js",
        description: "JavaScript runtime for backends",
        category: "Backend",
        logo: "logo-nodejs.svg"
      },
      {
        id: "express",
        name: "Express",
        description: "Fast, unopinionated web framework for Node.js",
        category: "Backend",
        logo: "logo-express.svg"
      },
      {
        id: "nestjs",
        name: "NestJS",
        description: "Progressive Node.js framework",
        category: "Backend",
        logo: "logo-nestjs.svg"
      }
    ]
  },
  {
    id: "mobile",
    name: "Mobile Application",
    description: "Native or cross-platform mobile apps",
    icon: "smartphone",
    frameworks: [
      {
        id: "react-native",
        name: "React Native",
        description: "Build native apps using React",
        category: "Cross-Platform",
        logo: "logo-react-native.svg"
      },
      {
        id: "flutter",
        name: "Flutter",
        description: "Google's UI toolkit for mobile",
        category: "Cross-Platform",
        logo: "logo-flutter.svg"
      },
      {
        id: "ionic",
        name: "Ionic",
        description: "Cross-platform mobile app development",
        category: "Cross-Platform",
        logo: "logo-ionic.svg"
      },
      {
        id: "swift",
        name: "Swift",
        description: "Native iOS app development",
        category: "Native",
        logo: "logo-swift.svg"
      },
      {
        id: "kotlin",
        name: "Kotlin",
        description: "Native Android app development",
        category: "Native",
        logo: "logo-kotlin.svg"
      }
    ]
  },
  {
    id: "desktop",
    name: "Desktop Application",
    description: "Cross-platform desktop applications",
    icon: "monitor",
    frameworks: [
      {
        id: "electron",
        name: "Electron",
        description: "Build cross-platform desktop apps with JavaScript",
        category: "Cross-Platform",
        logo: "logo-electron.svg"
      },
      {
        id: "tauri",
        name: "Tauri",
        description: "Lightweight desktop apps with web UI",
        category: "Cross-Platform",
        logo: "logo-tauri.svg"
      },
      {
        id: "qt",
        name: "Qt",
        description: "Cross-platform application framework",
        category: "Cross-Platform",
        logo: "logo-qt.svg"
      }
    ]
  },
  {
    id: "api",
    name: "API Service",
    description: "RESTful or GraphQL API endpoints",
    icon: "server",
    frameworks: [
      {
        id: "express",
        name: "Express",
        description: "Fast, unopinionated web framework for Node.js",
        category: "Node.js",
        logo: "logo-express.svg"
      },
      {
        id: "nestjs",
        name: "NestJS",
        description: "Progressive Node.js framework",
        category: "Node.js",
        logo: "logo-nestjs.svg"
      },
      {
        id: "fastapi",
        name: "FastAPI",
        description: "Modern, fast API framework for Python",
        category: "Python",
        logo: "logo-fastapi.svg"
      },
      {
        id: "django",
        name: "Django",
        description: "High-level Python web framework",
        category: "Python",
        logo: "logo-django.svg"
      },
      {
        id: "spring",
        name: "Spring Boot",
        description: "Java-based framework for microservices",
        category: "Java",
        logo: "logo-spring.svg"
      },
      {
        id: "dotnet",
        name: ".NET Core",
        description: "Cross-platform framework for building APIs",
        category: ".NET",
        logo: "logo-dotnet.svg"
      }
    ]
  }
];

export const packages: PackageOption[] = [
  // Authentication
  {
    id: "auth",
    name: "Authentication",
    description: "User authentication and authorization",
    platforms: ["web", "mobile", "api"],
    category: "Security"
  },
  
  // State Management
  {
    id: "redux",
    name: "Redux",
    description: "Predictable state container",
    platforms: ["web", "mobile"],
    frameworks: ["react", "next", "react-native"],
    category: "State Management"
  },
  {
    id: "zustand",
    name: "Zustand",
    description: "Small, fast state management solution",
    platforms: ["web", "mobile"],
    frameworks: ["react", "next", "react-native"],
    category: "State Management"
  },
  {
    id: "mobx",
    name: "MobX",
    description: "Simple, scalable state management",
    platforms: ["web", "mobile"],
    frameworks: ["react", "next", "react-native"],
    category: "State Management"
  },
  {
    id: "vuex",
    name: "Vuex",
    description: "State management pattern and library for Vue.js",
    platforms: ["web"],
    frameworks: ["vue"],
    category: "State Management"
  },
  {
    id: "pinia",
    name: "Pinia",
    description: "Intuitive, type safe store for Vue",
    platforms: ["web"],
    frameworks: ["vue"],
    category: "State Management"
  },
  
  // Database
  {
    id: "prisma",
    name: "Prisma",
    description: "Next-generation ORM for Node.js",
    platforms: ["web", "api"],
    frameworks: ["node", "express", "nestjs"],
    category: "Database"
  },
  {
    id: "mongoose",
    name: "Mongoose",
    description: "MongoDB object modeling for Node.js",
    platforms: ["web", "api"],
    frameworks: ["node", "express", "nestjs"],
    category: "Database"
  },
  {
    id: "sequelize",
    name: "Sequelize",
    description: "ORM for Node.js supporting multiple SQL dialects",
    platforms: ["web", "api"],
    frameworks: ["node", "express", "nestjs"],
    category: "Database"
  },
  {
    id: "typeorm",
    name: "TypeORM",
    description: "ORM for TypeScript and JavaScript",
    platforms: ["web", "api"],
    frameworks: ["node", "express", "nestjs"],
    category: "Database"
  },
  
  // UI Frameworks
  {
    id: "tailwind",
    name: "Tailwind CSS",
    description: "Utility-first CSS framework",
    platforms: ["web", "mobile"],
    category: "UI Framework"
  },
  {
    id: "bootstrap",
    name: "Bootstrap",
    description: "Popular CSS framework",
    platforms: ["web"],
    category: "UI Framework"
  },
  {
    id: "mui",
    name: "Material UI",
    description: "React components for faster development",
    platforms: ["web"],
    frameworks: ["react", "next"],
    category: "UI Framework"
  },
  {
    id: "chakra",
    name: "Chakra UI",
    description: "Simple, modular component library",
    platforms: ["web"],
    frameworks: ["react", "next"],
    category: "UI Framework"
  },
  {
    id: "shadcn",
    name: "shadcn/ui",
    description: "Beautifully designed components",
    platforms: ["web"],
    frameworks: ["react", "next"],
    category: "UI Framework"
  },
  
  // Testing
  {
    id: "jest",
    name: "Jest",
    description: "JavaScript testing framework",
    platforms: ["web", "mobile", "api"],
    category: "Testing"
  },
  {
    id: "testing-library",
    name: "Testing Library",
    description: "Simple and complete testing utilities",
    platforms: ["web", "mobile"],
    frameworks: ["react", "next", "react-native", "vue", "angular"],
    category: "Testing"
  },
  {
    id: "cypress",
    name: "Cypress",
    description: "End-to-end testing framework",
    platforms: ["web"],
    category: "Testing"
  },
  
  // API/Data Fetching
  {
    id: "react-query",
    name: "React Query",
    description: "Data fetching and caching library",
    platforms: ["web", "mobile"],
    frameworks: ["react", "next", "react-native"],
    category: "API/Data Fetching"
  },
  {
    id: "swr",
    name: "SWR",
    description: "React Hooks for data fetching",
    platforms: ["web"],
    frameworks: ["react", "next"],
    category: "API/Data Fetching"
  },
  {
    id: "axios",
    name: "Axios",
    description: "Promise-based HTTP client",
    platforms: ["web", "mobile", "api"],
    category: "API/Data Fetching"
  },
  
  // Forms
  {
    id: "react-hook-form",
    name: "React Hook Form",
    description: "Performant, flexible forms with easy validation",
    platforms: ["web", "mobile"],
    frameworks: ["react", "next", "react-native"],
    category: "Forms"
  },
  {
    id: "formik",
    name: "Formik",
    description: "Build forms in React without tears",
    platforms: ["web", "mobile"],
    frameworks: ["react", "next", "react-native"],
    category: "Forms"
  },
  {
    id: "zod",
    name: "Zod",
    description: "TypeScript-first schema validation",
    platforms: ["web", "mobile", "api"],
    category: "Validation"
  }
];

export function getFrameworksByPlatform(platformId: PlatformType): Framework[] {
  const platform = platforms.find(p => p.id === platformId);
  return platform?.frameworks || [];
}

export function getPackagesByPlatformAndFramework(
  platformId: PlatformType,
  frameworkId: string
): PackageOption[] {
  return packages.filter(pkg => {
    const platformMatch = pkg.platforms.includes(platformId);
    const frameworkMatch = !pkg.frameworks || pkg.frameworks.includes(frameworkId);
    return platformMatch && frameworkMatch;
  });
}

export function getPackagesByIds(packageIds: string[]): PackageOption[] {
  return packages.filter(pkg => packageIds.includes(pkg.id));
} 