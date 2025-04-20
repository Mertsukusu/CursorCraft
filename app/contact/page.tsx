"use client";

import Link from "next/link";
import { Mail, Linkedin, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Contact page component
 * @returns Contact page component
 */
export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="container py-12 md:py-16 lg:py-20">
          
        
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold text-center mb-4 text-primary">Get in Touch</h1>
            <p className="text-center text-muted-foreground mb-12">
              Feel free to reach out for collaborations, questions, or just to say hello!
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center p-6 border rounded-lg hover:border-primary transition-colors">
                <div className="flex items-center flex-1">
                  <div className="mr-4 h-10 w-10 flex items-center justify-center bg-primary/10 rounded-full">
                    <Linkedin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">LinkedIn</h3>
                    <p className="text-sm text-muted-foreground">@mertsukusu</p>
                  </div>
                </div>
                <Link 
                  href="https://www.linkedin.com/in/mertsukusu/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-primary"
                >
                  <span className="mr-1">Visit</span>
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
              
              <div className="flex items-center p-6 border rounded-lg hover:border-primary transition-colors">
                <div className="flex items-center flex-1">
                  <div className="mr-4 h-10 w-10 flex items-center justify-center bg-primary/10 rounded-full">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-sm text-muted-foreground">mertsukusu@gmail.com</p>
                  </div>
                </div>
                <Link 
                  href="mailto:mertsukusu@gmail.com" 
                  className="flex items-center text-sm text-primary"
                >
                </Link>
              </div>
              
              <div className="flex items-center p-6 border rounded-lg hover:border-primary transition-colors">
                <div className="flex items-center flex-1">
                  <div className="mr-4 h-10 w-10 flex items-center justify-center bg-primary/10 rounded-full">
                    <Github className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">GitHub</h3>
                    <p className="text-sm text-muted-foreground">@Mertsukusu</p>
                  </div>
                </div>
                <Link 
                  href="https://github.com/Mertsukusu" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-primary"
                >
                  <span className="mr-1">Visit</span>
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
              <div className="flex justify-end mb-4">
            <Button variant="outline" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
          </div>
            </div>
            
        </section>
        
      </main>
    </div>
  );
} 