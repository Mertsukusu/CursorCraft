"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/**
 * Template data interface
 */
export interface TemplateProps {
  id: string;
  title: string;
  description: string;
  category: "web" | "api" | "cli";
  tags: string[];
}

/**
 * Project template card component
 * @param props - Component props
 * @returns Template card component
 */
export function TemplateCard({
  id,
  title,
  description,
  category,
  tags,
}: TemplateProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className={`transition-all duration-200 ${
        isHovered ? "shadow-lg" : "shadow-sm"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <span className="rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
            {category.toUpperCase()}
          </span>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-muted px-2 py-1 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          Preview
        </Button>
        <Link href={`/projects/new?template=${id}`}>
          <Button size="sm">Use Template</Button>
        </Link>
      </CardFooter>
    </Card>
  );
} 