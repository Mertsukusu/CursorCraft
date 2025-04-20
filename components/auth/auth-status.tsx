"use client";

import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import { UserIcon } from "lucide-react";
import Link from "next/link";

export function AuthStatus() {
  const { user, signOut, isLoading } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  if (isLoading) {
    return <div className="h-8 w-20 animate-pulse bg-muted rounded"></div>;
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <UserIcon className="h-4 w-4" />
          <span className="text-sm text-muted-foreground max-w-[150px] truncate">
            {user.email}
          </span>
        </div>
        <Button variant="outline" size="sm" onClick={handleSignOut}>
          Sign out
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link href="/login">
        <Button variant="outline" size="sm">
          Sign in
        </Button>
      </Link>
      <Link href="/register">
        <Button variant="default" size="sm">
          Sign up
        </Button>
      </Link>
    </div>
  );
} 