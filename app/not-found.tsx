import Link from "next/link";

import { Button } from "@/components/ui/button";

/**
 * Not found (404) page component
 * @returns Not found page component
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 text-center">
      <h1 className="text-5xl font-bold tracking-tight">404</h1>
      <h2 className="text-3xl font-semibold tracking-tight">
        Page Not Found
      </h2>
      <p className="max-w-md text-muted-foreground">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link href="/">
        <Button>Return to Home</Button>
      </Link>
    </div>
  );
} 