"use client";

import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { Session, User, AuthChangeEvent } from '@supabase/supabase-js';
import { createSupabaseClient } from '@/lib/supabase/client';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<any>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const initialized = useRef(false);
  
  // Use a ref to store the Supabase client to avoid recreating it on every render
  const supabase = createSupabaseClient();

  useEffect(() => {
    // Avoid multiple initializations
    if (initialized.current) return;
    initialized.current = true;
    
    const setupAuth = async () => {
      try {
        // Set a timeout to prevent long loading states
        const timeoutPromise = new Promise<void>((resolve) => {
          setTimeout(() => {
            setIsLoading(false);
            resolve();
          }, 2000); // Max 2 seconds loading time
        });
        
        // Get session
        const sessionPromise = (async () => {
          const { data: { session } } = await supabase.auth.getSession();
          setSession(session);
          setUser(session?.user ?? null);
          setIsLoading(false);
        })();
        
        // Race between timeout and actual data
        await Promise.race([sessionPromise, timeoutPromise]);
        
        // Setup auth state change listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (event: AuthChangeEvent, currentSession: Session | null) => {
            setSession(currentSession);
            setUser(currentSession?.user ?? null);
            setIsLoading(false);
          }
        );

        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error("Auth setup error:", error);
        setIsLoading(false);
      }
    };

    setupAuth();
  }, []);

  const signIn = (email: string, password: string) => 
    supabase.auth.signInWithPassword({ email, password });

  const signUp = (email: string, password: string) => 
    supabase.auth.signUp({ email, password });

  const signOut = () => supabase.auth.signOut();

  const value = {
    user,
    session,
    isLoading,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};