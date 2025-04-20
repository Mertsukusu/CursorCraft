"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface TechIconsGridProps {
  className?: string;
}

export function TechIconsGrid({ className }: TechIconsGridProps) {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  
  const techIcons = [
    { name: "React", icon: "/images/icons/react.svg", category: "frontend" },
    { name: "Vue", icon: "/images/icons/vue.svg", category: "frontend" },
    { name: "Angular", icon: "/images/icons/angular.svg", category: "frontend" },
    { name: "Node.js", icon: "/images/icons/nodejs.svg", category: "backend" },
    { name: "Python", icon: "/images/icons/python.svg", category: "backend" },
    { name: "Go", icon: "/images/icons/go.svg", category: "backend" },
    { name: "TypeScript", icon: "/images/icons/typescript.svg", category: "both" },
    { name: "Flutter", icon: "/images/icons/flutter.svg", category: "mobile" },
    { name: "Swift", icon: "/images/icons/swift.svg", category: "mobile" },
    { name: "Kotlin", icon: "/images/icons/kotlin.svg", category: "mobile" },
    { name: "Electron", icon: "/images/icons/electron.svg", category: "desktop" },
    { name: "Windows UI", icon: "/images/icons/winui.svg", category: "desktop" },
    { name: "Tailwind CSS", icon: "/images/icons/tailwind.svg", category: "frontend" },
  ];
  
  const categories = [
    { id: "all", name: "All" },
    { id: "frontend", name: "Frontend" },
    { id: "backend", name: "Backend" },
    { id: "mobile", name: "Mobile" },
    { id: "desktop", name: "Desktop" },
    { id: "both", name: "Full Stack" },
  ];
  
  const [activeCategory, setActiveCategory] = useState("all");
  
  const filteredIcons = techIcons.filter(
    icon => activeCategory === "all" || icon.category === activeCategory
  );

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={cn(
              "px-4 py-2 text-sm rounded-full transition-colors",
              activeCategory === category.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            )}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-items-center">
        {filteredIcons.map((icon) => (
          <div
            key={icon.name}
            className="flex flex-col items-center justify-center p-4 rounded-lg border bg-background transition-all hover:shadow-md hover:scale-105"
            onMouseEnter={() => setHoveredIcon(icon.name)}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <div className="relative h-16 w-16 mb-2">
              <Image
                src={icon.icon}
                alt={`${icon.name} logo`}
                fill
                className="object-contain"
              />
            </div>
            <span className={cn(
              "text-sm font-medium transition-colors text-center",
              hoveredIcon === icon.name ? "text-primary" : "text-muted-foreground"
            )}>
              {icon.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
} 