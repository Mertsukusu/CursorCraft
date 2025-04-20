import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AuthStatus } from "@/components/auth/auth-status";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { TechIconsGrid } from "@/components/ui/tech-icons-grid";
import { 
  Braces, 
  FileCode, 
  Package, 
  Shield, 
  Wrench, 
  Laptop 
} from "lucide-react";

/**
 * Home page component
 * @returns Home page component
 */
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="mr-4 hidden md:flex">
            <Link
              href="/"
              className="mr-6 flex items-center space-x-2 font-bold"
            >
              <div className="relative h-6 w-6">
                <ImageWithFallback
                  src="/images/logo.svg"
                  alt="CursorCraft Logo"
                  fill
                  className="object-contain"
                  fallbackColor="#2563eb"
                />
              </div>
              <span>CursorCraft</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link
                href="/projects"
                className="transition-colors hover:text-foreground/80"
              >
                Projects
              </Link>
              <Link
                href="/templates"
                className="transition-colors hover:text-foreground/80"
              >
                Templates
              </Link>
              <Link
                href="/prompts"
                className="transition-colors hover:text-foreground/80"
              >
                Prompts
              </Link>
              <Link
                href="/contact"
                className="transition-colors hover:text-foreground/80"
              >
                Contact
              </Link>
            </nav>
          </div>
          <AuthStatus />
        </div>
      </header>
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 relative">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute left-0 top-1/4 -z-10 transform-gpu blur-3xl" aria-hidden="true">
              <div
                className="aspect-[1155/678] w-[36.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#2563eb] opacity-20"
                style={{
                  clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
              />
            </div>
            <div className="absolute right-0 top-1/3 -z-10 transform-gpu blur-3xl" aria-hidden="true">
              <div
                className="aspect-[1155/678] w-[36.0625rem] bg-gradient-to-r from-[#2563eb] to-[#a855f7] opacity-20"
                style={{
                  clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
              />
            </div>
          </div>
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Effortless Project Setup with CursorCraft
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Bypass the initial configuration hurdles. Access ready-to-use prompt templates, smart project structures, and built-in guidelines for a smoother Cursor AI experience.
            </p>
            <div className="space-x-4 mt-8">
              <Link href="/projects/new">
                <Button size="lg">Create New Project</Button>
              </Link>
              <Link href="/templates">
                <Button variant="outline" size="lg">
                  Browse Templates
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        <section className="container space-y-6 py-8 md:py-12 lg:py-20">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-4xl">
              Supported Technologies
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Choose from popular frameworks and tools, or let AI recommend the best stack for your project.
            </p>
          </div>
          
          <div className="mt-12 mx-auto max-w-5xl">
            <div className="grid grid-cols-4 gap-4 text-center">
              <div className="flex flex-col items-center">
                <div className="mb-3 h-12 w-12 flex items-center justify-center bg-muted rounded-lg">
                  <Laptop className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-4">Frontend</h3>
                <div className="space-y-2">
                  <p className="flex items-center justify-center text-sm text-muted-foreground gap-1">
                    <span className="w-4 h-4 inline-block rounded-full bg-blue-100">
                      <Image src="/images/icons/react.svg" alt="React" width={16} height={16} className="object-contain" />
                    </span>
                    React
                  </p>
                  <p className="flex items-center justify-center text-sm text-muted-foreground gap-1">
                    <span className="w-4 h-4 inline-block rounded-full bg-green-100">
                      <Image src="/images/icons/vue.svg" alt="Vue" width={16} height={16} className="object-contain" />
                    </span>
                    Vue
                  </p>
                  <p className="flex items-center justify-center text-sm text-muted-foreground gap-1">
                    <span className="w-4 h-4 inline-block rounded-full bg-red-100">
                      <Image src="/images/icons/angular.svg" alt="Angular" width={16} height={16} className="object-contain" />
                    </span>
                    Angular
                  </p>
                  <p className="flex items-center justify-center text-sm text-muted-foreground gap-1">
                    <span className="w-4 h-4 inline-block rounded-full bg-teal-100">
                      <Image src="/images/icons/tailwind.svg" alt="Tailwind" width={16} height={16} className="object-contain" />
                    </span>
                    Tailwind
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="mb-3 h-12 w-12 flex items-center justify-center bg-muted rounded-lg">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-4">Backend</h3>
                <div className="space-y-2">
                  <p className="flex items-center justify-center text-sm text-muted-foreground gap-1">
                    <span className="w-4 h-4 inline-block rounded-full bg-green-100">
                      <Image src="/images/icons/nodejs.svg" alt="Node.js" width={16} height={16} className="object-contain" />
                    </span>
                    Node.js
                  </p>
                  <p className="flex items-center justify-center text-sm text-muted-foreground gap-1">
                    <span className="w-4 h-4 inline-block rounded-full bg-blue-100">
                      <Image src="/images/icons/python.svg" alt="Python" width={16} height={16} className="object-contain" />
                    </span>
                    Python
                  </p>
                  <p className="flex items-center justify-center text-sm text-muted-foreground gap-1">
                    <span className="w-4 h-4 inline-block rounded-full bg-cyan-100">
                      <Image src="/images/icons/go.svg" alt="Go" width={16} height={16} className="object-contain" />
                    </span>
                    Go
                  </p>
                  <p className="flex items-center justify-center text-sm text-muted-foreground gap-1">
                    <span className="w-4 h-4 inline-block rounded-full bg-slate-100">
                      <Image src="/images/icons/typescript.svg" alt="TypeScript" width={16} height={16} className="object-contain" />
                    </span>
                    TypeScript
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="mb-3 h-12 w-12 flex items-center justify-center bg-muted rounded-lg">
                  <FileCode className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-4">Mobile</h3>
                <div className="space-y-2">
                  <p className="flex items-center justify-center text-sm text-muted-foreground gap-1">
                    <span className="w-4 h-4 inline-block rounded-full bg-blue-100">
                      <Image src="/images/icons/react.svg" alt="React Native" width={16} height={16} className="object-contain" />
                    </span>
                    React Native
                  </p>
                  <p className="flex items-center justify-center text-sm text-muted-foreground gap-1">
                    <span className="w-4 h-4 inline-block rounded-full bg-sky-100">
                      <Image src="/images/icons/flutter.svg" alt="Flutter" width={16} height={16} className="object-contain" />
                    </span>
                    Flutter
                  </p>
                  <p className="flex items-center justify-center text-sm text-muted-foreground gap-1">
                    <span className="w-4 h-4 inline-block rounded-full bg-purple-100">
                      <Image src="/images/icons/kotlin.svg" alt="Kotlin" width={16} height={16} className="object-contain" />
                    </span>
                    Kotlin
                  </p>
                  <p className="flex items-center justify-center text-sm text-muted-foreground gap-1">
                    <span className="w-4 h-4 inline-block rounded-full bg-orange-100">
                      <Image src="/images/icons/swift.svg" alt="Swift" width={16} height={16} className="object-contain" />
                    </span>
                    Swift
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="mb-3 h-12 w-12 flex items-center justify-center bg-muted rounded-lg">
                  <Wrench className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-4">Desktop</h3>
                <div className="space-y-2">
                  <p className="flex items-center justify-center text-sm text-muted-foreground gap-1">
                    <span className="w-4 h-4 inline-block rounded-full bg-cyan-100">
                      <Image src="/images/icons/electron.svg" alt="Electron" width={16} height={16} className="object-contain" />
                    </span>
                    Electron
                  </p>
                  <p className="flex items-center justify-center text-sm text-muted-foreground gap-1">
                    <span className="w-4 h-4 inline-block rounded-full bg-blue-100">
                      <Image src="/images/icons/winui.svg" alt="Windows UI" width={16} height={16} className="object-contain" />
                    </span>
                    Windows UI
                  </p>
                  <p className="flex items-center justify-center text-sm text-muted-foreground gap-1">
                    <span className="w-4 h-4 inline-block rounded-full bg-gray-100">
                      <span className="flex items-center justify-center h-full">
                        <FileCode className="h-3 w-3 text-slate-500" />
                      </span>
                    </span>
                    macOS
                  </p>
                </div>
              </div>
            </div>
            
          </div>
        </section>

        <section className="container space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Features
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              CursorCraft provides a comprehensive suite of tools to accelerate your development workflow.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Braces className="h-6 w-6 text-primary" />
                    <h3 className="font-bold">AI-Powered Setup</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Intelligent tech stack recommendations and framework selection.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <FileCode className="h-6 w-6 text-primary" />
                    <h3 className="font-bold">Smart Documentation</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Automated PRD & technical specs with development guidelines.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-6 w-6 text-primary" />
                    <h3 className="font-bold">Modern Development Standards</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    TypeScript, ESLint, Prettier, pre-commit hooks, and CI/CD templates.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Package className="h-6 w-6 text-primary" />
                    <h3 className="font-bold">Smart Dependencies</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Curated package selection with automatic security scanning.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Wrench className="h-6 w-6 text-primary" />
                    <h3 className="font-bold">Developer Tooling</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Custom AI rules, project presets, and team workflow templates.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Laptop className="h-6 w-6 text-primary" />
                    <h3 className="font-bold">Technology Support</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Frontend, backend, mobile, and desktop application frameworks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-6 md:px-8 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} CursorCraft. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
} 