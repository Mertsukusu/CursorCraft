"use client";

import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

// Global singleton instance
let supabaseClientInstance: ReturnType<typeof createClient<Database>> | null = null;

/**
 * Creates a Supabase client with the provided URL and anon key
 * This client is used for non-authenticated operations
 * Using singleton pattern to avoid multiple client instances
 */
export const createSupabaseClient = () => {
  if (supabaseClientInstance) return supabaseClientInstance;
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      "Missing Supabase credentials. Using fallback configuration. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file."
    );
    
    // Return a mock client for development
    return {
      from: () => ({
        select: () => ({
          eq: () => ({
            order: () => Promise.resolve({ data: [], error: null }),
            single: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } })
          })
        }),
        insert: () => Promise.resolve({ error: { message: "Supabase not configured" } }),
        update: () => Promise.resolve({ error: { message: "Supabase not configured" } }),
        delete: () => Promise.resolve({ error: { message: "Supabase not configured" } })
      }),
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        signInWithPassword: () => Promise.resolve({ error: { message: "Supabase not configured" } }),
        signUp: () => Promise.resolve({ error: { message: "Supabase not configured" } }),
        signOut: () => Promise.resolve({ error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
      }
    } as any;
  }
  
  supabaseClientInstance = createClient<Database>(supabaseUrl, supabaseAnonKey);
  return supabaseClientInstance;
}; 