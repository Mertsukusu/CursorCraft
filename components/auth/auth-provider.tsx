'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Session, User } from "@supabase/auth-helpers-nextjs";
import { AuthChangeEvent } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: any }>;
  signUp: (email: string, password: string) => Promise<{ error?: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>({
    id: '00000000-0000-0000-0000-000000000000',
    email: 'guest@example.com',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    app_metadata: {},
    user_metadata: {},
    aud: 'authenticated',
  });
  const [session, setSession] = useState<Session>({
    access_token: 'mock-token',
    refresh_token: 'mock-refresh-token',
    expires_in: 3600,
    token_type: 'bearer',
    user: user,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const signIn = async () => ({});
  const signUp = async () => ({});
  const signOut = async () => {};

  return (
    <AuthContext.Provider value={{ user, session, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
} 